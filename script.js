const books=[
{t:"Pride and Prejudice",a:"Jane Austen",c:"Fiction",y:1813,av:true,col:"#7b5238",d:"Elizabeth Bennet navigates family, class and love in Regency England."},
{t:"Frankenstein",a:"Mary Shelley",c:"Fiction",y:1818,av:false,col:"#4f3524",d:"A young scientist creates life and must face the cost of his ambition."},
{t:"The Hobbit",a:"J. R. R. Tolkien",c:"Fiction",y:1937,av:true,col:"#6e4c34",d:"Bilbo Baggins leaves his quiet home for a dangerous quest with dwarves."},
{t:"A Brief History of Time",a:"Stephen Hawking",c:"Science",y:1988,av:true,col:"#5f4330",d:"A clear tour of black holes, the Big Bang and the nature of time."},
{t:"Cosmos",a:"Carl Sagan",c:"Science",y:1980,av:true,col:"#8c6a4a",d:"A journey through the universe and humanity’s place in it."},
{t:"The Selfish Gene",a:"Richard Dawkins",c:"Science",y:1976,av:false,col:"#a67b5b",d:"A gene’s-eye view of evolution that changed how we see life."},
{t:"Sapiens",a:"Yuval Noah Harari",c:"History",y:2011,av:true,col:"#7a5a3e",d:"A short history of humankind from the Stone Age to today."},
{t:"The Guns of August",a:"Barbara Tuchman",c:"History",y:1962,av:true,col:"#5a3f2c",d:"The first month of World War I, told with detail and drama."},
{t:"Clean Code",a:"Robert C. Martin",c:"Technology",y:2008,av:true,col:"#6b4a33",d:"Practical advice for writing code that others can read and change."},
{t:"The Pragmatic Programmer",a:"Hunt and Thomas",c:"Technology",y:1999,av:false,col:"#8a6244",d:"Habits and tips for becoming a better, more flexible developer."},
{t:"Charlotte’s Web",a:"E. B. White",c:"Kids",y:1952,av:true,col:"#a8815f",d:"A pig, a spider and a friendship on a quiet farm."},
{t:"Matilda",a:"Roald Dahl",c:"Kids",y:1988,av:true,col:"#7d5a40",d:"A gifted girl uses her mind to stand up to unkind adults."}];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2600)}
function card(i){const b=books[i];return `<button class="book" data-i="${i}"><div class="cover" style="--c:${["#ead8bb","#dfc39f","#f1e2c9","#d3b28b"][i%4]}"><span>${b.t}</span><small>${b.a}</small></div><h3>${b.t}</h3><span>${b.a}, ${b.y}</span><br><span class="tag ${b.av?"":"out"}">${b.av?"Available":"Borrowed"}</span></button>`}
function render(){
const q=$("#q").value.trim().toLowerCase(),c=$("#cat").value,s=$("#sort").value;
let ix=books.map((_,i)=>i).filter(i=>{const b=books[i];return(c==="All"||b.c===c)&&(b.t+" "+b.a).toLowerCase().includes(q)});
ix.sort((x,y)=>s==="y"?books[y].y-books[x].y:books[x].t.localeCompare(books[y].t));
$("#list").innerHTML=ix.map(card).join("");
$("#count").textContent=ix.length?ix.length+" book"+(ix.length>1?"s":"")+" found":"No books match your search. Try a different title or category."}
$("#featured").innerHTML=[8,3,6,2].map(card).join("");
["#q","#cat","#sort"].forEach(s=>$(s).addEventListener("input",render));render();
const pages=["home","catalog","services","events","membership","contact"];
function route(){let h=location.hash.slice(1);if(!pages.includes(h))h="home";
$$("section[data-page]").forEach(s=>s.classList.toggle("show",s.dataset.page===h));
$$("#nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+h));
document.title=(h==="home"?"":h[0].toUpperCase()+h.slice(1)+" | ")+"Y S Library";window.scrollTo(0,0)}
addEventListener("hashchange",route);route();
const dlg=$("#dlg");
document.addEventListener("click",e=>{
const bk=e.target.closest(".book");
if(bk){const b=books[bk.dataset.i];dlg.innerHTML=`<h2>${b.t}</h2><p><b>${b.a}</b> · ${b.c} · ${b.y}</p><p>${b.d}</p><p><span class="tag ${b.av?"":"out"}">${b.av?"Available now":"Currently borrowed"}</span></p><p><button class="btn" id="res">${b.av?"Reserve this book":"Join the waiting list"}</button> <button class="btn alt" id="cls">Close</button></p>`;
dlg.showModal();$("#res").onclick=()=>{dlg.close();toast(b.av?"Reserved. Collect it within 3 days.":"Added to the waiting list.")};$("#cls").onclick=()=>dlg.close();return}
const r=e.target.closest("[data-rsvp]");if(r){r.textContent="Seat saved";r.disabled=true;toast("Your seat is saved for "+r.dataset.rsvp+".")}});
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
function check(f,rules){let ok=true;rules.forEach(([id,fn,m])=>{const el=$(id),er=el.parentNode.querySelector(".err"),bad=!fn(el.value.trim());er.textContent=bad?m:"";ok=ok&&!bad});return ok}
const em=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),ne=v=>v.length>1;
$("#join").addEventListener("submit",e=>{e.preventDefault();if(check(e.target,[["#jn",ne,"Please enter your full name."],["#je",em,"Enter a valid email, like name@mail.com."]])){toast("Welcome, "+$("#jn").value.trim()+"! Your "+$("#jp").value+" card is on its way.");e.target.reset()}});
$("#msg").addEventListener("submit",e=>{e.preventDefault();if(check(e.target,[["#mn",ne,"Please enter your name."],["#me",em,"Enter a valid email, like name@mail.com."],["#mm",v=>v.length>9,"Write at least 10 characters."]])){toast("Message sent. We reply within two days.");e.target.reset()}});
(function(){const p={};new Intl.DateTimeFormat("en-US",{timeZone:"Africa/Cairo",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date()).forEach(x=>p[x.type]=x.value);const d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(p.weekday),m=+p.hour*60+ +p.minute;let o=false;if(d<=4)o=m>=540&&m<1200;else if(d===6)o=m>=600&&m<960;$("#open").textContent=(o?"Open now":"Closed right now")+" (Cairo time)"})();
$("#theme").addEventListener("click",()=>{const r=document.documentElement,dk=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=dk?"light":"dark"});
