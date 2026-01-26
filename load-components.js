// Detect if we're in a subdirectory by checking the current path depth
const pathSegments = window.location.pathname.split('/').filter(seg => seg);
const basePath = pathSegments.length > 1 && pathSegments[pathSegments.length - 2] === 'blogentries' ? '../' : '';

// Load navbar
fetch(basePath + 'nav.html')
    .then(response => response.text())
    .then(data => {
        const header = document.querySelector('header');
        if (header) {
            header.outerHTML = data;
        }
    })
    .catch(error => console.error('Error loading nav:', error));

// Load footer
fetch(basePath + 'footer.html')
    .then(response => response.text())
    .then(data => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.outerHTML = data;
        }
    })
    .catch(error => console.error('Error loading footer:', error));
