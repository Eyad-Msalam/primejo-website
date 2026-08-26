let DATA=null,current=0,slides=[],indexItems=[];
const state={lang:localStorage.getItem('primeLang')||'ar'};

async function loadContent(){
 const res=await fetch('content/home.json',{cache:'no-store'});
 if(!res.ok) throw new Error('Content load failed');
 DATA=await res.json(); render();
}
const t=(ar,en)=>state.lang==='ar'?ar:en;
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function render(){
 document.documentElement.lang=state.lang; document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';
 brandLogo.src=DATA.site.logo; footerLogo.src=DATA.site.logo; footerSlogan.textContent=DATA.site.slogan;
 const hero=DATA.hero.slides.map((s,i)=>`<div class="hero-slide${i===0?' active':''}" style="background-image:url('${s.image}')"></div>`).join('');
 const idx=DATA.hero.slides.map((_,i)=>`<div class="index-item${i===0?' active':''}">${String(i+1).padStart(2,'0')}</div>`).join('');
 const strip=DATA.services.map((s,i)=>`<a href="#services"><span class="strip-icon">${['▣','▤','⌂','✦','◈','◆'][i]}</span><b>${safe(t(s.title_ar,s.title_en))}</b><small>${safe(t(['لوحات وواجهات','رقمية وكبيرة الحجم','ستاندات وتجهيز','هوية وتطبيقات','هوية المساحات','هدايا ومواد ترويجية'][i],['Signs & Facades','Digital & Large Format','Stands & Setup','Identity & Applications','Space Branding','Gifts & Promo Items'][i]))}</small></a>`).join('');
 const serviceCards=DATA.services.map((s,i)=>`<article class="service-card"><div class="card-no">${String(i+1).padStart(2,'0')}</div><div class="card-icon">${['▣','▤','⌂','✦','◈','◆'][i]}</div><h3>${safe(t(s.title_ar,s.title_en))}</h3><p>${safe(t(s.desc_ar,s.desc_en))}</p></article>`).join('');
 const why=DATA.why.map((w,i)=>`<article><div class="why-icon">${['✦','◇','↗','◌','▦'][i]}</div><h3>${safe(t(w.title_ar,w.title_en))}</h3><p>${safe(t(w.desc_ar,w.desc_en))}</p></article>`).join('');
 const work=DATA.work.map((w,i)=>`<div class="work-card${i===0?' wide':''}"><img src="${w.image}" alt="${safe(t(w.title_ar,w.title_en))}"><div><small>${safe(w.category)}</small><strong>${safe(t(w.title_ar,w.title_en))}</strong></div></div>`).join('');
 document.getElementById('app').innerHTML=`
<section class="hero" id="home"><div class="hero-bg">${hero}</div><div class="hero-overlay"></div><div class="container hero-inner">
<div class="hero-copy"><div class="hero-kicker">PRIME • ADVERTISING SOLUTIONS</div><div id="heroText"></div><div class="hero-actions"><a class="primary-cta" href="#services">${t('استكشف خدماتنا →','Explore Services →')}</a><a class="secondary-cta" href="#work">${t('شاهد أعمالنا →','See Our Work →')}</a></div></div>
<div class="hero-index">${idx}</div><div class="hero-dots"><button class="arrow" id="prev">‹</button><div id="dots"></div><button class="arrow" id="next">›</button></div></div></section>
<section class="service-strip"><div class="container service-strip-grid">${strip}</div></section>
<section class="section services" id="services"><div class="container"><div class="section-head"><div class="eyebrow">WHAT WE DO</div><h2>${t('حلول إعلانية <span>متكاملة.</span>','Advertising solutions<br><span>built to perform.</span>')}</h2><p>${t('ست خدمات أساسية نركز فيها على الإبداع، الجودة والتنفيذ المتكامل.','Six core services focused on creativity, quality and complete execution.')}</p></div><div class="services-grid">${serviceCards}</div></div></section>
<section class="section about" id="about"><div class="container about-grid"><div class="about-visual"><img src="assets/hero/hero-main.jpg" alt="PRIME"><div class="about-overlay"></div><div class="about-mark">PRIME</div></div><div class="about-copy"><div class="eyebrow">ABOUT PRIME</div><h2>${t(DATA.about.title_ar,DATA.about.title_en)}</h2>${(t(DATA.about.body_ar,DATA.about.body_en)||[]).map(p=>`<p>${safe(p)}</p>`).join('')}<a class="outline-link" href="#profile">${t('اعرف أكثر عن PRIME →','Learn More About PRIME →')}</a></div></div></section>
<section class="section why" id="why"><div class="container"><div class="section-head center"><div class="eyebrow">WHY PRIME</div><h2>${t('ليش <span>PRIME؟</span>','Why choose <span>PRIME?</span>')}</h2></div><div class="why-grid">${why}</div></div></section>
<section class="section work" id="work"><div class="container"><div class="section-head"><div class="eyebrow">OUR WORK</div><h2>${t('أعمالنا <span>تتكلم.</span>','Our work<br><span>speaks for itself.</span>')}</h2><p>${t('أضف مشاريع PRIME الحقيقية من لوحة التحكم وارفع الصور مباشرة.','Add PRIME’s real projects from the CMS and upload project images directly.')}</p></div><div class="work-grid">${work}</div></div></section>
<section class="section profile" id="profile"><div class="container profile-box"><div><div class="eyebrow">COMPANY PROFILE</div><h2>${t(DATA.profile.title_ar,DATA.profile.title_en)}</h2><p>${safe(t(DATA.profile.body_ar,DATA.profile.body_en))}</p></div><a class="primary-cta" href="#contact">${t('طلب ملف الشركة →','Request Company Profile →')}</a></div></section>
<section class="section quote" id="quote"><div class="container quote-box"><div><div class="eyebrow">REQUEST A QUOTE</div><h2>${t('جاهز نبدأ<br><span>مشروعك؟</span>','Ready to start<br><span>your project?</span>')}</h2><p>${t('أرسل تفاصيل مشروعك وسنتواصل معك.','Send us your project details and we’ll get back to you.')}</p></div><form id="quoteForm"><div class="row"><input required placeholder="${t('الاسم الكامل','Full name')}"><input required placeholder="${t('رقم الهاتف','Phone number')}"></div><input type="email" placeholder="${t('البريد الإلكتروني','Email address')}"><select>${DATA.services.map(s=>`<option>${safe(t(s.title_ar,s.title_en))}</option>`).join('')}</select><textarea required placeholder="${t('تفاصيل المشروع','Project details')}"></textarea><button class="primary-cta" type="submit">${t('إرسال الطلب →','Send Request →')}</button></form></div></section>
<section class="section contact" id="contact"><div class="container contact-grid"><div><div class="eyebrow">CONTACT PRIME</div><h2>${t('خلينا نحوّل<br><span>فكرتك إلى واقع.</span>','Let’s turn your<br><span>idea into reality.</span>')}</h2></div><div class="contact-info"><a href="mailto:${safe(DATA.contact.email)}"><small>EMAIL</small><strong>${safe(DATA.contact.email)}</strong></a><a href="https://wa.me/962782003230" target="_blank" rel="noopener"><small>WHATSAPP</small><strong>${safe(DATA.contact.whatsapp)}</strong></a><a href="https://${safe(DATA.contact.website)}"><small>WEBSITE</small><strong>${safe(DATA.contact.website)}</strong></a></div></div></section>`;
 setupSlider();
 document.querySelector('.menu-toggle').onclick=()=>{const n=document.getElementById('nav');const o=n.classList.toggle('mobile-open');document.querySelector('.menu-toggle').setAttribute('aria-expanded',String(o))};
 document.getElementById('langBtn').onclick=()=>{state.lang=state.lang==='ar'?'en':'ar';localStorage.setItem('primeLang',state.lang);render()};
 document.getElementById('langBtn').textContent=state.lang==='ar'?'EN':'عربي';
 document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('mobile-open')));
 document.getElementById('quoteForm').onsubmit=e=>{e.preventDefault();alert(t('تم استلام طلبك مبدئيًا. سنربط النموذج بالواتساب والبريد لاحقًا.','Your request was received. We will connect the form to WhatsApp and email next.'));e.currentTarget.reset()};
 document.title=state.lang==='ar'?'PRIME Advertising Solutions | حلول الدعاية والإعلان في الأردن':'PRIME Advertising Solutions | Jordan';
}
function setupSlider(){
 slides=[...document.querySelectorAll('.hero-slide')]; indexItems=[...document.querySelectorAll('.index-item')];
 const dots=document.getElementById('dots');dots.innerHTML=DATA.hero.slides.map((_,i)=>`<button class="dot${i===0?' active':''}" data-i="${i}"></button>`).join('');
 dots.querySelectorAll('.dot').forEach(b=>b.onclick=()=>show(+b.dataset.i));
 document.getElementById('prev').onclick=()=>show(current-1);document.getElementById('next').onclick=()=>show(current+1);show(current);
}
function show(i){
 current=(i+slides.length)%slides.length;
 slides.forEach((s,n)=>s.classList.toggle('active',n===current));indexItems.forEach((x,n)=>x.classList.toggle('active',n===current));
 document.querySelectorAll('.dot').forEach((d,n)=>d.classList.toggle('active',n===current));
 const s=DATA.hero.slides[current];document.getElementById('heroText').innerHTML=`<h1>${state.lang==='ar'?s.title_ar:s.title_en}</h1><p>${state.lang==='ar'?s.text_ar:s.text_en}</p>`;
}
setInterval(()=>DATA&&show(current+1),6500);
loadContent().catch(()=>document.getElementById('app').innerHTML='<div style="padding:80px;text-align:center">Content load error. Check deployment.</div>');
