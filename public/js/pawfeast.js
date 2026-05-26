/* ── DATA ────────────────────────────────────────────────────── */
const DATA = {
  beef: {
    type: 'unkibble',
    ingredients: [
      { img:'https://thf.bing.com/th/id/OIP.uoDSy8W90uPdx3CEQEbQawHaFj?o=7&cb=thfc1falconrm=3&rs=1&pid=ImgDetMain&o=7&rm=3', n:'Lean Beef' },
      { img:'https://healthagy.com/wp-content/uploads/2022/08/Barley-Grains-1-1024x576.png', n:'Barley' },
      { img:'https://th.bing.com/th/id/R.97fd27466e1ba24223f8ed0147377d8e?rik=pWr8p3KegPnueQ&pid=ImgRaw&r=0', n:'Carrot' },
      { img:'https://thf.bing.com/th/id/OIP.6Z0MONR5XuB8CvM0t2Zc_gHaE7?o=7&cb=thfc1falconrm=3&rs=1&pid=ImgDetMain&o=7&rm=3', n:'Green Beans' },
      { img:'https://thf.bing.com/th/id/OIP.9wCxblC6uhozuXdGYOFV2AHaFj?o=7&cb=thfc1falconrm=3&rs=1&pid=ImgDetMain&o=7&rm=3', n:'Blueberry' },
      { img:'https://cdn-icons-png.flaticon.com/512/2346/2346958.png', n:'Beetroot' },
      { img:'https://cdn-icons-png.flaticon.com/512/4264/4264743.png', n:'Rosemary' },
      { img:'https://cdn-icons-png.flaticon.com/512/3075/3075977.png', n:'Fish Oil' },
      { img:'https://cdn-icons-png.flaticon.com/512/7015/7015473.png', n:'Sunflower Oil' },
    ]
  },

  salmon: {
    type: 'unkibble',
    ingredients: [
      { img:'https://cdn-icons-png.flaticon.com/512/2713/2713474.png', n:'Salmon' },
      { img:'https://cdn-icons-png.flaticon.com/512/616/616554.png', n:'Cod Fish' },
      { img:'https://cdn-icons-png.flaticon.com/512/766/766015.png', n:'Leafy Greens' },
      { img:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png', n:'Carrot' },
      { img:'https://cdn-icons-png.flaticon.com/512/1147/1147807.png', n:'Lentils' },
      { img:'https://cdn-icons-png.flaticon.com/512/2909/2909762.png', n:'Oats' },
      { img:'https://cdn-icons-png.flaticon.com/512/5346/5346204.png', n:'Garlic' },
      { img:'https://cdn-icons-png.flaticon.com/512/590/590685.png', n:'Blueberry' },
      { img:'https://cdn-icons-png.flaticon.com/512/4264/4264743.png', n:'Perilla' },
    ]
  },

  turkey: {
    type: 'unkibble',
    ingredients: [
      { img:'https://cdn-icons-png.flaticon.com/512/8371/8371933.png', n:'Turkey' },
      { img:'https://cdn-icons-png.flaticon.com/512/7015/7015448.png', n:'Quinoa' },
      { img:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png', n:'Carrot' },
      { img:'https://cdn-icons-png.flaticon.com/512/766/766004.png', n:'Green Peas' },
      { img:'https://cdn-icons-png.flaticon.com/512/2909/2909841.png', n:'Sweet Potato' },
      { img:'https://cdn-icons-png.flaticon.com/512/415/415733.png', n:'Cranberry' },
      { img:'https://cdn-icons-png.flaticon.com/512/766/766016.png', n:'Coriander' },
      { img:'https://cdn-icons-png.flaticon.com/512/3075/3075977.png', n:'Fish Oil' },
      { img:'https://cdn-icons-png.flaticon.com/512/2346/2346957.png', n:'Broccoli' },
    ]
  },

  chicken: {
    type: 'fresh',
    ingredients: [
      { img:'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', n:'Fresh Chicken' },
      { img:'https://cdn-icons-png.flaticon.com/512/2909/2909841.png', n:'Sweet Potato' },
      { img:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png', n:'Carrot' },
      { img:'https://cdn-icons-png.flaticon.com/512/2346/2346957.png', n:'Broccoli' },
      { img:'https://cdn-icons-png.flaticon.com/512/4056/4056892.png', n:'Onion' },
      { img:'https://cdn-icons-png.flaticon.com/512/766/766016.png', n:'Parsley' },
      { img:'https://cdn-icons-png.flaticon.com/512/590/590685.png', n:'Blueberry' },
      { img:'https://cdn-icons-png.flaticon.com/512/3075/3075977.png', n:'Fish Oil' },
      { img:'https://cdn-icons-png.flaticon.com/512/2909/2909762.png', n:'Oats' },
    ]
  },

  lamb: {
    type: 'fresh',
    ingredients: [
      { img:'https://cdn-icons-png.flaticon.com/512/1998/1998610.png', n:'Lamb' },
      { img:'https://cdn-icons-png.flaticon.com/512/2909/2909762.png', n:'Brown Rice' },
      { img:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png', n:'Carrot' },
      { img:'https://cdn-icons-png.flaticon.com/512/766/766015.png', n:'Green Cabbage' },
      { img:'https://cdn-icons-png.flaticon.com/512/2346/2346958.png', n:'Beetroot' },
      { img:'https://cdn-icons-png.flaticon.com/512/766/766004.png', n:'Green Peas' },
      { img:'https://cdn-icons-png.flaticon.com/512/415/415682.png', n:'Apple' },
      { img:'https://cdn-icons-png.flaticon.com/512/3075/3075977.png', n:'Fish Oil' },
      { img:'https://cdn-icons-png.flaticon.com/512/590/590685.png', n:'Blueberry' },
    ]
  },
};

/* ── STATE ───────────────────────────────────────────────────── */
let activeType   = 'unkibble';
let activeRecipe = 'beef';
let carouselIdx  = 0;

/* ── HELPERS ─────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ── CAROUSEL ────────────────────────────────────────────────── */
function buildCarousel(recipe) {
  const track = $('s3-track');
  const items = DATA[recipe].ingredients;
  track.innerHTML = items.map(i =>
    `<div class="s3-card">
       <img class="s3-card__img" src="${i.img}" alt="${i.n}">
       <div class="s3-card__name">${i.n}</div>
     </div>`
  ).join('');
  carouselIdx = 0;
  updateCarousel();
}

function updateCarousel() {
  const track   = $('s3-track');
  const wrap    = document.querySelector('.s3-carousel');
  const cardW   = (wrap.offsetWidth + 16) / 3;   // 3 visible + gap
  track.style.transform = `translateX(-${carouselIdx * cardW}px)`;

  const total   = DATA[activeRecipe].ingredients.length;
  const maxIdx  = Math.max(0, total - 3);
  $('s3-prev').disabled = carouselIdx <= 0;
  $('s3-next').disabled = carouselIdx >= maxIdx;
}

$('s3-prev').addEventListener('click', () => { carouselIdx = Math.max(0, carouselIdx-1); updateCarousel(); });
$('s3-next').addEventListener('click', () => {
  const max = Math.max(0, DATA[activeRecipe].ingredients.length - 3);
  carouselIdx = Math.min(max, carouselIdx+1);
  updateCarousel();
});
window.addEventListener('resize', updateCarousel);

/* ── ACTIVATE RECIPE (s2 panel + carousel) ───────────────────── */
function activateRecipe(recipe) {
  activeRecipe = recipe;
  // s2 panels
  $$('.s2-panel').forEach(p => p.classList.remove('active'));
  $('s2-' + recipe)?.classList.add('active');
  // s2 tabs
  $$('.s2-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.s2 === recipe);
  });
  // carousel
  buildCarousel(recipe);
}

/* ── ACTIVATE TYPE (s1 tab + s1 panel + show correct s2 tabs) ── */
function activateType(type) {
  activeType = type;

  // s1 tabs
  $$('.s1-tab').forEach(t => t.classList.toggle('active', t.dataset.s1 === type));
  // s1 panels
  $$('.s1-panel').forEach(p => p.classList.remove('active'));
  $('s1-' + type)?.classList.add('active');

  // s2 tabs: show only those matching this type, hide others
  $$('.s2-tab').forEach(t => {
    t.style.display = (t.dataset.type === type) ? '' : 'none';
  });

  // activate first tab of this type
  const firstTab = document.querySelector(`.s2-tab[data-type="${type}"]`);
  if (firstTab) activateRecipe(firstTab.dataset.s2);
}

/* ── WIRE EVENTS ─────────────────────────────────────────────── */
$$('.s1-tab').forEach(t => {
  t.addEventListener('click', () => activateType(t.dataset.s1));
});

$$('.s2-tab').forEach(t => {
  t.addEventListener('click', () => activateRecipe(t.dataset.s2));
});

/* ── INIT ────────────────────────────────────────────────────── */
activateType('unkibble');