//  wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
  }
  // or a more concise version if you are into that sort of thing:
  // export const qs = (selector, parent = document) => parent.querySelector(selector);
  
  // retrieve data from localstorage
  export function getLocalStorage(key) {
    const item = localStorage.getItem(key);
    //If there is no localStorage, return empty array
    return item ? JSON.parse(item) : [];
  }
  // save data to local storage
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // helper to get parameter strings
  export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param);
    return product;
  }
  
  // set a listener for both touchend and click
  export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    qs(selector).addEventListener("click", callback);
  }
  
  //export function renderListWithTemplate(productCardTemplate, this.listElement, list);
  export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = "afterbegin",
    clear = false
  ) {
    //if (clear) {
    //parentElement.innerHTML() = ""
    //}
  
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
    
    // }
  }
  
  export function renderWithTemplate(
    template,
    parentElement,
    position = "afterbegin",
    data,
    callback
  ) {
    parentElement.insertAdjacentHTML(position, template);
    if (callback) {
      callback(data);
    }
  }
  
  export async function loadTemplate(path) {
    const html = await fetch(path);
    const template = await html.text();
    return template;
  }
  
  export async function loadHeaderFooter(header, footer) {
    const headerTemplate = await loadTemplate("../partials/header.html");
    // console.log(headerTemplate);
    renderWithTemplate(headerTemplate, header);
  
    const footerTemplate = await loadTemplate("../partials/footer.html");
    renderWithTemplate(footerTemplate, footer);
  }
  
  export function sortList(list, ascending = true, value) {
    switch (value) {
      case "name":
        if (ascending) {
          return list.sort(function (a, b) {
            if (a.Name < b.Name) {
              return -1;
            }
            if (a.Name > b.Name) {
              return 1;
            }
            return 0;
          });
        }else{
          return list.sort(function (a, b) {
            if (a.Name > b.Name) {
              return -1;
            }
            if (a.Name < b.Name) {
              return 1;
            }
            return 0;
          });
        }
  
      case "price":
        if (ascending) {
          return list.sort(function (a, b) {
            return parseFloat(a.FinalPrice) - parseFloat(b.FinalPrice);
          });
        }else{
          return list.sort(function (a, b) {
            return parseFloat(a.FinalPrice) + parseFloat(b.FinalPrice);
          });
        }
        //return list
        return list
    }
  }
  
  
  