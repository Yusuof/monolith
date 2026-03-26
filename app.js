// ============================================================
// MONOLITH — Shared Application Logic (app.js)
// Cart System · Search Overlay · Newsletter · Badge Counter
// ============================================================

(function () {
    'use strict';

    // Initialize Lenis for buttery smooth scrolling if loaded
    if (typeof Lenis !== 'undefined') {
        // Inject required Lenis CSS styles globally
        const style = document.createElement('style');
        style.innerHTML = `
            html.lenis, html.lenis body { height: auto; }
            .lenis.lenis-smooth { scroll-behavior: auto !important; }
            .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
            .lenis.lenis-stopped { overflow: hidden; }
            .lenis.lenis-smooth iframe { pointer-events: none; }
        `;
        document.head.appendChild(style);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom out-expo easing
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // ----------------------------------------------------------
    // 1. CART SYSTEM  (localStorage-backed)
    // ----------------------------------------------------------
    const CART_KEY = 'monolith_cart';

    function getCart() {
        try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
        catch { return []; }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function addToCart(item) {
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        updateBadge();
    }

    function removeFromCart(index) {
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        updateBadge();
    }

    function getCartCount() {
        return getCart().length;
    }

    function getCartTotal() {
        return getCart().reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    }

    // Expose globally so inline scripts can call them
    window.MonolithCart = { getCart, saveCart, addToCart, removeFromCart, getCartCount, getCartTotal };

    // ----------------------------------------------------------
    // 2. BADGE COUNTER  (red dot on shopping_bag icon)
    // ----------------------------------------------------------
    function updateBadge() {
        const count = getCartCount();
        document.querySelectorAll('.cart-badge').forEach(b => {
            b.textContent = count;
            b.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    function initBadges() {
        // Wrap every shopping_bag button in a relative container + badge
        document.querySelectorAll('[data-icon="shopping_bag"]').forEach(btn => {
            // Skip if already wrapped
            if (btn.parentElement.classList.contains('cart-icon-wrap')) return;

            const wrap = document.createElement('a');
            wrap.href = 'cart.html';
            wrap.className = 'cart-icon-wrap relative inline-flex items-center';
            wrap.setAttribute('aria-label', 'View cart');

            btn.parentNode.insertBefore(wrap, btn);
            wrap.appendChild(btn);

            const badge = document.createElement('span');
            badge.className = 'cart-badge absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full items-center justify-center';
            badge.style.display = 'none';
            wrap.appendChild(badge);
        });
        updateBadge();
    }

    // ----------------------------------------------------------
    // 3. SEARCH OVERLAY
    // ----------------------------------------------------------
    function createSearchOverlay() {
        if (document.getElementById('search-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'search-overlay';
        overlay.className = 'fixed inset-0 z-[70] bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-xl flex flex-col items-center justify-center translate-y-full transition-transform duration-500 ease-in-out';
        overlay.innerHTML = `
            <button id="close-search" class="absolute top-8 right-8 material-symbols-outlined text-stone-600 dark:text-stone-300 text-3xl hover:opacity-70 transition-opacity" data-icon="close">close</button>
            <div class="w-full max-w-2xl px-8">
                <label class="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6 block font-inter">Search Monolith</label>
                <input id="search-input" type="text" placeholder="What are you looking for?" class="w-full bg-transparent border-0 border-b-2 border-stone-300 dark:border-stone-600 focus:border-stone-800 dark:focus:border-stone-200 text-3xl md:text-5xl font-headline tracking-tight py-4 outline-none focus:ring-0 text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-700 transition-colors"/>
                <p class="mt-6 text-xs text-stone-400 uppercase tracking-widest font-inter">Try: Overcoat, Silk, Merino</p>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('close-search').addEventListener('click', closeSearch);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

        // Search Submission
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = searchInput.value.trim();
                    if (query) {
                        window.location.href = `catalog.html#search=${encodeURIComponent(query)}`;
                    }
                }
            });
        }
    }

    function openSearch() {
        const overlay = document.getElementById('search-overlay');
        if (overlay) {
            overlay.classList.remove('translate-y-full');
            setTimeout(() => document.getElementById('search-input')?.focus(), 400);
        }
    }

    function closeSearch() {
        const overlay = document.getElementById('search-overlay');
        if (overlay) overlay.classList.add('translate-y-full');
    }

    function initSearch() {
        createSearchOverlay();
        document.querySelectorAll('[data-icon="search"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openSearch();
            });
        });
    }

    // ----------------------------------------------------------
    // 4. NEWSLETTER FORM
    // ----------------------------------------------------------
    function initNewsletter() {
        document.querySelectorAll('form').forEach(form => {
            const emailInput = form.querySelector('input[type="email"]');
            if (!emailInput) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = emailInput.value.trim();
                if (!email) return;

                // Replace form content with thank-you message
                form.innerHTML = `
                    <div class="py-8 text-center">
                        <span class="material-symbols-outlined text-4xl text-secondary mb-4 block" data-icon="check_circle">check_circle</span>
                        <p class="text-lg font-headline mb-2">Welcome to the Collective.</p>
                        <p class="text-sm text-on-surface-variant">You'll receive our next editorial at <strong>${email}</strong></p>
                    </div>
                `;
            });
        });
    }

    // ----------------------------------------------------------
    // 5. MOBILE MENU  (unified handler — replaces per-page scripts)
    // ----------------------------------------------------------
    function initMobileMenu() {
        const mBtn = document.getElementById('mobile-menu-btn');
        const cBtn = document.getElementById('close-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (mBtn && cBtn && menu) {
            mBtn.addEventListener('click', () => menu.classList.remove('translate-x-full'));
            cBtn.addEventListener('click', () => menu.classList.add('translate-x-full'));
        }
    }

    // ----------------------------------------------------------
    // INIT — run everything on DOMContentLoaded
    // ----------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        initBadges();
        initSearch();
        initNewsletter();
        initMobileMenu();
    });

    // ----------------------------------------------------------
    // 5. GLOBAL DARK MODE TOGGLE
    // ----------------------------------------------------------
    const initThemeToggle = () => {
        const toggles = document.querySelectorAll('.theme-toggle');
        const h = document.documentElement;

        // Apply initial state
        const storedTheme = localStorage.getItem('monolith_theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            h.classList.add('dark');
            h.classList.remove('light');
            toggles.forEach(t => t.innerText = 'light_mode');
        } else {
            h.classList.add('light');
            h.classList.remove('dark');
            toggles.forEach(t => t.innerText = 'dark_mode');
        }

        toggles.forEach(t => {
            t.addEventListener('click', () => {
                if (h.classList.contains('dark')) {
                    h.classList.remove('dark');
                    h.classList.add('light');
                    localStorage.setItem('monolith_theme', 'light');
                    toggles.forEach(btn => btn.innerText = 'dark_mode');
                } else {
                    h.classList.remove('light');
                    h.classList.add('dark');
                    localStorage.setItem('monolith_theme', 'dark');
                    toggles.forEach(btn => btn.innerText = 'light_mode');
                }
            });
        });
    };
    initThemeToggle();

    // ----------------------------------------------------------
    // 6. IMMERSIVE LIGHTBOX (Product Page)
    // ----------------------------------------------------------
    const initLightbox = () => {
        const mainImage = document.getElementById('p-main-img');
        if (!mainImage) return;

        mainImage.parentElement.style.cursor = 'zoom-in';
        
        mainImage.parentElement.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 z-[9999999] bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl flex items-center justify-center opacity-0 transition-opacity duration-500 cursor-zoom-out';
            
            const imgClone = document.createElement('img');
            imgClone.src = mainImage.src;
            imgClone.className = 'max-w-[90vw] max-h-[90vh] object-contain scale-95 transition-transform duration-700 ease-out';
            
            overlay.appendChild(imgClone);
            document.body.appendChild(overlay);
            
            // Force reflow
            void overlay.offsetWidth;
            
            overlay.style.opacity = '1';
            imgClone.style.transform = 'scale(1)';
            
            // Disable native body scroll
            document.documentElement.style.overflow = 'hidden';
            
            const closeLightbox = () => {
                overlay.style.opacity = '0';
                imgClone.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    overlay.remove();
                    document.documentElement.style.overflow = '';
                }, 500);
            };
            
            overlay.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            }, { once: true });
        });
    };
    initLightbox();

    // ----------------------------------------------------------
    // 7. SIZE GUIDE MODAL
    // ----------------------------------------------------------
    const initSizeGuide = () => {
        const btn = document.getElementById('size-guide-btn');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 z-[9999999] bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-400';

            const modal = document.createElement('div');
            modal.className = 'bg-white dark:bg-stone-900 max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto p-8 md:p-12 relative scale-95 transition-transform duration-500 ease-out';
            modal.innerHTML = `
                <button class="absolute top-4 right-4 material-symbols-outlined text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors text-2xl" id="close-size-guide">close</button>
                <h2 class="text-2xl font-headline tracking-tight mb-2">Size Guide</h2>
                <p class="text-xs uppercase tracking-widest text-stone-400 mb-8">All measurements in centimeters (cm)</p>
                
                <div class="overflow-x-auto">
                    <table class="w-full text-xs uppercase tracking-wider">
                        <thead>
                            <tr class="border-b border-stone-200 dark:border-stone-700">
                                <th class="text-left py-4 pr-6 font-bold text-stone-900 dark:text-stone-100">Size</th>
                                <th class="text-center py-4 px-4 font-bold text-stone-900 dark:text-stone-100">Chest</th>
                                <th class="text-center py-4 px-4 font-bold text-stone-900 dark:text-stone-100">Waist</th>
                                <th class="text-center py-4 px-4 font-bold text-stone-900 dark:text-stone-100">Hips</th>
                                <th class="text-center py-4 px-4 font-bold text-stone-900 dark:text-stone-100">Shoulder</th>
                                <th class="text-center py-4 pl-4 font-bold text-stone-900 dark:text-stone-100">Length</th>
                            </tr>
                        </thead>
                        <tbody class="text-stone-500 dark:text-stone-400">
                            <tr class="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                                <td class="py-4 pr-6 font-medium text-stone-800 dark:text-stone-200">XS</td>
                                <td class="text-center py-4 px-4">82–86</td>
                                <td class="text-center py-4 px-4">64–68</td>
                                <td class="text-center py-4 px-4">88–92</td>
                                <td class="text-center py-4 px-4">38</td>
                                <td class="text-center py-4 pl-4">64</td>
                            </tr>
                            <tr class="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                                <td class="py-4 pr-6 font-medium text-stone-800 dark:text-stone-200">S</td>
                                <td class="text-center py-4 px-4">86–90</td>
                                <td class="text-center py-4 px-4">68–72</td>
                                <td class="text-center py-4 px-4">92–96</td>
                                <td class="text-center py-4 px-4">39</td>
                                <td class="text-center py-4 pl-4">66</td>
                            </tr>
                            <tr class="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                                <td class="py-4 pr-6 font-medium text-stone-800 dark:text-stone-200">M</td>
                                <td class="text-center py-4 px-4">90–94</td>
                                <td class="text-center py-4 px-4">72–76</td>
                                <td class="text-center py-4 px-4">96–100</td>
                                <td class="text-center py-4 px-4">41</td>
                                <td class="text-center py-4 pl-4">68</td>
                            </tr>
                            <tr class="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                                <td class="py-4 pr-6 font-medium text-stone-800 dark:text-stone-200">L</td>
                                <td class="text-center py-4 px-4">94–98</td>
                                <td class="text-center py-4 px-4">76–80</td>
                                <td class="text-center py-4 px-4">100–104</td>
                                <td class="text-center py-4 px-4">43</td>
                                <td class="text-center py-4 pl-4">70</td>
                            </tr>
                            <tr class="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                                <td class="py-4 pr-6 font-medium text-stone-800 dark:text-stone-200">XL</td>
                                <td class="text-center py-4 px-4">98–102</td>
                                <td class="text-center py-4 px-4">80–84</td>
                                <td class="text-center py-4 px-4">104–108</td>
                                <td class="text-center py-4 px-4">45</td>
                                <td class="text-center py-4 pl-4">72</td>
                            </tr>
                            <tr class="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                                <td class="py-4 pr-6 font-medium text-stone-800 dark:text-stone-200">XXL</td>
                                <td class="text-center py-4 px-4">102–106</td>
                                <td class="text-center py-4 px-4">84–88</td>
                                <td class="text-center py-4 px-4">108–112</td>
                                <td class="text-center py-4 px-4">47</td>
                                <td class="text-center py-4 pl-4">74</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
                    <p class="text-[10px] uppercase tracking-widest text-stone-400 leading-relaxed">
                        Monolith pieces are designed with an intentionally relaxed silhouette. If between sizes, we recommend sizing down for a more structured fit.
                    </p>
                </div>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);
            document.documentElement.style.overflow = 'hidden';

            // Animate in
            void overlay.offsetWidth;
            overlay.style.opacity = '1';
            modal.style.transform = 'scale(1)';

            const closeGuide = () => {
                overlay.style.opacity = '0';
                modal.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    overlay.remove();
                    document.documentElement.style.overflow = '';
                }, 400);
            };

            overlay.addEventListener('click', (ev) => {
                if (ev.target === overlay) closeGuide();
            });
            modal.querySelector('#close-size-guide').addEventListener('click', closeGuide);
            document.addEventListener('keydown', (ev) => {
                if (ev.key === 'Escape') closeGuide();
            }, { once: true });
        });
    };
    initSizeGuide();

})();
