/*
██████╗ ███████╗████████╗████████╗███████╗██████╗      ██████╗██╗  ██╗███████╗███████╗███████╗    ██████╗ ██████╗ ███╗   ███╗
██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗    ██╔════╝██║  ██║██╔════╝██╔════╝██╔════╝   ██╔════╝██╔═══██╗████╗ ████║
██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝    ██║     ███████║█████╗  ███████╗███████╗   ██║     ██║   ██║██╔████╔██║
██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗    ██║     ██╔══██║██╔══╝  ╚════██║╚════██║   ██║     ██║   ██║██║╚██╔╝██║
██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║    ╚██████╗██║  ██║███████╗███████║███████║██╗╚██████╗╚██████╔╝██║ ╚═╝ ██║
╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝                                                                                                               
Better Chess.com
*/
class M{static colors={reset:"\x1B[0m",red:"\x1B[31m",green:"\x1B[32m",yellow:"\x1B[33m",blue:"\x1B[34m",magenta:"\x1B[35m",cyan:"\x1B[36m",white:"\x1B[37m"};static color(u,h="white"){return`${this.colors[h]||this.colors.white}${u}${this.colors.reset}`}static getTime(){return new Date().toTimeString().split(" ")[0]}static error(...u){console.log(`[${this.getTime()}]`,this.color("[Error]","red"),...u)}static success(...u){console.log(`[${this.getTime()}]`,this.color("[Success]","green"),...u)}static warning(...u){console.log(`[${this.getTime()}]`,this.color("[Warning]","yellow"),...u)}static info(...u){console.log(`[${this.getTime()}]`,this.color("[Info]","cyan"),...u)}}async function Tu(u){try{let h=await fetch(u);if(!h.ok)throw new Error(`HTTP error! status: ${h.status}`);let n=await h.text(),T=new DOMParser().parseFromString(n,"text/html").querySelector('input[name="forum_topic_comment[_token]"]')?.getAttribute("value");if(!T)throw new Error("토큰을 찾지 못했습니다.");return T}catch(h){M.error(h)}}async function Lu(u,h,n,E=!0){try{let b=await fetch(u+"&newCommentCount=1",{headers:{accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","accept-language":"ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4","cache-control":"max-age=0","content-type":"application/x-www-form-urlencoded",priority:"u=0, i","sec-ch-ua":'"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Linux"',"sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},referrer:u+"&newCommentCount=1",referrerPolicy:"strict-origin-when-cross-origin",body:"mce_0=%3Cp%3E"+encodeURIComponent(n)+"%3C%2Fp%3E&forum_topic_comment%5Bbody%5D=%3Cp%3E"+encodeURIComponent(n)+"%3C%2Fp%3E&forum_topic_comment%5B_token%5D="+h+"&Post=&following="+(E?"on":"off"),method:"POST",mode:"cors",credentials:"include"});if(M.success(`Add comment: ${n}`),!b.ok)throw new Error(`HTTP error! status: ${b.status}`)}catch(b){M.error(b)}}async function A(u){try{let h=await fetch(u);if(!h.ok)throw new Error(`HTTP error! status: ${h.status}`);let n=await h.text(),T=new DOMParser().parseFromString(n,"text/html").querySelectorAll('form[action*="delete_comment"]'),y=[];T.forEach((L)=>{let o=L.getAttribute("action");if(!o||o.includes("delete_comment?all=1"))return;let q=L.querySelector('input[name="_token"]'),H=q?q.value:null;if(o&&H)y.push({action:o,token:H})});for(let{action:L,token:o}of y)await fetch(L,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({_token:o})}),M.success(`Deleted: ${L}`);return y}catch(h){M.error(h)}}var ou={name:"AddConsoleApi",author:[],description:"콘솔에 유용한 함수를 추가합니다.",version:"1.0.0",paths:[{trigger(u){return!0},handler(){class u{url;token;constructor(h=window.location.href){this.url=h}async init(){this.token=await Tu(this.url)}async addComment({message:h,following:n=!0}){if(!this.token)throw new Error("먼저 init를 해야 합니다.");return await Lu(this.url,this.token,h,n)}async removePage(h=window.location.href){await A(h)}}window.CHESSCOM_API=u}}]};class a{message;onConfirm;modalContainer;constructor(u,h){this.message=u,this.onConfirm=h||null,this.modalContainer=null}open(){this.modalContainer=document.createElement("div"),this.modalContainer.className="modal-container-component";let u=document.createElement("div");u.className="modal-container-bg",u.addEventListener("click",()=>this.close()),this.modalContainer.appendChild(u);let h=document.createElement("section");h.className="modal-content-component confirm-popover-modal";let n=document.createElement("div");n.className="confirm-popover-messageLabel",n.textContent=this.message,h.appendChild(n);let E=document.createElement("div");E.className="confirm-popover-buttons";let b=document.createElement("button");b.className="cc-button-component cc-button-secondary cc-button-medium cc-button-min-width",b.type="button",b.textContent="취소",b.addEventListener("click",()=>this.close()),E.appendChild(b);let T=document.createElement("button");T.className="cc-button-component cc-button-primary cc-button-medium cc-button-min-width",T.type="button",T.textContent="네",T.addEventListener("click",()=>{if(this.onConfirm)this.onConfirm();this.close()}),E.appendChild(T),h.appendChild(E),this.modalContainer.appendChild(h),document.body.appendChild(this.modalContainer)}close(){if(this.modalContainer)document.body.removeChild(this.modalContainer),this.modalContainer=null}}function qu(u){localStorage.setItem("toast",JSON.stringify(u))}var $u=function u(h){let n=document.createElement("style");n.innerHTML=h,document.head.append(n)};$u(`.remove-page-component {
    margin-top: 1rem;
    display: flex;
    flex-direction: row-reverse;
}
`);var ku={name:"AutoRemoveComments",author:[],description:"자동으로 댓글을 지워줍니다.",version:"1.0.0",paths:[{trigger(u){return u.startsWith("/clubs/forum/view/")},handler(){let u=document.createElement("div");u.className="remove-page-component";let h=document.createElement("button");h.className="ui_pagination-item-component",h.innerText="페이지 삭제하기",h.onclick=()=>{new a("이 페이지를 정말로 삭제할까요?",async()=>{await A(window.location.href),qu({type:"success",message:"페이지 삭제가 완료되었습니다."}),history.go(0)}).open()},u.appendChild(h);let n=document.querySelector(".forums-single-sharing.forums-single-sharing-transparent");n.parentNode.insertBefore(u,n)}}]};function $(){let u=localStorage.getItem("DisabledPlugins"),h=[];if(u)try{h=JSON.parse(u)}catch(n){console.error("Error parsing DisabledPlugins",n)}return h}function Cu(u){let h=localStorage.getItem("DisabledPlugins"),n=$();n.push(u),localStorage.setItem("DisabledPlugins",JSON.stringify(n))}function Hu(u){let h=localStorage.getItem("DisabledPlugins"),n=$().filter((E)=>E!==u);localStorage.setItem("DisabledPlugins",JSON.stringify(n))}var{min:P,max:z,round:m,floor:x}=Math,I=(u)=>({x:u,y:u});function e(u){return u.split("-")[0]}function Ju(u){return u.split("-")[1]}function Nu(u){return u==="x"?"y":"x"}function Gu(u){return u==="y"?"height":"width"}function uu(u){return["top","bottom"].includes(e(u))?"y":"x"}function Uu(u){return Nu(uu(u))}function O(u){let{x:h,y:n,width:E,height:b}=u;return{width:E,height:b,top:n,left:h,right:h+E,bottom:n+b,x:h,y:n}}function Zu(u,h,n){let{reference:E,floating:b}=u,T=uu(h),y=Uu(h),L=Gu(y),o=e(h),q=T==="y",H=E.x+E.width/2-b.width/2,k=E.y+E.height/2-b.height/2,G=E[L]/2-b[L]/2,C;switch(o){case"top":C={x:H,y:E.y-b.height};break;case"bottom":C={x:H,y:E.y+E.height};break;case"right":C={x:E.x+E.width,y:k};break;case"left":C={x:E.x-b.width,y:k};break;default:C={x:E.x,y:E.y}}switch(Ju(h)){case"start":C[y]-=G*(n&&q?-1:1);break;case"end":C[y]+=G*(n&&q?-1:1);break}return C}var gu=async(u,h,n)=>{let{placement:E="bottom",strategy:b="absolute",middleware:T=[],platform:y}=n,L=T.filter(Boolean),o=await(y.isRTL==null?void 0:y.isRTL(h)),q=await y.getElementRects({reference:u,floating:h,strategy:b}),{x:H,y:k}=Zu(q,E,o),G=E,C={},g=0;for(let N=0;N<L.length;N++){let{name:U,fn:J}=L[N],{x:Z,y:p,data:V,reset:Y}=await J({x:H,y:k,initialPlacement:E,placement:G,strategy:b,middlewareData:C,rects:q,platform:y,elements:{reference:u,floating:h}});if(H=Z!=null?Z:H,k=p!=null?p:k,C={...C,[U]:{...C[U],...V}},Y&&g<=50){if(g++,typeof Y==="object"){if(Y.placement)G=Y.placement;if(Y.rects)q=Y.rects===!0?await y.getElementRects({reference:u,floating:h,strategy:b}):Y.rects;({x:H,y:k}=Zu(q,G,o))}N=-1}}return{x:H,y:k,placement:G,strategy:b,middlewareData:C}};function w(){return typeof window!=="undefined"}function F(u){if(pu(u))return(u.nodeName||"").toLowerCase();return"#document"}function Q(u){var h;return(u==null||(h=u.ownerDocument)==null?void 0:h.defaultView)||window}function X(u){var h;return(h=(pu(u)?u.ownerDocument:u.document)||window.document)==null?void 0:h.documentElement}function pu(u){if(!w())return!1;return u instanceof Node||u instanceof Q(u).Node}function K(u){if(!w())return!1;return u instanceof Element||u instanceof Q(u).Element}function j(u){if(!w())return!1;return u instanceof HTMLElement||u instanceof Q(u).HTMLElement}function Qu(u){if(!w()||typeof ShadowRoot==="undefined")return!1;return u instanceof ShadowRoot||u instanceof Q(u).ShadowRoot}function D(u){let{overflow:h,overflowX:n,overflowY:E,display:b}=B(u);return/auto|scroll|overlay|hidden|clip/.test(h+E+n)&&!["inline","contents"].includes(b)}function Ku(u){return["table","td","th"].includes(F(u))}function R(u){return[":popover-open",":modal"].some((h)=>{try{return u.matches(h)}catch(n){return!1}})}function d(u){let h=i(),n=K(u)?B(u):u;return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!h&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!h&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some((E)=>(n.willChange||"").includes(E))||["paint","layout","strict","content"].some((E)=>(n.contain||"").includes(E))}function Bu(u){let h=W(u);while(j(h)&&!c(h)){if(d(h))return h;else if(R(h))return null;h=W(h)}return null}function i(){if(typeof CSS==="undefined"||!CSS.supports)return!1;return CSS.supports("-webkit-backdrop-filter","none")}function c(u){return["html","body","#document"].includes(F(u))}function B(u){return Q(u).getComputedStyle(u)}function r(u){if(K(u))return{scrollLeft:u.scrollLeft,scrollTop:u.scrollTop};return{scrollLeft:u.scrollX,scrollTop:u.scrollY}}function W(u){if(F(u)==="html")return u;let h=u.assignedSlot||u.parentNode||Qu(u)&&u.host||X(u);return Qu(h)?h.host:h}function Iu(u){let h=W(u);if(c(h))return u.ownerDocument?u.ownerDocument.body:u.body;if(j(h)&&D(h))return h;return Iu(h)}function _(u,h,n){var E;if(h===void 0)h=[];if(n===void 0)n=!0;let b=Iu(u),T=b===((E=u.ownerDocument)==null?void 0:E.body),y=Q(b);if(T){let L=s(y);return h.concat(y,y.visualViewport||[],D(b)?b:[],L&&n?_(L):[])}return h.concat(b,_(b,[],n))}function s(u){return u.parent&&Object.getPrototypeOf(u.parent)?u.frameElement:null}function Vu(u){let h=B(u),n=parseFloat(h.width)||0,E=parseFloat(h.height)||0,b=j(u),T=b?u.offsetWidth:n,y=b?u.offsetHeight:E,L=m(n)!==T||m(E)!==y;if(L)n=T,E=y;return{width:n,height:E,$:L}}function nu(u){return!K(u)?u.contextElement:u}function v(u){let h=nu(u);if(!j(h))return I(1);let n=h.getBoundingClientRect(),{width:E,height:b,$:T}=Vu(h),y=(T?m(n.width):n.width)/E,L=(T?m(n.height):n.height)/b;if(!y||!Number.isFinite(y))y=1;if(!L||!Number.isFinite(L))L=1;return{x:y,y:L}}var _u=I(0);function Yu(u){let h=Q(u);if(!i()||!h.visualViewport)return _u;return{x:h.visualViewport.offsetLeft,y:h.visualViewport.offsetTop}}function Du(u,h,n){if(h===void 0)h=!1;if(!n||h&&n!==Q(u))return!1;return h}function S(u,h,n,E){if(h===void 0)h=!1;if(n===void 0)n=!1;let b=u.getBoundingClientRect(),T=nu(u),y=I(1);if(h)if(E){if(K(E))y=v(E)}else y=v(u);let L=Du(T,n,E)?Yu(T):I(0),o=(b.left+L.x)/y.x,q=(b.top+L.y)/y.y,H=b.width/y.x,k=b.height/y.y;if(T){let G=Q(T),C=E&&K(E)?Q(E):E,g=G,N=s(g);while(N&&E&&C!==g){let U=v(N),J=N.getBoundingClientRect(),Z=B(N),p=J.left+(N.clientLeft+parseFloat(Z.paddingLeft))*U.x,V=J.top+(N.clientTop+parseFloat(Z.paddingTop))*U.y;o*=U.x,q*=U.y,H*=U.x,k*=U.y,o+=p,q+=V,g=Q(N),N=s(g)}}return O({width:H,height:k,x:o,y:q})}function Eu(u,h){let n=r(u).scrollLeft;if(!h)return S(X(u)).left+n;return h.left+n}function Mu(u,h,n){if(n===void 0)n=!1;let E=u.getBoundingClientRect(),b=E.left+h.scrollLeft-(n?0:Eu(u,E)),T=E.top+h.scrollTop;return{x:b,y:T}}function vu(u){let{elements:h,rect:n,offsetParent:E,strategy:b}=u,T=b==="fixed",y=X(E),L=h?R(h.floating):!1;if(E===y||L&&T)return n;let o={scrollLeft:0,scrollTop:0},q=I(1),H=I(0),k=j(E);if(k||!k&&!T){if(F(E)!=="body"||D(y))o=r(E);if(j(E)){let C=S(E);q=v(E),H.x=C.x+E.clientLeft,H.y=C.y+E.clientTop}}let G=y&&!k&&!T?Mu(y,o,!0):I(0);return{width:n.width*q.x,height:n.height*q.y,x:n.x*q.x-o.scrollLeft*q.x+H.x+G.x,y:n.y*q.y-o.scrollTop*q.y+H.y+G.y}}function Pu(u){return Array.from(u.getClientRects())}function mu(u){let h=X(u),n=r(u),E=u.ownerDocument.body,b=z(h.scrollWidth,h.clientWidth,E.scrollWidth,E.clientWidth),T=z(h.scrollHeight,h.clientHeight,E.scrollHeight,E.clientHeight),y=-n.scrollLeft+Eu(u),L=-n.scrollTop;if(B(E).direction==="rtl")y+=z(h.clientWidth,E.clientWidth)-b;return{width:b,height:T,x:y,y:L}}function xu(u,h){let n=Q(u),E=X(u),b=n.visualViewport,T=E.clientWidth,y=E.clientHeight,L=0,o=0;if(b){T=b.width,y=b.height;let q=i();if(!q||q&&h==="fixed")L=b.offsetLeft,o=b.offsetTop}return{width:T,height:y,x:L,y:o}}function Ou(u,h){let n=S(u,!0,h==="fixed"),E=n.top+u.clientTop,b=n.left+u.clientLeft,T=j(u)?v(u):I(1),y=u.clientWidth*T.x,L=u.clientHeight*T.y,o=b*T.x,q=E*T.y;return{width:y,height:L,x:o,y:q}}function Xu(u,h,n){let E;if(h==="viewport")E=xu(u,n);else if(h==="document")E=mu(X(u));else if(K(h))E=Ou(h,n);else{let b=Yu(u);E={x:h.x-b.x,y:h.y-b.y,width:h.width,height:h.height}}return O(E)}function Wu(u,h){let n=W(u);if(n===h||!K(n)||c(n))return!1;return B(n).position==="fixed"||Wu(n,h)}function Ru(u,h){let n=h.get(u);if(n)return n;let E=_(u,[],!1).filter((L)=>K(L)&&F(L)!=="body"),b=null,T=B(u).position==="fixed",y=T?W(u):u;while(K(y)&&!c(y)){let L=B(y),o=d(y);if(!o&&L.position==="fixed")b=null;if(T?!o&&!b:!o&&L.position==="static"&&!!b&&["absolute","fixed"].includes(b.position)||D(y)&&!o&&Wu(u,y))E=E.filter((H)=>H!==y);else b=L;y=W(y)}return h.set(u,E),E}function ru(u){let{element:h,boundary:n,rootBoundary:E,strategy:b}=u,y=[...n==="clippingAncestors"?R(h)?[]:Ru(h,this._c):[].concat(n),E],L=y[0],o=y.reduce((q,H)=>{let k=Xu(h,H,b);return q.top=z(k.top,q.top),q.right=P(k.right,q.right),q.bottom=P(k.bottom,q.bottom),q.left=z(k.left,q.left),q},Xu(h,L,b));return{width:o.right-o.left,height:o.bottom-o.top,x:o.left,y:o.top}}function Au(u){let{width:h,height:n}=Vu(u);return{width:h,height:n}}function wu(u,h,n){let E=j(h),b=X(h),T=n==="fixed",y=S(u,!0,T,h),L={scrollLeft:0,scrollTop:0},o=I(0);if(E||!E&&!T){if(F(h)!=="body"||D(b))L=r(h);if(E){let G=S(h,!0,T,h);o.x=G.x+h.clientLeft,o.y=G.y+h.clientTop}else if(b)o.x=Eu(b)}let q=b&&!E&&!T?Mu(b,L):I(0),H=y.left+L.scrollLeft-o.x-q.x,k=y.top+L.scrollTop-o.y-q.y;return{x:H,y:k,width:y.width,height:y.height}}function hu(u){return B(u).position==="static"}function ju(u,h){if(!j(u)||B(u).position==="fixed")return null;if(h)return h(u);let n=u.offsetParent;if(X(u)===n)n=n.ownerDocument.body;return n}function zu(u,h){let n=Q(u);if(R(u))return n;if(!j(u)){let b=W(u);while(b&&!c(b)){if(K(b)&&!hu(b))return b;b=W(b)}return n}let E=ju(u,h);while(E&&Ku(E)&&hu(E))E=ju(E,h);if(E&&c(E)&&hu(E)&&!d(E))return n;return E||Bu(u)||n}var du=async function(u){let h=this.getOffsetParent||zu,n=this.getDimensions,E=await n(u.floating);return{reference:wu(u.reference,await h(u.floating),u.strategy),floating:{x:0,y:0,width:E.width,height:E.height}}};function iu(u){return B(u).direction==="rtl"}var su={convertOffsetParentRelativeRectToViewportRelativeRect:vu,getDocumentElement:X,getClippingRect:ru,getOffsetParent:zu,getElementRects:du,getClientRects:Pu,getDimensions:Au,getScale:v,isElement:K,isRTL:iu};function tu(u,h){let n=null,E,b=X(u);function T(){var L;clearTimeout(E),(L=n)==null||L.disconnect(),n=null}function y(L,o){if(L===void 0)L=!1;if(o===void 0)o=1;T();let{left:q,top:H,width:k,height:G}=u.getBoundingClientRect();if(!L)h();if(!k||!G)return;let C=x(H),g=x(b.clientWidth-(q+k)),N=x(b.clientHeight-(H+G)),U=x(q),Z={rootMargin:-C+"px "+-g+"px "+-N+"px "+-U+"px",threshold:z(0,P(1,o))||1},p=!0;function V(Y){let l=Y[0].intersectionRatio;if(l!==o){if(!p)return y();if(!l)E=setTimeout(()=>{y(!1,0.0000001)},1000);else y(!1,l)}p=!1}try{n=new IntersectionObserver(V,{...Z,root:b.ownerDocument})}catch(Y){n=new IntersectionObserver(V,Z)}n.observe(u)}return y(!0),T}function Fu(u,h,n,E){if(E===void 0)E={};let{ancestorScroll:b=!0,ancestorResize:T=!0,elementResize:y=typeof ResizeObserver==="function",layoutShift:L=typeof IntersectionObserver==="function",animationFrame:o=!1}=E,q=nu(u),H=b||T?[...q?_(q):[],..._(h)]:[];H.forEach((J)=>{b&&J.addEventListener("scroll",n,{passive:!0}),T&&J.addEventListener("resize",n)});let k=q&&L?tu(q,n):null,G=-1,C=null;if(y){if(C=new ResizeObserver((J)=>{let[Z]=J;if(Z&&Z.target===q&&C)C.unobserve(h),cancelAnimationFrame(G),G=requestAnimationFrame(()=>{var p;(p=C)==null||p.observe(h)});n()}),q&&!o)C.observe(q);C.observe(h)}let g,N=o?S(u):null;if(o)U();function U(){let J=S(u);if(N&&(J.x!==N.x||J.y!==N.y||J.width!==N.width||J.height!==N.height))n();N=J,g=requestAnimationFrame(U)}return n(),()=>{var J;if(H.forEach((Z)=>{b&&Z.removeEventListener("scroll",n),T&&Z.removeEventListener("resize",n)}),k==null||k(),(J=C)==null||J.disconnect(),C=null,o)cancelAnimationFrame(g)}}var cu=(u,h,n)=>{let E=new Map,b={platform:su,...n},T={...b.platform,_c:E};return gu(u,h,{...b,platform:T})};class bu{target;content;tooltipElement;constructor(u,h){this.target=u,this.content=h,this.tooltipElement=null,this.init()}init(){this.target.addEventListener("mouseenter",()=>this.show()),this.target.addEventListener("mouseleave",()=>this.hide())}createTooltip(){if(this.tooltipElement)return;this.tooltipElement=document.createElement("div"),this.tooltipElement.className="tooltip-component",this.tooltipElement.setAttribute("role","tooltip");let u=document.createElement("div");u.className="tooltip-content tooltip-top";let h=document.createElement("div");h.className="tooltip-body tooltip-top",h.innerHTML=this.content,u.appendChild(h),this.tooltipElement.appendChild(u),document.body.appendChild(this.tooltipElement)}positionTooltip(){if(!this.tooltipElement)return;let u=()=>{cu(this.target,this.tooltipElement,{placement:"top"}).then(({x:n,y:E})=>{this.tooltipElement.style.left=`${n}px`,this.tooltipElement.style.top=`${E}px`,this.tooltipElement.style.opacity="1",this.tooltipElement.style.transform="translate(0px, 0px)"})},h=Fu(this.target,this.tooltipElement,u);this.tooltipElement.addEventListener("mouseleave",()=>h()),u()}show(){this.createTooltip(),this.positionTooltip()}hide(){if(this.tooltipElement)document.body.removeChild(this.tooltipElement),this.tooltipElement=null}}var fu=function u(h){let n=document.createElement("style");n.innerHTML=h,document.head.append(n)};fu(`.flex-row {
    flex-direction: row !important;
}
`);var Su={name:"AddSetting",author:[],description:"설정을 추가합니다.",version:"1.0.0",system:!0,paths:[{trigger(u){return u.startsWith("/settings")},handler(){let u=document.querySelector('a[href="https://www.chess.com/settings/board"].settings-menu-link'),h=document.createElement("a");h.href="#",h.className="settings-menu-link";let n=document.createElement("span");n.setAttribute("aria-hidden","true"),n.className="icon-font-chess circle-gearwheel settings-icon";let E=document.createElement("span");E.className="settings-link-name",E.textContent="Better Chess.com",h.appendChild(n),h.appendChild(E),u.parentNode.insertBefore(h,u),h.addEventListener("click",()=>{document.querySelectorAll(".settings-menu-link-active").forEach((k)=>{k.classList.remove("settings-menu-link-active")}),h.classList.add("settings-menu-link-active");let T=document.querySelector(".layout-column-two");while(T.firstChild)T.firstChild.remove();let y=document.createElement("div");y.className="v5-section";let L=document.createElement("div");L.className="v5-section-content";let o=document.createElement("h1");o.className="settings-category-title",o.textContent="Better Chess.com",L.appendChild(o);let q=document.createElement("div");q.className="settings-short-form";let H=$();for(let k of t){let G=H.includes(k.name),C=document.createElement("div");C.className="settings-form-group settings-form-switch-group";let g=document.createElement("label");if(g.setAttribute("for","setting_"+k.name),g.className="settings-label-text flex-row",g.textContent=k.name,k.description){let V=document.createElement("span");V.className="icon-font-chess circle-question settings-question-icon",new bu(V,k.description),g.appendChild(V)}let N=document.createElement("div");N.className="settings-toggle-switch";let U=document.createElement("div");U.className="cc-switch-component cc-switch-large";let J=document.createElement("input");J.type="checkbox",J.className="cc-switch-checkbox",J.id="setting_"+k.name,J.required=!0,J.disabled=k.system||!1,J.setAttribute("size","large"),J.setAttribute("isswitch","isSwitch"),J.checked=!G,J.addEventListener("change",()=>{if(G)Hu(k.name);else Cu(k.name)});let Z=document.createElement("label");Z.className="cc-switch-label",Z.setAttribute("for","setting_"+k.name);let p=document.createElement("div");p.className="cc-switch-button",Z.appendChild(p),U.appendChild(J),U.appendChild(Z),N.appendChild(U),C.appendChild(g),C.appendChild(N),q.appendChild(C)}L.appendChild(q),y.appendChild(L),T.appendChild(y)})}}]};var f=[];f.push(ou);f.push(ku);f.push(Su);var t=f;var lu=function u(h){let n=document.createElement("style");n.innerHTML=h,document.head.append(n)};lu(`/* css by chesscom */

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
`);class yu{message;type;duration;constructor(u,h="info",n=7000){this.message=u,this.type=h,this.duration=n}show(){let u=document.getElementById("widget-alert-flash");if(!u)u=document.createElement("div"),u.id="widget-alert-flash",u.className="alerts-container",document.body.appendChild(u);let h=document.createElement("div"),n=`alert-${Date.now()}`;h.id=n,h.className=`alerts-alert alerts-enter alerts-${this.type}`;let E=document.createElement("span");E.className="alerts-message",E.textContent=this.message,h.appendChild(E);let b=document.createElement("button");b.className="alerts-close",b.type="button",b.innerHTML='<span class="icon-font-chess x"></span>',b.addEventListener("click",()=>{if(h.parentNode)h.parentNode.removeChild(h)}),h.appendChild(b),u.appendChild(h),setTimeout(()=>{if(h.parentNode)h.parentNode.removeChild(h)},this.duration)}}function au(){if(!window.location.host.endsWith("chess.com"))return;let u=localStorage.getItem("toast");if(u)try{let n=JSON.parse(u);new yu(n.message,n.type).show(),localStorage.setItem("toast","")}catch(n){M.error(n)}let h=$();for(let n of t){if(h.includes(n.name))continue;for(let{trigger:E,handler:b}of n.paths)if(E(window.location.pathname))b(window.location.pathname)}}au();
