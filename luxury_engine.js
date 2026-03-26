// luxury_engine.js
// Handles all high-end editorial animations: Cursor, Parallax, Reveals, Page Transitions

document.addEventListener('DOMContentLoaded', () => {
    // Check if it's a touch device; if so, we skip the cursor
    const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // =========================================================
    // 1. CUSTOM EDITORIAL CURSOR
    // =========================================================
    if (!isTouchDevice) {
        const cursor = document.createElement('div');
        cursor.id = 'monolith-cursor';
        document.body.appendChild(cursor);

        const style = document.createElement('style');
        style.innerHTML = `
            @media (pointer: fine) {
                body, a, button, input, select, textarea, img { cursor: none !important; }
                #monolith-cursor {
                    position: fixed; top: 0; left: 0; width: 12px; height: 12px;
                    border-radius: 50%; pointer-events: none; z-index: 999999;
                    background-color: #2e342d; mix-blend-mode: normal; color: white;
                    border: 1px solid transparent;
                    transform: translate(-50%, -50%);
                    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, mix-blend-mode 0.3s, border-color 0.3s;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Inter', sans-serif; font-size: 0px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
                    will-change: transform;
                }
                .dark #monolith-cursor { background-color: #fafaf5; color: #111; }
                
                #monolith-cursor.hovering-link {
                    width: 48px; height: 48px; background-color: rgba(46,52,45,0.05); border-color: rgba(46,52,45,0.3); mix-blend-mode: normal; backdrop-filter: blur(2px);
                }
                .dark #monolith-cursor.hovering-link {
                    background-color: rgba(250,250,245,0.05); border-color: rgba(250,250,245,0.3);
                }

                #monolith-cursor.hovering-image {
                    width: 100px; height: 100px; background-color: #fafaf5; mix-blend-mode: difference; font-size: 10px; color: #111; border-color: transparent; backdrop-filter: none;
                }
            }
        `;
        document.head.appendChild(style);

        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let cursorX = mouseX, cursorY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const renderCursor = () => {
            // Spring easing (lerp)
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Event delegation for hover states (handles dynamically loaded products too)
        document.body.addEventListener('mouseover', (e) => {
            const t = e.target;
            if (t.closest('a') || t.closest('button')) {
                cursor.classList.add('hovering-link');
                cursor.classList.remove('hovering-image');
                cursor.innerText = '';
                return;
            }
            if (t.closest('img') || t.closest('.group') || (t.tagName && t.tagName.toLowerCase() === 'img')) {
                cursor.classList.add('hovering-image');
                cursor.classList.remove('hovering-link');
                cursor.innerText = 'View';
            }
        });
        document.body.addEventListener('mouseout', (e) => {
            const t = e.target;
            if (t.closest('a') || t.closest('button')) {
                cursor.classList.remove('hovering-link');
            }
            if (t.closest('img') || t.closest('.group') || (t.tagName && t.tagName.toLowerCase() === 'img')) {
                cursor.classList.remove('hovering-image');
                cursor.innerText = '';
            }
        });
    }

    // =========================================================
    // 2. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // =========================================================
    const revealStyle = document.createElement('style');
    revealStyle.innerHTML = `
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }
        .reveal-on-scroll.is-revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);

    // We will proactively add .reveal-on-scroll to key text blocks and images
    const elementsToReveal = document.querySelectorAll('h1, h2, h3, p, img:not(.no-reveal), .product-card');
    elementsToReveal.forEach(el => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered delay based on index if needed, but simple reveal is fine
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target); // Only reveal once
            }
        });
    }, { rootMargin: "0px 0px -50px 0px", threshold: 0.1 });

    elementsToReveal.forEach(el => revealObserver.observe(el));

    // Observer for dynamically added elements (like product-cards injected by app.js)
    const domObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // ELEMENT_NODE
                    // Add reveal logic to new product cards
                    const cards = Array.from(node.querySelectorAll ? node.querySelectorAll('.group') : []);
                    if (node.classList && node.classList.contains('group')) cards.push(node);
                    
                    cards.forEach(card => {
                        card.classList.add('reveal-on-scroll');
                        revealObserver.observe(card);
                    });
                }
            });
        });
    });
    domObserver.observe(document.body, { childList: true, subtree: true });

    // =========================================================
    // 3. PAGE TRANSITIONS (Smooth fade routing)
    // =========================================================
    const transStyle = document.createElement('style');
    transStyle.innerHTML = `
        body { 
            opacity: 0; 
            transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1); 
        }
        main {
            transform: translateY(15px); 
            transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        body.is-loaded { 
            opacity: 1; 
        }
        body.is-loaded main {
            transform: translateY(0); 
        }
        body.is-exiting { 
            opacity: 0; 
            transition: opacity 0.5s ease-in; 
        }
        body.is-exiting main {
            transform: scale(0.99) translateY(-10px); 
            transition: transform 0.5s ease-in;
        }
    `;
    document.head.appendChild(transStyle);

    // Trigger entrance animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('is-loaded');
        });
    });

    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            // Allow default behavior for external links, anchors, or new tabs
            if (!href || href.startsWith('#') || href.startsWith('http') || anchor.target === '_blank') return;
            
            e.preventDefault();
            document.body.classList.remove('is-loaded');
            document.body.classList.add('is-exiting');
            setTimeout(() => {
                window.location.href = href;
            }, 500); // Wait for exit animation
        });
    });

    // Make sure we fade in on back-button navigation
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('is-exiting');
            document.body.classList.add('is-loaded');
        }
    });

    // =========================================================
    // 4. PARALLAX IMAGE EFFECTS
    // =========================================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        const renderParallax = () => {
            const scrollY = window.scrollY;
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
                // Only translateY if it's not overriding something else, but hero images are usually fine
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
            requestAnimationFrame(renderParallax);
        };
        requestAnimationFrame(renderParallax);
    }

});
