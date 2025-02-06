const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star properties
const stars = [];
const starsMoveSpeeds = {};
const numStars = 300;
const starSpeed = 0.2;

// Create initial stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random()
    });

    starsMoveSpeeds[i] = (Math.random() * 0.5 + 0.1 + Math.random() * 0.5 ) * 2;
}

// Scroll event listener
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDiff = scrollY - lastScrollY;
    lastScrollY = scrollY;

    // Update star positions based on scroll direction
    stars.forEach(star => {
        star.y -= scrollDiff * starSpeed * starsMoveSpeeds[stars.indexOf(star)];
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
    });
});

// Animation function
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();