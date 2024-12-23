import {addCSS} from '../utils/addCSS';

// css by chesscom

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
        addCSS(`.alerts-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    pointer-events: none;
    position: fixed;
    right: 0;
    top: 0;
    width: auto;
    z-index: 9001
}

.no-nav .alerts-container {
    left: 0
}

@media (min-width: 60em) {
    .alerts-container {
        left:var(--navWidth)
    }
}

.alerts-alert {
    align-items: center;
    border-radius: var(--radius-m);
    color: #fff;
    display: flex;
    font-weight: 600;
    margin-bottom: 1rem;
    max-width: 105.2rem;
    min-height: 5rem;
    padding: 0 0 0 1.5rem;
    pointer-events: auto;
    position: relative;
    width: 100%
}

.alerts-alert:first-child {
    border-radius: 0 0 var(--radius-m) var(--radius-m)
}

.alerts-alert:last-child {
    margin-bottom: 0
}

.alerts-message {
    flex: 1;
    line-height: 1.5;
    padding: 1.3rem 0
}

.alerts-message a,.alerts-message button {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0;
    text-decoration: underline
}

.alerts-message a:focus,.alerts-message a:hover,.alerts-message button:focus,.alerts-message button:hover {
    text-decoration: none
}

.alerts-close {
    align-self: flex-start;
    background: none;
    border: none;
    flex-shrink: 0;
    font-weight: 600;
    height: 5rem;
    margin: 0;
    padding: 0;
    width: 5rem
}

.alerts-close .icon-font-chess {
    color: rgba(0,0,0,.5);
    font-size: 2rem;
    margin: 0 auto
}

.alerts-close:focus .icon-font-chess,.alerts-close:hover .icon-font-chess {
    color: rgba(0,0,0,.8)
}

.alerts-error {
    background-color: var(--color-red-400)
}

.alerts-info,.alerts-topical {
    background-color: var(--color-blue-300)
}

.alerts-success {
    background-color: var(--color-green-300)
}

.alerts-warning {
    background-color: var(--color-gold-400)
}

.btn-link-inline {
    display: inline-block
}

@keyframes index-alertEnter {
    0% {
        opacity: 0;
        transform: translate3d(0,-25%,0)
    }

    to {
        opacity: 1;
        transform: translateZ(0)
    }
}

@keyframes index-alertLeave {
    0% {
        max-height: 20rem;
        opacity: 1;
        transform: translateY(0)
    }

    to {
        max-height: 0;
        opacity: 0;
        transform: translateY(-50%)
    }
}

.alerts-enter {
    animation: index-alertEnter .1s ease-in both;
    animation-delay: .1s;
    opacity: 0
}

.alerts-leave {
    animation: index-alertLeave .2s ease-in-out both;
    min-height: 0
}
`);

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

        /*setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, this.duration);*/
    }
}
