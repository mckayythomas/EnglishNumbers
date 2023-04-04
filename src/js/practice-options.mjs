import { renderWithTemplate } from "./utils.mjs"; 
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
        <h2>Practice ${mathType}</h2>
        <span class="close-options">X</span>

        <form>
          <h3>Select Your Difficulty</h3>
          <input type="radio" name="difficulty" id="beginner" class="difficulty" value="1" required>
          <label for="difficulty" class="difficulty-beginner"><a>Beginner</a></label>
      
          <input type="radio" name="difficulty" id="easy" class="difficulty" value="2" required>
          <label for="difficulty" class="difficulty-easy"><a>Easy</a></label>

          <input type="radio" name="difficulty" id="medium" class="difficulty" value="3" required>
          <label for="difficulty" class="difficulty-medium"><a>Medium</a></label>

          <input type="radio" name="difficulty" id="hard" class="difficulty" value="4" required>
          <label for="difficulty" class="difficulty-hard"><a>Hard</a></label>

          <input type="radio" name="difficulty" id="expert" class="difficulty" value="5" required>
          <label for="difficulty" class="difficulty-expert"><a>Expert</a></label>
      
          <input type="radio" name="difficulty" id="master" class="difficulty" value="6" required>
          <label for="difficulty" class="difficulty-master"><a>Master</a></label>
      
          <input type="radio" name="difficulty" id="impossible" class="difficulty" value="7" required>
          <label for="difficulty" class="difficulty-impossible"><a>Impossible</a></label> 
        </div>
        <div>
          <input type="radio" name="practice-mode" id="practice-mode" class="mode" value="practice" required>
          <label for="practice-mode" class="practice-mode"><a>Practice Mode</a></label>
  
          <input type="radio" name="practice-mode" id="quiz-mode" class="mode" value="quiz" required>
          <label for="quiz-mode" class="quiz-mode"><a>Quiz Mode</a></label>      
        </div>   
        <div>
          <button id="optionsSubmit" type="submit">Lets Go!!!</button>
        </form>
      </section>`;
      const position = "beforeBegin";
      renderWithTemplate(formTemplate, formPlacement, position);
      this.addCloseListener();
      this.setUserResponse();

    }   

    // Add event listener to close form
    addCloseListener() {
      const closeOptions = document.querySelector(".close-options");
      closeOptions.addEventListener("click", this.closeOptionsForm);
    }

    // Add event listener for each of the cards.
    addCardListeners() {
      const practiceCard = document.getElementsByClassName("practice-card");
      for (let i=0; i < practiceCard.length; i++) {
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
    setUserResponse() {
      const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
          e.preventDefault();
          // Set user data to local storage
          const optionsJSON = formDataToJSON(document.querySelector("form"));
          setLocalStorage("user-options", optionsJSON);
          // redirect 
          window.location.href="./practice/practice.html"
        });
    }
}