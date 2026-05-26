// ===============================
// FADE-UP OBSERVER (global scope)
// ===============================
function observeFadeUps() {
  const els = document.querySelectorAll(".fade-up");
  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => {
    el.classList.remove("visible");
    obs.observe(el);
  });
}

// ===============================
// LOAD COMPONENTS
// ===============================
async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// ===============================
// LOAD PAGE
// ===============================
async function showPage(page) {
  if (page === 'booking') {
    window.location.href = '/pages/booking.html';
    return;
  }
  loaderStart();
  const app = document.getElementById("app");
  const res = await fetch(`/pages/${page}.html`);
  const html = await res.text();
  app.innerHTML = html;

  history.pushState({ page }, "", `/${page}`);

  setTimeout(() => {
    observeFadeUps();
    if (page === 'about')      initAboutPage();
    if (page === 'home')       initHomePage();
    if (page === 'spabites')   initPawfeastPage();
    if (page === 'membership') initMemberPage();
    if (page === 'shop')       initShopPage();
    loaderDone();
  }, 50);

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.remove("active");
    if (a.dataset.page === page) a.classList.add("active");
  });

  const dropdownPages = ['blog', 'membership', 'contact'];
  const aboutParent = document.querySelector('.nav-item.dropdown > a');
  if (aboutParent) {
    if (dropdownPages.includes(page)) {
      aboutParent.classList.add('active');
    } else {
      aboutParent.classList.remove('active');
    }
  }

  window.scrollTo(0, 0);
}

// ===============================
// INIT (chỉ 1 DOMContentLoaded duy nhất)
// ===============================
window.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("navbar-container", "/components/navbar.html");
  await loadComponent("footer-container", "/components/footer.html");
  await loadComponent("promo-container",  "/components/promo.html");
  await loadComponent("chat-container",   "/components/chat.html");
  await loadComponent("auth-container",   "/components/auth.html");
  await loadComponent("cart-container",   "/components/cart.html");
  Cart.render();

  // Lấy page từ URL path
  const rawPath = location.pathname.replace(/^\//, '');
  const page = (rawPath === '' || rawPath === 'index.html') ? 'home' : rawPath;
  showPage(page);

  // Promo popup
  if (!sessionStorage.getItem("promoClosed")) {
    setTimeout(function () {
      const overlay = document.getElementById("promoOverlay");
      if (overlay) {
        overlay.classList.remove("hidden");
        startCountdown();
      }
    }, 1500);
  }

  const promoOverlay = document.getElementById("promoOverlay");
  if (promoOverlay) {
    promoOverlay.addEventListener("click", function (e) {
      if (e.target === this) closePromo();
    });
  }

  // Language switcher
  const langBtn  = document.getElementById('langBtn');
  const langDrop = document.querySelector('.lang-sel__drop');
  if (langBtn && langDrop) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('langSel').classList.toggle('open');
    });
    document.addEventListener('click', () => {
      document.getElementById('langSel')?.classList.remove('open');
    });
    langDrop.addEventListener('click', (e) => e.stopPropagation());
  }
});

// popstate khi nhấn Back/Forward
window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "home";
  showPage(page);
});

// ===============================
// ABOUT PAGE INIT
// ===============================
function initAboutPage() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=320&q=80',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=320&q=80',
    'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=320&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=320&q=80',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=320&q=80',
    'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=320&q=80',
  ];
  const track = document.getElementById('galleryTrack');
  if (track) {
    [...galleryImages, ...galleryImages].forEach((src) => {
      const div = document.createElement('div');
      div.className = 'about-gallery-item';
      div.innerHTML = `<img src="${src}">`;
      track.appendChild(div);
    });
  }
}

// ===============================
// HOME PAGE INIT
// ===============================
function initHomePage() {
  var words = ['your beloved pet','active dogs','senior dogs','puppies','picky eaters','adult dogs'];
  var i = 0;
  var el = document.getElementById('pf-home-ticker');
  if (!el) return;
  setInterval(function () {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(25%)';
    setTimeout(function () {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.style.transition = 'transform .4s ease, opacity .4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150);
  }, 3000);
}

// ===============================
// SHOP PAGE INIT
// ===============================
function initShopPage() {
  const products = [
    { id:'prod-001', name:'Royal Canin Adult Dog Food 2kg',  cat:'FOOD',        price:'250.000₫', old:'320.000₫', img:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&q=80', reviews:124, badge:'Bestseller' },
    { id:'prod-002', name:'Stylish Cat Collar',              cat:'ACCESSORIES', price:'85.000₫',  old:'120.000₫', img:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&q=80', reviews:89 },
    { id:'prod-003', name:'Dog Rope Tug Toy',                cat:'TOYS',        price:'65.000₫',  old:'90.000₫',  img:'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=300&q=80', reviews:57 },
    { id:'prod-004', name:'Biogroom Herbal Pet Shampoo',     cat:'HYGIENE',     price:'120.000₫', old:'160.000₫', img:'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&q=80', reviews:214, badge:'-25%' },
    { id:'prod-005', name:'Ultra Soft Fleece Pet Bed',       cat:'BEDS',        price:'195.000₫', old:'250.000₫', img:'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?w=300&q=80', reviews:73 },
    { id:'prod-006', name:'Whiskas cat pate',                cat:'FOOD',        price:'35.000₫',  old:'45.000₫',  img:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&q=80', reviews:198 },
    { id:'prod-007', name:'Premium Pet Travel Backpack',     cat:'ACCESSORIES', price:'320.000₫', old:'420.000₫', img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80', reviews:41,  badge:'New' },
    { id:'prod-008', name:'Feather Cat Wand Toy',            cat:'TOYS',        price:'45.000₫',  old:'60.000₫',  img:'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=300&q=80', reviews:162 },
    { id:'prod-009', name:'Cat Litter Tray',                 cat:'HYGIENE',     price:'85.000₫',  old:'110.000₫', img:'https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?w=300&q=80', reviews:95 },
    { id:'prod-010', name:'3-Tier Cat Tree House',           cat:'BEDS',        price:'850.000₫', old:'1.100.000₫', img:'https://images.unsplash.com/photo-1544568100-847a948585b9?w=300&q=80', reviews:38, badge:'-23%' },
  ];

  renderShopProducts('shopProducts', products);

  function filterShop(el, cat) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    renderShopProducts(
      'shopProducts',
      cat === 'all' ? products : products.filter(p => p.cat.toLowerCase() === cat.toLowerCase())
    );
  }
  window.filterShop = filterShop;

  function renderShopProducts(containerId, items) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = items.map((p, idx) => {
      const id    = p.id || ('prod-' + idx);
      const badge = p.badge ? `<span class="prod-badge">${p.badge}</span>` : '';
      return `
        <div class="product-card">
          <div class="product-img-wrap" style="position:relative;">
            ${badge}
            <img src="${p.img}" alt="${p.name}">
          </div>
          <div class="product-info">
            <div class="product-cat" style="font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:#887278;margin-bottom:4px;">${p.cat || ''}</div>
            <div class="product-name">${p.name}</div>
            <div class="stars" style="color:var(--gold);font-size:12px;margin-bottom:6px;">★★★★★ <span style="color:#887278;font-size:11px;">(${p.reviews || 0})</span></div>
            <div class="price-row">
              <span class="price-new">${p.price}</span>
              <span class="price-old">${p.old || ''}</span>
            </div>
            <button class="btn-buy" onclick='Cart.add({id:"${id}",name:"${p.name.replace(/"/g, '&quot;')}",cat:"${(p.cat||'').replace(/"/g, '&quot;')}",img:"${p.img||''}",price:"${p.price}"})'>Add to Cart</button>
          </div>
        </div>`;
    }).join('');
  }
}

// ===============================
// PAWFEAST PAGE INIT
// ===============================
function initPawfeastPage() {
  const DATA = {
    beef:    { type:'unkibble', ingredients:[{img:'https://thf.bing.com/th/id/OIP.uoDSy8W90uPdx3CEQEbQawHaFj?o=7&cb=thfc1falconrm=3&rs=1&pid=ImgDetMain&o=7&rm=3',n:'Lean Beef'},{img:'https://healthagy.com/wp-content/uploads/2022/08/Barley-Grains-1-1024x576.png',n:'Barley'},{img:'https://th.bing.com/th/id/R.97fd27466e1ba24223f8ed0147377d8e?rik=pWr8p3KegPnueQ&pid=ImgRaw&r=0',n:'Carrot'},{img:'https://thf.bing.com/th/id/OIP.6Z0MONR5XuB8CvM0t2Zc_gHaE7?o=7&cb=thfc1falconrm=3&rs=1&pid=ImgDetMain&o=7&rm=3',n:'Green Beans'},{img:'https://thf.bing.com/th/id/OIP.9wCxblC6uhozuXdGYOFV2AHaFj?o=7&cb=thfc1falconrm=3&rs=1&pid=ImgDetMain&o=7&rm=3',n:'Blueberry'},{img:'https://cdn-icons-png.flaticon.com/512/2346/2346958.png',n:'Beetroot'},{img:'https://cdn-icons-png.flaticon.com/512/4264/4264743.png',n:'Rosemary'},{img:'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',n:'Fish Oil'},{img:'https://cdn-icons-png.flaticon.com/512/7015/7015473.png',n:'Sunflower Oil'}] },
    salmon:  { type:'unkibble', ingredients:[{img:'https://cdn-icons-png.flaticon.com/512/2713/2713474.png',n:'Salmon'},{img:'https://cdn-icons-png.flaticon.com/512/616/616554.png',n:'Cod Fish'},{img:'https://cdn-icons-png.flaticon.com/512/766/766015.png',n:'Leafy Greens'},{img:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png',n:'Carrot'},{img:'https://cdn-icons-png.flaticon.com/512/1147/1147807.png',n:'Lentils'},{img:'https://cdn-icons-png.flaticon.com/512/2909/2909762.png',n:'Oats'},{img:'https://cdn-icons-png.flaticon.com/512/5346/5346204.png',n:'Garlic'},{img:'https://cdn-icons-png.flaticon.com/512/590/590685.png',n:'Blueberry'},{img:'https://cdn-icons-png.flaticon.com/512/4264/4264743.png',n:'Perilla'}] },
    turkey:  { type:'unkibble', ingredients:[{img:'https://cdn-icons-png.flaticon.com/512/8371/8371933.png',n:'Turkey'},{img:'https://cdn-icons-png.flaticon.com/512/7015/7015448.png',n:'Quinoa'},{img:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png',n:'Carrot'},{img:'https://cdn-icons-png.flaticon.com/512/766/766004.png',n:'Green Peas'},{img:'https://cdn-icons-png.flaticon.com/512/2909/2909841.png',n:'Sweet Potato'},{img:'https://cdn-icons-png.flaticon.com/512/415/415733.png',n:'Cranberry'},{img:'https://cdn-icons-png.flaticon.com/512/766/766016.png',n:'Coriander'},{img:'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',n:'Fish Oil'},{img:'https://cdn-icons-png.flaticon.com/512/2346/2346957.png',n:'Broccoli'}] },
    chicken: { type:'fresh',    ingredients:[{img:'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',n:'Fresh Chicken'},{img:'https://cdn-icons-png.flaticon.com/512/2909/2909841.png',n:'Sweet Potato'},{img:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png',n:'Carrot'},{img:'https://cdn-icons-png.flaticon.com/512/2346/2346957.png',n:'Broccoli'},{img:'https://cdn-icons-png.flaticon.com/512/4056/4056892.png',n:'Onion'},{img:'https://cdn-icons-png.flaticon.com/512/766/766016.png',n:'Parsley'},{img:'https://cdn-icons-png.flaticon.com/512/590/590685.png',n:'Blueberry'},{img:'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',n:'Fish Oil'},{img:'https://cdn-icons-png.flaticon.com/512/2909/2909762.png',n:'Oats'}] },
    lamb:    { type:'fresh',    ingredients:[{img:'https://cdn-icons-png.flaticon.com/512/1998/1998610.png',n:'Lamb'},{img:'https://cdn-icons-png.flaticon.com/512/2909/2909762.png',n:'Brown Rice'},{img:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png',n:'Carrot'},{img:'https://cdn-icons-png.flaticon.com/512/766/766015.png',n:'Green Cabbage'},{img:'https://cdn-icons-png.flaticon.com/512/2346/2346958.png',n:'Beetroot'},{img:'https://cdn-icons-png.flaticon.com/512/766/766004.png',n:'Green Peas'},{img:'https://cdn-icons-png.flaticon.com/512/415/415682.png',n:'Apple'},{img:'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',n:'Fish Oil'},{img:'https://cdn-icons-png.flaticon.com/512/590/590685.png',n:'Blueberry'}] },
  };

  let activeType = 'unkibble', activeRecipe = 'beef', carouselIdx = 0;
  const $  = id  => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  function buildCarousel(recipe) {
    const track = $('s3-track');
    if (!track) return;
    track.innerHTML = DATA[recipe].ingredients.map(i =>
      `<div class="s3-card"><img class="s3-card__img" src="${i.img}" alt="${i.n}"><div class="s3-card__name">${i.n}</div></div>`
    ).join('');
    carouselIdx = 0;
    updateCarousel();
  }

  function updateCarousel() {
    const track = $('s3-track');
    const wrap  = document.querySelector('.s3-carousel');
    if (!track || !wrap) return;
    const cardW = (wrap.offsetWidth + 16) / 3;
    track.style.transform = `translateX(-${carouselIdx * cardW}px)`;
    const maxIdx = Math.max(0, DATA[activeRecipe].ingredients.length - 3);
    $('s3-prev').disabled = carouselIdx <= 0;
    $('s3-next').disabled = carouselIdx >= maxIdx;
  }

  $('s3-prev')?.addEventListener('click', () => { carouselIdx = Math.max(0, carouselIdx - 1); updateCarousel(); });
  $('s3-next')?.addEventListener('click', () => { carouselIdx = Math.min(Math.max(0, DATA[activeRecipe].ingredients.length - 3), carouselIdx + 1); updateCarousel(); });
  window.addEventListener('resize', updateCarousel);

  function activateRecipe(recipe) {
    activeRecipe = recipe;
    $$('.s2-panel').forEach(p => p.classList.remove('active'));
    $('s2-' + recipe)?.classList.add('active');
    $$('.s2-tab').forEach(t => t.classList.toggle('active', t.dataset.s2 === recipe));
    buildCarousel(recipe);
  }

  function activateType(type) {
    activeType = type;
    $$('.s1-tab').forEach(t => t.classList.toggle('active', t.dataset.s1 === type));
    $$('.s1-panel').forEach(p => p.classList.remove('active'));
    $('s1-' + type)?.classList.add('active');
    $$('.s2-tab').forEach(t => { t.style.display = (t.dataset.type === type) ? '' : 'none'; });
    const firstTab = document.querySelector(`.s2-tab[data-type="${type}"]`);
    if (firstTab) activateRecipe(firstTab.dataset.s2);
  }

  $$('.s1-tab').forEach(t => t.addEventListener('click', () => activateType(t.dataset.s1)));
  $$('.s2-tab').forEach(t => t.addEventListener('click', () => activateRecipe(t.dataset.s2)));
  activateType('unkibble');
}

// ===============================
// MEMBER PAGE INIT
// ===============================
function initMemberPage() {
  function switchPetTab(tab, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + tab)?.classList.add('active');
    const stageMap = { dog: 'puppy', cat: 'kitten' };
    const firstEl = document.querySelector(`#${tab}-stages .stage-item`);
    if (firstEl) switchStage(tab, stageMap[tab], firstEl);
  }
  window.switchPetTab = switchPetTab;

  function switchStage(tab, stage, el) {
    const container = document.getElementById(tab + '-stages');
    if (!container) return;
    container.querySelectorAll('.stage-item').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    const stageMap = { dog: ['puppy', 'canine', 'senior'], cat: ['kitten', 'adult', 'senior'] };
    stageMap[tab].forEach(s => {
      const panel = document.getElementById(tab + '-' + s);
      if (panel) panel.style.display = 'none';
    });
    const target = document.getElementById(tab + '-' + stage);
    if (target) {
      target.style.display = 'flex';
      target.querySelectorAll('.review-card').forEach(c => {
        c.style.animation = 'none';
        void c.offsetWidth;
        c.style.animation = '';
      });
    }
  }
  window.switchStage = switchStage;
}

// ===============================
// CHAT POPUP
// ===============================
function openChatPopup() {
  document.getElementById("chat-popup").classList.toggle("open");
}

document.addEventListener("click", function (e) {
  const popup = document.getElementById("chat-popup");
  const fab = document.querySelector(".chat-fab-btn");
  if (popup && !popup.contains(e.target) && fab && !fab.contains(e.target)) {
    popup.classList.remove("open");
  }
});

// ===============================
// BACK TO TOP
// ===============================
window.addEventListener("scroll", () => {
  const btn = document.getElementById("back-top");
  if (btn) btn.classList.toggle("show", window.scrollY > 400);
});

// ===============================
// PROMO POPUP
// ===============================
function closePromo() {
  const overlay = document.getElementById("promoOverlay");
  if (overlay) overlay.classList.add("hidden");
  sessionStorage.setItem("promoClosed", "1");
}

let totalSecs = 2 * 3600 + 47 * 60 + 30;
function startCountdown() {
  var timer = setInterval(function () {
    totalSecs--;
    if (totalSecs <= 0) { clearInterval(timer); totalSecs = 0; }
    var h = Math.floor(totalSecs / 3600);
    var m = Math.floor((totalSecs % 3600) / 60);
    var s = totalSecs % 60;
    var elH = document.getElementById("cd-h");
    var elM = document.getElementById("cd-m");
    var elS = document.getElementById("cd-s");
    if (elH) elH.textContent = (h < 10 ? "0" : "") + h;
    if (elM) elM.textContent = (m < 10 ? "0" : "") + m;
    if (elS) elS.textContent = (s < 10 ? "0" : "") + s;
  }, 1000);
}

function claimOffer() {
  var nameEl  = document.getElementById("promoName");
  var emailEl = document.getElementById("promoEmail");
  var name    = nameEl.value.trim();
  var email   = emailEl.value.trim();
  nameEl.classList.remove("error");
  emailEl.classList.remove("error");
  if (!name)  { nameEl.classList.add("error");  nameEl.focus();  return; }
  if (!email || !email.includes("@")) { emailEl.classList.add("error"); emailEl.focus(); return; }
  document.getElementById("promoFormState").style.display = "none";
  document.getElementById("promoSuccess").style.display  = "flex";
}

// ===============================
// ACCORDION
// ===============================
function toggleAcc(button) {
  const body = button.nextElementSibling;
  const icon = button.querySelector("span");
  if (body.style.maxHeight) { body.style.maxHeight = null; icon.textContent = "+"; }
  else { body.style.maxHeight = body.scrollHeight + "px"; icon.textContent = "−"; }
}

// ===============================
// LANGUAGE SWITCHER
// ===============================
function setLang(code, label) {
  const cur = document.getElementById('currentLang');
  if (cur) cur.textContent = label;
  document.querySelectorAll('.lang-sel__opt').forEach(o => {
    o.classList.toggle('active', o.getAttribute('onclick').includes(`'${code}'`));
  });
  document.getElementById('langSel')?.classList.remove('open');
  const combo = document.querySelector('.goog-te-combo');
  if (combo) { combo.value = code; combo.dispatchEvent(new Event('change')); }
  localStorage.setItem('lang', code);
}
window.setLang = setLang;

// ===============================
// MOBILE MENU
// ===============================
function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("active");
}

// ===============================
// AUTH MODAL
// ===============================
function openAccountModal() {
  document.getElementById('auth-overlay')?.classList.add('open');
  document.getElementById('auth-modal')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openAccountModal = openAccountModal;

function closeAccountModal() {
  document.getElementById('auth-overlay')?.classList.remove('open');
  document.getElementById('auth-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeAccountModal = closeAccountModal;

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { closeAccountModal(); closeCart(); }
});

function switchTab(tab) {
  var indicator  = document.getElementById('auth-tab-indicator');
  var loginTab   = document.getElementById('tab-login');
  var regTab     = document.getElementById('tab-register');
  var loginPanel = document.getElementById('panel-login');
  var regPanel   = document.getElementById('panel-register');
  if (tab === 'login') {
    loginTab.classList.add('active');    loginTab.setAttribute('aria-selected', 'true');
    regTab.classList.remove('active');   regTab.setAttribute('aria-selected', 'false');
    loginPanel.classList.add('active');  regPanel.classList.remove('active');
    indicator.classList.remove('right');
  } else {
    regTab.classList.add('active');      regTab.setAttribute('aria-selected', 'true');
    loginTab.classList.remove('active'); loginTab.setAttribute('aria-selected', 'false');
    regPanel.classList.add('active');    loginPanel.classList.remove('active');
    indicator.classList.add('right');
  }
}
window.switchTab = switchTab;

function togglePass(inputId, btn) {
  var input = document.getElementById(inputId);
  var showing = input.type === 'text';
  input.type = showing ? 'password' : 'text';
  btn.setAttribute('aria-label', showing ? 'Hiện mật khẩu' : 'Ẩn mật khẩu');
}
window.togglePass = togglePass;

function checkStrength(val) {
  var bar = document.getElementById('strength-bar');
  var label = document.getElementById('strength-label');
  if (!bar) return;
  var score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  var widths = ['0%','28%','52%','76%','100%'];
  var colors = ['#ddd','#e05858','#e09c45','#7bae8d','#3d7a56'];
  var labels = ['','Yếu','Trung bình','Tốt','Mạnh'];
  bar.style.width = widths[score];
  bar.style.background = colors[score];
  label.textContent = val.length > 0 ? labels[score] : '';
  label.style.color = colors[score];
}
window.checkStrength = checkStrength;

function handleLogin() {
  var email = document.getElementById('login-email').value.trim();
  var pass  = document.getElementById('login-pass').value;
  if (!email || !pass) { alert('Vui lòng nhập đầy đủ email và mật khẩu.'); return; }
  console.log('Login:', email);
  closeAccountModal();
  alert('Đăng nhập thành công! (Demo)');
}
window.handleLogin = handleLogin;

function handleRegister() {
  var first = document.getElementById('reg-first').value.trim();
  var last  = document.getElementById('reg-last').value.trim();
  var email = document.getElementById('reg-email').value.trim();
  var pass  = document.getElementById('reg-pass').value;
  var pass2 = document.getElementById('reg-pass2').value;
  var terms = document.getElementById('reg-terms').checked;
  if (!first || !last || !email || !pass) { alert('Vui lòng nhập đầy đủ thông tin.'); return; }
  if (pass !== pass2) { alert('Mật khẩu xác nhận không khớp.'); return; }
  if (!terms) { alert('Vui lòng đồng ý với điều khoản dịch vụ.'); return; }
  console.log('Register:', email);
  closeAccountModal();
  alert('Đăng ký thành công! Chào mừng ' + first + ' 🐾');
}
window.handleRegister = handleRegister;

// ===============================
// CART
// ===============================
var Cart = (function () {
  var items = [];
  function find(id) { return items.findIndex(function (i) { return i.id === id; }); }
  function add(product) {
    var idx = find(product.id);
    if (idx > -1) { items[idx].qty++; } else { items.push(Object.assign({}, product, { qty: 1 })); }
    save(); render(); bumpBadge(); openCart();
  }
  function remove(id) { items = items.filter(function (i) { return i.id !== id; }); save(); render(); }
  function setQty(id, qty) {
    var idx = find(id);
    if (idx === -1) return;
    if (qty < 1) { remove(id); return; }
    items[idx].qty = qty;
    save(); render();
  }
  function total() { return items.reduce(function (s, i) { return s + (parseFloat(String(i.price).replace(/[^0-9.]/g, '')) * i.qty); }, 0); }
  function count() { return items.reduce(function (s, i) { return s + i.qty; }, 0); }
  function save() { try { localStorage.setItem('pcs_cart', JSON.stringify(items)); } catch (e) {} }
  function load() { try { var raw = localStorage.getItem('pcs_cart'); if (raw) items = JSON.parse(raw); } catch (e) {} render(); }
  function render() {
    var body   = document.getElementById('cd-body');
    var empty  = document.getElementById('cd-empty');
    var footer = document.getElementById('cd-footer');
    var badge  = document.getElementById('cart-count');
    var hCount = document.getElementById('cd-header-count');
    var subtot = document.getElementById('cd-subtotal');
    if (!body) return;
    var n = count(), t = total();
    if (badge)  badge.textContent  = n;
    if (hCount) hCount.textContent = n + (n === 1 ? ' item' : ' items');
    if (subtot) subtot.textContent = '$' + t.toFixed(2);
    if (items.length === 0) {
      body.innerHTML = ''; body.style.display = 'none';
      if (empty)  empty.classList.add('show');
      if (footer) footer.classList.remove('show');
      return;
    }
    body.style.display = '';
    if (empty)  empty.classList.remove('show');
    if (footer) footer.classList.add('show');
    body.innerHTML = items.map(function (item) {
      var imgEl = item.img ? '<img class="cd-item-img" src="' + item.img + '" alt="' + item.name + '">' : '<div class="cd-item-img" style="display:flex;align-items:center;justify-content:center;font-size:2rem;">🛍️</div>';
      return '<div class="cd-item" id="cd-item-' + item.id + '">' + imgEl
        + '<div class="cd-item-info"><div class="cd-item-name">' + item.name + '</div><div class="cd-item-cat">' + (item.cat || '') + '</div>'
        + '<div class="cd-qty"><button class="cd-qty-btn" onclick="Cart.setQty(\'' + item.id + '\',' + (item.qty - 1) + ')">−</button><span class="cd-qty-val">' + item.qty + '</span><button class="cd-qty-btn" onclick="Cart.setQty(\'' + item.id + '\',' + (item.qty + 1) + ')">+</button></div>'
        + '<button class="cd-remove" onclick="Cart.remove(\'' + item.id + '\')">Remove</button></div>'
        + '<div class="cd-item-price">$' + (parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * item.qty).toFixed(2) + '</div></div>';
    }).join('');
  }
  function bumpBadge() {
    var badge = document.getElementById('cart-count');
    if (!badge) return;
    badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
  }
  load();
  return { add, remove, setQty, count, total, render };
})();

function openCart() {
  document.getElementById('cd-overlay')?.classList.add('open');
  document.getElementById('cd')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openCart = openCart;

function closeCart() {
  document.getElementById('cd-overlay')?.classList.remove('open');
  document.getElementById('cd')?.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeCart = closeCart;

function renderProducts(containerId, items) {
  var c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = items.map(function (p, idx) {
    var id = p.id || ('prod-' + idx);
    var badge    = p.badge    ? '<span class="prod-badge">'    + p.badge    + '</span>' : '';
    var discount = p.discount ? '<span class="prod-discount">' + p.discount + '</span>' : '';
    return '<div class="product-card"><div class="product-img-wrap">' + badge + discount
      + '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>'
      + '<div class="product-info"><div class="product-cat">' + (p.cat || '') + '</div>'
      + '<div class="product-name">' + p.name + '</div>'
      + '<div class="stars" style="color:var(--gold,#c8a84b);font-size:12px;margin-bottom:8px;">★★★★★ <span style="color:#887278;font-size:11px;">(' + (p.reviews || 0) + ')</span></div>'
      + '<div class="price-row"><span class="price-new">' + p.price + '</span>' + (p.old ? '<span class="price-old">' + p.old + '</span>' : '') + '</div>'
      + '<button class="btn-buy" onclick="Cart.add({id:\'' + id + '\',name:\'' + p.name.replace(/'/g, "\\'") + '\',cat:\'' + (p.cat||'').replace(/'/g, "\\'") + '\',img:\'' + (p.img||'') + '\',price:\'' + p.price + '\'})">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Add</button></div></div>';
  }).join('');
}
window.renderProducts = renderProducts;

// ===============================
// TOP LOADER
// ===============================
let loaderRunning = false;
let loaderTimeouts = [];

function clearLoaderTimeouts() {
  loaderTimeouts.forEach(t => clearTimeout(t));
  loaderTimeouts = [];
}

function loaderStart() {
  const el = document.getElementById('top-loader');
  if (!el || loaderRunning) return;
  loaderRunning = true;
  clearLoaderTimeouts();
  el.classList.remove('hide');
  el.style.opacity = '1';
  el.style.width = '0%';
  requestAnimationFrame(() => { el.style.width = '15%'; });
  loaderTimeouts.push(setTimeout(() => { el.style.width = '45%'; }, 200));
  loaderTimeouts.push(setTimeout(() => { el.style.width = '75%'; }, 500));
  loaderTimeouts.push(setTimeout(() => { el.style.width = '90%'; }, 900));
}

function loaderDone() {
  const el = document.getElementById('top-loader');
  if (!el) return;
  clearLoaderTimeouts();
  el.style.width = '100%';
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => { el.style.width = '0%'; loaderRunning = false; }, 250);
  }, 150);
}
