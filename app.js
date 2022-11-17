// Action const
const idle = { code: "Idle", imageCount: 4, frequency: 220, infinite: true };
const shoot = { code: "FullShoot", imageCount: 20, frequency: 100, infinite: false };
const run = { code: "Run", imageCount: 8, frequency: 100, infinite: true };

// DOM manipulation variables
var detectiveElement = window.document.getElementById('detective');
var hillsElements = window.document.getElementsByClassName('background_hills');
var helperElement = window.document.getElementById('helper');
var hillsPositions = [0, 0, 0, 0, 0, 0];

// Sprite animation variables
var imageCount = 1;
var isAnimated = false;
var isFullAnimation = false;
var interval;
var intervalBackground;

// Keyboard event listeners
document.onkeydown = keyPressed;
document.onkeyup = keyUp;

// Default animation idle
animate(idle);

// Animate fonction
function animate(action) {

    isFullAnimation = !action.infinite;
    isAnimated = action.infinite;
    isIdle = action.code == 'Idle';

    // Clear current animations
    clearInterval(interval);
    clearInterval(intervalBackground);

    // Loop on sprite
    interval = setInterval(function() {
        doAction(action.code, action.imageCount, action.infinite);
    }, action.frequency);
}

// Perform action method
function doAction(action, imageMax, infinite = true) {

    // Single animation or loop
    if (infinite) {
        imageCount = imageCount > imageMax - 1 ? 1 : imageCount + 1;
    } else {
        imageCount > imageMax - 1 ? animate(idle) : imageCount++;
    }

    // Switch sprite image
    detectiveElement.src = `./character_detective/${action}/${action}_${imageCount}.png`;
}

// OnKeyUpevent
function keyUp(e) {
    if (!isFullAnimation) {
        isAnimated = false;
        animate(idle);
    }
}

// Onkeydown event
function keyPressed(key) {

    // If no animation in progress
    if ((!isAnimated && !isFullAnimation) || isIdle) {

        helperElement.style.visibility = 'hidden';

        // Run
        if (key.code == 'KeyD' || key.code == 'ArrowRight') {
            animate(run);
            animateBackGround();

            // Shoot
        } else if (key.code == 'Space') {
            animate(shoot);

            // Helper
        } else {
            helperElement.style.visibility = 'visible';
        }
    }
}

// Background animation
function animateBackGround() {

    // Parallax effect
    intervalBackground = setInterval(function() {
        for (let i = 0; i < hillsElements.length; i++) {
            hillsElements[i].style.backgroundPositionX = hillsPositions[i] + 'px'
            hillsPositions[i] -= i + 1
        }
    }, 20);
}

// Music
var music = document.getElementById("music");
var isPlaying = false;
music.volume = 1;

function togglePlay() {
    isPlaying ? music.pause() : music.play();
    isPlaying = !isPlaying;
};
