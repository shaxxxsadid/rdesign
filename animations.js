function animateProjectContent() {
    // First ensure all elements are hidden
    const elements = document.querySelectorAll('.slide.current .project-info h2, .slide.current .project-description, .slide.current .project-image-container, .slide.current .links');
    elements.forEach(el => {
        el.style.opacity = '0';
    });

    const timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 600
    });

    timeline
        .add({
            targets: '.slide.current .project-info h2',
            opacity: [0, 1],
            translateX: [-30, 0],
        })
        .add({
            targets: '.slide.current .project-description',
            opacity: [0, 1],
            translateX: [-30, 0],
        }, '-=400')
        .add({
            targets: '.slide.current .project-image-container',
            opacity: [0, 1],
            translateX: [30, 0],
        }, '-=400')
        .add({
            targets: '.slide.current .links',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400
        }, '-=200');
}
function animateIntroContent() {
    anime.timeline({
        easing: 'easeOutExpo'
    })
        .add({
            targets: '.slide.current .ml3',
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 800
        })
        .add({
            targets: '.slide.current .ml4',
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 800
        }, '-=400');
}
function animateSocialLinks() {
    anime({
        targets: '.social-link',
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutExpo',
        duration: 1000
    });
}

// Add this function at the beginning of the file
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.background-animation').appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random initial position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particlesContainer.appendChild(particle);

        // Animate each particle
        anime({
            targets: particle,
            translateX: () => anime.random(-100, 100),
            translateY: () => anime.random(-100, 100),
            opacity: [
                { value: [0, 0.5], duration: 1000 },
                { value: 0, duration: 1000, delay: 5000 }
            ],
            scale: [
                { value: [0, 1], duration: 1000 },
                { value: 0, duration: 1000, delay: 5000 }
            ],
            rotate: () => anime.random(0, 360),
            duration: () => anime.random(6000, 8000),
            delay: () => anime.random(0, 1000),
            loop: true,
            easing: 'easeInOutSine'
        });
    }
}

function animateAboutContent() {
    anime.timeline({
        easing: 'easeOutExpo'
    })
    .add({
        targets: '.slide.current .about-info',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800
    })
    .add({
        targets: '.slide.current .skill-tag',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(50),
        duration: 600
    }, '-=400')
    .add({
        targets: '.slide.current .about-image-container',
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 800
    }, '-=600');
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateIntroContent();
    animateSocialLinks();
    animateProjectContent();
    createParticles()
});