// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing effect for greeting
const greetingText = "You Know What! You're the most adorable person i ever met! 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
let clickCount = 0;
let easterEggTriggered = false;
let clickCounterShown = false;

function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Show click counter after 5 clicks
function updateClickCounter() {
    if (clickCount === 5 && !clickCounterShown) {
        clickCounterShown = true;
        const counter = document.createElement('div');
        counter.id = 'click-counter';
        counter.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: linear-gradient(45deg, #ff69b4, #da70d6);
            color: white;
            padding: 12px 18px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 1rem;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
            animation: slideIn 0.6s ease forwards;
        `;
        counter.textContent = `Clicks: ${clickCount}/16 ✨`;
        document.body.appendChild(counter);
        
        // Add animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(-200px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    } else if (clickCounterShown && clickCount < 16) {
        // Update counter
        const counter = document.getElementById('click-counter');
        if (counter) {
            counter.textContent = `Clicks: ${clickCount}/16 ✨`;
            // Add pulse animation on update
            counter.style.animation = 'none';
            setTimeout(() => {
                counter.style.animation = 'pulse 0.4s ease';
            }, 10);
        }
    }
}

// Initialize animations
window.addEventListener('load', () => {
    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);

    // Track clicks for Easter egg
    document.addEventListener('click', () => {
        if (!easterEggTriggered) {
            clickCount++;
            updateClickCounter();
            if (clickCount === 16) {
                triggerEasterEgg();
            }
        }
    });
});

// Easter egg function - triggers special message at 16 clicks
function triggerEasterEgg() {
    easterEggTriggered = true;
    
    // Remove click counter when egg is triggered
    const counter = document.getElementById('click-counter');
    if (counter) {
        gsap.to(counter, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => counter.remove()
        });
    }
    
    const easterEgg = document.createElement('div');
    easterEgg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(255, 255, 255, 0.95);
        padding: 40px;
        border-radius: 30px;
        box-shadow: 0 10px 40px rgba(255, 105, 180, 0.8);
        text-align: center;
        z-index: 10000;
        max-width: 500px;
        font-family: 'Dancing Script', cursive;
        border: 3px solid rgba(255, 105, 180, 0.5);
        animation: scaleIn 0.8s ease forwards;
    `;
    easterEgg.innerHTML = `
        <h2 style="color: #ff3366; font-size: 2.5rem; margin-bottom: 20px;">🎉 Secret Message 🎉</h2>
        <p style="color: #333; font-size: 1.3rem; line-height: 1.8; margin-bottom: 20px;">
            Sixteen years of being absolutely perfect and your story keeps getting better with every moment we share! 💕✨
        </p>
        <p style="color: #ff69b4; font-size: 1.1rem; font-weight: bold;">You're 16 and forever amazing!</p>
    `;
    document.body.appendChild(easterEgg);
    
    // Add animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            60% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove after 5 seconds
    setTimeout(() => {
        gsap.to(easterEgg, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => easterEgg.remove()
        });
    }, 5000);
}

// Hover effects
       // Hover effects
       document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3
            });
        });

        // Smooth page transition on click
        button.addEventListener('click', () => {
            gsap.to('body', {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    window.location.href = 'cause.html'; // Replace with the actual URL of the next page
                }
            });
        });
    });