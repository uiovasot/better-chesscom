import '@css/toast.css';

export class Toast {
    private message: string;
    private type: 'success' | 'error' | 'info';
    private duration: number;

    constructor(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 7000) {
        this.message = message;
        this.type = type;
        this.duration = duration;
    }

    show(): void {
        let toastContainer = document.getElementById('widget-alert-flash');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'widget-alert-flash';
            toastContainer.className = 'alerts-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        const toastId = `alert-${Date.now()}`;
        toast.id = toastId;
        toast.className = `alerts-alert alerts-enter alerts-${this.type}`;

        const messageSpan = document.createElement('span');
        messageSpan.className = 'alerts-message';
        messageSpan.textContent = this.message;
        toast.appendChild(messageSpan);

        const closeButton = document.createElement('button');
        closeButton.className = 'alerts-close';
        closeButton.type = 'button';
        closeButton.innerHTML = '<span class="icon-font-chess x"></span>';
        closeButton.addEventListener('click', () => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        });
        toast.appendChild(closeButton);

        toastContainer.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, this.duration);
    }
}
