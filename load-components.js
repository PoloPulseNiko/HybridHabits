// Detect if we're in a subdirectory
const basePath = window.location.pathname.includes('/blogentries/') ? '../' : '';

// Load navbar
fetch(basePath + 'nav.html')
    .then(response => response.text())
    .then(data => {
        const header = document.querySelector('header');
        if (header) {
            header.outerHTML = data;
        }
    });

// Load footer
fetch(basePath + 'footer.html')
    .then(response => response.text())
    .then(data => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.outerHTML = data;
        }
    });
