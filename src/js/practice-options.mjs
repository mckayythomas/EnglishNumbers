import { renderWithTemplate } from "./utils.mjs"; 

export class PracticeInfo {
    constructor(mathType) {
        this.mathType = mathType;
    }

    buildForm(mathType) {
        const formPlacement = document.querySelector(".mission-statement");
        const formTemplate = `<section class="practice-options">
        <h2>Practice Division!</h2>
        <div>
          <h3>Select Your Difficulty</h3>
        <input type="radio" name="difficulty-beginner" id="beginner" class="difficulty">
        <label for="difficulty-beginner" class="difficulty-beginner"><a>Beginner</a></label>
  
        <input type="radio" name="difficulty-easy" id="easy" class="difficulty">
        <label for="difficulty-easy" class="difficulty-easy"><a>Easy</a></label>
        
        <input type="radio" name="difficulty-medium" id="medium" class="difficulty">
        <label for="difficulty-medium" class="difficulty-medium"><a>Medium</a></label>
        
        <input type="radio" name="difficulty-hard" id="hard" class="difficulty">
        <label for="difficulty-hard" class="difficulty-hard"><a>Hard</a></label>
        
        <input type="radio" name="difficulty-expert" id="expert" class="difficulty">
        <label for="difficulty-expert" class="difficulty-expert"><a>Expert</a></label>
  
        <input type="radio" name="difficulty-master" id="master" class="difficulty">
        <label for="difficulty-master" class="difficulty-master"><a>Master</a></label>
  
        <input type="radio" name="difficulty-impossible" id="impossible" class="difficulty">
        <label for="difficulty-impossible" class="difficulty-impossible"><a>Impossible</a></label> 
        </div>
        <div>
          <input type="radio" name="practice-mode" id="practice-mode" class="mode">
          <label for="practice-mode" class="practice-mode"><a>Practice Mode</a></label>
  
          <input type="radio" name="practice-mode" id="quiz-mode" class="mode">
          <label for="quiz-mode" class="quiz-mode"><a>Quiz Mode</a></label>      
        </div>   
        <div>
          <button>Lets Go!!!</button>
        </div>
      </section>`;

      renderWithTemplate(formTemplate, formPlacement);
    }

    
}