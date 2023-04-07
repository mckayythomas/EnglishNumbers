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
  
  export function renderWithTemplate(
    template,
    parentElement,
    position,
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
    const position = "afterBegin";
    const headerTemplate = await loadTemplate("../partials/header.html");
    // console.log(headerTemplate);
    renderWithTemplate(headerTemplate, header, position);
  
    const footerTemplate = await loadTemplate("../partials/footer.html");
    renderWithTemplate(footerTemplate, footer, position);
  }
    
  export function addLoader() {
    const loader = document.querySelector("body");
    const loaderTemplate = `<div class="loader"></div>`;

    renderWithTemplate(loaderTemplate, loader, "afterBegin");
  }