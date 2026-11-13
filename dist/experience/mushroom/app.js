import * as THREE from './vendor/three.module.js';
import { AcidPipeline } from './effects.js?v=3';
import { EmotionLiquid } from './emotion-liquid.js';
import { Journey, emotions } from './journey.js';
const $=id=>document.getElementById(id),status=msg=>{$('status').textContent=msg;$('status').classList.toggle('important',/失败|未授权|未找到|占用|未允许|重试|正在|读取/.test(msg));};
const state={id:0,volume:0,acid:0,motion:0,hand:new THREE.Vector2(.5,.5),loaded:[],camera:null,mic:null,recognizer:null,analyser:null,audio:null,lastFrame:-1,lastDetect:0,lastHand:null,candidate:'',since:0,rotation:0,tilt:0,zoom:6.3};
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:$('world'),antialias:false,powerPreference:'high-performance'});}catch(e){status('WebGL 初始化失败，请使用支持硬件加速的浏览器。');throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor(0x000000);
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(43,1,.1,100);camera.position.z=state.zoom;
const group=new THREE.Group();scene.add(group);
const uniforms={uTime:{value:0},uVolume:{value:0},uAcid:{value:0},uMotion:{value:0},uHand:{value:state.hand},uSize:{value:2.5},uFade:{value:1}};
const material=new THREE.ShaderMaterial({transparent:true,depthWrite:true,vertexColors:true,blending:THREE.NormalBlending,uniforms,vertexShader:`
uniform float uTime,uVolume,uAcid,uMotion,uSize,uFade; uniform vec2 uHand; varying vec3 vColor; varying float vAlpha;
float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
void main(){vec3 p=position;float h=hash(position);float t=uTime;
vec3 n=vec3(sin(p.y*4.+t*.8+h*6.28),cos(p.z*4.7+t*.7+h*5.),sin(p.x*4.3-t*.6+h*7.));
p=p*(1.+uVolume*.88)+n*uVolume*(.16+uVolume*.36);
float wave=sin(p.y*6.+t*2.+uHand.x*10.)*cos(p.x*5.-t+uHand.y*10.);
p+=uAcid*(.16+uMotion*.5)*vec3(wave,sin(p.z*7.+t*1.5),cos(p.y*5.-t));
vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(uSize*5./(-mv.z),.65,5.);
float luma=dot(color,vec3(.2126,.7152,.0722));vec3 vivid=clamp(mix(vec3(luma),color,1.55)*1.12,0.,1.);vColor=pow(vivid,vec3(2.2));vAlpha=uFade;
}`,fragmentShader:`varying vec3 vColor;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.48)discard;gl_FragColor=vec4(vColor,(1.-smoothstep(.32,.5,d))*vAlpha);}`});
let cloud=new THREE.Points(new THREE.BufferGeometry(),material);group.add(cloud);
const effects=new AcidPipeline(renderer);
const liquid=new EmotionLiquid(renderer);let lastStroke=null;
const journey=new Journey(j=>{
 document.body.dataset.phase=j.phase;lastStroke=null;
 cloud.visible=!['choose','done'].includes(j.phase);
 document.querySelectorAll('[data-id]').forEach(b=>{b.disabled=j.locked||!state.loaded[+b.dataset.id];if(j.phase==='choose'){b.classList.remove('active');b.setAttribute('aria-pressed','false');}});
 $('clearProgress').hidden=j.phase!=='clear';$('again').hidden=j.phase!=='done';
 if(j.locked)document.body.classList.remove('show-settings');
 if(j.phase==='choose'){$('stageLabel').textContent='01 / 看见你的情绪';$('headline').innerHTML='今天，<br>你感觉如何？';$('description').textContent='选择一种此刻的情绪。用手势召唤愿意倾听你的蘑菇。';$('narrationText').textContent='每一种情绪，都值得被听见。';$('phaseHint').textContent='可做出手势，也可点击下方情绪卡召唤';}
 if(j.phase==='speak'){$('stageLabel').textContent='02 / 让情绪被听见';$('headline').textContent=emotions[j.id].name+'，我在听。';$('description').textContent=emotions[j.id].line;$('narrationText').textContent='现在，请将你的情绪向它大声诉说，请用声音尽情发泄。';$('phaseHint').textContent='声音会让粒子扩散 · 持续发声，让情绪显形';}
 if(j.phase==='bloom'){liquid.reset(j.id);$('narrationText').textContent='你的情绪，正在显形。';$('phaseHint').textContent='';}
 if(j.phase==='clear'){$('narrationText').textContent='你的情绪已经被接收到了，现在你可以看见ta已经被具象化在了屏幕中，请你挥一挥手，擦掉这些情绪，向它告别吧';$('phaseHint').textContent='移动手掌拨开色彩 · 也可以移动鼠标或滑动屏幕';}
 if(j.phase==='farewell'||j.phase==='done'){$('narrationText').textContent='这一次，先让它们离开。';$('phaseHint').textContent=j.phase==='done'?'留一点安静，给现在的自己。':'';}
});
function summon(id){if(journey.locked||!state.loaded[id])return;select(id);journey.summon(id);}
function moveLiquid(x,y,source){if(journey.phase!=='clear'){lastStroke=null;return;}const p={x,y};if(lastStroke?.source===source&&performance.now()-lastStroke.time<250)liquid.stroke(lastStroke,p);lastStroke={...p,source,time:performance.now()};}
document.addEventListener('pointermove',e=>moveLiquid(e.clientX/innerWidth,1-e.clientY/innerHeight,'pointer'));
$('settings').onclick=()=>{const visible=getComputedStyle($('settingsPanel')).display!=='none';document.body.classList.toggle('show-settings',!visible);document.body.classList.toggle('settings-closed',visible);};
$('again').onclick=()=>{$('simulate').value=0;state.volume=0;state.acid=0;state.candidate='';liquid.reset();clearHistory();journey.reset();};
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();const s=renderer.getDrawingBufferSize(new THREE.Vector2());effects.resize(s.x,s.y);}
function clearHistory(){effects.clear();}
addEventListener('resize',resize);resize();
function geometry(data){const step=Number($('quality').value),count=Math.ceil(data.byteLength/16/step),p=new Float32Array(count*3),c=new Uint8Array(count*3),v=new DataView(data);for(let i=0,j=0;i<data.byteLength/16;i+=step,j++){for(let k=0;k<3;k++){p[j*3+k]=v.getFloat32(i*16+k*4,true);c[j*3+k]=v.getUint8(i*16+12+k);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));g.setAttribute('color',new THREE.BufferAttribute(c,3,true));g.computeBoundingSphere();$('points').textContent=`${count.toLocaleString()} / 500,000 POINTS`;return g;}
function select(id){if(journey.locked||!state.loaded[id])return;state.id=id;cloud.geometry.dispose();cloud.geometry=geometry(state.loaded[id]);uniforms.uFade.value=0;clearHistory();document.querySelectorAll('[data-id]').forEach(b=>{const active=+b.dataset.id===id;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});$('specNo').textContent=`SPECIMEN / 0${id+1}`;}
document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>summon(+b.dataset.id));
$('quality').onchange=()=>select(state.id);$('axis').onchange=()=>{cloud.rotation.set(0,0,0);if($('axis').value==='z')cloud.rotation.x=-Math.PI/2;if($('axis').value==='x')cloud.rotation.z=Math.PI/2;};
addEventListener('keydown',e=>{if(/INPUT|SELECT/.test(e.target.tagName))return;if('1234'.includes(e.key))summon(+e.key-1);});
let pointer=null;$('world').onpointerdown=e=>{pointer={x:e.clientX,y:e.clientY};$('world').setPointerCapture(e.pointerId);};$('world').onpointermove=e=>{state.hand.set(e.clientX/innerWidth,1-e.clientY/innerHeight);if(pointer&&!journey.locked){state.rotation+=(e.clientX-pointer.x)*.008;state.tilt+=(e.clientY-pointer.y)*.006;state.motion=Math.min(1,Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y)/25);pointer={x:e.clientX,y:e.clientY};}};$('world').onpointerup=()=>pointer=null;$('world').onpointercancel=()=>pointer=null;
$('world').addEventListener('wheel',e=>{e.preventDefault();state.zoom=THREE.MathUtils.clamp(state.zoom+e.deltaY*.004,3.5,12);},{passive:false});
$('reset').onclick=()=>{$('simulate').value=0;$('gain').value=5;$('threshold').value=.48;$('particleSize').value=2.5;$('acidStrength').value=1;$('quality').value='1';select(state.id);$('rotate').checked=true;state.rotation=0;state.tilt=0;state.zoom=6.3;clearHistory();};
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{status('当前浏览器未允许全屏。');}};
function deviceError(e,kind){const map={NotAllowedError:'权限未授权，请在浏览器地址栏允许访问',NotFoundError:'未找到可用设备',NotReadableError:'设备被其他程序占用',SecurityError:'请通过 localhost 或 HTTPS 打开'};status(`${kind}：${map[e.name]||e.message}。仍可使用手动体验。`);}
let cameraBusy=false,micBusy=false;
async function toggleCamera(){if(cameraBusy)return;if(state.camera){state.camera.getTracks().forEach(t=>t.stop());state.camera=null;$('video').srcObject=null;$('cameraBtn').textContent='开启摄像头';$('cameraLabel').textContent='摄像头已关闭';$('gesture').textContent='等待手势';$('hand').getContext('2d').clearRect(0,0,$('hand').width,$('hand').height);return;}cameraBusy=true;$('cameraBtn').disabled=true;try{status('正在加载手势识别模型…');if(!state.recognizer){const {FilesetResolver,GestureRecognizer}=await import('./vendor/vision_bundle.mjs');const vision=await FilesetResolver.forVisionTasks('./vendor/wasm');state.recognizer=await GestureRecognizer.createFromOptions(vision,{baseOptions:{modelAssetPath:'./assets/gesture_recognizer.task',delegate:'CPU'},runningMode:'VIDEO',numHands:1,minHandDetectionConfidence:.55,minTrackingConfidence:.55});}state.camera=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:'user'},audio:false});$('video').srcObject=state.camera;await $('video').play();state.lastFrame=-1;$('cameraBtn').textContent='关闭摄像头';$('cameraLabel').textContent='手势识别已开启';status('保持手势片刻切换蘑菇；移动手掌控制扰动。');}catch(e){if(state.camera){state.camera.getTracks().forEach(t=>t.stop());state.camera=null;}deviceError(e,'摄像头');}finally{cameraBusy=false;$('cameraBtn').disabled=false;}}
async function toggleMic(){if(micBusy)return;if(state.mic){state.mic.getTracks().forEach(t=>t.stop());state.mic=null;state.analyser=null;await state.audio?.close();state.audio=null;$('micBtn').textContent='开启麦克风';return;}micBusy=true;$('micBtn').disabled=true;try{state.mic=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:false,autoGainControl:false},video:false});state.audio=new AudioContext();await state.audio.resume();state.analyser=state.audio.createAnalyser();state.analyser.fftSize=1024;state.audio.createMediaStreamSource(state.mic).connect(state.analyser);$('micBtn').textContent='关闭麦克风';status('麦克风已开启，说话即可驱动粒子扩散。');}catch(e){state.mic?.getTracks().forEach(t=>t.stop());state.mic=null;deviceError(e,'麦克风');}finally{micBusy=false;$('micBtn').disabled=false;}}
$('cameraBtn').onclick=toggleCamera;$('micBtn').onclick=toggleMic;$('start').onclick=async()=>{$('start').disabled=true;if(!state.camera)await toggleCamera();if(!state.mic)await toggleMic();$('start').disabled=false;$('start').textContent='感官设置 / 重试 ↗';};
const gestureMap={Thumb_Up:0,Open_Palm:1,Thumb_Down:2,Closed_Fist:3},names=['拇指向上','五指张开','拇指向下','握拳'];
const edges=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];
function detect(now){const video=$('video');if(!state.camera||!state.recognizer||video.readyState<2||video.currentTime===state.lastFrame||now-state.lastDetect<85)return;state.lastFrame=video.currentTime;state.lastDetect=now;try{const r=state.recognizer.recognizeForVideo(video,now),hand=r.landmarks[0],g=r.gestures[0]?.[0];const canvas=$('hand');canvas.width=video.videoWidth;canvas.height=video.videoHeight;const ctx=canvas.getContext('2d');if(hand){ctx.strokeStyle='#d5fb82';ctx.lineWidth=2;for(const[a,b]of edges){ctx.beginPath();ctx.moveTo(hand[a].x*canvas.width,hand[a].y*canvas.height);ctx.lineTo(hand[b].x*canvas.width,hand[b].y*canvas.height);ctx.stroke();}const palm=hand[9];moveLiquid(THREE.MathUtils.clamp((1-palm.x-.15)/.7,0,1),THREE.MathUtils.clamp((1-palm.y-.15)/.7,0,1),'camera');if(state.lastHand)state.motion=Math.min(1,Math.hypot(palm.x-state.lastHand.x,palm.y-state.lastHand.y)*12);state.lastHand=palm;state.hand.lerp(new THREE.Vector2(1-palm.x,1-palm.y),.3);if(g&&g.score>.65&&g.categoryName in gestureMap){$('gesture').textContent=`${names[gestureMap[g.categoryName]]} ${Math.round(g.score*100)}%`;if(state.candidate!==g.categoryName){state.candidate=g.categoryName;state.since=now;}else if(now-state.since>350&&!journey.locked&&(journey.phase==='choose'||state.id!==gestureMap[g.categoryName]))summon(gestureMap[g.categoryName]);}else{state.candidate='';$('gesture').textContent='手势未确定';}}else{state.candidate='';state.lastHand=null;lastStroke=null;$('gesture').textContent='未检测到手';}}catch(e){status('手势识别暂时失败：'+e.message);}}
const samples=new Float32Array(1024);let last=performance.now();
function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now;let rms=0;if(state.analyser){state.analyser.getFloatTimeDomainData(samples);for(const v of samples)rms+=v*v;rms=Math.sqrt(rms/samples.length);}const level=Math.min(1,Math.max(0,rms-.006)*Number($('gain').value)*3);const desired=Math.max(level,Number($('simulate').value));state.volume=THREE.MathUtils.damp(state.volume,desired,desired>state.volume?12:5,dt);const threshold=+$('threshold').value;state.acid=THREE.MathUtils.damp(state.acid,THREE.MathUtils.smoothstep(state.volume,threshold,Math.min(1,threshold+.3)),6,dt);state.motion*=Math.exp(-dt*2);detect(now);
if($('rotate').checked)state.rotation+=dt*Math.PI/12;group.rotation.set(state.tilt,state.rotation,0);camera.position.z=THREE.MathUtils.damp(camera.position.z,state.zoom,8,dt);
uniforms.uTime.value=now/1000;uniforms.uVolume.value=journey.locked?Math.max(.65,state.volume):state.volume;uniforms.uAcid.value=journey.locked?1:state.acid;uniforms.uMotion.value=state.motion;uniforms.uFade.value=Math.min(1,uniforms.uFade.value+dt*2);
uniforms.uSize.value=Number($('particleSize').value);
if(journey.phase==='clear')liquid.update(dt);
journey.update(dt,state.volume,threshold,liquid.remaining);
if(journey.phase!=='done')effects.render(scene,camera,journey.locked?{...state,acid:1}:state,now/1000,dt,Number($('acidStrength').value));
else{renderer.setRenderTarget(null);renderer.clear();}
if(journey.phase==='bloom')liquid.render(now/1000,journey.elapsed/2.6,1,effects);
if(journey.phase==='clear'||journey.phase==='farewell')liquid.render(now/1000,1,journey.phase==='farewell'?1-journey.elapsed/1.8:1,effects);
if(journey.phase==='clear'){const progress=Math.min(100,Math.round((1-liquid.remaining)*100));$('progressText').textContent='已告别 '+progress+'%';$('progressFill').style.width=progress+'%';}
$('level').textContent=String(Math.round(state.volume*100)).padStart(2,'0');$('meter').style.width=`${state.volume*100}%`;document.querySelector('.meter em').style.left=`${threshold*100}%`;$('effect').textContent=state.acid>.05?'酸性扰动 · 激活':state.volume>.05?'共振 · 扩散':'静息 · 原生点云';$('liveDot').style.background=state.camera||state.mic?'#d5fb82':'#5a625a';}
requestAnimationFrame(animate);
async function load(){try{for(let i=0;i<4;i++){status(`读取蘑菇 ${i+1}/4 · 每株 50 万点`);const r=await fetch(`./assets/mushroom${i+1}.bin`);if(!r.ok)throw Error(`模型 ${i+1} 加载失败 (${r.status})`);state.loaded[i]=await r.arrayBuffer();document.querySelector('[data-id="'+i+'"]').disabled=journey.locked;}status('四株蘑菇已就绪。开启设备，或点击下方手动体验。');}catch(e){status(e.message+'，请刷新重试。');}}load();
addEventListener('pagehide',()=>{state.camera?.getTracks().forEach(t=>t.stop());state.mic?.getTracks().forEach(t=>t.stop());state.audio?.close();});
window.mushroomDebug={state,select,renderer,journey,liquid};
