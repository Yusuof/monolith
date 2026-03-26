const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const headNav = indexHtml.split('<main>')[0];
let footer = indexHtml.split('</main>')[1];

// Make sure the "Collections" or "Home" nav link isn't permanently active on "Checkout".
// We can just strip the "font-medium text-stone-900" class from "Home" for a fast fix without running fix_nav again.
const modifiedHeadNav = headNav.replace(/text-stone-900 dark:text-white font-medium transition-colors relative/g, 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors relative');

const checkoutMain = `
<main class="pt-32 pb-24 max-w-screen-2xl mx-auto px-8 min-h-screen">
    <header class="mb-16">
        <h1 class="text-4xl md:text-5xl font-headline tracking-tighter mb-4 italic">Secure Checkout</h1>
        <p class="text-sm text-on-surface-variant font-light tracking-wide">Complete your Monolith order.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Order Summary (Left) -->
        <div class="lg:col-span-5 order-2 lg:order-1">
            <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface mb-8 border-b border-outline-variant/20 pb-4">Order Summary</h2>
            <div id="checkout-cart-items" class="space-y-6 mb-8">
                <!-- Injected via JS -->
            </div>
            <div class="border-t border-outline-variant/20 pt-6 space-y-4">
                <div class="flex justify-between text-xs tracking-widest font-medium text-on-surface-variant">
                    <span>Subtotal</span>
                    <span id="checkout-subtotal">$0</span>
                </div>
                <div class="flex justify-between text-xs tracking-widest font-medium text-on-surface-variant">
                    <span>Shipping</span>
                    <span>Complimentary</span>
                </div>
                <div class="flex justify-between text-sm tracking-widest font-bold text-on-surface pt-4">
                    <span>Total</span>
                    <span id="checkout-total">$0</span>
                </div>
            </div>
        </div>

        <!-- Checkout Form (Right) -->
        <div class="lg:col-span-7 order-1 lg:order-2">
            <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface mb-8 border-b border-outline-variant/20 pb-4">Shipping & Payment</h2>
            
            <form id="checkout-form" class="space-y-12">
                <!-- Contact info -->
                <div class="space-y-6">
                    <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Contact</h3>
                    <div>
                        <input type="email" required placeholder="EMAIL ADDRESS" class="w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors mb-4">
                    </div>
                </div>

                <!-- Shipping -->
                <div class="space-y-6">
                    <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Shipping Address</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <input type="text" required placeholder="FIRST NAME" class="w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors">
                        <input type="text" required placeholder="LAST NAME" class="w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors">
                        <input type="text" required placeholder="ADDRESS" class="col-span-2 w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors">
                        <input type="text" required placeholder="CITY" class="w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors">
                        <input type="text" required placeholder="POSTAL CODE" class="w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors">
                    </div>
                </div>

                <!-- Payment -->
                <div class="space-y-6">
                    <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Payment Method</h3>
                    <div class="p-6 border border-stone-200 dark:border-stone-800 rounded bg-stone-50/50 dark:bg-stone-900/50 space-y-4">
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-stone-400">credit_card</span>
                            <span class="text-xs uppercase tracking-widest text-on-surface font-medium">Credit Card</span>
                        </div>
                        <input type="text" required placeholder="CARD NUMBER" class="w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors mt-2">
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" required placeholder="MM/YY" class="w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors">
                            <input type="text" required placeholder="CVC" class="w-full bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest transition-colors">
                        </div>
                    </div>
                </div>

                <button type="submit" class="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold tracking-[0.2em] uppercase py-5 hover:bg-stone-800 dark:hover:bg-white transition-colors">Place Order</button>
            </form>
        </div>
    </div>
</main>

<!-- Success Overlay -->
<div id="success-overlay" class="fixed inset-0 z-[10000000] bg-surface flex flex-col items-center justify-center opacity-0 pointer-events-none transition-opacity duration-1000">
    <span class="material-symbols-outlined text-6xl text-primary mb-8">check_circle</span>
    <h2 class="text-4xl font-headline italic mb-4">Order Confirmed</h2>
    <p class="text-sm text-on-surface-variant font-light tracking-widest uppercase mb-12">Your Monolith pieces are being prepared.</p>
    <a href="index.html" class="text-xs font-bold tracking-[0.2em] uppercase border-b border-primary pb-1 hover:text-stone-500 transition-colors">Return Home</a>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    // Render Checkout Items
    const container = document.getElementById('checkout-cart-items');
    const subElement = document.getElementById('checkout-subtotal');
    const totElement = document.getElementById('checkout-total');
    
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('monolith_cart')) || []; } catch(e) {}
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-xs text-on-surface-variant font-light italic">Your cart is empty.</p>';
    } else {
        let orderTotal = 0;
        cart.forEach(item => {
            orderTotal += (item.price * item.quantity);
            const row = document.createElement('div');
            row.className = 'flex gap-4 items-center';
            row.innerHTML = \`
                <div class="h-20 w-16 bg-stone-100 dark:bg-stone-900 shrink-0">
                    <img src="\${item.image}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 flex flex-col">
                    <span class="text-xs font-bold uppercase tracking-widest text-on-surface">\${item.name}</span>
                    <span class="text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">Size \${item.size} — Qty \${item.quantity}</span>
                </div>
                <span class="text-xs font-medium tracking-widest">$\${item.price}.00</span>
            \`;
            container.appendChild(row);
        });
        subElement.innerText = \`$\${orderTotal}.00\`;
        totElement.innerText = \`$\${orderTotal}.00\`;
    }

    // Checkout Form Submit
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert('Your cart is empty!');

        // Clear cart
        localStorage.removeItem('monolith_cart');
        
        // Show success
        const overlay = document.getElementById('success-overlay');
        overlay.classList.remove('pointer-events-none');
        overlay.style.opacity = '1';
        
        // Trigger global cart update event if app.js is listening
        window.dispatchEvent(new Event('storage'));
    });
});
</script>
`;

const newHTML = modifiedHeadNav + checkoutMain + footer;
fs.writeFileSync('checkout.html', newHTML, 'utf8');

console.log('checkout.html generated successfully.');
