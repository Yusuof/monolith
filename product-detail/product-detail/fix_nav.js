const fs = require('fs');

const files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html', 'visit.html'];
const pages = [
    { name: 'Home', href: 'index.html' },
    { name: 'Collections', href: 'catalog.html' },
    { name: 'Story', href: 'story.html' },
    { name: 'Visit Us', href: 'visit.html' }
];

const desktop_inactive = 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-stone-800 dark:after:bg-stone-200';
const desktop_active = 'text-stone-900 dark:text-white font-medium transition-colors relative'; // relative added to match structure if needed, but the original was 'text-stone-900 dark:text-white font-medium transition-colors'

const mobile_inactive = 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors';
const mobile_active = 'text-stone-900 dark:text-stone-100 font-medium transition-colors';

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Build desired desktop nav block
    let desktop_nav_html = '';
    for (const p of pages) {
        let is_active = (f === p.href) || (f === 'product.html' && p.href === 'catalog.html') || (f === 'cart.html' && false); // cart has no active nav link usually
        if (f === 'index.html' && p.href === 'index.html') is_active = true;
        else if (f !== 'index.html' && p.href === 'index.html') is_active = false;
        
        const css = is_active ? desktop_active : desktop_inactive;
        desktop_nav_html += `<a class="${css}" href="${p.href}">${p.name}</a>\n`;
    }
    
    // Build desired mobile nav block
    let mobile_nav_html = '';
    for (const p of pages) {
        let is_active = (f === p.href) || (f === 'product.html' && p.href === 'catalog.html') || (f === 'cart.html' && false);
        if (f === 'index.html' && p.href === 'index.html') is_active = true;
        else if (f !== 'index.html' && p.href === 'index.html') is_active = false;
        
        const css = is_active ? mobile_active : mobile_inactive;
        mobile_nav_html += `<a class="${css}" href="${p.href}">${p.name}</a>\n        `;
    }
    
    // Replace desktop nav
    // Looking for <div class="hidden md:flex items-center justify-center gap-8 font-noto-serif tracking-tight absolute left-1/2 -translate-x-1/2"> ... </div>
    const desktop_regex = /(<div class="hidden md:flex items-center justify-center gap-8 font-noto-serif tracking-tight absolute left-1\/2 -translate-x-1\/2">)[\s\S]*?(<\/div>\s*<div class="flex items-center gap-6">)/;
    content = content.replace(desktop_regex, `$1\n${desktop_nav_html}$2`);
    
    // Replace mobile nav
    // Looking for <div class="flex flex-col items-center gap-10 font-noto-serif text-3xl tracking-widest uppercase"> ... </div>
    const mobile_regex = /(<div class="flex flex-col items-center gap-10 font-noto-serif text-3xl tracking-widest uppercase">)[\s\S]*?(<\/div>\s*<\/div>\s*<script>|\n<\/div>\s*<main)/;
    
    // We can use a more precise regex for mobile
    const mobile_regex_2 = /(<div class="flex flex-col items-center gap-10 font-noto-serif text-3xl tracking-widest uppercase">)[\s\S]*?(<\/div>\s*<\/div>)/;
    content = content.replace(mobile_regex_2, `$1\n        ${mobile_nav_html}$2`);
    
    fs.writeFileSync(f, content, 'utf8');
}
console.log('done');
