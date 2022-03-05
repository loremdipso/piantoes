var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function l(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let o,a;function i(e,t){return o||(o=document.createElement("a")),o.href=t,e===o.href}function c(t,n,r){t.$$.on_destroy.push(function(t,...n){if(null==t)return e;const r=t.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}(n,r))}function u(e){return null==e?"":e}function f(e,t,n){return e.set(n),t}function $(e,t){e.appendChild(t)}function p(e,t,n){e.insertBefore(t,n||null)}function d(e){e.parentNode.removeChild(e)}function m(e){return document.createElement(e)}function g(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function h(e){return document.createTextNode(e)}function y(){return h(" ")}function v(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function w(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function b(e,t,n,r){null===n?e.style.removeProperty(t):e.style.setProperty(t,n,r?"important":"")}function x(e,t,n){e.classList[n?"add":"remove"](t)}function C(e){a=e}function _(e){(function(){if(!a)throw new Error("Function called outside component initialization");return a})().$$.on_mount.push(e)}const k=[],L=[],E=[],z=[],A=Promise.resolve();let B=!1;function D(e){E.push(e)}const j=new Set;let F=0;function G(){const e=a;do{for(;F<k.length;){const e=k[F];F++,C(e),M(e.$$)}for(C(null),k.length=0,F=0;L.length;)L.pop()();for(let e=0;e<E.length;e+=1){const t=E[e];j.has(t)||(j.add(t),t())}E.length=0}while(k.length);for(;z.length;)z.pop()();B=!1,j.clear(),C(e)}function M(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(D)}}const P=new Set;let S;function q(){S={r:0,c:[],p:S}}function N(){S.r||r(S.c),S=S.p}function I(e,t){e&&e.i&&(P.delete(e),e.i(t))}function T(e,t,n,r){if(e&&e.o){if(P.has(e))return;P.add(e),S.c.push((()=>{P.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}}function H(e){e&&e.c()}function O(e,n,s,o){const{fragment:a,on_mount:i,on_destroy:c,after_update:u}=e.$$;a&&a.m(n,s),o||D((()=>{const n=i.map(t).filter(l);c?c.push(...n):r(n),e.$$.on_mount=[]})),u.forEach(D)}function W(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Z(e,t){-1===e.$$.dirty[0]&&(k.push(e),B||(B=!0,A.then(G)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function R(t,l,s,o,i,c,u,f=[-1]){const $=a;C(t);const p=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||($?$.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:l.target||$.$$.root};u&&u(p.root);let m=!1;if(p.ctx=s?s(t,l.props||{},((e,n,...r)=>{const l=r.length?r[0]:n;return p.ctx&&i(p.ctx[e],p.ctx[e]=l)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](l),m&&Z(t,e)),n})):[],p.update(),m=!0,r(p.before_update),p.fragment=!!o&&o(p.ctx),l.target){if(l.hydrate){const e=function(e){return Array.from(e.childNodes)}(l.target);p.fragment&&p.fragment.l(e),e.forEach(d)}else p.fragment&&p.fragment.c();l.intro&&I(t.$$.fragment),O(t,l.target,l.anchor,l.customElement),G()}C($)}class U{$destroy(){W(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const V=[];function X(t,n=e){let r;const l=new Set;function o(e){if(s(t,e)&&(t=e,r)){const e=!V.length;for(const e of l)e[1](),V.push(e,t);if(e){for(let e=0;e<V.length;e+=2)V[e][0](V[e+1]);V.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(s,a=e){const i=[s,a];return l.add(i),1===l.size&&(r=n(o)||e),s(t),()=>{l.delete(i),0===l.size&&(r(),r=null)}}}}const J=X(!0),K=X(null);var Q;function Y(e){let t;function n(e,t){return e[3]?te:ee}let r=n(e),l=r(e);return{c(){t=m("div"),l.c(),w(t,"class","note-container svelte-11cpvv7")},m(e,n){p(e,t,n),l.m(t,null)},p(e,s){r!==(r=n(e))&&(l.d(1),l=r(e),l&&(l.c(),l.m(t,null)))},d(e){e&&d(t),l.d()}}}function ee(e){let t,n;return{c(){t=m("img"),w(t,"class","note svelte-11cpvv7"),i(t.src,n="resources/quarter_note.svg")||w(t,"src","resources/quarter_note.svg")},m(e,n){p(e,t,n)},d(e){e&&d(t)}}}function te(e){let t,n;return{c(){t=m("img"),w(t,"class","note svelte-11cpvv7"),i(t.src,n="resources/sharp_quarter_note.svg")||w(t,"src","resources/sharp_quarter_note.svg")},m(e,n){p(e,t,n)},d(e){e&&d(t)}}}function ne(t){let n,r=t[2]&&Y(t);return{c(){n=m("div"),r&&r.c(),w(n,"class","line svelte-11cpvv7"),x(n,"lined",t[0]),x(n,"partialLined",t[1]&&t[2])},m(e,t){p(e,n,t),r&&r.m(n,null)},p(e,[t]){e[2]?r?r.p(e,t):(r=Y(e),r.c(),r.m(n,null)):r&&(r.d(1),r=null),1&t&&x(n,"lined",e[0]),6&t&&x(n,"partialLined",e[1]&&e[2])},i:e,o:e,d(e){e&&d(n),r&&r.d()}}}function re(e,t,n){let r,l,s;c(e,K,(e=>n(5,s=e)));let{type:o}=t,{lined:a=!1}=t,{partialLined:i=!1}=t;return e.$$set=e=>{"type"in e&&n(4,o=e.type),"lined"in e&&n(0,a=e.lined),"partialLined"in e&&n(1,i=e.partialLined)},e.$$.update=()=>{48&e.$$.dirty&&n(2,r=(null==s?void 0:s.type)===o),36&e.$$.dirty&&n(3,l=r&&(null==s?void 0:s.sharp))},[a,i,r,l,o,s]}!function(e){e.A="a",e.B="b",e.C="c",e.D="d",e.E="e",e.F="f",e.G="g"}(Q||(Q={}));class le extends U{constructor(e){super(),R(this,e,re,ne,s,{type:4,lined:0,partialLined:1})}}function se(t){let n,r,l,s,o,a,i,c,u,f,g,h,v,b,x,C,_,k,L,E,z,A,B,D,j,F,G,M,P,S,q,N,Z,R,U,V,X,J,K,Y,ee,te,ne,re,se,oe,ae,ie,ce,ue,fe,$e,pe,de,me,ge,he,ye,ve,we,be,xe,Ce,_e,ke,Le,Ee,ze,Ae;return a=new le({props:{type:Q.B}}),c=new le({props:{type:Q.A,partialLined:!0}}),f=new le({props:{type:Q.G}}),h=new le({props:{type:Q.F,lined:!0}}),b=new le({props:{type:Q.E}}),C=new le({props:{type:Q.D,lined:!0}}),k=new le({props:{type:Q.C}}),E=new le({props:{type:Q.B,lined:!0}}),A=new le({props:{type:Q.A}}),D=new le({props:{type:Q.G,lined:!0}}),F=new le({props:{type:Q.F}}),M=new le({props:{type:Q.E,lined:!0}}),S=new le({props:{type:Q.D}}),N=new le({props:{type:Q.C,partialLined:!0}}),R=new le({props:{type:Q.B}}),Y=new le({props:{type:Q.D}}),te=new le({props:{type:Q.C,partialLined:!0}}),re=new le({props:{type:Q.B}}),oe=new le({props:{type:Q.A,lined:!0}}),ie=new le({props:{type:Q.G}}),ue=new le({props:{type:Q.F,lined:!0}}),$e=new le({props:{type:Q.E}}),de=new le({props:{type:Q.D,lined:!0}}),ge=new le({props:{type:Q.C}}),ye=new le({props:{type:Q.B,lined:!0}}),we=new le({props:{type:Q.A}}),xe=new le({props:{type:Q.G,lined:!0}}),_e=new le({props:{type:Q.F}}),Le=new le({props:{type:Q.E,partialLined:!0}}),ze=new le({props:{type:Q.D}}),{c(){n=m("div"),r=m("div"),l=m("div"),l.innerHTML='<img src="resources/treble_clef.svg" class="svelte-16ryz3r"/>',s=y(),o=m("div"),H(a.$$.fragment),i=y(),H(c.$$.fragment),u=y(),H(f.$$.fragment),g=y(),H(h.$$.fragment),v=y(),H(b.$$.fragment),x=y(),H(C.$$.fragment),_=y(),H(k.$$.fragment),L=y(),H(E.$$.fragment),z=y(),H(A.$$.fragment),B=y(),H(D.$$.fragment),j=y(),H(F.$$.fragment),G=y(),H(M.$$.fragment),P=y(),H(S.$$.fragment),q=y(),H(N.$$.fragment),Z=y(),H(R.$$.fragment),U=y(),V=m("div"),X=m("div"),X.innerHTML='<img src="resources/base_clef.svg" class="svelte-16ryz3r"/>',J=y(),K=m("div"),H(Y.$$.fragment),ee=y(),H(te.$$.fragment),ne=y(),H(re.$$.fragment),se=y(),H(oe.$$.fragment),ae=y(),H(ie.$$.fragment),ce=y(),H(ue.$$.fragment),fe=y(),H($e.$$.fragment),pe=y(),H(de.$$.fragment),me=y(),H(ge.$$.fragment),he=y(),H(ye.$$.fragment),ve=y(),H(we.$$.fragment),be=y(),H(xe.$$.fragment),Ce=y(),H(_e.$$.fragment),ke=y(),H(Le.$$.fragment),Ee=y(),H(ze.$$.fragment),w(l,"class","img-container svelte-16ryz3r"),w(o,"class","line-container svelte-16ryz3r"),w(r,"class","sheet-music-section svelte-16ryz3r"),w(X,"class","img-container svelte-16ryz3r"),w(K,"class","line-container svelte-16ryz3r"),w(V,"class","sheet-music-section svelte-16ryz3r"),w(n,"class","sheet-music svelte-16ryz3r")},m(e,t){p(e,n,t),$(n,r),$(r,l),$(r,s),$(r,o),O(a,o,null),$(o,i),O(c,o,null),$(o,u),O(f,o,null),$(o,g),O(h,o,null),$(o,v),O(b,o,null),$(o,x),O(C,o,null),$(o,_),O(k,o,null),$(o,L),O(E,o,null),$(o,z),O(A,o,null),$(o,B),O(D,o,null),$(o,j),O(F,o,null),$(o,G),O(M,o,null),$(o,P),O(S,o,null),$(o,q),O(N,o,null),$(o,Z),O(R,o,null),$(n,U),$(n,V),$(V,X),$(V,J),$(V,K),O(Y,K,null),$(K,ee),O(te,K,null),$(K,ne),O(re,K,null),$(K,se),O(oe,K,null),$(K,ae),O(ie,K,null),$(K,ce),O(ue,K,null),$(K,fe),O($e,K,null),$(K,pe),O(de,K,null),$(K,me),O(ge,K,null),$(K,he),O(ye,K,null),$(K,ve),O(we,K,null),$(K,be),O(xe,K,null),$(K,Ce),O(_e,K,null),$(K,ke),O(Le,K,null),$(K,Ee),O(ze,K,null),Ae=!0},p:e,i(e){Ae||(I(a.$$.fragment,e),I(c.$$.fragment,e),I(f.$$.fragment,e),I(h.$$.fragment,e),I(b.$$.fragment,e),I(C.$$.fragment,e),I(k.$$.fragment,e),I(E.$$.fragment,e),I(A.$$.fragment,e),I(D.$$.fragment,e),I(F.$$.fragment,e),I(M.$$.fragment,e),I(S.$$.fragment,e),I(N.$$.fragment,e),I(R.$$.fragment,e),I(Y.$$.fragment,e),I(te.$$.fragment,e),I(re.$$.fragment,e),I(oe.$$.fragment,e),I(ie.$$.fragment,e),I(ue.$$.fragment,e),I($e.$$.fragment,e),I(de.$$.fragment,e),I(ge.$$.fragment,e),I(ye.$$.fragment,e),I(we.$$.fragment,e),I(xe.$$.fragment,e),I(_e.$$.fragment,e),I(Le.$$.fragment,e),I(ze.$$.fragment,e),Ae=!0)},o(e){T(a.$$.fragment,e),T(c.$$.fragment,e),T(f.$$.fragment,e),T(h.$$.fragment,e),T(b.$$.fragment,e),T(C.$$.fragment,e),T(k.$$.fragment,e),T(E.$$.fragment,e),T(A.$$.fragment,e),T(D.$$.fragment,e),T(F.$$.fragment,e),T(M.$$.fragment,e),T(S.$$.fragment,e),T(N.$$.fragment,e),T(R.$$.fragment,e),T(Y.$$.fragment,e),T(te.$$.fragment,e),T(re.$$.fragment,e),T(oe.$$.fragment,e),T(ie.$$.fragment,e),T(ue.$$.fragment,e),T($e.$$.fragment,e),T(de.$$.fragment,e),T(ge.$$.fragment,e),T(ye.$$.fragment,e),T(we.$$.fragment,e),T(xe.$$.fragment,e),T(_e.$$.fragment,e),T(Le.$$.fragment,e),T(ze.$$.fragment,e),Ae=!1},d(e){e&&d(n),W(a),W(c),W(f),W(h),W(b),W(C),W(k),W(E),W(A),W(D),W(F),W(M),W(S),W(N),W(R),W(Y),W(te),W(re),W(oe),W(ie),W(ue),W($e),W(de),W(ge),W(ye),W(we),W(xe),W(_e),W(Le),W(ze)}}}class oe extends U{constructor(e){super(),R(this,e,null,se,s,{})}}class ae{constructor(e){this.defaults=e,this.classes=this.defaultClasses=e.split(" ")}reset(){return this.classes=[...this.defaultClasses],this}add(e){return this.add_internal(e),this}addIf(e,t){return e&&this.add_internal(t),this}addIfElse(e,t,n){return e?this.add_internal(t):this.add_internal(n),this}get(){return this.classes.join(" ")}add_internal(e){e&&this.classes.push(...e.split(" "))}}function ie(t){let n,r,l,s;return{c(){n=m("div"),w(n,"class",r=u(t[0])+" svelte-zht8j1")},m(e,r){p(e,n,r),l||(s=v(n,"mousedown",t[5]),l=!0)},p(e,[t]){1&t&&r!==(r=u(e[0])+" svelte-zht8j1")&&w(n,"class",r)},i:e,o:e,d(e){e&&d(n),l=!1,s()}}}function ce(e,t,n){let r,l,s;c(e,K,(e=>n(4,s=e)));let{key:o}=t;function a(){f(K,s=s===o?null:o,s)}let i=new ae("key");return e.$$set=e=>{"key"in e&&n(2,o=e.key)},e.$$.update=()=>{20&e.$$.dirty&&n(3,r=s===o),12&e.$$.dirty&&n(0,l=i.reset().addIfElse(o.sharp,"key-black","key-white").addIf(r,"pressed").get())},[l,a,o,r,s,()=>a()]}class ue extends U{constructor(e){super(),R(this,e,ce,ie,s,{key:2})}}function fe({type:e,octave:t,sharp:n}){return{type:e,octave:t,sharp:n,name:`${e.toString().toLocaleUpperCase()}${t}${n?"#":""}`,audio:{play:()=>{console.log("would play audio, but this is currently disabled")}}}}const $e=[fe({type:Q.C,octave:4}),fe({type:Q.C,octave:4,sharp:!0}),fe({type:Q.D,octave:4}),fe({type:Q.D,octave:4,sharp:!0}),fe({type:Q.E,octave:4}),fe({type:Q.F,octave:4}),fe({type:Q.F,octave:4,sharp:!0}),fe({type:Q.G,octave:4}),fe({type:Q.G,octave:4,sharp:!0}),fe({type:Q.A,octave:5}),fe({type:Q.A,octave:5,sharp:!0}),fe({type:Q.B,octave:5})],pe=$e.filter((e=>!e.sharp)).length;function de(e,t,n){const r=e.slice();return r[0]=t[n],r}function me(t){let n,r;return n=new ue({props:{key:t[0]}}),{c(){H(n.$$.fragment)},m(e,t){O(n,e,t),r=!0},p:e,i(e){r||(I(n.$$.fragment,e),r=!0)},o(e){T(n.$$.fragment,e),r=!1},d(e){W(n,e)}}}function ge(e){let t,n,r=$e,l=[];for(let t=0;t<r.length;t+=1)l[t]=me(de(e,r,t));const s=e=>T(l[e],1,1,(()=>{l[e]=null}));return{c(){t=m("div");for(let e=0;e<l.length;e+=1)l[e].c();w(t,"class","piano svelte-wmp73b")},m(e,r){p(e,t,r);for(let e=0;e<l.length;e+=1)l[e].m(t,null);n=!0},p(e,[n]){if(0&n){let o;for(r=$e,o=0;o<r.length;o+=1){const s=de(e,r,o);l[o]?(l[o].p(s,n),I(l[o],1)):(l[o]=me(s),l[o].c(),I(l[o],1),l[o].m(t,null))}for(q(),o=r.length;o<l.length;o+=1)s(o);N()}},i(e){if(!n){for(let e=0;e<r.length;e+=1)I(l[e]);n=!0}},o(e){l=l.filter(Boolean);for(let e=0;e<l.length;e+=1)T(l[e]);n=!1},d(e){e&&d(t),function(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}(l,e)}}}document.documentElement.style.setProperty("--num-white-keys",`${pe} `);class he extends U{constructor(e){super(),R(this,e,null,ge,s,{})}}const ye=X(!1);function ve(t){let n,r,l=(t[0]?.name||"Piantoes")+"";return{c(){n=m("div"),r=h(l),w(n,"class","header-text flex-grow text-center")},m(e,t){p(e,n,t),$(n,r)},p(e,[t]){1&t&&l!==(l=(e[0]?.name||"Piantoes")+"")&&function(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}(r,l)},i:e,o:e,d(e){e&&d(n)}}}function we(e,t,n){let r;return c(e,K,(e=>n(0,r=e))),[r]}class be extends U{constructor(e){super(),R(this,e,we,ve,s,{})}}function xe(e,t,n){let r;return c(e,ye,(e=>n(0,r=e))),K.subscribe((e=>{e&&!r&&e.audio.play()})),[]}class Ce extends U{constructor(e){super(),R(this,e,xe,null,s,{})}}function _e(t){let n,r,l,s,o,a;return{c(){n=m("a"),r=g("svg"),l=g("path"),s=g("path"),o=g("path"),w(l,"class","background"),w(l,"d","M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"),w(s,"d","M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"),w(s,"fill","currentColor"),b(s,"transform-origin","130px 106px"),w(s,"class","octo-arm svelte-1fmpe6o"),w(o,"d","M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"),w(o,"fill","currentColor"),w(o,"class","octo-body"),w(r,"width","80"),w(r,"height","80"),w(r,"viewBox","0 0 250 250"),w(r,"aria-hidden","true"),b(r,"fill",t[1]),w(r,"class",a=u(t[2])+" svelte-1fmpe6o"),w(n,"href",t[0]),w(n,"target","#"),w(n,"class","github-corner svelte-1fmpe6o"),w(n,"aria-label","View source on GitHub")},m(e,t){p(e,n,t),$(n,r),$(r,l),$(r,s),$(r,o)},p(e,[t]){2&t&&b(r,"fill",e[1]),4&t&&a!==(a=u(e[2])+" svelte-1fmpe6o")&&w(r,"class",a),1&t&&w(n,"href",e[0])},i:e,o:e,d(e){e&&d(n)}}}function ke(e,t,n){let r,{href:l}=t,{position:s="topRight"}=t,{fill:o="#ff2768"}=t,{small:a=!1}=t;return e.$$set=e=>{"href"in e&&n(0,l=e.href),"position"in e&&n(3,s=e.position),"fill"in e&&n(1,o=e.fill),"small"in e&&n(4,a=e.small)},e.$$.update=()=>{24&e.$$.dirty&&n(2,r=`${s}${a?" small":""}`)},[l,o,r,s,a]}class Le extends U{constructor(e){super(),R(this,e,ke,_e,s,{href:0,position:3,fill:1,small:4})}}function Ee(t){let n,l,s,o,a,i,c,f,g,b;return{c(){n=m("div"),l=m("button"),s=h("install"),a=y(),i=m("button"),c=h("X"),w(l,"class",o=u(Ae)+" svelte-1p39g8k"),w(i,"class",f=u(Ae)+" svelte-1p39g8k"),w(n,"class","installer slide-in-from-bottom p-2 flex rounded-full svelte-1p39g8k")},m(e,r){p(e,n,r),$(n,l),$(l,s),$(n,a),$(n,i),$(i,c),g||(b=[v(l,"click",t[4]),v(i,"click",t[5])],g=!0)},p:e,d(e){e&&d(n),g=!1,r(b)}}}function ze(t){let n,r=t[0]&&t[1]&&Ee(t);return{c(){r&&r.c(),n=h("")},m(e,t){r&&r.m(e,t),p(e,n,t)},p(e,[t]){e[0]&&e[1]?r?r.p(e,t):(r=Ee(e),r.c(),r.m(n.parentNode,n)):r&&(r.d(1),r=null)},i:e,o:e,d(e){r&&r.d(e),e&&d(n)}}}const Ae="false flex items-center justify-center gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-full py-2.5 px-6 text-xs leading-normal bg-transparent border border-solid shadow-none text-light-blue-500 border-light-blue-500 hover:bg-light-blue-50 hover:border-light-blue-700 hover:text-light-blue-700 hover:bg-light-blue-50 active:bg-light-blue-100";function Be(e,t,n){let r,l="browser"===function(){const e=window.matchMedia("(display-mode: standalone)").matches;return document.referrer.startsWith("android-app://")?"twa":navigator.standalone||e?"standalone":"browser"}();function s(){n(0,l=!1),r&&(r.prompt(),r.userChoice.then((e=>{"accepted"===e.outcome&&console.log("yay!"),n(1,r=null)})))}function o(){n(0,l=!1)}_((()=>{"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("./service-worker.js").then((e=>{console.log("Service worker registered.",e)}))})),window.addEventListener("beforeinstallprompt",(e=>{e.preventDefault(),n(1,r=e)}))}));return[l,r,s,o,()=>s(),()=>o()]}class De extends U{constructor(e){super(),R(this,e,Be,ze,s,{})}}function je(e){let t,n;return t=new oe({}),{c(){H(t.$$.fragment)},m(e,r){O(t,e,r),n=!0},i(e){n||(I(t.$$.fragment,e),n=!0)},o(e){T(t.$$.fragment,e),n=!1},d(e){W(t,e)}}}function Fe(e){let t,n,r,l,s,o,a,i,c,u,f,g,h;n=new be({}),l=new Le({props:{href:"https://github.com/loremdipso/piantoes",position:"topLeft",fill:"#00b7ff",small:!0}}),o=new Ce({});let v=e[0]&&je();return u=new he({}),g=new De({}),{c(){t=m("header"),H(n.$$.fragment),r=y(),H(l.$$.fragment),s=y(),H(o.$$.fragment),a=y(),i=m("main"),v&&v.c(),c=y(),H(u.$$.fragment),f=y(),H(g.$$.fragment),w(t,"class","py-1 relative slide-in-from-top bg-primary-300 dark:bg-black flex h-16 space-between items-center left-0 p-0 shadow top-0 w-full z-20 svelte-ysci0d"),w(i,"class","fade-in svelte-ysci0d")},m(e,d){p(e,t,d),O(n,t,null),$(t,r),O(l,t,null),p(e,s,d),O(o,e,d),p(e,a,d),p(e,i,d),v&&v.m(i,null),$(i,c),O(u,i,null),$(i,f),O(g,i,null),h=!0},p(e,[t]){e[0]?v?1&t&&I(v,1):(v=je(),v.c(),I(v,1),v.m(i,c)):v&&(q(),T(v,1,1,(()=>{v=null})),N())},i(e){h||(I(n.$$.fragment,e),I(l.$$.fragment,e),I(o.$$.fragment,e),I(v),I(u.$$.fragment,e),I(g.$$.fragment,e),h=!0)},o(e){T(n.$$.fragment,e),T(l.$$.fragment,e),T(o.$$.fragment,e),T(v),T(u.$$.fragment,e),T(g.$$.fragment,e),h=!1},d(e){e&&d(t),W(n),W(l),e&&d(s),W(o,e),e&&d(a),e&&d(i),v&&v.d(),W(u),W(g)}}}function Ge(e,t,n){let r;return c(e,J,(e=>n(0,r=e))),[r]}return new class extends U{constructor(e){super(),R(this,e,Ge,Fe,s,{})}}({target:document.body})}();
