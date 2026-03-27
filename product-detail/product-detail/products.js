// ============================================================
// MONOLITH — Product Data Store (products.js)
// Central source of truth for all product information
// ============================================================

const PRODUCTS = [
    {
        id: 'architectural-overcoat',
        name: 'Architectural Overcoat',
        subtitle: 'Virgin Wool Blend',
        price: 840,
        category: 'essentials',
        tag: 'Limited Edition',
        isNew: true,
        date: '2024-11-01',
        description: 'An exploration of silhouette and texture. This piece is handcrafted in our local workshop using double-faced merino wool sourced from regional heritage mills.',
        details: 'Every seam is bound by hand, reflecting a commitment to permanence over trends. The structured shoulders give way to a soft, enveloping drape that moves with intentional grace.',
        care: ['100% Local Merino Wool', 'Professional dry clean only', 'Steam on low heat', 'Store on structured hangers'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxDMC35trgit214lY8QXgI-TmZz-U6fn8NQI045jkEY4s4Bwfv0ipHrS1RBQWyK3yGhN-WjUWGC69NWqv7PCEEXUrpTvUq2vNfUn0sR_i6_Iz5tLPFy9b0d2sCIiDIC2Ih948M9NqMZRYkS_61XKdnEjU12LRUL5VvaJyH2Pl72ggG9sNjDCV3GyJ0epohhHBOjHDrCVdwCdzTfEzGoWAhWK4mZluWY2xDpTFagqCjWtGiFcT4filgc2YdAmP6gu0ixrjzGnukrA',
        gallery: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDQQvr70NsnCQwEqfMEgwtonhjv3DEyFbfLX_NUl-ut9oSYzzUjrNS-9U7nGPYDg7Qgx5Ws2MbjgcEdt0m7V4nWstHZy9JBYOYC3nUtvyvpHCZrbstIQ5vzCl4etz6wktcH0LXNn7z0hCrvviNOJpq9DEuxJVJGCB8crtxjiMXv5IccdwkwVFJQ-LzM4iVFkRwnQBnJjUL05Bir9N6U5aulUPSJbazDuBKFGrEZ-VBZOL2m6JHdRFh8EwFQtSnyRJMNDcSOrGM3Og',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCps7xM4tMfeSaGpdCx3cuLVUb9k-UPv27nmkuKsyE3Ersk6vylSsqyThFx-12fq4mlXwLbpeBwDA101N_X2nOVMqtg_QvFeDWEWXZbAg9M-ppSyEqHIUZy4z5TkAwsfYH_OJbe79eY-nzgBEkCKOZwJwNS0Oim-mU__K6u2dTd89HktCm2op_LzpZyRy_8xtzPm3MGfUVlz_wYKB9di1fv--9xn3AjIgie6MWiKc8H7jfLYjpSPP3ybOJTrOdHnaH6X7SfUfFAgg',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA-PR0GCVCBKF2-NxYbgtHpOoGbtahc_WQpxawZSNRCzjFpWQe1yXG-1fgQG6Bi7gDCBVTTWhhc4groZ0Rv534KBtmPBIFGrsX8tD6Foj0vrJVBcFNaZGGgOAiFw6Aq2QUhAxEymV0mVjgR_xd6Z42eVtel-Ph5e6etgbIWbnNdkT_PdnyIRmo4aUhgrdSj76qgGBjpnGjQdTacRglWQUZ2mRqG2J-rzzBzCAas073ZfB_1CkQiNUq8t0AM6Jpk0m5vB2mjl9TOHQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBUdgQmOe5esWQoJSYe_zeGIKTjz6QaHR4SxScSoPMMNSNzoCutumSSnT8akgyBlvST1bp-L-6Eb-xYhoDKfpjmEPHAHSZwiJO0Z0tv1LP4DwMXIiT_siGckBotxUiUnw7YZ7jAxmhk5_KVwM1_lP_NOK2ZURRc-dG5OpQXdmZnk_-FBkBVRQe7jWiW4dr6anqy0hsFtUx6N9iBqMxHuSk8eWVIy2epvtfE9o8-8W97TTEBdiKPSYsRIlWNTKM3eyFp-spUiMLGbg'
        ]
    },
    {
        id: 'cashmere-ribbed-scarf',
        name: 'Cashmere Ribbed Scarf',
        subtitle: 'Natural Cream',
        price: 220,
        category: 'essentials',
        tag: null,
        isNew: false,
        date: '2024-08-15',
        description: 'Luxuriously soft ribbed cashmere scarf, hand-finished with rolled edges. A timeless accessory that elevates any silhouette.',
        details: 'Crafted from Grade-A Mongolian cashmere, each scarf undergoes a three-stage softening process for an impossibly plush hand-feel.',
        care: ['100% Grade-A Cashmere', 'Hand wash cold or dry clean', 'Lay flat to dry', 'Store folded, away from light'],
        sizes: ['One Size'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiypepcUt087KIsF4prsFwkGjPSCU1Tnx8iCbNFi47Qq1PaJDdklp_erA4EZUay3N5w8Z6f2Ihz9B5oyQA9B9WBtVzFRikC9rqX22zU9nis6DbOmlNryq_UhuCwdtx_EtSnElCAMRsaqYMpxxuBfpYPRbf5CHPj262VtrBHlKof4RXMc9XJuuvUBdfd_2Y2yrPG8BTFA4XqXAlp11efU5Us9ImJUnJDNmSEIJb3AzubLii79SYigIcP5llptP3sv4SBfC7Zbtafg',
        gallery: []
    },
    {
        id: 'studio-trouser',
        name: 'Studio Trouser',
        subtitle: 'Earth Tones',
        price: 350,
        category: 'essentials',
        tag: null,
        isNew: false,
        date: '2024-07-20',
        description: 'Clean, architectural trousers with a relaxed wide-leg silhouette. Cut from premium organic cotton twill in a muted olive tone.',
        details: 'Features a high-rise waist with interior button closure, deep side pockets, and a clean-finish hem that pools elegantly over footwear.',
        care: ['100% Organic Cotton Twill', 'Machine wash cold, gentle cycle', 'Hang dry recommended', 'Iron on medium heat'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZwjeRli0qpdYA8uv83Y8M9qbpereITb4-IPJOMzFw4KxS9CAh0zqCFKtcsJBIMYkq2VbrXeoW_avC-VR13r2_hakeuyG_xqLN8V7w4u4pvoZOIOSkb5laRmcdYb-P3f-HlamtaHQ9CwPxZBwi03brVzyJGwHCSSdT7QB8v0OsmguVCgghx-WOt5shd7feZkxBSoRYXTs0kggySNhUfEIOVu7-uQ_1DdjB_5wQG_puZfRClLkXdyMWJ5QGcee40msFu-rvZkViEQ',
        gallery: []
    },
    {
        id: 'monolith-blazer',
        name: 'Monolith Blazer',
        subtitle: 'Charcoal Melange',
        price: 590,
        category: 'essentials',
        tag: null,
        isNew: true,
        date: '2024-10-10',
        description: 'A deconstructed single-breasted blazer with soft, unlined construction. The charcoal melange fabric has a subtle texture that catches the light.',
        details: 'Patch pockets, natural shoulder line, and a slightly longer length give this blazer an effortlessly modern attitude. Pairs with everything.',
        care: ['70% Wool, 30% Cashmere', 'Professional dry clean only', 'Steam to refresh', 'Store on wide hangers'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdOOW86Q0Wv8DEN8r9dFtvOx0m0u1cE5fl-wicvbzXPY2-3t_hPSb7feapUABg4lYRkhcaKWyqnntRMr-XcRaRdKVwHnGzOS4FBnghimgwVkIIaCkHN5zI8bSdCKta5EgskdGGHOBMGrnIQ0CXtFBeT7BGgdk_ohP3nGvMUBHPCt6MZ0agpmYnghauxT3O1eNjMdVjRmHo_JtF-catDaymf2TAyj0sdTd7qBKZMjFvQmulxsZrtHTSbKBJ3c0BanDnWgGF1nvpCw',
        gallery: []
    },
    {
        id: 'curated-signet',
        name: 'Curated Signet',
        subtitle: '18k Gold Leaf',
        price: 1100,
        category: 'collaborations',
        tag: null,
        isNew: true,
        date: '2024-11-05',
        description: 'Minimalist signet ring cast in 18-karat gold, featuring a micro-engraved Monolith insignia. A collaboration with local goldsmith Atelier Kin.',
        details: 'Each ring is individually cast using the lost-wax method, then hand-polished to a warm, satin finish. Comes in a handcrafted wooden box.',
        care: ['18k Gold', 'Clean with soft cloth', 'Avoid harsh chemicals', 'Store separately to prevent scratching'],
        sizes: ['S', 'M', 'L'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcyiESs5yv04gMJqv9YPL4eOJ8iStMpZj28OwWlU7762EH2-99r7OUfbkk2P-hY2ORd9DybNjUiFYDokqTaIVRYBiWKmlwL5i1ALDfCY5-1Gv-CPR1JKSMAbepVlFswYQFgs38LDLzk2u37lG97CKsbWLSCiGnqxOT5gHcPllbEabbdh3wSIiiwmuuqGWDW6ox-2s0BWhZuhrSVvfyYCnZ-6Etqfr6CWOsAx7PTj7xTzl79S0ZbxrSRdrBuV2PNP-y3n-REaEhng',
        gallery: []
    },
    {
        id: 'portfolio-tote',
        name: 'Portfolio Tote',
        subtitle: 'Forest Green Leather',
        price: 475,
        category: 'essentials',
        tag: null,
        isNew: false,
        date: '2024-06-01',
        description: 'A structured tote bag in vegetable-tanned leather with a rich forest green patina. Designed to carry your essentials with quiet confidence.',
        details: 'Features an interior laptop sleeve, magnetic closure, and hand-stitched leather handles that soften beautifully with wear.',
        care: ['Vegetable-Tanned Leather', 'Condition with leather balm every 3 months', 'Avoid prolonged water exposure', 'Store stuffed to maintain shape'],
        sizes: ['One Size'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeOBhEtadbiTqL0VfBI4i8uaVDTdfcLd48yjq-cP_j8l9mzdKh94CEKIPIPmgT_onCkSyPTb1FB2xV9b8bSqTI6B9L19CZffGNtiDrNCPx4wbLlelGjE0TJ64i58lBC3QuZDl-_h6hDalB_6vonZRpauZbrcQK68TNAxEtDezvbpdbzq2Vm_1slEedU5sS6Y5Vrc73p6HYTcG8Wsv65N3q2db90IMXZjgeNHaISrufMis74GKLcM7n1Yy378atPXRaHpfI7TlEkQ',
        gallery: []
    },
    {
        id: 'edition-01-sneaker',
        name: 'Edition 01 Sneaker',
        subtitle: 'Optic White Calfskin',
        price: 380,
        category: 'collaborations',
        tag: null,
        isNew: true,
        date: '2024-10-25',
        description: 'A minimalist court sneaker in premium Italian calfskin. Clean lines, tonal stitching, and a hand-finished Margom sole.',
        details: 'Designed in collaboration with a fourth-generation Italian shoemaker. Each pair is individually numbered and comes with a dust bag.',
        care: ['Italian Calfskin Leather', 'Wipe with damp cloth', 'Use shoe trees when storing', 'Apply leather protector before first wear'],
        sizes: ['S', 'M', 'L'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYx3Pdks_us8MKq_4pDQwV2e6PFJ9sAnrdR-2I4qae1wx0cfO_in2fvpznCyB3aEUAoFG8FeA6F5UAEENr9163sii1lwSpUgh1lBbmOG0r9RZ2dfaI2NAN5KrbNB8-gkTg7CTZIqmyUMN0cSV3mdRbD1gh-BmEqyL7z0afzX7wN1fbN1AKcbrQS64IfQ2VAnU4dOVabSGngnx0dj8XIZ0KB935pALjR7soy-1CsWRhTyfbG6M3PtiCNAhRDq5tA08J6FTnokaQuw',
        gallery: []
    },
    {
        id: 'structured-wool-overcoat',
        name: 'Structured Wool Overcoat',
        subtitle: 'Charcoal Grey — Series 01',
        price: 480,
        category: 'essentials',
        tag: null,
        isNew: false,
        date: '2024-05-15',
        description: 'The signature Monolith overcoat in a refined charcoal grey. A timeless silhouette built with Belgian linen-blend wool.',
        details: 'Features a concealed button closure, deep welt pockets, and a single back vent for ease of movement.',
        care: ['90% Wool, 10% Belgian Linen', 'Professional dry clean only', 'Steam on low heat', 'Store on padded hangers'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'assets/overcoat_main.png',
        gallery: ['assets/overcoat_gallery1.png']
    },
    {
        id: 'ribbed-silk-blend-knit',
        name: 'Ribbed Silk Blend Knit',
        subtitle: 'Oatmeal / Fine Gauge',
        price: 220,
        category: 'essentials',
        tag: null,
        isNew: false,
        date: '2024-06-20',
        description: 'A lightweight ribbed knit in a silk-cotton blend. The fine-gauge construction drapes beautifully and layers effortlessly.',
        details: 'Relaxed fit with a subtle sheen from the silk content. Ribbed cuffs and hem provide gentle structure.',
        care: ['60% Cotton, 40% Silk', 'Hand wash cold', 'Lay flat to dry', 'Cool iron if needed'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'assets/knit_main.png',
        gallery: ['assets/knit_gallery1.png']
    },
    {
        id: 'wide-leg-pant',
        name: 'Wide-Leg Pant',
        subtitle: 'Deep Black / Architectural Silhouette',
        price: 340,
        category: 'essentials',
        tag: null,
        isNew: false,
        date: '2024-07-01',
        description: 'A wide-leg trouser in deep black that creates an architectural silhouette. Cut from heavyweight Japanese cotton for a structured drape.',
        details: 'High-rise waistband with concealed closure. Deep pleats create volume that narrows at the ankle for a refined proportion.',
        care: ['100% Japanese Cotton', 'Machine wash cold', 'Hang dry', 'Iron on medium'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'assets/pant_main.png',
        gallery: ['assets/pant_gallery1.png']
    },
    {
        id: 'structured-silk-trousers',
        name: 'Structured Silk Trousers',
        subtitle: 'Noir / Tailored',
        price: 320,
        category: 'essentials',
        tag: null,
        isNew: true,
        date: '2024-10-30',
        description: 'Tailored trousers in heavyweight silk twill. A refined take on evening wear that transitions seamlessly from day to night.',
        details: 'Flat-front construction with side-seam pockets and a clean, unhemmed finish. The silk has a subtle matte sheen.',
        care: ['100% Mulberry Silk', 'Professional dry clean only', 'Steam on low', 'Store folded or on clip hangers'],
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpML_LXN-DSBvLBaMZHZn-hCQxR9UbdWe-vOOWyU1DVuD50VhEY6IOXs5MYIPObueFYgL6lTWfXV6f31ax5iU63N-FmSHdGLLZ54YKO7xSm55t3B7rWxVMPWw80UWQwXsF1BP-rr6dMeNZuS0w3eqJiUeq5nfB_v7dDtn4uMnK0UXiyJMTg646K2MRzg5jVSUZoo9p7malfDlo0dnUapFzs6X-v2yCa8BDywtY7ctCPCZKH1TKvvAL-RsR9_rAmd5KdNSHnBNKCQ',
        gallery: []
    },
    {
        id: 'heavyweight-essential-tee',
        name: 'Heavyweight Essential Tee',
        subtitle: 'Washed Black',
        price: 95,
        category: 'essentials',
        tag: null,
        isNew: false,
        date: '2024-04-01',
        description: 'A heavyweight cotton tee with a boxy, relaxed fit. The washed black finish gives it a lived-in character from day one.',
        details: 'Reinforced neckline, dropped shoulder seams, and a slightly longer body. The foundation of any Monolith wardrobe.',
        care: ['100% Organic Cotton (280gsm)', 'Machine wash cold', 'Tumble dry low', 'Will soften with each wash'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz0x5zvy83qm6-Nm7MqTm5NswnFbAg4sVhmZ8PkSclDipivDMJyS4aHbqtmJlS8oB9wlUVcDwSY1zUxZTiTdeRiJwPjBUCT6rtgvR9QqsYwbB2234wcqT4nYXwe_aQzLoxYDb_W3H6HzbauxVdqOqstk_TxDWpXj8NPgPBXZFFwNIizcpiwZ8uy_RryDv_j-4aUwCqrrZyAPiVaw0Qf3mEcLGyweTVOM1dSqG7rr1ZjAMR4AUoDkehfE-oxzA5qG1tcf5XgBu_dA',
        gallery: []
    },
    {
        id: 'merino-knit-scarf',
        name: 'Merino Knit Scarf',
        subtitle: 'Cream / Chunky Gauge',
        price: 180,
        category: 'essentials',
        tag: null,
        isNew: false,
        date: '2024-05-01',
        description: 'A chunky-gauge scarf knitted from extra-fine merino wool. Generous proportions allow for multiple styling options.',
        details: 'Hand-knitted by local artisans using traditional techniques. Each piece has subtle variations that make it unique.',
        care: ['100% Extra-Fine Merino', 'Hand wash cold', 'Reshape and lay flat to dry', 'Store folded in breathable bag'],
        sizes: ['One Size'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEmk563o2lBBPUYUp9RPPgZbIAdtgqXJKkocwJgU3DcypQGm5A7y5h4be_9aQYJJhy5hGMEaKfvN8gIObSFXp94hGn-Ed5yUtGQteK_XLb6VKoIyQzRLmBaUQU-FWSYscUexY9H45l0wkl89IU2WMgk43i2t73OvJ_-ppjmon9IKlDtLyIcB4m0s5jlgCRlF_JJcNsvD-i74S6isJYZcfdulnGtZpIQaKUIvopZR_q5U-WiuD5VMRKTj3tkXSDR-_UJJMBgBP1Mw',
        gallery: []
    }
];

// Helper: find product by ID
function getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
}

// Auto-populate galleries so every product has thumbnail previews
PRODUCTS.forEach(p => {
    if (!p.gallery || p.gallery.length === 0) {
        p.gallery = [p.image, p.image, p.image];
    }
    // If they have 1 gallery image (like the ones we just did), add the main image so there are multiple thumbs
    else if (p.gallery.length === 1) {
        p.gallery = [p.image, p.gallery[0], p.image];
    }
});
