var Datastar=function(I){"use strict";function ne(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}function B(){throw new Error("Cycle detected")}function Ze(){throw new Error("Computed cannot have side-effects")}const Xe=Symbol.for("preact-signals"),T=1,C=2,O=4,R=8,D=16,P=32;function U(){x++}function W(){if(x>1){x--;return}let t,e=!1;for(;H!==void 0;){let n=H;for(H=void 0,re++;n!==void 0;){const r=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~C,!(n._flags&R)&&he(n))try{n._callback()}catch(s){e||(t=s,e=!0)}n=r}}if(re=0,x--,e)throw t}function Ye(t){if(x>0)return t();U();try{return t()}finally{W()}}let g,H,x=0,re=0,q=0;function fe(t){if(g===void 0)return;let e=t._node;if(e===void 0||e._target!==g)return e={_version:0,_source:t,_prevSource:g._sources,_nextSource:void 0,_target:g,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},g._sources!==void 0&&(g._sources._nextSource=e),g._sources=e,t._node=e,g._flags&P&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=g._sources,e._nextSource=void 0,g._sources._nextSource=e,g._sources=e),e}function E(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}E.prototype.brand=Xe,E.prototype._refresh=function(){return!0},E.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)},E.prototype._unsubscribe=function(t){if(this._targets!==void 0){const e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}},E.prototype.subscribe=function(t){const e=this;return ve(function(){const n=e.value,r=this._flags&P;this._flags&=~P;try{t(n)}finally{this._flags|=r}})},E.prototype.valueOf=function(){return this.value},E.prototype.toString=function(){return this.value+""},E.prototype.toJSON=function(){return this.value},E.prototype.peek=function(){return this._value},Object.defineProperty(E.prototype,"value",{get(){const t=fe(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(g instanceof k&&Ze(),t!==this._value){re>100&&B(),this._value=t,this._version++,q++,U();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{W()}}}});function de(t){return new E(t)}function he(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function pe(t){for(let e=t._sources;e!==void 0;e=e._nextSource){const n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function me(t){let e=t._sources,n;for(;e!==void 0;){const r=e._prevSource;e._version===-1?(e._source._unsubscribe(e),r!==void 0&&(r._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=r)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=r}t._sources=n}function k(t){E.call(this,void 0),this._compute=t,this._sources=void 0,this._globalVersion=q-1,this._flags=O}k.prototype=new E,k.prototype._refresh=function(){if(this._flags&=~C,this._flags&T)return!1;if((this._flags&(O|P))===P||(this._flags&=~O,this._globalVersion===q))return!0;if(this._globalVersion=q,this._flags|=T,this._version>0&&!he(this))return this._flags&=~T,!0;const t=g;try{pe(this),g=this;const e=this._compute();(this._flags&D||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~D,this._version++)}catch(e){this._value=e,this._flags|=D,this._version++}return g=t,me(this),this._flags&=~T,!0},k.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=O|P;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}E.prototype._subscribe.call(this,t)},k.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(E.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~P;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}},k.prototype._notify=function(){if(!(this._flags&C)){this._flags|=O|C;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}},k.prototype.peek=function(){if(this._refresh()||B(),this._flags&D)throw this._value;return this._value},Object.defineProperty(k.prototype,"value",{get(){this._flags&T&&B();const t=fe(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&D)throw this._value;return this._value}});function Qe(t){return new k(t)}function ge(t){const e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){U();const n=g;g=void 0;try{e()}catch(r){throw t._flags&=~T,t._flags|=R,se(t),r}finally{g=n,W()}}}function se(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._compute=void 0,t._sources=void 0,ge(t)}function et(t){if(g!==this)throw new Error("Out-of-order effect");me(this),g=t,this._flags&=~T,this._flags&R&&se(this),W()}function F(t){this._compute=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=P}F.prototype._callback=function(){const t=this._start();try{if(this._flags&R||this._compute===void 0)return;const e=this._compute();typeof e=="function"&&(this._cleanup=e)}finally{t()}},F.prototype._start=function(){this._flags&T&&B(),this._flags|=T,this._flags&=~R,ge(this),pe(this),U();const t=g;return g=this,et.bind(this,t)},F.prototype._notify=function(){this._flags&C||(this._flags|=C,this._nextBatchedEffect=H,H=this)},F.prototype._dispose=function(){this._flags|=R,this._flags&T||se(this)};function ve(t){const e=new F(t);try{e._callback()}catch(n){throw e._dispose(),n}return e._dispose.bind(e)}class ye{get value(){return ie(this)}set value(e){Ye(()=>tt(this,e))}peek(){return ie(this,{peek:!0})}}const oe=t=>Object.assign(new ye,Object.entries(t).reduce((e,[n,r])=>{if(["value","peek"].some(s=>s===n))throw new Error(`${n} is a reserved property name`);return typeof r!="object"||r===null||Array.isArray(r)?e[n]=de(r):e[n]=oe(r),e},{})),tt=(t,e)=>Object.keys(e).forEach(n=>t[n].value=e[n]),ie=(t,{peek:e=!1}={})=>Object.entries(t).reduce((n,[r,s])=>(s instanceof E?n[r]=e?s.peek():s.value:s instanceof ye&&(n[r]=ie(s,{peek:e})),n),{});function be(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return e;if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let n=t;return typeof t!="object"&&(n={...e}),Object.keys(e).forEach(r=>{n.hasOwnProperty(r)||(n[r]=e[r]),e[r]===null?delete n[r]:n[r]=be(n[r],e[r])}),n}const nt="[a-zA-Z_$][0-9a-zA-Z_$.]+";function ae(t,e,n){return new RegExp(`(?<whole>\\${t}(?<${e}>${nt})${n})`,"g")}const rt={regexp:ae("$","signal","(?<method>\\([^\\)]*\\))?"),replacer:t=>{const{signal:e,method:n}=t,r="ctx.store()";if(!n?.length)return`${r}.${e}.value`;const s=e.split("."),o=s.pop(),i=s.join(".");return`${r}.${i}.value.${o}${n}`}},st={regexp:ae("$\\$","action","(?<call>\\((?<args>.*)\\))?"),replacer:({action:t,args:e})=>{const n=["ctx"];e&&n.push(...e.split(",").map(s=>s.trim()));const r=n.join(",");return`ctx.actions.${t}(${r})`}},ot={regexp:ae("~","ref",""),replacer({ref:t}){return`data.refs.${t}`}},it=[st,rt,ot],at=[{prefix:"store",preprocessors:{pre:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`Object.assign({...ctx.store()}, ${e})`}}]},onLoad:t=>{const e=t.expressionFn(t);t.mergeStore(e),delete t.el.dataset.store}},{prefix:"ref",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,expression:n}=t;return t.refs[n]=e,()=>delete t.refs[n]}}];class we{plugins=[];store=oe({});actions={};refs={};reactivity={signal:de,computed:Qe,effect:ve};parentID="";missingIDNext=0;removals=new Map;constructor(e={},...n){if(this.actions=Object.assign(this.actions,e),n=[...at,...n],!n.length)throw new Error("No plugins provided");const r=new Set;for(const s of n){if(s.requiredPluginPrefixes){for(const o of s.requiredPluginPrefixes)if(!r.has(o))throw new Error(`${s.prefix} requires ${o}`)}this.plugins.push(s),r.add(s.prefix)}}run(){this.plugins.forEach(e=>{e.onGlobalInit&&e.onGlobalInit({actions:this.actions,refs:this.refs,reactivity:this.reactivity,mergeStore:this.mergeStore.bind(this),store:this.store})}),this.applyPlugins(document.body)}cleanupElementRemovals(e){const n=this.removals.get(e);if(n){for(const r of n)r();this.removals.delete(e)}}mergeStore(e){const n=be(this.store.value,e);this.store=oe(n)}signalByName(e){return this.store[e]}applyPlugins(e){const n=new Set;this.plugins.forEach((r,s)=>{this.walkDownDOM(e,o=>{s||this.cleanupElementRemovals(o);for(const i in o.dataset){let a=o.dataset[i]||"";if(!i.startsWith(r.prefix))continue;if(o.id.length===0&&(o.id=`ds-${this.parentID}-${this.missingIDNext++}`),n.clear(),r.allowedTagRegexps){const p=o.tagName.toLowerCase();if(![...r.allowedTagRegexps].some(h=>p.match(h)))throw new Error(`'${o.tagName}' not allowed for '${i}', allowed ${[[...r.allowedTagRegexps].map(h=>`'${h}'`)].join(", ")}`)}let u=i.slice(r.prefix.length),[f,...l]=u.split(".");if(r.mustHaveEmptyKey&&f.length>0)throw new Error(`'${i}' must have empty key`);if(r.mustNotEmptyKey&&f.length===0)throw new Error(`'${i}' must have non-empty key`);f.length&&(f=f[0].toLowerCase()+f.slice(1));const d=l.map(p=>{const[m,...h]=p.split("_");return{label:m,args:h}});if(r.allowedModifiers){for(const p of d)if(!r.allowedModifiers.has(p.label))throw new Error(`'${p.label}' is not allowed`)}const c=new Map;for(const p of d)c.set(p.label,p.args);if(r.mustHaveEmptyExpression&&a.length)throw new Error(`'${i}' must have empty expression`);if(r.mustNotEmptyExpression&&!a.length)throw new Error(`'${i}' must have non-empty expression`);const y=[...r.preprocessors?.pre||[],...it,...r.preprocessors?.post||[]];for(const p of y){if(n.has(p))continue;n.add(p);const m=a.split(";"),h=[];m.forEach(w=>{let v=w;const _=[...v.matchAll(p.regexp)];if(_.length)for(const L of _){if(!L.groups)continue;const{groups:M}=L,{whole:te}=M;v=v.replace(te,p.replacer(M))}h.push(v)}),a=h.join("; ")}const b={store:()=>this.store,mergeStore:this.mergeStore.bind(this),applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this),walkSignals:this.walkSignals.bind(this),actions:this.actions,refs:this.refs,reactivity:this.reactivity,el:o,key:f,expression:a,expressionFn:()=>{throw new Error("Expression function not created")},modifiers:c};if(!r.bypassExpressionFunctionCreation?.(b)&&!r.mustHaveEmptyExpression&&a.length){const p=a.split(";").map(h=>h.trim());p[p.length-1]=`return ${p[p.length-1]}`;let m=`
try {
${p.map(h=>`  ${h}`).join(`;
`)}
} catch (e) {
  throw e
}
            `;try{const h=new Function("ctx",m);b.expressionFn=h}catch(h){throw new Error(`Error creating expression function for '${m}', error: ${h}`)}}const S=r.onLoad(b);S&&(this.removals.has(o)||this.removals.set(o,new Set),this.removals.get(o).add(S))}})})}walkSignalsStore(e,n){const r=Object.keys(e);for(let s=0;s<r.length;s++){const o=r[s],i=e[o],a=i instanceof E,u=typeof i=="object"&&Object.keys(i).length>0;if(a){n(o,i);continue}u&&this.walkSignalsStore(i,n)}}walkSignals(e){this.walkSignalsStore(this.store,e)}walkDownDOM(e,n,r=0){if(!e)return;const s=ne(e);if(s)for(n(s),r=0,e=e.firstElementChild;e;)this.walkDownDOM(e,n,r++),e=e.nextElementSibling}}const lt="0.12.5",_e=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,n)=>(n?"-":"")+e.toLowerCase()),ct={prefix:"bind",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(async()=>{const e=_e(t.key),r=`${await t.expressionFn(t)}`;!r||r==="false"||r==="null"||r==="undefined"?t.el.removeAttribute(e):t.el.setAttribute(e,r)})},ut=/^data:(?<mime>[^;]+);base64,(?<contents>.*)$/,G=["change","input","keydown"],ft=[ct,{prefix:"model",mustHaveEmptyKey:!0,preprocessors:{post:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`ctx.store().${e}`}}]},allowedTagRegexps:new Set(["input","textarea","select","checkbox","radio"]),onLoad:t=>{const{el:e,expression:n}=t,r=t.expressionFn(t),s=e.tagName.toLowerCase();if(n.startsWith("ctx.store().ctx.store()"))throw new Error(`Model attribute on #${e.id} must have a signal name, you probably prefixed with $ by accident`);const o=s.includes("input"),i=s.includes("select"),a=s.includes("textarea"),u=e.getAttribute("type"),f=s.includes("checkbox")||o&&u==="checkbox",l=s.includes("radio")||o&&u==="radio",d=o&&u==="file";if(!o&&!i&&!a&&!f&&!l)throw new Error("Element must be input, select, textarea, checkbox or radio");l&&(e.getAttribute("name")?.length||e.setAttribute("name",n));const c=()=>{if(!r)throw new Error(`Signal ${n} not found`);const m="value"in e,h=r.value;if(f||l){const w=e;f?w.checked=h:l&&(w.checked=`${h}`===w.value)}else{if(d)throw new Error("File input reading is not supported yet");m?e.value=`${h}`:e.setAttribute("value",`${h}`)}},y=t.reactivity.effect(c),b=()=>{if(d){const[w]=e?.files||[];if(!w){r.value="";return}const v=new FileReader,_=t.store();v.onload=()=>{if(typeof v.result!="string")throw new Error("Unsupported type");const M=v.result.match(ut);if(!M?.groups)throw new Error("Invalid data URI");const{mime:te,contents:Je}=M.groups;r.value=Je;const ze=`${n}Mime`;if(ze in _){const Zt=_[`${ze}`];Zt.value=te}},v.readAsDataURL(w);const L=`${n}Name`;if(L in _){const M=_[`${L}`];M.value=w.name}return}const m=r.value,h=e;if(typeof m=="number")r.value=Number(h.value);else if(typeof m=="string")r.value=h.value;else if(typeof m=="boolean")f?r.value=h.checked:r.value=!!h.value;else if(!(typeof m>"u"))if(typeof m=="bigint")r.value=BigInt(h.value);else throw console.log(typeof m),new Error("Unsupported type")},S=e.tagName.split("-");if(S.length>1){const m=S[0].toLowerCase();G.forEach(h=>{G.push(`${m}-${h}`)})}return G.forEach(m=>e.addEventListener(m,b)),()=>{y(),G.forEach(m=>e.removeEventListener(m,b))}}},{prefix:"text",mustHaveEmptyKey:!0,onLoad:t=>{const{el:e,expressionFn:n}=t;if(!(e instanceof HTMLElement))throw new Error("Element is not HTMLElement");return t.reactivity.effect(()=>{const r=n(t);e.textContent=`${r}`})}},{prefix:"on",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,allowedModifiers:new Set(["once","passive","capture","debounce","throttle"]),onLoad:t=>{const{el:e,key:n,expressionFn:r}=t;let s=()=>{r(t)};const o=t.modifiers.get("debounce");if(o){const f=Ee(o),l=K(o,"leading",!1),d=K(o,"noTrail",!0);s=dt(s,f,l,d)}const i=t.modifiers.get("throttle");if(i){const f=Ee(i),l=K(i,"noLead",!0),d=K(i,"noTrail",!0);s=ht(s,f,l,d)}const a={capture:!0,passive:!1,once:!1};t.modifiers.has("capture")||(a.capture=!1),t.modifiers.has("passive")&&(a.passive=!0),t.modifiers.has("once")&&(a.once=!0);const u=_e(n).toLowerCase();return u==="load"?(s(),delete e.dataset.onLoad,()=>{}):(e.addEventListener(u,s,a),()=>{e.removeEventListener(u,s)})}}];function Ee(t){if(!t||t?.length===0)return 0;for(const e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function K(t,e,n=!1){return t?t.includes(e)||n:!1}function dt(t,e,n=!1,r=!0){let s;const o=()=>s&&clearTimeout(s);return function(...a){o(),n&&!s&&t(...a),s=setTimeout(()=>{r&&t(...a),o()},e)}}function ht(t,e,n=!0,r=!1){let s=!1,o=null;return function(...a){s?o=a:(s=!0,n?t(...a):o=a,setTimeout(()=>{r&&o&&(t(...o),o=null),s=!1},e))}}function pt(t,{signal:e,headers:n,onopen:r,onmessage:s,onclose:o,onerror:i,openWhenHidden:a,...u}){return new Promise((f,l)=>{const d={...n};d.accept||(d.accept=le);let c;function y(){c.abort(),document.hidden||h()}a||document.addEventListener("visibilitychange",y);let b=mt,S=0;function p(){document.removeEventListener("visibilitychange",y),window.clearTimeout(S),c.abort()}e?.addEventListener("abort",()=>{p(),f()});const m=r??gt;async function h(){c=new AbortController;try{const w=await fetch(t,{...u,headers:d,signal:c.signal});await m(w),await vt(w.body,yt(bt(v=>{v?d[Se]=v:delete d[Se]},v=>{b=v},s))),o?.(),p(),f()}catch(w){if(!c.signal.aborted)try{const v=i?.(w)??b;window.clearTimeout(S),S=window.setTimeout(h,v)}catch(v){p(),l(v)}}}h()})}const le="text/event-stream",mt=1e3,Se="last-event-id";function gt(t){const e=t.headers.get("content-type");if(!e?.startsWith(le))throw new Error(`Expected content-type to be ${le}, Actual: ${e}`)}async function vt(t,e){const n=t.getReader();for(;;){const r=await n.read();if(r.done)break;e(r.value)}}function yt(t){let e,n,r,s=!1;return function(i){e===void 0?(e=i,n=0,r=-1):e=wt(e,i);const a=e.length;let u=0;for(;n<a;){s&&(e[n]===10&&(u=++n),s=!1);let f=-1;for(;n<a&&f===-1;++n)switch(e[n]){case 58:r===-1&&(r=n-u);break;case 13:s=!0;case 10:f=n;break}if(f===-1)break;t(e.subarray(u,f),r),u=n,r=-1}u===a?e=void 0:u!==0&&(e=e.subarray(u),n-=u)}}function bt(t,e,n){let r=Te();const s=new TextDecoder;return function(i,a){if(i.length===0)n?.(r),r=Te();else if(a>0){const u=s.decode(i.subarray(0,a)),f=a+(i[a+1]===32?2:1),l=s.decode(i.subarray(f));switch(u){case"data":r.data=r.data?r.data+`
`+l:l;break;case"event":r.event=l;break;case"id":t(r.id=l);break;case"retry":const d=parseInt(l,10);isNaN(d)||e(r.retry=d);break}}}}function wt(t,e){const n=new Uint8Array(t.length+e.length);return n.set(t),n.set(e,t.length),n}function Te(){return{data:"",event:"",id:"",retry:void 0}}const J=new WeakSet;function _t(t,e,n={}){t instanceof Document&&(t=t.documentElement);let r;typeof e=="string"?r=Lt(e):r=e;const s=kt(r),o=St(t,s,n);return Ae(t,s,o)}function Ae(t,e,n){if(n.head.block){const r=t.querySelector("head"),s=e.querySelector("head");if(r&&s){const o=ke(s,r,n);Promise.all(o).then(()=>{Ae(t,e,Object.assign(n,{head:{block:!1,ignore:!0}}))});return}}if(n.morphStyle==="innerHTML")return Le(e,t,n),t.children;if(n.morphStyle==="outerHTML"||n.morphStyle==null){const r=Nt(e,t,n);if(!r)throw new Error("Could not find best match");const s=r?.previousSibling,o=r?.nextSibling,i=z(t,r,n);return r?Pt(s,i,o):[]}else throw"Do not understand how to morph style "+n.morphStyle}function z(t,e,n){if(!(n.ignoreActive&&t===document.activeElement))if(e==null){if(n.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),n.callbacks.afterNodeRemoved(t);return}else{if(X(t,e))return n.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&n.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&n.head.style!=="morph"?ke(e,t,n):(Et(e,t),Le(e,t,n))),n.callbacks.afterNodeMorphed(t,e),t);if(n.callbacks.beforeNodeRemoved(t)===!1||n.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw new Error("oldNode has no parentElement");return t.parentElement.replaceChild(e,t),n.callbacks.afterNodeAdded(e),n.callbacks.afterNodeRemoved(t),e}}function Le(t,e,n){let r=t.firstChild,s=e.firstChild,o;for(;r;){if(o=r,r=o.nextSibling,s==null){if(n.callbacks.beforeNodeAdded(o)===!1)return;e.appendChild(o),n.callbacks.afterNodeAdded(o),$(n,o);continue}if(Pe(o,s,n)){z(s,o,n),s=s.nextSibling,$(n,o);continue}let i=Tt(t,e,o,s,n);if(i){s=Ne(s,i,n),z(i,o,n),$(n,o);continue}let a=At(t,o,s,n);if(a){s=Ne(s,a,n),z(a,o,n),$(n,o);continue}if(n.callbacks.beforeNodeAdded(o)===!1)return;e.insertBefore(o,s),n.callbacks.afterNodeAdded(o),$(n,o)}for(;s!==null;){let i=s;s=s.nextSibling,$e(i,n)}}function Et(t,e){let n=t.nodeType;if(n===1){for(const r of t.attributes)e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);for(const r of e.attributes)t.hasAttribute(r.name)||e.removeAttribute(r.name)}if((n===Node.COMMENT_NODE||n===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",Z(t,e,"value"),Z(t,e,"checked"),Z(t,e,"disabled");else if(t instanceof HTMLOptionElement)Z(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){const r=t.value,s=e.value;r!==s&&(e.value=r),e.firstChild&&e.firstChild.nodeValue!==r&&(e.firstChild.nodeValue=r)}}function Z(t,e,n){const r=t.getAttribute(n),s=e.getAttribute(n);r!==s&&(r?e.setAttribute(n,r):e.removeAttribute(n))}function ke(t,e,n){const r=[],s=[],o=[],i=[],a=n.head.style,u=new Map;for(const l of t.children)u.set(l.outerHTML,l);for(const l of e.children){let d=u.has(l.outerHTML),c=n.head.shouldReAppend(l),y=n.head.shouldPreserve(l);d||y?c?s.push(l):(u.delete(l.outerHTML),o.push(l)):a==="append"?c&&(s.push(l),i.push(l)):n.head.shouldRemove(l)!==!1&&s.push(l)}i.push(...u.values());const f=[];for(const l of i){const d=document.createRange().createContextualFragment(l.outerHTML).firstChild;if(!d)throw new Error("could not create new element from: "+l.outerHTML);if(n.callbacks.beforeNodeAdded(d)){if(d.hasAttribute("href")||d.hasAttribute("src")){let c;const y=new Promise(b=>{c=b});d.addEventListener("load",function(){c(void 0)}),f.push(y)}e.appendChild(d),n.callbacks.afterNodeAdded(d),r.push(d)}}for(const l of s)n.callbacks.beforeNodeRemoved(l)!==!1&&(e.removeChild(l),n.callbacks.afterNodeRemoved(l));return n.head.afterHeadMorphed(e,{added:r,kept:o,removed:s}),f}function N(){}function St(t,e,n){return{target:t,newContent:e,config:n,morphStyle:n.morphStyle,ignoreActive:n.ignoreActive,idMap:Ct(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:N,afterNodeAdded:N,beforeNodeMorphed:N,afterNodeMorphed:N,beforeNodeRemoved:N,afterNodeRemoved:N},n.callbacks),head:Object.assign({style:"merge",shouldPreserve:r=>r.getAttribute("im-preserve")==="true",shouldReAppend:r=>r.getAttribute("im-re-append")==="true",shouldRemove:N,afterHeadMorphed:N},n.head)}}function Pe(t,e,n){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:V(n,t,e)>0:!1}function X(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function Ne(t,e,n){for(;t!==e;){const r=t;if(t=t?.nextSibling,!r)throw new Error("tempNode is null");$e(r,n)}return $(n,e),e.nextSibling}function Tt(t,e,n,r,s){const o=V(s,n,e);let i=null;if(o>0){i=r;let a=0;for(;i!=null;){if(Pe(n,i,s))return i;if(a+=V(s,i,t),a>o)return null;i=i.nextSibling}}return i}function At(t,e,n,r){let s=n,o=e.nextSibling,i=0;for(;s&&o;){if(V(r,s,t)>0)return null;if(X(e,s))return s;if(X(o,s)&&(i++,o=o.nextSibling,i>=2))return null;s=s.nextSibling}return s}const Me=new DOMParser;function Lt(t){const e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){const n=Me.parseFromString(t,"text/html");if(e.match(/<\/html>/))return J.add(n),n;{let r=n.firstChild;return r?(J.add(r),r):null}}else{const r=Me.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!r)throw new Error("content is null");return J.add(r),r}}function kt(t){if(t==null)return document.createElement("div");if(J.has(t))return t;if(t instanceof Node){const e=document.createElement("div");return e.append(t),e}else{const e=document.createElement("div");for(const n of[...t])e.append(n);return e}}function Pt(t,e,n){const r=[],s=[];for(;t;)r.push(t),t=t.previousSibling;for(;r.length>0;){const o=r.pop();s.push(o),e?.parentElement?.insertBefore(o,e)}for(s.push(e);n;)r.push(n),s.push(n),n=n.nextSibling;for(;r.length;)e?.parentElement?.insertBefore(r.pop(),e.nextSibling);return s}function Nt(t,e,n){let r=t.firstChild,s=r,o=0;for(;r;){let i=Mt(r,e,n);i>o&&(s=r,o=i),r=r.nextSibling}return s}function Mt(t,e,n){return X(t,e)?.5+V(n,t,e):0}function $e(t,e){$(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function $t(t,e){return!t.deadIds.has(e)}function It(t,e,n){return t.idMap.get(n)?.has(e)||!1}function $(t,e){const n=t.idMap.get(e);if(n)for(const r of n)t.deadIds.add(r)}function V(t,e,n){const r=t.idMap.get(e);if(!r)return 0;let s=0;for(const o of r)$t(t,o)&&It(t,o,n)&&++s;return s}function Ie(t,e){const n=t.parentElement,r=t.querySelectorAll("[id]");for(const s of r){let o=s;for(;o!==n&&o;){let i=e.get(o);i==null&&(i=new Set,e.set(o,i)),i.add(s.id),o=o.parentElement}}}function Ct(t,e){const n=new Map;return Ie(t,n),Ie(e,n),n}const ce="display",Ce="none",ue="important",Rt={prefix:"show",allowedModifiers:new Set([ue]),onLoad:t=>{const{el:e,modifiers:n,expressionFn:r,reactivity:s}=t;return s.effect(async()=>{const i=!!await r(t),u=n.has(ue)?ue:void 0;i?e.style.length===1&&e.style.display===Ce?e.style.removeProperty(ce):e.style.setProperty(ce,"",u):e.style.setProperty(ce,Ce,u)})}},Ot="intersects",Re="once",Oe="half",De="full",Dt={prefix:Ot,allowedModifiers:new Set([Re,Oe,De]),mustHaveEmptyKey:!0,onLoad:t=>{const{modifiers:e}=t,n={threshold:0};e.has(De)?n.threshold=1:e.has(Oe)&&(n.threshold=.5);const r=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&(t.expressionFn(t),e.has(Re)&&r.disconnect())})},n);return r.observe(t.el),()=>r.disconnect()}},He="prepend",xe="append",Fe=new Error("Target element must have a parent if using prepend or append"),Ht={prefix:"teleport",allowedModifiers:new Set([He,xe]),allowedTagRegexps:new Set(["template"]),bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,modifiers:n,expression:r}=t;if(!(e instanceof HTMLTemplateElement))throw new Error("el must be a template element");const s=document.querySelector(r);if(!s)throw new Error(`Target element not found: ${r}`);if(!e.content)throw new Error("Template element must have content");const o=e.content.cloneNode(!0);if(ne(o)?.firstElementChild)throw new Error("Empty template");if(n.has(He)){if(!s.parentNode)throw Fe;s.parentNode.insertBefore(o,s)}else if(n.has(xe)){if(!s.parentNode)throw Fe;s.parentNode.insertBefore(o,s.nextSibling)}else s.appendChild(o)}},xt={prefix:"scrollIntoView",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,allowedModifiers:new Set(["smooth","instant","auto","hstart","hcenter","hend","hnearest","vstart","vcenter","vend","vnearest","focus"]),onLoad:({el:t,modifiers:e})=>{t.tabIndex||t.setAttribute("tabindex","0");const n={behavior:"smooth",block:"center",inline:"center"};return e.has("smooth")&&(n.behavior="smooth"),e.has("instant")&&(n.behavior="instant"),e.has("auto")&&(n.behavior="auto"),e.has("hstart")&&(n.inline="start"),e.has("hcenter")&&(n.inline="center"),e.has("hend")&&(n.inline="end"),e.has("hnearest")&&(n.inline="nearest"),e.has("vstart")&&(n.block="start"),e.has("vcenter")&&(n.block="center"),e.has("vend")&&(n.block="end"),e.has("vnearest")&&(n.block="nearest"),t.scrollIntoView(n),e.has("focus")&&t.focus(),delete t.dataset.focus,()=>t.blur()}},Ve=document,je=!!Ve.startViewTransition,Ft=[Rt,Dt,Ht,xt,{prefix:"viewTransition",onGlobalInit(){let t=!1;if(document.head.childNodes.forEach(e=>{e instanceof HTMLMetaElement&&e.name==="view-transition"&&(t=!0)}),!t){const e=document.createElement("meta");e.name="view-transition",e.content="same-origin",document.head.appendChild(e)}},onLoad:t=>{if(!je){console.error("Browser does not support view transitions");return}return t.reactivity.effect(()=>{const{el:e,expressionFn:n}=t;let r=n(t);if(!r)return;const s=e.style;s.viewTransitionName=r})}}],Vt="Content-Type",jt="datastar-request",Bt="application/json",Ut="true",Y="datastar-",j=`${Y}indicator`,Q=`${j}-loading`,Be=`${Y}settling`,ee=`${Y}swapping`,Wt="self",qt=["get","post","put","patch","delete"].reduce((t,e)=>(t[e]=async(n,r)=>{const s=Document;if(!s.startViewTransition){await Ue(e,r,n);return}new Promise(o=>{s.startViewTransition(async()=>{await Ue(e,r,n),o(void 0)})})},t),{isFetching:async(t,e)=>{const n=document.querySelectorAll(e);return Array.from(n).some(r=>{r.classList.contains(Q)})}}),Gt=["selector","merge","settle","fragment","redirect","error"],A={MorphElement:"morph_element",InnerElement:"inner_element",OuterElement:"outer_element",PrependElement:"prepend_element",AppendElement:"append_element",BeforeElement:"before_element",AfterElement:"after_element",DeleteElement:"delete_element",UpsertAttributes:"upsert_attributes"},Kt=[{prefix:"header",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const e=t.store();e.fetch||(e.fetch={}),e.fetch.headers||(e.fetch.headers={});const n=e.fetch.headers,r=t.key[0].toUpperCase()+t.key.slice(1);return n[r]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{delete n[r]}}},{prefix:"fetchIndicator",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:()=>{const t=document.createElement("style");t.innerHTML=`
.${j}{
 opacity:0;
 transition: opacity 300ms ease-out;
}
.${Q} {
 opacity:1;
 transition: opacity 300ms ease-in;
}
`,document.head.appendChild(t)},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`),n=t.store();n.fetch||(n.fetch={}),n.fetch.indicatorSelectors||(n.fetch.indicatorSelectors={}),n.fetch.indicatorSelectors[t.el.id]=e;const r=document.querySelector(e.value);if(!r)throw new Error("No indicator found");return r.classList.add(j),()=>{delete n.fetch.indicatorSelectors[t.el.id]}})},{prefix:"isLoadingId",mustNotEmptyExpression:!0,onLoad:t=>{const e=t.expression,n=t.store();return n.fetch||(n.fetch={}),n.fetch.loadingIdentifiers||(n.fetch.loadingIdentifiers={}),n.fetch.loadingIdentifiers[t.el.id]=e,n.isLoading||(n.isLoading=t.reactivity.signal(new Set)),()=>{delete n.fetch.loadingIdentifiers[t.el.id]}}}];async function Ue(t,e,n){const r=n.store();if(!e)throw new Error(`No signal for ${t} on ${e}`);const s={...r.value};delete s.fetch;const o=JSON.stringify(s);let i=!1,a=n.el;const u=r.fetch?.indicatorSelectors?.[a.id]||null;if(u){const c=document.querySelector(u.value);c&&(a=c,a.classList.remove(j),a.classList.add(Q),i=!0)}const f=r.fetch?.loadingIdentifiers?.[a.id]||null;f&&(r.isLoading.value=new Set([...r.isLoading.value,f]));const l=new URL(e,window.location.origin);t=t.toUpperCase();const d={method:t,headers:{[Vt]:Bt,[jt]:Ut},onmessage:c=>{if(!c.event)return;let y="",b="morph_element",S="",p=500,m=!1;if(!c.event.startsWith(Y))throw new Error(`Unknown event: ${c.event}`);const h=c.data.trim().split(`
`);let w="";for(let v=0;v<h.length;v++){let _=h[v];if(!_?.length)continue;const L=_.split(" ",1)[0];if(Gt.includes(L)&&L!==w)switch(w=L,_=_.slice(L.length+1),w){case"selector":S=_;break;case"merge":if(b=_,!Object.values(A).includes(b))throw new Error(`Unknown merge option: ${b}`);break;case"settle":p=parseInt(_);break;case"fragment":m=!0;break;case"redirect":window.location.href=_;return;case"error":throw new Error(_);default:throw new Error("Unknown data type")}w==="fragment"&&(y+=_+`
`)}m&&(y?.length||(y="<div></div>"),Jt(n,S,b,y,p))},onclose:()=>{i&&setTimeout(()=>{a.classList.remove(Q),a.classList.add(j)},300),f&&setTimeout(()=>{const c=r.isLoading.value;c.delete(f),r.isLoading.value=new Set(c)},300)}};if(r.fetch?.headers?.value&&d.headers)for(const c in r.fetch.headers.value){const y=r.fetch.headers.value[c];d.headers[c]=y}if(t==="GET"){const c=new URLSearchParams(l.search);c.append("datastar",o),l.search=c.toString()}else d.body=o;await pt(l,d)}const We=document.createElement("template");function Jt(t,e,n,r,s){const{el:o}=t;We.innerHTML=r.trim();const i=We.content.firstChild;if(!(i instanceof Element))throw new Error("No fragment found");const a=e===Wt;let u;if(a)u=[o];else{const l=e||`#${i.getAttribute("id")}`;if(u=document.querySelectorAll(l)||[],!u)throw new Error(`No targets found for ${l}`)}const f=()=>{for(const l of u){l.classList.add(ee);const d=l.outerHTML;let c=l;switch(n){case A.MorphElement:const b=_t(c,i);if(!b?.length)throw new Error("No morph result");c=b[0];break;case A.InnerElement:c.innerHTML=i.innerHTML;break;case A.OuterElement:c.replaceWith(i);break;case A.PrependElement:c.prepend(i);break;case A.AppendElement:c.append(i);break;case A.BeforeElement:c.before(i);break;case A.AfterElement:c.after(i);break;case A.DeleteElement:setTimeout(()=>c.remove(),s);break;case A.UpsertAttributes:i.getAttributeNames().forEach(p=>{const m=i.getAttribute(p);c.setAttribute(p,m)});break;default:throw new Error(`Unknown merge type: ${n}`)}c.classList.add(ee),t.cleanupElementRemovals(l),t.applyPlugins(document.body),setTimeout(()=>{l.classList.remove(ee),c.classList.remove(ee)},s);const y=c.outerHTML;d!==y&&(c.classList.add(Be),setTimeout(()=>{c.classList.remove(Be)},s))}};je?Ve.startViewTransition(()=>f()):f()}const zt={setAll:async(t,e,n)=>{const r=new RegExp(e);t.walkSignals((s,o)=>r.test(s)&&(o.value=n))},toggleAll:async(t,e)=>{const n=new RegExp(e);t.walkSignals((r,s)=>n.test(r)&&(s.value=!s.value))},clipboard:async(t,e)=>{if(!navigator.clipboard)throw new Error("Clipboard API not available");await navigator.clipboard.writeText(e)}};function qe(t={},...e){const n=performance.now(),r=new we(t,...e);r.run();const s=performance.now();return console.log(`Datastar v${lt} loaded and attached to all DOM elements in ${s-n}ms`),r}function Ge(t={},...e){const n=Object.assign({},zt,qt,t),r=[...Kt,...Ft,...ft,...e];return qe(n,...r)}const Ke=window;return Ke.ds=Ge(),Ke.dispatchEvent(new CustomEvent("datastar-ready")),I.Datastar=we,I.runDatastarWith=qe,I.runDatastarWithAllPlugins=Ge,I.toHTMLorSVGElement=ne,Object.defineProperty(I,Symbol.toStringTag,{value:"Module"}),I}({});
//# sourceMappingURL=datastar.iife.js.map
