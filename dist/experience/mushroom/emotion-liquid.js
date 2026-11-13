import * as THREE from './vendor/three.module.js';

// Persistent coverage plus an advected velocity field: strokes open black space
// permanently, while the remaining film curls and ripples around each stroke.
export class EmotionLiquid {
  constructor(renderer){
    this.renderer=renderer;
    // Smooth only the colour-driving surface, never the ripple or clearing field.
    this.surfaceX=new THREE.WebGLRenderTarget(1,1,{depthBuffer:false});
    this.surfaceY=new THREE.WebGLRenderTarget(1,1,{depthBuffer:false});
    this.waveClock=0;this.waveIndex=0;this.lastWave=-1;this.ripples=Array.from({length:16},()=>new THREE.Vector4(.5,.5,-100,0));this.w=144;this.h=96;this.aspect=1;this.strokes=[];
    this.cover=new Float32Array(this.w*this.h);this.vx=new Float32Array(this.cover.length);this.vy=new Float32Array(this.cover.length);
    this.nx=new Float32Array(this.cover.length);this.ny=new Float32Array(this.cover.length);
    this.bytes=new Uint8Array(this.cover.length*4);
    this.texture=new THREE.DataTexture(this.bytes,this.w,this.h,THREE.RGBAFormat);this.texture.minFilter=THREE.LinearFilter;this.texture.magFilter=THREE.LinearFilter;
    this.scene=new THREE.Scene();this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
    this.uniforms={ripples:{value:this.ripples},waveClock:{value:0},field:{value:this.texture},time:{value:0},reveal:{value:0},fade:{value:1},aspect:{value:1},hue:{value:0},energy:{value:null},soft:{value:null},particles:{value:null},px:{value:new THREE.Vector2(.001,.001)}};
    this.material=new THREE.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,uniforms:this.uniforms,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`
      varying vec2 vUv;uniform sampler2D field,energy,soft,particles;
      uniform float time,reveal,fade,aspect,hue,waveClock;uniform vec2 px;uniform vec4 ripples[16];
      // Independent RGB noise, warped by the mushroom feedback slope (TD noise3).
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
      float fbm(vec2 p){return noise(p)*.65+noise(p*2.03+17.)*.25+noise(p*4.07+31.)*.10;}
      float density(vec2 p){vec3 c=texture2D(soft,p).rgb*.28;
        c+=(texture2D(soft,p+vec2(.018,0.)).rgb+texture2D(soft,p-vec2(.018,0.)).rgb+texture2D(soft,p+vec2(0.,.018)).rgb+texture2D(soft,p-vec2(0.,.018)).rgb)*.12;
        c+=(texture2D(soft,p+vec2(.03,.03)).rgb+texture2D(soft,p-vec2(.03,.03)).rgb+texture2D(soft,p+vec2(-.03,.03)).rgb+texture2D(soft,p+vec2(.03,-.03)).rgb)*.06;
        return dot(c,vec3(.299,.587,.114));}
      vec3 colour(vec2 p){return vec3(fbm(p),fbm(p+vec2(8.2,1.3)),fbm(p+vec2(2.7,9.4)));}
      void main(){
        vec4 data=texture2D(field,vUv);vec2 velocity=(data.rg*255.-128.)/127.;
        vec2 rippleOffset=vec2(0.);
        for(int i=0;i<16;i++){
          float age=waveClock-ripples[i].z;
          vec2 delta=(vUv-ripples[i].xy)*vec2(aspect,1.);
          float distance=length(delta);
          float front=distance-age*.38;
          float envelope=exp(-front*front/ .008)*exp(-age*1.1)*step(0.,age);
          float wave=sin(front*56.)*envelope*ripples[i].w;
          rippleOffset+=delta/max(distance,.001)*wave*.045/vec2(aspect,1.);
        }
        vec2 waterUV=vUv+rippleOffset;
        float opening=smoothstep(0.,1.,reveal);
        // Enlarge the same mushroom surface rather than introducing a new pattern.
        vec2 q=mix(waterUV,vec2(.5,.59)+(waterUV-.5)*.34,opening);
        q-=velocity*.045;
        float f=density(q);
        vec2 g=vec2(density(q+vec2(.012,0.))-density(q-vec2(.012,0.)),density(q+vec2(0.,.012))-density(q-vec2(0.,.012)));
        vec2 p=vec2(waterUV.x*aspect,waterUV.y)*1.7;
        p+=vec2(time*.018,-time*.012)+hue;
        vec2 drift=vec2(fbm(p+3.),fbm(p+13.))-.5;
        // Large displacement and finely folded slope ridges reproduce TD's 2.5 / .02 chain.
        vec2 warp=p+drift*1.3+g*32.+vec2(f*2.5,density(q+vec2(.035,-.02))*2.5)*1.2+velocity*.75+rippleOffset*8.;
        vec3 rgb=colour(warp*1.25);
        rgb=smoothstep(vec3(.19),vec3(.78),rgb);
        float luminance=dot(rgb,vec3(.299,.587,.114));
        rgb=mix(vec3(luminance),rgb,.81);
        rgb=pow(max(rgb,vec3(0.)),vec3(.63));
        float edge=clamp(length(g)*18.,0.,1.);
        vec3 detail=colour(warp*2.+vec2(f,density(q+vec2(.02)))*5.);
        detail=smoothstep(vec3(.2),vec3(.72),detail);
        vec3 col=mix(rgb,detail,edge*.7);
        // Continuous colour surface: no raw particle grain or history shimmer.
        
        float wet=smoothstep(.015,.3,data.b);
        float spread=1.-smoothstep(opening*length(vec2(aspect,1.))-.12,opening*length(vec2(aspect,1.))+.02,length((vUv-.5)*vec2(aspect,1.)));
        gl_FragColor=vec4(col*wet*fade,spread);
      }`});
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),this.material));this.reset();
  }
  reset(id=0){this.waveClock=0;this.waveIndex=0;this.lastWave=-1;for(const r of this.ripples)r.set(.5,.5,-100,0);this.cover.fill(1);this.vx.fill(0);this.vy.fill(0);this.strokes=[];this.remaining=1;this.uniforms.hue.value=id*.13;this.upload();}
  stroke(a,b){const dx=b.x-a.x,dy=b.y-a.y;if(Math.hypot(dx*this.aspect,dy)<.002)return;this.strokes.push({a:{...a},b:{...b}});
    if(this.waveClock-this.lastWave>.07){this.ripples[this.waveIndex].set(b.x,b.y,this.waveClock,Math.min(1,Math.hypot(dx*this.aspect,dy)*30.+.3));this.waveIndex=(this.waveIndex+1)%16;this.lastWave=this.waveClock;}}
  sample(arr,x,y){x=Math.max(0,Math.min(this.w-1,x));y=Math.max(0,Math.min(this.h-1,y));const ix=Math.floor(x),iy=Math.floor(y),jx=Math.min(ix+1,this.w-1),jy=Math.min(iy+1,this.h-1),fx=x-ix,fy=y-iy;return(arr[iy*this.w+ix]*(1-fx)+arr[iy*this.w+jx]*fx)*(1-fy)+(arr[jy*this.w+ix]*(1-fx)+arr[jy*this.w+jx]*fx)*fy;}
  update(dt){
    this.waveClock+=dt;this.uniforms.waveClock.value=this.waveClock;const decay=Math.exp(-dt*1.8);
    for(let y=0;y<this.h;y++)for(let x=0;x<this.w;x++){const i=y*this.w+x,bx=x-this.vx[i]*dt*this.w,by=y-this.vy[i]*dt*this.h;this.nx[i]=this.sample(this.vx,bx,by)*decay;this.ny[i]=this.sample(this.vy,bx,by)*decay;}
    [this.vx,this.nx]=[this.nx,this.vx];[this.vy,this.ny]=[this.ny,this.vy];
    for(const {a,b} of this.strokes){const dx=(b.x-a.x)*this.aspect,dy=b.y-a.y,len2=dx*dx+dy*dy,len=Math.sqrt(len2),radius=.14;
      for(let y=0;y<this.h;y++)for(let x=0;x<this.w;x++){const i=y*this.w+x,px=(x/(this.w-1)-a.x)*this.aspect,py=y/(this.h-1)-a.y,t=Math.max(0,Math.min(1,(px*dx+py*dy)/len2)),ex=px-dx*t,ey=py-dy*t,d=Math.hypot(ex,ey),influence=Math.exp(-d*d/(radius*radius));
        this.vx[i]+=((dx/this.aspect)*5.+ex/this.aspect*.6)*influence;this.vy[i]+=(dy*5.+ey*.6)*influence;
        // Distance-based removal stays consistent across input frame rates.
        const cut=Math.max(0,1-d/radius);this.cover[i]*=Math.exp(-cut*cut*len*38.);
        if(this.cover[i]<.02)this.cover[i]=0;
      }
    }this.strokes.length=0;
    this.upload();
  }
  upload(){let sum=0;for(let i=0;i<this.cover.length;i++){sum+=this.cover[i];this.bytes[i*4]=Math.round((Math.max(-1,Math.min(1,this.vx[i]))*.5+.5)*255);this.bytes[i*4+1]=Math.round((Math.max(-1,Math.min(1,this.vy[i]))*.5+.5)*255);this.bytes[i*4+2]=Math.round(this.cover[i]*255);this.bytes[i*4+3]=255;}this.remaining=sum/this.cover.length;this.texture.needsUpdate=true;}
  render(time,reveal,fade=1,pipeline){this.uniforms.energy.value=pipeline.energy.texture;if(this.surfaceX.width!==pipeline.w||this.surfaceX.height!==pipeline.h){
      this.surfaceX.setSize(pipeline.w,pipeline.h);this.surfaceY.setSize(pipeline.w,pipeline.h);
    }
    let surface=pipeline.blurY.texture;
    for(let i=0;i<2;i++){
      pipeline.blur.uniforms.tex.value=surface;pipeline.blur.uniforms.stepUV.value.set(4/pipeline.w,0);pipeline.pass(pipeline.blur,this.surfaceX);
      pipeline.blur.uniforms.tex.value=this.surfaceX.texture;pipeline.blur.uniforms.stepUV.value.set(0,4/pipeline.h);pipeline.pass(pipeline.blur,this.surfaceY);
      surface=this.surfaceY.texture;
    }
    this.uniforms.soft.value=surface;this.uniforms.particles.value=pipeline.source.texture;this.uniforms.px.value.set(1/pipeline.w,1/pipeline.h);this.aspect=innerWidth/innerHeight;this.uniforms.aspect.value=this.aspect;this.uniforms.time.value=time;this.uniforms.reveal.value=reveal;this.uniforms.fade.value=fade;const old=this.renderer.autoClear;this.renderer.autoClear=false;this.renderer.setRenderTarget(null);this.renderer.render(this.scene,this.camera);this.renderer.autoClear=old;}
}
