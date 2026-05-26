// SHOP DATA & RENDER
const products = [
  {
    id: 'prod-001',
    name: 'Royal Canin Adult Dog Food 2kg',
    cat: 'FOOD',
    price: '250.000₫',
    old: '320.000₫',
    img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&q=80',
    reviews: 124,
    badge: 'Bestseller',
  },
  {
    id: 'prod-002',
    name: 'Stylish Cat Collar',
    cat: 'ACCESSORIES',
    price: '85.000₫',
    old: '120.000₫',
    img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&q=80',
    reviews: 89,
  },
  {
    id: 'prod-003',
    name: 'Dog Rope Tug Toy',
    cat: 'TOYS',
    price: '65.000₫',
    old: '90.000₫',
    img: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=300&q=80',
    reviews: 57,
  },
  {
    id: 'prod-004',
    name: 'Biogroom Herbal Pet Shampoo',
    cat: 'HYGIENE',
    price: '120.000₫',
    old: '160.000₫',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&q=80',
    reviews: 214,
    badge: '-25%',
  },
  {
    id: 'prod-005',
    name: 'Ultra Soft Fleece Pet Bed',
    cat: 'BEDS',
    price: '195.000₫',
    old: '250.000₫',
    img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?w=300&q=80',
    reviews: 73,
  },
  {
    id: 'prod-006',
    name: 'Whiskas Cat Pâté',
    cat: 'FOOD',
    price: '35.000₫',
    old: '45.000₫',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&q=80',
    reviews: 198,
  },
  {
    id: 'prod-007',
    name: 'Premium Pet Travel Backpack',
    cat: 'ACCESSORIES',
    price: '320.000₫',
    old: '420.000₫',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80',
    reviews: 41,
    badge: 'New',
  },
  {
    id: 'prod-008',
    name: 'Feather Cat Wand Toy',
    cat: 'TOYS',
    price: '45.000₫',
    old: '60.000₫',
    img: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=300&q=80',
    reviews: 162,
  },
  {
    id: 'prod-009',
    name: 'Cat Litter Tray',
    cat: 'HYGIENE',
    price: '85.000₫',
    old: '110.000₫',
    img: 'https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?w=300&q=80',
    reviews: 95,
  },
  {
    id: 'prod-010',
    name: '3-Tier Cat Tree House',
    cat: 'BEDS',
    price: '850.000₫',
    old: '1.100.000₫',
    img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=300&q=80',
    reviews: 38,
    badge: '-23%',
  },
];

function renderProducts(containerId, items) {
  const c = document.getElementById(containerId);
  if (!c) return;

  c.innerHTML = items.map((p, idx) => {

    const id = p.id || `prod-${idx}`;

    // BADGE
    const badge = p.badge
      ? `<span class="prod-badge">${p.badge}</span>`
      : '';

    return `
      <div class="product-card">

        <div class="product-img-wrap" style="position:relative;">

          ${badge}

          <img src="${p.img}" alt="${p.name}">
        </div>

        <div class="product-info">

          <div class="product-cat"
            style="font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:#887278;margin-bottom:4px;">
            ${p.cat || ''}
          </div>

          <div class="product-name">${p.name}</div>

          <div class="stars"
            style="color:var(--gold);font-size:12px;margin-bottom:6px;">
            ★★★★★
            <span style="color:#887278;font-size:11px;">
              (${p.reviews || 0})
            </span>
          </div>

          <div class="price-row">
            <span class="price-new">${p.price}</span>
            <span class="price-old">${p.old || ''}</span>
          </div>

          <button class="btn-buy" onclick='Cart.add({
            id: "${id}",
            name: "${p.name.replace(/"/g, "&quot;")}",
            cat: "${(p.cat || '').replace(/"/g, "&quot;")}",
            img: "${p.img || ''}",
            price: "${p.price}"
          })'>
            Add to Cart
          </button>

        </div>
      </div>`;
  }).join('');
}
renderProducts('shopProducts', products);

function filterShop(el, cat) {
  document
    .querySelectorAll('.filter-tab')
    .forEach((t) => t.classList.remove('active'));
  el.classList.add('active');
  renderProducts(
    'shopProducts',
    cat === 'all' ? products : products.filter((p) => p.cat === cat)
  );
}