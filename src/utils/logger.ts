export class Logger {
    public static getTime(): string {
        const now = new Date();

        return now.toTimeString().split(' ')[0];
    }

    public static error(...message: string[]): void {
        console.log(`[${this.getTime()}] [Error] ${message.join(' ')}`);
    }

    public static success(...message: string[]): void {
        console.log(`[${this.getTime()}] [Success] ${message.join(' ')}`);
    }

    public static warning(...message: string[]): void {
        console.log(`[${this.getTime()}] [Warning] ${message.join(' ')}`);
    }

    public static info(...message: string[]): void {
        console.log(`[${this.getTime()}] [Info] ${message.join(' ')}`);
    }
}
