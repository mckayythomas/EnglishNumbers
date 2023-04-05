// Base URL to send numbers through to be translated
const baseURL = "https://api.funtranslations.com/translate/numbers.json";
// class to filter and get desired response
export class ExternalServices {
    //  Get data for a response
    async getData(number) {
        const response = await fetch('https://api.funtranslations.com/translate/numbers.json', {
            method: 'POST',
            headers: {
              'X-Funtranslations-Api-Secret': 'WIW_2LT1S3bwCsm9lwHz_AeF'
            },
            body: new URLSearchParams({
              'text': number
            })
          });
        const translatedNumber = await response.json();
        return translatedNumber.contents;
    }
}


