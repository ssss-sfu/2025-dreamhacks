const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let needsUpdate = true;


class Constellation {
    constructor(width_percentage, height_pixel, scrollSpeed, scaleFactor, points, lines) {
        // Scale all point coordinates by scaleFactor
        points = Object.fromEntries(
            Object.entries(points).map(([key, point]) => [
                key,
                { x: point.x * scaleFactor, y: point.y * scaleFactor, size: point.size }
            ])
        );

        // width_percentage = Math.random() * 100;
        this.x = canvas.width * (width_percentage / 100);
        this.y = height_pixel
        this.width_percentage = width_percentage;
        this.scrollSpeed = scrollSpeed;
        this.points = points;
        this.lines = lines;

        this.width = Math.max(...Object.values(points).map(point => point.x));
        this.height = Math.max(...Object.values(points).map(point => point.y));

        this.hideCircleRadius = Math.max(
            ...Object.values(points).map(point =>
                Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2))
            )
        );
    }
}

const constellations = [
    // big dipper
    new Constellation(
        20, 1000, 0.6, 2, {
        "polaris": { x: 200, y: 160, size: 3 },
        "yildun": { x: 180, y: 110, size: 2 },
        "urodelus": { x: 150, y: 80, size: 3 },
        "alifa": { x: 100, y: 60, size: 4 },
        "kochab": { x: 20, y: 50, size: 3 },
        "pherkad": { x: 30, y: 0, size: 3 },
        "anwar": { x: 120, y: 20, size: 2 },
    }, [
        ["polaris", "yildun"],
        ["yildun", "urodelus"],
        ["urodelus", "alifa"],
        ["alifa", "kochab"],
        ["kochab", "pherkad"],
        ["pherkad", "anwar"],
        ["anwar", "alifa"],
    ]),

    // corona borealis
    new Constellation(
        80, 1500, 0.4, 2, {
            "iota": { x: 0, y: 80, size: 3 },
            "epsilon": { x: 25, y: 99, size: 3 },
            "delta": { x: 45, y: 98, size: 3 },
            "gamma": { x: 70, y: 90, size: 3 },
            "alphecca": { x: 87, y: 70, size: 3 },
            "nusakan": { x: 85, y: 30, size: 3 },
            "theta": { x: 50, y: 10, size: 3 },
            "no_name": { x: 30, y: 15, size: 3 },
        }, [
            ["iota", "epsilon"],
            ["epsilon", "delta"],
            ["delta", "gamma"],
            ["gamma", "alphecca"],
            ["alphecca", "nusakan"],
            ["nusakan", "theta"],
            ["theta", "no_name"],
        ]
    )

]

// Star properties
const stars = [];
const starsMoveSpeeds = {};

// could also generate so it would be based on star density rather than hardcoded count
const numStars = 200;
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

    // constellations are hardcoded and do not wrap
    constellations.forEach(constellation => {
        constellation.y -= scrollDiff * constellation.scrollSpeed;
    });

    needsUpdate = true;
});



// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars()
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


    // draw constellations
    constellations.forEach(constellation => {
        cx = constellation.x
        cy = constellation.y

        // draw lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        constellation.lines.forEach(line => {
            const start = constellation.points[line[0]];
            const end = constellation.points[line[1]];
            ctx.beginPath();
            ctx.moveTo(cx + start.x, cy + start.y);
            ctx.lineTo(cx + end.x, cy + end.y);
            ctx.lineWidth = 2
            ctx.stroke();
        });

        // do dark magic
        const padding = 10;

        const start = 80 // begin showing constellation **lines** when thetop of the constellation is at top 80% of viewport
        const end = 20 // complete rendering when **top** of constellation is at top 20% of viewport

        percentage_of_constellation_from_top_of_page = (cy) / window.innerHeight * 100;

        percentage_to_render = ((percentage_of_constellation_from_top_of_page - end) / (start - end)) * 100;
        percentage_to_render = Math.min(100, percentage_to_render);
        percentage_to_render = Math.max(0, percentage_to_render);
        // render circle over the lines to make it look like its fading in
        // (but actually we're fading it out in reverse)

        let size = (constellation.hideCircleRadius + padding) * (percentage_to_render / 100);
        if (percentage_to_render > 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, size, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
        }



        // draw stars of constellation

        Object.values(constellation.points).forEach(point => {
            ctx.beginPath();
            ctx.fillStyle = `rgb(255, 255, 255)`;
            ctx.arc(cx + point.x, cy + point.y, point.size, 0, Math.PI * 2);
            ctx.fill();
        });


    });


    // Draw normal stars
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