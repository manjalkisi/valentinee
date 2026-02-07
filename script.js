document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const proposalContent = document.getElementById('proposal-content');
    const successContent = document.getElementById('success-content');
    const heartsContainer = document.querySelector('.hearts-container');
    const cardHeartsContainer = document.querySelector('.card-hearts');
    const loveSong = document.getElementById('love-song');
    const musicBtn = document.getElementById('music-control');
    const lyricLines = document.querySelectorAll('.lyric-line');
    const slides = document.querySelectorAll('.slide-img');

    // State Variables
    let isPlaying = false;
    let currentSlide = 0;

    // --- "Yes" Button Interaction ---
    yesBtn.addEventListener('click', () => {
        proposalContent.classList.add('hidden');
        successContent.classList.remove('hidden');
        musicBtn.classList.remove('hidden'); // Show music button

        createConfetti();
        startSlideshow();
    });

    // --- Slideshow Logic ---
    function startSlideshow() {
        if (slides.length === 0) return;

        // Show the first slide immediately (if not already handled by CSS/HTML)
        slides[currentSlide].classList.add('active');

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000); // Change image every 3 seconds
    }

    // --- Music Control Logic ---
    function toggleMusic() {
        if (isPlaying) {
            loveSong.pause();
            isPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '▶';
        } else {
            loveSong.play().then(() => {
                isPlaying = true;
                musicBtn.innerHTML = '⏸';
                musicBtn.classList.add('playing');

                // Show lyrics when music starts
                lyricLines.forEach((line) => {
                    line.classList.add('show');
                });
            }).catch(e => console.log("Audio play failed: ", e));
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }

    // --- "No" Button Interaction (Playful) ---
    // Moves the button to a random position when hovered or touched
    const moveEvents = ['mouseenter', 'touchstart', 'click'];
    moveEvents.forEach(event => {
        noBtn.addEventListener(event, (e) => {
            e.preventDefault(); // Prevent actual clicking
            moveButton();
            growYesButton();
        });
    });

    function moveButton() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate a new random position
        // Ensure it stays within the screen with safe padding from edges
        const padding = 20;
        const maxX = viewportWidth - btnRect.width - padding;
        const maxY = viewportHeight - btnRect.height - padding;

        const effectiveMaxX = Math.max(0, maxX);
        const effectiveMaxY = Math.max(0, maxY);

        const newX = Math.random() * (effectiveMaxX - padding) + padding;
        const newY = Math.random() * (effectiveMaxY - padding) + padding;

        // Apply new position
        noBtn.style.position = 'fixed'; // Break out of layout
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        // Add a class for visual effect (optional)
        noBtn.classList.add('moving');
    }

    // "Infinite loop" of persuasion: Make Yes button bigger every time they try to click No
    let scaleFactor = 1;
    function growYesButton() {
        scaleFactor += 0.2;
        // Responsive cap: Smaller limit on mobile to prevent blocking everything
        const maxScale = window.innerWidth < 480 ? 2.0 : 3.0;
        if (scaleFactor > maxScale) scaleFactor = maxScale;
        yesBtn.style.transform = `scale(${scaleFactor})`;
    }

    // --- Background Animations ---

    // 1. Floating Hearts Background
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';

        // Randomize position and size
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px'; // 20px - 40px

        // Randomize animation duration
        const duration = Math.random() * 3 + 4; // 4s - 7s
        heart.style.animationDuration = duration + 's';

        heartsContainer.appendChild(heart);

        // Remove after animation to prevent DOM clutter
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    // Create a heart every 500ms
    setInterval(createHeart, 500);

    // 2. Hearts INSIDE the card
    function createCardHeart() {
        if (!cardHeartsContainer) return; // Guard clause

        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';

        // Randomize position within card width
        heart.style.left = Math.random() * 100 + '%';

        // Smaller hearts for inside the card
        heart.style.fontSize = Math.random() * 15 + 10 + 'px'; // 10px - 25px

        // Faster animation for smaller space
        const duration = Math.random() * 2 + 3; // 3s - 5s
        heart.style.animationDuration = duration + 's';

        cardHeartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    // Spawn card hearts occasionally
    setInterval(createCardHeart, 800);

    // 3. Confetti Effect
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('floating-heart');
            confetti.innerHTML = Math.random() > 0.5 ? '💖' : '🎉';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.fontSize = Math.random() * 30 + 10 + 'px';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            heartsContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }
});
