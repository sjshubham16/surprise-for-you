/*=========================================
        BIRTHDAYVERSE PREMIUM
        SCRIPT.JS PART 1
=========================================*/

// ==========================
// DOM ELEMENTS
// ==========================

const loader = document.getElementById("loader");

const welcome = document.getElementById("welcome");

const birthdayScene = document.getElementById("birthdayScene");

const username = document.getElementById("username");

const wishName = document.getElementById("wishName");

const startBtn = document.getElementById("startBtn");

const cancelBtn = document.getElementById("cancelBtn");

const hearts = document.getElementById("hearts");

const sparkles = document.getElementById("sparkles");

// ==========================
// INITIAL STATE
// ==========================

birthdayScene.style.display = "none";

birthdayScene.style.opacity = "0";

// ==========================
// LOADER
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.transition = "1s";

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },1000);

    },3000);

});

// ==========================
// START BUTTON
// ==========================

startBtn.addEventListener("click", () => {

    let name = username.value.trim();

    if(name===""){

        name="My Dear Friend";

    }

    wishName.innerHTML=

    `🎂 Happy Birthday <br>${name} ❤️`;

    welcome.style.transition="1s";

    welcome.style.opacity="0";

    welcome.style.transform="scale(.9)";

    setTimeout(()=>{

        welcome.style.display="none";

        birthdayScene.style.display="block";

        setTimeout(()=>{

            birthdayScene.style.opacity="1";

        },100);

        startCelebration();

    },1000);

});

// ==========================
// CANCEL BUTTON
// ==========================

cancelBtn.addEventListener("click",()=>{

    username.value="";

});

// ==========================
// START CELEBRATION
// ==========================

function startCelebration(){

    createHearts();

    createSparkles();

}

// ==========================
// HEARTS
// ==========================

function createHearts(){

    setInterval(()=>{

        const heart=document.createElement("div");

        heart.className="heart";

        const emoji=[

        "❤️",

        "💖",

        "💕",

        "💗",

        "💝"

        ];

        heart.innerHTML=

        emoji[Math.floor(Math.random()*emoji.length)];

        heart.style.left=

        Math.random()*window.innerWidth+"px";

        heart.style.fontSize=

        (20+Math.random()*25)+"px";

        hearts.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },8000);

    },300);

}

// ==========================
// SPARKLES
// ==========================

function createSparkles(){

    setInterval(()=>{

        const star=document.createElement("div");

        star.className="sparkle";

        star.style.left=

        Math.random()*window.innerWidth+"px";

        star.style.top=

        Math.random()*window.innerHeight+"px";

        sparkles.appendChild(star);

        setTimeout(()=>{

            star.remove();

        },1500);

    },150);

}

console.log("✅ Script Part 1 Loaded");
/*=========================================
        SCRIPT.JS PART 2
        FIREWORKS + SHOOTING STARS
=========================================*/

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let fireworks = [];
let particles = [];
let fireworksStarted = false;

/*=========================
      FIREWORK CLASS
=========================*/

class Firework {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = canvas.height;

        this.targetY =
            Math.random() * canvas.height * 0.5 + 60;

        this.speed = 6 + Math.random() * 3;

        this.color =
            `hsl(${Math.random() * 360},100%,60%)`;
    }

    update() {

        this.y -= this.speed;

        if (this.y <= this.targetY) {

            this.explode();
            return false;
        }

        return true;
    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);

        ctx.fillStyle = this.color;

        ctx.fill();
    }

    explode() {

        for (let i = 0; i < 100; i++) {

            particles.push(
                new Particle(this.x, this.y, this.color)
            );

        }

    }

}

/*=========================
      PARTICLE
=========================*/

class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.color = color;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.life = 100;

        this.size = Math.random() * 3 + 2;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.05;

        this.life--;

        return this.life > 0;

    }

    draw() {

        ctx.globalAlpha = this.life / 100;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;

        ctx.fill();

        ctx.globalAlpha = 1;

    }

}

/*=========================
      ANIMATION LOOP
=========================*/

function animateFireworks() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks = fireworks.filter(fw => {

        fw.draw();

        return fw.update();

    });

    particles = particles.filter(p => {

        p.draw();

        return p.update();

    });

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

/*=========================
      START FIREWORKS
=========================*/

function startFireworks() {

    if (fireworksStarted) return;

    fireworksStarted = true;

    setInterval(() => {

        fireworks.push(new Firework());

    }, 500);

}

/*=========================
      SHOOTING STAR
=========================*/

function createShootingStar() {

    const star = document.createElement("div");

    star.style.position = "fixed";
    star.style.width = "180px";
    star.style.height = "2px";

    star.style.background =
        "linear-gradient(to right,white,transparent)";

    star.style.left =
        Math.random() * window.innerWidth + "px";

    star.style.top =
        Math.random() * 250 + "px";

    star.style.transform = "rotate(-35deg)";

    star.style.zIndex = "9999";

    document.body.appendChild(star);

    let x = 0;

    const animation = setInterval(() => {

        x += 25;

        star.style.transform =
            `translate(${x}px,${x / 2}px) rotate(-35deg)`;

        star.style.opacity =
            1 - x / 900;

        if (x > 900) {

            clearInterval(animation);

            star.remove();

        }

    }, 20);

}

setInterval(createShootingStar, 4000);

/*=========================
      UPDATE CELEBRATION
=========================*/

const oldStartCelebration = startCelebration;

startCelebration = function () {

    oldStartCelebration();

    startFireworks();

};

console.log("🎆 Script Part 2 Loaded");
/*=========================================
        SCRIPT.JS PART 3
        GIFT + CAKE + CURSOR GLOW
=========================================*/

/*=========================
        CURSOR GLOW
=========================*/

const cursorGlow = document.createElement("div");
cursorGlow.className = "cursorGlow";
document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = (e.clientX - 15) + "px";
    cursorGlow.style.top = (e.clientY - 15) + "px";
});

/*=========================
        CAKE ROTATION
=========================*/

const cake = document.getElementById("cake3D");

if (cake) {

    let angle = 0;

    function rotateCake() {

        angle += 0.2;

        cake.style.transform =
            `rotateY(${angle}deg)`;

        requestAnimationFrame(rotateCake);

    }

    rotateCake();

}

/*=========================
        GIFT OPEN
=========================*/

const gift = document.getElementById("giftBox");
const openGift = document.getElementById("openGift");

if (gift && openGift) {

    openGift.addEventListener("click", () => {

        gift.animate(
            [
                {
                    transform: "scale(1)"
                },
                {
                    transform: "scale(1.08)"
                },
                {
                    transform: "scale(1)"
                }
            ],
            {
                duration: 500
            }
        );

        const lid = gift.querySelector(".gift-lid");

        if (lid) {

            lid.animate(
                [
                    {
                        transform: "rotate(0deg)"
                    },
                    {
                        transform: "translateY(-40px) rotate(-20deg)"
                    }
                ],
                {
                    duration: 700,
                    fill: "forwards"
                }
            );

        }

        launchGiftHearts();

    });

}

/*=========================
      HEART EXPLOSION
=========================*/

function launchGiftHearts() {

    const emojis = [
        "❤️",
        "💖",
        "💕",
        "💝",
        "💗",
        "💞"
    ];

    for (let i = 0; i < 60; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        heart.style.position = "fixed";

        heart.style.left =
            window.innerWidth / 2 + "px";

        heart.style.top =
            window.innerHeight / 2 + "px";

        heart.style.fontSize =
            (18 + Math.random() * 20) + "px";

        document.body.appendChild(heart);

        const x =
            (Math.random() - 0.5) * 700;

        const y =
            (Math.random() - 0.5) * 600;

        heart.animate(
            [
                {
                    transform: "translate(0,0)",
                    opacity: 1
                },
                {
                    transform: `translate(${x}px,${y}px)`,
                    opacity: 0
                }
            ],
            {
                duration: 2200,
                easing: "ease-out"
            }
        );

        setTimeout(() => {

            heart.remove();

        }, 2200);

    }

}

/*=========================
      CELEBRATE BUTTON
=========================*/

const celebrateBtn =
    document.getElementById("celebrate");

if (celebrateBtn) {

    celebrateBtn.addEventListener("click", () => {

        startFireworks();

        launchGiftHearts();

        createHearts();

        createSparkles();

    });

}

/*=========================
      CONSOLE
=========================*/

console.log("🎁 Script Part 3 Loaded");
/*=========================================
        SCRIPT.JS PART 4
        GRAND FINALE EFFECTS
=========================================*/

/*=========================
      ROSE RAIN
=========================*/

function createRose() {

    const rose = document.createElement("div");

    rose.innerHTML = "🌹";
    rose.style.position = "fixed";
    rose.style.left = Math.random() * innerWidth + "px";
    rose.style.top = "-50px";
    rose.style.fontSize = (18 + Math.random() * 18) + "px";
    rose.style.pointerEvents = "none";
    rose.style.zIndex = "9999";
    rose.style.transition = "transform 8s linear, opacity 8s";

    document.body.appendChild(rose);

    requestAnimationFrame(() => {

        rose.style.transform =
            `translate(${(Math.random()-0.5)*250}px,${innerHeight+100}px)
             rotate(${720+Math.random()*360}deg)`;

        rose.style.opacity = "0";

    });

    setTimeout(() => rose.remove(), 8000);

}

let roseInterval = null;

function startRoseRain() {

    if (roseInterval) return;

    roseInterval = setInterval(createRose, 250);

}

/*=========================
      SCREEN FLASH
=========================*/

function flashScreen() {

    const flash = document.createElement("div");

    Object.assign(flash.style, {
        position: "fixed",
        inset: "0",
        background: "#ffffff",
        opacity: "0.9",
        zIndex: "999999",
        pointerEvents: "none"
    });

    document.body.appendChild(flash);

    requestAnimationFrame(() => {

        flash.style.transition = "opacity .5s";
        flash.style.opacity = "0";

    });

    setTimeout(() => flash.remove(), 600);

}

/*=========================
      CONFETTI
=========================*/

function confettiBurst() {

    for (let i = 0; i < 150; i++) {

        const c = document.createElement("div");

        Object.assign(c.style, {
            position: "fixed",
            width: "10px",
            height: "14px",
            left: Math.random() * innerWidth + "px",
            top: "-20px",
            background: `hsl(${Math.random()*360},100%,60%)`,
            borderRadius: "2px",
            zIndex: "9999",
            pointerEvents: "none"
        });

        document.body.appendChild(c);

        let y = -20;
        let x = parseFloat(c.style.left);
        const vy = 3 + Math.random() * 5;
        const vx = (Math.random() - 0.5) * 3;
        let rot = 0;

        const fall = setInterval(() => {

            y += vy;
            x += vx;
            rot += 10;

            c.style.top = y + "px";
            c.style.left = x + "px";
            c.style.transform = `rotate(${rot}deg)`;

            if (y > innerHeight + 20) {

                clearInterval(fall);
                c.remove();

            }

        }, 16);

    }

}

/*=========================
      BALLOON POP
=========================*/

document.querySelectorAll(".balloon").forEach(balloon => {

    balloon.style.pointerEvents = "auto";

    balloon.addEventListener("click", () => {

        balloon.animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: "scale(1.6)", opacity: 0 }
            ],
            {
                duration: 350,
                fill: "forwards"
            }
        );

        launchGiftHearts();

    });

});

/*=========================
      GRAND FINALE
=========================*/

function grandFinale() {

    flashScreen();

    startFireworks();

    startRoseRain();

    confettiBurst();

    launchGiftHearts();

    createSparkles();

    createHearts();

}

const celebrate = document.getElementById("celebrate");

if (celebrate) {

    celebrate.addEventListener("dblclick", grandFinale);

}

/*=========================
      KEYBOARD SHORTCUT
=========================*/

document.addEventListener("keydown", e => {

    if (e.key.toLowerCase() === "f") {

        grandFinale();

    }

});

console.log("🎊 Script Part 4 Loaded");
/*=========================================
        SCRIPT.JS PART 5
        FINAL PREMIUM EFFECTS
=========================================*/

/*=========================
      GOLDEN MESSAGE
=========================*/

function showGoldenMessage() {

    const msg = document.createElement("div");

    msg.className = "gold-message fadeIn";

    msg.innerHTML = `
        🎉 HAPPY BIRTHDAY 🎉
        <br>
        Wishing You Endless Happiness ❤️
    `;

    Object.assign(msg.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: "'Cinzel',serif",
        fontSize: "clamp(32px,6vw,70px)",
        textAlign: "center",
        fontWeight: "900",
        zIndex: "999999",
        textShadow: "0 0 30px gold"
    });

    document.body.appendChild(msg);

    setTimeout(() => {

        msg.style.transition = "opacity 1s";

        msg.style.opacity = "0";

        setTimeout(() => msg.remove(), 1000);

    }, 5000);

}

/*=========================
      FLOATING DIAMONDS
=========================*/

function createDiamond() {

    const d = document.createElement("div");

    d.className = "diamond";

    d.style.left = Math.random() * innerWidth + "px";

    d.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    document.body.appendChild(d);

    setTimeout(() => {

        d.remove();

    }, 12000);

}

setInterval(createDiamond, 700);

/*=========================
      CAKE GLOW
=========================*/

const cake3D = document.getElementById("cake3D");

if (cake3D) {

    setInterval(() => {

        cake3D.classList.toggle("glow");

    }, 1200);

}

/*=========================
      AUTO SURPRISE
=========================*/

function autoSurprise() {

    showGoldenMessage();

    flashScreen();

    confettiBurst();

    launchGiftHearts();

    startFireworks();

    startRoseRain();

}

/*=========================
      AUTO START
=========================*/

setTimeout(() => {

    if (birthdayScene.style.display === "block") {

        autoSurprise();

    }

}, 5000);

/*=========================
      PARTY MODE
=========================*/

let partyMode = false;

document.addEventListener("keydown", (e) => {

    if (e.key.toLowerCase() === "p") {

        partyMode = !partyMode;

        if (partyMode) {

            document.body.style.animation =
                "bgParty 6s linear infinite";

            showGoldenMessage();

            confettiBurst();

            launchGiftHearts();

            startFireworks();

        } else {

            document.body.style.animation = "none";

        }

    }

});
/*=========================================
      PREMIUM BIRTHDAY COUNTDOWN
=========================================*/

// Birthday Time
const birthdayDate = new Date("August 8, 2026 00:00:00").getTime();

// Elements
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const loveMessage = document.getElementById("loveMessage");

const premiumCountdown = document.getElementById("premiumCountdown");

// Romantic Messages
const messages = [

"❤️ Every second brings me closer to celebrating YOU.",

"🌸 Tomorrow will be filled with smiles and happiness.",

"💖 A little surprise is waiting just for you.",

"✨ You deserve the most beautiful day ever.",

"🎁 Just a little more patience...",


"🌹 Every heartbeat says Happy Birthday in advance."

];

// Message Change
let msgIndex = 0;

setInterval(() => {

msgIndex++;

if(msgIndex >= messages.length){

msgIndex = 0;

}

loveMessage.style.opacity = 0;

setTimeout(()=>{

loveMessage.innerHTML = messages[msgIndex];

loveMessage.style.opacity = 1;

},500);

},6000);

// Countdown
const timer = setInterval(()=>{

const now = new Date().getTime();

const distance = birthdayDate - now;

// Birthday Reached
if(distance <= 0){

clearInterval(timer);

// Hide Countdown
premiumCountdown.style.display = "none";

// Birthday Scene
const birthdayScene = document.getElementById("birthdayScene");

if(birthdayScene){

birthdayScene.style.display="block";

}

// Fireworks
if(typeof startFireworks==="function"){

startFireworks();

}

// Hearts
if(typeof launchGiftHearts==="function"){

launchGiftHearts();

}

// Rose Rain
if(typeof startRoseRain==="function"){

startRoseRain();

}

// Confetti
if(typeof confettiBurst==="function"){

confettiBurst();

}

// Golden Message
if(typeof showGoldenMessage==="function"){

showGoldenMessage();

}

return;

}

// Time Calculation

const d = Math.floor(distance/(1000*60*60*24));

const h = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

const m = Math.floor((distance%(1000*60*60))/(1000*60));

const s = Math.floor((distance%(1000*60))/1000);

// Update HTML

days.innerHTML = String(d).padStart(2,"0");

hours.innerHTML = String(h).padStart(2,"0");

minutes.innerHTML = String(m).padStart(2,"0");

seconds.innerHTML = String(s).padStart(2,"0");

// Last 10 Seconds

if(distance<=10000){

premiumCountdown.classList.add("dangerMode");

}

// Pulse Animation

document.querySelectorAll(".time span").forEach(el=>{

el.animate(

[

{transform:"scale(1)"},

{transform:"scale(1.15)"},

{transform:"scale(1)"}

],

{

duration:500

}

);

});

},1000);

/*=========================================
      FLOATING HEARTS
=========================================*/

function createFloatingHeart(){

const heart=document.createElement("div");

heart.className="floating-heart";

heart.innerHTML=["❤️","💖","💕","💗","💝"][Math.floor(Math.random()*5)];

heart.style.left=Math.random()*100+"vw";

heart.style.animationDuration=(5+Math.random()*6)+"s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},11000);

}

setInterval(createFloatingHeart,900);

/*=========================================
      STARS
=========================================*/

function createStar(){

const star=document.createElement("div");

star.className="star";

star.style.left=Math.random()*100+"vw";

star.style.top=Math.random()*100+"vh";

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},5000);

}

setInterval(createStar,400);

/*=========================================
      ROSE PETALS
=========================================*/

function createRose(){

const rose=document.createElement("div");

rose.className="rose";

rose.innerHTML="🌹";

rose.style.left=Math.random()*100+"vw";

rose.style.animationDuration=(6+Math.random()*5)+"s";

document.body.appendChild(rose);

setTimeout(()=>{

rose.remove();

},11000);

}

setInterval(createRose,1500);

console.log("❤️ Premium Countdown Loaded");

/*=========================
      WINDOW RESIZE
=========================*/

window.addEventListener("resize", () => {

    if (typeof resizeCanvas === "function") {

        resizeCanvas();

    }

});

/*=========================
      FINAL LOG
=========================*/

console.log("🎂 BirthdayVerse Premium Loaded Successfully!");

console.log("✨ Happy Coding!");
