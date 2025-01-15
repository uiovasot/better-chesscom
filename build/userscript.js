// ==UserScript==
// @name         Better Chess.com
// @namespace    http://tampermonkey.net/
// @version      1.3.0
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
class T{static getTime(){return new Date().toTimeString().split(" ")[0]}static error(...t){console.log(`[${this.getTime()}] [Error] ${t.join(" ")}`)}static success(...t){console.log(`[${this.getTime()}] [Success] ${t.join(" ")}`)}static warning(...t){console.log(`[${this.getTime()}] [Warning] ${t.join(" ")}`)}static info(...t){console.log(`[${this.getTime()}] [Info] ${t.join(" ")}`)}}async function bt(t){try{let o=await fetch(t);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);let n=await o.text(),u=new DOMParser().parseFromString(n,"text/html").querySelector('input[name="forum_topic_comment[_token]"]')?.getAttribute("value");if(!u)throw new Error("토큰을 찾지 못했습니다.");return u}catch(o){T.error(o)}}async function Et(t,o,n,s=!0){try{let r=await fetch(t+"&newCommentCount=1",{headers:{accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","accept-language":"ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4","cache-control":"max-age=0","content-type":"application/x-www-form-urlencoded",priority:"u=0, i","sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},referrer:t+"&newCommentCount=1",referrerPolicy:"strict-origin-when-cross-origin",body:"mce_0=%3Cp%3E"+encodeURIComponent(n)+"%3C%2Fp%3E&forum_topic_comment%5Bbody%5D=%3Cp%3E"+encodeURIComponent(n)+"%3C%2Fp%3E&forum_topic_comment%5B_token%5D="+o+"&Post=&following="+(s?"on":"off"),method:"POST",mode:"cors",credentials:"include"});if(T.success(`Add comment: ${n}`),!r.ok)throw new Error(`HTTP error! status: ${r.status}`)}catch(r){T.error(r)}}async function O(t){try{let o=await fetch(t);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);let n=await o.text(),u=new DOMParser().parseFromString(n,"text/html").querySelectorAll('form[action*="delete_comment"]'),c=[];u.forEach((i)=>{let e=i.getAttribute("action");if(!e||e.includes("delete_comment?all=1"))return;let h=i.querySelector('input[name="_token"]'),a=h?h.value:null;if(e&&a)c.push({action:e,token:a})});for(let{action:i,token:e}of c)await fetch(i,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({_token:e})}),T.success(`Deleted: ${i}`);return c}catch(o){T.error(o)}}var F="";F=window.context?.csrf?.token;async function R(t,o){await fetch(`https://www.chess.com/callback/track-content/forum/${t}/${o}`,{headers:{accept:"application/json, text/plain, */*","accept-language":"ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4","cache-control":"no-cache","content-type":"application/json",pragma:"no-cache",priority:"u=1, i","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-origin"},referrerPolicy:"strict-origin-when-cross-origin",body:`{"_token":"${F}"}`,method:"POST",mode:"cors",credentials:"include"})}var yt={name:"AddConsoleApi",author:[],description:"Adds useful functions to the console.",version:"1.0.0",paths:[{trigger(t){return!0},handler(){class t{url;token;constructor(o=window.location.href){this.url=o}async init(){this.token=await bt(this.url)}async addComment({message:o,following:n=!0}){if(!this.token)throw new Error("You need to init first.");return await Et(this.url,this.token,o,n)}async removePage(o=window.location.href){await O(o)}async trackForum(o,n){await R(o,n)}}window.CHESSCOM_API=t}}]};class rt{message;onConfirm;modalContainer;constructor(t,o){this.message=t,this.onConfirm=o||null,this.modalContainer=null}open(){this.modalContainer=document.createElement("div"),this.modalContainer.className="modal-container-component";let t=document.createElement("div");t.className="modal-container-bg",t.addEventListener("click",()=>this.close()),this.modalContainer.appendChild(t);let o=document.createElement("section");o.className="modal-content-component confirm-popover-modal";let n=document.createElement("div");n.className="confirm-popover-messageLabel",n.textContent=this.message,o.appendChild(n);let s=document.createElement("div");s.className="confirm-popover-buttons";let r=document.createElement("button");r.className="cc-button-component cc-button-secondary cc-button-medium cc-button-min-width",r.type="button",r.textContent="Cancel",r.addEventListener("click",()=>this.close()),s.appendChild(r);let u=document.createElement("button");u.className="cc-button-component cc-button-primary cc-button-medium cc-button-min-width",u.type="button",u.textContent="Ok",u.addEventListener("click",()=>{if(this.onConfirm)this.onConfirm();this.close()}),s.appendChild(u),o.appendChild(s),this.modalContainer.appendChild(o),document.body.appendChild(this.modalContainer)}close(){if(this.modalContainer)document.body.removeChild(this.modalContainer),this.modalContainer=null}}function lt(t){localStorage.setItem("toast",JSON.stringify(t))}var At=function t(o){let n=document.createElement("style");n.innerHTML=o,document.head.append(n)};At(".remove-page-component{margin-top:1rem;display:flex;flex-direction:row-reverse}");var qt={name:"AutoRemoveComments",author:[],description:"Automatically deletes comments on that page.",version:"1.0.0",paths:[{trigger(t){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(t)},handler(){let t=document.createElement("div");t.className="remove-page-component";let o=document.createElement("button");o.className="ui_pagination-item-component",o.innerText="Delete page",o.onclick=()=>{new rt("Are you sure you want to delete this page?",async()=>{await O(window.location.href),lt({type:"success",message:"Page deletion has been completed."}),history.go(0)}).open()},t.appendChild(o);let n=document.querySelector(".forums-single-sharing.forums-single-sharing-transparent");n.parentNode.insertBefore(t,n)}}]};var Ot=function t(o){let n=document.createElement("style");n.innerHTML=o,document.head.append(n)};Ot(".emotes-button{cursor:pointer}");async function Ct(t,o,n){try{let s=await fetch(`/service/reactions/contents/${t}/reactions/${o}`,{headers:{accept:"application/json","accept-language":"ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4","cache-control":"no-cache","content-type":"application/json",pragma:"no-cache",priority:"u=1, i","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-origin"},referrerPolicy:"strict-origin-when-cross-origin",body:JSON.stringify({_token:F}),method:n?"DELETE":"POST",mode:"cors",credentials:"include"});if(!n&&s.status!==201||n&&s.status!==200)throw new Error("HTTP error!")}catch(s){T.error(s)}}var Tt={name:"AccessAllEmotes",author:[],description:"Allows you to use emotes that are only available with a membership in the forums!",version:"1.0.0",paths:[{trigger(t){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(t)},async handler(t){let n=await(await fetch(t)).text(),c=new DOMParser().parseFromString(n,"text/html").querySelector(".forums-single-list").querySelectorAll(".comment-post-component"),i=new Map;c.forEach((a)=>{let d=a.id,m=a.querySelector(".reactions-multiple-contents")?.getAttribute("data-content-id")||"";i.set(d,m)});let e=new MutationObserver((a,d)=>{for(let m of a)if(m.type==="childList")m.addedNodes.forEach((p)=>{if(p.nodeType===1&&p.classList.contains("emotes-body")){let C=p,b=C.parentElement.parentElement.parentElement.parentElement.parentElement.id;C.querySelectorAll(".emotes-disabledIcons").forEach((y)=>{y.querySelector(".emotes-disabledOverlay")?.remove(),y.querySelectorAll("span").forEach((g)=>{g.classList.add("emotes-button");let E="";g.classList.forEach((q)=>{if(q.startsWith("emotes-emoticon-select-"))E=q.replace("emotes-emoticon-select-","")}),g.addEventListener("click",async()=>{let q=i.get(b);await Ct(q,E,!1),console.log(q)})})})}})}),h={childList:!0,subtree:!0};e.observe(document.body,h)}}]};function Lt(t){let o=document.createElement("body");return o.innerHTML=t,o.querySelectorAll("[data-src]").forEach((n)=>{n.setAttribute("src",n.getAttribute("data-src")),n.removeAttribute("data-src")}),o.innerHTML}class ut{id;username;avatarUrl;content;timestamp;voteCount;versions;deleted;forum;constructor(t,o){this.id=t.id,this.username=t.username,this.avatarUrl=t.avatarUrl,this.content=t.content,this.timestamp=t.timestamp,this.voteCount=t.voteCount,this.versions=t.versions||[],this.deleted=t.deleted||!1,this.forum=o}addVersion(t){if(this.content!==t&&!this.deleted){if(this.versions.length===0||this.versions[this.versions.length-1]!==t){if(this.versions.unshift(this.content),this.content=t,T.info(`New version added for Comment ${this.id}: ${t}`),T.info(`Versions history (${this.versions.length}): ${this.versions.join(" -> ")}`),this.forum)this.forum.saveToIndexedDB().catch((o)=>{console.error("Error saving comment version to IndexedDB:",o)})}}}markAsDeleted(){if(!this.deleted){if(this.deleted=!0,this.forum)this.forum.saveToIndexedDB().catch((t)=>{T.error("Error saving deleted status to IndexedDB:",t)})}}setForum(t){this.forum=t}}class it{comments=[];allComments=[];forumId;constructor(t){this.forumId=t}async parseAndUpdateComments(t){try{let o=await this.openIndexedDB(),n=this.parseComments(t),s=await this.loadFromIndexedDB();n.forEach((r)=>{let u=s.find((c)=>c.id===r.id);if(u){if(!u.deleted&&u.content!==r.content){if(u.addVersion(r.content),this.comments.findIndex((i)=>i.id===u.id)===-1)this.comments.push(u)}}else this.comments.push(r)}),s.forEach((r)=>{if(!n.some((c)=>c.id===r.id)&&!r.deleted){if(r.markAsDeleted(),!this.comments.includes(r))this.comments.push(r)}this.allComments.push(r)}),await this.saveToIndexedDB()}catch(o){throw T.error("Error parsing and updating comments:"+o),o}return this}parseComments(t){let o=t.querySelectorAll(".comment-post-component"),n=[];return o.forEach((s)=>{let r=s.id.replace("comment-",""),u=s.querySelector(".user-tagline-username")?.textContent?.trim()||"",c=s.querySelector(".post-view-meta-image")?.getAttribute("data-src")||"",i=Lt(s.querySelector(".comment-post-body")?.innerHTML||""),e=s.querySelector(".comment-post-actions-time span")?.getAttribute("title")||"",h=parseInt(s.querySelector(".vote-container-count")?.textContent||"0",10),a={id:r,forumId:this.forumId,username:u,avatarUrl:c,content:i,timestamp:e,voteCount:h},d=new ut(a,this);n.push(d)}),n}async loadFromIndexedDB(){try{let t=await this.openIndexedDB();return new Promise((o,n)=>{let u=t.transaction("comments","readonly").objectStore("comments").getAll();u.onsuccess=()=>{let i=u.result.filter((e)=>e.forumId===this.forumId).map((e)=>new ut(e,this));o(i)},u.onerror=()=>{o([])}})}catch(t){return[]}}async saveToIndexedDB(){try{let t=await this.openIndexedDB();return new Promise((o,n)=>{let s=t.transaction("comments","readwrite"),r=s.objectStore("comments");this.comments.forEach((u)=>{let c=r.put({id:u.id,forumId:this.forumId,username:u.username,avatarUrl:u.avatarUrl,content:u.content,timestamp:u.timestamp,voteCount:u.voteCount,versions:u.versions,deleted:u.deleted});c.onerror=()=>{T.error(`Error saving comment ${u.id} to IndexedDB`),n(c.error)}}),s.oncomplete=()=>{T.success("Comments saved to IndexedDB."),o()},s.onerror=()=>{T.error("Error in IndexedDB transaction"),n(s.error)}})}catch(t){throw T.error("Error saving comments to IndexedDB:"+t),t}}async openIndexedDB(){return new Promise((t,o)=>{let n=indexedDB.open("ForumCommentsDB",6);n.onupgradeneeded=()=>{let s=n.result;if(!s.objectStoreNames.contains("comments"))s.createObjectStore("comments",{keyPath:"id"})},n.onsuccess=()=>{t(n.result)},n.onerror=()=>{o(n.error)}})}log(){this.comments.forEach((t)=>{let o=t.deleted?"[DELETED] ":"";T.info(`${o}[${t.id}] ${t.username}: ${t.content}`),T.info(`  Versions (${t.versions.length}): ${t.versions.join(" -> ")}`)})}}function ct(t){let o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return t.replace(/[&<>"'/]/g,(n)=>o[n])}function vt(t,o){return new Promise((n,s)=>{let r=indexedDB.open(t);r.onsuccess=()=>{let e=r.result.transaction(o,"readwrite").objectStore(o).clear();e.onsuccess=()=>{T.success(`All data cleared from ${o} in ${t}.`),n()},e.onerror=()=>{T.error(`Error clearing data from ${o}:`,e.error?.message),s(e.error)}},r.onerror=()=>{T.error(`Error opening database ${t}:`,r.error?.message),s(r.error)}})}var Rt=function t(o){let n=document.createElement("style");n.innerHTML=o,document.head.append(n)};Rt(".alerts-container{align-items:center;display:flex;flex-direction:column;justify-content:center;left:0;pointer-events:none;position:fixed;right:0;top:0;width:auto;z-index:9001}.no-nav .alerts-container{left:0}@media (min-width:60em){.alerts-container{left:var(--navWidth)}}.alerts-alert{align-items:center;border-radius:var(--radius-m);color:#fff;display:flex;font-weight:600;margin-bottom:1rem;max-width:105.2rem;min-height:5rem;padding:0 0 0 1.5rem;pointer-events:auto;position:relative;width:100%}.alerts-alert:first-child{border-radius:0 0 var(--radius-m) var(--radius-m)}.alerts-alert:last-child{margin-bottom:0}.alerts-message{flex:1;line-height:1.5;padding:1.3rem 0}.alerts-message a,.alerts-message button{background:0 0;border:none;color:#fff;font-size:1.4rem;font-weight:600;padding:0;text-decoration:underline}.alerts-message a:focus,.alerts-message a:hover,.alerts-message button:focus,.alerts-message button:hover{text-decoration:none}.alerts-close{align-self:flex-start;background:0 0;border:none;flex-shrink:0;font-weight:600;height:5rem;margin:0;padding:0;width:5rem}.alerts-close .icon-font-chess{color:rgba(0,0,0,.5);font-size:2rem;margin:0 auto}.alerts-close:focus .icon-font-chess,.alerts-close:hover .icon-font-chess{color:rgba(0,0,0,.8)}.alerts-error{background-color:var(--color-red-400)}.alerts-info,.alerts-topical{background-color:var(--color-blue-300)}.alerts-success{background-color:var(--color-green-300)}.alerts-warning{background-color:var(--color-gold-400)}.btn-link-inline{display:inline-block}@keyframes index-alertEnter{0%{opacity:0;transform:translate3d(0,-25%,0)}to{opacity:1;transform:translateZ(0)}}@keyframes index-alertLeave{0%{max-height:20rem;opacity:1;transform:translateY(0)}to{max-height:0;opacity:0;transform:translateY(-50%)}}.alerts-enter{animation:index-alertEnter .1s ease-in both;animation-delay:.1s;opacity:0}.alerts-leave{animation:index-alertLeave .2s ease-in-out both;min-height:0}");class X{message;type;duration;constructor(t,o="info",n=7000){this.message=t,this.type=o,this.duration=n}show(){let t=document.getElementById("widget-alert-flash");if(!t)t=document.createElement("div"),t.id="widget-alert-flash",t.className="alerts-container",document.body.appendChild(t);let o=document.createElement("div"),n=`alert-${Date.now()}`;o.id=n,o.className=`alerts-alert alerts-enter alerts-${this.type}`;let s=document.createElement("span");s.className="alerts-message",s.textContent=this.message,o.appendChild(s);let r=document.createElement("button");r.className="alerts-close",r.type="button",r.innerHTML='<span class="icon-font-chess x"></span>',r.addEventListener("click",()=>{if(o.parentNode)o.parentNode.removeChild(o)}),o.appendChild(r),t.appendChild(o),setTimeout(()=>{if(o.parentNode)o.parentNode.removeChild(o)},this.duration)}}function K(){let t=localStorage.getItem("DisabledPluginsV1"),o={};if(t)try{o=JSON.parse(t)}catch(n){console.error("Error parsing DisabledPlugins",n)}return o}function kt(t){let o=K();o[t]=!0,localStorage.setItem("DisabledPluginsV1",JSON.stringify(o))}function Ht(t){let o=K();o[t]=!1,localStorage.setItem("DisabledPluginsV1",JSON.stringify(o))}function It(){let t=localStorage.getItem("PluginSettingsV1"),o={};if(t)try{o=JSON.parse(t)}catch(n){console.error("Error parsing PluginSettings",n)}return o}function ht(t,o,n){let s=It();if(!s[t])s[t]={};s[t][o]=n,localStorage.setItem("PluginSettingsV1",JSON.stringify(s))}function Y(t,o,n){return It()[t]?.[o]??n}var Nt={name:"MessageLogger",author:[],description:"Message logger.",version:"1.0.0",settings:{removeHistory:{type:"button",label:"Clear",onClick:async()=>{await vt("ForumCommentsDB","comments"),new X("All message history has been deleted!","success").show()}},showRevisionHistory:{type:"switch",label:"Show revision history",default:!1,description:"Show revision history of messages. This feature has many bugs so we do not recommend using it."}},paths:[{trigger(t){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(t)},async handler(t){let o=t.split("/"),n=o[o.length-1].split(/[?#]/)[0],s=document.querySelector(".forums-single-list"),r=new it(n);await r.parseAndUpdateComments(s);let u=Y("MessageLogger","showRevisionHistory",!1);window.forum=r;let c=[];r.allComments.forEach((i)=>{let e=s.querySelector(`#comment-${i.id}`);if(i.deleted){let h=document.createElement("div");h.id=`comment-${i.id}`,h.className="comment-post-component vote-parent",h.style.opacity="1",h.style.fontStyle="italic";let a=document.createElement("a");a.className="post-view-meta-avatar comment-post-avatar",a.style.width="5rem",a.style.height="5rem",a.href=`https://www.chess.com/member/${encodeURIComponent(i.username)}`,a.title=i.username,a.setAttribute("data-has-user-popover","true"),a.setAttribute("v-user-popover",`"{&quot;username&quot;:&quot;${ct(i.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`);let d=document.createElement("img");d.className="post-view-meta-image",d.alt=i.username,d.src=i.avatarUrl,a.appendChild(d),h.appendChild(a);let m=document.createElement("div");m.className="comment-post-meta";let p=document.createElement("div");p.className="user-tagline-component",p.setAttribute("data-username",i.username),p.setAttribute("data-visibility-policy","0");let C=document.createElement("a");C.className="user-username-component user-username-link user-tagline-username user-username-blue-with-dark-mode",C.href=`https://www.chess.com/member/${encodeURIComponent(i.username)}`,C.innerText=i.username,a.setAttribute("data-has-user-popover","true"),a.setAttribute("v-user-popover",`"{&quot;username&quot;:&quot;${ct(i.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`),p.appendChild(C),m.appendChild(p);let b=document.createElement("div");b.className="comment-post-actions-component",b.id=i.id;let y=document.createElement("span");y.className="comment-post-actions-time";let g=document.createElement("span");g.title=i.timestamp,g.innerText=i.timestamp,y.appendChild(g),b.appendChild(y);let E=document.createElement("span");E.className="comment-post-actions-number",E.innerText="deleted",b.appendChild(E),m.appendChild(b),h.appendChild(m);let q=document.createElement("div");q.className="comment-post-body-component comment-post-body",q.innerHTML=i.content,h.appendChild(q);let l=c[c.length-1];if(l)l.parentNode?.insertBefore(h,l.nextSibling);c.push(h)}else if(e)c.push(e);if(i.versions.length>0&&!i.deleted&&u){let h=e.querySelector(".comment-post-body");if(h)i.versions.forEach((a)=>{let d=document.createElement("br");h.appendChild(d);let m=document.createElement("span");m.style.color="#666",m.style.marginLeft="5px",m.textContent="(edited)",h.appendChild(m);let p=document.createElement("div");p.style.fontSize="12px",p.style.color="#666",p.style.marginTop="5px",p.innerHTML=a,h.appendChild(p)})}}),r.log()}}]};var{min:D,max:U,round:z,floor:W}=Math,N=(t)=>({x:t,y:t});function et(t){return t.split("-")[0]}function Mt(t){return t.split("-")[1]}function Bt(t){return t==="x"?"y":"x"}function St(t){return t==="y"?"height":"width"}function mt(t){return["top","bottom"].includes(et(t))?"y":"x"}function Ut(t){return Bt(mt(t))}function _(t){let{x:o,y:n,width:s,height:r}=t;return{width:s,height:r,top:n,left:o,right:o+s,bottom:n+r,x:o,y:n}}function Jt(t,o,n){let{reference:s,floating:r}=t,u=mt(o),c=Ut(o),i=St(c),e=et(o),h=u==="y",a=s.x+s.width/2-r.width/2,d=s.y+s.height/2-r.height/2,m=s[i]/2-r[i]/2,p;switch(e){case"top":p={x:a,y:s.y-r.height};break;case"bottom":p={x:a,y:s.y+s.height};break;case"right":p={x:s.x+s.width,y:d};break;case"left":p={x:s.x-r.width,y:d};break;default:p={x:s.x,y:s.y}}switch(Mt(o)){case"start":p[c]-=m*(n&&h?-1:1);break;case"end":p[c]+=m*(n&&h?-1:1);break}return p}var jt=async(t,o,n)=>{let{placement:s="bottom",strategy:r="absolute",middleware:u=[],platform:c}=n,i=u.filter(Boolean),e=await(c.isRTL==null?void 0:c.isRTL(o)),h=await c.getElementRects({reference:t,floating:o,strategy:r}),{x:a,y:d}=Jt(h,s,e),m=s,p={},C=0;for(let b=0;b<i.length;b++){let{name:y,fn:g}=i[b],{x:E,y:q,data:l,reset:L}=await g({x:a,y:d,initialPlacement:s,placement:m,strategy:r,middlewareData:p,rects:h,platform:c,elements:{reference:t,floating:o}});if(a=E!=null?E:a,d=q!=null?q:d,p={...p,[y]:{...p[y],...l}},L&&C<=50){if(C++,typeof L==="object"){if(L.placement)m=L.placement;if(L.rects)h=L.rects===!0?await c.getElementRects({reference:t,floating:o,strategy:r}):L.rects;({x:a,y:d}=Jt(h,m,e))}b=-1}}return{x:a,y:d,placement:m,strategy:r,middlewareData:p}};function f(){return typeof window!=="undefined"}function J(t){if($t(t))return(t.nodeName||"").toLowerCase();return"#document"}function v(t){var o;return(t==null||(o=t.ownerDocument)==null?void 0:o.defaultView)||window}function M(t){var o;return(o=($t(t)?t.ownerDocument:t.document)||window.document)==null?void 0:o.documentElement}function $t(t){if(!f())return!1;return t instanceof Node||t instanceof v(t).Node}function H(t){if(!f())return!1;return t instanceof Element||t instanceof v(t).Element}function B(t){if(!f())return!1;return t instanceof HTMLElement||t instanceof v(t).HTMLElement}function Gt(t){if(!f()||typeof ShadowRoot==="undefined")return!1;return t instanceof ShadowRoot||t instanceof v(t).ShadowRoot}function Z(t){let{overflow:o,overflowX:n,overflowY:s,display:r}=I(t);return/auto|scroll|overlay|hidden|clip/.test(o+s+n)&&!["inline","contents"].includes(r)}function Kt(t){return["table","td","th"].includes(J(t))}function w(t){return[":popover-open",":modal"].some((o)=>{try{return t.matches(o)}catch(n){return!1}})}function tt(t){let o=ot(),n=H(t)?I(t):t;return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!o&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!o&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some((s)=>(n.willChange||"").includes(s))||["paint","layout","strict","content"].some((s)=>(n.contain||"").includes(s))}function Vt(t){let o=S(t);while(B(o)&&!j(o)){if(tt(o))return o;else if(w(o))return null;o=S(o)}return null}function ot(){if(typeof CSS==="undefined"||!CSS.supports)return!1;return CSS.supports("-webkit-backdrop-filter","none")}function j(t){return["html","body","#document"].includes(J(t))}function I(t){return v(t).getComputedStyle(t)}function P(t){if(H(t))return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop};return{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function S(t){if(J(t)==="html")return t;let o=t.assignedSlot||t.parentNode||Gt(t)&&t.host||M(t);return Gt(o)?o.host:o}function Zt(t){let o=S(t);if(j(o))return t.ownerDocument?t.ownerDocument.body:t.body;if(B(o)&&Z(o))return o;return Zt(o)}function V(t,o,n){var s;if(o===void 0)o=[];if(n===void 0)n=!0;let r=Zt(t),u=r===((s=t.ownerDocument)==null?void 0:s.body),c=v(r);if(u){let i=nt(c);return o.concat(c,c.visualViewport||[],Z(r)?r:[],i&&n?V(i):[])}return o.concat(r,V(r,[],n))}function nt(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Xt(t){let o=I(t),n=parseFloat(o.width)||0,s=parseFloat(o.height)||0,r=B(t),u=r?t.offsetWidth:n,c=r?t.offsetHeight:s,i=z(n)!==u||z(s)!==c;if(i)n=u,s=c;return{width:n,height:s,$:i}}function pt(t){return!H(t)?t.contextElement:t}function Q(t){let o=pt(t);if(!B(o))return N(1);let n=o.getBoundingClientRect(),{width:s,height:r,$:u}=Xt(o),c=(u?z(n.width):n.width)/s,i=(u?z(n.height):n.height)/r;if(!c||!Number.isFinite(c))c=1;if(!i||!Number.isFinite(i))i=1;return{x:c,y:i}}var ft=N(0);function Yt(t){let o=v(t);if(!ot()||!o.visualViewport)return ft;return{x:o.visualViewport.offsetLeft,y:o.visualViewport.offsetTop}}function to(t,o,n){if(o===void 0)o=!1;if(!n||o&&n!==v(t))return!1;return o}function G(t,o,n,s){if(o===void 0)o=!1;if(n===void 0)n=!1;let r=t.getBoundingClientRect(),u=pt(t),c=N(1);if(o)if(s){if(H(s))c=Q(s)}else c=Q(t);let i=to(u,n,s)?Yt(u):N(0),e=(r.left+i.x)/c.x,h=(r.top+i.y)/c.y,a=r.width/c.x,d=r.height/c.y;if(u){let m=v(u),p=s&&H(s)?v(s):s,C=m,b=nt(C);while(b&&s&&p!==C){let y=Q(b),g=b.getBoundingClientRect(),E=I(b),q=g.left+(b.clientLeft+parseFloat(E.paddingLeft))*y.x,l=g.top+(b.clientTop+parseFloat(E.paddingTop))*y.y;e*=y.x,h*=y.y,a*=y.x,d*=y.y,e+=q,h+=l,C=v(b),b=nt(C)}}return _({width:a,height:d,x:e,y:h})}function dt(t,o){let n=P(t).scrollLeft;if(!o)return G(M(t)).left+n;return o.left+n}function Dt(t,o,n){if(n===void 0)n=!1;let s=t.getBoundingClientRect(),r=s.left+o.scrollLeft-(n?0:dt(t,s)),u=s.top+o.scrollTop;return{x:r,y:u}}function oo(t){let{elements:o,rect:n,offsetParent:s,strategy:r}=t,u=r==="fixed",c=M(s),i=o?w(o.floating):!1;if(s===c||i&&u)return n;let e={scrollLeft:0,scrollTop:0},h=N(1),a=N(0),d=B(s);if(d||!d&&!u){if(J(s)!=="body"||Z(c))e=P(s);if(B(s)){let p=G(s);h=Q(s),a.x=p.x+s.clientLeft,a.y=p.y+s.clientTop}}let m=c&&!d&&!u?Dt(c,e,!0):N(0);return{width:n.width*h.x,height:n.height*h.y,x:n.x*h.x-e.scrollLeft*h.x+a.x+m.x,y:n.y*h.y-e.scrollTop*h.y+a.y+m.y}}function no(t){return Array.from(t.getClientRects())}function so(t){let o=M(t),n=P(t),s=t.ownerDocument.body,r=U(o.scrollWidth,o.clientWidth,s.scrollWidth,s.clientWidth),u=U(o.scrollHeight,o.clientHeight,s.scrollHeight,s.clientHeight),c=-n.scrollLeft+dt(t),i=-n.scrollTop;if(I(s).direction==="rtl")c+=U(o.clientWidth,s.clientWidth)-r;return{width:r,height:u,x:c,y:i}}function ro(t,o){let n=v(t),s=M(t),r=n.visualViewport,u=s.clientWidth,c=s.clientHeight,i=0,e=0;if(r){u=r.width,c=r.height;let h=ot();if(!h||h&&o==="fixed")i=r.offsetLeft,e=r.offsetTop}return{width:u,height:c,x:i,y:e}}function uo(t,o){let n=G(t,!0,o==="fixed"),s=n.top+t.clientTop,r=n.left+t.clientLeft,u=B(t)?Q(t):N(1),c=t.clientWidth*u.x,i=t.clientHeight*u.y,e=r*u.x,h=s*u.y;return{width:c,height:i,x:e,y:h}}function Qt(t,o,n){let s;if(o==="viewport")s=ro(t,n);else if(o==="document")s=so(M(t));else if(H(o))s=uo(o,n);else{let r=Yt(t);s={x:o.x-r.x,y:o.y-r.y,width:o.width,height:o.height}}return _(s)}function zt(t,o){let n=S(t);if(n===o||!H(n)||j(n))return!1;return I(n).position==="fixed"||zt(n,o)}function io(t,o){let n=o.get(t);if(n)return n;let s=V(t,[],!1).filter((i)=>H(i)&&J(i)!=="body"),r=null,u=I(t).position==="fixed",c=u?S(t):t;while(H(c)&&!j(c)){let i=I(c),e=tt(c);if(!e&&i.position==="fixed")r=null;if(u?!e&&!r:!e&&i.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||Z(c)&&!e&&zt(t,c))s=s.filter((a)=>a!==c);else r=i;c=S(c)}return o.set(t,s),s}function co(t){let{element:o,boundary:n,rootBoundary:s,strategy:r}=t,c=[...n==="clippingAncestors"?w(o)?[]:io(o,this._c):[].concat(n),s],i=c[0],e=c.reduce((h,a)=>{let d=Qt(o,a,r);return h.top=U(d.top,h.top),h.right=D(d.right,h.right),h.bottom=D(d.bottom,h.bottom),h.left=U(d.left,h.left),h},Qt(o,i,r));return{width:e.right-e.left,height:e.bottom-e.top,x:e.left,y:e.top}}function ho(t){let{width:o,height:n}=Xt(t);return{width:o,height:n}}function eo(t,o,n){let s=B(o),r=M(o),u=n==="fixed",c=G(t,!0,u,o),i={scrollLeft:0,scrollTop:0},e=N(0);if(s||!s&&!u){if(J(o)!=="body"||Z(r))i=P(o);if(s){let m=G(o,!0,u,o);e.x=m.x+o.clientLeft,e.y=m.y+o.clientTop}else if(r)e.x=dt(r)}let h=r&&!s&&!u?Dt(r,i):N(0),a=c.left+i.scrollLeft-e.x-h.x,d=c.top+i.scrollTop-e.y-h.y;return{x:a,y:d,width:c.width,height:c.height}}function at(t){return I(t).position==="static"}function Ft(t,o){if(!B(t)||I(t).position==="fixed")return null;if(o)return o(t);let n=t.offsetParent;if(M(t)===n)n=n.ownerDocument.body;return n}function Wt(t,o){let n=v(t);if(w(t))return n;if(!B(t)){let r=S(t);while(r&&!j(r)){if(H(r)&&!at(r))return r;r=S(r)}return n}let s=Ft(t,o);while(s&&Kt(s)&&at(s))s=Ft(s,o);if(s&&j(s)&&at(s)&&!tt(s))return n;return s||Vt(t)||n}var mo=async function(t){let o=this.getOffsetParent||Wt,n=this.getDimensions,s=await n(t.floating);return{reference:eo(t.reference,await o(t.floating),t.strategy),floating:{x:0,y:0,width:s.width,height:s.height}}};function ao(t){return I(t).direction==="rtl"}var po={convertOffsetParentRelativeRectToViewportRelativeRect:oo,getDocumentElement:M,getClippingRect:co,getOffsetParent:Wt,getElementRects:mo,getClientRects:no,getDimensions:ho,getScale:Q,isElement:H,isRTL:ao};function go(t,o){let n=null,s,r=M(t);function u(){var i;clearTimeout(s),(i=n)==null||i.disconnect(),n=null}function c(i,e){if(i===void 0)i=!1;if(e===void 0)e=1;u();let{left:h,top:a,width:d,height:m}=t.getBoundingClientRect();if(!i)o();if(!d||!m)return;let p=W(a),C=W(r.clientWidth-(h+d)),b=W(r.clientHeight-(a+m)),y=W(h),E={rootMargin:-p+"px "+-C+"px "+-b+"px "+-y+"px",threshold:U(0,D(1,e))||1},q=!0;function l(L){let k=L[0].intersectionRatio;if(k!==e){if(!q)return c();if(!k)s=setTimeout(()=>{c(!1,0.0000001)},1000);else c(!1,k)}q=!1}try{n=new IntersectionObserver(l,{...E,root:r.ownerDocument})}catch(L){n=new IntersectionObserver(l,E)}n.observe(t)}return c(!0),u}function _t(t,o,n,s){if(s===void 0)s={};let{ancestorScroll:r=!0,ancestorResize:u=!0,elementResize:c=typeof ResizeObserver==="function",layoutShift:i=typeof IntersectionObserver==="function",animationFrame:e=!1}=s,h=pt(t),a=r||u?[...h?V(h):[],...V(o)]:[];a.forEach((g)=>{r&&g.addEventListener("scroll",n,{passive:!0}),u&&g.addEventListener("resize",n)});let d=h&&i?go(h,n):null,m=-1,p=null;if(c){if(p=new ResizeObserver((g)=>{let[E]=g;if(E&&E.target===h&&p)p.unobserve(o),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var q;(q=p)==null||q.observe(o)});n()}),h&&!e)p.observe(h);p.observe(o)}let C,b=e?G(t):null;if(e)y();function y(){let g=G(t);if(b&&(g.x!==b.x||g.y!==b.y||g.width!==b.width||g.height!==b.height))n();b=g,C=requestAnimationFrame(y)}return n(),()=>{var g;if(a.forEach((E)=>{r&&E.removeEventListener("scroll",n),u&&E.removeEventListener("resize",n)}),d==null||d(),(g=p)==null||g.disconnect(),p=null,e)cancelAnimationFrame(C)}}var wt=(t,o,n)=>{let s=new Map,r={platform:po,...n},u={...r.platform,_c:s};return jt(t,o,{...r,platform:u})};class st{target;content;tooltipElement;constructor(t,o){this.target=t,this.content=o,this.tooltipElement=null,this.init()}init(){this.target.addEventListener("mouseenter",()=>this.show()),this.target.addEventListener("mouseleave",()=>this.hide())}createTooltip(){if(this.tooltipElement)return;this.tooltipElement=document.createElement("div"),this.tooltipElement.className="tooltip-component",this.tooltipElement.setAttribute("role","tooltip");let t=document.createElement("div");t.className="tooltip-content tooltip-top";let o=document.createElement("div");o.className="tooltip-body tooltip-top",o.innerHTML=this.content,t.appendChild(o),this.tooltipElement.appendChild(t),document.body.appendChild(this.tooltipElement)}positionTooltip(){if(!this.tooltipElement)return;let t=()=>{wt(this.target,this.tooltipElement,{placement:"top"}).then(({x:n,y:s})=>{this.tooltipElement.style.left=`${n}px`,this.tooltipElement.style.top=`${s}px`,this.tooltipElement.style.opacity="1",this.tooltipElement.style.transform="translate(0px, 0px)"})},o=_t(this.target,this.tooltipElement,t);this.tooltipElement.addEventListener("mouseleave",()=>o()),t()}show(){this.createTooltip(),this.positionTooltip()}hide(){if(this.tooltipElement)document.body.removeChild(this.tooltipElement),this.tooltipElement=null}}var bo=function t(o){let n=document.createElement("style");n.innerHTML=o,document.head.append(n)};bo(".flex-row{flex-direction:row!important}.settings-divider{margin:2rem 0}.settings-category-subtitle{font-size:1.6rem;margin-top:1.5rem;margin-bottom:1.2rem}.ui_setting_bc_button{--buttonHeight:3.2rem}");var Pt={name:"[System] AddSetting",author:[],description:"Add settings.",version:"1.0.0",system:!0,paths:[{trigger(t){return t.startsWith("/settings")},handler(){let t=document.querySelector('a[href="https://www.chess.com/settings/board"].settings-menu-link'),o=document.createElement("a");o.href="#",o.className="settings-menu-link";let n=document.createElement("span");n.setAttribute("aria-hidden","true"),n.className="icon-font-chess circle-gearwheel settings-icon";let s=document.createElement("span");s.className="settings-link-name",s.textContent="Better Chess.com",o.appendChild(n),o.appendChild(s),t.parentNode.insertBefore(o,t),o.addEventListener("click",()=>{document.querySelectorAll(".settings-menu-link-active").forEach((m)=>{m.classList.remove("settings-menu-link-active")}),o.classList.add("settings-menu-link-active");let u=document.querySelector(".layout-column-two");while(u.firstChild)u.firstChild.remove();let c=document.createElement("div");c.className="v5-section";let i=document.createElement("div");i.className="v5-section-content";let e=document.createElement("h1");e.className="settings-category-title",e.textContent="Better Chess.com",i.appendChild(e);let h=document.createElement("div");h.className="settings-short-form";let a=K();for(let m of x){let p=a[m.name]===!0||a[m.name]===void 0&&m.defaultDisabled,C=document.createElement("div");C.className="settings-form-group settings-form-switch-group";let b=document.createElement("label");if(b.setAttribute("for","setting_"+m.name),b.className="settings-label-text flex-row",b.textContent=m.name,m.description){let L=document.createElement("span");L.className="icon-font-chess circle-question settings-question-icon",new st(L,m.description),b.appendChild(L)}let y=document.createElement("div");y.className="settings-toggle-switch";let g=document.createElement("div");g.className="cc-switch-component cc-switch-large";let E=document.createElement("input");E.type="checkbox",E.className="cc-switch-checkbox",E.id="setting_"+m.name,E.required=!0,E.disabled=m.system||!1,E.setAttribute("size","large"),E.setAttribute("isswitch","isSwitch"),E.checked=!p,E.addEventListener("change",()=>{if(p)Ht(m.name);else kt(m.name)});let q=document.createElement("label");q.className="cc-switch-label",q.setAttribute("for","setting_"+m.name);let l=document.createElement("div");l.className="cc-switch-button",q.appendChild(l),g.appendChild(E),g.appendChild(q),y.appendChild(g),C.appendChild(b),C.appendChild(y),h.appendChild(C)}i.appendChild(h);let d=document.createElement("hr");d.className="settings-divider",i.appendChild(d);for(let m of x){let p=a[m.name]===!0||a[m.name]===void 0&&m.defaultDisabled;if(m.settings&&Object.keys(m.settings).length>0&&!p){let C=document.createElement("h2");C.className="settings-category-subtitle",C.textContent=m.name,i.appendChild(C);let b=document.createElement("div");b.className="settings-short-form",Object.entries(m.settings).forEach(([y,g])=>{let E=document.createElement("div");E.className="settings-form-group";let q=document.createElement("label");if(q.setAttribute("for",`setting_${m.name}_${y}`),q.className="settings-label-text flex-row",q.textContent=g.label,g.description){let l=document.createElement("span");l.className="icon-font-chess circle-question settings-question-icon",new st(l,g.description),q.appendChild(l)}switch(E.appendChild(q),g.type){case"switch":{let l=document.createElement("div");l.className="settings-toggle-switch";let L=document.createElement("div");L.className="cc-switch-component cc-switch-large";let k=document.createElement("input");k.type="checkbox",k.className="cc-switch-checkbox",k.id=`setting_${m.name}_${y}`,k.checked=Y(m.name,y,g.defaultValue||!1),k.setAttribute("size","large"),k.setAttribute("isswitch","isSwitch"),k.addEventListener("change",()=>{ht(m.name,y,k.checked)});let A=document.createElement("label");A.className="cc-switch-label",A.setAttribute("for",`setting_${m.name}_${y}`);let gt=document.createElement("div");gt.className="cc-switch-button",A.appendChild(gt),L.appendChild(k),L.appendChild(A),l.appendChild(L),E.appendChild(l);break}case"text":{let l=document.createElement("input");l.type="text",l.className="ui_v5-input-component",l.id=`setting_${m.name}_${y}`,l.value=Y(m.name,y,g.defaultValue||""),l.addEventListener("change",()=>{ht(m.name,y,l.value)}),E.appendChild(l);break}case"button":{let l=document.createElement("button");if(l.className="ui_v5-button-component ui_v5-button-basic ui_setting_bc_button",l.id=`setting_${m.name}_${y}`,l.textContent=g.label,g.onClick)l.addEventListener("click",g.onClick);E.appendChild(l);break}}b.appendChild(E)}),i.appendChild(b)}}c.appendChild(i),u.appendChild(c)})}}]};var xt={name:"AutoForumFollow",author:[],description:"Automatically follows forums you view.",version:"1.0.0",defaultDisabled:!0,paths:[{trigger(t){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(t)},async handler(){let t=document.getElementById("follow-thread");if(!t)return;if(t.checked)return;let o=t.getAttribute("data-forum-topic-id");await R(o||"",!0),t.checked=!0}}]};var $=[];$.push(yt);$.push(qt);$.push(Tt);$.push(Nt);$.push(Pt);$.push(xt);var x=$;function Eo(){if(!window.location.host.endsWith("chess.com"))return;let t=localStorage.getItem("toast");if(t)try{let n=JSON.parse(t);new X(n.message,n.type).show(),localStorage.setItem("toast","")}catch(n){T.error(n)}let o=K();for(let n of x){if(o[n.name]===!0)continue;if(o[n.name]===void 0&&n.defaultDisabled)continue;for(let{trigger:s,handler:r}of n.paths)try{if(s(window.location.pathname))r(window.location.pathname)}catch(u){T.error("Plugin "+n.name+"error: "+u)}}}Eo();

})();