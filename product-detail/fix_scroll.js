const fs = require('fs');

const files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html', 'visit.html'];

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Look for <body class="... "> and add overflow-y-scroll if not there
    // The exact string in most files is:
    // <body class="bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container">
    // or similar.
    
    content = content.replace(/<body class="([^"]+)">/, (match, classes) => {
        if (!classes.includes('overflow-y-scroll')) {
            return `<body class="${classes} overflow-y-scroll">`;
        }
        return match;
    });
    
    // visit.html had: <body class="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
    // The regex matches any <body class="..."> so it works!
    
    fs.writeFileSync(f, content, 'utf8');
}
console.log('done');
