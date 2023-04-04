import { setLocalStorage } from "./utils.mjs";
import { ExternalServices } from "./ExternalServices.mjs";

// create card set
export class FlashCardSet {
    constructor(mathType, difficulty, mode) {
        this.mathType = mathType;
        this.difficulty = difficulty;
        this.mode = mode;
    }    

    createCardSet() {

    }

    createNumbers() {
        const number = new ExternalServices();
        number.getData(1111);
    }
}