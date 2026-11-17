(() => {
 const pages={
  home:{title:"Home",subtitle:"Everything, on one surface.",color:"#a7ed4b",rgb:"167,237,75"},
  profile:{title:"Profile",subtitle:"A little space, just for you.",color:"#a9a0ff",rgb:"169,160,255"},
  messages:{title:"Messages",subtitle:"Three unread. All of them kind.",color:"#ffca4d",rgb:"255,202,77"},
  camera:{title:"Camera",subtitle:"Keep what catches your eye.",color:"#ff9a43",rgb:"255,154,67"},
  settings:{title:"Settings",subtitle:"Fewer switches. Better defaults.",color:"#f25d91",rgb:"242,93,145"}
 };
 const dock=document.querySelector("#dock"),bead=document.querySelector("#bead"),tabs=[...document.querySelectorAll(".tab")],title=document.querySelector("#pageTitle"),subtitle=document.querySelector("#pageSubtitle"),ambient=document.querySelector("#ambient"),dot=document.querySelector("#kickerDot");
 let active="home",dragging=false,pointerId=null;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function positionFor(key){
  const tab=tabs.find(t=>t.dataset.tab===key),dr=dock.getBoundingClientRect(),tr=tab.getBoundingClientRect();
  return tr.left+tr.width/2-dr.left;
 }
 function paint(key,animate=true){
  const p=pages[key];if(!p)return;
  active=key;
  document.documentElement.style.setProperty("--accent",p.color);
  document.documentElement.style.setProperty("--accent-rgb",p.rgb);
  bead.style.background=`radial-gradient(circle at 34% 25%,#ffffff99 0%,transparent 31%),${p.color}`;
  bead.style.boxShadow=`0 0 0 5px rgba(${p.rgb},.08),0 7px 18px rgba(${p.rgb},.27),inset 0 -3px 5px #0002`;
  if(!animate)title.classList.remove("switching");
  else title.classList.add("switching");
  window.setTimeout(()=>{title.textContent=p.title;subtitle.textContent=p.subtitle;title.classList.remove("switching")},animate?110:0);
  dot.style.background=p.color;
  ambient.style.background=`radial-gradient(ellipse,rgba(${p.rgb},.16),transparent 70%)`;
  tabs.forEach(t=>{let on=t.dataset.tab===key;t.classList.toggle("active",on);t.setAttribute("aria-selected",String(on))});
  bead.style.left=positionFor(key)+"px";
 }
 tabs.forEach(t=>t.addEventListener("click",()=>paint(t.dataset.tab)));
 function nearestTab(clientX){
  const dr=dock.getBoundingClientRect(),x=clamp(clientX-dr.left,0,dr.width);
  let best=tabs[0],dist=Infinity;
  tabs.forEach(t=>{const r=t.getBoundingClientRect(),d=Math.abs(clientX-(r.left+r.width/2));if(d<dist){dist=d;best=t}});
  return best;
 }
 bead.addEventListener("pointerdown",e=>{dragging=true;pointerId=e.pointerId;bead.setPointerCapture(pointerId);bead.style.transition="none";e.preventDefault()});
 bead.addEventListener("pointermove",e=>{if(!dragging)return;const r=dock.getBoundingClientRect();bead.style.left=clamp(e.clientX-r.left,22,r.width-22)+"px"});
 function finishDrag(e){if(!dragging)return;dragging=false;bead.style.transition="";const tab=nearestTab(e.clientX);paint(tab.dataset.tab)}
 bead.addEventListener("pointerup",finishDrag);bead.addEventListener("pointercancel",finishDrag);
 dock.addEventListener("keydown",e=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;e.preventDefault();let i=tabs.findIndex(t=>t.dataset.tab===active);if(e.key==="ArrowLeft")i=(i+tabs.length-1)%tabs.length;if(e.key==="ArrowRight")i=(i+1)%tabs.length;if(e.key==="Home")i=0;if(e.key==="End")i=tabs.length-1;tabs[i].focus();paint(tabs[i].dataset.tab)});
 window.addEventListener("resize",()=>{bead.style.transition="none";bead.style.left=positionFor(active)+"px";requestAnimationFrame(()=>bead.style.transition="")});
 paint("home",false);
})();