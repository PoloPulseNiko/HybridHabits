// Try to load from relative path, fallback to parent directory
async function loadComponent(filename, targetSelector, replaceMethod = 'outerHTML') {
    try {
        // First try current directory
        let response = await fetch(filename);
        if (!response.ok) {
            // If that fails, try parent directory
            response = await fetch('../' + filename);
        }
        const data = await response.text();
        const target = document.querySelector(targetSelector);
        if (target) {
            if (replaceMethod === 'outerHTML') {
                target.outerHTML = data;
            } else {
                target.innerHTML = data;
            }
            
            // Fix navigation links if we're in a subdirectory
            if (filename === 'nav.html') {
                fixNavLinks();
            }
        }
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
    }
}

// Fix navigation links based on current directory
function fixNavLinks() {
    const pathDepth = window.location.pathname.split('/').filter(seg => seg && seg.endsWith('.html')).length;
    const isInSubdir = pathDepth > 0 && window.location.pathname.includes('/blogentries/');
    
    if (isInSubdir) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('../')) {
                link.setAttribute('href', '../' + href);
            }
        });
    }
}

// Load navbar and footer
loadComponent('nav.html', 'header');
loadComponent('footer.html', 'footer');
