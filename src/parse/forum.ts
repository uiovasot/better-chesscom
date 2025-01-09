import {Logger} from '@utils/logger';
import {processHTML} from '@utils/processHTML';

interface CommentData {
    id: string;
    forumId: string;
    username: string;
    avatarUrl: string;
    content: string;
    timestamp: string;
    voteCount: number;
    versions?: string[];
    deleted?: boolean;
}

export class Comment {
    id: string;
    username: string;
    avatarUrl: string;
    content: string;
    timestamp: string;
    voteCount: number;
    versions: string[];
    deleted: boolean;
    private forum?: Forum;

    constructor(data: CommentData, forum?: Forum) {
        this.id = data.id;
        this.username = data.username;
        this.avatarUrl = data.avatarUrl;
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.voteCount = data.voteCount;
        this.versions = data.versions || [];
        this.deleted = data.deleted || false;
        this.forum = forum;
    }

    addVersion(newContent: string): void {
        if (this.content !== newContent && !this.deleted) {
            if (this.versions.length === 0 || this.versions[this.versions.length - 1] !== newContent) {
                this.versions.unshift(this.content);
                this.content = newContent;

                Logger.info(`New version added for Comment ${this.id}: ${newContent}`);
                Logger.info(`Versions history (${this.versions.length}): ${this.versions.join(' -> ')}`);

                if (this.forum) {
                    this.forum.saveToIndexedDB().catch((error) => {
                        console.error('Error saving comment version to IndexedDB:', error);
                    });
                }
            }
        }
    }

    markAsDeleted(): void {
        if (!this.deleted) {
            this.deleted = true;

            if (this.forum) {
                this.forum.saveToIndexedDB().catch((error) => {
                    Logger.error('Error saving deleted status to IndexedDB:', error);
                });
            }
        }
    }

    setForum(forum: Forum): void {
        this.forum = forum;
    }
}

export class Forum {
    comments: Comment[] = [];
    allComments: Comment[] = [];
    forumId: string;

    constructor(forumId: string) {
        this.forumId = forumId;
    }

    public async parseAndUpdateComments(rootElement: HTMLElement): Promise<this> {
        try {
            const db = await this.openIndexedDB();
            const parsedComments = this.parseComments(rootElement);
            const existingComments = await this.loadFromIndexedDB();

            parsedComments.forEach((newComment) => {
                const existingComment = existingComments.find((c: Comment) => c.id === newComment.id);
                if (existingComment) {
                    if (!existingComment.deleted && existingComment.content !== newComment.content) {
                        existingComment.addVersion(newComment.content);
                        const index = this.comments.findIndex((c) => c.id === existingComment.id);
                        if (index === -1) {
                            this.comments.push(existingComment);
                        }
                    }
                } else {
                    this.comments.push(newComment);
                }
            });

            existingComments.forEach((existingComment) => {
                const stillExists = parsedComments.some((c) => c.id === existingComment.id);
                if (!stillExists && !existingComment.deleted) {
                    existingComment.markAsDeleted();
                    if (!this.comments.includes(existingComment)) {
                        this.comments.push(existingComment);
                    }
                }

                this.allComments.push(existingComment);
            });

            await this.saveToIndexedDB();
        } catch (error) {
            Logger.error('Error parsing and updating comments:' + error);
            throw error;
        }

        return this;
    }

    private parseComments(rootElement: HTMLElement): Comment[] {
        const commentElements = rootElement.querySelectorAll('.comment-post-component');
        const parsedComments: Comment[] = [];

        commentElements.forEach((element) => {
            const id = element.id.replace('comment-', '');
            const username = element.querySelector('.user-tagline-username')?.textContent?.trim() || '';
            const avatarUrl = element.querySelector('.post-view-meta-image')?.getAttribute('data-src') || '';
            const content = processHTML(element.querySelector('.comment-post-body')?.innerHTML || '');
            const timestamp = element.querySelector('.comment-post-actions-time span')?.getAttribute('title') || '';
            const voteCount = parseInt(element.querySelector('.vote-container-count')?.textContent || '0', 10);

            const commentData: CommentData = {
                id,
                forumId: this.forumId,
                username,
                avatarUrl,
                content,
                timestamp,
                voteCount,
            };

            const comment = new Comment(commentData, this);
            parsedComments.push(comment);
        });

        return parsedComments;
    }

    private async loadFromIndexedDB(): Promise<Comment[]> {
        try {
            const db = await this.openIndexedDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction('comments', 'readonly');
                const store = transaction.objectStore('comments');
                const request = store.getAll();

                request.onsuccess = () => {
                    const result = request.result;
                    const comments = result.filter((data) => data.forumId === this.forumId).map((data: CommentData) => new Comment(data, this));
                    resolve(comments);
                };

                request.onerror = () => {
                    resolve([]);
                };
            });
        } catch (error) {
            return [];
        }
    }

    async saveToIndexedDB(): Promise<void> {
        try {
            const db = await this.openIndexedDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction('comments', 'readwrite');
                const store = transaction.objectStore('comments');

                this.comments.forEach((comment) => {
                    const request = store.put({
                        id: comment.id,
                        forumId: this.forumId,
                        username: comment.username,
                        avatarUrl: comment.avatarUrl,
                        content: comment.content,
                        timestamp: comment.timestamp,
                        voteCount: comment.voteCount,
                        versions: comment.versions,
                        deleted: comment.deleted,
                    });

                    request.onerror = () => {
                        Logger.error(`Error saving comment ${comment.id} to IndexedDB`);
                        reject(request.error);
                    };
                });

                transaction.oncomplete = () => {
                    Logger.success('Comments saved to IndexedDB.');
                    resolve();
                };

                transaction.onerror = () => {
                    Logger.error('Error in IndexedDB transaction');
                    reject(transaction.error);
                };
            });
        } catch (error) {
            Logger.error('Error saving comments to IndexedDB:' + error);
            throw error;
        }
    }

    private async openIndexedDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('ForumCommentsDB', 6);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains('comments')) {
                    db.createObjectStore('comments', {keyPath: 'id'});
                }
            };

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    log(): void {
        this.comments.forEach((comment) => {
            const status = comment.deleted ? '[DELETED] ' : '';
            Logger.info(`${status}[${comment.id}] ${comment.username}: ${comment.content}`);
            Logger.info(`  Versions (${comment.versions.length}): ${comment.versions.join(' -> ')}`);
        });
    }
}
