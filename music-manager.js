// Try to load music player from relative path, fallback to parent directory
async function loadMusicPlayer() {
    try {
        // Detect if we're in a subdirectory
        const isInSubdir = window.location.pathname.includes('/blogentries/');
        
        // First try current directory
        let response = await fetch('music-player.html');
        if (!response.ok) {
            // If that fails, try parent directory
            response = await fetch('../music-player.html');
        }
        const data = await response.text();
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentHTML('afterbegin', data);
            initMusicPlayer(isInSubdir);
        }
    } catch (error) {
        console.error('Error loading music player:', error);
    }
}

loadMusicPlayer();

function initMusicPlayer(isInSubdir = false) {
    const audio = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    
    if (!audio || !toggle) return;

    // Set the correct audio source path
    const audioSource = audio.querySelector('source');
    if (audioSource && isInSubdir) {
        audioSource.src = '../surf-house-productions-island-breeze.mp3';
        audio.load();
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
