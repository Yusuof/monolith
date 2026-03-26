// Inject luxury_engine.js and lenis into checkout.html since it was generated after the main injection scripts ran
const fs = require('fs');
let html = fs.readFileSync('checkout.html', 'utf8');
if (!html.includes('luxury_engine.js')) {
    html = html.replace('</body>', '<script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>\n<script src="luxury_engine.js"></script>\n</body>');
}
fs.writeFileSync('checkout.html', html, 'utf8');
console.log('Scripts injected into checkout.html');
