import { getLocalStorage, renderWithTemplate } from "./utils.mjs";


export class FlashCard {
    constructor() {
        this.flashCardSet = getLocalStorage("card-set");
    }   

    // render individual cards 
    renderFlashCard(card, cardNum, setOperator) {
        const cardInfo = card;
        if (cardNum != 10) {

        const cardNumName = this.getCardNum(cardInfo.key);
        const numOne = cardInfo["NumOne"]["numOneTranslation"]["translated"];
        const numTwo = cardInfo["NumTwo"]["numTwoTranslation"]["translated"];
        const answer = cardInfo["Answer"]["answerTranslation"]["translated"];
        const operator = setOperator;

        const flashCard = `
        <div class="flash-card">
        <div class="card-side front problem" id="flash-card">
            <h2><span>Problem ${cardNumName}</span></h2>
            <span id="problem">${numOne} ${operator} ${numTwo} = </span>
            <input id="user-answer" type="text" name="user-answer" required>
            <label for="user-answer"></label>
            <button type="submit" id="send-answer">Submit Answer</button>
        </div>
        <div class="card-side back problem">
            <h2><span>Problem ${cardNumName} Answer</span></h2>
            <span id="problem">${numOne} ${operator} ${numTwo} = </span>
            <span id="user-answer>Your Answer:</span>
            <span id="correct-answer">Correct Answer: ${answer}</span>
            <button type="submit" id="next-card">Next Problem</button>
        </div>
        </div>`;
        console.log(cardInfo);
        const cardLocation = document.querySelector(".card-container");
        renderWithTemplate(flashCard, cardLocation, "afterBegin");

        this.addNextCardListener();



        } else {
        this.renderFinalCard(card);
        }
    }

    renderFinalCard(card, setOperator) {
        const cardInfo = card;
        const cardNumName = this.getCardNum(cardInfo.key);
        const numOne = cardInfo["NumOne"]["numOneTranslation"]["translated"];
        const numTwo = cardInfo["NumTwo"]["numTwoTranslation"]["translated"];
        const answer = cardInfo["Answer"]["answerTranslation"]["translated"];
        const operator = setOperator;

        const flashCard = `
        <div class="flash-card">
        <div class="card-side front problem" id="flash-card">
            <h2><span>Problem ${cardNumName}</span></h2>
            <span id="problem">${numOne} ${operator} ${numTwo} = </span>
            <input id="user-answer" type="text" name="user-answer" required>
            <label for="user-answer"></label>
            <button type="submit" id="send-answer">Submit Answer</button>
        </div>
        <div class="card-side back problem">
            <h2><span>Problem ${cardNumName} Answer</span></h2>
            <span id="problem">${numOne} ${operator} ${numTwo} = </span>
            <span id="user-answer>Your Answer:</span>
            <span id="correct-answer">Correct Answer: ${answer}</span>
            <button type="submit" id="finish">End Practice</button>
        </div>
        </div>`;

    }

    // correct flashcard
    getCardNum(cardNum) {
        let cardNumName = "";
        switch(cardNum) {
            case 1: cardNumName = "One";
            case 2: cardNumName = "Two";
            case 3: cardNumName = "Three";
            case 4: cardNumName = "Four";
            case 5: cardNumName = "Five";
            case 6: cardNumName = "Six";
            case 7: cardNumName = "Seven";
            case 8: cardNumName = "Eight";
            case 9: cardNumName = "Nine";
            case 10: cardNumName = "Ten";
        }

        return cardNumName;
    }

    getCard(cardNum) {
        const cardSet = getLocalStorage("card-set");
        const card = cardSet["Problem" + cardNum];
        return card
    }

    getOperator() {
        const cardSet = getLocalStorage("card-set");
        const operator = cardSet["Operator"];
        return operator;
    }

    addNextCardListener() {
        const flashCard = document.querySelector("div.flash-card");
        const submit = document.querySelector("#send-answer");
        submit.addEventListener("submit", () => {
            this.correctAnswer()
        })

    }

    getInputValue() {
        return document.querySelector("input").value;
    }
}