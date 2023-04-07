import { renderWithTemplate } from "./utils.mjs";

export class Score {

    renderScore(){
        const location = document.querySelector("main");

        const scoreTemplate = `
        <div class="score">
            <h3>Score</h3>
            <p><span id="score">0</span>/10</p>
        </div>`;

        renderWithTemplate(scoreTemplate, location, "afterBegin");
    }

    updateScore(score) {
        const updateScore = document.querySelector("#score");
        updateScore.textContent = score;
    }
}