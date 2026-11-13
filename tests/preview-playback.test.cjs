const {readFileSync,existsSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=readFileSync('dist/portfolio-app.js','utf8');
const controller=source.slice(source.indexOf('  const previewStates='),source.indexOf("  addEventListener('popstate'"));
function setup({blocked=false,reduced=false}={}){
  const events={},timers=new Map();let serial=0;
  const image={src:'poster.jpg',getAttribute(){return this.src}};
  const button={listeners:{},setAttribute(k,v){this[k]=v},addEventListener(k,f){this.listeners[k]=f}};
  const video={dataset:{fallback:'preview.webp'},style:{},paused:true,readyState:4,visible:true,blocked,attempts:0,listeners:{},
    getBoundingClientRect(){return this.visible?{top:100,bottom:500}:{top:900,bottom:1300}},
    closest(){return {querySelector:s=>s==='.preview-toggle'?button:image}},
    addEventListener(k,f){this.listeners[k]=f},
    pause(){if(!this.paused){this.paused=true;this.listeners.pause?.()}},
    play(){this.attempts++;if(this.blocked)return Promise.reject(Object.assign(new Error('blocked'),{name:'NotAllowedError'}));this.paused=false;this.listeners.play?.();if(!this.paused&&this.readyState>=3)this.listeners.playing?.();return Promise.resolve()}
  };
  const doc={hidden:false,addEventListener(k,f){events[k]=f}},dialog={open:false};
  const context=vm.createContext({WeakMap,Promise,previews:[video],reduced:{matches:reduced,addEventListener(){}},document:doc,dialog,innerHeight:800,
    IntersectionObserver:class{constructor(f){this.callback=f}observe(){}},
    setTimeout(f){const id=++serial;timers.set(id,f);return id},clearTimeout(id){timers.delete(id)},addEventListener(k,f){events[k]=f}});
  vm.runInContext(controller,context);
  return {video,image,button,doc,dialog,events,timers,sync:()=>vm.runInContext('syncPreviews()',context)};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));
(async()=>{
  const normal=setup();await flush();assert.equal(normal.video.paused,false);assert.equal(normal.image.src,'poster.jpg');assert.equal(normal.video.muted,true);
  normal.video.visible=false;normal.sync();assert.equal(normal.video.paused,true);
  normal.video.visible=true;normal.sync();await flush();assert.equal(normal.video.paused,false);
  const denied=setup({blocked:true});await flush();assert.equal(denied.image.src,'preview.webp');assert.equal(denied.button.textContent,'Ⅱ');
  denied.button.listeners.click();assert.equal(denied.image.src,'poster.jpg');assert.equal(denied.button.textContent,'▶');
  denied.events.touchend();await flush();assert.equal(denied.image.src,'poster.jpg','manual pause must survive touch retry');
  denied.button.listeners.click();await flush();assert.equal(denied.image.src,'preview.webp');
  denied.dialog.open=true;denied.sync();assert.equal(denied.image.src,'poster.jpg','dialog must stop animated fallback');
  denied.dialog.open=false;denied.sync();assert.equal(denied.image.src,'preview.webp');
  denied.video.blocked=false;denied.events.WeixinJSBridgeReady();await flush();assert.equal(denied.video.paused,false);assert.equal(denied.image.src,'poster.jpg');assert.equal(denied.video.style.opacity,'');
  denied.doc.hidden=true;denied.events.visibilitychange();assert.equal(denied.video.paused,true);
  const loading=setup();await flush();loading.video.pause();loading.video.readyState=1;loading.sync();for(const f of loading.timers.values())f();assert.equal(loading.image.src,'preview.webp');
  const quiet=setup({reduced:true});await flush();assert.equal(quiet.video.attempts,0);assert.equal(quiet.image.src,'poster.jpg');quiet.button.listeners.click();await flush();assert.equal(quiet.video.paused,false);
  const data={window:{}};vm.runInNewContext(readFileSync('dist/projects.js','utf8'),data);
  for(const project of Object.values(data.window.portfolio.projects))if(project.preview){assert.ok(project.previewFallback);assert.ok(existsSync('dist/'+project.previewFallback));}
  console.log('PASS: autoplay, denied fallback, pause/resume, viewport, details, WeChat retry, visibility, reduced motion, all 8 preview assets');
})().catch(error=>{console.error(error);process.exitCode=1});
