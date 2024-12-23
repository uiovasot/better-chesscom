export interface Plugin {
    name: string;
    author: {name: string; id: string}[];
    description: string;
    version: string;
    paths: {
        trigger: (path: string) => boolean;
        handler: (path: string) => void;
    }[];
}