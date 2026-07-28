// Assignment 03 — StyleHub Fashion Store — JavaScript

const products = [
  { id: 1, name: 'Classic Oxford Shirt', category: 'men',  emoji: '👔', price: 1499, original: 1999, badge: 'Sale' },
  { id: 2, name: 'Slim Fit Chinos',      category: 'men',  emoji: '👖', price: 1299, original: 1799, badge: null  },
  { id: 3, name: 'Casual Sneakers',      category: 'men',  emoji: '👟', price: 2199, original: 2999, badge: 'Hot' },
  { id: 4, name: 'Floral Midi Dress',    category: 'women',emoji: '👗', price: 1799, original: 2499, badge: 'New' },
  { id: 5, name: 'Boho Crop Top',        category: 'women',emoji: '👚', price:  899, original: 1199, badge: 'Sale'},
  { id: 6, name: 'High-Waist Jeans',     category: 'women',emoji: '🩳', price: 1599, original: 1999, badge: null },
  { id: 7, name: 'Leather Tote Bag',     category: 'accessories', emoji: '👜', price: 2499, original: 3499, badge: 'Hot' },
  { id: 8, name: 'Aviator Sunglasses',   category: 'accessories', emoji: '🕶️',  price:  699, original:  999, badge: null },
  { id: 9, name: 'Silk Scarf',           category: 'accessories', emoji: '🧣', price:  599, original:  799, badge: 'Sale'},
];

let cart = [];
let currentFilter = 'all';

/* ---- Render Products ---- */
function renderProducts(filter) {
  const grid = document.getElementById('productGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="col-sm-6 col-lg-4 product-item" data-category="${p.category}">
      <div class="product-card h-100">
        <div class="product-img-wrap">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <span class="emoji">${p.emoji}</span>
        </div>
        <div class="product-body">
          <p class="product-cat">${p.category}</p>
          <h5 class="product-name">${p.name}</h5>
          <p class="product-price">
            ₹${p.price.toLocaleString('en-IN')}
            <span class="original">₹${p.original.toLocaleString('en-IN')}</span>
          </p>
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
            <i class="fas fa-shopping-bag me-1"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---- Add To Cart ---- */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`${product.emoji} ${product.name} added to cart!`);
}

/* ---- Remove From Cart ---- */
function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

/* ---- Update Cart UI ---- */
function updateCartUI() {
  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById('cartCount').textContent = totalItems;

  const itemsEl  = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    footerEl.style.display = 'none';
    return;
  }

  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <span class="cart-item-emoji">${c.emoji}</span>
      <div class="cart-item-info">
        <p class="cart-item-name">${c.name}</p>
        <p class="cart-item-price">₹${c.price.toLocaleString('en-IN')} × ${c.qty}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${c.id})"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString('en-IN');
  footerEl.style.display = 'block';
}

/* ---- Cart Toggle ---- */
document.getElementById('cartToggle').addEventListener('click', () => {
  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
});

document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

function closeCart() {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

/* ---- Filter Buttons ---- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProducts(currentFilter);
  });
});

/* ---- Toast ---- */
function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ---- Init ---- */
renderProducts('all');
