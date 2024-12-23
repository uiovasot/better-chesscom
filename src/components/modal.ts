export class Modal {
    private message: string;
    private onConfirm: (() => void) | null;
    private modalContainer: HTMLDivElement | null;

    constructor(message: string, onConfirm?: () => void) {
        this.message = message;
        this.onConfirm = onConfirm || null;
        this.modalContainer = null;
    }

    open(): void {
        this.modalContainer = document.createElement('div');
        this.modalContainer.className = 'modal-container-component';

        const modalBackground = document.createElement('div');
        modalBackground.className = 'modal-container-bg';
        modalBackground.addEventListener('click', () => this.close());
        this.modalContainer.appendChild(modalBackground);

        const modalContent = document.createElement('section');
        modalContent.className = 'modal-content-component confirm-popover-modal';

        const messageLabel = document.createElement('div');
        messageLabel.className = 'confirm-popover-messageLabel';
        messageLabel.textContent = this.message;
        modalContent.appendChild(messageLabel);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'confirm-popover-buttons';

        const cancelButton = document.createElement('button');
        cancelButton.className = 'cc-button-component cc-button-secondary cc-button-medium cc-button-min-width';
        cancelButton.type = 'button';
        cancelButton.textContent = '취소';
        cancelButton.addEventListener('click', () => this.close());
        buttonContainer.appendChild(cancelButton);

        const confirmButton = document.createElement('button');
        confirmButton.className = 'cc-button-component cc-button-primary cc-button-medium cc-button-min-width';
        confirmButton.type = 'button';
        confirmButton.textContent = '네';
        confirmButton.addEventListener('click', () => {
            if (this.onConfirm) {
                this.onConfirm();
            }
            this.close();
        });
        buttonContainer.appendChild(confirmButton);

        modalContent.appendChild(buttonContainer);

        this.modalContainer.appendChild(modalContent);

        document.body.appendChild(this.modalContainer);
    }

    close(): void {
        if (this.modalContainer) {
            document.body.removeChild(this.modalContainer);
            this.modalContainer = null;
        }
    }
}
