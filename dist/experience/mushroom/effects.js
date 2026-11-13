import * as THREE from './vendor/three.module.js';

// TD-inspired: feedback → blur → slope displacement → level → maximum.
// A separate colour stage keeps colour cycling out of the feedback energy field.
export class AcidPipeline {
  constructor(renderer) {
    this.renderer=renderer;
    this.scene=new THREE.Scene();
    this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
    this.quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2));this.scene.add(this.quad);
    const make=()=>new THREE.WebGLRenderTarget(1,1,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,depthBuffer:false});
    this.source=make();this.source.depthBuffer=true;
    this.energy=make();this.next=make();this.blurX=make();this.blurY=make();
    this.delays=[make(),make(),make()];this.tick=0;this.lastDelay=-1;
    const vertexShader='varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}';
    const shader=(uniforms,fragmentShader)=>new THREE.ShaderMaterial({uniforms,vertexShader,fragmentShader,depthTest:false,depthWrite:false});
    this.blur=shader({tex:{value:null},stepUV:{value:new THREE.Vector2()}},`
      varying vec2 vUv;uniform sampler2D tex;uniform vec2 stepUV;
      void main(){vec3 c=texture2D(tex,vUv).rgb*.227027;
      c+=(texture2D(tex,vUv+stepUV*1.384615).rgb+texture2D(tex,vUv-stepUV*1.384615).rgb)*.316216;
      c+=(texture2D(tex,vUv+stepUV*3.230769).rgb+texture2D(tex,vUv-stepUV*3.230769).rgb)*.070270;
      gl_FragColor=vec4(c,1.);}`);
    this.flow=shader({source:{value:this.source.texture},history:{value:null},blurred:{value:null},px:{value:new THREE.Vector2()},time:{value:0},acid:{value:0},motion:{value:0},hand:{value:new THREE.Vector2()},frameScale:{value:1}},`
      varying vec2 vUv;uniform sampler2D source,history,blurred;uniform vec2 px,hand;
      uniform float time,acid,motion,frameScale;
      float field(vec2 p){return dot(texture2D(blurred,p).rgb,vec3(.2126,.7152,.0722));}
      void main(){vec2 uv=vUv;vec2 grad=vec2(field(uv+vec2(px.x,0.))-field(uv-vec2(px.x,0.)),field(uv+vec2(0.,px.y))-field(uv-vec2(0.,px.y)));
      vec2 p=uv-hand;float radius=length(p);vec2 vortex=vec2(-p.y,p.x)*exp(-radius*radius*8.);
      vec2 flow=vec2(sin(uv.y*9.+sin(uv.x*7.+time*.23)+time*.36),cos(uv.x*8.+sin(uv.y*6.-time*.27)-time*.31));
      vec2 velocity=flow*.0013+vortex*(.002+motion*.015)+vec2(-grad.y,grad.x)*(.06+motion*.15)-grad*.04;
      vec2 q=.5+(uv-.5)/pow(1.005,frameScale*acid)-velocity*acid*frameScale;
      float inside=step(0.,q.x)*step(q.x,1.)*step(0.,q.y)*step(q.y,1.);
      vec3 old=mix(texture2D(history,q).rgb,texture2D(blurred,q).rgb,.10*acid)*inside;
      old=max(vec3(0.),old*pow(mix(.35,.998,acid),frameScale)-.002*frameScale);
      vec3 fresh=texture2D(source,uv).rgb;
      gl_FragColor=vec4(max(fresh,old),1.);}`);
    this.finish=shader({source:{value:this.source.texture},energy:{value:null},blurred:{value:null},delayA:{value:null},delayB:{value:null},px:{value:new THREE.Vector2()},time:{value:0},acid:{value:0},motion:{value:0},hand:{value:new THREE.Vector2()},strength:{value:1}},`
      varying vec2 vUv;uniform sampler2D source,energy,blurred,delayA,delayB;uniform vec2 px,hand;uniform float time,acid,motion,strength;
      float field(vec2 p){vec3 c=texture2D(blurred,p).rgb*.4;
      c+=(texture2D(blurred,p+vec2(px.x*4.,0.)).rgb+texture2D(blurred,p-vec2(px.x*4.,0.)).rgb+texture2D(blurred,p+vec2(0.,px.y*4.)).rgb+texture2D(blurred,p-vec2(0.,px.y*4.)).rgb)*.15;
      return dot(c,vec3(.2126,.7152,.0722));}
      vec3 spectrum(float h){return .5+.5*cos(6.2831853*(h+vec3(0.,.33,.67)));}
      void main(){vec2 uv=vUv;float a=clamp(acid*strength,0.,1.);
      float f=field(uv);vec2 g=vec2(field(uv+vec2(px.x,0.))-field(uv-vec2(px.x,0.)),field(uv+vec2(0.,px.y))-field(uv-vec2(0.,px.y)));
      vec2 displacement=g*(.12+motion*.20)*a;
      vec2 q=uv+displacement;vec3 current=texture2D(energy,q).rgb;
      vec3 delayed=vec3(current.r,texture2D(delayA,q-displacement*.55).g,texture2D(delayB,q+displacement*.8).b);
      float density=dot(mix(current,delayed,.5),vec3(.2126,.7152,.0722));
      float edge=length(g)*30.;
      float phase=f*2.8+sin(q.x*6.+q.y*4.+time*.15)*.28-time*.08+hand.x*.35+hand.y*.2;
      vec3 film=pow(spectrum(phase),vec3(1.7));
      float bands=.6+.4*sin(f*32.-time*.8);
      vec3 liquid=film*(f*2.6+min(edge,.4)*.08)*(1.+bands*.3);
      liquid+=pow(spectrum(phase+.18),vec3(2.))*min(edge*edge,.3)*.05;
      // Light only exists where particles or their decaying feedback exist.
      float mask=smoothstep(.003,.035,max(f,density));
      liquid*=mask;
      vec3 natural=texture2D(source,uv).rgb;
      vec3 col=mix(natural,liquid+current*.025,a);
      col=max(col,vec3(0.));col=col/(1.+col*.3);
      gl_FragColor=vec4(col,1.);
      #include <colorspace_fragment>
      }`);
    this.copy=shader({tex:{value:null}},'varying vec2 vUv;uniform sampler2D tex;void main(){gl_FragColor=texture2D(tex,vUv);}');
  }
  pass(material,target){this.quad.material=material;this.renderer.setRenderTarget(target);this.renderer.render(this.scene,this.camera);}
  resize(w,h){this.source.setSize(w,h);this.w=Math.max(1,Math.round(w*.5));this.h=Math.max(1,Math.round(h*.5));for(const t of[this.energy,this.next,this.blurX,this.blurY,...this.delays])t.setSize(this.w,this.h);for(const m of[this.flow,this.finish])m.uniforms.px.value.set(1/this.w,1/this.h);this.clear();}
  clear(){for(const t of[this.energy,this.next,this.blurX,this.blurY,...this.delays]){this.renderer.setRenderTarget(t);this.renderer.clear();}this.renderer.setRenderTarget(null);this.lastDelay=-1;}
  render(scene,camera,state,time,dt,strength){
    this.renderer.setRenderTarget(this.source);this.renderer.render(scene,camera);
    this.blur.uniforms.tex.value=this.energy.texture;this.blur.uniforms.stepUV.value.set(2.8/this.w,0);this.pass(this.blur,this.blurX);
    this.blur.uniforms.tex.value=this.blurX.texture;this.blur.uniforms.stepUV.value.set(0,2.8/this.h);this.pass(this.blur,this.blurY);
    const u=this.flow.uniforms;u.history.value=this.energy.texture;u.blurred.value=this.blurY.texture;u.time.value=time;u.acid.value=state.acid;u.motion.value=state.motion;u.hand.value.copy(state.hand);u.frameScale.value=Math.min(dt*60,3);
    this.pass(this.flow,this.next);[this.energy,this.next]=[this.next,this.energy];
    const v=this.finish.uniforms;v.energy.value=this.energy.texture;v.blurred.value=this.blurY.texture;v.delayA.value=this.delays[(this.tick+2)%3].texture;v.delayB.value=this.delays[this.tick].texture;v.time.value=time;v.acid.value=state.acid;v.motion.value=state.motion;v.hand.value.copy(state.hand);v.strength.value=strength;
    this.pass(this.finish,null);
    // Sample history at 20 Hz, giving channels actual temporal separation.
    if(time-this.lastDelay>=.05){this.copy.uniforms.tex.value=this.energy.texture;this.pass(this.copy,this.delays[this.tick]);this.tick=(this.tick+1)%3;this.lastDelay=time;this.renderer.setRenderTarget(null);}
  }
}
