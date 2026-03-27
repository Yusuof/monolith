const fs = require('fs');

const files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html', 'visit.html'];
const engineScript = '<script src="luxury_engine.js"></script>\n';

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Inject it right before </body>
    if (!content.includes('luxury_engine.js')) {
        content = content.replace('</body>', engineScript + '</body>');
        fs.writeFileSync(f, content, 'utf8');
    }
}
console.log('Engine injected successfully.');
