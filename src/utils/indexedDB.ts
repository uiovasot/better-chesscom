import {Logger} from './logger';

export function clearIndexedDB(databaseName: string, storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(databaseName);

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const clearRequest = store.clear();

            clearRequest.onsuccess = () => {
                Logger.success(`All data cleared from ${storeName} in ${databaseName}.`);
                resolve();
            };

            clearRequest.onerror = () => {
                Logger.error(`Error clearing data from ${storeName}:`, clearRequest.error?.message!);
                reject(clearRequest.error);
            };
        };

        request.onerror = () => {
            Logger.error(`Error opening database ${databaseName}:`, request.error?.message!);
            reject(request.error);
        };
    });
}
