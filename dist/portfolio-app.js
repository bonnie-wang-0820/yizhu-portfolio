(() => {
  const {sections,projects}=window.portfolio;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link=(id,label,cls='')=>`<a class="${cls}" href="#project/${id}" data-project="${id}">${esc(label)}</a>`;
  const external=links=>(links||[]).map(l=>`<a class="external-link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} <span>↗</span></a>`).join('');
  document.querySelector('#navigation').innerHTML=sections.map(s=>`<div class="nav-group"><button class="nav-toggle" aria-expanded="false" aria-controls="nav-${s.id}">${s.label}<span>⌄</span></button><div class="dropdown" id="nav-${s.id}"><a href="#${s.id}">查看全部 ↘</a>${s.projects.map(id=>link(id,projects[id].title)).join('')}</div></div>`).join('');
  document.querySelector('#work').innerHTML=sections.map((s,i)=>`<section class="work-section" id="${s.id}" aria-labelledby="title-${s.id}"><div class="section-top"><span class="section-number">0${i+1}</span><h2 id="title-${s.id}">${s.label}</h2><span class="section-en">${s.english}</span></div><div class="project-grid">${s.projects.map(id=>{const p=projects[id];return `<article class="project-card ${p.portrait?'portrait-card':''}" data-id="${id}"><div class="card-media">${p.poster?`<img src="${p.poster}" alt="" loading="lazy">`:''}${p.preview?`<video src="${p.preview}" poster="${p.poster}" data-fallback="${p.previewFallback||''}" autoplay muted loop playsinline webkit-playsinline x5-playsinline="true" preload="metadata" aria-hidden="true"></video>`:''}</div><a class="card-hit" href="#project/${id}" data-project="${id}" aria-label="查看${esc(p.title)}项目详情"></a><div class="card-copy"><div class="card-meta"><span>${esc(p.date)}</span><span>${esc(p.type)}</span></div><h3>${link(id,p.title)}</h3><p class="card-summary">${esc(p.summary)}</p><p class="card-credit"><span>我的工作</span>${esc(p.credit)}</p>${p.award?`<p class="card-award">${esc(p.award)}</p>`:''}<div class="card-actions">${link(id,'查看项目 ↗','detail-link')}${external(p.links)}</div></div>${p.preview?`<button class="preview-toggle" aria-label="播放${esc(p.title)}动态预览">▶</button>`:''}<span class="card-order">${String(i+1).padStart(2,'0')} / ${String(s.projects.indexOf(id)+1).padStart(2,'0')}</span></article>`}).join('')}</div></section>`).join('');
  const dialog=document.querySelector('dialog'),content=document.querySelector('#project-content');let lastFocus,previousHash='';
  const video=(v)=>`<figure class="workflow-video"><video src="${esc(v.src)}" ${v.poster?`poster="${esc(v.poster)}"`:''} controls playsinline preload="metadata" aria-label="${esc(v.caption)}"></video><figcaption>${esc(v.caption)}</figcaption></figure>`;
  const carousel=(images,title)=>{if(!images?.length)return '';return `<div class="carousel" role="region" aria-roledescription="图片轮播" aria-label="${esc(title)}" tabindex="0" data-index="0"><div class="carousel-stage">${images.map((g,j)=>`<figure class="carousel-slide" ${j?'hidden inert':''} role="group" aria-label="${j+1} / ${images.length}"><a href="${g.src}" target="_blank" rel="noopener" aria-label="查看原图：${esc(g.caption)}"><img src="${g.src}" loading="lazy" alt="${esc(g.caption)}"></a><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div><div class="carousel-controls"><span class="image-hint">点击图片查看原图</span>${images.length>1?`<div class="carousel-dots" role="group" aria-label="选择图片，共 ${images.length} 张">${images.map((g,j)=>`<button class="carousel-dot" data-slide="${j}" aria-label="查看第 ${j+1} 张图片：${esc(g.caption)}" ${j===0?'aria-current="true"':''}><span></span></button>`).join('')}</div><div class="carousel-nav"><button class="carousel-autoplay" aria-label="暂停自动轮播">Ⅱ</button></div>`:''}<span class="carousel-count sr-only" aria-live="off">1 / ${images.length}</span></div></div>`};
  let carouselCleanups=[];
  function clearCarousels(){carouselCleanups.forEach(cleanup=>cleanup());carouselCleanups=[];}
  function initCarousels(){
    content.querySelectorAll('.carousel').forEach(c=>{
      const slides=[...c.querySelectorAll('.carousel-slide')],dots=[...c.querySelectorAll('.carousel-dot')],count=c.querySelector('.carousel-count'),toggle=c.querySelector('.carousel-autoplay');
      let enabled=!reduced.matches,visible=false,hovered=false,lastChange=Date.now(),touchStart,animations=[],animating=false,destroyed=false;
      function label(){if(!toggle)return;toggle.textContent=enabled?'Ⅱ':'▶';toggle.setAttribute('aria-label',enabled?'暂停自动轮播':'开启自动轮播');toggle.title=enabled?'暂停自动轮播':'开启自动轮播';count.setAttribute('aria-live',enabled?'off':'polite');}
      function goTo(next,direction=1){
        const previous=Number(c.dataset.index);next=(next+slides.length)%slides.length;
        if(animating||next===previous)return;
        const outgoing=slides[previous],incoming=slides[next];lastChange=Date.now();c.dataset.index=next;
        dots.forEach((dot,i)=>{if(i===next)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});
        count.textContent=`${next+1} / ${slides.length}`;
        incoming.hidden=false;incoming.inert=false;outgoing.inert=true;
        if(reduced.matches){outgoing.hidden=true;return;}
        animating=true;incoming.style.position='absolute';incoming.style.inset='0';
        const options={duration:360,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'};
        animations=[outgoing.animate([{transform:'translateX(0)'},{transform:`translateX(${-direction*100}%)`}],options),incoming.animate([{transform:`translateX(${direction*100}%)`},{transform:'translateX(0)'}],options)];
        Promise.all(animations.map(a=>a.finished)).then(()=>{if(destroyed)return;outgoing.hidden=true;incoming.style.position='';incoming.style.inset='';animations.forEach(a=>a.cancel());animations=[];animating=false;}).catch(()=>{});
      }
      const move=d=>goTo(Number(c.dataset.index)+d,d);
      label();
      toggle?.addEventListener('click',()=>{enabled=!enabled;lastChange=Date.now();label();});
      dots.forEach((dot,i)=>dot.addEventListener('click',()=>goTo(i,i<Number(c.dataset.index)?-1:1)));
      c.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-1:1)}});
      c.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hovered=true;});
      c.addEventListener('pointerleave',()=>{hovered=false;lastChange=Date.now();});
      c.addEventListener('focusout',()=>{lastChange=Date.now();});
      c.addEventListener('touchstart',e=>{touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
      c.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy))move(dx<0?1:-1);touchStart=null;lastChange=Date.now();},{passive:true});
      c.addEventListener('touchcancel',()=>{touchStart=null;});
      const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){lastChange=Date.now();c.querySelectorAll('img').forEach(img=>img.loading='eager');}},{root:dialog,threshold:.25});observer.observe(c);
      const timer=slides.length>1?setInterval(()=>{const focused=c.contains(document.activeElement)&&document.activeElement!==toggle;if(enabled&&visible&&!hovered&&!focused&&!touchStart&&!document.hidden&&dialog.open&&Date.now()-lastChange>=1000)move(1);},50):null;
      const motionChanged=()=>{enabled=!reduced.matches;lastChange=Date.now();label();};
      const visibilityChanged=()=>{lastChange=Date.now();};
      reduced.addEventListener('change',motionChanged);document.addEventListener('visibilitychange',visibilityChanged);
      carouselCleanups.push(()=>{destroyed=true;clearInterval(timer);animations.forEach(a=>a.cancel());observer.disconnect();reduced.removeEventListener('change',motionChanged);document.removeEventListener('visibilitychange',visibilityChanged);});
    });
  }
  function openProject(id){const p=projects[id];if(!p)return;if(!dialog.open){lastFocus=document.activeElement;previousHash=location.hash.startsWith('#project/')?'#work':location.hash;}
    clearCarousels();
    content.innerHTML=`<div class="detail-head"><p class="eyebrow">${esc(p.date)} <span>/</span> ${esc(p.type)}</p><h2 id="dialog-title">${esc(p.title)}</h2><p class="detail-summary">${esc(p.summary)}</p><dl class="detail-meta"><div><dt>我的工作</dt><dd>${esc(p.credit)}</dd></div><div><dt>工具与方法</dt><dd>${esc(p.tools)}</dd></div><div><dt>项目状态</dt><dd>${esc(p.status)}</dd></div></dl>${p.award?`<p class="detail-award">${esc(p.award)}</p>`:''}<div class="detail-links">${external(p.links)}</div></div>${p.video?`<div class="detail-player">${video({src:p.video,poster:p.poster,caption:p.videoCaption||'项目演示视频 · 点击播放'})}</div>`:''}<div class="workflow-header"><p class="eyebrow">PROCESS / 制作过程</p><p>${p.workflows.map((s,i)=>`<a href="#step-${id}-${i}" data-step="step-${id}-${i}">${String(i+1).padStart(2,'0')} ${esc(s.title)}</a>`).join('')}</p></div><div class="workflows">${p.workflows.map((s,i)=>`<section class="workflow-step" id="step-${id}-${i}"><div class="step-description"><span class="step-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(s.title)}</h3>${s.text.split('\n').map(t=>`<p>${esc(t)}</p>`).join('')}</div><div class="step-media">${carousel(s.images,s.title,i)}${s.clips?.length?`<div class="step-clips">${s.clips.map(video).join('')}</div>`:''}</div></section>`).join('')}</div><div class="detail-foot"><button class="close-dialog">返回作品集 ↑</button></div>`;
    if(!dialog.open)dialog.showModal();syncPreviews();document.body.style.overflow='hidden';dialog.scrollTop=0;document.querySelector('.dialog-top .close-dialog').focus();initCarousels();content.querySelectorAll('[data-step]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.getElementById(a.dataset.step).scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'})}));content.querySelectorAll('video').forEach(v=>{v.addEventListener('play',()=>content.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause()}));v.addEventListener('error',()=>{const n=document.createElement('p');n.className='detail-error';n.textContent='视频暂时无法加载，请刷新后重试。';v.after(n)},{once:true})});
  }
  function dismiss(){clearCarousels();content.querySelectorAll('video').forEach(v=>v.pause());dialog.close();document.body.style.overflow='';lastFocus?.focus({preventScroll:true});syncPreviews()}
  function closeProject(){if(!dialog.open)return;dismiss();history.replaceState(null,'',location.pathname+location.search+(previousHash||'#work'))}
  const closeNav=()=>document.querySelectorAll('.nav-group').forEach(g=>{g.classList.remove('open');g.classList.add('dismissed');g.querySelector('button').setAttribute('aria-expanded','false')});
  document.addEventListener('click',e=>{const target=e.target.closest('[data-project]');if(target){e.preventDefault();openProject(target.dataset.project);history.pushState(null,'',`#project/${target.dataset.project}`)}if(e.target.closest('.close-dialog'))closeProject();if(e.target.closest('.dropdown a')||!e.target.closest('.nav-group'))closeNav()});
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeProject()});dialog.querySelector('.dialog-brand').addEventListener('click',e=>{e.preventDefault();closeProject();document.querySelector('#top').scrollIntoView()});
  document.querySelectorAll('.nav-group').forEach(g=>{const b=g.querySelector('button');b.addEventListener('click',()=>{const was=g.classList.contains('open');closeNav();g.classList.toggle('open',!was);g.classList.toggle('dismissed',was);b.setAttribute('aria-expanded',String(!was))});g.addEventListener('mouseenter',()=>{g.classList.remove('dismissed');b.setAttribute('aria-expanded','true')});g.addEventListener('mouseleave',()=>b.setAttribute('aria-expanded',String(g.classList.contains('open'))));g.addEventListener('keydown',e=>{if(e.key==='Escape'){closeNav();b.focus()}})});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),previews=[...document.querySelectorAll('.card-media video')];
  const previewStates=new WeakMap();
  function shouldPlayPreview(v){
    const r=v.getBoundingClientRect();
    return (!reduced.matches||v.dataset.manualPlay==='true')&&!document.hidden&&!dialog.open&&!v.dataset.paused&&r.top<innerHeight&&r.bottom>0;
  }
  function labelPreview(v,playing){
    const b=previewStates.get(v).button;
    b.textContent=playing?'Ⅱ':'▶';
    b.setAttribute('aria-label',playing?'暂停动态预览':'播放动态预览');
  }
  function clearPreviewTimer(v){
    const state=previewStates.get(v);clearTimeout(state.timer);state.timer=null;
  }
  function stopFallback(v){
    const state=previewStates.get(v);
    if(state.fallback){state.image.src=state.poster;state.fallback=false;}
    v.style.opacity='';
  }
  function showFallback(v){
    const state=previewStates.get(v);
    if(!shouldPlayPreview(v)||!v.dataset.fallback||state.fallback)return;
    state.fallback=true;state.image.loading='eager';state.image.src=v.dataset.fallback;
    // Keep the video in layout so WebKit can still resume inline playback.
    v.style.opacity='0';labelPreview(v,true);
  }
  function syncPreview(v,retry=false){
    const state=previewStates.get(v);
    if(!shouldPlayPreview(v)){
      clearPreviewTimer(v);v.pause();stopFallback(v);labelPreview(v,false);return;
    }
    if(retry)state.blocked=false;
    if(state.blocked){showFallback(v);return;}
    if(!state.timer&&!state.fallback&&(v.paused||v.readyState<3)){
      state.timer=setTimeout(()=>{state.timer=null;if(v.paused||v.readyState<3)showFallback(v)},1800);
    }
    if(v.paused&&!state.pending){
      v.muted=true;
      state.pending=true;
      try{
        Promise.resolve(v.play()).catch(error=>{
          if(error.name!=='AbortError')state.blocked=true;
          showFallback(v);
        }).finally(()=>{state.pending=false;});
      }catch(error){state.pending=false;state.blocked=true;showFallback(v);}
    }
  }
  function syncPreviews(){previews.forEach(v=>syncPreview(v))}
  function retryPreviews(){previews.forEach(v=>syncPreview(v,true))}
  const observer=new IntersectionObserver(entries=>entries.forEach(({target})=>syncPreview(target)),{threshold:0});
  previews.forEach(v=>{
    v.muted=true;v.defaultMuted=true;v.playsInline=true;v.loop=true;
    const card=v.closest('.project-card'),button=card.querySelector('.preview-toggle'),image=card.querySelector('.card-media img');
    previewStates.set(v,{button,image,poster:image.getAttribute('src'),fallback:false,blocked:false,pending:false,timer:null});
    v.addEventListener('play',()=>{if(!shouldPlayPreview(v))v.pause();});
    v.addEventListener('playing',()=>{
      if(!shouldPlayPreview(v)){syncPreview(v);return;}
      clearPreviewTimer(v);stopFallback(v);labelPreview(v,true);
    });
    v.addEventListener('pause',()=>{
      if(shouldPlayPreview(v))showFallback(v);else labelPreview(v,false);
    });
    v.addEventListener('canplay',()=>syncPreview(v));
    button.addEventListener('click',()=>{
      const state=previewStates.get(v);
      if(!v.paused||state.fallback){v.dataset.paused='true';syncPreview(v)}
      else{delete v.dataset.paused;v.dataset.manualPlay='true';syncPreview(v,true)}
    });
    v.addEventListener('error',()=>{previewStates.get(v).blocked=true;showFallback(v)});
    observer.observe(v);
  });
  document.addEventListener('visibilitychange',syncPreviews);
  addEventListener('pageshow',retryPreviews);
  document.addEventListener('WeixinJSBridgeReady',retryPreviews);
  document.addEventListener('touchend',retryPreviews,{passive:true});
  document.addEventListener('pointerup',retryPreviews,{passive:true});
  document.addEventListener('keydown',retryPreviews);
  reduced.addEventListener('change',syncPreviews);
  syncPreviews();
  addEventListener('popstate',()=>{if(location.hash.startsWith('#project/'))openProject(location.hash.slice(9));else if(dialog.open)dismiss()});
  if(location.hash.startsWith('#project/'))openProject(location.hash.slice(9));
})();
