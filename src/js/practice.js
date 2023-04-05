import { FlashCard } from "./FlashCard.mjs";
import { getLocalStorage } from "./utils.mjs";

const flashCard = new FlashCard;
let cardNum = 1;

const card = flashCard.getCard(cardNum);
const operator = flashCard.getOperator();

flashCard.renderFlashCard(card, cardNum, operator)

console.log(card);
console.log(card["Answer"]["answerTranslation"]["translated"]);

