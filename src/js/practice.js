import { FlashCard } from "./FlashCard.mjs";
import { Score } from "./practice-score.js";
import { getLocalStorage } from "./utils.mjs";

const flashCard = new FlashCard;
const score = new Score;

flashCard.renderFlashCard();
score.renderScore();



