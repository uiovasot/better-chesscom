// ==UserScript==
// @name         Better Chess.com
// @namespace    http://tampermonkey.net/
// @version      1.1.0
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
class L{static getTime(){return new Date().toTimeString().split(" ")[0]}static error(...o){console.log(`[${this.getTime()}] [Error] ${o.join(" ")}`)}static success(...o){console.log(`[${this.getTime()}] [Success] ${o.join(" ")}`)}static warning(...o){console.log(`[${this.getTime()}] [Warning] ${o.join(" ")}`)}static info(...o){console.log(`[${this.getTime()}] [Info] ${o.join(" ")}`)}}async function mo(o){try{let t=await fetch(o);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);let n=await t.text(),s=new DOMParser().parseFromString(n,"text/html").querySelector('input[name="forum_topic_comment[_token]"]')?.getAttribute("value");if(!s)throw new Error("토큰을 찾지 못했습니다.");return s}catch(t){L.error(t)}}async function po(o,t,n,u=!0){try{let r=await fetch(o+"&newCommentCount=1",{headers:{accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","accept-language":"ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4","cache-control":"max-age=0","content-type":"application/x-www-form-urlencoded",priority:"u=0, i","sec-ch-ua":'"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Linux"',"sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},referrer:o+"&newCommentCount=1",referrerPolicy:"strict-origin-when-cross-origin",body:"mce_0=%3Cp%3E"+encodeURIComponent(n)+"%3C%2Fp%3E&forum_topic_comment%5Bbody%5D=%3Cp%3E"+encodeURIComponent(n)+"%3C%2Fp%3E&forum_topic_comment%5B_token%5D="+t+"&Post=&following="+(u?"on":"off"),method:"POST",mode:"cors",credentials:"include"});if(L.success(`Add comment: ${n}`),!r.ok)throw new Error(`HTTP error! status: ${r.status}`)}catch(r){L.error(r)}}async function P(o){try{let t=await fetch(o);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);let n=await t.text(),s=new DOMParser().parseFromString(n,"text/html").querySelectorAll('form[action*="delete_comment"]'),h=[];s.forEach((i)=>{let c=i.getAttribute("action");if(!c||c.includes("delete_comment?all=1"))return;let m=i.querySelector('input[name="_token"]'),d=m?m.value:null;if(c&&d)h.push({action:c,token:d})});for(let{action:i,token:c}of h)await fetch(i,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({_token:c})}),L.success(`Deleted: ${i}`);return h}catch(t){L.error(t)}}var Eo={name:"AddConsoleApi",author:[],description:"Adds useful functions to the console.",version:"1.0.0",paths:[{trigger(o){return!0},handler(){class o{url;token;constructor(t=window.location.href){this.url=t}async init(){this.token=await mo(this.url)}async addComment({message:t,following:n=!0}){if(!this.token)throw new Error("You need to init first.");return await po(this.url,this.token,t,n)}async removePage(t=window.location.href){await P(t)}}window.CHESSCOM_API=o}}]};class f{message;onConfirm;modalContainer;constructor(o,t){this.message=o,this.onConfirm=t||null,this.modalContainer=null}open(){this.modalContainer=document.createElement("div"),this.modalContainer.className="modal-container-component";let o=document.createElement("div");o.className="modal-container-bg",o.addEventListener("click",()=>this.close()),this.modalContainer.appendChild(o);let t=document.createElement("section");t.className="modal-content-component confirm-popover-modal";let n=document.createElement("div");n.className="confirm-popover-messageLabel",n.textContent=this.message,t.appendChild(n);let u=document.createElement("div");u.className="confirm-popover-buttons";let r=document.createElement("button");r.className="cc-button-component cc-button-secondary cc-button-medium cc-button-min-width",r.type="button",r.textContent="Cancel",r.addEventListener("click",()=>this.close()),u.appendChild(r);let s=document.createElement("button");s.className="cc-button-component cc-button-primary cc-button-medium cc-button-min-width",s.type="button",s.textContent="Ok",s.addEventListener("click",()=>{if(this.onConfirm)this.onConfirm();this.close()}),u.appendChild(s),t.appendChild(u),this.modalContainer.appendChild(t),document.body.appendChild(this.modalContainer)}close(){if(this.modalContainer)document.body.removeChild(this.modalContainer),this.modalContainer=null}}function bo(o){localStorage.setItem("toast",JSON.stringify(o))}var Wo=function o(t){let n=document.createElement("style");n.innerHTML=t,document.head.append(n)};Wo(".remove-page-component{margin-top:1rem;display:flex;flex-direction:row-reverse}");var yo={name:"AutoRemoveComments",author:[],description:"Automatically deletes comments on that page.",version:"1.0.0",paths:[{trigger(o){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(o)},handler(){let o=document.createElement("div");o.className="remove-page-component";let t=document.createElement("button");t.className="ui_pagination-item-component",t.innerText="Delete page",t.onclick=()=>{new f("Are you sure you want to delete this page?",async()=>{await P(window.location.href),bo({type:"success",message:"Page deletion has been completed."}),history.go(0)}).open()},o.appendChild(t);let n=document.querySelector(".forums-single-sharing.forums-single-sharing-transparent");n.parentNode.insertBefore(o,n)}}]};class e{id;username;avatarUrl;content;timestamp;voteCount;versions;deleted;forum;constructor(o,t){this.id=o.id,this.username=o.username,this.avatarUrl=o.avatarUrl,this.content=o.content,this.timestamp=o.timestamp,this.voteCount=o.voteCount,this.versions=o.versions||[],this.deleted=o.deleted||!1,this.forum=t}addVersion(o){if(this.content!==o&&!this.deleted){if(this.versions.length===0||this.versions[this.versions.length-1]!==o){if(this.versions.unshift(this.content),this.content=o,L.info(`New version added for Comment ${this.id}: ${o}`),L.info(`Versions history (${this.versions.length}): ${this.versions.join(" -> ")}`),this.forum)this.forum.saveToIndexedDB().catch((t)=>{console.error("Error saving comment version to IndexedDB:",t)})}}}markAsDeleted(){if(!this.deleted){if(this.deleted=!0,this.forum)this.forum.saveToIndexedDB().catch((o)=>{L.error("Error saving deleted status to IndexedDB:",o)})}}setForum(o){this.forum=o}}class oo{comments=[];allComments=[];forumId;constructor(o){this.forumId=o}async parseAndUpdateComments(o){try{let t=await this.openIndexedDB(),n=this.parseComments(o),u=await this.loadFromIndexedDB();n.forEach((r)=>{let s=u.find((h)=>h.id===r.id);if(s){if(!s.deleted&&s.content!==r.content){if(s.addVersion(r.content),this.comments.findIndex((i)=>i.id===s.id)===-1)this.comments.push(s)}}else this.comments.push(r)}),u.forEach((r)=>{if(!n.some((h)=>h.id===r.id)&&!r.deleted){if(r.markAsDeleted(),!this.comments.includes(r))this.comments.push(r)}this.allComments.push(r)}),await this.saveToIndexedDB()}catch(t){throw L.error("Error parsing and updating comments:"+t),t}return this}parseComments(o){let t=o.querySelectorAll(".comment-post-component"),n=[];return t.forEach((u)=>{let r=u.id.replace("comment-",""),s=u.querySelector(".user-tagline-username")?.textContent?.trim()||"",h=u.querySelector(".post-view-meta-image")?.getAttribute("data-src")||"",i=u.querySelector(".comment-post-body")?.innerHTML||"",c=u.querySelector(".comment-post-actions-time span")?.getAttribute("title")||"",m=parseInt(u.querySelector(".vote-container-count")?.textContent||"0",10),d={id:r,forumId:this.forumId,username:s,avatarUrl:h,content:i,timestamp:c,voteCount:m},p=new e(d,this);n.push(p)}),n}async loadFromIndexedDB(){try{let o=await this.openIndexedDB();return new Promise((t,n)=>{let s=o.transaction("comments","readonly").objectStore("comments").getAll();s.onsuccess=()=>{let i=s.result.filter((c)=>c.forumId===this.forumId).map((c)=>new e(c,this));t(i)},s.onerror=()=>{t([])}})}catch(o){return[]}}async saveToIndexedDB(){try{let o=await this.openIndexedDB();return new Promise((t,n)=>{let u=o.transaction("comments","readwrite"),r=u.objectStore("comments");this.comments.forEach((s)=>{let h=r.put({id:s.id,forumId:this.forumId,username:s.username,avatarUrl:s.avatarUrl,content:s.content,timestamp:s.timestamp,voteCount:s.voteCount,versions:s.versions,deleted:s.deleted});h.onerror=()=>{L.error(`Error saving comment ${s.id} to IndexedDB`),n(h.error)}}),u.oncomplete=()=>{L.success("Comments saved to IndexedDB."),t()},u.onerror=()=>{L.error("Error in IndexedDB transaction"),n(u.error)}})}catch(o){throw L.error("Error saving comments to IndexedDB:"+o),o}}async openIndexedDB(){return new Promise((o,t)=>{let n=indexedDB.open("ForumCommentsDB",6);n.onupgradeneeded=()=>{let u=n.result;if(!u.objectStoreNames.contains("comments"))u.createObjectStore("comments",{keyPath:"id"})},n.onsuccess=()=>{o(n.result)},n.onerror=()=>{t(n.error)}})}log(){this.comments.forEach((o)=>{let t=o.deleted?"[DELETED] ":"";L.info(`${t}[${o.id}] ${o.username}: ${o.content}`),L.info(`  Versions (${o.versions.length}): ${o.versions.join(" -> ")}`)})}}function to(o){let t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return o.replace(/[&<>"'/]/g,(n)=>t[n])}var go={name:"MessageLogger",author:[],description:"Message logger.",version:"1.0.0",paths:[{trigger(o){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(o)},async handler(o){let t=o.split("/"),n=t[t.length-1].split(/[?#]/)[0],u=document.querySelector(".forums-single-list"),r=new oo(n);await r.parseAndUpdateComments(u);let s=[];r.allComments.forEach((h)=>{let i=u.querySelector(`#comment-${h.id}`);if(h.deleted){let c=document.createElement("div");c.id=`comment-${h.id}`,c.className="comment-post-component vote-parent",c.style.opacity="1",c.style.fontStyle="italic";let m=document.createElement("a");m.className="post-view-meta-avatar comment-post-avatar",m.style.width="5rem",m.style.height="5rem",m.href=`https://www.chess.com/member/${encodeURIComponent(h.username)}`,m.title=h.username,m.setAttribute("data-has-user-popover","true"),m.setAttribute("v-user-popover",`"{&quot;username&quot;:&quot;${to(h.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`);let d=document.createElement("img");d.className="post-view-meta-image",d.alt=h.username,d.src=h.avatarUrl,m.appendChild(d),c.appendChild(m);let p=document.createElement("div");p.className="comment-post-meta";let b=document.createElement("div");b.className="user-tagline-component",b.setAttribute("data-username",h.username),b.setAttribute("data-visibility-policy","0");let E=document.createElement("a");E.className="user-username-component user-username-link user-tagline-username user-username-blue-with-dark-mode",E.href=`https://www.chess.com/member/${encodeURIComponent(h.username)}`,E.innerText=h.username,m.setAttribute("data-has-user-popover","true"),m.setAttribute("v-user-popover",`"{&quot;username&quot;:&quot;${to(h.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`),b.appendChild(E),p.appendChild(b);let q=document.createElement("div");q.className="comment-post-actions-component",q.id=h.id;let g=document.createElement("span");g.className="comment-post-actions-time";let C=document.createElement("span");C.title=h.timestamp,C.innerText=h.timestamp,g.appendChild(C),q.appendChild(g);let y=document.createElement("span");y.className="comment-post-actions-number",y.innerText="deleted",q.appendChild(y),p.appendChild(q),c.appendChild(p);let T=document.createElement("div");T.className="comment-post-body-component comment-post-body",T.innerHTML=h.content,c.appendChild(T);let I=s[s.length-1];if(I)I.parentNode?.insertBefore(c,I.nextSibling);s.push(c)}else if(i)s.push(i);if(h.versions.length>0&&!h.deleted){let c=i.querySelector(".comment-post-body");if(c)h.versions.forEach((m)=>{let d=document.createElement("br");c.appendChild(d);let p=document.createElement("span");p.style.color="#666",p.style.marginLeft="5px",p.textContent="(edited)",c.appendChild(p);let b=document.createElement("div");b.style.fontSize="12px",b.style.color="#666",b.style.marginTop="5px",b.innerHTML=m,c.appendChild(b)})}}),r.log()}}]};function K(){let o=localStorage.getItem("DisabledPlugins"),t=[];if(o)try{t=JSON.parse(o)}catch(n){console.error("Error parsing DisabledPlugins",n)}return t}function qo(o){let t=localStorage.getItem("DisabledPlugins"),n=K();n.push(o),localStorage.setItem("DisabledPlugins",JSON.stringify(n))}function Co(o){let t=localStorage.getItem("DisabledPlugins"),n=K().filter((u)=>u!==o);localStorage.setItem("DisabledPlugins",JSON.stringify(n))}var{min:F,max:Z,round:W,floor:z}=Math,B=(o)=>({x:o,y:o});function no(o){return o.split("-")[0]}function To(o){return o.split("-")[1]}function Lo(o){return o==="x"?"y":"x"}function Io(o){return o==="y"?"height":"width"}function uo(o){return["top","bottom"].includes(no(o))?"y":"x"}function ko(o){return Lo(uo(o))}function S(o){let{x:t,y:n,width:u,height:r}=o;return{width:u,height:r,top:n,left:t,right:t+u,bottom:n+r,x:t,y:n}}function No(o,t,n){let{reference:u,floating:r}=o,s=uo(t),h=ko(t),i=Io(h),c=no(t),m=s==="y",d=u.x+u.width/2-r.width/2,p=u.y+u.height/2-r.height/2,b=u[i]/2-r[i]/2,E;switch(c){case"top":E={x:d,y:u.y-r.height};break;case"bottom":E={x:d,y:u.y+u.height};break;case"right":E={x:u.x+u.width,y:p};break;case"left":E={x:u.x-r.width,y:p};break;default:E={x:u.x,y:u.y}}switch(To(t)){case"start":E[h]-=b*(n&&m?-1:1);break;case"end":E[h]+=b*(n&&m?-1:1);break}return E}var Ho=async(o,t,n)=>{let{placement:u="bottom",strategy:r="absolute",middleware:s=[],platform:h}=n,i=s.filter(Boolean),c=await(h.isRTL==null?void 0:h.isRTL(t)),m=await h.getElementRects({reference:o,floating:t,strategy:r}),{x:d,y:p}=No(m,u,c),b=u,E={},q=0;for(let g=0;g<i.length;g++){let{name:C,fn:y}=i[g],{x:T,y:I,data:v,reset:M}=await y({x:d,y:p,initialPlacement:u,placement:b,strategy:r,middlewareData:E,rects:m,platform:h,elements:{reference:o,floating:t}});if(d=T!=null?T:d,p=I!=null?I:p,E={...E,[C]:{...E[C],...v}},M&&q<=50){if(q++,typeof M==="object"){if(M.placement)b=M.placement;if(M.rects)m=M.rects===!0?await h.getElementRects({reference:o,floating:t,strategy:r}):M.rects;({x:d,y:p}=No(m,b,c))}g=-1}}return{x:d,y:p,placement:b,strategy:r,middlewareData:E}};function x(){return typeof window!=="undefined"}function a(o){if(Uo(o))return(o.nodeName||"").toLowerCase();return"#document"}function k(o){var t;return(o==null||(t=o.ownerDocument)==null?void 0:t.defaultView)||window}function U(o){var t;return(t=(Uo(o)?o.ownerDocument:o.document)||window.document)==null?void 0:t.documentElement}function Uo(o){if(!x())return!1;return o instanceof Node||o instanceof k(o).Node}function N(o){if(!x())return!1;return o instanceof Element||o instanceof k(o).Element}function J(o){if(!x())return!1;return o instanceof HTMLElement||o instanceof k(o).HTMLElement}function Bo(o){if(!x()||typeof ShadowRoot==="undefined")return!1;return o instanceof ShadowRoot||o instanceof k(o).ShadowRoot}function X(o){let{overflow:t,overflowX:n,overflowY:u,display:r}=H(o);return/auto|scroll|overlay|hidden|clip/.test(t+u+n)&&!["inline","contents"].includes(r)}function Jo(o){return["table","td","th"].includes(a(o))}function $(o){return[":popover-open",":modal"].some((t)=>{try{return o.matches(t)}catch(n){return!1}})}function A(o){let t=w(),n=N(o)?H(o):o;return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!t&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!t&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some((u)=>(n.willChange||"").includes(u))||["paint","layout","strict","content"].some((u)=>(n.contain||"").includes(u))}function vo(o){let t=G(o);while(J(t)&&!j(t)){if(A(t))return t;else if($(t))return null;t=G(t)}return null}function w(){if(typeof CSS==="undefined"||!CSS.supports)return!1;return CSS.supports("-webkit-backdrop-filter","none")}function j(o){return["html","body","#document"].includes(a(o))}function H(o){return k(o).getComputedStyle(o)}function D(o){if(N(o))return{scrollLeft:o.scrollLeft,scrollTop:o.scrollTop};return{scrollLeft:o.scrollX,scrollTop:o.scrollY}}function G(o){if(a(o)==="html")return o;let t=o.assignedSlot||o.parentNode||Bo(o)&&o.host||U(o);return Bo(t)?t.host:t}function Mo(o){let t=G(o);if(j(t))return o.ownerDocument?o.ownerDocument.body:o.body;if(J(t)&&X(t))return t;return Mo(t)}function V(o,t,n){var u;if(t===void 0)t=[];if(n===void 0)n=!0;let r=Mo(o),s=r===((u=o.ownerDocument)==null?void 0:u.body),h=k(r);if(s){let i=O(h);return t.concat(h,h.visualViewport||[],X(r)?r:[],i&&n?V(i):[])}return t.concat(r,V(r,[],n))}function O(o){return o.parent&&Object.getPrototypeOf(o.parent)?o.frameElement:null}function ao(o){let t=H(o),n=parseFloat(t.width)||0,u=parseFloat(t.height)||0,r=J(o),s=r?o.offsetWidth:n,h=r?o.offsetHeight:u,i=W(n)!==s||W(u)!==h;if(i)n=s,u=h;return{width:n,height:u,$:i}}function ho(o){return!N(o)?o.contextElement:o}function Y(o){let t=ho(o);if(!J(t))return B(1);let n=t.getBoundingClientRect(),{width:u,height:r,$:s}=ao(t),h=(s?W(n.width):n.width)/u,i=(s?W(n.height):n.height)/r;if(!h||!Number.isFinite(h))h=1;if(!i||!Number.isFinite(i))i=1;return{x:h,y:i}}var zo=B(0);function jo(o){let t=k(o);if(!w()||!t.visualViewport)return zo;return{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function So(o,t,n){if(t===void 0)t=!1;if(!n||t&&n!==k(o))return!1;return t}function Q(o,t,n,u){if(t===void 0)t=!1;if(n===void 0)n=!1;let r=o.getBoundingClientRect(),s=ho(o),h=B(1);if(t)if(u){if(N(u))h=Y(u)}else h=Y(o);let i=So(s,n,u)?jo(s):B(0),c=(r.left+i.x)/h.x,m=(r.top+i.y)/h.y,d=r.width/h.x,p=r.height/h.y;if(s){let b=k(s),E=u&&N(u)?k(u):u,q=b,g=O(q);while(g&&u&&E!==q){let C=Y(g),y=g.getBoundingClientRect(),T=H(g),I=y.left+(g.clientLeft+parseFloat(T.paddingLeft))*C.x,v=y.top+(g.clientTop+parseFloat(T.paddingTop))*C.y;c*=C.x,m*=C.y,d*=C.x,p*=C.y,c+=I,m+=v,q=k(g),g=O(q)}}return S({width:d,height:p,x:c,y:m})}function so(o,t){let n=D(o).scrollLeft;if(!t)return Q(U(o)).left+n;return t.left+n}function Qo(o,t,n){if(n===void 0)n=!1;let u=o.getBoundingClientRect(),r=u.left+t.scrollLeft-(n?0:so(o,u)),s=u.top+t.scrollTop;return{x:r,y:s}}function $o(o){let{elements:t,rect:n,offsetParent:u,strategy:r}=o,s=r==="fixed",h=U(u),i=t?$(t.floating):!1;if(u===h||i&&s)return n;let c={scrollLeft:0,scrollTop:0},m=B(1),d=B(0),p=J(u);if(p||!p&&!s){if(a(u)!=="body"||X(h))c=D(u);if(J(u)){let E=Q(u);m=Y(u),d.x=E.x+u.clientLeft,d.y=E.y+u.clientTop}}let b=h&&!p&&!s?Qo(h,c,!0):B(0);return{width:n.width*m.x,height:n.height*m.y,x:n.x*m.x-c.scrollLeft*m.x+d.x+b.x,y:n.y*m.y-c.scrollTop*m.y+d.y+b.y}}function Do(o){return Array.from(o.getClientRects())}function _o(o){let t=U(o),n=D(o),u=o.ownerDocument.body,r=Z(t.scrollWidth,t.clientWidth,u.scrollWidth,u.clientWidth),s=Z(t.scrollHeight,t.clientHeight,u.scrollHeight,u.clientHeight),h=-n.scrollLeft+so(o),i=-n.scrollTop;if(H(u).direction==="rtl")h+=Z(t.clientWidth,u.clientWidth)-r;return{width:r,height:s,x:h,y:i}}function Po(o,t){let n=k(o),u=U(o),r=n.visualViewport,s=u.clientWidth,h=u.clientHeight,i=0,c=0;if(r){s=r.width,h=r.height;let m=w();if(!m||m&&t==="fixed")i=r.offsetLeft,c=r.offsetTop}return{width:s,height:h,x:i,y:c}}function xo(o,t){let n=Q(o,!0,t==="fixed"),u=n.top+o.clientTop,r=n.left+o.clientLeft,s=J(o)?Y(o):B(1),h=o.clientWidth*s.x,i=o.clientHeight*s.y,c=r*s.x,m=u*s.y;return{width:h,height:i,x:c,y:m}}function Go(o,t,n){let u;if(t==="viewport")u=Po(o,n);else if(t==="document")u=_o(U(o));else if(N(t))u=xo(t,n);else{let r=jo(o);u={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return S(u)}function Ko(o,t){let n=G(o);if(n===t||!N(n)||j(n))return!1;return H(n).position==="fixed"||Ko(n,t)}function Ao(o,t){let n=t.get(o);if(n)return n;let u=V(o,[],!1).filter((i)=>N(i)&&a(i)!=="body"),r=null,s=H(o).position==="fixed",h=s?G(o):o;while(N(h)&&!j(h)){let i=H(h),c=A(h);if(!c&&i.position==="fixed")r=null;if(s?!c&&!r:!c&&i.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||X(h)&&!c&&Ko(o,h))u=u.filter((d)=>d!==h);else r=i;h=G(h)}return t.set(o,u),u}function wo(o){let{element:t,boundary:n,rootBoundary:u,strategy:r}=o,h=[...n==="clippingAncestors"?$(t)?[]:Ao(t,this._c):[].concat(n),u],i=h[0],c=h.reduce((m,d)=>{let p=Go(t,d,r);return m.top=Z(p.top,m.top),m.right=F(p.right,m.right),m.bottom=F(p.bottom,m.bottom),m.left=Z(p.left,m.left),m},Go(t,i,r));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Oo(o){let{width:t,height:n}=ao(o);return{width:t,height:n}}function Ro(o,t,n){let u=J(t),r=U(t),s=n==="fixed",h=Q(o,!0,s,t),i={scrollLeft:0,scrollTop:0},c=B(0);if(u||!u&&!s){if(a(t)!=="body"||X(r))i=D(t);if(u){let b=Q(t,!0,s,t);c.x=b.x+t.clientLeft,c.y=b.y+t.clientTop}else if(r)c.x=so(r)}let m=r&&!u&&!s?Qo(r,i):B(0),d=h.left+i.scrollLeft-c.x-m.x,p=h.top+i.scrollTop-c.y-m.y;return{x:d,y:p,width:h.width,height:h.height}}function ro(o){return H(o).position==="static"}function Zo(o,t){if(!J(o)||H(o).position==="fixed")return null;if(t)return t(o);let n=o.offsetParent;if(U(o)===n)n=n.ownerDocument.body;return n}function Vo(o,t){let n=k(o);if($(o))return n;if(!J(o)){let r=G(o);while(r&&!j(r)){if(N(r)&&!ro(r))return r;r=G(r)}return n}let u=Zo(o,t);while(u&&Jo(u)&&ro(u))u=Zo(u,t);if(u&&j(u)&&ro(u)&&!A(u))return n;return u||vo(o)||n}var lo=async function(o){let t=this.getOffsetParent||Vo,n=this.getDimensions,u=await n(o.floating);return{reference:Ro(o.reference,await t(o.floating),o.strategy),floating:{x:0,y:0,width:u.width,height:u.height}}};function fo(o){return H(o).direction==="rtl"}var eo={convertOffsetParentRelativeRectToViewportRelativeRect:$o,getDocumentElement:U,getClippingRect:wo,getOffsetParent:Vo,getElementRects:lo,getClientRects:Do,getDimensions:Oo,getScale:Y,isElement:N,isRTL:fo};function ot(o,t){let n=null,u,r=U(o);function s(){var i;clearTimeout(u),(i=n)==null||i.disconnect(),n=null}function h(i,c){if(i===void 0)i=!1;if(c===void 0)c=1;s();let{left:m,top:d,width:p,height:b}=o.getBoundingClientRect();if(!i)t();if(!p||!b)return;let E=z(d),q=z(r.clientWidth-(m+p)),g=z(r.clientHeight-(d+b)),C=z(m),T={rootMargin:-E+"px "+-q+"px "+-g+"px "+-C+"px",threshold:Z(0,F(1,c))||1},I=!0;function v(M){let l=M[0].intersectionRatio;if(l!==c){if(!I)return h();if(!l)u=setTimeout(()=>{h(!1,0.0000001)},1000);else h(!1,l)}I=!1}try{n=new IntersectionObserver(v,{...T,root:r.ownerDocument})}catch(M){n=new IntersectionObserver(v,T)}n.observe(o)}return h(!0),s}function Xo(o,t,n,u){if(u===void 0)u={};let{ancestorScroll:r=!0,ancestorResize:s=!0,elementResize:h=typeof ResizeObserver==="function",layoutShift:i=typeof IntersectionObserver==="function",animationFrame:c=!1}=u,m=ho(o),d=r||s?[...m?V(m):[],...V(t)]:[];d.forEach((y)=>{r&&y.addEventListener("scroll",n,{passive:!0}),s&&y.addEventListener("resize",n)});let p=m&&i?ot(m,n):null,b=-1,E=null;if(h){if(E=new ResizeObserver((y)=>{let[T]=y;if(T&&T.target===m&&E)E.unobserve(t),cancelAnimationFrame(b),b=requestAnimationFrame(()=>{var I;(I=E)==null||I.observe(t)});n()}),m&&!c)E.observe(m);E.observe(t)}let q,g=c?Q(o):null;if(c)C();function C(){let y=Q(o);if(g&&(y.x!==g.x||y.y!==g.y||y.width!==g.width||y.height!==g.height))n();g=y,q=requestAnimationFrame(C)}return n(),()=>{var y;if(d.forEach((T)=>{r&&T.removeEventListener("scroll",n),s&&T.removeEventListener("resize",n)}),p==null||p(),(y=E)==null||y.disconnect(),E=null,c)cancelAnimationFrame(q)}}var Yo=(o,t,n)=>{let u=new Map,r={platform:eo,...n},s={...r.platform,_c:u};return Ho(o,t,{...r,platform:s})};class co{target;content;tooltipElement;constructor(o,t){this.target=o,this.content=t,this.tooltipElement=null,this.init()}init(){this.target.addEventListener("mouseenter",()=>this.show()),this.target.addEventListener("mouseleave",()=>this.hide())}createTooltip(){if(this.tooltipElement)return;this.tooltipElement=document.createElement("div"),this.tooltipElement.className="tooltip-component",this.tooltipElement.setAttribute("role","tooltip");let o=document.createElement("div");o.className="tooltip-content tooltip-top";let t=document.createElement("div");t.className="tooltip-body tooltip-top",t.innerHTML=this.content,o.appendChild(t),this.tooltipElement.appendChild(o),document.body.appendChild(this.tooltipElement)}positionTooltip(){if(!this.tooltipElement)return;let o=()=>{Yo(this.target,this.tooltipElement,{placement:"top"}).then(({x:n,y:u})=>{this.tooltipElement.style.left=`${n}px`,this.tooltipElement.style.top=`${u}px`,this.tooltipElement.style.opacity="1",this.tooltipElement.style.transform="translate(0px, 0px)"})},t=Xo(this.target,this.tooltipElement,o);this.tooltipElement.addEventListener("mouseleave",()=>t()),o()}show(){this.createTooltip(),this.positionTooltip()}hide(){if(this.tooltipElement)document.body.removeChild(this.tooltipElement),this.tooltipElement=null}}var tt=function o(t){let n=document.createElement("style");n.innerHTML=t,document.head.append(n)};tt(".flex-row{flex-direction:row!important}");var Fo={name:"[System] AddSetting",author:[],description:"Add settings.",version:"1.0.0",system:!0,paths:[{trigger(o){return o.startsWith("/settings")},handler(){let o=document.querySelector('a[href="https://www.chess.com/settings/board"].settings-menu-link'),t=document.createElement("a");t.href="#",t.className="settings-menu-link";let n=document.createElement("span");n.setAttribute("aria-hidden","true"),n.className="icon-font-chess circle-gearwheel settings-icon";let u=document.createElement("span");u.className="settings-link-name",u.textContent="Better Chess.com",t.appendChild(n),t.appendChild(u),o.parentNode.insertBefore(t,o),t.addEventListener("click",()=>{document.querySelectorAll(".settings-menu-link-active").forEach((p)=>{p.classList.remove("settings-menu-link-active")}),t.classList.add("settings-menu-link-active");let s=document.querySelector(".layout-column-two");while(s.firstChild)s.firstChild.remove();let h=document.createElement("div");h.className="v5-section";let i=document.createElement("div");i.className="v5-section-content";let c=document.createElement("h1");c.className="settings-category-title",c.textContent="Better Chess.com",i.appendChild(c);let m=document.createElement("div");m.className="settings-short-form";let d=K();for(let p of R){let b=d.includes(p.name),E=document.createElement("div");E.className="settings-form-group settings-form-switch-group";let q=document.createElement("label");if(q.setAttribute("for","setting_"+p.name),q.className="settings-label-text flex-row",q.textContent=p.name,p.description){let v=document.createElement("span");v.className="icon-font-chess circle-question settings-question-icon",new co(v,p.description),q.appendChild(v)}let g=document.createElement("div");g.className="settings-toggle-switch";let C=document.createElement("div");C.className="cc-switch-component cc-switch-large";let y=document.createElement("input");y.type="checkbox",y.className="cc-switch-checkbox",y.id="setting_"+p.name,y.required=!0,y.disabled=p.system||!1,y.setAttribute("size","large"),y.setAttribute("isswitch","isSwitch"),y.checked=!b,y.addEventListener("change",()=>{if(b)Co(p.name);else qo(p.name)});let T=document.createElement("label");T.className="cc-switch-label",T.setAttribute("for","setting_"+p.name);let I=document.createElement("div");I.className="cc-switch-button",T.appendChild(I),C.appendChild(y),C.appendChild(T),g.appendChild(C),E.appendChild(q),E.appendChild(g),m.appendChild(E)}i.appendChild(m),h.appendChild(i),s.appendChild(h)})}}]};var _=[];_.push(Eo);_.push(yo);_.push(go);_.push(Fo);var R=_;var nt=function o(t){let n=document.createElement("style");n.innerHTML=t,document.head.append(n)};nt(".alerts-container{align-items:center;display:flex;flex-direction:column;justify-content:center;left:0;pointer-events:none;position:fixed;right:0;top:0;width:auto;z-index:9001}.no-nav .alerts-container{left:0}@media (min-width:60em){.alerts-container{left:var(--navWidth)}}.alerts-alert{align-items:center;border-radius:var(--radius-m);color:#fff;display:flex;font-weight:600;margin-bottom:1rem;max-width:105.2rem;min-height:5rem;padding:0 0 0 1.5rem;pointer-events:auto;position:relative;width:100%}.alerts-alert:first-child{border-radius:0 0 var(--radius-m) var(--radius-m)}.alerts-alert:last-child{margin-bottom:0}.alerts-message{flex:1;line-height:1.5;padding:1.3rem 0}.alerts-message a,.alerts-message button{background:0 0;border:none;color:#fff;font-size:1.4rem;font-weight:600;padding:0;text-decoration:underline}.alerts-message a:focus,.alerts-message a:hover,.alerts-message button:focus,.alerts-message button:hover{text-decoration:none}.alerts-close{align-self:flex-start;background:0 0;border:none;flex-shrink:0;font-weight:600;height:5rem;margin:0;padding:0;width:5rem}.alerts-close .icon-font-chess{color:rgba(0,0,0,.5);font-size:2rem;margin:0 auto}.alerts-close:focus .icon-font-chess,.alerts-close:hover .icon-font-chess{color:rgba(0,0,0,.8)}.alerts-error{background-color:var(--color-red-400)}.alerts-info,.alerts-topical{background-color:var(--color-blue-300)}.alerts-success{background-color:var(--color-green-300)}.alerts-warning{background-color:var(--color-gold-400)}.btn-link-inline{display:inline-block}@keyframes index-alertEnter{0%{opacity:0;transform:translate3d(0,-25%,0)}to{opacity:1;transform:translateZ(0)}}@keyframes index-alertLeave{0%{max-height:20rem;opacity:1;transform:translateY(0)}to{max-height:0;opacity:0;transform:translateY(-50%)}}.alerts-enter{animation:index-alertEnter .1s ease-in both;animation-delay:.1s;opacity:0}.alerts-leave{animation:index-alertLeave .2s ease-in-out both;min-height:0}");class io{message;type;duration;constructor(o,t="info",n=7000){this.message=o,this.type=t,this.duration=n}show(){let o=document.getElementById("widget-alert-flash");if(!o)o=document.createElement("div"),o.id="widget-alert-flash",o.className="alerts-container",document.body.appendChild(o);let t=document.createElement("div"),n=`alert-${Date.now()}`;t.id=n,t.className=`alerts-alert alerts-enter alerts-${this.type}`;let u=document.createElement("span");u.className="alerts-message",u.textContent=this.message,t.appendChild(u);let r=document.createElement("button");r.className="alerts-close",r.type="button",r.innerHTML='<span class="icon-font-chess x"></span>',r.addEventListener("click",()=>{if(t.parentNode)t.parentNode.removeChild(t)}),t.appendChild(r),o.appendChild(t),setTimeout(()=>{if(t.parentNode)t.parentNode.removeChild(t)},this.duration)}}function ut(){if(!window.location.host.endsWith("chess.com"))return;let o=localStorage.getItem("toast");if(o)try{let n=JSON.parse(o);new io(n.message,n.type).show(),localStorage.setItem("toast","")}catch(n){L.error(n)}let t=K();for(let n of R){if(t.includes(n.name))continue;for(let{trigger:u,handler:r}of n.paths)try{if(u(window.location.pathname))r(window.location.pathname)}catch(s){L.error("Plugin "+n.name+"error: "+s)}}}ut();

})();