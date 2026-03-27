const fs = require('fs');

const files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html', 'visit.html'];
// Looking for:
// <button class="material-symbols-outlined text-stone-600 dark:text-stone-300 hover:opacity-70 transition-opacity duration-300" data-icon="search">search</button>
// We will insert our theme toggle button right before search

const themeBtn = '<button class="theme-toggle material-symbols-outlined text-stone-600 dark:text-stone-300 hover:opacity-70 transition-opacity duration-300">dark_mode</button>\n';

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Check if it's already there
    if (!content.includes('class="theme-toggle')) {
        // Desktop / Mobile shared icon cluster
        const searchBtnRegex = /(<button class="material-symbols-outlined text-stone-600 dark:text-stone-300 hover:opacity-70 transition-opacity duration-300" data-icon="search">search<\/button>)/;
        content = content.replace(searchBtnRegex, themeBtn + '        $1');
        
        fs.writeFileSync(f, content, 'utf8');
    }
}
console.log('Dark Mode icons injected into all Navbars.');
