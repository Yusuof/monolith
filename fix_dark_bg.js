const fs = require('fs');

const files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html', 'visit.html', 'checkout.html'];

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    // 1. Fix hardcoded body background color — add dark mode variant
    // Replace: background-color: #fafaf5; 
    // With: background-color: #fafaf5; (keep for light, but also add dark override via separate rule)
    
    // Add a dark mode CSS rule right before </style>
    if (!content.includes('.dark body')) {
        content = content.replace('</style>', `
        .dark body { background-color: #111211 !important; color: #e0e0dc !important; }
        .dark .bg-surface { background-color: #111211 !important; }
        .dark .bg-background { background-color: #111211 !important; }
        .dark .bg-surface-container { background-color: #1a1c1a !important; }
        .dark .bg-surface-container-low { background-color: #151715 !important; }
        .dark .bg-surface-container-high { background-color: #1f211f !important; }
        .dark .text-on-surface { color: #e0e0dc !important; }
        .dark .text-on-background { color: #e0e0dc !important; }
        .dark .text-on-surface-variant { color: #a0a59e !important; }
        .dark .text-primary { color: #c4c3c3 !important; }
        .dark .border-outline-variant\\/20 { border-color: rgba(100,106,98,0.2) !important; }
    </style>`);
    }

    // 2. Add dark: overrides to the <body> Tailwind classes
    // Currently: bg-background text-on-background ...
    // Add: dark:bg-[#111211] dark:text-stone-200
    if (!content.includes('dark:bg-[#111211]')) {
        content = content.replace(
            /(<body class="[^"]*)(">)/,
            (match, prefix, suffix) => {
                if (!prefix.includes('dark:bg-')) {
                    return prefix + ' dark:bg-[#111211] dark:text-stone-200' + suffix;
                }
                return match;
            }
        );
    }

    // 3. Fix sections that have bg-surface without dark variant
    // bg-surface -> bg-surface dark:bg-[#111211]
    content = content.replace(/class="([^"]*?)bg-surface(?!\s*dark:)(?!\-)/g, (match, before) => {
        if (before.includes('dark:bg-')) return match;
        return match + ' dark:bg-[#111211]';
    });

    fs.writeFileSync(f, content, 'utf8');
}
console.log('Dark mode background overrides applied to all pages.');
