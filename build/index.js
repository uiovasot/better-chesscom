/*
██████╗ ███████╗████████╗████████╗███████╗██████╗      ██████╗██╗  ██╗███████╗███████╗███████╗    ██████╗ ██████╗ ███╗   ███╗
██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗    ██╔════╝██║  ██║██╔════╝██╔════╝██╔════╝   ██╔════╝██╔═══██╗████╗ ████║
██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝    ██║     ███████║█████╗  ███████╗███████╗   ██║     ██║   ██║██╔████╔██║
██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗    ██║     ██╔══██║██╔══╝  ╚════██║╚════██║   ██║     ██║   ██║██║╚██╔╝██║
██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║    ╚██████╗██║  ██║███████╗███████║███████║██╗╚██████╗╚██████╔╝██║ ╚═╝ ██║
╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝                                                                                                               
Better Chess.com
*/
class T{static getTime(){return new Date().toTimeString().split(" ")[0]}static error(...t){console.log(`[${this.getTime()}] [Error] ${t.join(" ")}`)}static success(...t){console.log(`[${this.getTime()}] [Success] ${t.join(" ")}`)}static warning(...t){console.log(`[${this.getTime()}] [Warning] ${t.join(" ")}`)}static info(...t){console.log(`[${this.getTime()}] [Info] ${t.join(" ")}`)}}async function bt(t){try{let n=await fetch(t);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);let o=await n.text(),i=new DOMParser().parseFromString(o,"text/html").querySelector('input[name="forum_topic_comment[_token]"]')?.getAttribute("value");if(!i)throw new Error("토큰을 찾지 못했습니다.");return i}catch(n){T.error(n)}}async function Et(t,n,o,r=!0){try{let s=await fetch(t+"&newCommentCount=1",{headers:{accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","accept-language":"ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4","cache-control":"max-age=0","content-type":"application/x-www-form-urlencoded",priority:"u=0, i","sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},referrer:t+"&newCommentCount=1",referrerPolicy:"strict-origin-when-cross-origin",body:"mce_0=%3Cp%3E"+encodeURIComponent(o)+"%3C%2Fp%3E&forum_topic_comment%5Bbody%5D=%3Cp%3E"+encodeURIComponent(o)+"%3C%2Fp%3E&forum_topic_comment%5B_token%5D="+n+"&Post=&following="+(r?"on":"off"),method:"POST",mode:"cors",credentials:"include"});if(T.success(`Add comment: ${o}`),!s.ok)throw new Error(`HTTP error! status: ${s.status}`)}catch(s){T.error(s)}}async function x(t){try{let n=await fetch(t);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);let o=await n.text(),i=new DOMParser().parseFromString(o,"text/html").querySelectorAll('form[action*="delete_comment"]'),u=[];i.forEach((h)=>{let c=h.getAttribute("action");if(!c||c.includes("delete_comment?all=1"))return;let m=h.querySelector('input[name="_token"]'),d=m?m.value:null;if(c&&d)u.push({action:c,token:d})});for(let{action:h,token:c}of u)await fetch(h,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({_token:c})}),T.success(`Deleted: ${h}`);return u}catch(n){T.error(n)}}var nt="";nt=window.context?.csrf?.token;async function w(t,n){await fetch(`https://www.chess.com/callback/track-content/forum/${t}/${n}`,{headers:{accept:"application/json, text/plain, */*","accept-language":"ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4","cache-control":"no-cache","content-type":"application/json",pragma:"no-cache",priority:"u=1, i","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-origin"},referrerPolicy:"strict-origin-when-cross-origin",body:`{"_token":"${nt}"}`,method:"POST",mode:"cors",credentials:"include"})}var et={name:"AddConsoleApi",author:[],description:"Adds useful functions to the console.",version:"1.0.0",paths:[{trigger(t){return!0},handler(){class t{url;token;constructor(n=window.location.href){this.url=n}async init(){this.token=await bt(this.url)}async addComment({message:n,following:o=!0}){if(!this.token)throw new Error("You need to init first.");return await Et(this.url,this.token,n,o)}async removePage(n=window.location.href){await x(n)}async trackForum(n,o){await w(n,o)}}window.CHESSCOM_API=t}}]};class ot{message;onConfirm;modalContainer;constructor(t,n){this.message=t,this.onConfirm=n||null,this.modalContainer=null}open(){this.modalContainer=document.createElement("div"),this.modalContainer.className="modal-container-component";let t=document.createElement("div");t.className="modal-container-bg",t.addEventListener("click",()=>this.close()),this.modalContainer.appendChild(t);let n=document.createElement("section");n.className="modal-content-component confirm-popover-modal";let o=document.createElement("div");o.className="confirm-popover-messageLabel",o.textContent=this.message,n.appendChild(o);let r=document.createElement("div");r.className="confirm-popover-buttons";let s=document.createElement("button");s.className="cc-button-component cc-button-secondary cc-button-medium cc-button-min-width",s.type="button",s.textContent="Cancel",s.addEventListener("click",()=>this.close()),r.appendChild(s);let i=document.createElement("button");i.className="cc-button-component cc-button-primary cc-button-medium cc-button-min-width",i.type="button",i.textContent="Ok",i.addEventListener("click",()=>{if(this.onConfirm)this.onConfirm();this.close()}),r.appendChild(i),n.appendChild(r),this.modalContainer.appendChild(n),document.body.appendChild(this.modalContainer)}close(){if(this.modalContainer)document.body.removeChild(this.modalContainer),this.modalContainer=null}}function yt(t){localStorage.setItem("toast",JSON.stringify(t))}var Pt=function t(n){let o=document.createElement("style");o.innerHTML=n,document.head.append(o)};Pt(".remove-page-component{margin-top:1rem;display:flex;flex-direction:row-reverse}");var Ct={name:"AutoRemoveComments",author:[],description:"Automatically deletes comments on that page.",version:"1.0.0",paths:[{trigger(t){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(t)},handler(){let t=document.createElement("div");t.className="remove-page-component";let n=document.createElement("button");n.className="ui_pagination-item-component",n.innerText="Delete page",n.onclick=()=>{new ot("Are you sure you want to delete this page?",async()=>{await x(window.location.href),yt({type:"success",message:"Page deletion has been completed."}),history.go(0)}).open()},t.appendChild(n);let o=document.querySelector(".forums-single-sharing.forums-single-sharing-transparent");o.parentNode.insertBefore(t,o)}}]};function qt(t){let n=document.createElement("body");return n.innerHTML=t,n.querySelectorAll("[data-src]").forEach((o)=>{o.setAttribute("src",o.getAttribute("data-src")),o.removeAttribute("data-src")}),n.innerHTML}class rt{id;username;avatarUrl;content;timestamp;voteCount;versions;deleted;forum;constructor(t,n){this.id=t.id,this.username=t.username,this.avatarUrl=t.avatarUrl,this.content=t.content,this.timestamp=t.timestamp,this.voteCount=t.voteCount,this.versions=t.versions||[],this.deleted=t.deleted||!1,this.forum=n}addVersion(t){if(this.content!==t&&!this.deleted){if(this.versions.length===0||this.versions[this.versions.length-1]!==t){if(this.versions.unshift(this.content),this.content=t,T.info(`New version added for Comment ${this.id}: ${t}`),T.info(`Versions history (${this.versions.length}): ${this.versions.join(" -> ")}`),this.forum)this.forum.saveToIndexedDB().catch((n)=>{console.error("Error saving comment version to IndexedDB:",n)})}}}markAsDeleted(){if(!this.deleted){if(this.deleted=!0,this.forum)this.forum.saveToIndexedDB().catch((t)=>{T.error("Error saving deleted status to IndexedDB:",t)})}}setForum(t){this.forum=t}}class st{comments=[];allComments=[];forumId;constructor(t){this.forumId=t}async parseAndUpdateComments(t){try{let n=await this.openIndexedDB(),o=this.parseComments(t),r=await this.loadFromIndexedDB();o.forEach((s)=>{let i=r.find((u)=>u.id===s.id);if(i){if(!i.deleted&&i.content!==s.content){if(i.addVersion(s.content),this.comments.findIndex((h)=>h.id===i.id)===-1)this.comments.push(i)}}else this.comments.push(s)}),r.forEach((s)=>{if(!o.some((u)=>u.id===s.id)&&!s.deleted){if(s.markAsDeleted(),!this.comments.includes(s))this.comments.push(s)}this.allComments.push(s)}),await this.saveToIndexedDB()}catch(n){throw T.error("Error parsing and updating comments:"+n),n}return this}parseComments(t){let n=t.querySelectorAll(".comment-post-component"),o=[];return n.forEach((r)=>{let s=r.id.replace("comment-",""),i=r.querySelector(".user-tagline-username")?.textContent?.trim()||"",u=r.querySelector(".post-view-meta-image")?.getAttribute("data-src")||"",h=qt(r.querySelector(".comment-post-body")?.innerHTML||""),c=r.querySelector(".comment-post-actions-time span")?.getAttribute("title")||"",m=parseInt(r.querySelector(".vote-container-count")?.textContent||"0",10),d={id:s,forumId:this.forumId,username:i,avatarUrl:u,content:h,timestamp:c,voteCount:m},a=new rt(d,this);o.push(a)}),o}async loadFromIndexedDB(){try{let t=await this.openIndexedDB();return new Promise((n,o)=>{let i=t.transaction("comments","readonly").objectStore("comments").getAll();i.onsuccess=()=>{let h=i.result.filter((c)=>c.forumId===this.forumId).map((c)=>new rt(c,this));n(h)},i.onerror=()=>{n([])}})}catch(t){return[]}}async saveToIndexedDB(){try{let t=await this.openIndexedDB();return new Promise((n,o)=>{let r=t.transaction("comments","readwrite"),s=r.objectStore("comments");this.comments.forEach((i)=>{let u=s.put({id:i.id,forumId:this.forumId,username:i.username,avatarUrl:i.avatarUrl,content:i.content,timestamp:i.timestamp,voteCount:i.voteCount,versions:i.versions,deleted:i.deleted});u.onerror=()=>{T.error(`Error saving comment ${i.id} to IndexedDB`),o(u.error)}}),r.oncomplete=()=>{T.success("Comments saved to IndexedDB."),n()},r.onerror=()=>{T.error("Error in IndexedDB transaction"),o(r.error)}})}catch(t){throw T.error("Error saving comments to IndexedDB:"+t),t}}async openIndexedDB(){return new Promise((t,n)=>{let o=indexedDB.open("ForumCommentsDB",6);o.onupgradeneeded=()=>{let r=o.result;if(!r.objectStoreNames.contains("comments"))r.createObjectStore("comments",{keyPath:"id"})},o.onsuccess=()=>{t(o.result)},o.onerror=()=>{n(o.error)}})}log(){this.comments.forEach((t)=>{let n=t.deleted?"[DELETED] ":"";T.info(`${n}[${t.id}] ${t.username}: ${t.content}`),T.info(`  Versions (${t.versions.length}): ${t.versions.join(" -> ")}`)})}}function ut(t){let n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return t.replace(/[&<>"'/]/g,(o)=>n[o])}function Tt(t,n){return new Promise((o,r)=>{let s=indexedDB.open(t);s.onsuccess=()=>{let c=s.result.transaction(n,"readwrite").objectStore(n).clear();c.onsuccess=()=>{T.success(`All data cleared from ${n} in ${t}.`),o()},c.onerror=()=>{T.error(`Error clearing data from ${n}:`,c.error?.message),r(c.error)}},s.onerror=()=>{T.error(`Error opening database ${t}:`,s.error?.message),r(s.error)}})}var xt=function t(n){let o=document.createElement("style");o.innerHTML=n,document.head.append(o)};xt(".alerts-container{align-items:center;display:flex;flex-direction:column;justify-content:center;left:0;pointer-events:none;position:fixed;right:0;top:0;width:auto;z-index:9001}.no-nav .alerts-container{left:0}@media (min-width:60em){.alerts-container{left:var(--navWidth)}}.alerts-alert{align-items:center;border-radius:var(--radius-m);color:#fff;display:flex;font-weight:600;margin-bottom:1rem;max-width:105.2rem;min-height:5rem;padding:0 0 0 1.5rem;pointer-events:auto;position:relative;width:100%}.alerts-alert:first-child{border-radius:0 0 var(--radius-m) var(--radius-m)}.alerts-alert:last-child{margin-bottom:0}.alerts-message{flex:1;line-height:1.5;padding:1.3rem 0}.alerts-message a,.alerts-message button{background:0 0;border:none;color:#fff;font-size:1.4rem;font-weight:600;padding:0;text-decoration:underline}.alerts-message a:focus,.alerts-message a:hover,.alerts-message button:focus,.alerts-message button:hover{text-decoration:none}.alerts-close{align-self:flex-start;background:0 0;border:none;flex-shrink:0;font-weight:600;height:5rem;margin:0;padding:0;width:5rem}.alerts-close .icon-font-chess{color:rgba(0,0,0,.5);font-size:2rem;margin:0 auto}.alerts-close:focus .icon-font-chess,.alerts-close:hover .icon-font-chess{color:rgba(0,0,0,.8)}.alerts-error{background-color:var(--color-red-400)}.alerts-info,.alerts-topical{background-color:var(--color-blue-300)}.alerts-success{background-color:var(--color-green-300)}.alerts-warning{background-color:var(--color-gold-400)}.btn-link-inline{display:inline-block}@keyframes index-alertEnter{0%{opacity:0;transform:translate3d(0,-25%,0)}to{opacity:1;transform:translateZ(0)}}@keyframes index-alertLeave{0%{max-height:20rem;opacity:1;transform:translateY(0)}to{max-height:0;opacity:0;transform:translateY(-50%)}}.alerts-enter{animation:index-alertEnter .1s ease-in both;animation-delay:.1s;opacity:0}.alerts-leave{animation:index-alertLeave .2s ease-in-out both;min-height:0}");class F{message;type;duration;constructor(t,n="info",o=7000){this.message=t,this.type=n,this.duration=o}show(){let t=document.getElementById("widget-alert-flash");if(!t)t=document.createElement("div"),t.id="widget-alert-flash",t.className="alerts-container",document.body.appendChild(t);let n=document.createElement("div"),o=`alert-${Date.now()}`;n.id=o,n.className=`alerts-alert alerts-enter alerts-${this.type}`;let r=document.createElement("span");r.className="alerts-message",r.textContent=this.message,n.appendChild(r);let s=document.createElement("button");s.className="alerts-close",s.type="button",s.innerHTML='<span class="icon-font-chess x"></span>',s.addEventListener("click",()=>{if(n.parentNode)n.parentNode.removeChild(n)}),n.appendChild(s),t.appendChild(n),setTimeout(()=>{if(n.parentNode)n.parentNode.removeChild(n)},this.duration)}}var Lt={name:"MessageLogger",author:[],description:"Message logger.",version:"1.0.0",settings:{removeHistory:{type:"button",label:"Clear",onClick:async()=>{await Tt("ForumCommentsDB","comments"),new F("All message history has been deleted!","success").show()}}},paths:[{trigger(t){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(t)},async handler(t){let n=t.split("/"),o=n[n.length-1].split(/[?#]/)[0],r=document.querySelector(".forums-single-list"),s=new st(o);await s.parseAndUpdateComments(r),window.forum=s;let i=[];s.allComments.forEach((u)=>{let h=r.querySelector(`#comment-${u.id}`);if(u.deleted){let c=document.createElement("div");c.id=`comment-${u.id}`,c.className="comment-post-component vote-parent",c.style.opacity="1",c.style.fontStyle="italic";let m=document.createElement("a");m.className="post-view-meta-avatar comment-post-avatar",m.style.width="5rem",m.style.height="5rem",m.href=`https://www.chess.com/member/${encodeURIComponent(u.username)}`,m.title=u.username,m.setAttribute("data-has-user-popover","true"),m.setAttribute("v-user-popover",`"{&quot;username&quot;:&quot;${ut(u.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`);let d=document.createElement("img");d.className="post-view-meta-image",d.alt=u.username,d.src=u.avatarUrl,m.appendChild(d),c.appendChild(m);let a=document.createElement("div");a.className="comment-post-meta";let p=document.createElement("div");p.className="user-tagline-component",p.setAttribute("data-username",u.username),p.setAttribute("data-visibility-policy","0");let g=document.createElement("a");g.className="user-username-component user-username-link user-tagline-username user-username-blue-with-dark-mode",g.href=`https://www.chess.com/member/${encodeURIComponent(u.username)}`,g.innerText=u.username,m.setAttribute("data-has-user-popover","true"),m.setAttribute("v-user-popover",`"{&quot;username&quot;:&quot;${ut(u.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`),p.appendChild(g),a.appendChild(p);let q=document.createElement("div");q.className="comment-post-actions-component",q.id=u.id;let b=document.createElement("span");b.className="comment-post-actions-time";let C=document.createElement("span");C.title=u.timestamp,C.innerText=u.timestamp,b.appendChild(C),q.appendChild(b);let e=document.createElement("span");e.className="comment-post-actions-number",e.innerText="deleted",q.appendChild(e),a.appendChild(q),c.appendChild(a);let y=document.createElement("div");y.className="comment-post-body-component comment-post-body",y.innerHTML=u.content,c.appendChild(y);let E=i[i.length-1];if(E)E.parentNode?.insertBefore(c,E.nextSibling);i.push(c)}else if(h)i.push(h);if(u.versions.length>0&&!u.deleted){let c=h.querySelector(".comment-post-body");if(c)u.versions.forEach((m)=>{let d=document.createElement("br");c.appendChild(d);let a=document.createElement("span");a.style.color="#666",a.style.marginLeft="5px",a.textContent="(edited)",c.appendChild(a);let p=document.createElement("div");p.style.fontSize="12px",p.style.color="#666",p.style.marginTop="5px",p.innerHTML=m,c.appendChild(p)})}}),s.log()}}]};function Z(){let t=localStorage.getItem("DisabledPluginsV1"),n={};if(t)try{n=JSON.parse(t)}catch(o){console.error("Error parsing DisabledPlugins",o)}return n}function kt(t){let n=Z();n[t]=!0,localStorage.setItem("DisabledPluginsV1",JSON.stringify(n))}function vt(t){let n=Z();n[t]=!1,localStorage.setItem("DisabledPluginsV1",JSON.stringify(n))}function It(){let t=localStorage.getItem("PluginSettingsV1"),n={};if(t)try{n=JSON.parse(t)}catch(o){console.error("Error parsing PluginSettings",o)}return n}function it(t,n,o){let r=It();if(!r[t])r[t]={};r[t][n]=o,localStorage.setItem("PluginSettingsV1",JSON.stringify(r))}function ct(t,n,o){return It()[t]?.[n]??o}var{min:X,max:J,round:Y,floor:D}=Math,l=(t)=>({x:t,y:t});function ht(t){return t.split("-")[0]}function Nt(t){return t.split("-")[1]}function lt(t){return t==="x"?"y":"x"}function Ht(t){return t==="y"?"height":"width"}function mt(t){return["top","bottom"].includes(ht(t))?"y":"x"}function Bt(t){return lt(mt(t))}function z(t){let{x:n,y:o,width:r,height:s}=t;return{width:r,height:s,top:o,left:n,right:n+r,bottom:o+s,x:n,y:o}}function Ut(t,n,o){let{reference:r,floating:s}=t,i=mt(n),u=Bt(n),h=Ht(u),c=ht(n),m=i==="y",d=r.x+r.width/2-s.width/2,a=r.y+r.height/2-s.height/2,p=r[h]/2-s[h]/2,g;switch(c){case"top":g={x:d,y:r.y-s.height};break;case"bottom":g={x:d,y:r.y+r.height};break;case"right":g={x:r.x+r.width,y:a};break;case"left":g={x:r.x-s.width,y:a};break;default:g={x:r.x,y:r.y}}switch(Nt(n)){case"start":g[u]-=p*(o&&m?-1:1);break;case"end":g[u]+=p*(o&&m?-1:1);break}return g}var Mt=async(t,n,o)=>{let{placement:r="bottom",strategy:s="absolute",middleware:i=[],platform:u}=o,h=i.filter(Boolean),c=await(u.isRTL==null?void 0:u.isRTL(n)),m=await u.getElementRects({reference:t,floating:n,strategy:s}),{x:d,y:a}=Ut(m,r,c),p=r,g={},q=0;for(let b=0;b<h.length;b++){let{name:C,fn:e}=h[b],{x:y,y:E,data:k,reset:L}=await e({x:d,y:a,initialPlacement:r,placement:p,strategy:s,middlewareData:g,rects:m,platform:u,elements:{reference:t,floating:n}});if(d=y!=null?y:d,a=E!=null?E:a,g={...g,[C]:{...g[C],...k}},L&&q<=50){if(q++,typeof L==="object"){if(L.placement)p=L.placement;if(L.rects)m=L.rects===!0?await u.getElementRects({reference:t,floating:n,strategy:s}):L.rects;({x:d,y:a}=Ut(m,p,c))}b=-1}}return{x:d,y:a,placement:p,strategy:s,middlewareData:g}};function A(){return typeof window!=="undefined"}function j(t){if(jt(t))return(t.nodeName||"").toLowerCase();return"#document"}function v(t){var n;return(t==null||(n=t.ownerDocument)==null?void 0:n.defaultView)||window}function H(t){var n;return(n=(jt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:n.documentElement}function jt(t){if(!A())return!1;return t instanceof Node||t instanceof v(t).Node}function I(t){if(!A())return!1;return t instanceof Element||t instanceof v(t).Element}function B(t){if(!A())return!1;return t instanceof HTMLElement||t instanceof v(t).HTMLElement}function Jt(t){if(!A()||typeof ShadowRoot==="undefined")return!1;return t instanceof ShadowRoot||t instanceof v(t).ShadowRoot}function Q(t){let{overflow:n,overflowX:o,overflowY:r,display:s}=N(t);return/auto|scroll|overlay|hidden|clip/.test(n+r+o)&&!["inline","contents"].includes(s)}function Gt(t){return["table","td","th"].includes(j(t))}function W(t){return[":popover-open",":modal"].some((n)=>{try{return t.matches(n)}catch(o){return!1}})}function O(t){let n=R(),o=I(t)?N(t):t;return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!n&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!n&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some((r)=>(o.willChange||"").includes(r))||["paint","layout","strict","content"].some((r)=>(o.contain||"").includes(r))}function Vt(t){let n=U(t);while(B(n)&&!G(n)){if(O(n))return n;else if(W(n))return null;n=U(n)}return null}function R(){if(typeof CSS==="undefined"||!CSS.supports)return!1;return CSS.supports("-webkit-backdrop-filter","none")}function G(t){return["html","body","#document"].includes(j(t))}function N(t){return v(t).getComputedStyle(t)}function _(t){if(I(t))return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop};return{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function U(t){if(j(t)==="html")return t;let n=t.assignedSlot||t.parentNode||Jt(t)&&t.host||H(t);return Jt(n)?n.host:n}function Zt(t){let n=U(t);if(G(n))return t.ownerDocument?t.ownerDocument.body:t.body;if(B(n)&&Q(n))return n;return Zt(n)}function K(t,n,o){var r;if(n===void 0)n=[];if(o===void 0)o=!0;let s=Zt(t),i=s===((r=t.ownerDocument)==null?void 0:r.body),u=v(s);if(i){let h=f(u);return n.concat(u,u.visualViewport||[],Q(s)?s:[],h&&o?K(h):[])}return n.concat(s,K(s,[],o))}function f(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function $t(t){let n=N(t),o=parseFloat(n.width)||0,r=parseFloat(n.height)||0,s=B(t),i=s?t.offsetWidth:o,u=s?t.offsetHeight:r,h=Y(o)!==i||Y(r)!==u;if(h)o=i,r=u;return{width:o,height:r,$:h}}function dt(t){return!I(t)?t.contextElement:t}function $(t){let n=dt(t);if(!B(n))return l(1);let o=n.getBoundingClientRect(),{width:r,height:s,$:i}=$t(n),u=(i?Y(o.width):o.width)/r,h=(i?Y(o.height):o.height)/s;if(!u||!Number.isFinite(u))u=1;if(!h||!Number.isFinite(h))h=1;return{x:u,y:h}}var wt=l(0);function St(t){let n=v(t);if(!R()||!n.visualViewport)return wt;return{x:n.visualViewport.offsetLeft,y:n.visualViewport.offsetTop}}function At(t,n,o){if(n===void 0)n=!1;if(!o||n&&o!==v(t))return!1;return n}function V(t,n,o,r){if(n===void 0)n=!1;if(o===void 0)o=!1;let s=t.getBoundingClientRect(),i=dt(t),u=l(1);if(n)if(r){if(I(r))u=$(r)}else u=$(t);let h=At(i,o,r)?St(i):l(0),c=(s.left+h.x)/u.x,m=(s.top+h.y)/u.y,d=s.width/u.x,a=s.height/u.y;if(i){let p=v(i),g=r&&I(r)?v(r):r,q=p,b=f(q);while(b&&r&&g!==q){let C=$(b),e=b.getBoundingClientRect(),y=N(b),E=e.left+(b.clientLeft+parseFloat(y.paddingLeft))*C.x,k=e.top+(b.clientTop+parseFloat(y.paddingTop))*C.y;c*=C.x,m*=C.y,d*=C.x,a*=C.y,c+=E,m+=k,q=v(b),b=f(q)}}return z({width:d,height:a,x:c,y:m})}function at(t,n){let o=_(t).scrollLeft;if(!n)return V(H(t)).left+o;return n.left+o}function Ft(t,n,o){if(o===void 0)o=!1;let r=t.getBoundingClientRect(),s=r.left+n.scrollLeft-(o?0:at(t,r)),i=r.top+n.scrollTop;return{x:s,y:i}}function Ot(t){let{elements:n,rect:o,offsetParent:r,strategy:s}=t,i=s==="fixed",u=H(r),h=n?W(n.floating):!1;if(r===u||h&&i)return o;let c={scrollLeft:0,scrollTop:0},m=l(1),d=l(0),a=B(r);if(a||!a&&!i){if(j(r)!=="body"||Q(u))c=_(r);if(B(r)){let g=V(r);m=$(r),d.x=g.x+r.clientLeft,d.y=g.y+r.clientTop}}let p=u&&!a&&!i?Ft(u,c,!0):l(0);return{width:o.width*m.x,height:o.height*m.y,x:o.x*m.x-c.scrollLeft*m.x+d.x+p.x,y:o.y*m.y-c.scrollTop*m.y+d.y+p.y}}function Rt(t){return Array.from(t.getClientRects())}function ft(t){let n=H(t),o=_(t),r=t.ownerDocument.body,s=J(n.scrollWidth,n.clientWidth,r.scrollWidth,r.clientWidth),i=J(n.scrollHeight,n.clientHeight,r.scrollHeight,r.clientHeight),u=-o.scrollLeft+at(t),h=-o.scrollTop;if(N(r).direction==="rtl")u+=J(n.clientWidth,r.clientWidth)-s;return{width:s,height:i,x:u,y:h}}function tn(t,n){let o=v(t),r=H(t),s=o.visualViewport,i=r.clientWidth,u=r.clientHeight,h=0,c=0;if(s){i=s.width,u=s.height;let m=R();if(!m||m&&n==="fixed")h=s.offsetLeft,c=s.offsetTop}return{width:i,height:u,x:h,y:c}}function nn(t,n){let o=V(t,!0,n==="fixed"),r=o.top+t.clientTop,s=o.left+t.clientLeft,i=B(t)?$(t):l(1),u=t.clientWidth*i.x,h=t.clientHeight*i.y,c=s*i.x,m=r*i.y;return{width:u,height:h,x:c,y:m}}function Kt(t,n,o){let r;if(n==="viewport")r=tn(t,o);else if(n==="document")r=ft(H(t));else if(I(n))r=nn(n,o);else{let s=St(t);r={x:n.x-s.x,y:n.y-s.y,width:n.width,height:n.height}}return z(r)}function Xt(t,n){let o=U(t);if(o===n||!I(o)||G(o))return!1;return N(o).position==="fixed"||Xt(o,n)}function on(t,n){let o=n.get(t);if(o)return o;let r=K(t,[],!1).filter((h)=>I(h)&&j(h)!=="body"),s=null,i=N(t).position==="fixed",u=i?U(t):t;while(I(u)&&!G(u)){let h=N(u),c=O(u);if(!c&&h.position==="fixed")s=null;if(i?!c&&!s:!c&&h.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||Q(u)&&!c&&Xt(t,u))r=r.filter((d)=>d!==u);else s=h;u=U(u)}return n.set(t,r),r}function rn(t){let{element:n,boundary:o,rootBoundary:r,strategy:s}=t,u=[...o==="clippingAncestors"?W(n)?[]:on(n,this._c):[].concat(o),r],h=u[0],c=u.reduce((m,d)=>{let a=Kt(n,d,s);return m.top=J(a.top,m.top),m.right=X(a.right,m.right),m.bottom=X(a.bottom,m.bottom),m.left=J(a.left,m.left),m},Kt(n,h,s));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function sn(t){let{width:n,height:o}=$t(t);return{width:n,height:o}}function un(t,n,o){let r=B(n),s=H(n),i=o==="fixed",u=V(t,!0,i,n),h={scrollLeft:0,scrollTop:0},c=l(0);if(r||!r&&!i){if(j(n)!=="body"||Q(s))h=_(n);if(r){let p=V(n,!0,i,n);c.x=p.x+n.clientLeft,c.y=p.y+n.clientTop}else if(s)c.x=at(s)}let m=s&&!r&&!i?Ft(s,h):l(0),d=u.left+h.scrollLeft-c.x-m.x,a=u.top+h.scrollTop-c.y-m.y;return{x:d,y:a,width:u.width,height:u.height}}function pt(t){return N(t).position==="static"}function Qt(t,n){if(!B(t)||N(t).position==="fixed")return null;if(n)return n(t);let o=t.offsetParent;if(H(t)===o)o=o.ownerDocument.body;return o}function Yt(t,n){let o=v(t);if(W(t))return o;if(!B(t)){let s=U(t);while(s&&!G(s)){if(I(s)&&!pt(s))return s;s=U(s)}return o}let r=Qt(t,n);while(r&&Gt(r)&&pt(r))r=Qt(r,n);if(r&&G(r)&&pt(r)&&!O(r))return o;return r||Vt(t)||o}var cn=async function(t){let n=this.getOffsetParent||Yt,o=this.getDimensions,r=await o(t.floating);return{reference:un(t.reference,await n(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function hn(t){return N(t).direction==="rtl"}var mn={convertOffsetParentRelativeRectToViewportRelativeRect:Ot,getDocumentElement:H,getClippingRect:rn,getOffsetParent:Yt,getElementRects:cn,getClientRects:Rt,getDimensions:sn,getScale:$,isElement:I,isRTL:hn};function pn(t,n){let o=null,r,s=H(t);function i(){var h;clearTimeout(r),(h=o)==null||h.disconnect(),o=null}function u(h,c){if(h===void 0)h=!1;if(c===void 0)c=1;i();let{left:m,top:d,width:a,height:p}=t.getBoundingClientRect();if(!h)n();if(!a||!p)return;let g=D(d),q=D(s.clientWidth-(m+a)),b=D(s.clientHeight-(d+p)),C=D(m),y={rootMargin:-g+"px "+-q+"px "+-b+"px "+-C+"px",threshold:J(0,X(1,c))||1},E=!0;function k(L){let M=L[0].intersectionRatio;if(M!==c){if(!E)return u();if(!M)r=setTimeout(()=>{u(!1,0.0000001)},1000);else u(!1,M)}E=!1}try{o=new IntersectionObserver(k,{...y,root:s.ownerDocument})}catch(L){o=new IntersectionObserver(k,y)}o.observe(t)}return u(!0),i}function Dt(t,n,o,r){if(r===void 0)r={};let{ancestorScroll:s=!0,ancestorResize:i=!0,elementResize:u=typeof ResizeObserver==="function",layoutShift:h=typeof IntersectionObserver==="function",animationFrame:c=!1}=r,m=dt(t),d=s||i?[...m?K(m):[],...K(n)]:[];d.forEach((e)=>{s&&e.addEventListener("scroll",o,{passive:!0}),i&&e.addEventListener("resize",o)});let a=m&&h?pn(m,o):null,p=-1,g=null;if(u){if(g=new ResizeObserver((e)=>{let[y]=e;if(y&&y.target===m&&g)g.unobserve(n),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var E;(E=g)==null||E.observe(n)});o()}),m&&!c)g.observe(m);g.observe(n)}let q,b=c?V(t):null;if(c)C();function C(){let e=V(t);if(b&&(e.x!==b.x||e.y!==b.y||e.width!==b.width||e.height!==b.height))o();b=e,q=requestAnimationFrame(C)}return o(),()=>{var e;if(d.forEach((y)=>{s&&y.removeEventListener("scroll",o),i&&y.removeEventListener("resize",o)}),a==null||a(),(e=g)==null||e.disconnect(),g=null,c)cancelAnimationFrame(q)}}var zt=(t,n,o)=>{let r=new Map,s={platform:mn,...o},i={...s.platform,_c:r};return Mt(t,n,{...s,platform:i})};class tt{target;content;tooltipElement;constructor(t,n){this.target=t,this.content=n,this.tooltipElement=null,this.init()}init(){this.target.addEventListener("mouseenter",()=>this.show()),this.target.addEventListener("mouseleave",()=>this.hide())}createTooltip(){if(this.tooltipElement)return;this.tooltipElement=document.createElement("div"),this.tooltipElement.className="tooltip-component",this.tooltipElement.setAttribute("role","tooltip");let t=document.createElement("div");t.className="tooltip-content tooltip-top";let n=document.createElement("div");n.className="tooltip-body tooltip-top",n.innerHTML=this.content,t.appendChild(n),this.tooltipElement.appendChild(t),document.body.appendChild(this.tooltipElement)}positionTooltip(){if(!this.tooltipElement)return;let t=()=>{zt(this.target,this.tooltipElement,{placement:"top"}).then(({x:o,y:r})=>{this.tooltipElement.style.left=`${o}px`,this.tooltipElement.style.top=`${r}px`,this.tooltipElement.style.opacity="1",this.tooltipElement.style.transform="translate(0px, 0px)"})},n=Dt(this.target,this.tooltipElement,t);this.tooltipElement.addEventListener("mouseleave",()=>n()),t()}show(){this.createTooltip(),this.positionTooltip()}hide(){if(this.tooltipElement)document.body.removeChild(this.tooltipElement),this.tooltipElement=null}}var dn=function t(n){let o=document.createElement("style");o.innerHTML=n,document.head.append(o)};dn(".flex-row{flex-direction:row!important}.settings-divider{margin:2rem 0}.settings-category-subtitle{font-size:1.6rem;margin-top:1.5rem;margin-bottom:1.2rem}.ui_setting_bc_button{--buttonHeight:3.2rem}");var Wt={name:"[System] AddSetting",author:[],description:"Add settings.",version:"1.0.0",system:!0,paths:[{trigger(t){return t.startsWith("/settings")},handler(){let t=document.querySelector('a[href="https://www.chess.com/settings/board"].settings-menu-link'),n=document.createElement("a");n.href="#",n.className="settings-menu-link";let o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.className="icon-font-chess circle-gearwheel settings-icon";let r=document.createElement("span");r.className="settings-link-name",r.textContent="Better Chess.com",n.appendChild(o),n.appendChild(r),t.parentNode.insertBefore(n,t),n.addEventListener("click",()=>{document.querySelectorAll(".settings-menu-link-active").forEach((p)=>{p.classList.remove("settings-menu-link-active")}),n.classList.add("settings-menu-link-active");let i=document.querySelector(".layout-column-two");while(i.firstChild)i.firstChild.remove();let u=document.createElement("div");u.className="v5-section";let h=document.createElement("div");h.className="v5-section-content";let c=document.createElement("h1");c.className="settings-category-title",c.textContent="Better Chess.com",h.appendChild(c);let m=document.createElement("div");m.className="settings-short-form";let d=Z();for(let p of P){let g=d[p.name]===!0||d[p.name]===void 0&&p.defaultDisabled,q=document.createElement("div");q.className="settings-form-group settings-form-switch-group";let b=document.createElement("label");if(b.setAttribute("for","setting_"+p.name),b.className="settings-label-text flex-row",b.textContent=p.name,p.description){let L=document.createElement("span");L.className="icon-font-chess circle-question settings-question-icon",new tt(L,p.description),b.appendChild(L)}let C=document.createElement("div");C.className="settings-toggle-switch";let e=document.createElement("div");e.className="cc-switch-component cc-switch-large";let y=document.createElement("input");y.type="checkbox",y.className="cc-switch-checkbox",y.id="setting_"+p.name,y.required=!0,y.disabled=p.system||!1,y.setAttribute("size","large"),y.setAttribute("isswitch","isSwitch"),y.checked=!g,y.addEventListener("change",()=>{if(g)vt(p.name);else kt(p.name)});let E=document.createElement("label");E.className="cc-switch-label",E.setAttribute("for","setting_"+p.name);let k=document.createElement("div");k.className="cc-switch-button",E.appendChild(k),e.appendChild(y),e.appendChild(E),C.appendChild(e),q.appendChild(b),q.appendChild(C),m.appendChild(q)}h.appendChild(m);let a=document.createElement("hr");a.className="settings-divider",h.appendChild(a);for(let p of P)if(p.settings&&Object.keys(p.settings).length>0){let g=document.createElement("h2");g.className="settings-category-subtitle",g.textContent=p.name,h.appendChild(g);let q=document.createElement("div");q.className="settings-short-form",Object.entries(p.settings).forEach(([b,C])=>{let e=document.createElement("div");e.className="settings-form-group";let y=document.createElement("label");if(y.setAttribute("for",`setting_${p.name}_${b}`),y.className="settings-label-text flex-row",y.textContent=C.label,C.description){let E=document.createElement("span");E.className="icon-font-chess circle-question settings-question-icon",new tt(E,C.description),y.appendChild(E)}switch(e.appendChild(y),C.type){case"switch":{let E=document.createElement("div");E.className="settings-toggle-switch";let k=document.createElement("div");k.className="cc-switch-component cc-switch-large";let L=document.createElement("input");L.type="checkbox",L.className="cc-switch-checkbox",L.id=`setting_${p.name}_${b}`,L.checked=ct(p.name,b,C.defaultValue||!1),L.setAttribute("size","large"),L.setAttribute("isswitch","isSwitch"),L.addEventListener("change",()=>{it(p.name,b,L.checked)});let M=document.createElement("label");M.className="cc-switch-label",M.setAttribute("for",`setting_${p.name}_${b}`);let gt=document.createElement("div");gt.className="cc-switch-button",M.appendChild(gt),k.appendChild(L),k.appendChild(M),E.appendChild(k),e.appendChild(E);break}case"text":{let E=document.createElement("input");E.type="text",E.className="ui_v5-input-component",E.id=`setting_${p.name}_${b}`,E.value=ct(p.name,b,C.defaultValue||""),E.addEventListener("change",()=>{it(p.name,b,E.value)}),e.appendChild(E);break}case"button":{let E=document.createElement("button");if(E.className="ui_v5-button-component ui_v5-button-basic ui_setting_bc_button",E.id=`setting_${p.name}_${b}`,E.textContent=C.label,C.onClick)E.addEventListener("click",C.onClick);e.appendChild(E);break}}q.appendChild(e)}),h.appendChild(q)}u.appendChild(h),i.appendChild(u)})}}]};var _t={name:"AutoForumFollow",author:[],description:"Automatically follows forums you view.",version:"1.0.0",defaultDisabled:!0,paths:[{trigger(t){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(t)},async handler(){let t=document.getElementById("follow-thread");if(!t)return;if(t.checked)return;let n=t.getAttribute("data-forum-topic-id");await w(n||"",!0),t.checked=!0}}]};var S=[];S.push(et);S.push(Ct);S.push(Lt);S.push(Wt);S.push(_t);var P=S;function an(){if(!window.location.host.endsWith("chess.com"))return;let t=localStorage.getItem("toast");if(t)try{let o=JSON.parse(t);new F(o.message,o.type).show(),localStorage.setItem("toast","")}catch(o){T.error(o)}let n=Z();for(let o of P){if(n[o.name]===!0)continue;if(n[o.name]===void 0&&o.defaultDisabled)continue;for(let{trigger:r,handler:s}of o.paths)try{if(r(window.location.pathname))s(window.location.pathname)}catch(i){T.error("Plugin "+o.name+"error: "+i)}}}an();
