// Load navbar
fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        const header = document.querySelector('header');
        if (header) {
            header.outerHTML = data;
        }
    });

// Load footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.outerHTML = data;
        }
    });
