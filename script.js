let gameSeq = [];
let userSeq = [];

let btns = ["red", "orange", "green", "blue"];

let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");

//Starting the Game by pressing any key on keyboard
document.addEventListener("keypress", ()=>{
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("game-flash");
    setTimeout(() => {
        btn.classList.remove("game-flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 250);
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText =`Level ${level}`;

    if(level > highScore){
        highScore = level;
    }
    document.querySelector(".highScore").innerText = `Highest Score ${highScore}`;

    //choose random btn  
    let randomIdx = Math.floor(Math.random() * 3);
    let randomCol = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomCol}`);
    // // console.log(randomIdx);
    // console.log(randomCol);
    // console.log(randomBtn);
    gameSeq.push(randomCol);
    // console.log("Game Seq:");
    console.log(gameSeq);
    //flash thre random button
    gameFlash(randomBtn);
}

function check(idx){
    console.log("Current level:" ,level);
    

    if(gameSeq[idx] == userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerHTML= `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        // if(level > highScore){
        //     highScore = level
        // }
        // document.querySelector(".highScore").innerText = `Highest Score ${highScore}`;
        reset();
    }
}


function btnPress(){
    // console.log("button was pressed");
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log("User Seq:");
    // console.log(userSeq);
    check(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq= [];
    userSeq = [];
    level = 0;  
}