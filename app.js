const tabs = [...document.querySelectorAll(".tab")];
const bead = document.getElementById("bead");
const beadIcon = document.getElementById("bead-icon");
const track = document.getElementById("dock-track");
const title = document.getElementById("page-title");
const tagline = document.getElementById("tagline");
const app = document.getElementById("app");

const pages = [
  { title:"Home", tagline:"Everything, in one surface.", color:"#c9f24a", rgb:"201,242,74" },
  { title:"Profile", tagline:"A little more about you.", color:"#8bd8ff", rgb:"139,216,255" },
  { title:"Messages", tagline:"Your conversations, in flow.", color:"#ffad35", rgb:"255,173,53" },
  { title:"Camera", tagline:"Capture the moment.", color:"#b49aff", rgb:"180,154,255" },
  { title:"Settings", tagline:"Fewer switches. Better defaults.", color:"#ff5d88", rgb:"255,93,136" }
];
let activeIndex = 0;
let dragging = false;

function centerFor(index) {
  const tab = tabs[index];
  const tabRect = tab.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  return tabRect.left - trackRect.left + tabRect.width / 2;
}
function moveBead(index, animate = true) {
  const x = centerFor(index) - bead.offsetWidth / 2;
  bead.style.transition = animate ? "" : "none";
  bead.style.left = `${x}px`;
  if (!animate) requestAnimationFrame(() => bead.style.transition = "");
}
function selectTab(index) {
  index = Math.max(0, Math.min(tabs.length - 1, index));
  activeIndex = index;
  const page = pages[index];
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    if (i === index) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
  title.style.opacity = "0";
  title.style.transform = "translateY(7px)";
  setTimeout(() => {
    title.textContent = page.title;
    tagline.textContent = page.tagline;
    title.style.opacity = "1";
    title.style.transform = "translateY(0)";
  }, 130);
  app.style.setProperty("--accent", page.color);
  app.style.setProperty("--accent-rgb", page.rgb);
  moveBead(index);
  beadIcon.style.maskImage = getComputedStyle(tabs[index].querySelector(".icon")).maskImage;
}
tabs.forEach((tab, index) => tab.addEventListener("click", () => selectTab(index)));

function nearestIndex(clientX) {
  let closest = 0, distance = Infinity;
  tabs.forEach((tab, i) => {
    const r = tab.getBoundingClientRect();
    const d = Math.abs(clientX - (r.left + r.width / 2));
    if (d < distance) { distance = d; closest = i; }
  });
  return closest;
}
bead.addEventListener("pointerdown", event => {
  dragging = true;
  bead.setPointerCapture(event.pointerId);
  bead.style.transition = "background .45s,box-shadow .45s";
});
bead.addEventListener("pointermove", event => {
  if (!dragging) return;
  const rect = track.getBoundingClientRect();
  const half = bead.offsetWidth / 2;
  const x = Math.max(half, Math.min(rect.width - half, event.clientX - rect.left));
  bead.style.left = `${x - half}px`;
});
function endDrag(event) {
  if (!dragging) return;
  dragging = false;
  selectTab(nearestIndex(event.clientX));
}
bead.addEventListener("pointerup", endDrag);
bead.addEventListener("pointercancel", endDrag);
window.addEventListener("resize", () => moveBead(activeIndex, false));
window.addEventListener("load", () => {
  moveBead(0, false);
  beadIcon.style.maskImage = getComputedStyle(tabs[0].querySelector(".icon")).maskImage;
});
