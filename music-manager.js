// Load and manage music player
fetch('music-player.html')
    .then(response => response.text())
    .then(data => {
        // Insert inside header at the beginning
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentHTML('afterbegin', data);
            initMusicPlayer();
        }
    });

function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    
    if (!audio || !toggle) return;

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
