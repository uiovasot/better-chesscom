// ==UserScript==
// @name         Better Chess.com
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Make chess.com better
// @author       You
// @match        https://*.chess.com/*
// @match        http://*.chess.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chess.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /*
██████╗ ███████╗████████╗████████╗███████╗██████╗      ██████╗██╗  ██╗███████╗███████╗███████╗    ██████╗ ██████╗ ███╗   ███╗
██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗    ██╔════╝██║  ██║██╔════╝██╔════╝██╔════╝   ██╔════╝██╔═══██╗████╗ ████║
██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝    ██║     ███████║█████╗  ███████╗███████╗   ██║     ██║   ██║██╔████╔██║
██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗    ██║     ██╔══██║██╔══╝  ╚════██║╚════██║   ██║     ██║   ██║██║╚██╔╝██║
██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║    ╚██████╗██║  ██║███████╗███████║███████║██╗╚██████╗╚██████╔╝██║ ╚═╝ ██║
╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝                                                                                                               
Better Chess.com
*/
class c{static colors={reset:"\x1B[0m",red:"\x1B[31m",green:"\x1B[32m",yellow:"\x1B[33m",blue:"\x1B[34m",magenta:"\x1B[35m",cyan:"\x1B[36m",white:"\x1B[37m"};static color(t,e="white"){return`${this.colors[e]||this.colors.white}${t}${this.colors.reset}`}static getTime(){return new Date().toTimeString().split(" ")[0]}static error(...t){console.log(`[${this.getTime()}]`,this.color("[Error]","red"),...t)}static success(...t){console.log(`[${this.getTime()}]`,this.color("[Success]","green"),...t)}static warning(...t){console.log(`[${this.getTime()}]`,this.color("[Warning]","yellow"),...t)}static info(...t){console.log(`[${this.getTime()}]`,this.color("[Info]","cyan"),...t)}}async function f(t){try{let e=await fetch(t);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);let o=await e.text(),i=new DOMParser().parseFromString(o,"text/html").querySelectorAll('form[action*="delete_comment"]'),m=[];i.forEach((a)=>{let s=a.getAttribute("action");if(!s||s.includes("delete_comment?all=1"))return;let g=a.querySelector('input[name="_token"]'),h=g?g.value:null;if(s&&h)m.push({action:s,token:h})});for(let{action:a,token:s}of m)await fetch(a,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({_token:s})}),c.success(`Deleted: ${a}`);return m}catch(e){c.error(e)}}class d{message;onConfirm;modalContainer;constructor(t,e){this.message=t,this.onConfirm=e||null,this.modalContainer=null}open(){this.modalContainer=document.createElement("div"),this.modalContainer.className="modal-container-component";let t=document.createElement("div");t.className="modal-container-bg",t.addEventListener("click",()=>this.close()),this.modalContainer.appendChild(t);let e=document.createElement("section");e.className="modal-content-component confirm-popover-modal";let o=document.createElement("div");o.className="confirm-popover-messageLabel",o.textContent=this.message,e.appendChild(o);let r=document.createElement("div");r.className="confirm-popover-buttons";let n=document.createElement("button");n.className="cc-button-component cc-button-secondary cc-button-medium cc-button-min-width",n.type="button",n.textContent="취소",n.addEventListener("click",()=>this.close()),r.appendChild(n);let i=document.createElement("button");i.className="cc-button-component cc-button-primary cc-button-medium cc-button-min-width",i.type="button",i.textContent="네",i.addEventListener("click",()=>{if(this.onConfirm)this.onConfirm();this.close()}),r.appendChild(i),e.appendChild(r),this.modalContainer.appendChild(e),document.body.appendChild(this.modalContainer)}close(){if(this.modalContainer)document.body.removeChild(this.modalContainer),this.modalContainer=null}}function l(t){let e=document.createElement("style");e.innerHTML=t,document.head.append(e)}function b(t){localStorage.setItem("toast",JSON.stringify(t))}var w={name:"AutoRemoveComments",author:[],description:"자동으로 댓글을 지워줍니다.",version:"1.0.0",paths:[{trigger(t){return t.startsWith("/clubs/forum/view/")},handler(){l(`
                    .forums-single-sort-pagination-wrap {
                        flex-direction: row;
                    }

                    .remove-page-component {
                        color: var(--color-text-default);
                        cursor: pointer;
                    }
                        
                    .remove-page-component:hover {
                        color: var(--color-text-default-hovered)
                    }`);let t=document.querySelector(".forums-single-sort-pagination-wrap"),e=document.createElement("span");e.className="remove-page-component",e.innerText="페이지 삭제하기",e.onclick=()=>{new d("이 페이지를 정말로 삭제할까요?",async()=>{await f(window.location.href),b({type:"success",message:"페이지 삭제가 완료되었습니다."}),history.go(0)}).open()},t.appendChild(e)}}]};var v={name:"Test",author:[],description:"Test",version:"1.0.0",paths:[{trigger(t){return t.startsWith("/test")},handler(){}}]};var p=[];p.push(w);p.push(v);var y=p;class u{message;type;duration;constructor(t,e="info",o=7000){this.message=t,this.type=e,this.duration=o}show(){l(`.alerts-container {
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
`);let t=document.getElementById("widget-alert-flash");if(!t)t=document.createElement("div"),t.id="widget-alert-flash",t.className="alerts-container",document.body.appendChild(t);let e=document.createElement("div"),o=`alert-${Date.now()}`;e.id=o,e.className=`alerts-alert alerts-enter alerts-${this.type}`;let r=document.createElement("span");r.className="alerts-message",r.textContent=this.message,e.appendChild(r);let n=document.createElement("button");n.className="alerts-close",n.type="button",n.innerHTML='<span class="icon-font-chess x"></span>',n.addEventListener("click",()=>{if(e.parentNode)e.parentNode.removeChild(e)}),e.appendChild(n),t.appendChild(e)}}function x(){if(!window.location.host.endsWith("chess.com"))return;let t=localStorage.getItem("toast");if(t)try{let e=JSON.parse(t);new u(e.message,e.type).show(),localStorage.setItem("toast","")}catch(e){c.error(e)}for(let e of y)for(let{trigger:o,handler:r}of e.paths)if(o(window.location.pathname))r(window.location.pathname)}x();

})();