let step = 0;
let memoryStep = 0;

const memories = [
"I like talking to you.",
"You make things feel lighter.",
"And I didn’t act like that."
];

const messages = [
"I messed up.",
"I ignored you.",
"And that wasn’t fair.",
"But I care about you.",
"And I should’ve shown that."
];

/* SCENE SWITCH (FIXED) */
function goToScene(n){
    const current = document.querySelector(".scene.active");
    const next = document.getElementById("scene"+n);

    if(current){
        gsap.to(current,{
            opacity:0,
            duration:0.4,
            onComplete:()=>{
                current.classList.remove("active");
                current.style.opacity=1;
                next.classList.add("active");

                gsap.from(next,{
                    opacity:0,
                    y:20,
                    duration:0.6
                });
            }
        });
    }
}

/* TYPE */
function typeText(text, el){
    el.innerHTML="";
    let i=0;
    const int=setInterval(()=>{
        el.innerHTML+=text[i];
        i++;
        if(i>=text.length) clearInterval(int);
    },30);
}

/* MEMORY */
function nextMemory(){
    const el=document.getElementById("memoryText");
    if(memoryStep < memories.length){
        typeText(memories[memoryStep], el);
        memoryStep++;
    } else {
        goToScene(3);
        loadChat();
    }
}

/* CHAT */
function loadChat(){
    document.getElementById("chat").innerHTML = `
    <div class="msg">hey??</div>
    <div class="msg">are you ignoring me</div>
    <div class="msg">wow okay</div>`;
}

/* APOLOGY */
function nextStep(){
    const text=document.getElementById("text");
    if(step < messages.length){
        typeText(messages[step], text);
        step++;
    } else {
        goToScene(5);
    }
}

/* FINAL */
function forgive(){
    const final=document.getElementById("final");
    const bouquet=document.getElementById("bouquet");

    final.classList.remove("hidden");
    final.innerText="This is for you.";

    bouquet.classList.remove("hidden");

    gsap.fromTo(bouquet,
        {scale:0.5,opacity:0,y:30},
        {scale:1,opacity:1,y:0,duration:1}
    );

    gsap.fromTo(".flower",
        {scale:0,opacity:0},
        {scale:1,opacity:1,stagger:0.2,duration:0.5}
    );

    createHearts();
}

/* NO BUTTON */
function moveNo(){
    const btn=document.getElementById("noBtn");

    gsap.to(btn,{
        x:Math.random()*200-100,
        y:Math.random()*150-75,
        duration:0.3
    });
}

/* 🌺 LILIES (OPTIMIZED) */
function createLilies(){
    const container=document.getElementById("lily-container");

    setInterval(()=>{
        if(container.childElementCount > 25) return;

        const l=document.createElement("div");
        l.className="lily";
        l.style.left=Math.random()*100+"vw";

        gsap.fromTo(l,
            {y:"-10vh",opacity:0},
            {y:"110vh",opacity:1,duration:8,ease:"none"}
        );

        container.appendChild(l);
        setTimeout(()=>l.remove(),8000);
    },400);
}

createLilies();

/* 💖 HEARTS */
let heartInterval;

function createHearts(){
    if(heartInterval) return;

    heartInterval=setInterval(()=>{
        const h=document.createElement("div");
        h.className="heart";
        h.innerText="♡";
        h.style.left=Math.random()*100+"vw";

        document.body.appendChild(h);

        gsap.to(h,{
            y:-800,
            duration:5,
            onComplete:()=>h.remove()
        });
    },500);
}
