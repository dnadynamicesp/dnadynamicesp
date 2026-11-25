/* DNA Dynamic — theme engine v2. Loaded on index.html and on the 4 player pages. Look & feel only. */
(()=>{'use strict';
const KEY='dnaTheme',$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const PROFILE=document.body.classList.contains('dna-profile-body');
const TH=[['dna','DNA ORIGINAL','#e31b23'],['islamic','ISLAMIC','#d4a24a'],['spider','SPIDER-MAN','#ff3048'],['doom','DR DOOM','#4dff9a'],['stranger','STRANGER THINGS','#ff2e3a'],['naruto','NARUTO','#ffa21f'],['efootball','EFOOTBALL','#5ab0ff'],['gta','GTA VI','#ff6fae'],['f1','FORMULA 1','#ff3a2e']];
if(!document.getElementById('thFonts')){const l=document.createElement('link');l.id='thFonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@500;700&family=Staatliches&family=Teko:wght@500;700&family=Rajdhani:wght@600;700&family=Bebas+Neue&family=Saira+Condensed:wght@600;800&family=Cormorant+Garamond:wght@600;700&family=Amiri:wght@400;700&display=swap';document.head.appendChild(l)}
/* ---------- small art (runner icons, canvas spiders, naruto) ---------- */
const L=(a)=>a.map(d=>`<g class="leg"><path d="${d}"/></g>`).join('');
const SP=`<svg viewBox="-24 -24 48 48"><g stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round">${L(['M-4-3Q-12-14-19-13','M-5-1Q-17-6-23-2','M-5 2Q-17 6-22 12','M-4 4Q-10 14-15 20','M4-3Q12-14 19-13','M5-1Q17-6 23-2','M5 2Q17 6 22 12','M4 4Q10 14 15 20'])}</g><ellipse cy="3" rx="5" ry="7" fill="currentColor"/><circle cy="-6" r="3.4" fill="currentColor"/></svg>`;
const DEMO=`<svg viewBox="-30 -30 60 60"><g fill="#1a0408" stroke="currentColor" stroke-width="1">${[0,72,144,216,288].map(a=>`<path transform="rotate(${a})" d="M0-5Q-10-16 0-28Q10-16 0-5Z"/>`).join('')}</g><circle r="6" fill="#000" stroke="currentColor"/></svg>`;
const VECNA=`<svg viewBox="-30 -34 60 70"><path d="M0-32C-17-32-23-12-21 8L-29 34H29L21 8C23-12 17-32 0-32Z" fill="#0a0306" stroke="currentColor" stroke-width="1.2"/><ellipse cy="-8" rx="9" ry="12" fill="#2b0b10"/><g stroke="currentColor" stroke-width=".8" fill="none"><path d="M-6-16L-2-8-7 0M5-16L1-6 6 2M0-20V-4M-9-4Q-4 4-8 10M9-4Q4 4 8 10"/></g><path d="M-4-10h3M2-10h3" stroke="#ff2e3a" stroke-width="2"/></svg>`;
const MASK=`<svg viewBox="-30 -34 60 68"><path d="M0-32C-20-32-26-10-24 12L-14 30H14L24 12C26-10 20-32 0-32Z" fill="#0b1a12" stroke="currentColor" stroke-width="1.2"/><path d="M-13-6L-3-2-4 3-14 0ZM13-6L3-2 4 3 14 0Z" fill="currentColor"/><path d="M0 2V16M-7 20H7M-5 24H5" stroke="currentColor" stroke-width="1.2"/></svg>`;
const SHUR=`<svg viewBox="-16 -16 32 32"><path d="M0-15L4-4 15 0 4 4 0 15-4 4-15 0-4-4Z" fill="currentColor"/><circle r="3.2" fill="#0a0912"/></svg>`;
const BALL=`<svg viewBox="-12 -12 24 24"><circle r="11" fill="#fff"/><path d="M0-5l4.6 3.4-1.8 5.4h-5.6l-1.8-5.4z" fill="#111"/><path d="M0-11v6M10-3l-5 1M6 9L3 4M-6 9l3-5M-10-3l5 1" stroke="#111" stroke-width="1"/></svg>`;
const CAR=`<svg viewBox="0 0 64 26"><path d="M1 17h9l7-7h13l5 5h22l5 4v3H1z" fill="currentColor"/><path d="M60 8h3v9h-3zM46 12h8" stroke="#fff" stroke-width="1.5"/><circle cx="15" cy="20" r="5.2" fill="#111" stroke="#fff"/><circle cx="50" cy="20" r="5.2" fill="#111" stroke="#fff"/></svg>`;


function flayer(){let t='';for(let i=0;i<18;i++){const a=Math.PI*(1.05+i*.0585*1.0),x=500+Math.cos(a)*120,y=330+Math.sin(a)*70,r=250+Math.random()*320,tx=500+Math.cos(a)*r*1.5,ty=330+Math.sin(a)*r*.9+Math.random()*80,cx=500+Math.cos(a)*r*.6+(Math.random()-.5)*160,cy=330+Math.sin(a)*r*.5+Math.random()*120;t+=`<path d="M${x|0} ${y|0}Q${cx|0} ${cy|0} ${tx|0} ${ty|0}" stroke-width="${6+Math.random()*9|0}"/>`}
return `<svg viewBox="0 0 1000 700"><g style="transform-origin:500px 330px;animation:sway 11s ease-in-out infinite" fill="none" stroke="currentColor" stroke-linecap="round">${t}<ellipse cx="500" cy="330" rx="130" ry="95" fill="currentColor" stroke="none"/></g></svg>`}
function veins(){const w=innerWidth;let d='M0 11',x=0,br='';while(x<w){x+=14+Math.random()*10;const y=11+(Math.random()-.5)*8;d+=`L${x|0} ${y.toFixed(1)}`;if(Math.random()<.22){const s=Math.random()<.5?-1:1;let p=`M${x|0} ${y.toFixed(1)}`,cx=x,cy=y;for(let i=0;i<3;i++){cx+=5+Math.random()*6;cy+=s*(3+Math.random()*3);p+=`L${cx|0} ${cy.toFixed(1)}`}br+=`<path d="${p}"/>`}}
return `<svg width="${w}" height="22" viewBox="0 0 ${w} 22"><g fill="none" stroke="#ff2e3a" stroke-width="1.5" stroke-linecap="round" style="filter:drop-shadow(0 0 4px #ff2e3a)"><path d="${d}"/>${br}</g></svg>`}

const IM='images/themes/';
const LANT=`<svg viewBox="0 0 60 150"><defs><radialGradient id="lg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe3a0"/><stop offset=".6" stop-color="#f0a53a" stop-opacity=".75"/><stop offset="1" stop-color="#7a4a10" stop-opacity=".25"/></radialGradient></defs><path d="M30 0V46" stroke="#d4a24a" stroke-width="1.2"/><path d="M24 46h12l-2 8H26z" fill="#d4a24a"/><path d="M30 54C14 62 12 84 20 108H40C48 84 46 62 30 54Z" fill="url(#lg)" stroke="#d4a24a" stroke-width="1.6"/><path d="M30 56V108M21 70h18M19 88h22" stroke="#7a4a10" stroke-width=".9" opacity=".7"/><path d="M20 108h20l-3 8H23z" fill="#d4a24a"/><path d="M30 116v10" stroke="#d4a24a" stroke-width="1.4"/><circle cx="30" cy="130" r="3.5" fill="#d4a24a"/></svg>`;
const CRES=`<svg viewBox="0 0 32 32"><path d="M21 4a12 12 0 1 0 0 24 9.5 9.5 0 1 1 0-24z" fill="currentColor"/><path d="M25 9l1.3 2.9 3.1.3-2.3 2.1.7 3.1-2.8-1.6-2.8 1.6.7-3.1-2.3-2.1 3.1-.3z" fill="currentColor"/></svg>`;
const AYAH=`<div class="ay-frame"><img class="ay-icon" src="images/themes/islamic/rehal.webp" alt="" draggable="false"><span class="ay-kicker">A REMINDER FOR THE TEAM</span><p class="ay-ar" lang="ar" dir="rtl">وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا</p><p class="ay-en">“And hold firmly to the rope of Allah all together and do not become divided.”</p><p class="ay-ref">Surah Al-Imran · 3:103 · Sahih International</p></div>`;
const RI=f=>`<img src="${IM}${f}" alt="" draggable="false">`;
const RUN={spider:RI('spider/runner.webp'),doom:MASK,stranger:DEMO,naruto:SHUR,efootball:RI('efootball/ball.webp'),gta:CAR,f1:RI('f1/f1-car.webp'),islamic:CRES};
/* ---------- picture placement ---------- */
const mk=m=>`-webkit-mask-image:${m};mask-image:${m};`;
const MC=mk('radial-gradient(ellipse 50% 54% at 50% 48%,#000 42%,transparent 100%)'),
 ML=mk('linear-gradient(90deg,#000 15%,transparent 90%)'),MR=mk('linear-gradient(270deg,#000 15%,transparent 90%)'),
 MV=mk('radial-gradient(ellipse 85% 85% at 50% 50%,#000 25%,transparent 100%)'),MB=mk('linear-gradient(0deg,#000 20%,transparent 100%)'),
 MT=mk('linear-gradient(180deg,#000 55%,transparent 100%)'),MK=mk('linear-gradient(135deg,#000 20%,transparent 70%)'),
 SCR='mix-blend-mode:screen;',BG='left:0;top:0;width:100%;height:100%;object-fit:cover;';
/* hero.strip = characters standing to the right of the logo; hero.mini = small cards; sec = faint section backdrops; pg = player-page backdrops */
const SC={
islamic:{
 hero:[['islamic/landscape.jpg',BG+'opacity:.32;z-index:-2;'+MV]],
 strip:[['islamic/knight.jpg','height:92%;'+MC]],
 sec:[['.manifesto','islamic/calligraphy.jpg',BG+'opacity:.2;'+MR],['.vault-section','islamic/gold.jpg',BG+'opacity:.16;'+MV],['.arena-section','islamic/landscape.jpg',BG+'opacity:.14;'+ML],['.media-section','islamic/calligraphy.jpg',BG+'opacity:.18;'+MV],['.final-cta','islamic/gold.jpg',BG+'opacity:.34;'+MV],['.final-cta','islamic/emblem.jpg','left:4%;bottom:6%;width:150px;height:auto;opacity:.4;'+SCR]],
 pg:[['islamic/calligraphy.jpg',BG+'opacity:.22;'+MV],['islamic/landscape.jpg','left:0;bottom:0;width:100%;height:32%;object-fit:cover;opacity:.2;'+MB]]},
spider:{
 spots:[['spider/mini3.webp','.roster-section','b',66,5,1],['spider/mini4.webp','.arena-section','b',20,-6,1.05],['spider/mini5.webp','.updates-section','b',82,6,1]],
 hero:[['spider/web.jpg','left:0;top:0;width:min(30vw,420px);height:auto;opacity:.4;'+SCR+MK],['spider/hang.jpg','left:calc(var(--sl,60%) - 30px);top:0;height:40%;opacity:.95;animation:hangs 9s ease-in-out infinite;'+SCR],['spider/dropspider.jpg','right:3%;top:0;height:30%;animation:hangs 12s ease-in-out infinite -4s;'+SCR]],
 strip:[['spider/spiderman.jpg','height:92%;'+SCR+MC]],
 mini:[['spider/mini1.webp','free'],['spider/mini2.webp','free']],
 sec:[['.manifesto','spider/whitespider.jpg',BG+'opacity:.13;'+SCR+MR],['.vault-section','spider/hang2.jpg','right:5%;top:0;height:70%;width:auto;max-width:40%;object-fit:contain;opacity:.38;'+SCR+MT],['.media-section','spider/web.jpg',BG+'opacity:.14;'+SCR+MR],['.final-cta','spider/emblem.jpg',BG+'opacity:.22;object-fit:contain;'+SCR]],
 pg:[['spider/web.jpg','left:0;top:0;width:min(34vw,460px);height:auto;opacity:.5;'+SCR+MK],['spider/web.jpg','right:0;bottom:0;width:min(34vw,460px);height:auto;opacity:.45;transform:rotate(180deg);'+SCR+MK],['spider/hang.jpg','left:36%;top:0;height:300px;opacity:.9;animation:hangs 9s ease-in-out infinite;'+SCR]]},
doom:{
 band6:1,
 spots:[['doom/mini4.webp','.manifesto','b',16,-5,1.05],['doom/mini5.webp','.arena-section','t',72,5,1],['doom/mini6.webp','.media-section','b',58,-6,1]],
 strip:[['doom/doom1.jpg','height:92%;'+MC]],
 mini:[['doom/mini1.webp','free'],['doom/mini2.webp','free'],['doom/mini3.webp','free']],
 sec:[['.manifesto','doom/doom4.jpg',BG+'opacity:.13;'+MR],['.vault-section','doom/doom2.jpg',BG+'opacity:.2;'+MV],['.arena-section','doom/doom3.jpg',BG+'opacity:.2;'+ML],['.media-section','doom/doom4.jpg',BG+'opacity:.14;'+MV],['.final-cta','doom/doom3.jpg',BG+'opacity:.5;'+MV]],
 pg:[['doom/doom3.jpg',BG+'opacity:.22;'+MV],['doom/doom4.jpg','right:0;bottom:0;width:48%;height:70%;object-fit:cover;opacity:.12;'+MB]]},
stranger:{
 strip:[['stranger/vecna.webp','height:66%;opacity:.95;margin-right:-6%;filter:drop-shadow(0 0 20px #d4121c)'],['stranger/demogorgon.jpg','height:90%;'+SCR+MC]],
 mini:[['stranger/logo.jpg','sticker'],['stranger/demodraw.jpg','card']],
 sec:[['.arena-section','stranger/mindflayer2.jpg',BG+'opacity:.2;'+SCR+MV],['.tactics-section','stranger/kids.jpg',BG+'opacity:.2;object-position:50% 100%;'+SCR+MB],['.media-section','stranger/veins.jpg',BG+'opacity:.14;'+SCR+MV],['.final-cta','stranger/veins.jpg',BG+'opacity:.22;'+SCR+MV]],
 pg:[['stranger/veins.jpg',BG+'opacity:.2;'+SCR+MV],['stranger/kids.jpg','left:0;bottom:0;width:100%;height:34%;object-fit:cover;object-position:50% 100%;opacity:.18;'+SCR+MB]],bg:'stranger/mindflayer.jpg'},
gta:{
 hero:[['gta/palms.jpg',BG+'opacity:.42;z-index:-2;']],
 strip:[['gta/couple.jpg','height:92%;'+MC]],
 mini:[['gta/badge.webp','badge']],
 sec:[['.manifesto','gta/wide.jpg',BG+'opacity:.12;'+MR],['.arena-section','gta/closeup.jpg',BG+'opacity:.18;'+ML],['.media-section','gta/palms.jpg',BG+'opacity:.22;object-position:50% 70%;'+MV],['.final-cta','gta/closeup.jpg',BG+'opacity:.45;'+MV]],
 pg:[['gta/palms.jpg',BG+'opacity:.32;'+MV],['gta/wide.jpg','left:0;bottom:0;width:100%;height:30%;object-fit:cover;opacity:.2;'+MB]]},
f1:{
 spots:[['f1/mini1.webp','.roster-section','t',80,5,.95],['f1/mini2.webp','.vault-section','b',55,-5,1.05],['f1/mini3.webp','.tactics-section','b',12,6,1.05]],
 hero:[['f1/f1-car.webp','right:2%;bottom:150px;width:min(33vw,480px);height:auto;filter:drop-shadow(0 22px 30px #000c)']],
 mini:[['f1/leclerc.jpg','driver'],['f1/hamilton.jpg','driver']],
 sec:[['.vault-section','f1/leclerc.jpg',BG+'opacity:.14;object-position:50% 30%;'+MR],['.arena-section','f1/ferrari2.webp','right:0;bottom:0;width:min(62vw,860px);height:auto;opacity:.3;'],['.tactics-section','f1/mclaren.webp','left:0;bottom:0;width:min(56vw,760px);height:auto;opacity:.24;'],['.updates-section','f1/redbull.webp','right:0;bottom:0;width:min(56vw,760px);height:auto;opacity:.24;'],['.media-section','f1/mercedes2.webp','left:0;bottom:0;width:min(56vw,760px);height:auto;opacity:.24;'],['.final-cta','f1/hamilton.jpg',BG+'opacity:.3;object-position:50% 20%;'+ML]],
 pg:[['f1/ferrari2.webp','right:0;bottom:70px;width:min(58vw,800px);height:auto;opacity:.3;'],['f1/leclerc.jpg',BG+'opacity:.1;'+MR]]},
efootball:{
 spots:[['efootball/mini1.webp','.roster-section','b',14,-5,1.05],['efootball/mini2.webp','.arena-section','b',70,6,1],['efootball/mini3.webp','.updates-section','b',40,-6,1]],
 strip:[['efootball/raphinha.webp','height:86%;filter:drop-shadow(0 18px 24px #000b)']],
 mini:[['efootball/barca8.webp','free'],['efootball/messi10.webp','free'],['efootball/cr7.webp','free'],['efootball/messi.webp','free']],
 sec:[['.tactics-section','efootball/messi10.webp','right:3%;bottom:0;height:70%;width:auto;max-width:40%;object-fit:contain;opacity:.14;'],['.arena-section','efootball/barca8.webp','left:2%;bottom:0;height:66%;width:auto;max-width:40%;object-fit:contain;opacity:.12;'],['.final-cta','efootball/raphinha.webp','right:4%;bottom:0;height:80%;width:auto;max-width:45%;object-fit:contain;opacity:.22;'+ML]],
 pg:[['efootball/ball.webp','right:3%;bottom:110px;width:80px;height:auto;animation:bob 3.4s ease-in-out infinite;opacity:.8;']]},
naruto:{
 spots:[['naruto/mini1.webp','.manifesto','b',78,-6,1],['naruto/mini2.webp','.vault-section','b',8,5,1],['naruto/mini3.webp','.tactics-section','b',62,-4,1.05],['naruto/mini4.webp','.media-section','b',30,7,1]],
 strip:[['naruto/naruto1.webp','height:88%;filter:drop-shadow(0 16px 22px #000b)']],
 mini:[['naruto/pixel.webp','free'],['naruto/chibi.webp','free']],
 sec:[['.arena-section','naruto/chibi.webp','left:2%;bottom:0;height:60%;width:auto;max-width:40%;object-fit:contain;opacity:.13;'],['.final-cta','naruto/naruto1.webp','right:4%;bottom:0;height:80%;width:auto;max-width:45%;object-fit:contain;opacity:.2;'+ML]],
 pg:[['naruto/chibi.webp','right:3%;bottom:110px;height:110px;width:auto;opacity:.85;animation:bob 3.4s ease-in-out infinite;']]}};
const DECO={
islamic:[['right:33%;top:96px;width:54px;height:150px;transform-origin:50% 0;animation:swing 6s ease-in-out infinite;filter:drop-shadow(0 0 16px #f0a53a88)',LANT],['right:26%;top:96px;width:40px;height:112px;transform-origin:50% 0;animation:swing 7s ease-in-out infinite -2s;filter:drop-shadow(0 0 14px #f0a53a77)',LANT]],
gta:[['left:0;right:0;bottom:0;height:7%;opacity:.6','<div class="th-sea"></div><div class="th-sand"></div>']],
f1:[['left:9%;top:128px','<div class="rev">'+'<i></i>'.repeat(15)+'</div>']]};
const NARUTO_PG=[['left:3%;top:30%;width:150px;height:150px;opacity:.16;animation:spinS 9s linear infinite',SHUR],['right:4%;bottom:12%;width:110px;height:110px;opacity:.14;animation:spinS 7s linear infinite reverse',SHUR]];
const CARS=['mercedes','mclaren','redbull','ferrari2','mercedes2'];
/* ---------- state ---------- */
let cur='dna',cv,cx,parts=[],lastY=scrollY,dir=1;
const spImg=new Image();spImg.src='data:image/svg+xml;utf8,'+encodeURIComponent(SP.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" ').replace(/currentColor/g,'#e8ebf5'));
const run=document.createElement('b');run.className='run';
function img(css,f,cls){const im=new Image(),me=cur;im.className='th-deco th-img '+(cls||'');im.alt='';im.draggable=false;im.src=IM+f;return [im,me,css]}
function put(host,f,css,cls){if(!host)return;const [im,me]=img(css,f,cls);im.onload=()=>{if(me!==cur)return;im.style.cssText='position:absolute;pointer-events:none;user-select:none;z-index:-1;'+css;host.appendChild(im)}}
function layout(){const h=$('.hero');if(!h)return;const hr=h.getBoundingClientRect(),lg=h.querySelector('.hero-emblem>img'),em=h.querySelector('.hero-emblem');let r=lg&&lg.getBoundingClientRect();if(!r||r.width<40)r=em?em.getBoundingClientRect():null;let sl=r?r.right-hr.left+36:hr.width*.62;sl=Math.min(sl,hr.width-230);h.style.setProperty('--sl',Math.max(sl,hr.width*.5)+'px');const st=h.querySelector('.th-strip');if(st)st.classList.toggle('narrow',hr.width-sl<280)
 const fr=h.querySelector('.th-mini.free');if(fr){fr.style.transform='';fr.style.left='';if(innerWidth>760){const fh=fr.getBoundingClientRect();let mr=0;const y1=fh.top-4,y2=fh.top+170,cp=h.querySelector('.hero-copy');if(cp){const tw=document.createTreeWalker(cp,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){if(!n.textContent.trim())continue;const rg=document.createRange();rg.selectNodeContents(n);[...rg.getClientRects()].forEach(r=>{if(r.width>2&&r.bottom>y1&&r.top<y2)mr=Math.max(mr,r.right-hr.left)})}}
  const lf=Math.max(sl-430,mr+24),av=(sl-22)-lf,k=Math.min(1,av/370);fr.style.left=lf+'px';fr.style.transformOrigin='0 0';fr.style.transform='scale('+Math.max(k,.3)+')';fr.style.visibility=av<120?'hidden':''}}
}
function build(){
 $$('.th-deco').forEach(e=>e.remove());$$('.th-ayah').forEach(e=>e.remove());$$('.th-sp-t,.th-sp-b').forEach(e=>e.classList.remove('th-sp-t','th-sp-b'));const h0=$('.hero');if(h0)h0.classList.remove('th-cast');
 const sc=SC[cur]||{},hero=$('.hero'),line=$('#thLine');
 line.innerHTML='<i class="fill"></i><div class="vein"></div>';run.innerHTML=RUN[cur]||'';line.appendChild(run);if(cur==='stranger')line.querySelector('.vein').innerHTML=veins();
 const big=$('#thBig');big.innerHTML='';big.style.opacity=0;
 if(sc.bg){const i=new Image(),me=cur;i.onload=()=>{if(me!==cur)return;big.appendChild(i);big.style.opacity=1};i.src=IM+sc.bg}else if(cur==='stranger'){big.innerHTML=flayer();big.style.opacity=.12}
 const add=(host,css,html)=>{if(!host)return;const d=document.createElement('div');d.className='th-deco';d.style.cssText='position:absolute;'+css;d.innerHTML=html;host.appendChild(d);return d};
 if(PROFILE){const pg=$('.premium-profile');if(pg){(sc.pg||[]).forEach(([f,c])=>put(pg,f,c,'th-pg'));if(cur==='naruto')NARUTO_PG.forEach(([c,h])=>add(pg,c+';z-index:-1',h))}}
 else{
  (sc.hero||[]).forEach(([f,c])=>put(hero,f,c,'th-hr'+(/web|palms|f1-car|landscape/.test(f)?' keep':'')));
  if(hero)hero.classList.toggle('th-cast',!!(sc.strip||cur==='f1'));
  if(sc.strip&&hero){const d=add(hero,'z-index:-1','');d.classList.add('th-strip');sc.strip.forEach(([f,c])=>{const [im,me]=img(c,f,'th-sc');im.onload=()=>{if(me!==cur)return;im.style.cssText='flex:0 1 auto;min-width:0;max-width:100%;object-fit:contain;object-position:50% 100%;display:block;pointer-events:none;'+c;d.appendChild(im)}})}
  if(sc.mini&&hero){const row=add(hero,'','');row.classList.add('th-mini');if(sc.mini.every(m=>m[1]==='free'))row.classList.add('free');row.classList.add('n'+sc.mini.length);sc.mini.forEach(([f,k])=>{const c=document.createElement('div');c.className='mc '+k;const [im,me]=img('',f,'');im.className='';im.onload=()=>{if(me===cur)c.appendChild(im)};c.appendChild(document.createElement('i'));row.appendChild(c)})}
  (sc.sec||[]).forEach(([sel,f,c])=>put($(sel),f,c,'th-sec'));
  {const free=sc.mini&&sc.mini.every(m=>m[1]==='free'),mobile=innerWidth<761,list=mobile?[...(free?sc.mini.map(m=>m[0]):[]),...(sc.spots||[]).slice(0,sc.band6?9:1).map(s=>s[0])]:[],b6=!!sc.band6;
   if(list.length&&hero){const row=b6?Math.min(90,innerWidth*.28):Math.min(98,innerWidth*.25),rows=b6?3:(list.length<=3?1:2),cols=b6?2:Math.ceil(list.length/rows),box=add(hero,'z-index:2','');box.classList.add('th-mm');if(!free)box.classList.add('above');box.style.setProperty('--mmrows',rows);hero.style.setProperty('--row',row+'px');hero.style.setProperty('--mh',(rows*row+14+(free?0:112))+'px');
    const JX=[2,4,0,3,1,4,2,0],JY=[.02,.16,.06,0,.14,.04,.12,.18],RT=[-7,6,-4,8,-6,5,-8,4],SC2=[1,.9,1.05,.95,1.08,.92,1,.97];
    list.forEach((f,i)=>{const c=i%cols,r=Math.floor(i/cols),inRow=r===rows-1?list.length-cols*(rows-1):cols,off=(cols-inRow)/2,[im,me]=img('',f,'');im.className='';im.onload=()=>{if(me!==cur)return;const XS=[[8,64],[30,70],[10,56]],rw=Math.floor(i/2),kk=i%2;im.style.cssText=b6?`position:absolute;left:${XS[rw][kk]}%;top:calc(${rw}*${row}px + ${JY[i%8]*row*.6}px);height:${row*.74*SC2[i%8]}px;width:auto;max-width:28%;object-fit:contain;transform:rotate(${RT[i%8]}deg);filter:drop-shadow(0 6px 8px #000a);pointer-events:none;animation:fl${i%3+1} ${4.6+(i%4)*.6}s ease-in-out infinite -${i*.9}s`:`position:absolute;left:calc(${(c+off)}*100%/${cols} + ${4+JX[i%8]}px);top:calc(${r}*${row}px + ${JY[i%8]*row}px);height:${row*.74*SC2[i%8]}px;width:auto;max-width:calc(100%/${cols} - 14px);object-fit:contain;transform:rotate(${RT[i%8]}deg);filter:drop-shadow(0 6px 8px #000a);pointer-events:none;animation:fl${i%3+1} ${4.6+(i%4)*.6}s ease-in-out infinite -${i*.9}s`;box.appendChild(im)};im.src=IM+f})}}
  (sc.spots||[]).forEach(([f,sel,edge,x,rot,k],n)=>{const host=$(sel);if(!host)return;if(innerWidth<761&&(n===0||sc.band6))return;host.classList.add(edge==='t'?'th-sp-t':'th-sp-b');const [im,me]=img('',f,'th-spot');im.onload=()=>{if(me!==cur)return;const pb=parseFloat(getComputedStyle(host)[edge==='t'?'paddingTop':'paddingBottom'])||90,hh=Math.max(38,Math.min((innerWidth<761?68:92)*k,pb-26));im.style.cssText=`position:absolute;pointer-events:none;user-select:none;z-index:1;${edge==='t'?'top':'bottom'}:10px;left:${x}%;height:${hh}px;width:auto;max-width:24vw;object-fit:contain;transform:rotate(${rot}deg);filter:drop-shadow(0 8px 10px #000a);animation:fl${n%3+1} ${4.8+n%3*.7}s ease-in-out infinite -${n*1.3}s`;host.appendChild(im);requestAnimationFrame(()=>{const hw=host.clientWidth,w=im.offsetWidth,l=hw*x/100;if(l+w>hw-10)im.style.left=Math.max(6,hw-w-10)+'px'})}});
  if(cur==='islamic'){const m=$('.manifesto');if(m){const s=document.createElement('section');s.className='th-ayah';s.innerHTML=AYAH;m.insertAdjacentElement('afterend',s)}}
  (DECO[cur]||[]).forEach(([c,h])=>add(hero,c+';z-index:1',h));
  if(cur==='f1'&&hero){const w=add(hero,'left:0;bottom:70px;width:430px;z-index:1;animation:dash 7s linear infinite;filter:drop-shadow(0 0 18px #e1060099)','');const im=new Image();let k=0;im.style.cssText='width:100%;display:block';im.src=IM+'f1/'+CARS[0]+'.webp';w.appendChild(im);w.addEventListener('animationiteration',()=>{k=(k+1)%CARS.length;im.src=IM+'f1/'+CARS[k]+'.webp'})}
 }
 layout();seed();onScroll()}

function seed(){
 const W=innerWidth,H=innerHeight,r=Math.random;
 const mk2=(n,f)=>Array.from({length:n},()=>f());
 const C={
  spider:()=>[...mk2(9,()=>{const a=r()*6.28,v=.35+r()*.5;return{im:1,s:30+r()*26,x:r()*W,y:r()*H,vx:Math.cos(a)*v,vy:Math.sin(a)*v,a:.7,t:r()*6}}),...mk2(26,()=>({s:1+r()*1.4,x:r()*W,y:r()*H,vx:0,vy:-.1-r()*.15,a:.22,c:'#fff'}))],
  doom:()=>mk2(60,()=>({s:1+r()*2.2,x:r()*W,y:r()*H,vx:(r()-.5)*.4,vy:-.3-r()*.7,a:.4,c:'#4dff9a'})),
  stranger:()=>mk2(70,()=>({s:.8+r()*1.8,x:r()*W,y:r()*H,vx:(r()-.5)*.2,vy:-.05-r()*.25,a:.2,c:r()<.3?'#ff2e3a':'#ffffff'})),
  naruto:()=>[...mk2(14,()=>({g:'🍃',s:14+r()*10,x:r()*W,y:r()*H,vx:.4+r()*.7,vy:.3+r()*.6,a:.4})),...mk2(30,()=>({s:1+r()*2,x:r()*W,y:r()*H,vx:0,vy:-.3,a:.35,c:'#ffa21f'}))],
  efootball:()=>[...mk2(6,()=>({g:'⚽',s:14+r()*12,x:r()*W,y:r()*H,vx:(r()-.5)*.3,vy:-.15-r()*.25,a:.25})),...mk2(30,()=>({s:1.2,x:r()*W,y:r()*H,vx:0,vy:-.2,a:.22,c:'#5ab0ff'}))],
  gta:()=>mk2(50,()=>({s:1+r()*2.2,x:r()*W,y:r()*H,vx:(r()-.5)*.3,vy:-.25-r()*.5,a:.4,c:r()<.5?'#ff3d8b':'#ff9d3d'})),
  islamic:()=>[...mk2(56,()=>({s:.8+r()*1.8,x:r()*W,y:r()*H,vx:(r()-.5)*.15,vy:-.08-r()*.18,a:.35,c:'#f0c36e'})),...mk2(8,()=>({g:'✦',s:8+r()*8,x:r()*W,y:r()*H,vx:0,vy:-.05,a:.3}))],
  f1:()=>mk2(36,()=>({w:30+r()*90,s:1,x:r()*W,y:r()*H,vx:-9-r()*14,vy:0,a:.1+r()*.12,c:'#fff'}))};
 parts=(C[cur]||(()=>[]))()}
function frame(){
 const W=cv.width=innerWidth,H=cv.height=innerHeight;cx.clearRect(0,0,W,H);
 if(cur!=='dna'&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  for(const p of parts){p.x+=p.vx;p.y+=p.vy;if(p.y<-30)p.y=H+20;if(p.y>H+30)p.y=-20;if(p.x>W+40)p.x=-30;if(p.x<-140)p.x=W+20;
   cx.globalAlpha=p.a;if(p.im&&spImg.complete){p.t+=.02;const ang=Math.atan2(p.vy,p.vx)+1.57+Math.sin(p.t)*.12;cx.save();cx.translate(p.x,p.y);cx.rotate(ang);cx.drawImage(spImg,-p.s/2,-p.s/2,p.s,p.s);cx.restore()}else if(p.g){cx.font=p.s+'px serif';cx.fillText(p.g,p.x,p.y)}else if(p.w){cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.w,1)}else{cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.s,0,6.3);cx.fill()}}
  if(cur==='stranger'&&Math.random()<.003){cx.globalAlpha=.05;cx.fillStyle='#ff2e3a';cx.fillRect(0,0,W,H)}
 }
 requestAnimationFrame(frame)}
function onScroll(){
 const m=document.documentElement.scrollHeight-innerHeight,p=m>0?scrollY/m:0,line=$('#thLine');if(!line)return;
 const w=p*innerWidth;line.querySelector('.fill').style.width=w+'px';line.querySelector('.vein').style.width=w+'px';
 if(Math.abs(scrollY-lastY)>2){dir=scrollY>lastY?1:-1;lastY=scrollY}
 const sp=cur==='f1'?`scaleX(${-dir})`:cur==='efootball'||cur==='naruto'||cur==='doom'?`rotate(${p*2400}deg)`:`scaleX(${dir})`;
 run.style.left=w+'px';run.style.transform=sp;
 if(cur==='spider')run.style.top=(-13+Math.sin(p*180)*3)+'px';
 if(cur==='f1')$$('.rev i').forEach((e,i)=>e.className=i<p*15?(i<5?'g':i<10?'r':'b'):'');
 sfx('s')}
/* ---------- sound ---------- */
let ac,lastS=0,lastY2=0,lastH=0,ownSound=false;
try{ownSound=localStorage.getItem('dnaSound')==='1'}catch(_){}
const snd=()=>{const b=$('#soundToggle');return b?b.getAttribute('aria-pressed')==='true':ownSound};
function o(f,d,v=.03,w='sine',s=0,t=0){const c=ac||(ac=new (window.AudioContext||window.webkitAudioContext)());if(c.state==='suspended')c.resume();const n=c.currentTime+t,x=c.createOscillator(),g=c.createGain();x.type=w;x.frequency.setValueAtTime(f,n);if(s)x.frequency.exponentialRampToValueAtTime(Math.max(30,f+s),n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);x.connect(g);g.connect(c.destination);x.start(n);x.stop(n+d+.02)}
function pl(f,d,v=.03,t=0,w='triangle'){const c=ac||(ac=new (window.AudioContext||window.webkitAudioContext)());if(c.state==='suspended')c.resume();const n=c.currentTime+t,x=c.createOscillator(),g=c.createGain();x.type=w;x.frequency.value=f;g.gain.setValueAtTime(.0001,n);g.gain.linearRampToValueAtTime(v,n+.025);g.gain.exponentialRampToValueAtTime(.0001,n+d);x.connect(g);g.connect(c.destination);x.start(n);x.stop(n+d+.05)}
const S={
islamic:{k:()=>{pl(440,1,.03);pl(587.33,1.3,.02,.1,'sine')},h:()=>pl(880,.35,.01,0,'sine'),s:()=>pl(293.66,.9,.012,0,'sine')},
dna:{k:()=>{o(740,.06,.02,'triangle',360)},h:()=>o(1450,.02,.005),s:()=>o(310,.12,.012,'triangle',520)},
spider:{k:()=>{o(1100,.12,.04,'sawtooth',-900);o(200,.1,.03,'square',0,.05)},h:()=>o(1800,.03,.012),s:()=>o(260,.25,.02,'triangle',500)},
doom:{k:()=>{o(90,.35,.07,'sawtooth',-50);o(180,.2,.03,'square',-80,.04)},h:()=>o(140,.06,.02,'square'),s:()=>o(70,.4,.04,'sawtooth',40)},
stranger:{k:()=>{o(55,.6,.08);o(110,.5,.03,'triangle',-30,.1)},h:()=>o(880,.05,.01,'sine',-300),s:()=>o(48,.7,.05,'sine',20)},
naruto:{k:()=>{o(880,.08,.04,'triangle',500);o(1320,.1,.03,'triangle',0,.06)},h:()=>o(1500,.03,.012,'triangle'),s:()=>o(500,.18,.02,'sine',700)},
efootball:{k:()=>{o(2900,.09,.025,'sine',100);o(2900,.09,.025,'sine',100,.12)},h:()=>o(120,.05,.04),s:()=>o(180,.1,.03,'sine',-60)},
gta:{k:()=>{o(523,.07,.03,'square');o(784,.09,.03,'square',0,.07)},h:()=>o(1046,.03,.015,'square'),s:()=>o(330,.12,.02,'square',330)},
f1:{k:()=>o(110,.3,.05,'sawtooth',450),h:()=>o(600,.03,.015,'sawtooth'),s:()=>o(140,.3,.03,'sawtooth',300)}};
function sfx(t){if(!snd())return;const n=performance.now();if(t==='s'){if(n-lastS<450||Math.abs(scrollY-lastY2)<90)return;lastS=n;lastY2=scrollY}try{(S[cur]||S.dna)[t]()}catch(_){}}
window.dnaThemeSound=true;
/* ---------- theme switching ---------- */
let userPref='dark';try{userPref=localStorage.getItem('dna-theme')||'dark'}catch(_){}
function setTheme(id,user){
 cur=TH.some(t=>t[0]===id)?id:'dna';
 if(cur==='dna')delete document.body.dataset.theme;else document.body.dataset.theme=cur;
 if(PROFILE)document.documentElement.dataset.theme=cur==='dna'?(()=>{try{return localStorage.getItem('dna-theme')||'dark'}catch(_){return 'dark'}})():'dark';
 try{localStorage.setItem(KEY,cur)}catch(_){}
 $$('#thBar button[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t===cur));
 swapLogo();build();
 if(user){const sb=$('#soundToggle');if(sb){if(sb.getAttribute('aria-pressed')!=='true')sb.click()}else if(!ownSound)toggleOwn();sfx('k')}
}
function swapLogo(){$$('img[src$="dna-logo.png"],img[data-dnalogo]').forEach(i=>{if(!i.dataset.dnalogo)i.dataset.dnalogo=i.getAttribute('src');const o=i.dataset.dnalogo;i.src=cur==='dna'?o:o.replace(/images\/dna-logo\.png$|^dna-logo\.png$/,IM+(cur==='islamic'?'logo-gold.webp':'logo-light.webp'))})}
function toggleOwn(){ownSound=!ownSound;try{localStorage.setItem('dnaSound',ownSound?'1':'0')}catch(_){}const b=$('#thSound');if(b)b.textContent=ownSound?'SOUND ON':'SOUND OFF'}
function init(){
 const bar=document.createElement('div');bar.id='thBar';bar.innerHTML='<span class="th-label">CHOOSE YOUR WORLD</span>'+TH.map(t=>`<button data-t="${t[0]}" style="--c:${t[2]}"><i></i>${t[1]}</button>`).join('')+(PROFILE?`<button id="thSound" style="--c:#aab0b6">${ownSound?'SOUND ON':'SOUND OFF'}</button>`:'');document.body.prepend(bar);
 bar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='thSound'){toggleOwn();sfx('k');return}setTheme(b.dataset.t,true)});
 const line=document.createElement('div');line.id='thLine';const big=document.createElement('div');big.id='thBig';cv=document.createElement('canvas');cv.id='thCanvas';
 const ring=document.createElement('div'),dot=document.createElement('div');ring.id='thCur';dot.id='thDot';
 document.body.append(big,cv,line,ring,dot);cx=cv.getContext('2d');
 let mx=0,my=0,rx=0,ry=0;const HOT='a,button,.roster-card,.update-card,.trophy-model,.profile-social-link';
 addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`;const el=e.target.closest&&e.target.closest(HOT);ring.classList.toggle('hot',!!el);if(el){if(el!==lastH){lastH=el;sfx('h')}}else lastH=0},{passive:true});
 (function lerp(){rx+=(mx-rx)*.2;ry+=(my-ry)*.2;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(lerp)})();
 document.addEventListener('click',e=>{if(!e.target.closest('#thBar')&&e.target.closest(HOT))sfx('k')},{passive:true});
 addEventListener('scroll',onScroll,{passive:true});
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(build,250)});addEventListener('load',layout);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(layout);
 const lg=$('.hero-emblem>img');if(lg)lg.addEventListener('load',layout);
 let saved='dna';try{saved=localStorage.getItem(KEY)||'dna'}catch(_){}
 setTheme(saved,false);frame()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
