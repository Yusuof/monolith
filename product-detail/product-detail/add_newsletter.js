const fs = require('fs');

const files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html', 'visit.html'];
const newsletterHTML = `
<form class="mt-8 flex flex-col gap-2 relative group" onsubmit="event.preventDefault(); this.innerHTML = '<p class=\\'text-xs uppercase tracking-widest text-primary font-medium\\'>Subscribed to the Manifesto.</p>';">
    <input type="email" placeholder="ENTER EMAIL" required class="bg-transparent border-0 border-b border-stone-300 dark:border-stone-700 text-xs px-0 py-3 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-300 placeholder-stone-400 uppercase tracking-widest w-full transition-colors">
    <button type="submit" class="absolute right-0 top-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-stone-500 transition-colors material-symbols-outlined" style="font-size: 16px;">arrow_forward</button>
</form>
`;

// Target: <p class="text-xs leading-loose text-on-surface-variant italic font-light">Dedicated to the pursuit of intentional minimalism and the beauty of local craft.</p>
for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('ENTER EMAIL')) {
        const regex = /(<p class="text-xs leading-loose text-on-surface-variant italic font-light">Dedicated to the pursuit of intentional minimalism and the beauty of local craft.<\/p>)/;
        content = content.replace(regex, `$1\n${newsletterHTML}`);
        fs.writeFileSync(f, content, 'utf8');
    }
}
console.log('Newsletter form injected into all footers.');
