import anime from '/node_modules/animejs/lib/anime.es.js';
let shapes = [
    {
        d: "M278.1 -292.1C351.1 -205.1 394.5 -102.5 408.2 13.7C421.9 129.9 405.7 259.7 332.7 359.8C259.7 460 129.9 530.3 4.6 525.7C-120.7 521.1 -241.4 441.6 -330.2 341.5C-419 241.4 -476 120.7 -459.9 16.1C-443.8 -88.5 -354.6 -177 -265.8 -264C-177 -351 -88.5 -436.5 7 -443.5C102.5 -450.5 205.1 -379.1 278.1 -292.1"
    },
    {
        d: "M292.4 -279C392.5 -192.3 496.6 -96.2 505.5 9C514.5 114.1 428.4 228.2 328.3 290.7C228.2 353.3 114.1 364.3 -9.8 374.1C-133.6 383.9 -267.3 392.4 -340.3 329.9C-413.3 267.3 -425.6 133.6 -411.1 14.5C-396.7 -104.7 -355.3 -209.3 -282.3 -296C-209.3 -382.6 -104.7 -451.3 -4.2 -447.1C96.2 -442.8 192.3 -365.7 292.4 -279"
    },
    {
        d: "M353.5 -356.6C423.8 -283.1 422.9 -141.6 421.4 -1.5C419.9 138.6 417.9 277.2 347.5 339.8C277.2 402.3 138.6 388.9 9 379.9C-120.7 370.9 -241.4 366.5 -323.5 303.9C-405.7 241.4 -449.3 120.7 -450.3 -0.9C-451.2 -122.6 -409.5 -245.1 -327.3 -318.6C-245.1 -392.1 -122.6 -416.6 9.5 -426.1C141.6 -435.6 283.1 -430.1 353.5 -356.6"
    },
    {
        d: "M347.1 -311.2C447.2 -247 523.9 -123.5 507.9 -16C491.9 91.5 383.1 182.9 283 245.5C182.9 308 91.5 341.7 -4.1 345.8C-99.7 350 -199.4 324.5 -298.4 262C-397.4 199.4 -495.7 99.7 -509.4 -13.7C-523 -127 -452.1 -254.1 -353.1 -318.3C-254.1 -382.4 -127 -383.7 -1.8 -381.9C123.5 -380.2 247 -375.3 347.1 -311.2"
    },

]

const allContent = document.querySelectorAll('.itemImg');
const allText = document.querySelectorAll('.itemText');
const imageFooter = document.querySelectorAll('.footerImage');
let countAnim = []
for (let i = 0; i < allContent.length; i++) {
    countAnim.push(true)
}

let morph1 = anime({
    targets: '.morph-path1',
    d: [
        { value: shapes[0].d },
        { value: shapes[1].d },
        { value: shapes[2].d },
        { value: shapes[3].d },
    ],
    duration: 5000,
    direction: 'alternate',
    autoplay: true,
    easing: 'spring(1, 80, 5, 0)',
    elasticity: 200,
    loop: true
});

const translateXMorph = (target, x, opacity) => {
    anime({
        targets: target,
        translateX: [...x],
        opacity: [...opacity],
        easing: 'spring(1, 50, 7, 0)',
        autoplay: true,
        duration: 1000
    });
}

const translateXMorph1 = (target, x, opacity) => {
    anime({
        targets: target,
        translateX: [...x],
        opacity: [...opacity],
        easing: 'spring(1, 50, 7, 0)',
        autoplay: true,
        delay: 600
    });
}

const translateRandomMorph = (x, y, target, opacity) => {
    anime({
        targets: target,
        translateX: function () { return [0, anime.random(...x)]; },
        translateY: function () {
            const randY = anime.random(...y)
            if (randY > -100 && randY <= 0)
                return [0, randY - 100];
            if (randY < 100 && randY >= 0)
                return [0, randY + 100];
            return [0, randY];
        },
        scale: function () { return anime.random(0.5, 1); },
        rotate: function () { return anime.random(-360, 360); },
        opacity: [...opacity],
        borderRadius: function () { return ['50%', anime.random(10, 35) + '%']; },
        duration: function () { return anime.random(1200, 1800); },
        delay: function () { return anime.random(0, 400); },
        easing: 'spring(1, 50, 8, 0)',
        autoplay: true
    });
}

const morphContentAnimate = (i) => {
    if (countAnim[i]) {
        translateXMorph(allContent[i], i % 2 === 0 ? [550, -250] : [-550, 250], [0, 1])
        translateRandomMorph([150, 650], [-350, 350], allText[i].querySelectorAll('ul .itemParticle'), [0, 1])
        if (i !== 0) {
            translateXMorph(allContent[i - 1], (i - 1) % 2 === 0 ? [-250, 550] : [250, -550], [1, 0])
            translateRandomMorph([0, 0], [0, 0], allText[i - 1].querySelectorAll('ul .itemParticle'), [1, 0])
        }
        if (i !== 6) {
            translateXMorph(allContent[i + 1], (i - 1) % 2 === 0 ? [-250, 550] : [250, -550], [1, 0])
            translateRandomMorph([0, 0], [0, 0], allText[i + 1].querySelectorAll('ul .itemParticle'), [1, 0])
        }
        countAnim[i] = false;
    }
    countAnim.forEach((item, index) => {
        if (i !== index)
            countAnim[index] = true
    })
}

window.addEventListener('scroll', e => {
    const scroll = Math.round(window.scrollY)
    const height = window.outerHeight
    document.documentElement.style.setProperty('--scrollTop', `${scroll}px`)
    switch (true) {
        case scroll >= height + 200 && scroll <= height * 2:
            morphContentAnimate(0)
            break;
        case scroll >= height * 2 && scroll <= height * 3:
            morphContentAnimate(1)
            break;
        case scroll >= height * 3 && scroll < height * 4:
            morphContentAnimate(2)
            break;
        case scroll >= height * 4 && scroll <= height * 5:
            morphContentAnimate(3)
            break;
        case scroll >= height * 5 && scroll <= height * 6:
            morphContentAnimate(4)
            break;
        case scroll >= height * 6 && scroll <= height * 7:
            morphContentAnimate(5)
            break;
        case scroll >= height * 7 && scroll <= height * 8:
            morphContentAnimate(6)
            break;
        case scroll >= height * 8:

            break;
    }
})
