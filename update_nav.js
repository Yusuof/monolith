const fs = require('fs');

const files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html'];
const desktop_link = '<a class="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-stone-800 dark:after:bg-stone-200" href="visit.html">Visit Us</a>';
const mobile_link = '<a class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="visit.html">Visit Us</a>';

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    // We match the exact class for the desktop link to ensure we only target the desktop one
    const desktop_target = '<a class="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-stone-800 dark:after:bg-stone-200" href="story.html">Story</a>';
    
    content = content.replace(desktop_target, desktop_target + '\n' + desktop_link);
    
    // And the mobile link
    const mobile_target = '<a class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="story.html">Story</a>';
    content = content.replace(mobile_target, mobile_target + '\n        ' + mobile_link);
    
    fs.writeFileSync(f, content, 'utf8');
}

// Now fix visit.html
const index_content = fs.readFileSync('index.html', 'utf8');

// Grab everything up to <main>
const head_nav = index_content.split('<main>')[0];
// Grab everything from <footer> to end
const footer = index_content.split('</main>')[1];

const visit_content = fs.readFileSync('visit.html', 'utf8');

// Extract the main content from visit.html
const visit_main = visit_content.split('<main class="pt-[88px]">')[1].split('</main>')[0];

// Construct new visit.html
const new_visit = head_nav + '<main class="pt-24 min-h-screen">\n' + visit_main + '\n</main>\n' + footer;

fs.writeFileSync('visit.html', new_visit, 'utf8');

console.log("done");
