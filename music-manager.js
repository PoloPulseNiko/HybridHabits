// Detect if we're in a subdirectory by checking the current path depth
const pathSegments = window.location.pathname.split('/').filter(seg => seg);
const basePath = pathSegments.length > 1 && pathSegments[pathSegments.length - 2] === 'blogentries' ? '../' : '';

// Load and manage music player
fetch(basePath + 'music-player.html')
    .then(response => response.text())
    .then(data => {
        // Insert inside header at the beginning
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentHTML('afterbegin', data);
            initMusicPlayer();
        }
    })
    .catch(error => console.error('Error loading music player:', error));

function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    
    if (!audio || !toggle) return;

    // Set the correct audio source path
    const audioSource = audio.querySelector('source');
    if (audioSource) {
        const pathSegments = window.location.pathname.split('/').filter(seg => seg);
        const isInSubdir = pathSegments.length > 1 && pathSegments[pathSegments.length - 2] === 'blogentries';
        if (isInSubdir) {
            audioSource.src = '../surf-house-productions-island-breeze.mp3';
            audio.load();
        }
    }

    // Always start paused, never autoplay
    audio.pause();
    toggle.textContent = '🎵 Music is off | Want to turn it on? Click here!';
    toggle.classList.add('muted');

    // Toggle music on/off
    toggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            toggle.textContent = '🎵 Music is playing | Don\'t want it? Click here!';
            toggle.classList.remove('muted');
            localStorage.setItem('musicPlaying', 'true');
        } else {
            audio.pause();
            toggle.textContent = '🎵 Music is off | Want to turn it on? Click here!';
            toggle.classList.add('muted');
            localStorage.setItem('musicPlaying', 'false');
        }
    });
}
