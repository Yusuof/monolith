// add_lenis.js
const fs = require('fs');

const files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html', 'visit.html'];
const lenisScript = '<script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>\n';

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Check if it already has lenis
    if (!content.includes('lenis.min.js')) {
        // We'll inject it right before <script src="app.js"></script> or <script src="products.js"></script>
        // Let's just put it right before </body>
        content = content.replace('</body>', lenisScript + '</body>');
        fs.writeFileSync(f, content, 'utf8');
    }
}

console.log('HTML files heavily buttered.');
