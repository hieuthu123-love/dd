const bgMusic = new Audio("background.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;



function playLotus() {
    const petals = Array.from(document.querySelectorAll('.petal'))
        .sort((a, b) => (+a.dataset.delay) - (+b.dataset.delay));

    petals.forEach(p => {
        p.classList.remove('is-in');
        void p.offsetWidth;
    });

    const stagger = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--stagger'));
    let index = 0;

    function animatePetal() {
        if (index < petals.length) {
            petals[index].classList.add('is-in');
            const soundClone = petalSound.cloneNode();
            soundClone.currentTime = 0;
            soundClone.play().catch(() => {});
            index++;
            setTimeout(animatePetal, stagger);
        }
    }

    animatePetal();

    // Sau khi hoa nở xong, tạo pháo giấy
    setTimeout(launchConfetti, petals.length * stagger + 500);

}

// JS tạo bóng bay
function launchConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff6ab0', '#8fd3ff', '#ffd86b'];

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random vị trí ban đầu khắp màn hình
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight * 0.5 + 'px'; // phía trên màn hình

        // Random màu sắc
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random đường bay: x di chuyển, xoay
        const xMove = (Math.random() * 400 - 200) + 'px'; // di chuyển ngang
        const rRotate = (Math.random() * 720 - 360) + 'deg';
        confetti.style.setProperty('--x', xMove);
        confetti.style.setProperty('--r', rRotate);

        // Random thời gian rơi
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';

        container.appendChild(confetti);

        // Remove khi kết thúc animation
        confetti.addEventListener('animationend', () => confetti.remove());
    }
}




document.getElementById('replayBtn').addEventListener('click', () => {
    playLotus();
});

document.getElementById('startBtn').addEventListener('click', () => {
    const startScreen = document.querySelector('.start-screen');
    const stage = document.querySelector('.stage');
    startScreen.classList.add('fade-out');
    setTimeout(() => {
        startScreen.style.display = 'none';
        stage.classList.remove('hidden');
        bgMusic.play().catch(() => {});
        playLotus();
    }, 800);
});
