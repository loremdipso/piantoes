function e(){}const t=e=>e;function n(e,t){for(const n in t)e[n]=t[n];return e}function r(e){return e()}function s(){return Object.create(null)}function o(e){e.forEach(r)}function l(e){return"function"==typeof e}function i(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let c;function a(e,t){return c||(c=document.createElement("a")),c.href=t,e===c.href}function u(t,...n){if(null==t)return e;const r=t.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function f(e,t,n){e.$$.on_destroy.push(u(t,n))}function d(e,t,n,r){if(e){const s=$(e,t,n,r);return e[0](s)}}function $(e,t,r,s){return e[1]&&s?n(r.ctx.slice(),e[1](s(t))):r.ctx}function p(e,t,n,r){if(e[2]&&r){const s=e[2](r(n));if(void 0===t.dirty)return s;if("object"==typeof s){const e=[],n=Math.max(t.dirty.length,s.length);for(let r=0;r<n;r+=1)e[r]=t.dirty[r]|s[r];return e}return t.dirty|s}return t.dirty}function m(e,t,n,r,s,o){if(s){const l=$(t,n,r,o);e.p(l,s)}}function g(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}function h(e){const t={};for(const n in e)"$"!==n[0]&&(t[n]=e[n]);return t}function y(e){return null==e?"":e}function v(e,t,n){return e.set(n),t}function b(t){return t&&l(t.destroy)?t.destroy:e}const x="undefined"!=typeof window;let w=x?()=>window.performance.now():()=>Date.now(),C=x?e=>requestAnimationFrame(e):e;const k=new Set;function _(e){k.forEach((t=>{t.c(e)||(k.delete(t),t.f())})),0!==k.size&&C(_)}function E(e){let t;return 0===k.size&&C(_),{promise:new Promise((n=>{k.add(t={c:e,f:n})})),abort(){k.delete(t)}}}function L(e,t){e.appendChild(t)}function A(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function D(e){const t=R("style");return function(e,t){L(e.head||e,t)}(A(e),t),t.sheet}function z(e,t,n){e.insertBefore(t,n||null)}function j(e){e.parentNode.removeChild(e)}function R(e){return document.createElement(e)}function B(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function P(e){return document.createTextNode(e)}function O(){return P(" ")}function F(){return P("")}function S(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function q(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function I(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const r in t)null==t[r]?e.removeAttribute(r):"style"===r?e.style.cssText=t[r]:"__value"===r?e.value=e[r]=t[r]:n[r]&&n[r].set?e[r]=t[r]:q(e,r,t[r])}function M(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function N(e,t,n,r){null===n?e.style.removeProperty(t):e.style.setProperty(t,n,r?"important":"")}function T(e,t,n){e.classList[n?"add":"remove"](t)}function G(e,t,n=!1){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,!1,t),r}const U=new Map;let H,Z=0;function V(e,t,n,r,s,o,l,i=0){const c=16.666/r;let a="{\n";for(let e=0;e<=1;e+=c){const r=t+(n-t)*o(e);a+=100*e+`%{${l(r,1-r)}}\n`}const u=a+`100% {${l(n,1-n)}}\n}`,f=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(u)}_${i}`,d=A(e),{stylesheet:$,rules:p}=U.get(d)||function(e,t){const n={stylesheet:D(t),rules:{}};return U.set(e,n),n}(d,e);p[f]||(p[f]=!0,$.insertRule(`@keyframes ${f} ${u}`,$.cssRules.length));const m=e.style.animation||"";return e.style.animation=`${m?`${m}, `:""}${f} ${r}ms linear ${s}ms 1 both`,Z+=1,f}function W(e,t){const n=(e.style.animation||"").split(", "),r=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),s=n.length-r.length;s&&(e.style.animation=r.join(", "),Z-=s,Z||C((()=>{Z||(U.forEach((e=>{const{stylesheet:t}=e;let n=t.cssRules.length;for(;n--;)t.deleteRule(n);e.rules={}})),U.clear())})))}function X(e){H=e}function Y(){const e=function(){if(!H)throw new Error("Function called outside component initialization");return H}();return(t,n)=>{const r=e.$$.callbacks[t];if(r){const s=G(t,n);r.slice().forEach((t=>{t.call(e,s)}))}}}function J(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach((e=>e.call(this,t)))}const K=[],Q=[],ee=[],te=[],ne=Promise.resolve();let re=!1;function se(e){ee.push(e)}const oe=new Set;let le,ie=0;function ce(){const e=H;do{for(;ie<K.length;){const e=K[ie];ie++,X(e),ae(e.$$)}for(X(null),K.length=0,ie=0;Q.length;)Q.pop()();for(let e=0;e<ee.length;e+=1){const t=ee[e];oe.has(t)||(oe.add(t),t())}ee.length=0}while(K.length);for(;te.length;)te.pop()();re=!1,oe.clear(),X(e)}function ae(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(se)}}function ue(){return le||(le=Promise.resolve(),le.then((()=>{le=null}))),le}function fe(e,t,n){e.dispatchEvent(G(`${t?"intro":"outro"}${n}`))}const de=new Set;let $e;function pe(){$e={r:0,c:[],p:$e}}function me(){$e.r||o($e.c),$e=$e.p}function ge(e,t){e&&e.i&&(de.delete(e),e.i(t))}function he(e,t,n,r){if(e&&e.o){if(de.has(e))return;de.add(e),$e.c.push((()=>{de.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}}const ye={duration:0};function ve(e,t){const n={},r={},s={$$scope:1};let o=e.length;for(;o--;){const l=e[o],i=t[o];if(i){for(const e in l)e in i||(r[e]=1);for(const e in i)s[e]||(n[e]=i[e],s[e]=1);e[o]=i}else for(const e in l)s[e]=1}for(const e in r)e in n||(n[e]=void 0);return n}function be(e){e&&e.c()}function xe(e,t,n,s){const{fragment:i,on_mount:c,on_destroy:a,after_update:u}=e.$$;i&&i.m(t,n),s||se((()=>{const t=c.map(r).filter(l);a?a.push(...t):o(t),e.$$.on_mount=[]})),u.forEach(se)}function we(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ce(e,t){-1===e.$$.dirty[0]&&(K.push(e),re||(re=!0,ne.then(ce)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ke(t,n,r,l,i,c,a,u=[-1]){const f=H;X(t);const d=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:i,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:s(),dirty:u,skip_bound:!1,root:n.target||f.$$.root};a&&a(d.root);let $=!1;if(d.ctx=r?r(t,n.props||{},((e,n,...r)=>{const s=r.length?r[0]:n;return d.ctx&&i(d.ctx[e],d.ctx[e]=s)&&(!d.skip_bound&&d.bound[e]&&d.bound[e](s),$&&Ce(t,e)),n})):[],d.update(),$=!0,o(d.before_update),d.fragment=!!l&&l(d.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);d.fragment&&d.fragment.l(e),e.forEach(j)}else d.fragment&&d.fragment.c();n.intro&&ge(t.$$.fragment),xe(t,n.target,n.anchor,n.customElement),ce()}X(f)}class _e{$destroy(){we(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Ee(e){let t,n,r,s,o,l;const i=e[7].default,c=d(i,e,e[6],null);return{c(){t=R("i"),c&&c.c(),q(t,"aria-hidden","true"),q(t,"class",n="material-icons icon text-xl select-none "+e[5].class+" duration-200 ease-in svelte-1vfhdta"),q(t,"style",r=e[4]?`color: ${e[4]}`:""),T(t,"reverse",e[2]),T(t,"tip",e[3]),T(t,"text-base",e[0]),T(t,"text-xs",e[1])},m(n,r){z(n,t,r),c&&c.m(t,null),s=!0,o||(l=S(t,"click",e[8]),o=!0)},p(e,[o]){c&&c.p&&(!s||64&o)&&m(c,i,e,e[6],s?p(i,e[6],o,null):g(e[6]),null),(!s||32&o&&n!==(n="material-icons icon text-xl select-none "+e[5].class+" duration-200 ease-in svelte-1vfhdta"))&&q(t,"class",n),(!s||16&o&&r!==(r=e[4]?`color: ${e[4]}`:""))&&q(t,"style",r),36&o&&T(t,"reverse",e[2]),40&o&&T(t,"tip",e[3]),33&o&&T(t,"text-base",e[0]),34&o&&T(t,"text-xs",e[1])},i(e){s||(ge(c,e),s=!0)},o(e){he(c,e),s=!1},d(e){e&&j(t),c&&c.d(e),o=!1,l()}}}function Le(e,t,r){let{$$slots:s={},$$scope:o}=t,{small:l=!1}=t,{xs:i=!1}=t,{reverse:c=!1}=t,{tip:a=!1}=t,{color:u="default"}=t;return e.$$set=e=>{r(5,t=n(n({},t),h(e))),"small"in e&&r(0,l=e.small),"xs"in e&&r(1,i=e.xs),"reverse"in e&&r(2,c=e.reverse),"tip"in e&&r(3,a=e.tip),"color"in e&&r(4,u=e.color),"$$scope"in e&&r(6,o=e.$$scope)},t=h(t),[l,i,c,a,u,t,o,s,function(t){J.call(this,e,t)}]}class Ae extends _e{constructor(e){super(),ke(this,e,Le,Ee,i,{small:0,xs:1,reverse:2,tip:3,color:4})}}const De=["white","black","transparent"];function ze(e,t,n,r){return De.includes(t)?`${e}-${t}`:`${e}-${t}-${n||r} `}function je(e,t=500){return{bg:n=>ze("bg",e,n,t),border:n=>ze("border",e,n,t),txt:n=>ze("text",e,n,t),caret:n=>ze("caret",e,n,t)}}class Re{constructor(e,t){this.defaults=("function"==typeof e?e(t):e)||t,this.classes=this.defaults}flush(){return this.classes=this.defaults,this}extend(...e){return this}get(){return this.classes}replace(e,t=!0){return t&&e&&(this.classes=Object.keys(e).reduce(((t,n)=>t.replace(new RegExp(n,"g"),e[n])),this.classes)),this}remove(e,t=!0){return t&&e&&(this.classes=e.split(" ").reduce(((e,t)=>e.replace(new RegExp(t,"g"),"")),this.classes)),this}add(e,t=!0,n){if(!t||!e)return this;switch(typeof e){case"string":default:return this.classes+=` ${e} `,this;case"function":return this.classes+=` ${e(n||this.classes)} `,this}}}const Be=["class","add","remove","replace","value"];function Pe(e="primary",t=!1){return function(n){const r=function(e,t){return function(n){const r=n.currentTarget,s=document.createElement("span"),o=Math.max(r.clientWidth,r.clientHeight),l=()=>{s.remove(),s.removeEventListener("animationend",l)};s.addEventListener("animationend",l),s.style.width=s.style.height=`${o}px`;const i=r.getBoundingClientRect();t?s.classList.add("absolute","top-0","left-0","ripple-centered",`bg-${e}-transDark`):(s.style.left=n.clientX-i.left-o/2+"px",s.style.top=n.clientY-i.top-o/2+"px",s.classList.add("ripple-normal",`bg-${e}-trans`)),s.classList.add("ripple"),r.appendChild(s)}}(e,t);return n.addEventListener("mousedown",r),{onDestroy:()=>n.removeEventListener("mousedown",r)}}}function Oe(e){let t,r,s,l,i,c=e[3]&&Se(e);const a=e[34].default,u=d(a,e,e[43],null);let f=[{class:e[1]},e[9],{type:e[6]},{disabled:e[2]}],$={};for(let e=0;e<f.length;e+=1)$=n($,f[e]);return{c(){t=R("button"),c&&c.c(),r=O(),u&&u.c(),I(t,$)},m(n,o){z(n,t,o),c&&c.m(t,null),L(t,r),u&&u.m(t,null),t.autofocus&&t.focus(),s=!0,l||(i=[b(e[8].call(null,t)),S(t,"click",e[42]),S(t,"click",e[38]),S(t,"mouseover",e[39]),S(t,"focus",e[40])],l=!0)},p(e,n){e[3]?c?(c.p(e,n),8&n[0]&&ge(c,1)):(c=Se(e),c.c(),ge(c,1),c.m(t,r)):c&&(pe(),he(c,1,1,(()=>{c=null})),me()),u&&u.p&&(!s||4096&n[1])&&m(u,a,e,e[43],s?p(a,e[43],n,null):g(e[43]),null),I(t,$=ve(f,[(!s||2&n[0])&&{class:e[1]},e[9],(!s||64&n[0])&&{type:e[6]},(!s||4&n[0])&&{disabled:e[2]}]))},i(e){s||(ge(c),ge(u,e),s=!0)},o(e){he(c),he(u,e),s=!1},d(e){e&&j(t),c&&c.d(),u&&u.d(e),l=!1,o(i)}}}function Fe(e){let t,r,s,l,i,c,a=e[3]&&Ie(e);const u=e[34].default,f=d(u,e,e[43],null);let $=[{class:e[1]},e[9],{type:e[6]},{disabled:e[2]}],h={};for(let e=0;e<$.length;e+=1)h=n(h,$[e]);let y=[{href:e[5]},e[9]],v={};for(let e=0;e<y.length;e+=1)v=n(v,y[e]);return{c(){t=R("a"),r=R("button"),a&&a.c(),s=O(),f&&f.c(),I(r,h),I(t,v)},m(n,o){z(n,t,o),L(t,r),a&&a.m(r,null),L(r,s),f&&f.m(r,null),r.autofocus&&r.focus(),l=!0,i||(c=[b(e[8].call(null,r)),S(r,"click",e[41]),S(r,"click",e[35]),S(r,"mouseover",e[36]),S(r,"focus",e[37])],i=!0)},p(e,n){e[3]?a?(a.p(e,n),8&n[0]&&ge(a,1)):(a=Ie(e),a.c(),ge(a,1),a.m(r,s)):a&&(pe(),he(a,1,1,(()=>{a=null})),me()),f&&f.p&&(!l||4096&n[1])&&m(f,u,e,e[43],l?p(u,e[43],n,null):g(e[43]),null),I(r,h=ve($,[(!l||2&n[0])&&{class:e[1]},e[9],(!l||64&n[0])&&{type:e[6]},(!l||4&n[0])&&{disabled:e[2]}])),I(t,v=ve(y,[(!l||32&n[0])&&{href:e[5]},e[9]]))},i(e){l||(ge(a),ge(f,e),l=!0)},o(e){he(a),he(f,e),l=!1},d(e){e&&j(t),a&&a.d(),f&&f.d(e),i=!1,o(c)}}}function Se(e){let t,n;return t=new Ae({props:{class:e[7],small:e[4],$$slots:{default:[qe]},$$scope:{ctx:e}}}),{c(){be(t.$$.fragment)},m(e,r){xe(t,e,r),n=!0},p(e,n){const r={};128&n[0]&&(r.class=e[7]),16&n[0]&&(r.small=e[4]),8&n[0]|4096&n[1]&&(r.$$scope={dirty:n,ctx:e}),t.$set(r)},i(e){n||(ge(t.$$.fragment,e),n=!0)},o(e){he(t.$$.fragment,e),n=!1},d(e){we(t,e)}}}function qe(e){let t;return{c(){t=P(e[3])},m(e,n){z(e,t,n)},p(e,n){8&n[0]&&M(t,e[3])},d(e){e&&j(t)}}}function Ie(e){let t,n;return t=new Ae({props:{class:e[7],small:e[4],$$slots:{default:[Me]},$$scope:{ctx:e}}}),{c(){be(t.$$.fragment)},m(e,r){xe(t,e,r),n=!0},p(e,n){const r={};128&n[0]&&(r.class=e[7]),16&n[0]&&(r.small=e[4]),8&n[0]|4096&n[1]&&(r.$$scope={dirty:n,ctx:e}),t.$set(r)},i(e){n||(ge(t.$$.fragment,e),n=!0)},o(e){he(t.$$.fragment,e),n=!1},d(e){we(t,e)}}}function Me(e){let t;return{c(){t=P(e[3])},m(e,n){z(e,t,n)},p(e,n){8&n[0]&&M(t,e[3])},d(e){e&&j(t)}}}function Ne(e){let t,n,r,s;const o=[Fe,Oe],l=[];function i(e,t){return e[5]?0:1}return t=i(e),n=l[t]=o[t](e),{c(){n.c(),r=F()},m(e,n){l[t].m(e,n),z(e,r,n),s=!0},p(e,s){let c=t;t=i(e),t===c?l[t].p(e,s):(pe(),he(l[c],1,1,(()=>{l[c]=null})),me(),n=l[t],n?n.p(e,s):(n=l[t]=o[t](e),n.c()),ge(n,1),n.m(r.parentNode,r))},i(e){s||(ge(n),s=!0)},o(e){he(n),s=!1},d(e){l[t].d(e),e&&j(r)}}}const Te="z-10 py-2 px-4 uppercase text-sm font-medium relative overflow-hidden",Ge="text-white duration-200 ease-in",Ue="bg-transparent border border-solid",He="bg-transparent border-none px-4 hover:bg-transparent",Ze="p-4 flex items-center select-none",Ve="hover:bg-transparent",We="pt-1 pb-1 pl-2 pr-2 text-xs",Xe="bg-gray-300 text-gray-500 dark:bg-dark-400 pointer-events-none hover:bg-gray-300 cursor-default",Ye="hover:shadow shadow";function Je(e,t,r){let s,o,{$$slots:l={},$$scope:i}=t,{value:c=!1}=t,{outlined:a=!1}=t,{text:u=!1}=t,{block:f=!1}=t,{disabled:d=!1}=t,{icon:$=null}=t,{small:p=!1}=t,{light:m=!1}=t,{dark:g=!1}=t,{flat:y=!1}=t,{iconClass:v=""}=t,{color:b="primary"}=t,{href:x=null}=t,{fab:w=!1}=t,{type:C="button"}=t,{remove:k=""}=t,{add:_=""}=t,{replace:E={}}=t,{classes:L=Te}=t,{basicClasses:A=Ge}=t,{outlinedClasses:D=Ue}=t,{textClasses:z=He}=t,{iconClasses:j=Ze}=t,{fabClasses:R=Ve}=t,{smallClasses:B=We}=t,{disabledClasses:P=Xe}=t,{elevationClasses:O=Ye}=t;w=w||u&&$;const F=!a&&!u&&!w,S=(F||$)&&!d&&!y&&!u;let q=e=>e,I=0;const{bg:M,border:N,txt:T}=je(b),G=new Re(L,Te);let U;$&&(U=new Re(v));const H=Pe(u||w||a?b:"white"),Z=function(e,t){const n=[...e,...Be];return Object.keys(t).reduce(((e,r)=>r.includes("$$")||r.includes("Class")||n.includes(r)?e:{...e,[r]:t[r]}),{})}(["outlined","text","color","block","disabled","icon","small","light","dark","flat","add","remove","replace"],t);return e.$$set=e=>{r(51,t=n(n({},t),h(e))),"value"in e&&r(0,c=e.value),"outlined"in e&&r(11,a=e.outlined),"text"in e&&r(12,u=e.text),"block"in e&&r(13,f=e.block),"disabled"in e&&r(2,d=e.disabled),"icon"in e&&r(3,$=e.icon),"small"in e&&r(4,p=e.small),"light"in e&&r(14,m=e.light),"dark"in e&&r(15,g=e.dark),"flat"in e&&r(16,y=e.flat),"iconClass"in e&&r(17,v=e.iconClass),"color"in e&&r(18,b=e.color),"href"in e&&r(5,x=e.href),"fab"in e&&r(10,w=e.fab),"type"in e&&r(6,C=e.type),"remove"in e&&r(19,k=e.remove),"add"in e&&r(20,_=e.add),"replace"in e&&r(21,E=e.replace),"classes"in e&&r(1,L=e.classes),"basicClasses"in e&&r(22,A=e.basicClasses),"outlinedClasses"in e&&r(23,D=e.outlinedClasses),"textClasses"in e&&r(24,z=e.textClasses),"iconClasses"in e&&r(25,j=e.iconClasses),"fabClasses"in e&&r(26,R=e.fabClasses),"smallClasses"in e&&r(27,B=e.smallClasses),"disabledClasses"in e&&r(28,P=e.disabledClasses),"elevationClasses"in e&&r(29,O=e.elevationClasses),"$$scope"in e&&r(43,i=e.$$scope)},e.$$.update=()=>{1073790976&e.$$.dirty[0]&&(r(30,I=m?200:0),r(30,I=g?-400:I)),1073741824&e.$$.dirty[0]&&r(33,s=500-I),1073741824&e.$$.dirty[0]&&r(32,o=400-I),r(1,L=G.flush().add(A,F,Ge).add(`${M(s)} hover:${M(o)}`,F).add(O,S,Ye).add(D,a,Ue).add(`${N(o)} ${T(s)} hover:${M("trans")} dark-hover:${M("transDark")}`,a).add(`${T(o)}`,u).add(z,u,He).add(j,$,Ze).remove("py-2",$).remove(T(o),w).add(P,d,Xe).add(B,p,We).add("flex items-center justify-center h-8 w-8",p&&$).add("border-solid",a).add("rounded-full",$).add("w-full",f).add("rounded",F||a||u).add("button",!$).add(R,w,Ve).add(`hover:${M("transLight")}`,w).add(t.class).remove(k).replace(E).add(_).get()),132096&e.$$.dirty[0]|1&e.$$.dirty[1]&&U&&r(7,q=U.flush().add(T(),w&&!v).get())},t=h(t),[c,L,d,$,p,x,C,q,H,Z,w,a,u,f,m,g,y,v,b,k,_,E,A,D,z,j,R,B,P,O,I,U,o,s,l,function(t){J.call(this,e,t)},function(t){J.call(this,e,t)},function(t){J.call(this,e,t)},function(t){J.call(this,e,t)},function(t){J.call(this,e,t)},function(t){J.call(this,e,t)},()=>r(0,c=!c),()=>r(0,c=!c),i]}class Ke extends _e{constructor(e){super(),ke(this,e,Je,Ne,i,{value:0,outlined:11,text:12,block:13,disabled:2,icon:3,small:4,light:14,dark:15,flat:16,iconClass:17,color:18,href:5,fab:10,type:6,remove:19,add:20,replace:21,classes:1,basicClasses:22,outlinedClasses:23,textClasses:24,iconClasses:25,fabClasses:26,smallClasses:27,disabledClasses:28,elevationClasses:29},null,[-1,-1])}}function Qe(e){const t=e-1;return t*t*t+1}function et(e){return e*e}function tt(e){return-e*(e-2)}function nt(e,{delay:n=0,duration:r=400,easing:s=t}={}){const o=+getComputedStyle(e).opacity;return{delay:n,duration:r,easing:s,css:e=>"opacity: "+e*o}}function rt(e,{delay:t=0,duration:n=400,easing:r=Qe,start:s=0,opacity:o=0}={}){const l=getComputedStyle(e),i=+l.opacity,c="none"===l.transform?"":l.transform,a=1-s,u=i*(1-o);return{delay:t,duration:n,easing:r,css:(e,t)=>`\n\t\t\ttransform: ${c} scale(${1-a*t});\n\t\t\topacity: ${i-u*t}\n\t\t`}}function st(t){let n;return{c(){n=R("div"),q(n,"class","flex-grow")},m(e,t){z(e,n,t)},p:e,i:e,o:e,d(e){e&&j(n)}}}const ot=class extends _e{constructor(e){super(),ke(this,e,null,st,i,{})}},lt=[];function it(t,n=e){let r;const s=new Set;function o(e){if(i(t,e)&&(t=e,r)){const e=!lt.length;for(const e of s)e[1](),lt.push(e,t);if(e){for(let e=0;e<lt.length;e+=2)lt[e][0](lt[e+1]);lt.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(l,i=e){const c=[l,i];return s.add(c),1===s.size&&(r=n(o)||e),l(t),()=>{s.delete(c),0===s.size&&(r(),r=null)}}}}const ct=e=>({}),at=e=>({});function ut(n){let r,s,i,c,a,u,f,$,h,v;const b=n[20].default,x=d(b,n,n[24],null);let C=!n[5]&&ft(n);return{c(){r=R("div"),s=R("div"),i=R("div"),x&&x.c(),c=O(),C&&C.c(),q(s,"class",f=y(n[7])+" svelte-1sackdn"),q(r,"class","fixed w-full h-full top-0 left-0 z-30 pointer-events-none")},m(e,t){z(e,r,t),L(r,s),L(s,i),x&&x.m(i,null),L(i,c),C&&C.m(i,null),n[22](i),$=!0,h||(v=S(i,"click",n[23]),h=!0)},p(e,t){n=e,x&&x.p&&(!$||16777216&t)&&m(x,b,n,n[24],$?p(b,n[24],t,null):g(n[24]),null),n[5]?C&&(pe(),he(C,1,1,(()=>{C=null})),me()):C?(C.p(n,t),32&t&&ge(C,1)):(C=ft(n),C.c(),ge(C,1),C.m(i,null)),(!$||128&t&&f!==(f=y(n[7])+" svelte-1sackdn"))&&q(s,"class",f)},i(r){$||(ge(x,r),ge(C),se((()=>{u&&u.end(1),a=function(n,r,s){let o,i,c=r(n,s),a=!1,u=0;function f(){o&&W(n,o)}function d(){const{delay:r=0,duration:s=300,easing:l=t,tick:d=e,css:$}=c||ye;$&&(o=V(n,0,1,s,r,l,$,u++)),d(0,1);const p=w()+r,m=p+s;i&&i.abort(),a=!0,se((()=>fe(n,!0,"start"))),i=E((e=>{if(a){if(e>=m)return d(1,0),fe(n,!0,"end"),f(),a=!1;if(e>=p){const t=l((e-p)/s);d(t,1-t)}}return a}))}let $=!1;return{start(){$||($=!0,W(n),l(c)?(c=c(),ue().then(d)):d())},invalidate(){$=!1},end(){a&&(f(),a=!1)}}}(i,rt,n[3]),a.start()})),$=!0)},o(r){he(x,r),he(C),a&&a.invalidate(),u=function(n,r,s){let i,c=r(n,s),a=!0;const u=$e;function f(){const{delay:r=0,duration:s=300,easing:l=t,tick:f=e,css:d}=c||ye;d&&(i=V(n,1,0,s,r,l,d));const $=w()+r,p=$+s;se((()=>fe(n,!1,"start"))),E((e=>{if(a){if(e>=p)return f(0,1),fe(n,!1,"end"),--u.r||o(u.c),!1;if(e>=$){const t=l((e-$)/s);f(1-t,t)}}return a}))}return u.r+=1,l(c)?ue().then((()=>{c=c(),f()})):f(),{end(e){e&&c.tick&&c.tick(1,0),a&&(i&&W(n,i),a=!1)}}}(i,nt,n[4]),$=!1},d(e){e&&j(r),x&&x.d(e),C&&C.d(),n[22](null),e&&u&&u.end(),h=!1,v()}}}function ft(e){let t,n,r;t=new ot({});const s=e[20].action,o=d(s,e,e[24],at),l=o||function(e){let t,n,r=!e[2]&&dt(e);return{c(){r&&r.c(),t=F()},m(e,s){r&&r.m(e,s),z(e,t,s),n=!0},p(e,n){e[2]?r&&(pe(),he(r,1,1,(()=>{r=null})),me()):r?(r.p(e,n),4&n&&ge(r,1)):(r=dt(e),r.c(),ge(r,1),r.m(t.parentNode,t))},i(e){n||(ge(r),n=!0)},o(e){he(r),n=!1},d(e){r&&r.d(e),e&&j(t)}}}(e);return{c(){be(t.$$.fragment),n=O(),l&&l.c()},m(e,s){xe(t,e,s),z(e,n,s),l&&l.m(e,s),r=!0},p(e,t){o?o.p&&(!r||16777216&t)&&m(o,s,e,e[24],r?p(s,e[24],t,ct):g(e[24]),at):l&&l.p&&(!r||5&t)&&l.p(e,r?t:-1)},i(e){r||(ge(t.$$.fragment,e),ge(l,e),r=!0)},o(e){he(t.$$.fragment,e),he(l,e),r=!1},d(e){we(t,e),e&&j(n),l&&l.d(e)}}}function dt(e){let t,n;return t=new Ke({props:{text:!0,$$slots:{default:[$t]},$$scope:{ctx:e}}}),t.$on("click",e[21]),{c(){be(t.$$.fragment)},m(e,r){xe(t,e,r),n=!0},p(e,n){const r={};16777216&n&&(r.$$scope={dirty:n,ctx:e}),t.$set(r)},i(e){n||(ge(t.$$.fragment,e),n=!0)},o(e){he(t.$$.fragment,e),n=!1},d(e){we(t,e)}}}function $t(e){let t;return{c(){t=P("Close")},m(e,n){z(e,t,n)},d(e){e&&j(t)}}}function pt(e){let t,n,r=e[0]&&gt===e[1]&&ut(e);return{c(){r&&r.c(),t=F()},m(e,s){r&&r.m(e,s),z(e,t,s),n=!0},p(e,[n]){e[0]&&gt===e[1]?r?(r.p(e,n),3&n&&ge(r,1)):(r=ut(e),r.c(),ge(r,1),r.m(t.parentNode,t)):r&&(pe(),he(r,1,1,(()=>{r=null})),me())},i(e){n||(ge(r),n=!0)},o(e){he(r),n=!1},d(e){r&&r.d(e),e&&j(t)}}}const mt=it([]);let gt=!1;const ht="fixed w-full h-full flex items-center justify-center pointer-events-none";function yt(e,t,r){let s,o,l;f(e,mt,(e=>r(19,l=e)));let{$$slots:i={},$$scope:c}=t,{value:a=!1}=t,{timeout:u=2e3}=t,{inProps:d={duration:100,easing:et}}=t,{outProps:$={duration:100,easing:tt,delay:150}}=t,{color:p="gray"}=t,{text:m="white"}=t,{top:g=!1}=t,{bottom:y=!0}=t,{right:v=!1}=t,{left:b=!1}=t,{noAction:x=!0}=t,{hash:w=!1}=t;const C=Y();let{classes:k=ht}=t;const _=new Re(t.class,"pointer-events-auto flex absolute py-2 px-4 z-30 mb-4 content-between mx-auto\n      rounded items-center shadow-sm h-12"),E=new Re(k,ht);let L,A,D=e=>e,z=()=>{};D=E.flush().add(`text-${m}`).get();return e.$$set=e=>{r(30,t=n(n({},t),h(e))),"value"in e&&r(0,a=e.value),"timeout"in e&&r(2,u=e.timeout),"inProps"in e&&r(3,d=e.inProps),"outProps"in e&&r(4,$=e.outProps),"color"in e&&r(8,p=e.color),"text"in e&&r(9,m=e.text),"top"in e&&r(10,g=e.top),"bottom"in e&&r(11,y=e.bottom),"right"in e&&r(12,v=e.right),"left"in e&&r(13,b=e.left),"noAction"in e&&r(5,x=e.noAction),"hash"in e&&r(1,w=e.hash),"classes"in e&&r(14,k=e.classes),"$$scope"in e&&r(24,c=e.$$scope)},e.$$.update=()=>{if(256&e.$$.dirty){const e=je(p||"gray");r(16,z=e.bg)}3&e.$$.dirty&&(r(1,w=w||(a?btoa(`${a}${(new Date).valueOf()}`):null)),r(0,a),r(1,w)),3&e.$$.dirty&&r(18,s=()=>{return e=w,void(!1===a&&!1===gt||(r(1,w=gt=r(0,a=e)),u&&r(15,L=setTimeout((()=>{r(0,a=gt=r(1,w=!1)),C("finish"),l.length&&l.shift()()}),u))));var e}),262145&e.$$.dirty&&a&&mt.update((e=>[...e,s])),524289&e.$$.dirty&&!gt&&a&&l.length&&l.shift()(),32769&e.$$.dirty&&(a||clearTimeout(L)),81184&e.$$.dirty&&r(17,o=_.flush().add(z(800),p).add("right-0 mr-2",v).add("top-0 mt-2",g).add("left-0 ml-2",b).add("bottom-0",y).add("snackbar",!x).get()),131136&e.$$.dirty&&A&&r(6,A.classList=o,A)},t=h(t),[a,w,u,d,$,x,A,D,p,m,g,y,v,b,k,L,z,o,s,l,i,()=>r(0,a=!1),function(e){Q[e?"unshift":"push"]((()=>{A=e,r(6,A),r(17,o),r(16,z),r(8,p),r(12,v),r(10,g),r(13,b),r(11,y),r(5,x)}))},()=>r(0,a=!1),c]}class vt extends _e{constructor(e){super(),ke(this,e,yt,pt,i,{value:0,timeout:2,inProps:3,outProps:4,color:8,text:9,top:10,bottom:11,right:12,left:13,noAction:5,hash:1,classes:14})}}function bt(e,t){return n=>t.update((t=>[...t,{message:n,ts:new Date,color:e,toString:()=>n}]))}function xt(){const e=it([]);return{subscribe:e.subscribe,notify:bt("gray",e),error:bt("error",e),alert:bt("alert",e),remove:t=>e.update((e=>(e.splice(t,1),e)))}}function wt(e){let t;return{c(){t=P(e[4])},m(e,n){z(e,t,n)},p(e,n){16&n&&M(t,e[4])},d(e){e&&j(t)}}}function Ct(e){let t,r;const s=[{value:e[5]},{hash:e[5]},{top:!0},{color:e[0]},e[2]];let o={$$slots:{default:[wt]},$$scope:{ctx:e}};for(let e=0;e<s.length;e+=1)o=n(o,s[e]);return t=new vt({props:o}),t.$on("finish",e[6]),{c(){be(t.$$.fragment)},m(e,n){xe(t,e,n),r=!0},p(e,[n]){const r=37&n?ve(s,[32&n&&{value:e[5]},32&n&&{hash:e[5]},s[2],1&n&&{color:e[0]},4&n&&(o=e[2],"object"==typeof o&&null!==o?o:{})]):{};var o;144&n&&(r.$$scope={dirty:n,ctx:e}),t.$set(r)},i(e){r||(ge(t.$$.fragment,e),r=!0)},o(e){he(t.$$.fragment,e),r=!1},d(e){we(t,e)}}}xt();const kt=xt();function _t(t,n,r){let s,o=e,l=()=>(o(),o=u(d,(e=>r(3,s=e))),d);t.$$.on_destroy.push((()=>o()));let i,c,a,{color:f="alert"}=n,{queue:d=kt}=n;l();return t.$$set=e=>{"color"in e&&r(0,f=e.color),"queue"in e&&l(r(1,d=e.queue))},t.$$.update=()=>{12&t.$$.dirty&&(c||r(2,c=s[0]),"string"==typeof c?r(4,i=c):c&&(r(4,i=c.toString()),r(0,f=c.color),r(5,a=c.ts)))},[f,d,c,s,i,a,()=>{d.remove(s.indexOf(c)),r(2,c=!1)}]}class Et extends _e{constructor(e){super(),ke(this,e,_t,Ct,i,{color:0,queue:1})}}const Lt=it(!0);
/*! js-cookie v3.0.1 | MIT */function At(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}!function e(t,n){function r(e,r,s){if("undefined"!=typeof document){"number"==typeof(s=At({},n,s)).expires&&(s.expires=new Date(Date.now()+864e5*s.expires)),s.expires&&(s.expires=s.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var o="";for(var l in s)s[l]&&(o+="; "+l,!0!==s[l]&&(o+="="+s[l].split(";")[0]));return document.cookie=e+"="+t.write(r,e)+o}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],r={},s=0;s<n.length;s++){var o=n[s].split("="),l=o.slice(1).join("=");try{var i=decodeURIComponent(o[0]);if(r[i]=t.read(l,i),e===i)break}catch(e){}}return e?r[e]:r}},remove:function(e,t){r(e,"",At({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,At({},this.attributes,t))},withConverter:function(t){return e(At({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(n)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"});const Dt=it(null);var zt;function jt(e){let t;function n(e,t){return e[3]?Bt:Rt}let r=n(e),s=r(e);return{c(){t=R("div"),s.c(),q(t,"class","note-container svelte-11cpvv7")},m(e,n){z(e,t,n),s.m(t,null)},p(e,o){r!==(r=n(e))&&(s.d(1),s=r(e),s&&(s.c(),s.m(t,null)))},d(e){e&&j(t),s.d()}}}function Rt(e){let t,n;return{c(){t=R("img"),q(t,"class","note svelte-11cpvv7"),a(t.src,n="/resources/quarter_note.svg")||q(t,"src","/resources/quarter_note.svg")},m(e,n){z(e,t,n)},d(e){e&&j(t)}}}function Bt(e){let t,n;return{c(){t=R("img"),q(t,"class","note svelte-11cpvv7"),a(t.src,n="/resources/sharp_quarter_note.svg")||q(t,"src","/resources/sharp_quarter_note.svg")},m(e,n){z(e,t,n)},d(e){e&&j(t)}}}function Pt(t){let n,r=t[2]&&jt(t);return{c(){n=R("div"),r&&r.c(),q(n,"class","line svelte-11cpvv7"),T(n,"lined",t[0]),T(n,"partialLined",t[1]&&t[2])},m(e,t){z(e,n,t),r&&r.m(n,null)},p(e,[t]){e[2]?r?r.p(e,t):(r=jt(e),r.c(),r.m(n,null)):r&&(r.d(1),r=null),1&t&&T(n,"lined",e[0]),6&t&&T(n,"partialLined",e[1]&&e[2])},i:e,o:e,d(e){e&&j(n),r&&r.d()}}}function Ot(e,t,n){let r,s,o;f(e,Dt,(e=>n(5,o=e)));let{type:l}=t,{lined:i=!1}=t,{partialLined:c=!1}=t;return e.$$set=e=>{"type"in e&&n(4,l=e.type),"lined"in e&&n(0,i=e.lined),"partialLined"in e&&n(1,c=e.partialLined)},e.$$.update=()=>{48&e.$$.dirty&&n(2,r=(null==o?void 0:o.type)===l),36&e.$$.dirty&&n(3,s=r&&(null==o?void 0:o.sharp))},[i,c,r,s,l,o]}!function(e){e.A="a",e.B="b",e.C="c",e.D="d",e.E="e",e.F="f",e.G="g"}(zt||(zt={}));class Ft extends _e{constructor(e){super(),ke(this,e,Ot,Pt,i,{type:4,lined:0,partialLined:1})}}function St(t){let n,r,s,o,l,i,c,a,u,f,d,$,p,m,g,h,y,v,b,x,w,C,k,_,E,A,D,B,P,F,S,I,M,N,T,G,U,H,Z,V,W,X,Y,J,K,Q,ee,te,ne,re,se,oe,le,ie,ce,ae,ue,fe,de,$e,pe,me,ye,ve,Ce,ke,_e,Ee,Le;return i=new Ft({props:{type:zt.B}}),a=new Ft({props:{type:zt.A,partialLined:!0}}),f=new Ft({props:{type:zt.G}}),$=new Ft({props:{type:zt.F,lined:!0}}),m=new Ft({props:{type:zt.E}}),h=new Ft({props:{type:zt.D,lined:!0}}),v=new Ft({props:{type:zt.C}}),x=new Ft({props:{type:zt.B,lined:!0}}),C=new Ft({props:{type:zt.A}}),_=new Ft({props:{type:zt.G,lined:!0}}),A=new Ft({props:{type:zt.F}}),B=new Ft({props:{type:zt.E,lined:!0}}),F=new Ft({props:{type:zt.D}}),I=new Ft({props:{type:zt.C,partialLined:!0}}),N=new Ft({props:{type:zt.B}}),V=new Ft({props:{type:zt.D}}),X=new Ft({props:{type:zt.C,partialLined:!0}}),J=new Ft({props:{type:zt.B}}),Q=new Ft({props:{type:zt.A,lined:!0}}),te=new Ft({props:{type:zt.G}}),re=new Ft({props:{type:zt.F,lined:!0}}),oe=new Ft({props:{type:zt.E}}),ie=new Ft({props:{type:zt.D,lined:!0}}),ae=new Ft({props:{type:zt.C}}),fe=new Ft({props:{type:zt.B,lined:!0}}),$e=new Ft({props:{type:zt.A}}),me=new Ft({props:{type:zt.G,lined:!0}}),ve=new Ft({props:{type:zt.F}}),ke=new Ft({props:{type:zt.E,partialLined:!0}}),Ee=new Ft({props:{type:zt.D}}),{c(){n=R("div"),r=R("div"),s=R("div"),s.innerHTML='<img src="resources/treble_clef.svg" class="svelte-16ryz3r"/>',o=O(),l=R("div"),be(i.$$.fragment),c=O(),be(a.$$.fragment),u=O(),be(f.$$.fragment),d=O(),be($.$$.fragment),p=O(),be(m.$$.fragment),g=O(),be(h.$$.fragment),y=O(),be(v.$$.fragment),b=O(),be(x.$$.fragment),w=O(),be(C.$$.fragment),k=O(),be(_.$$.fragment),E=O(),be(A.$$.fragment),D=O(),be(B.$$.fragment),P=O(),be(F.$$.fragment),S=O(),be(I.$$.fragment),M=O(),be(N.$$.fragment),T=O(),G=R("div"),U=R("div"),U.innerHTML='<img src="resources/base_clef.svg" class="svelte-16ryz3r"/>',H=O(),Z=R("div"),be(V.$$.fragment),W=O(),be(X.$$.fragment),Y=O(),be(J.$$.fragment),K=O(),be(Q.$$.fragment),ee=O(),be(te.$$.fragment),ne=O(),be(re.$$.fragment),se=O(),be(oe.$$.fragment),le=O(),be(ie.$$.fragment),ce=O(),be(ae.$$.fragment),ue=O(),be(fe.$$.fragment),de=O(),be($e.$$.fragment),pe=O(),be(me.$$.fragment),ye=O(),be(ve.$$.fragment),Ce=O(),be(ke.$$.fragment),_e=O(),be(Ee.$$.fragment),q(s,"class","img-container svelte-16ryz3r"),q(l,"class","line-container svelte-16ryz3r"),q(r,"class","sheet-music-section svelte-16ryz3r"),q(U,"class","img-container svelte-16ryz3r"),q(Z,"class","line-container svelte-16ryz3r"),q(G,"class","sheet-music-section svelte-16ryz3r"),q(n,"class","sheet-music svelte-16ryz3r")},m(e,t){z(e,n,t),L(n,r),L(r,s),L(r,o),L(r,l),xe(i,l,null),L(l,c),xe(a,l,null),L(l,u),xe(f,l,null),L(l,d),xe($,l,null),L(l,p),xe(m,l,null),L(l,g),xe(h,l,null),L(l,y),xe(v,l,null),L(l,b),xe(x,l,null),L(l,w),xe(C,l,null),L(l,k),xe(_,l,null),L(l,E),xe(A,l,null),L(l,D),xe(B,l,null),L(l,P),xe(F,l,null),L(l,S),xe(I,l,null),L(l,M),xe(N,l,null),L(n,T),L(n,G),L(G,U),L(G,H),L(G,Z),xe(V,Z,null),L(Z,W),xe(X,Z,null),L(Z,Y),xe(J,Z,null),L(Z,K),xe(Q,Z,null),L(Z,ee),xe(te,Z,null),L(Z,ne),xe(re,Z,null),L(Z,se),xe(oe,Z,null),L(Z,le),xe(ie,Z,null),L(Z,ce),xe(ae,Z,null),L(Z,ue),xe(fe,Z,null),L(Z,de),xe($e,Z,null),L(Z,pe),xe(me,Z,null),L(Z,ye),xe(ve,Z,null),L(Z,Ce),xe(ke,Z,null),L(Z,_e),xe(Ee,Z,null),Le=!0},p:e,i(e){Le||(ge(i.$$.fragment,e),ge(a.$$.fragment,e),ge(f.$$.fragment,e),ge($.$$.fragment,e),ge(m.$$.fragment,e),ge(h.$$.fragment,e),ge(v.$$.fragment,e),ge(x.$$.fragment,e),ge(C.$$.fragment,e),ge(_.$$.fragment,e),ge(A.$$.fragment,e),ge(B.$$.fragment,e),ge(F.$$.fragment,e),ge(I.$$.fragment,e),ge(N.$$.fragment,e),ge(V.$$.fragment,e),ge(X.$$.fragment,e),ge(J.$$.fragment,e),ge(Q.$$.fragment,e),ge(te.$$.fragment,e),ge(re.$$.fragment,e),ge(oe.$$.fragment,e),ge(ie.$$.fragment,e),ge(ae.$$.fragment,e),ge(fe.$$.fragment,e),ge($e.$$.fragment,e),ge(me.$$.fragment,e),ge(ve.$$.fragment,e),ge(ke.$$.fragment,e),ge(Ee.$$.fragment,e),Le=!0)},o(e){he(i.$$.fragment,e),he(a.$$.fragment,e),he(f.$$.fragment,e),he($.$$.fragment,e),he(m.$$.fragment,e),he(h.$$.fragment,e),he(v.$$.fragment,e),he(x.$$.fragment,e),he(C.$$.fragment,e),he(_.$$.fragment,e),he(A.$$.fragment,e),he(B.$$.fragment,e),he(F.$$.fragment,e),he(I.$$.fragment,e),he(N.$$.fragment,e),he(V.$$.fragment,e),he(X.$$.fragment,e),he(J.$$.fragment,e),he(Q.$$.fragment,e),he(te.$$.fragment,e),he(re.$$.fragment,e),he(oe.$$.fragment,e),he(ie.$$.fragment,e),he(ae.$$.fragment,e),he(fe.$$.fragment,e),he($e.$$.fragment,e),he(me.$$.fragment,e),he(ve.$$.fragment,e),he(ke.$$.fragment,e),he(Ee.$$.fragment,e),Le=!1},d(e){e&&j(n),we(i),we(a),we(f),we($),we(m),we(h),we(v),we(x),we(C),we(_),we(A),we(B),we(F),we(I),we(N),we(V),we(X),we(J),we(Q),we(te),we(re),we(oe),we(ie),we(ae),we(fe),we($e),we(me),we(ve),we(ke),we(Ee)}}}class qt extends _e{constructor(e){super(),ke(this,e,null,St,i,{})}}class It{constructor(e){this.defaults=e,this.classes=this.defaultClasses=e.split(" ")}reset(){return this.classes=[...this.defaultClasses],this}add(e){return this.add_internal(e),this}addIf(e,t){return e&&this.add_internal(t),this}addIfElse(e,t,n){return e?this.add_internal(t):this.add_internal(n),this}get(){return this.classes.join(" ")}add_internal(e){e&&this.classes.push(...e.split(" "))}}function Mt(t){let n,r,s,o;return{c(){n=R("div"),q(n,"class",r=y(t[0])+" svelte-1kmpbpm")},m(e,r){z(e,n,r),s||(o=S(n,"mousedown",t[5]),s=!0)},p(e,[t]){1&t&&r!==(r=y(e[0])+" svelte-1kmpbpm")&&q(n,"class",r)},i:e,o:e,d(e){e&&j(n),s=!1,o()}}}function Nt(e,t,n){let r,s,o;f(e,Dt,(e=>n(4,o=e)));let{key:l}=t;function i(){v(Dt,o=o===l?null:l,o)}let c=new It("key");return e.$$set=e=>{"key"in e&&n(2,l=e.key)},e.$$.update=()=>{20&e.$$.dirty&&n(3,r=o===l),12&e.$$.dirty&&n(0,s=c.reset().addIfElse(l.sharp,"key-black","key-white").addIf(r,"pressed").get())},[s,i,l,r,o,()=>i()]}class Tt extends _e{constructor(e){super(),ke(this,e,Nt,Mt,i,{key:2})}}function Gt({type:e,octave:t,sharp:n}){return{type:e,octave:t,sharp:n,name:`${e.toString().toLocaleUpperCase()}${t}${n?"#":""}`,audio:(r=`${e}${t}${n?"_sharp":""} `,new Audio(`resources/${r}.mp3`))};var r}const Ut=[Gt({type:zt.C,octave:4}),Gt({type:zt.C,octave:4,sharp:!0}),Gt({type:zt.D,octave:4}),Gt({type:zt.D,octave:4,sharp:!0}),Gt({type:zt.E,octave:4}),Gt({type:zt.F,octave:4}),Gt({type:zt.F,octave:4,sharp:!0}),Gt({type:zt.G,octave:4}),Gt({type:zt.G,octave:4,sharp:!0}),Gt({type:zt.A,octave:5}),Gt({type:zt.A,octave:5,sharp:!0}),Gt({type:zt.B,octave:5})],Ht=Ut.filter((e=>!e.sharp)).length;function Zt(e,t,n){const r=e.slice();return r[0]=t[n],r}function Vt(t){let n,r;return n=new Tt({props:{key:t[0]}}),{c(){be(n.$$.fragment)},m(e,t){xe(n,e,t),r=!0},p:e,i(e){r||(ge(n.$$.fragment,e),r=!0)},o(e){he(n.$$.fragment,e),r=!1},d(e){we(n,e)}}}function Wt(e){let t,n,r=Ut,s=[];for(let t=0;t<r.length;t+=1)s[t]=Vt(Zt(e,r,t));const o=e=>he(s[e],1,1,(()=>{s[e]=null}));return{c(){t=R("div");for(let e=0;e<s.length;e+=1)s[e].c();q(t,"class","piano svelte-wmp73b")},m(e,r){z(e,t,r);for(let e=0;e<s.length;e+=1)s[e].m(t,null);n=!0},p(e,[n]){if(0&n){let l;for(r=Ut,l=0;l<r.length;l+=1){const o=Zt(e,r,l);s[l]?(s[l].p(o,n),ge(s[l],1)):(s[l]=Vt(o),s[l].c(),ge(s[l],1),s[l].m(t,null))}for(pe(),l=r.length;l<s.length;l+=1)o(l);me()}},i(e){if(!n){for(let e=0;e<r.length;e+=1)ge(s[e]);n=!0}},o(e){s=s.filter(Boolean);for(let e=0;e<s.length;e+=1)he(s[e]);n=!1},d(e){e&&j(t),function(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}(s,e)}}}document.documentElement.style.setProperty("--num-white-keys",`${Ht} `);class Xt extends _e{constructor(e){super(),ke(this,e,null,Wt,i,{})}}const Yt=it(!1);function Jt(e){let t,n;return{c(){t=R("img"),a(t.src,n="resources/unmuted.svg")||q(t,"src","resources/unmuted.svg"),q(t,"class","svelte-15c6usv")},m(e,n){z(e,t,n)},d(e){e&&j(t)}}}function Kt(e){let t,n;return{c(){t=R("img"),a(t.src,n="resources/muted.svg")||q(t,"src","resources/muted.svg"),q(t,"class","svelte-15c6usv")},m(e,n){z(e,t,n)},d(e){e&&j(t)}}}function Qt(t){let n,r,s,o,l,i,c=(t[0]?.name||"none")+"";function a(e,t){return e[1]?Kt:Jt}let u=a(t),f=u(t);return{c(){n=R("div"),r=P(c),s=O(),o=R("button"),f.c(),q(n,"class","header-text flex-grow text-center svelte-15c6usv"),q(o,"class","flex")},m(e,c){z(e,n,c),L(n,r),z(e,s,c),z(e,o,c),f.m(o,null),l||(i=S(o,"click",t[2]),l=!0)},p(e,[t]){1&t&&c!==(c=(e[0]?.name||"none")+"")&&M(r,c),u!==(u=a(e))&&(f.d(1),f=u(e),f&&(f.c(),f.m(o,null)))},i:e,o:e,d(e){e&&j(n),e&&j(s),e&&j(o),f.d(),l=!1,i()}}}function en(e,t,n){let r,s;f(e,Dt,(e=>n(0,r=e))),f(e,Yt,(e=>n(1,s=e)));return[r,s,()=>v(Yt,s=!s,s)]}class tn extends _e{constructor(e){super(),ke(this,e,en,Qt,i,{})}}function nn(e,t,n){let r;return f(e,Yt,(e=>n(0,r=e))),Dt.subscribe((e=>{e&&!r&&e.audio.play()})),[]}class rn extends _e{constructor(e){super(),ke(this,e,nn,null,i,{})}}function sn(t){let n,r,s,o,l,i;return{c(){n=R("a"),r=B("svg"),s=B("path"),o=B("path"),l=B("path"),q(s,"class","background"),q(s,"d","M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"),q(o,"d","M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"),q(o,"fill","currentColor"),N(o,"transform-origin","130px 106px"),q(o,"class","octo-arm svelte-1fmpe6o"),q(l,"d","M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"),q(l,"fill","currentColor"),q(l,"class","octo-body"),q(r,"width","80"),q(r,"height","80"),q(r,"viewBox","0 0 250 250"),q(r,"aria-hidden","true"),N(r,"fill",t[1]),q(r,"class",i=y(t[2])+" svelte-1fmpe6o"),q(n,"href",t[0]),q(n,"target","#"),q(n,"class","github-corner svelte-1fmpe6o"),q(n,"aria-label","View source on GitHub")},m(e,t){z(e,n,t),L(n,r),L(r,s),L(r,o),L(r,l)},p(e,[t]){2&t&&N(r,"fill",e[1]),4&t&&i!==(i=y(e[2])+" svelte-1fmpe6o")&&q(r,"class",i),1&t&&q(n,"href",e[0])},i:e,o:e,d(e){e&&j(n)}}}function on(e,t,n){let r,{href:s}=t,{position:o="topRight"}=t,{fill:l="#ff2768"}=t,{small:i=!1}=t;return e.$$set=e=>{"href"in e&&n(0,s=e.href),"position"in e&&n(3,o=e.position),"fill"in e&&n(1,l=e.fill),"small"in e&&n(4,i=e.small)},e.$$.update=()=>{24&e.$$.dirty&&n(2,r=`${o}${i?" small":""}`)},[s,l,r,o,i]}class ln extends _e{constructor(e){super(),ke(this,e,on,sn,i,{href:0,position:3,fill:1,small:4})}}function cn(e){let t,n;return t=new qt({}),{c(){be(t.$$.fragment)},m(e,r){xe(t,e,r),n=!0},i(e){n||(ge(t.$$.fragment,e),n=!0)},o(e){he(t.$$.fragment,e),n=!1},d(e){we(t,e)}}}function an(e){let t,n,r,s,o,l,i,c,a,u,f,d,$;n=new tn({}),s=new ln({props:{href:"https://github.com/loremdipso/piantoes",position:"topLeft",small:!0}}),l=new rn({}),c=new Et({});let p=e[0]&&cn();return d=new Xt({}),{c(){t=R("header"),be(n.$$.fragment),r=O(),be(s.$$.fragment),o=O(),be(l.$$.fragment),i=O(),be(c.$$.fragment),a=O(),u=R("main"),p&&p.c(),f=O(),be(d.$$.fragment),q(t,"class","py-1 relative slide-in-from-top bg-primary-300 dark:bg-black flex h-16 space-between items-center left-0 p-0 shadow top-0 w-full z-20 svelte-1dafn4y"),q(u,"class","fade-in svelte-1dafn4y")},m(e,m){z(e,t,m),xe(n,t,null),L(t,r),xe(s,t,null),z(e,o,m),xe(l,e,m),z(e,i,m),xe(c,e,m),z(e,a,m),z(e,u,m),p&&p.m(u,null),L(u,f),xe(d,u,null),$=!0},p(e,[t]){e[0]?p?1&t&&ge(p,1):(p=cn(),p.c(),ge(p,1),p.m(u,f)):p&&(pe(),he(p,1,1,(()=>{p=null})),me())},i(e){$||(ge(n.$$.fragment,e),ge(s.$$.fragment,e),ge(l.$$.fragment,e),ge(c.$$.fragment,e),ge(p),ge(d.$$.fragment,e),$=!0)},o(e){he(n.$$.fragment,e),he(s.$$.fragment,e),he(l.$$.fragment,e),he(c.$$.fragment,e),he(p),he(d.$$.fragment,e),$=!1},d(e){e&&j(t),we(n),we(s),e&&j(o),we(l,e),e&&j(i),we(c,e),e&&j(a),e&&j(u),p&&p.d(),we(d)}}}function un(e,t,n){let r;return f(e,Lt,(e=>n(0,r=e))),[r]}const fn=new class extends _e{constructor(e){super(),ke(this,e,un,an,i,{})}}({target:document.body});export{fn as default};