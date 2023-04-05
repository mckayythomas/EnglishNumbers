import { setLocalStorage } from "./utils.mjs";
import { ExternalServices } from "./ExternalServices.mjs";

// create card set
export class FlashCardSet {
    constructor(mathType, difficulty, mode) {
        this.mathType = mathType;
        this.difficulty = difficulty;
        this.mode = mode;
    }    

    async createCardSet() {
        const difficulty = this.setDifficulty(parseInt(this.difficulty));
        const json = {};
        const operator = this.mathType;
        const number = new ExternalServices();

 
        for(let i=0; i < 10; i++) {
            let numOne = this.getRandomNum(difficulty);
            let numTwo = this.getRandomNum(difficulty);
 
            if(numOne < numTwo) {
                let e = numOne;
                numOne = numTwo;
                numTwo = e; 
            }
 
            let numOneTranslation = await number.getData(numOne);
            let numTwoTranslation = await number.getData(numTwo);
            let answer = this.setAnswer(operator, numOne, numTwo);
            let answerTranslation = await number.getData(answer);
            let problem = "Problem" + (i + 1);
            let problemObj = 
            {
                "NumOne":
                {
                    numOneTranslation
                },
                "NumTwo":
                {
                    numTwoTranslation
                },
                "Answer":
                {
                    answerTranslation
                }
            }
            json[problem] = problemObj
        }
        json["Operator"] = this.setOperator(operator);

        setLocalStorage("card-set", json);
        }

    getRandomNum(max) {
        return Math.floor(Math.random() * max);
    }

    setDifficulty(difficulty) {
        switch(difficulty) {
            case 1:
                return 100;
            case 2: 
                return 1000;
            case 3:
                return 10000;
            case 4:
                return 100000;
            case 5:
                return 1000000;
            case 6:
                return 10000000;
            case 7:
                return 100000000;
            case 8:
                return 1000000000;
        }
    }

    setAnswer(operator, numOne, numTwo) {
        switch(operator) {
            case "Addition":
                return numOne + numTwo;
            case "Subtraction":
                return numOne - numTwo;
            case "Multiplication":
                return numOne * numTwo;
            case "Division":
                return numOne / numTwo;
        }
    }

    setOperator(operator) {
        switch(operator) {
            case "Addition":
                return "+";
            case "Subtraction":
                return "-";
            case "Multiplication":
                return "x";
            case "Division":
                return "÷";
        }
    }
}