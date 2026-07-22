/* ==========================================================================
   KISHA LIP GLOSS - LUXURY INTERACTIVE JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- PRODUCTS DATA STORE (Featuring all 18 photos) ---
  const products = [
    {
      id: 1,
      name: "Signature Crystal Clear Gloss",
      category: "glosses",
      price: 30000,
      image: "assets/images/kisha_05.jpg",
      badge: "Bestseller",
      rating: 5.0,
      reviewsCount: 142,
      shades: ["#FFFFFF", "#FCE4EC", "#F8BBD0"],
      description: "Mirror-like extreme shine without any sticky feel. Infused with Vitamin E and jojoba oil to nourish your lips all day long."
    },
    {
      id: 2,
      name: "Rose Velvet Hydration Gloss",
      category: "glosses",
      price: 30000,
      image: "assets/images/kisha_06.jpg",
      badge: "Trending",
      rating: 4.9,
      reviewsCount: 98,
      shades: ["#D81B60", "#F48FB1", "#FF80AB"],
      description: "A soft, romantic blush tint that enhances your natural lip tone with a silky smooth, glass-like finish."
    },
    {
      id: 3,
      name: "Honey Nude Lip Nourishing Oil",
      category: "oils",
      price: 35000,
      image: "assets/images/kisha_07.jpg",
      badge: "New",
      rating: 5.0,
      reviewsCount: 64,
      shades: ["#E6C687", "#D4AF37", "#F5CBA7"],
      description: "Ultra-hydrating non-greasy lip oil enriched with pure honey extracts and shea butter for plump, kissable lips."
    },
    {
      id: 4,
      name: "Berry Crush Plumping Lip Gloss",
      category: "glosses",
      price: 30000,
      image: "assets/images/kisha_08.jpg",
      badge: "Hot",
      rating: 4.8,
      reviewsCount: 112,
      shades: ["#880E4F", "#AD1457", "#C2185B"],
      description: "Rich berry pigment with natural peppermint oil to instantly plump and define your lips with a gorgeous glossy sheen."
    },
    {
      id: 5,
      name: "Golden Hour Shimmer Lip Tint",
      category: "glosses",
      price: 32000,
      image: "assets/images/kisha_09.jpg",
      badge: "Must-Have",
      rating: 4.9,
      reviewsCount: 87,
      shades: ["#FFD700", "#FFC107", "#FFE082"],
      description: "Micro-fine gold shimmer particles that reflect the sunshine and give your lips an ethereal, glowing look."
    },
    {
      id: 6,
      name: "Exfoliating Pink Sugar Lip Scrub",
      category: "scrubs",
      price: 25000,
      image: "assets/images/kisha_10.jpg",
      badge: "Care",
      rating: 5.0,
      reviewsCount: 75,
      shades: ["#FFB6C1"],
      description: "Gently buffs away dead skin with organic cane sugar granules while locking in moisture with sweet almond oil."
    },
    {
      id: 7,
      name: "Luxe Duo Box (Gloss + Lip Scrub)",
      category: "sets",
      price: 50000,
      image: "assets/images/kisha_11.jpg",
      badge: "Best Value",
      rating: 5.0,
      reviewsCount: 180,
      shades: ["#D81B60", "#FFB6C1"],
      description: "The ultimate lip transformation bundle! Includes 1 Signature Gloss of your choice + 1 Exfoliating Pink Sugar Scrub."
    },
    {
      id: 8,
      name: "Velvet Lip Care & Applicator Kit",
      category: "sets",
      price: 45000,
      image: "assets/images/kisha_12.jpg",
      badge: "Limited",
      rating: 4.9,
      reviewsCount: 53,
      shades: ["#F8C8DC"],
      description: "Includes soft silicone lip brushes, soothing lip mask, and lip repair balm for smooth, hydrated prep."
    },
    {
      id: 9,
      name: "Choco Kiss Tinted Lip Gloss",
      category: "glosses",
      price: 30000,
      image: "assets/images/kisha_13.jpg",
      badge: "Popular",
      rating: 4.8,
      reviewsCount: 94,
      shades: ["#5D4037", "#8D6E63", "#A1887F"],
      description: "Warm mocha nude hue designed specially to complement melanin-rich lips with rich pigment and high reflection."
    },
    {
      id: 10,
      name: "Queen Bee Overnight Lip Mask",
      category: "scrubs",
      price: 28000,
      image: "assets/images/kisha_14.jpg",
      badge: "Overnight",
      rating: 5.0,
      reviewsCount: 68,
      shades: ["#FFF5F8"],
      description: "Intensive overnight lip sleeping mask that melts away roughness and leaves lips pillow-soft by morning."
    }
  ];

  // --- CART STATE & WISHLIST STATE ---
  let cart = JSON.parse(localStorage.getItem('kisha_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('kisha_wishlist') || '[]');

  // --- CUSTOM FEMININE CURSOR ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 300, fill: 'forwards' });
    });

    const interactiveSelectors = 'a, button, input, .card, .swatch, .tab-btn, .gallery-item';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // --- STICKY NAVBAR SCROLL ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- HERO CAROUSEL ENGINE ---
  const heroSlides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  let currentSlide = 0;
  let slideInterval;

  if (heroSlides.length > 0) {
    // Generate indicator dots
    dotsContainer.innerHTML = '';
    heroSlides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
      heroSlides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    function startTimer() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
      clearInterval(slideInterval);
      startTimer();
    }

    startTimer();
  }

  // --- RENDER PRODUCTS CATALOG & CATEGORY TABS ---
  const catalogGrid = document.getElementById('catalog-grid');
  const categoryTabs = document.querySelectorAll('.tab-btn');

  function renderCatalog(items) {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = items.map(product => {
      const isWishlisted = wishlist.includes(product.id);
      return `
        <div class="product-card" data-id="${product.id}">
          <div class="card-img-wrap">
            <span class="card-badge">${product.badge}</span>
            <button class="card-wishlist ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id}, this)">
              <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <button class="quick-view-btn" onclick="openQuickView(${product.id})">
              <i class="far fa-eye"></i> Quick View
            </button>
          </div>
          <div class="card-content">
            <span class="card-category">${product.category}</span>
            <h4 class="card-title">${product.name}</h4>
            <div class="card-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <span>(${product.reviewsCount})</span>
            </div>
            <div class="card-shade-swatches">
              ${product.shades.map((color, i) => `<span class="swatch ${i===0?'active':''}" style="background:${color}"></span>`).join('')}
            </div>
            <div class="card-footer">
              <span class="card-price">UGX ${product.price.toLocaleString()}</span>
              <button class="btn-add-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-bag"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderCatalog(products);

  if (categoryTabs) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        if (filter === 'all') {
          renderCatalog(products);
        } else {
          const filtered = products.filter(p => p.category === filter);
          renderCatalog(filtered);
        }
      });
    });
  }

  // --- INTERACTIVE SHADE TESTER SIMULATOR ---
  const shadeOptions = document.querySelectorAll('.shade-option-card');
  const testerImg = document.getElementById('tester-img');
  const testerTitle = document.getElementById('tester-title');
  const testerDesc = document.getElementById('tester-desc');
  const testerAddBtn = document.getElementById('tester-add-btn');

  const shadePresets = {
    'rose': {
      title: 'Rose Velvet Tint',
      desc: 'Soft romantic pink hue with non-sticky glass sheen.',
      img: 'assets/images/kisha_06.jpg',
      productId: 2
    },
    'honey': {
      title: 'Honey Nude Glow',
      desc: 'Warm golden shimmer for sun-kissed daily moisture.',
      img: 'assets/images/kisha_07.jpg',
      productId: 3
    },
    'berry': {
      title: 'Berry Crush Plump',
      desc: 'Deep plum glow infused with natural lip plumping oil.',
      img: 'assets/images/kisha_08.jpg',
      productId: 4
    },
    'crystal': {
      title: 'Signature Crystal Clear',
      desc: 'Ultra pure mirror shine that works on any lipstick shade.',
      img: 'assets/images/kisha_05.jpg',
      productId: 1
    }
  };

  if (shadeOptions.length > 0) {
    shadeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        shadeOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const key = opt.dataset.shade;
        const preset = shadePresets[key];
        if (preset) {
          testerImg.src = preset.img;
          testerTitle.textContent = preset.title;
          testerDesc.textContent = preset.desc;
          if (testerAddBtn) {
            testerAddBtn.onclick = () => addToCart(preset.productId);
          }
        }
      });
    });
  }

  // --- CART DRAWER ENGINE & WHATSAPP INTEGRATION ---
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartBadge = document.getElementById('cart-badge');
  const cartBody = document.getElementById('cart-body');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  function openCart() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.add('active');
  }

  function closeCart() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove('active');
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCart();
    });
  }

  window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showToast(`Added "${product.name}" to your bag! 💖`);
    openCart();
  };

  window.updateCartQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
  };

  function updateCartUI() {
    localStorage.setItem('kisha_cart', JSON.stringify(cart));
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartBadge) cartBadge.textContent = totalItems;

    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty-state">
          <i class="fas fa-shopping-bag"></i>
          <p>Your shopping bag is empty</p>
          <button class="btn-cta" onclick="closeCart()" style="margin-top: 15px;">Shop Collection</button>
        </div>
      `;
    } else {
      cartBody.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" class="cart-item-img" alt="${item.name}">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">UGX ${(item.price * item.qty).toLocaleString()}</div>
            <div class="cart-qty-controls">
              <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    if (cartTotalAmount) {
      cartTotalAmount.textContent = `UGX ${totalPrice.toLocaleString()}`;
    }
  }

  updateCartUI();

  // WHATSAPP ORDER SUBMISSION
  const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your bag is empty! Please add items before checking out.');
        return;
      }

      let message = `*✨ NEW KISHA LIP GLOSS ORDER ✨*\n\n`;
      cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* x ${item.qty} = UGX ${(item.price * item.qty).toLocaleString()}\n`;
      });

      const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      message += `\n*TOTAL AMOUNT:* UGX ${total.toLocaleString()}\n`;
      message += `\nHello! I would like to place this order. Please confirm delivery details! 💕`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/256700525113?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // --- WISHLIST TOGGLE ---
  window.toggleWishlist = function(id, btn) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      btn.classList.remove('active');
      btn.querySelector('i').className = 'far fa-heart';
      showToast('Removed from wishlist');
    } else {
      wishlist.push(id);
      btn.classList.add('active');
      btn.querySelector('i').className = 'fas fa-heart';
      showToast('Added to your wishlist! ❤️');
    }
    localStorage.setItem('kisha_wishlist', JSON.stringify(wishlist));
  };

  // --- QUICK VIEW MODAL & LIGHTBOX ---
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  window.openQuickView = function(id) {
    const product = products.find(p => p.id === id);
    if (!product || !modalBody || !modalOverlay) return;

    modalBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center;">
        <img src="${product.image}" style="width: 100%; height: 380px; object-fit: cover; border-radius: 16px;" alt="${product.name}">
        <div>
          <span style="color: var(--clr-rose-primary); font-weight: 700; text-transform: uppercase; font-size: 0.8rem;">${product.category}</span>
          <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--clr-rose-deep); margin: 10px 0;">${product.name}</h2>
          <div style="color: var(--clr-gold); margin-bottom: 15px;">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            <span style="color: var(--clr-text-muted); font-size: 0.9rem;"> (${product.reviewsCount} verified reviews)</span>
          </div>
          <p style="color: var(--clr-text-muted); margin-bottom: 20px; line-height: 1.6;">${product.description}</p>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--clr-rose-deep); margin-bottom: 25px;">UGX ${product.price.toLocaleString()}</div>
          <button class="btn-cta" onclick="addToCart(${product.id}); closeModal();" style="width: 100%; justify-content: center;">
            <i class="fas fa-shopping-bag"></i> Add To Bag Now
          </button>
        </div>
      </div>
    `;
    modalOverlay.classList.add('active');
  };

  window.openLightbox = function(imgSrc) {
    if (!modalBody || !modalOverlay) return;
    modalBody.innerHTML = `
      <div style="text-align: center;">
        <img src="${imgSrc}" style="max-width: 100%; max-height: 75vh; border-radius: 16px; object-fit: contain;">
        <p style="margin-top: 15px; font-family: var(--font-serif); font-size: 1.2rem; color: var(--clr-rose-deep);">Kisha Beauty Girl Squad 💖</p>
      </div>
    `;
    modalOverlay.classList.add('active');
  };

  window.closeModal = function() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // --- BEAUTY QUIZ MODAL ---
  const quizBtn = document.getElementById('quiz-start-btn');
  if (quizBtn) {
    quizBtn.addEventListener('click', () => {
      if (!modalBody || !modalOverlay) return;
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <span style="color: var(--clr-rose-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem;">Interactive Shade Finder</span>
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--clr-rose-deep); margin: 10px 0;">Find Your Lip Vibe 💄</h2>
          <p style="color: var(--clr-text-muted); margin-bottom: 30px;">What is your go-to look for the day?</p>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <button class="btn-secondary" style="justify-content: center;" onclick="selectQuizResult(1)">✨ Natural, Glass-Like Everyday Shine</button>
            <button class="btn-secondary" style="justify-content: center;" onclick="selectQuizResult(2)">💖 Soft Romantic Pink Glam</button>
            <button class="btn-secondary" style="justify-content: center;" onclick="selectQuizResult(4)">🍷 Bold Deep Berry Statement</button>
            <button class="btn-secondary" style="justify-content: center;" onclick="selectQuizResult(3)">🍯 Sun-Kissed Hydrated Glow</button>
          </div>
        </div>
      `;
      modalOverlay.classList.add('active');
    });
  }

  window.selectQuizResult = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !modalBody) return;
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <span style="color: var(--clr-rose-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem;">Your Perfect Match!</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--clr-rose-deep); margin: 10px 0;">${product.name}</h2>
        <img src="${product.image}" style="width: 220px; height: 220px; object-fit: cover; border-radius: 50%; margin: 20px auto; display: block; border: 4px solid var(--clr-rose-primary);">
        <p style="color: var(--clr-text-muted); margin-bottom: 25px; line-height: 1.6;">${product.description}</p>
        <button class="btn-cta" onclick="addToCart(${product.id}); closeModal();" style="width: 100%; justify-content: center;">
          <i class="fas fa-shopping-bag"></i> Claim My Shade (UGX ${product.price.toLocaleString()})
        </button>
      </div>
    `;
  };

  // --- TOAST NOTIFICATIONS ENGINE ---
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
