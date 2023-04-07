import { FlashCardSet } from "./FlashCardSet.mjs";
import { Score } from "./practice-score.js";
import { addLoader, getLocalStorage, renderWithTemplate } from "./utils.mjs";


export class FlashCard {
    constructor() {
        this.flashCardSet = getLocalStorage("card-set");
        this.answer = "";
        this.cardNum = 1;
        this.score = 0;
        this.scoreUpdate = new Score;
    }   

    // render individual cards 
    renderFlashCard(setOperator) {
        const cardInfo = this.getCard(this.cardNum)

        const numOne = cardInfo["NumOne"]["numOneTranslation"]["translated"];
        const numTwo = cardInfo["NumTwo"]["numTwoTranslation"]["translated"];
        this.answer = cardInfo["Answer"]["answerTranslation"]["translated"];
        const operator = this.getOperator();
        const cardNumName = this.getCardNum(this.cardNum);

        const flashCard = `
        <div class="flash-card" id="flash-card">
        <div class="card-side front problem">
            <h2><span>Problem ${cardNumName}</span></h2>
            <span id="problem">${numOne} ${operator} ${numTwo} = </span>
            <input id="user-answer-input" type="text" name="user-answer" required>
            <label for="user-answer"></label>
            <button type="submit" id="send-answer">Submit Answer</button>
        </div>
        <div class="card-side back problem">
            <h2><span>Problem ${cardNumName} Answer</span></h2>
            <span id="problem">${numOne} ${operator} ${numTwo} = </span>
            <span id="user-answer">Your Answer:</span>
            <span id="correct-answer"></span>
            <button type="submit" id="next-card">Next Problem</button>
        </div>
        </div>`;

        const cardLocation = document.querySelector(".card-container");
        renderWithTemplate(flashCard, cardLocation, "afterBegin");
        this.addFlipCardListener();
        this.addNextCardListener();
    }

    addFlipCardListener() {
        const flashCard = document.querySelector("#flash-card");
        const submit = document.querySelector("#send-answer");
        submit.addEventListener("click", () => {
            this.correctAnswer(this.answer);
            flashCard.classList.add("flip");
            setTimeout(() => {this.nextProblem()}, 500);
        })
    }

    addNextCardListener() {        
        const flashCard = document.querySelector("#flash-card");
        const nextCard = document.querySelector("#next-card");
        nextCard.addEventListener("click", () => {
            flashCard.classList.remove("flip");
            setTimeout(() => {this.nextAnswer()}, 500);
        })
    }

    // rewrite front of card for when the call to flip it changes.
    nextProblem() {
        if (this.cardNum == 10){
            return
        }
        this.cardNum += 1;

        const cardInfo = this.getCard(this.cardNum);

        let cardFront = document.querySelector(".front");
        
        const numOne = cardInfo["NumOne"]["numOneTranslation"]["translated"];
        const numTwo = cardInfo["NumTwo"]["numTwoTranslation"]["translated"];
        this.answer = cardInfo["Answer"]["answerTranslation"]["translated"];
        const operator = this.getOperator();
        const cardNumName = this.getCardNum(this.cardNum);

        const cardFrontContent = `
        <div class="card-side front problem">
            <h2><span>Problem ${cardNumName}</span></h2>
            <span id="problem">${numOne} ${operator} ${numTwo} = </span>
            <input id="user-answer-input" type="text" name="user-answer" required>
            <label for="user-answer"></label>
            <button type="submit" id="send-answer">Submit Answer</button>
        </div>`;

        cardFront.outerHTML = cardFrontContent;
        this.addFlipCardListener();
    }

    // rewrite the back of the card to help the flip when submiting answer
    nextAnswer() {
        const cardInfo = this.getCard(this.cardNum);

        let cardBack = document.querySelector(".back");
        
        const numOne = cardInfo["NumOne"]["numOneTranslation"]["translated"];
        const numTwo = cardInfo["NumTwo"]["numTwoTranslation"]["translated"];
        this.answer = cardInfo["Answer"]["answerTranslation"]["translated"];
        const operator = this.getOperator();
        const cardNumName = this.getCardNum(this.cardNum);
        let buttonId = "next-card";
        let finalBtn = "Next Problem"

        if (this.cardNum == 10){
            buttonId = "finish-set";
            finalBtn = "Finish!";
        }

        const cardBackContent = `
        <div class="card-side back problem">
            <h2><span>Problem ${cardNumName} Answer</span></h2>
            <span id="problem">${numOne} ${operator} ${numTwo} = </span>
            <span id="user-answer">Your Answer:</span>
            <span id="correct-answer">Correct Answer: ${this.answer}</span>
            <button type="submit" id="${buttonId}">${finalBtn}</button>
        </div>`;

        cardBack.outerHTML = cardBackContent;
        if (this.cardNum == 10){
            this.addFinishListener();
        } else {
            this.addNextCardListener();
        }
    }

    addFinishListener() {
        const endButton = document.querySelector("#finish-set");
        endButton.addEventListener("click", () => {
            this.endSet();
        })
    }

    endSet() {
        const location = document.querySelector(".card-container");
        const flashCard = document.querySelector(".flash-card")
        const finishedCard = `
        <section class="finished-options">
        <h2>Great Job!</h2>
        <div>
        <p>You Scored: <span id="score">${this.score}/ 10</span></p>
          <button id="reset">Try Again!</button>
          <button id="go-home">Go Home</button>
        </div>
        </section>`;

        renderWithTemplate(finishedCard, location, "beforeBegin");
        this.addFinalListeners();
    }

    // correct flashcard
    getCardNum(cardNum) {
        let cardNumName = "";
        switch(cardNum) {
            case 1: cardNumName = "One";
                break;
            case 2: cardNumName = "Two";
                break;
            case 3: cardNumName = "Three";
                break;
            case 4: cardNumName = "Four"
                break;
            case 5: cardNumName = "Five"
                break;
            case 6: cardNumName = "Six";
                break;
            case 7: cardNumName = "Seven";
                break;
            case 8: cardNumName = "Eight";
                break;
            case 9: cardNumName = "Nine";
                break;
            case 10: cardNumName = "Ten";
                break;
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


    correctAnswer(answer) {
        const answerPlacement = document.querySelector("#correct-answer");
        const userAnswerPlacement = document.querySelector("#user-answer");
        const correctAnswer = "Correct Answer: " + answer;
        answerPlacement.innerText = correctAnswer;
        const userAnswer = this.getInputValue();
        let correction = "";
        if(userAnswer.toLowerCase() == answer.toLowerCase()) {
            correction = true;
            this.score += 1;
            this.scoreUpdate.updateScore(this.score);
        } else {
            correction = false;
        }
        this.addCorrectionAnimation(correction);
        userAnswerPlacement.innerText = "Your Answer: " + userAnswer;
    }

    addCorrectionAnimation(correct){
        const cardSide = document.querySelector(".back");
        if(correct){
            cardSide.classList.toggle("correct");
        } else {
            cardSide.classList.toggle("incorrect");
        }
    }

    getInputValue() {
        return document.querySelector("input").value;
    }

    addFinalListeners() {
        const tryAgain = document.querySelector("#reset");
        const goHome = document.querySelector("#go-home");
        const score = new Score();

        tryAgain.addEventListener("click", () => {
            this.score = 0;
            score.updateScore(this.score);
            this.reset();
        })

        goHome.addEventListener("click", () => {
            window.location.href = "../index.html";
        })
    }

    async reset() {
        const userOptions = getLocalStorage("user-options")
        const userDifficulty = userOptions["difficulty"]
        const userMathType = userOptions["mathType"]
        const userMode = userOptions["practice-mode"]
    
        addLoader();

        const newFlashCards = new FlashCardSet(userMathType, userDifficulty, userMode);    

        await newFlashCards.createCardSet();
        location.reload();

    }

}