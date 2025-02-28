const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const previewOverlay = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const closeBtn = document.querySelector('.close-btn');

let currentSlide = 0;
let isAnimating = false;

function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    const current = slides[currentSlide];
    const next = slides[(currentSlide + 1) % slides.length];

    // Reset all slides and their content
    slides.forEach(slide => {
        if (slide !== current && slide !== next) {
            slide.style.opacity = '0';
            slide.style.zIndex = '-1';
            resetSlideContent(slide);
        }
    });

    // Prepare next slide
    next.style.transform = 'translateX(100%)';
    next.style.opacity = '0';
    next.style.zIndex = '1';
    next.classList.add('current');
    resetSlideContent(next);

    anime.timeline({
        easing: 'easeInOutCubic'
    })
        .add({
            targets: current,
            translateX: '-100%',
            opacity: 0,
            duration: 800,
            begin: () => {
                resetSlideContent(current);
            },
            complete: () => {
                current.style.zIndex = '-1';
            }
        })
        .add({
            targets: next,
            translateX: ['100%', '0%'],
            opacity: [0, 1],
            duration: 800
        }, '-=800')
        .add({
            complete: () => {
                current.classList.remove('current');
                current.style.transform = '';
                currentSlide = (currentSlide + 1) % slides.length;

                switch (currentSlide) {
                    case 0:
                        animateIntroContent();
                        break;
                    case 1:
                        animateAboutContent();
                        break;
                    default:
                        animateProjectContent();
                        break;
                }
                setTimeout(() => {
                    isAnimating = false;
                }, 100);
            }
        });
}

function resetSlideContent(slide) {
    // Reset project content
    const projectElements = slide.querySelectorAll('.project-info h2, .project-description, .project-image-container, .links');
    projectElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'none';
    });

    // Reset intro content
    const introElements = slide.querySelectorAll('.ml3, .ml4');
    introElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'none';
    });

    // Reset about content - updated selectors and transforms
    const aboutElements = {
        info: slide.querySelector('.about-info'),
        skillTags: slide.querySelectorAll('.skill-tag'),
        imageContainer: slide.querySelector('.about-image-container')
    };

    if (aboutElements.info) {
        aboutElements.info.style.opacity = '0';
        aboutElements.info.style.transform = 'translateX(-30px)';
    }

    aboutElements.skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
    });

    if (aboutElements.imageContainer) {
        aboutElements.imageContainer.style.opacity = '0';
        aboutElements.imageContainer.style.transform = 'translateX(30px)';
    }
}

function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    const current = slides[currentSlide];
    const prev = slides[(currentSlide - 1 + slides.length) % slides.length];

    // Reset all non-current slides
    slides.forEach(slide => {
        if (slide !== current && slide !== prev) {
            slide.style.opacity = '0';
            slide.style.zIndex = '-1';
        }
    });

    // Prepare previous slide
    prev.style.transform = 'translateX(-100%)';
    prev.style.opacity = '0';
    prev.style.zIndex = '1';
    prev.classList.add('current');

    anime.timeline({
        easing: 'easeInOutCubic'
    })
        .add({
            targets: current,
            translateX: '100%',
            opacity: 0,
            duration: 800,
            complete: () => {
                current.style.zIndex = '-1';
            }
        })
        .add({
            targets: prev,
            translateX: ['-100%', '0%'],
            opacity: [0, 1],
            duration: 800
        }, '-=800')
        .add({
            complete: () => {
                current.classList.remove('current');
                current.style.transform = '';
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;

                switch (currentSlide) {
                    case 0:
                        animateIntroContent();
                        break;
                    case 1:
                        animateAboutContent();
                        break;
                    default:
                        animateProjectContent();
                        break;
                }

                setTimeout(() => {
                    isAnimating = false;
                }, 100);
            }
        });
}
// Image preview functionality
document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('click', function () {
        previewOverlay.style.display = 'flex';
        previewImage.src = this.src;

        anime({
            targets: '#previewImage',
            scale: [0, 1],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 600
        });
    });
});

closeBtn.addEventListener('click', () => {
    anime({
        targets: '#previewImage',
        scale: 0,
        opacity: 0,
        easing: 'easeInExpo',
        duration: 300,
        complete: () => {
            previewOverlay.style.display = 'none';
        }
    });
});

// Event listeners
next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape' && previewOverlay.style.display === 'flex') {
        closeBtn.click();
    }
});