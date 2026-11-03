// Ported verbatim from the incoming homepage design export.
// @ts-nocheck
export function motion(R: HTMLElement | null) {
  var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(rm||!R||!('IntersectionObserver' in window))return;
  var fine=window.matchMedia&&window.matchMedia('(pointer: fine)').matches;
  var cl=function(v,a,b){return Math.max(a,Math.min(b,v));};
  R.classList.add('js');
  var els=[].slice.call(R.querySelectorAll('.r,.wm'));
  els.forEach(function(el){
    var p=el.parentElement,sib=p?[].slice.call(p.children).filter(function(c){return c.classList.contains('r');}):[],i=sib.indexOf(el);
    if(i>0)el.style.setProperty('--d',(Math.min(i,6)*0.09).toFixed(2)+'s');
    if(el.classList.contains('pa')&&p&&p.classList.contains('gr'))el.classList.add('sc');
    else if(p&&p.classList.contains('gr')&&i===0&&el.classList.contains('s5'))el.classList.add('l');
  });
  var fired=false;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){fired=true;e.target.classList.add('rin');io.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -5% 0px'});
  els.forEach(function(el){io.observe(el);});
  setTimeout(function(){if(!fired)els.forEach(function(el){el.classList.add('rin');});},1500);
  var imgs=[].slice.call(R.querySelectorAll('.img'));
  var ln=R.querySelector('.ln'),steps=R.querySelector('.steps'),ticking=false,lastY=0,tm=0;
  function frame(e){
    ticking=false;
    var t=e&&e.target,sc=(t&&t!==document&&t.nodeType===1&&t.scrollHeight>t.clientHeight)?t:null;
    var y=sc?sc.scrollTop:(window.pageYOffset||0);
    var max=sc?sc.scrollHeight-sc.clientHeight:Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    R.style.setProperty('--sp',cl(y/Math.max(1,max),0,1).toFixed(4));
    R.style.setProperty('--sy',(y/1000).toFixed(3));
    R.style.setProperty('--vk',cl((y-lastY)*0.06,-6,6).toFixed(2)+'deg');
    lastY=y;clearTimeout(tm);tm=setTimeout(function(){R.style.setProperty('--vk','0deg');},140);
    var vh=window.innerHeight;
    imgs.forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom<-vh||r.top>vh*2)return;el.style.setProperty('--py',(((r.top+r.height/2)-vh/2)*-0.08).toFixed(1)+'px');});
    if(ln&&steps){var r=steps.getBoundingClientRect();ln.style.setProperty('--lp',cl((vh*0.8-r.top)/(r.height+vh*0.1),0,1).toFixed(3));[].slice.call(steps.children).forEach(function(c){c.classList.toggle('on',c.getBoundingClientRect().top<vh*0.8);});}
  }
  function onS(e){if(!ticking){ticking=true;requestAnimationFrame(function(){frame(e);});}}
  window.addEventListener('scroll',onS,true);window.addEventListener('resize',onS);frame();
  var vw=R.querySelector('.vwrap');
  if(fine&&vw){R.addEventListener('mousemove',function(e){var r=vw.getBoundingClientRect();if(r.bottom<0||r.top>window.innerHeight)return;vw.style.setProperty('--mx',cl((e.clientX-r.left-r.width/2)/r.width,-1,1).toFixed(3));vw.style.setProperty('--my',cl((e.clientY-r.top-r.height/2)/r.height,-1,1).toFixed(3));});}
  if(fine){[].slice.call(R.querySelectorAll('.b.by:not(.sm)')).forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.setProperty('--tx',((e.clientX-r.left-r.width/2)*0.22).toFixed(1)+'px');b.style.setProperty('--ty',((e.clientY-r.top-r.height/2)*0.3).toFixed(1)+'px');});b.addEventListener('mouseleave',function(){b.style.setProperty('--tx','0px');b.style.setProperty('--ty','0px');});});}
}
