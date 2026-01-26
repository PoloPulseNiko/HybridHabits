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
        }
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
    }
}

// Load navbar and footer
loadComponent('nav.html', 'header');
loadComponent('footer.html', 'footer');
