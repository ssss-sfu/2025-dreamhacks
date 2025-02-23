const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let needsUpdate = true;


// Star properties
const stars = [];
const starsMoveSpeeds = {};

// Calculate stars based on screen dimensions
function calcNumStars() {
    let canvasArea = canvas.width * canvas.height;

    let numStars = canvasArea * 0.00014;

    numStars = Math.min(numStars, 1000);
    return Math.floor(numStars);
}
numStars = calcNumStars();


const starSpeed = 0.2;

// Create initial stars
function createStars() {
    stars.length = 0; // empty stars array

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + Math.random() * 1.5 + 1,
            opacity: Math.random(),
            shape: ["star", "circle"][Math.floor(Math.random() * 2)]
        });

        // stars need to be a bit bigger for their shape to be visible
        if (stars[i].shape == "star") stars[i].size+= Math.random()*2 + 1

        starsMoveSpeeds[i] = (Math.random() * 0.5 + 0.1 + Math.random() * 0.5) * 2;
    }
}

createStars()

// on scroll move stars up and down
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDiff = scrollY - lastScrollY;
    lastScrollY = scrollY;

    // stars wrap around the top/bottom of the page
    // normally that would be pretty noticeable, but because the stars
    // move at different speeds, it's not as noticeable
    stars.forEach(star => {
        star.y -= scrollDiff * starSpeed * starsMoveSpeeds[stars.indexOf(star)];
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
    });

    needsUpdate = true;
});



// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    numStars = calcNumStars();
    createStars() // redistribute stars on canvas when resized
    needsUpdate = true;
}

// Initial resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);



// the actual render loop stars
function animate() {
    if (!needsUpdate) {
        requestAnimationFrame(animate);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        
        if (star.shape === "star") {
            // 5-pointed star
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI) / 5;
                const x = star.x + star.size * Math.cos(angle);
                const y = star.y + star.size * Math.sin(angle);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.closePath();
            ctx.fill();
        } else if (star.shape === "circle") {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    needsUpdate = false;
    requestAnimationFrame(animate);
}

// Start animation
animate();