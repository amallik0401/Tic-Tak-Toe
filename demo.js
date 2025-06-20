let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('.reset');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg');
let newGame = document.querySelector('.newGame');

let turnO = true;
let count = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    msgContainer.classList.add('hide');
    enableBoxes();
};

const msgBox = (winner) => {
    msg.innerText = `Player ${winner} wins!`;
    msgContainer.classList.remove('hide');  
};

const disableBoxes = () => {
    for(box of boxes) {
        box.disabled = true;
    }
};

const draw = () => {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove('hide'); 
    disableBoxes();
}

const enableBoxes = () => {
    for(box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

boxes.forEach((box) => {
    box.addEventListener("click",() => {
    console.log("box clicked");
        if(turnO)
        {
            box.innerText = "O";
            turnO = false;
        }
        else
        {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let iswinner = checkWinner();

        if(count === 9 && !iswinner) 
        {
            draw();
        }
    });
});

const checkWinner = () => {

    for(let pattern of winningPatterns)
    {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if(val1 !="" && val2 != "" && val3 != "")
        {
            if(val1 === val2 && val2 === val3)
                {
                    disableBoxes();
                    msgBox(val1);
                    return true;                        
                } 
        }
    }
    
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
