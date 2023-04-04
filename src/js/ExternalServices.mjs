// Base URL to send numbers through to be translated
const baseURL = "https://api.funtranslations.com/translate/numbers.json";
// class to filter and get desired response
export class ExternalServices {
    constructor(number) {
        this.number = number;
    }
    //  Get data for a response
    async getData(number) {
        const response = await fetch(this.getTranslateURL(number));
        const translatedNumber = await response.json();
        return translatedNumber.contents;
    }
    // Create full link to be used for translation specific numbers.
    getTranslateURL(number) {
        return baseURL + `?text=${number}`;
    }
}


