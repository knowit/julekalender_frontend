import{a8 as or,a9 as Ke,aa as ur,ab as cr,ac as fr,g as dr,R as C,Q as De,F as yr}from"./index.730cc167.js";var hr=or,gr=Ke,vr=ur,Ue=cr,_r=fr;function br(e,t,r,l){if(!Ue(e))return e;t=gr(t,e);for(var n=-1,o=t.length,g=o-1,h=e;h!=null&&++n<o;){var x=_r(t[n]),w=r;if(x==="__proto__"||x==="constructor"||x==="prototype")return e;if(n!=g){var T=h[x];w=l?l(T,x,h):void 0,w===void 0&&(w=Ue(T)?T:vr(t[n+1])?[]:{})}hr(h,x,w),h=h[x]}return e}var xr=br,Ar=dr,mr=xr,Fr=Ke;function wr(e,t,r){for(var l=-1,n=t.length,o={};++l<n;){var g=t[l],h=Ar(e,g);r(h,g)&&mr(o,Fr(g,e),h)}return o}var Qr=wr,se=e=>e.type==="checkbox",Z=e=>e instanceof Date,L=e=>e==null;const Ge=e=>typeof e=="object";var V=e=>!L(e)&&!Array.isArray(e)&&Ge(e)&&!Z(e),Dr=e=>V(e)&&e.target?se(e.target)?e.target.checked:e.target.value:e,Er=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,kr=(e,t)=>e.has(Er(t)),ie=e=>Array.isArray(e)?e.filter(Boolean):[],k=e=>e===void 0,d=(e,t,r)=>{if(!t||!V(e))return r;const l=ie(t.split(/[,[\].]+?/)).reduce((n,o)=>L(n)?n:n[o],e);return k(l)||l===e?k(e[t])?r:e[t]:l};const Me={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},p={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},W={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};C.createContext(null);var Sr=(e,t,r,l=!0)=>{const n={defaultValues:t._defaultValues};for(const o in e)Object.defineProperty(n,o,{get:()=>{const g=o;return t._proxyFormState[g]!==p.all&&(t._proxyFormState[g]=!l||p.all),r&&(r[g]=!0),e[g]}});return n},U=e=>V(e)&&!Object.keys(e).length,Vr=(e,t,r)=>{const{name:l,...n}=e;return U(n)||Object.keys(n).length>=Object.keys(t).length||Object.keys(n).find(o=>t[o]===(!r||p.all))},xe=e=>Array.isArray(e)?e:[e];function Or(e){const t=C.useRef(e);t.current=e,C.useEffect(()=>{const r=!e.disabled&&t.current.subject.subscribe({next:t.current.callback});return()=>{r&&r.unsubscribe()}},[e.disabled])}var I=e=>typeof e=="string",Cr=(e,t,r,l)=>I(e)?(l&&t.watch.add(e),d(r,e)):Array.isArray(e)?e.map(n=>(l&&t.watch.add(n),d(r,n))):(t.watchAll=!!l,r),Tr=e=>{const t=e.constructor&&e.constructor.prototype;return V(t)&&t.hasOwnProperty("isPrototypeOf")},Ee=typeof window!="undefined"&&typeof window.HTMLElement!="undefined"&&typeof document!="undefined";function Q(e){let t;const r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(Ee&&(e instanceof Blob||e instanceof FileList))&&(r||V(e)))if(t=r?[]:{},!Array.isArray(e)&&!Tr(e))t=e;else for(const l in e)t[l]=Q(e[l]);else return e;return t}var Rr=(e,t,r,l,n)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[l]:n||!0}}:{},Ve=e=>/^\w*$/.test(e),Qe=e=>ie(e.replace(/["|']|\]/g,"").split(/\.|\[/));function m(e,t,r){let l=-1;const n=Ve(t)?[t]:Qe(t),o=n.length,g=o-1;for(;++l<o;){const h=n[l];let x=r;if(l!==g){const w=e[h];x=V(w)||Array.isArray(w)?w:isNaN(+n[l+1])?{}:[]}e[h]=x,e=e[h]}return e}const ke=(e,t,r)=>{for(const l of r||Object.keys(e)){const n=d(e,l);if(n){const{_f:o,...g}=n;if(o&&t(o.name)){if(o.ref.focus){o.ref.focus();break}else if(o.refs&&o.refs[0].focus){o.refs[0].focus();break}}else V(g)&&ke(g,t)}}};var Pe=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(l=>e.startsWith(l)&&/^\.\w+/.test(e.slice(l.length)))),Lr=(e,t,r)=>{const l=ie(d(e,r));return m(l,"root",t[r]),m(e,r,l),e},j=e=>typeof e=="boolean",Oe=e=>e.type==="file",ce=e=>typeof e=="function",ue=e=>I(e)||C.isValidElement(e),Ce=e=>e.type==="radio",fe=e=>e instanceof RegExp;const Be={value:!1,isValid:!1},pe={value:!0,isValid:!0};var Je=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!k(e[0].attributes.value)?k(e[0].value)||e[0].value===""?pe:{value:e[0].value,isValid:!0}:pe:Be}return Be};const Ie={isValid:!1,value:null};var Xe=e=>Array.isArray(e)?e.reduce((t,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:t,Ie):Ie;function qe(e,t,r="validate"){if(ue(e)||Array.isArray(e)&&e.every(ue)||j(e)&&!e)return{type:r,message:ue(e)?e:"",ref:t}}var Y=e=>V(e)&&!fe(e)?e:{value:e,message:""},$e=async(e,t,r,l,n)=>{const{ref:o,refs:g,required:h,maxLength:x,minLength:w,min:T,max:F,pattern:_,validate:K,name:M,valueAsNumber:ne,mount:he,disabled:q}=e._f;if(!he||q)return{};const $=g?g[0]:o,H=v=>{l&&$.reportValidity&&($.setCustomValidity(j(v)?"":v||""),$.reportValidity())},D={},ee=Ce(o),ae=se(o),G=ee||ae,J=(ne||Oe(o))&&!o.value||t===""||Array.isArray(t)&&!t.length,P=Rr.bind(null,M,r,D),le=(v,b,E,O=W.maxLength,B=W.minLength)=>{const N=v?b:E;D[M]={type:v?O:B,message:N,ref:o,...P(v?O:B,N)}};if(n?!Array.isArray(t)||!t.length:h&&(!G&&(J||L(t))||j(t)&&!t||ae&&!Je(g).isValid||ee&&!Xe(g).isValid)){const{value:v,message:b}=ue(h)?{value:!!h,message:h}:Y(h);if(v&&(D[M]={type:W.required,message:b,ref:$,...P(W.required,b)},!r))return H(b),D}if(!J&&(!L(T)||!L(F))){let v,b;const E=Y(F),O=Y(T);if(!L(t)&&!isNaN(t)){const B=o.valueAsNumber||t&&+t;L(E.value)||(v=B>E.value),L(O.value)||(b=B<O.value)}else{const B=o.valueAsDate||new Date(t),N=oe=>new Date(new Date().toDateString()+" "+oe),re=o.type=="time",X=o.type=="week";I(E.value)&&t&&(v=re?N(t)>N(E.value):X?t>E.value:B>new Date(E.value)),I(O.value)&&t&&(b=re?N(t)<N(O.value):X?t<O.value:B<new Date(O.value))}if((v||b)&&(le(!!v,E.message,O.message,W.max,W.min),!r))return H(D[M].message),D}if((x||w)&&!J&&(I(t)||n&&Array.isArray(t))){const v=Y(x),b=Y(w),E=!L(v.value)&&t.length>v.value,O=!L(b.value)&&t.length<b.value;if((E||O)&&(le(E,v.message,b.message),!r))return H(D[M].message),D}if(_&&!J&&I(t)){const{value:v,message:b}=Y(_);if(fe(v)&&!t.match(v)&&(D[M]={type:W.pattern,message:b,ref:o,...P(W.pattern,b)},!r))return H(b),D}if(K){if(ce(K)){const v=await K(t),b=qe(v,$);if(b&&(D[M]={...b,...P(W.validate,b.message)},!r))return H(b.message),D}else if(V(K)){let v={};for(const b in K){if(!U(v)&&!r)break;const E=qe(await K[b](t),$,b);E&&(v={...E,...P(b,E.message)},H(E.message),r&&(D[M]=v))}if(!U(v)&&(D[M]={ref:$,...v},!r))return D}}return H(!0),D},He=e=>({isOnSubmit:!e||e===p.onSubmit,isOnBlur:e===p.onBlur,isOnChange:e===p.onChange,isOnAll:e===p.all,isOnTouch:e===p.onTouched});function Nr(e,t){const r=t.slice(0,-1).length;let l=0;for(;l<r;)e=k(e)?l++:e[t[l++]];return e}function Ur(e){for(const t in e)if(!k(e[t]))return!1;return!0}function R(e,t){const r=Ve(t)?[t]:Qe(t),l=r.length==1?e:Nr(e,r),n=r[r.length-1];let o;l&&delete l[n];for(let g=0;g<r.slice(0,-1).length;g++){let h=-1,x;const w=r.slice(0,-(g+1)),T=w.length-1;for(g>0&&(o=e);++h<w.length;){const F=w[h];x=x?x[F]:e[F],T===h&&(V(x)&&U(x)||Array.isArray(x)&&Ur(x))&&(o?delete o[F]:delete e[F]),o=x}}return e}function Ae(){let e=[];return{get observers(){return e},next:n=>{for(const o of e)o.next(n)},subscribe:n=>(e.push(n),{unsubscribe:()=>{e=e.filter(o=>o!==n)}}),unsubscribe:()=>{e=[]}}}var de=e=>L(e)||!Ge(e);function z(e,t){if(de(e)||de(t))return e===t;if(Z(e)&&Z(t))return e.getTime()===t.getTime();const r=Object.keys(e),l=Object.keys(t);if(r.length!==l.length)return!1;for(const n of r){const o=e[n];if(!l.includes(n))return!1;if(n!=="ref"){const g=t[n];if(Z(o)&&Z(g)||V(o)&&V(g)||Array.isArray(o)&&Array.isArray(g)?!z(o,g):o!==g)return!1}}return!0}var Se=e=>{const t=e?e.ownerDocument:0,r=t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement;return e instanceof r},Ye=e=>e.type==="select-multiple",Mr=e=>Ce(e)||se(e),me=e=>Se(e)&&e.isConnected,Ze=e=>{for(const t in e)if(ce(e[t]))return!0;return!1};function ye(e,t={}){const r=Array.isArray(e);if(V(e)||r)for(const l in e)Array.isArray(e[l])||V(e[l])&&!Ze(e[l])?(t[l]=Array.isArray(e[l])?[]:{},ye(e[l],t[l])):L(e[l])||(t[l]=!0);return t}function ze(e,t,r){const l=Array.isArray(e);if(V(e)||l)for(const n in e)Array.isArray(e[n])||V(e[n])&&!Ze(e[n])?k(t)||de(r[n])?r[n]=Array.isArray(e[n])?ye(e[n],[]):{...ye(e[n])}:ze(e[n],L(t)?{}:t[n],r[n]):z(e[n],t[n])?delete r[n]:r[n]=!0;return r}var Fe=(e,t)=>ze(e,t,ye(t)),je=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:l})=>k(e)?e:t?e===""?NaN:e&&+e:r&&I(e)?new Date(e):l?l(e):e;function we(e){const t=e.ref;if(!(e.refs?e.refs.every(r=>r.disabled):t.disabled))return Oe(t)?t.files:Ce(t)?Xe(e.refs).value:Ye(t)?[...t.selectedOptions].map(({value:r})=>r):se(t)?Je(e.refs).value:je(k(t.value)?e.ref.value:t.value,e)}var Pr=(e,t,r,l)=>{const n={};for(const o of e){const g=d(t,o);g&&m(n,o,g._f)}return{criteriaMode:r,names:[...e],fields:n,shouldUseNativeValidation:l}},te=e=>k(e)?e:fe(e)?e.source:V(e)?fe(e.value)?e.value.source:e.value:e,Br=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function We(e,t,r){const l=d(e,r);if(l||Ve(r))return{error:l,name:r};const n=r.split(".");for(;n.length;){const o=n.join("."),g=d(t,o),h=d(e,o);if(g&&!Array.isArray(g)&&r!==o)return{name:r};if(h&&h.type)return{name:o,error:h};n.pop()}return{name:r}}var pr=(e,t,r,l,n)=>n.isOnAll?!1:!r&&n.isOnTouch?!(t||e):(r?l.isOnBlur:n.isOnBlur)?!e:(r?l.isOnChange:n.isOnChange)?e:!0,Ir=(e,t)=>!ie(d(e,t)).length&&R(e,t);const qr={mode:p.onSubmit,reValidateMode:p.onChange,shouldFocusError:!0};function $r(e={}){let t={...qr,...e},r={submitCount:0,isDirty:!1,isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},l={},n=Q(t.defaultValues)||{},o=t.shouldUnregister?{}:Q(n),g={action:!1,mount:!1,watch:!1},h={mount:new Set,unMount:new Set,array:new Set,watch:new Set},x,w=0,T={};const F={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},_={watch:Ae(),array:Ae(),state:Ae()},K=He(t.mode),M=He(t.reValidateMode),ne=t.criteriaMode===p.all,he=s=>i=>{clearTimeout(w),w=window.setTimeout(s,i)},q=async()=>{let s=!1;return F.isValid&&(s=t.resolver?U((await G()).errors):await P(l,!0),s!==r.isValid&&(r.isValid=s,_.state.next({isValid:s}))),s},$=(s,i=[],a,c,f=!0,u=!0)=>{if(c&&a){if(g.action=!0,u&&Array.isArray(d(l,s))){const y=a(d(l,s),c.argA,c.argB);f&&m(l,s,y)}if(u&&Array.isArray(d(r.errors,s))){const y=a(d(r.errors,s),c.argA,c.argB);f&&m(r.errors,s,y),Ir(r.errors,s)}if(F.touchedFields&&u&&Array.isArray(d(r.touchedFields,s))){const y=a(d(r.touchedFields,s),c.argA,c.argB);f&&m(r.touchedFields,s,y)}F.dirtyFields&&(r.dirtyFields=Fe(n,o)),_.state.next({isDirty:v(s,i),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else m(o,s,i)},H=(s,i)=>{m(r.errors,s,i),_.state.next({errors:r.errors})},D=(s,i,a,c)=>{const f=d(l,s);if(f){const u=d(o,s,k(a)?d(n,s):a);k(u)||c&&c.defaultChecked||i?m(o,s,i?u:we(f._f)):O(s,u),g.mount&&q()}},ee=(s,i,a,c,f)=>{let u=!1,y=!1;const A={name:s};if(F.isDirty&&(y=r.isDirty,r.isDirty=A.isDirty=v(),u=y!==A.isDirty),F.dirtyFields&&(!a||c)){y=d(r.dirtyFields,s);const S=z(d(n,s),i);S?R(r.dirtyFields,s):m(r.dirtyFields,s,!0),A.dirtyFields=r.dirtyFields,u=u||y!==!S}if(a){const S=d(r.touchedFields,s);S||(m(r.touchedFields,s,a),A.touchedFields=r.touchedFields,u=u||F.touchedFields&&S!==a)}return u&&f&&_.state.next(A),u?A:{}},ae=(s,i,a,c)=>{const f=d(r.errors,s),u=F.isValid&&j(i)&&r.isValid!==i;if(e.delayError&&a?(x=he(()=>H(s,a)),x(e.delayError)):(clearTimeout(w),x=null,a?m(r.errors,s,a):R(r.errors,s)),(a?!z(f,a):f)||!U(c)||u){const y={...c,...u&&j(i)?{isValid:i}:{},errors:r.errors,name:s};r={...r,...y},_.state.next(y)}T[s]--,F.isValidating&&!Object.values(T).some(y=>y)&&(_.state.next({isValidating:!1}),T={})},G=async s=>t.resolver?await t.resolver({...o},t.context,Pr(s||h.mount,l,t.criteriaMode,t.shouldUseNativeValidation)):{},J=async s=>{const{errors:i}=await G();if(s)for(const a of s){const c=d(i,a);c?m(r.errors,a,c):R(r.errors,a)}else r.errors=i;return i},P=async(s,i,a={valid:!0})=>{for(const c in s){const f=s[c];if(f){const{_f:u,...y}=f;if(u){const A=h.array.has(u.name),S=await $e(f,d(o,u.name),ne,t.shouldUseNativeValidation,A);if(S[u.name]&&(a.valid=!1,i))break;!i&&(d(S,u.name)?A?Lr(r.errors,S,u.name):m(r.errors,u.name,S[u.name]):R(r.errors,u.name))}y&&await P(y,i,a)}}return a.valid},le=()=>{for(const s of h.unMount){const i=d(l,s);i&&(i._f.refs?i._f.refs.every(a=>!me(a)):!me(i._f.ref))&&ge(s)}h.unMount=new Set},v=(s,i)=>(s&&i&&m(o,s,i),!z(oe(),n)),b=(s,i,a)=>Cr(s,h,{...g.mount?o:k(i)?n:I(s)?{[s]:i}:i},a),E=s=>ie(d(g.mount?o:n,s,e.shouldUnregister?d(n,s,[]):[])),O=(s,i,a={})=>{const c=d(l,s);let f=i;if(c){const u=c._f;u&&(!u.disabled&&m(o,s,je(i,u)),f=Ee&&Se(u.ref)&&L(i)?"":i,Ye(u.ref)?[...u.ref.options].forEach(y=>y.selected=f.includes(y.value)):u.refs?se(u.ref)?u.refs.length>1?u.refs.forEach(y=>(!y.defaultChecked||!y.disabled)&&(y.checked=Array.isArray(f)?!!f.find(A=>A===y.value):f===y.value)):u.refs[0]&&(u.refs[0].checked=!!f):u.refs.forEach(y=>y.checked=y.value===f):Oe(u.ref)?u.ref.value="":(u.ref.value=f,u.ref.type||_.watch.next({name:s})))}(a.shouldDirty||a.shouldTouch)&&ee(s,f,a.shouldTouch,a.shouldDirty,!0),a.shouldValidate&&X(s)},B=(s,i,a)=>{for(const c in i){const f=i[c],u=`${s}.${c}`,y=d(l,u);(h.array.has(s)||!de(f)||y&&!y._f)&&!Z(f)?B(u,f,a):O(u,f,a)}},N=(s,i,a={})=>{const c=d(l,s),f=h.array.has(s),u=Q(i);m(o,s,u),f?(_.array.next({name:s,values:o}),(F.isDirty||F.dirtyFields)&&a.shouldDirty&&(r.dirtyFields=Fe(n,o),_.state.next({name:s,dirtyFields:r.dirtyFields,isDirty:v(s,u)}))):c&&!c._f&&!L(u)?B(s,u,a):O(s,u,a),Pe(s,h)&&_.state.next({}),_.watch.next({name:s})},re=async s=>{const i=s.target;let a=i.name;const c=d(l,a);if(c){let f,u;const y=i.type?we(c._f):Dr(s),A=s.type===Me.BLUR||s.type===Me.FOCUS_OUT,S=!Br(c._f)&&!t.resolver&&!d(r.errors,a)&&!c._f.deps||pr(A,d(r.touchedFields,a),r.isSubmitted,M,K),_e=Pe(a,h,A);m(o,a,y),A?(c._f.onBlur&&c._f.onBlur(s),x&&x(0)):c._f.onChange&&c._f.onChange(s);const be=ee(a,y,A,!1),ar=!U(be)||_e;if(!A&&_.watch.next({name:a,type:s.type}),S)return F.isValid&&q(),ar&&_.state.next({name:a,..._e?{}:be});if(!A&&_e&&_.state.next({}),T[a]=T[a]?T[a]+1:1,_.state.next({isValidating:!0}),t.resolver){const{errors:Le}=await G([a]),lr=We(r.errors,l,a),Ne=We(Le,l,lr.name||a);f=Ne.error,a=Ne.name,u=U(Le)}else f=(await $e(c,d(o,a),ne,t.shouldUseNativeValidation))[a],q();c._f.deps&&X(c._f.deps),ae(a,u,f,be)}},X=async(s,i={})=>{let a,c;const f=xe(s);if(_.state.next({isValidating:!0}),t.resolver){const u=await J(k(s)?s:f);a=U(u),c=s?!f.some(y=>d(u,y)):a}else s?(c=(await Promise.all(f.map(async u=>{const y=d(l,u);return await P(y&&y._f?{[u]:y}:y)}))).every(Boolean),!(!c&&!r.isValid)&&q()):c=a=await P(l);return _.state.next({...!I(s)||F.isValid&&a!==r.isValid?{}:{name:s},...t.resolver||!s?{isValid:a}:{},errors:r.errors,isValidating:!1}),i.shouldFocus&&!c&&ke(l,u=>u&&d(r.errors,u),s?f:h.mount),c},oe=s=>{const i={...n,...g.mount?o:{}};return k(s)?i:I(s)?d(i,s):s.map(a=>d(i,a))},Te=(s,i)=>({invalid:!!d((i||r).errors,s),isDirty:!!d((i||r).dirtyFields,s),isTouched:!!d((i||r).touchedFields,s),error:d((i||r).errors,s)}),er=s=>{s?xe(s).forEach(i=>R(r.errors,i)):r.errors={},_.state.next({errors:r.errors})},rr=(s,i,a)=>{const c=(d(l,s,{_f:{}})._f||{}).ref;m(r.errors,s,{...i,ref:c}),_.state.next({name:s,errors:r.errors,isValid:!1}),a&&a.shouldFocus&&c&&c.focus&&c.focus()},tr=(s,i)=>ce(s)?_.watch.subscribe({next:a=>s(b(void 0,i),a)}):b(s,i,!0),ge=(s,i={})=>{for(const a of s?xe(s):h.mount)h.mount.delete(a),h.array.delete(a),d(l,a)&&(i.keepValue||(R(l,a),R(o,a)),!i.keepError&&R(r.errors,a),!i.keepDirty&&R(r.dirtyFields,a),!i.keepTouched&&R(r.touchedFields,a),!t.shouldUnregister&&!i.keepDefaultValue&&R(n,a));_.watch.next({}),_.state.next({...r,...i.keepDirty?{isDirty:v()}:{}}),!i.keepIsValid&&q()},ve=(s,i={})=>{let a=d(l,s);const c=j(i.disabled);return m(l,s,{...a||{},_f:{...a&&a._f?a._f:{ref:{name:s}},name:s,mount:!0,...i}}),h.mount.add(s),a?c&&m(o,s,i.disabled?void 0:d(o,s,we(a._f))):D(s,!0,i.value),{...c?{disabled:i.disabled}:{},...t.shouldUseNativeValidation?{required:!!i.required,min:te(i.min),max:te(i.max),minLength:te(i.minLength),maxLength:te(i.maxLength),pattern:te(i.pattern)}:{},name:s,onChange:re,onBlur:re,ref:f=>{if(f){ve(s,i),a=d(l,s);const u=k(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,y=Mr(u),A=a._f.refs||[];if(y?A.find(S=>S===u):u===a._f.ref)return;m(l,s,{_f:{...a._f,...y?{refs:[...A.filter(me),u,...Array.isArray(d(n,s))?[{}]:[]],ref:{type:u.type,name:s}}:{ref:u}}}),D(s,!1,void 0,u)}else a=d(l,s,{}),a._f&&(a._f.mount=!1),(t.shouldUnregister||i.shouldUnregister)&&!(kr(h.array,s)&&g.action)&&h.unMount.add(s)}}},Re=()=>t.shouldFocusError&&ke(l,s=>s&&d(r.errors,s),h.mount),sr=(s,i)=>async a=>{a&&(a.preventDefault&&a.preventDefault(),a.persist&&a.persist());let c=!0,f=Q(o);_.state.next({isSubmitting:!0});try{if(t.resolver){const{errors:u,values:y}=await G();r.errors=u,f=y}else await P(l);U(r.errors)?(_.state.next({errors:{},isSubmitting:!0}),await s(f,a)):(i&&await i({...r.errors},a),Re())}catch(u){throw c=!1,u}finally{r.isSubmitted=!0,_.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:U(r.errors)&&c,submitCount:r.submitCount+1,errors:r.errors})}},ir=(s,i={})=>{d(l,s)&&(k(i.defaultValue)?N(s,d(n,s)):(N(s,i.defaultValue),m(n,s,i.defaultValue)),i.keepTouched||R(r.touchedFields,s),i.keepDirty||(R(r.dirtyFields,s),r.isDirty=i.defaultValue?v(s,d(n,s)):v()),i.keepError||(R(r.errors,s),F.isValid&&q()),_.state.next({...r}))},nr=(s,i={})=>{const a=s||n,c=Q(a),f=s&&!U(s)?c:n;if(i.keepDefaultValues||(n=a),!i.keepValues){if(i.keepDirtyValues)for(const u of h.mount)d(r.dirtyFields,u)?m(f,u,d(o,u)):N(u,d(f,u));else{if(Ee&&k(s))for(const u of h.mount){const y=d(l,u);if(y&&y._f){const A=Array.isArray(y._f.refs)?y._f.refs[0]:y._f.ref;if(Se(A)){const S=A.closest("form");if(S){S.reset();break}}}}l={}}o=e.shouldUnregister?i.keepDefaultValues?Q(n):{}:c,_.array.next({values:f}),_.watch.next({values:f})}h={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},g.mount=!F.isValid||!!i.keepIsValid,g.watch=!!e.shouldUnregister,_.state.next({submitCount:i.keepSubmitCount?r.submitCount:0,isDirty:i.keepDirty||i.keepDirtyValues?r.isDirty:!!(i.keepDefaultValues&&!z(s,n)),isSubmitted:i.keepIsSubmitted?r.isSubmitted:!1,dirtyFields:i.keepDirty||i.keepDirtyValues?r.dirtyFields:i.keepDefaultValues&&s?Fe(n,s):{},touchedFields:i.keepTouched?r.touchedFields:{},errors:i.keepErrors?r.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})};return{control:{register:ve,unregister:ge,getFieldState:Te,_executeSchema:G,_focusError:Re,_getWatch:b,_getDirty:v,_updateValid:q,_removeUnmounted:le,_updateFieldArray:$,_getFieldArray:E,_subjects:_,_proxyFormState:F,get _fields(){return l},get _formValues(){return o},get _stateFlags(){return g},set _stateFlags(s){g=s},get _defaultValues(){return n},get _names(){return h},set _names(s){h=s},get _formState(){return r},set _formState(s){r=s},get _options(){return t},set _options(s){t={...t,...s}}},trigger:X,register:ve,handleSubmit:sr,watch:tr,setValue:N,getValues:oe,reset:(s,i)=>nr(ce(s)?s(o):s,i),resetField:ir,clearErrors:er,unregister:ge,setError:rr,setFocus:(s,i={})=>{const a=d(l,s),c=a&&a._f;if(c){const f=c.refs?c.refs[0]:c.ref;f.focus&&(f.focus(),i.shouldSelect&&f.select())}},getFieldState:Te}}function Jr(e={}){const t=C.useRef(),[r,l]=C.useState({isDirty:!1,isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:e.defaultValues});t.current||(t.current={...$r(e),formState:r});const n=t.current.control;return n._options=e,Or({subject:n._subjects.state,callback:C.useCallback(o=>{Vr(o,n._proxyFormState,!0)&&(n._formState={...n._formState,...o},l({...n._formState}))},[n])}),C.useEffect(()=>{n._stateFlags.mount||(n._proxyFormState.isValid&&n._updateValid(),n._stateFlags.mount=!0),n._stateFlags.watch&&(n._stateFlags.watch=!1,n._subjects.state.next({})),n._removeUnmounted()}),C.useEffect(()=>{r.submitCount&&n._focusError()},[n,r.submitCount]),t.current.formState=Sr(r,n),t.current}const Hr=({label:e,note:t,disabled:r,className:l,children:n,...o})=>C.createElement("label",{className:De("block space-y-1",r&&"text-opacity-30 text-gray-700",l),...o},C.createElement("span",{className:"text-lg font-medium"},e,t&&C.createElement(C.Fragment,null,"\u2003",C.createElement("em",{className:De(r?"text-opacity-20":"text-opacity-60","text-gray-700 text-base font-normal")},t))),n),Xr=yr.exports.forwardRef(({label:e,note:t,disabled:r,className:l,labelClassName:n,children:o,...g},h)=>C.createElement(Hr,{label:e,note:t,disabled:r,className:n},C.createElement("input",{ref:h,className:De("block form-input",r&&"border-opacity-30 border-gray-500",l),disabled:r,...g},o)));export{Hr as F,Qr as _,Xr as a,Jr as u};
