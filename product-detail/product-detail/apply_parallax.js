const fs = require('fs');

function applyTo(file, imgAltText) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace the exact image tag
    const regex = new RegExp(`(<img alt="${imgAltText}" class=")([^"]+)(")`);
    content = content.replace(regex, `$1$2 scale-[1.15] origin-top"$3 data-parallax="0.15"`);
    fs.writeFileSync(file, content, 'utf8');
}

applyTo('index.html', 'High fashion editorial model');
applyTo('visit.html', 'Minimalist Storefront');

console.log('Parallax attributes applied.');
