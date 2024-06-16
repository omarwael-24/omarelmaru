document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    const confettiCount = 300;
    const confetti = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function randomColor() {
        const colors = ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd", "#f9bec7", "#f7cad0", "#fae0e4"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function createConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * confettiCount,
                color: randomColor(),
                tilt: Math.random() * 10 - 10
            });
        }
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
            ctx.fillStyle = c.color;
            ctx.fill();
        });
        updateConfetti();
    }

    function updateConfetti() {
        confetti.forEach(c => {
            c.y += Math.cos(c.d) + 1 + c.r / 2;
            c.x += Math.sin(c.d);

            if (c.x > canvas.width + 5 || c.x < -5 || c.y > canvas.height) {
                c.x = Math.random() * canvas.width;
                c.y = -10;
            }
        });
    }

    function animateConfetti() {
        drawConfetti();
        requestAnimationFrame(animateConfetti);
    }

    createConfetti();
    animateConfetti();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
