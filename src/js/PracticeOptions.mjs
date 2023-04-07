import { setLocalStorage, getLocalStorage, renderWithTemplate, addLoader } from "./utils.mjs";
import { FlashCardSet } from "./FlashCardSet.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}


export class PracticeInfo {
  // constructor(mathType) {
  //     this.mathType = mathType;
  // }

  // render form for selecting options of difficulty and timed vs just practice. 
  init(mathType) {
    const formPlacement = document.querySelector(".display-practice");
    const formTemplate =
      `<section class="practice-options">
        <span class="close-options">X</span>

        <h2>Practice ${mathType}</h2>

        <form class="select-user-options">
          <h3>Select Your Difficulty</h3>
          <div class="user-options-input">
            <input type="radio" name="difficulty" id="beginner" class="difficulty" value="1" required>
            <label for="beginner" class="options-label difficulty-beginner">Beginner</label>

            <input type="radio" name="difficulty" id="easy" class="difficulty" value="2" required>
            <label for="easy" class="options-label difficulty-easy">Easy</label>

            <input type="radio" name="difficulty" id="medium" class="difficulty" value="3" required>
            <label for="medium" class="options-label difficulty-medium">Medium</label>

            <input type="radio" name="difficulty" id="hard" class="difficulty" value="4" required>
            <label for="hard" class="options-label difficulty-hard">Hard</label>

            <input type="radio" name="difficulty" id="expert" class="difficulty" value="5" required>
            <label for="expert" class="options-label difficulty-expert">Expert</label>

            <input type="radio" name="difficulty" id="master" class="difficulty" value="6" required>
            <label for="master" class="options-label difficulty-master">Master</label>

            <input type="radio" name="difficulty" id="impossible" class="difficulty" value="7" required>
            <label for="impossible" class="options-label difficulty-impossible">Impossible</label> 
          </div>
          <button id="optionsSubmit" type="submit">Lets Go!!!</button>
        </form>
      </section>`;
    const position = "beforeBegin";
    renderWithTemplate(formTemplate, formPlacement, position);
    this.addCloseListener();
    this.setUserResponse(mathType);

  }

  // Add event listener to close form
  addCloseListener() {
    const closeOptions = document.querySelector(".close-options");
    closeOptions.addEventListener("click", this.closeOptionsForm);
  }

  // Add event listener for each of the cards.
  addCardListeners() {
    const practiceCard = document.getElementsByClassName("practice-card");
    for (let i = 0; i < practiceCard.length; i++) {
      practiceCard[i].addEventListener("click", () => {
        this.init(practiceCard[i].id);
      });
    }
  }

  // Closes options form
  closeOptionsForm() {
    const options = document.querySelector(".practice-options");
    options.remove();
  }

  // Set user difficulty response to local storage.
  setUserResponse(mathType) {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Set user data to local storage
      const optionsJSON = formDataToJSON(document.querySelector("form"));
      optionsJSON["mathType"] = mathType;
      setLocalStorage("user-options", optionsJSON);
      this.createCardSet();
      // redirect 
      });
  }

  async createCardSet() {
    addLoader();

    const userOptions = getLocalStorage("user-options")
    const userDifficulty = userOptions["difficulty"]
    const userMathType = userOptions["mathType"]
    const userMode = userOptions["practice-mode"]

    const set = new FlashCardSet(userMathType, userDifficulty, userMode);
    await set.createCardSet();

    window.location.href = "./practice/practice.html"

  }
}