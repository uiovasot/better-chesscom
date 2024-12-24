import {autoUpdate, computePosition} from '@floating-ui/dom';

export class Tooltip {
    private target: HTMLElement;
    private content: string;
    private tooltipElement: HTMLDivElement | null;

    constructor(target: HTMLElement, content: string) {
        this.target = target;
        this.content = content;
        this.tooltipElement = null;

        this.init();
    }

    private init(): void {
        this.target.addEventListener('mouseenter', () => this.show());
        this.target.addEventListener('mouseleave', () => this.hide());
    }

    private createTooltip(): void {
        if (this.tooltipElement) return;

        this.tooltipElement = document.createElement('div');
        this.tooltipElement.className = 'tooltip-component';
        this.tooltipElement.setAttribute('role', 'tooltip');

        const tooltipContent = document.createElement('div');
        tooltipContent.className = 'tooltip-content tooltip-top';

        const tooltipBody = document.createElement('div');
        tooltipBody.className = 'tooltip-body tooltip-top';
        tooltipBody.innerHTML = this.content;

        tooltipContent.appendChild(tooltipBody);

        this.tooltipElement.appendChild(tooltipContent);
        document.body.appendChild(this.tooltipElement);
    }

    private positionTooltip(): void {
        if (!this.tooltipElement) return;

        const update = () => {
            computePosition(this.target, this.tooltipElement!, {
                placement: 'top',
            }).then(({x, y}) => {
                this.tooltipElement!.style.left = `${x}px`;
                this.tooltipElement!.style.top = `${y}px`;
                this.tooltipElement!.style.opacity = '1';
                this.tooltipElement!.style.transform = 'translate(0px, 0px)';
            });
        };

        const cleanup = autoUpdate(this.target, this.tooltipElement!, update);

        this.tooltipElement!.addEventListener('mouseleave', () => cleanup());
        update();
    }

    private show(): void {
        this.createTooltip();
        this.positionTooltip();
    }

    private hide(): void {
        if (this.tooltipElement) {
            document.body.removeChild(this.tooltipElement);
            this.tooltipElement = null;
        }
    }
}
