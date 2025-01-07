/*
██████╗ ███████╗████████╗████████╗███████╗██████╗      ██████╗██╗  ██╗███████╗███████╗███████╗    ██████╗ ██████╗ ███╗   ███╗
██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗    ██╔════╝██║  ██║██╔════╝██╔════╝██╔════╝   ██╔════╝██╔═══██╗████╗ ████║
██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝    ██║     ███████║█████╗  ███████╗███████╗   ██║     ██║   ██║██╔████╔██║
██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗    ██║     ██╔══██║██╔══╝  ╚════██║╚════██║   ██║     ██║   ██║██║╚██╔╝██║
██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║    ╚██████╗██║  ██║███████╗███████║███████║██╗╚██████╗╚██████╔╝██║ ╚═╝ ██║
╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝                                                                                                               
Better Chess.com
*/
class L{static getTime(){return new Date().toTimeString().split(" ")[0]}static error(...n){console.log(`[${this.getTime()}] [Error] ${n.join(" ")}`)}static success(...n){console.log(`[${this.getTime()}] [Success] ${n.join(" ")}`)}static warning(...n){console.log(`[${this.getTime()}] [Warning] ${n.join(" ")}`)}static info(...n){console.log(`[${this.getTime()}] [Info] ${n.join(" ")}`)}}async function pn(n){try{let o=await fetch(n);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);let t=await o.text(),h=new DOMParser().parseFromString(t,"text/html").querySelector('input[name="forum_topic_comment[_token]"]')?.getAttribute("value");if(!h)throw new Error("토큰을 찾지 못했습니다.");return h}catch(o){L.error(o)}}async function dn(n,o,t,u=!0){try{let r=await fetch(n+"&newCommentCount=1",{headers:{accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","accept-language":"ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4","cache-control":"max-age=0","content-type":"application/x-www-form-urlencoded",priority:"u=0, i","sec-ch-ua":'"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Linux"',"sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},referrer:n+"&newCommentCount=1",referrerPolicy:"strict-origin-when-cross-origin",body:"mce_0=%3Cp%3E"+encodeURIComponent(t)+"%3C%2Fp%3E&forum_topic_comment%5Bbody%5D=%3Cp%3E"+encodeURIComponent(t)+"%3C%2Fp%3E&forum_topic_comment%5B_token%5D="+o+"&Post=&following="+(u?"on":"off"),method:"POST",mode:"cors",credentials:"include"});if(L.success(`Add comment: ${t}`),!r.ok)throw new Error(`HTTP error! status: ${r.status}`)}catch(r){L.error(r)}}async function P(n){try{let o=await fetch(n);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);let t=await o.text(),h=new DOMParser().parseFromString(t,"text/html").querySelectorAll('form[action*="delete_comment"]'),s=[];h.forEach((i)=>{let c=i.getAttribute("action");if(!c||c.includes("delete_comment?all=1"))return;let m=i.querySelector('input[name="_token"]'),d=m?m.value:null;if(c&&d)s.push({action:c,token:d})});for(let{action:i,token:c}of s)await fetch(i,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({_token:c})}),L.success(`Deleted: ${i}`);return s}catch(o){L.error(o)}}var En={name:"AddConsoleApi",author:[],description:"Adds useful functions to the console.",version:"1.0.0",paths:[{trigger(n){return!0},handler(){class n{url;token;constructor(o=window.location.href){this.url=o}async init(){this.token=await pn(this.url)}async addComment({message:o,following:t=!0}){if(!this.token)throw new Error("You need to init first.");return await dn(this.url,this.token,o,t)}async removePage(o=window.location.href){await P(o)}}window.CHESSCOM_API=n}}]};class f{message;onConfirm;modalContainer;constructor(n,o){this.message=n,this.onConfirm=o||null,this.modalContainer=null}open(){this.modalContainer=document.createElement("div"),this.modalContainer.className="modal-container-component";let n=document.createElement("div");n.className="modal-container-bg",n.addEventListener("click",()=>this.close()),this.modalContainer.appendChild(n);let o=document.createElement("section");o.className="modal-content-component confirm-popover-modal";let t=document.createElement("div");t.className="confirm-popover-messageLabel",t.textContent=this.message,o.appendChild(t);let u=document.createElement("div");u.className="confirm-popover-buttons";let r=document.createElement("button");r.className="cc-button-component cc-button-secondary cc-button-medium cc-button-min-width",r.type="button",r.textContent="Cancel",r.addEventListener("click",()=>this.close()),u.appendChild(r);let h=document.createElement("button");h.className="cc-button-component cc-button-primary cc-button-medium cc-button-min-width",h.type="button",h.textContent="Ok",h.addEventListener("click",()=>{if(this.onConfirm)this.onConfirm();this.close()}),u.appendChild(h),o.appendChild(u),this.modalContainer.appendChild(o),document.body.appendChild(this.modalContainer)}close(){if(this.modalContainer)document.body.removeChild(this.modalContainer),this.modalContainer=null}}function bn(n){localStorage.setItem("toast",JSON.stringify(n))}var Wn=function n(o){let t=document.createElement("style");t.innerHTML=o,document.head.append(t)};Wn(`.remove-page-component {
    margin-top: 1rem;
    display: flex;
    flex-direction: row-reverse;
}
`);var yn={name:"AutoRemoveComments",author:[],description:"Automatically deletes comments on that page.",version:"1.0.0",paths:[{trigger(n){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(n)},handler(){let n=document.createElement("div");n.className="remove-page-component";let o=document.createElement("button");o.className="ui_pagination-item-component",o.innerText="Delete page",o.onclick=()=>{new f("Are you sure you want to delete this page?",async()=>{await P(window.location.href),bn({type:"success",message:"Page deletion has been completed."}),history.go(0)}).open()},n.appendChild(o);let t=document.querySelector(".forums-single-sharing.forums-single-sharing-transparent");t.parentNode.insertBefore(n,t)}}]};class e{id;username;avatarUrl;content;timestamp;voteCount;versions;deleted;forum;constructor(n,o){this.id=n.id,this.username=n.username,this.avatarUrl=n.avatarUrl,this.content=n.content,this.timestamp=n.timestamp,this.voteCount=n.voteCount,this.versions=n.versions||[],this.deleted=n.deleted||!1,this.forum=o}addVersion(n){if(this.content!==n&&!this.deleted){if(this.versions.length===0||this.versions[this.versions.length-1]!==n){if(this.versions.unshift(this.content),this.content=n,L.info(`New version added for Comment ${this.id}: ${n}`),L.info(`Versions history (${this.versions.length}): ${this.versions.join(" -> ")}`),this.forum)this.forum.saveToIndexedDB().catch((o)=>{console.error("Error saving comment version to IndexedDB:",o)})}}}markAsDeleted(){if(!this.deleted){if(this.deleted=!0,this.forum)this.forum.saveToIndexedDB().catch((n)=>{L.error("Error saving deleted status to IndexedDB:",n)})}}setForum(n){this.forum=n}}class nn{comments=[];allComments=[];forumId;constructor(n){this.forumId=n}async parseAndUpdateComments(n){try{let o=await this.openIndexedDB(),t=this.parseComments(n),u=await this.loadFromIndexedDB();t.forEach((r)=>{let h=u.find((s)=>s.id===r.id);if(h){if(!h.deleted&&h.content!==r.content){if(h.addVersion(r.content),this.comments.findIndex((i)=>i.id===h.id)===-1)this.comments.push(h)}}else this.comments.push(r)}),u.forEach((r)=>{if(!t.some((s)=>s.id===r.id)&&!r.deleted){if(r.markAsDeleted(),!this.comments.includes(r))this.comments.push(r)}this.allComments.push(r)}),await this.saveToIndexedDB()}catch(o){throw L.error("Error parsing and updating comments:"+o),o}return this}parseComments(n){let o=n.querySelectorAll(".comment-post-component"),t=[];return o.forEach((u)=>{let r=u.id.replace("comment-",""),h=u.querySelector(".user-tagline-username")?.textContent?.trim()||"",s=u.querySelector(".post-view-meta-image")?.getAttribute("data-src")||"",i=u.querySelector(".comment-post-body")?.innerHTML||"",c=u.querySelector(".comment-post-actions-time span")?.getAttribute("title")||"",m=parseInt(u.querySelector(".vote-container-count")?.textContent||"0",10),d={id:r,forumId:this.forumId,username:h,avatarUrl:s,content:i,timestamp:c,voteCount:m},p=new e(d,this);t.push(p)}),t}async loadFromIndexedDB(){try{let n=await this.openIndexedDB();return new Promise((o,t)=>{let h=n.transaction("comments","readonly").objectStore("comments").getAll();h.onsuccess=()=>{let i=h.result.filter((c)=>c.forumId===this.forumId).map((c)=>new e(c,this));o(i)},h.onerror=()=>{o([])}})}catch(n){return[]}}async saveToIndexedDB(){try{let n=await this.openIndexedDB();return new Promise((o,t)=>{let u=n.transaction("comments","readwrite"),r=u.objectStore("comments");this.comments.forEach((h)=>{let s=r.put({id:h.id,forumId:this.forumId,username:h.username,avatarUrl:h.avatarUrl,content:h.content,timestamp:h.timestamp,voteCount:h.voteCount,versions:h.versions,deleted:h.deleted});s.onerror=()=>{L.error(`Error saving comment ${h.id} to IndexedDB`),t(s.error)}}),u.oncomplete=()=>{L.success("Comments saved to IndexedDB."),o()},u.onerror=()=>{L.error("Error in IndexedDB transaction"),t(u.error)}})}catch(n){throw L.error("Error saving comments to IndexedDB:"+n),n}}async openIndexedDB(){return new Promise((n,o)=>{let t=indexedDB.open("ForumCommentsDB",6);t.onupgradeneeded=()=>{let u=t.result;if(!u.objectStoreNames.contains("comments"))u.createObjectStore("comments",{keyPath:"id"})},t.onsuccess=()=>{n(t.result)},t.onerror=()=>{o(t.error)}})}log(){this.comments.forEach((n)=>{let o=n.deleted?"[DELETED] ":"";L.info(`${o}[${n.id}] ${n.username}: ${n.content}`),L.info(`  Versions (${n.versions.length}): ${n.versions.join(" -> ")}`)})}}function on(n){let o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return n.replace(/[&<>"'/]/g,(t)=>o[t])}var gn={name:"MessageLogger",author:[],description:"Message logger.",version:"1.0.0",paths:[{trigger(n){return/^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(n)},async handler(n){let o=n.split("/"),t=o[o.length-1].split(/[?#]/)[0],u=document.querySelector(".forums-single-list"),r=new nn(t);await r.parseAndUpdateComments(u);let h=[];r.allComments.forEach((s)=>{let i=u.querySelector(`#comment-${s.id}`);if(s.deleted){let c=document.createElement("div");c.id=`comment-${s.id}`,c.className="comment-post-component vote-parent",c.style.opacity="1",c.style.fontStyle="italic";let m=document.createElement("a");m.className="post-view-meta-avatar comment-post-avatar",m.style.width="5rem",m.style.height="5rem",m.href=`https://www.chess.com/member/${encodeURIComponent(s.username)}`,m.title=s.username,m.setAttribute("data-has-user-popover","true"),m.setAttribute("v-user-popover",`"{&quot;username&quot;:&quot;${on(s.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`);let d=document.createElement("img");d.className="post-view-meta-image",d.alt=s.username,d.src=s.avatarUrl,m.appendChild(d),c.appendChild(m);let p=document.createElement("div");p.className="comment-post-meta";let b=document.createElement("div");b.className="user-tagline-component",b.setAttribute("data-username",s.username),b.setAttribute("data-visibility-policy","0");let E=document.createElement("a");E.className="user-username-component user-username-link user-tagline-username user-username-blue-with-dark-mode",E.href=`https://www.chess.com/member/${encodeURIComponent(s.username)}`,E.innerText=s.username,m.setAttribute("data-has-user-popover","true"),m.setAttribute("v-user-popover",`"{&quot;username&quot;:&quot;${on(s.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`),b.appendChild(E),p.appendChild(b);let q=document.createElement("div");q.className="comment-post-actions-component",q.id=s.id;let g=document.createElement("span");g.className="comment-post-actions-time";let C=document.createElement("span");C.title=s.timestamp,C.innerText=s.timestamp,g.appendChild(C),q.appendChild(g);let y=document.createElement("span");y.className="comment-post-actions-number",y.innerText="deleted",q.appendChild(y),p.appendChild(q),c.appendChild(p);let T=document.createElement("div");T.className="comment-post-body-component comment-post-body",T.innerHTML=s.content,c.appendChild(T);let I=h[h.length-1];if(I)I.parentNode?.insertBefore(c,I.nextSibling);h.push(c)}else if(i)h.push(i);if(s.versions.length>0&&!s.deleted){let c=i.querySelector(".comment-post-body");if(c)s.versions.forEach((m)=>{let d=document.createElement("br");c.appendChild(d);let p=document.createElement("span");p.style.color="#666",p.style.marginLeft="5px",p.textContent="(edited)",c.appendChild(p);let b=document.createElement("div");b.style.fontSize="12px",b.style.color="#666",b.style.marginTop="5px",b.innerHTML=m,c.appendChild(b)})}}),r.log()}}]};function K(){let n=localStorage.getItem("DisabledPlugins"),o=[];if(n)try{o=JSON.parse(n)}catch(t){console.error("Error parsing DisabledPlugins",t)}return o}function qn(n){let o=localStorage.getItem("DisabledPlugins"),t=K();t.push(n),localStorage.setItem("DisabledPlugins",JSON.stringify(t))}function Cn(n){let o=localStorage.getItem("DisabledPlugins"),t=K().filter((u)=>u!==n);localStorage.setItem("DisabledPlugins",JSON.stringify(t))}var{min:F,max:Z,round:W,floor:z}=Math,B=(n)=>({x:n,y:n});function tn(n){return n.split("-")[0]}function Tn(n){return n.split("-")[1]}function Ln(n){return n==="x"?"y":"x"}function In(n){return n==="y"?"height":"width"}function un(n){return["top","bottom"].includes(tn(n))?"y":"x"}function kn(n){return Ln(un(n))}function S(n){let{x:o,y:t,width:u,height:r}=n;return{width:u,height:r,top:t,left:o,right:o+u,bottom:t+r,x:o,y:t}}function Nn(n,o,t){let{reference:u,floating:r}=n,h=un(o),s=kn(o),i=In(s),c=tn(o),m=h==="y",d=u.x+u.width/2-r.width/2,p=u.y+u.height/2-r.height/2,b=u[i]/2-r[i]/2,E;switch(c){case"top":E={x:d,y:u.y-r.height};break;case"bottom":E={x:d,y:u.y+u.height};break;case"right":E={x:u.x+u.width,y:p};break;case"left":E={x:u.x-r.width,y:p};break;default:E={x:u.x,y:u.y}}switch(Tn(o)){case"start":E[s]-=b*(t&&m?-1:1);break;case"end":E[s]+=b*(t&&m?-1:1);break}return E}var Hn=async(n,o,t)=>{let{placement:u="bottom",strategy:r="absolute",middleware:h=[],platform:s}=t,i=h.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(o)),m=await s.getElementRects({reference:n,floating:o,strategy:r}),{x:d,y:p}=Nn(m,u,c),b=u,E={},q=0;for(let g=0;g<i.length;g++){let{name:C,fn:y}=i[g],{x:T,y:I,data:v,reset:M}=await y({x:d,y:p,initialPlacement:u,placement:b,strategy:r,middlewareData:E,rects:m,platform:s,elements:{reference:n,floating:o}});if(d=T!=null?T:d,p=I!=null?I:p,E={...E,[C]:{...E[C],...v}},M&&q<=50){if(q++,typeof M==="object"){if(M.placement)b=M.placement;if(M.rects)m=M.rects===!0?await s.getElementRects({reference:n,floating:o,strategy:r}):M.rects;({x:d,y:p}=Nn(m,b,c))}g=-1}}return{x:d,y:p,placement:b,strategy:r,middlewareData:E}};function x(){return typeof window!=="undefined"}function a(n){if(Un(n))return(n.nodeName||"").toLowerCase();return"#document"}function k(n){var o;return(n==null||(o=n.ownerDocument)==null?void 0:o.defaultView)||window}function U(n){var o;return(o=(Un(n)?n.ownerDocument:n.document)||window.document)==null?void 0:o.documentElement}function Un(n){if(!x())return!1;return n instanceof Node||n instanceof k(n).Node}function N(n){if(!x())return!1;return n instanceof Element||n instanceof k(n).Element}function J(n){if(!x())return!1;return n instanceof HTMLElement||n instanceof k(n).HTMLElement}function Bn(n){if(!x()||typeof ShadowRoot==="undefined")return!1;return n instanceof ShadowRoot||n instanceof k(n).ShadowRoot}function X(n){let{overflow:o,overflowX:t,overflowY:u,display:r}=H(n);return/auto|scroll|overlay|hidden|clip/.test(o+u+t)&&!["inline","contents"].includes(r)}function Jn(n){return["table","td","th"].includes(a(n))}function $(n){return[":popover-open",":modal"].some((o)=>{try{return n.matches(o)}catch(t){return!1}})}function A(n){let o=w(),t=N(n)?H(n):n;return t.transform!=="none"||t.perspective!=="none"||(t.containerType?t.containerType!=="normal":!1)||!o&&(t.backdropFilter?t.backdropFilter!=="none":!1)||!o&&(t.filter?t.filter!=="none":!1)||["transform","perspective","filter"].some((u)=>(t.willChange||"").includes(u))||["paint","layout","strict","content"].some((u)=>(t.contain||"").includes(u))}function vn(n){let o=G(n);while(J(o)&&!j(o)){if(A(o))return o;else if($(o))return null;o=G(o)}return null}function w(){if(typeof CSS==="undefined"||!CSS.supports)return!1;return CSS.supports("-webkit-backdrop-filter","none")}function j(n){return["html","body","#document"].includes(a(n))}function H(n){return k(n).getComputedStyle(n)}function D(n){if(N(n))return{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop};return{scrollLeft:n.scrollX,scrollTop:n.scrollY}}function G(n){if(a(n)==="html")return n;let o=n.assignedSlot||n.parentNode||Bn(n)&&n.host||U(n);return Bn(o)?o.host:o}function Mn(n){let o=G(n);if(j(o))return n.ownerDocument?n.ownerDocument.body:n.body;if(J(o)&&X(o))return o;return Mn(o)}function V(n,o,t){var u;if(o===void 0)o=[];if(t===void 0)t=!0;let r=Mn(n),h=r===((u=n.ownerDocument)==null?void 0:u.body),s=k(r);if(h){let i=O(s);return o.concat(s,s.visualViewport||[],X(r)?r:[],i&&t?V(i):[])}return o.concat(r,V(r,[],t))}function O(n){return n.parent&&Object.getPrototypeOf(n.parent)?n.frameElement:null}function an(n){let o=H(n),t=parseFloat(o.width)||0,u=parseFloat(o.height)||0,r=J(n),h=r?n.offsetWidth:t,s=r?n.offsetHeight:u,i=W(t)!==h||W(u)!==s;if(i)t=h,u=s;return{width:t,height:u,$:i}}function sn(n){return!N(n)?n.contextElement:n}function Y(n){let o=sn(n);if(!J(o))return B(1);let t=o.getBoundingClientRect(),{width:u,height:r,$:h}=an(o),s=(h?W(t.width):t.width)/u,i=(h?W(t.height):t.height)/r;if(!s||!Number.isFinite(s))s=1;if(!i||!Number.isFinite(i))i=1;return{x:s,y:i}}var zn=B(0);function jn(n){let o=k(n);if(!w()||!o.visualViewport)return zn;return{x:o.visualViewport.offsetLeft,y:o.visualViewport.offsetTop}}function Sn(n,o,t){if(o===void 0)o=!1;if(!t||o&&t!==k(n))return!1;return o}function Q(n,o,t,u){if(o===void 0)o=!1;if(t===void 0)t=!1;let r=n.getBoundingClientRect(),h=sn(n),s=B(1);if(o)if(u){if(N(u))s=Y(u)}else s=Y(n);let i=Sn(h,t,u)?jn(h):B(0),c=(r.left+i.x)/s.x,m=(r.top+i.y)/s.y,d=r.width/s.x,p=r.height/s.y;if(h){let b=k(h),E=u&&N(u)?k(u):u,q=b,g=O(q);while(g&&u&&E!==q){let C=Y(g),y=g.getBoundingClientRect(),T=H(g),I=y.left+(g.clientLeft+parseFloat(T.paddingLeft))*C.x,v=y.top+(g.clientTop+parseFloat(T.paddingTop))*C.y;c*=C.x,m*=C.y,d*=C.x,p*=C.y,c+=I,m+=v,q=k(g),g=O(q)}}return S({width:d,height:p,x:c,y:m})}function hn(n,o){let t=D(n).scrollLeft;if(!o)return Q(U(n)).left+t;return o.left+t}function Qn(n,o,t){if(t===void 0)t=!1;let u=n.getBoundingClientRect(),r=u.left+o.scrollLeft-(t?0:hn(n,u)),h=u.top+o.scrollTop;return{x:r,y:h}}function $n(n){let{elements:o,rect:t,offsetParent:u,strategy:r}=n,h=r==="fixed",s=U(u),i=o?$(o.floating):!1;if(u===s||i&&h)return t;let c={scrollLeft:0,scrollTop:0},m=B(1),d=B(0),p=J(u);if(p||!p&&!h){if(a(u)!=="body"||X(s))c=D(u);if(J(u)){let E=Q(u);m=Y(u),d.x=E.x+u.clientLeft,d.y=E.y+u.clientTop}}let b=s&&!p&&!h?Qn(s,c,!0):B(0);return{width:t.width*m.x,height:t.height*m.y,x:t.x*m.x-c.scrollLeft*m.x+d.x+b.x,y:t.y*m.y-c.scrollTop*m.y+d.y+b.y}}function Dn(n){return Array.from(n.getClientRects())}function _n(n){let o=U(n),t=D(n),u=n.ownerDocument.body,r=Z(o.scrollWidth,o.clientWidth,u.scrollWidth,u.clientWidth),h=Z(o.scrollHeight,o.clientHeight,u.scrollHeight,u.clientHeight),s=-t.scrollLeft+hn(n),i=-t.scrollTop;if(H(u).direction==="rtl")s+=Z(o.clientWidth,u.clientWidth)-r;return{width:r,height:h,x:s,y:i}}function Pn(n,o){let t=k(n),u=U(n),r=t.visualViewport,h=u.clientWidth,s=u.clientHeight,i=0,c=0;if(r){h=r.width,s=r.height;let m=w();if(!m||m&&o==="fixed")i=r.offsetLeft,c=r.offsetTop}return{width:h,height:s,x:i,y:c}}function xn(n,o){let t=Q(n,!0,o==="fixed"),u=t.top+n.clientTop,r=t.left+n.clientLeft,h=J(n)?Y(n):B(1),s=n.clientWidth*h.x,i=n.clientHeight*h.y,c=r*h.x,m=u*h.y;return{width:s,height:i,x:c,y:m}}function Gn(n,o,t){let u;if(o==="viewport")u=Pn(n,t);else if(o==="document")u=_n(U(n));else if(N(o))u=xn(o,t);else{let r=jn(n);u={x:o.x-r.x,y:o.y-r.y,width:o.width,height:o.height}}return S(u)}function Kn(n,o){let t=G(n);if(t===o||!N(t)||j(t))return!1;return H(t).position==="fixed"||Kn(t,o)}function An(n,o){let t=o.get(n);if(t)return t;let u=V(n,[],!1).filter((i)=>N(i)&&a(i)!=="body"),r=null,h=H(n).position==="fixed",s=h?G(n):n;while(N(s)&&!j(s)){let i=H(s),c=A(s);if(!c&&i.position==="fixed")r=null;if(h?!c&&!r:!c&&i.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||X(s)&&!c&&Kn(n,s))u=u.filter((d)=>d!==s);else r=i;s=G(s)}return o.set(n,u),u}function wn(n){let{element:o,boundary:t,rootBoundary:u,strategy:r}=n,s=[...t==="clippingAncestors"?$(o)?[]:An(o,this._c):[].concat(t),u],i=s[0],c=s.reduce((m,d)=>{let p=Gn(o,d,r);return m.top=Z(p.top,m.top),m.right=F(p.right,m.right),m.bottom=F(p.bottom,m.bottom),m.left=Z(p.left,m.left),m},Gn(o,i,r));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function On(n){let{width:o,height:t}=an(n);return{width:o,height:t}}function Rn(n,o,t){let u=J(o),r=U(o),h=t==="fixed",s=Q(n,!0,h,o),i={scrollLeft:0,scrollTop:0},c=B(0);if(u||!u&&!h){if(a(o)!=="body"||X(r))i=D(o);if(u){let b=Q(o,!0,h,o);c.x=b.x+o.clientLeft,c.y=b.y+o.clientTop}else if(r)c.x=hn(r)}let m=r&&!u&&!h?Qn(r,i):B(0),d=s.left+i.scrollLeft-c.x-m.x,p=s.top+i.scrollTop-c.y-m.y;return{x:d,y:p,width:s.width,height:s.height}}function rn(n){return H(n).position==="static"}function Zn(n,o){if(!J(n)||H(n).position==="fixed")return null;if(o)return o(n);let t=n.offsetParent;if(U(n)===t)t=t.ownerDocument.body;return t}function Vn(n,o){let t=k(n);if($(n))return t;if(!J(n)){let r=G(n);while(r&&!j(r)){if(N(r)&&!rn(r))return r;r=G(r)}return t}let u=Zn(n,o);while(u&&Jn(u)&&rn(u))u=Zn(u,o);if(u&&j(u)&&rn(u)&&!A(u))return t;return u||vn(n)||t}var ln=async function(n){let o=this.getOffsetParent||Vn,t=this.getDimensions,u=await t(n.floating);return{reference:Rn(n.reference,await o(n.floating),n.strategy),floating:{x:0,y:0,width:u.width,height:u.height}}};function fn(n){return H(n).direction==="rtl"}var en={convertOffsetParentRelativeRectToViewportRelativeRect:$n,getDocumentElement:U,getClippingRect:wn,getOffsetParent:Vn,getElementRects:ln,getClientRects:Dn,getDimensions:On,getScale:Y,isElement:N,isRTL:fn};function no(n,o){let t=null,u,r=U(n);function h(){var i;clearTimeout(u),(i=t)==null||i.disconnect(),t=null}function s(i,c){if(i===void 0)i=!1;if(c===void 0)c=1;h();let{left:m,top:d,width:p,height:b}=n.getBoundingClientRect();if(!i)o();if(!p||!b)return;let E=z(d),q=z(r.clientWidth-(m+p)),g=z(r.clientHeight-(d+b)),C=z(m),T={rootMargin:-E+"px "+-q+"px "+-g+"px "+-C+"px",threshold:Z(0,F(1,c))||1},I=!0;function v(M){let l=M[0].intersectionRatio;if(l!==c){if(!I)return s();if(!l)u=setTimeout(()=>{s(!1,0.0000001)},1000);else s(!1,l)}I=!1}try{t=new IntersectionObserver(v,{...T,root:r.ownerDocument})}catch(M){t=new IntersectionObserver(v,T)}t.observe(n)}return s(!0),h}function Xn(n,o,t,u){if(u===void 0)u={};let{ancestorScroll:r=!0,ancestorResize:h=!0,elementResize:s=typeof ResizeObserver==="function",layoutShift:i=typeof IntersectionObserver==="function",animationFrame:c=!1}=u,m=sn(n),d=r||h?[...m?V(m):[],...V(o)]:[];d.forEach((y)=>{r&&y.addEventListener("scroll",t,{passive:!0}),h&&y.addEventListener("resize",t)});let p=m&&i?no(m,t):null,b=-1,E=null;if(s){if(E=new ResizeObserver((y)=>{let[T]=y;if(T&&T.target===m&&E)E.unobserve(o),cancelAnimationFrame(b),b=requestAnimationFrame(()=>{var I;(I=E)==null||I.observe(o)});t()}),m&&!c)E.observe(m);E.observe(o)}let q,g=c?Q(n):null;if(c)C();function C(){let y=Q(n);if(g&&(y.x!==g.x||y.y!==g.y||y.width!==g.width||y.height!==g.height))t();g=y,q=requestAnimationFrame(C)}return t(),()=>{var y;if(d.forEach((T)=>{r&&T.removeEventListener("scroll",t),h&&T.removeEventListener("resize",t)}),p==null||p(),(y=E)==null||y.disconnect(),E=null,c)cancelAnimationFrame(q)}}var Yn=(n,o,t)=>{let u=new Map,r={platform:en,...t},h={...r.platform,_c:u};return Hn(n,o,{...r,platform:h})};class cn{target;content;tooltipElement;constructor(n,o){this.target=n,this.content=o,this.tooltipElement=null,this.init()}init(){this.target.addEventListener("mouseenter",()=>this.show()),this.target.addEventListener("mouseleave",()=>this.hide())}createTooltip(){if(this.tooltipElement)return;this.tooltipElement=document.createElement("div"),this.tooltipElement.className="tooltip-component",this.tooltipElement.setAttribute("role","tooltip");let n=document.createElement("div");n.className="tooltip-content tooltip-top";let o=document.createElement("div");o.className="tooltip-body tooltip-top",o.innerHTML=this.content,n.appendChild(o),this.tooltipElement.appendChild(n),document.body.appendChild(this.tooltipElement)}positionTooltip(){if(!this.tooltipElement)return;let n=()=>{Yn(this.target,this.tooltipElement,{placement:"top"}).then(({x:t,y:u})=>{this.tooltipElement.style.left=`${t}px`,this.tooltipElement.style.top=`${u}px`,this.tooltipElement.style.opacity="1",this.tooltipElement.style.transform="translate(0px, 0px)"})},o=Xn(this.target,this.tooltipElement,n);this.tooltipElement.addEventListener("mouseleave",()=>o()),n()}show(){this.createTooltip(),this.positionTooltip()}hide(){if(this.tooltipElement)document.body.removeChild(this.tooltipElement),this.tooltipElement=null}}var oo=function n(o){let t=document.createElement("style");t.innerHTML=o,document.head.append(t)};oo(`.flex-row {
    flex-direction: row !important;
}
`);var Fn={name:"[System] AddSetting",author:[],description:"Add settings.",version:"1.0.0",system:!0,paths:[{trigger(n){return n.startsWith("/settings")},handler(){let n=document.querySelector('a[href="https://www.chess.com/settings/board"].settings-menu-link'),o=document.createElement("a");o.href="#",o.className="settings-menu-link";let t=document.createElement("span");t.setAttribute("aria-hidden","true"),t.className="icon-font-chess circle-gearwheel settings-icon";let u=document.createElement("span");u.className="settings-link-name",u.textContent="Better Chess.com",o.appendChild(t),o.appendChild(u),n.parentNode.insertBefore(o,n),o.addEventListener("click",()=>{document.querySelectorAll(".settings-menu-link-active").forEach((p)=>{p.classList.remove("settings-menu-link-active")}),o.classList.add("settings-menu-link-active");let h=document.querySelector(".layout-column-two");while(h.firstChild)h.firstChild.remove();let s=document.createElement("div");s.className="v5-section";let i=document.createElement("div");i.className="v5-section-content";let c=document.createElement("h1");c.className="settings-category-title",c.textContent="Better Chess.com",i.appendChild(c);let m=document.createElement("div");m.className="settings-short-form";let d=K();for(let p of R){let b=d.includes(p.name),E=document.createElement("div");E.className="settings-form-group settings-form-switch-group";let q=document.createElement("label");if(q.setAttribute("for","setting_"+p.name),q.className="settings-label-text flex-row",q.textContent=p.name,p.description){let v=document.createElement("span");v.className="icon-font-chess circle-question settings-question-icon",new cn(v,p.description),q.appendChild(v)}let g=document.createElement("div");g.className="settings-toggle-switch";let C=document.createElement("div");C.className="cc-switch-component cc-switch-large";let y=document.createElement("input");y.type="checkbox",y.className="cc-switch-checkbox",y.id="setting_"+p.name,y.required=!0,y.disabled=p.system||!1,y.setAttribute("size","large"),y.setAttribute("isswitch","isSwitch"),y.checked=!b,y.addEventListener("change",()=>{if(b)Cn(p.name);else qn(p.name)});let T=document.createElement("label");T.className="cc-switch-label",T.setAttribute("for","setting_"+p.name);let I=document.createElement("div");I.className="cc-switch-button",T.appendChild(I),C.appendChild(y),C.appendChild(T),g.appendChild(C),E.appendChild(q),E.appendChild(g),m.appendChild(E)}i.appendChild(m),s.appendChild(i),h.appendChild(s)})}}]};var _=[];_.push(En);_.push(yn);_.push(gn);_.push(Fn);var R=_;var to=function n(o){let t=document.createElement("style");t.innerHTML=o,document.head.append(t)};to(`/* css by chesscom */

.alerts-container {
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
    z-index: 9001;
}

.no-nav .alerts-container {
    left: 0;
}

@media (min-width: 60em) {
    .alerts-container {
        left: var(--navWidth);
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
    width: 100%;
}

.alerts-alert:first-child {
    border-radius: 0 0 var(--radius-m) var(--radius-m);
}

.alerts-alert:last-child {
    margin-bottom: 0;
}

.alerts-message {
    flex: 1;
    line-height: 1.5;
    padding: 1.3rem 0;
}

.alerts-message a,
.alerts-message button {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0;
    text-decoration: underline;
}

.alerts-message a:focus,
.alerts-message a:hover,
.alerts-message button:focus,
.alerts-message button:hover {
    text-decoration: none;
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
    width: 5rem;
}

.alerts-close .icon-font-chess {
    color: rgba(0, 0, 0, 0.5);
    font-size: 2rem;
    margin: 0 auto;
}

.alerts-close:focus .icon-font-chess,
.alerts-close:hover .icon-font-chess {
    color: rgba(0, 0, 0, 0.8);
}

.alerts-error {
    background-color: var(--color-red-400);
}

.alerts-info,
.alerts-topical {
    background-color: var(--color-blue-300);
}

.alerts-success {
    background-color: var(--color-green-300);
}

.alerts-warning {
    background-color: var(--color-gold-400);
}

.btn-link-inline {
    display: inline-block;
}

@keyframes index-alertEnter {
    0% {
        opacity: 0;
        transform: translate3d(0, -25%, 0);
    }

    to {
        opacity: 1;
        transform: translateZ(0);
    }
}

@keyframes index-alertLeave {
    0% {
        max-height: 20rem;
        opacity: 1;
        transform: translateY(0);
    }

    to {
        max-height: 0;
        opacity: 0;
        transform: translateY(-50%);
    }
}

.alerts-enter {
    animation: index-alertEnter 0.1s ease-in both;
    animation-delay: 0.1s;
    opacity: 0;
}

.alerts-leave {
    animation: index-alertLeave 0.2s ease-in-out both;
    min-height: 0;
}
`);class mn{message;type;duration;constructor(n,o="info",t=7000){this.message=n,this.type=o,this.duration=t}show(){let n=document.getElementById("widget-alert-flash");if(!n)n=document.createElement("div"),n.id="widget-alert-flash",n.className="alerts-container",document.body.appendChild(n);let o=document.createElement("div"),t=`alert-${Date.now()}`;o.id=t,o.className=`alerts-alert alerts-enter alerts-${this.type}`;let u=document.createElement("span");u.className="alerts-message",u.textContent=this.message,o.appendChild(u);let r=document.createElement("button");r.className="alerts-close",r.type="button",r.innerHTML='<span class="icon-font-chess x"></span>',r.addEventListener("click",()=>{if(o.parentNode)o.parentNode.removeChild(o)}),o.appendChild(r),n.appendChild(o),setTimeout(()=>{if(o.parentNode)o.parentNode.removeChild(o)},this.duration)}}function uo(){if(!window.location.host.endsWith("chess.com"))return;let n=localStorage.getItem("toast");if(n)try{let t=JSON.parse(n);new mn(t.message,t.type).show(),localStorage.setItem("toast","")}catch(t){L.error(t)}let o=K();for(let t of R){if(o.includes(t.name))continue;for(let{trigger:u,handler:r}of t.paths)try{if(u(window.location.pathname))r(window.location.pathname)}catch(h){L.error("Plugin "+t.name+"error: "+h)}}}uo();
