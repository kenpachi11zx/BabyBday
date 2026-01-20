 // Reasons database
 const reasons = [
    { 
        text: "You make the smallest moments feel special without even trying. 💫", 
        emoji: "✨",
        gif: "gif1.gif"
    },
    { 
        text: "Your presence turns my bad days soft and my good days brighter. 🌷", 
        emoji: "🌷",
        gif: "gif2.gif"
    },
    { 
        text: "You're fun, annoying, caring, and somehow perfect in your own chaos. 😌", 
        emoji: "😌",
        gif: "gif1.gif"
    },
    { 
        text: "I smile more ever since you became a part of my everyday life. 💗", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "You feel like comfort, laughter, and home—all at once. 🏡✨", 
        emoji: "🏡",
        gif: "gif1.gif"
    },
    { 
        text: "You don't just exist in my life, you make it warmer. 🌸", 
        emoji: "🌸",
        gif: "gif2.gif"
    },
    { 
        text: "Loving you feels easy, natural, and a little addictive. 😏💞", 
        emoji: "💞",
        gif: "gif1.gif"
    },
    { 
        text: "You're the kind of person my heart feels safe choosing again and again. 💖", 
        emoji: "💖",
        gif: "gif2.gif"
    },
    { 
        text: "You make ordinary days feel worth remembering. 🌙", 
        emoji: "🌙",
        gif: "gif1.gif"
    },
    { 
        text: "And honestly… I'll never run out of reasons when it comes to you. ♾️💘", 
        emoji: "💘",
        gif: "gif2.gif"
    },
    { 
        text: "The way you look at me like I'm everything... it makes me believe I am. 👀💕", 
        emoji: "👀",
        gif: "gif1.gif"
    },
    { 
        text: "You make me want to be better, and more importantly, you let me just be me. 🌟", 
        emoji: "🌟",
        gif: "gif2.gif"
    },
    { 
        text: "With you, forever doesn't feel like a promise—it feels like home. 🏠💞", 
        emoji: "💘",
        gif: "gif1.gif"
    },
    { 
        text: "You're my favorite person and my greatest adventure. 🗺️💕", 
        emoji: "🗺️",
        gif: "gif2.gif"
    },
    { 
        text: "The way you laugh... I could listen to that sound forever and never get tired. 😄💖", 
        emoji: "😄",
        gif: "gif1.gif"
    },
    { 
        text: "Sixteen reasons to love you? I could give you sixteen thousand more. ♾️✨", 
        emoji: "✨",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ∞`;
        
        // Special badge when reaching reason 16
        if (currentReasonIndex + 1 === 16) {
            const specialBadge = document.createElement('div');
            specialBadge.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #ff69b4, #da70d6);
                color: white;
                padding: 10px 20px;
                border-radius: 50px;
                font-weight: bold;
                animation: slideIn 0.6s ease forwards;
                z-index: 1000;
            `;
            specialBadge.textContent = '🎂 16 Reasons Special! 🎂';
            document.body.appendChild(specialBadge);
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(200px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);