
const apiKey = "64725228-5b31-4c1c-aba5-faa61edfb7be";
const url = 'https://content.guardianapis.com/search?api-key=' + apiKey;
const params = { method: 'get' };
const button = document.querySelector("button");
const errorElement = document.querySelector(".messageError");
const listConrainer = document.querySelector(".list");

button.addEventListener("click", handleRefreshClick);

loadNews();

function loadNews () {
    fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            showItems(data);
        })
        .catch((error) => {
            showMessageError(error.message);
        });
}

function showItems(data) {
    errorElement.style.display = "none";
    listConrainer.innerHTML = "";

    for (var i = 0; i < data.response.results.length; i++) {
        const item = data.response.results[i];

        const liElement = document.createElement("li");
        const accordionHeader = document.createElement("div");
        const accordionBody = document.createElement("div");
        const h3Element = document.createElement("h3");
        const icon = document.createElement("i");

        liElement.setAttribute("data-accordion-shown", false);
        accordionHeader.classList.add("accordion-header");
        accordionBody.classList.add("accordion-body");
        h3Element.innerText = item.webTitle;
        icon.classList.add("fa", "fa-caret-down");
        accordionHeader.addEventListener("click", (event) => {
            openAccordion(event, item);
        });

        accordionHeader.appendChild(h3Element);
        accordionHeader.appendChild(icon);
        liElement.appendChild(accordionHeader);
        liElement.appendChild(accordionBody);
        listConrainer.appendChild(liElement);
    }
}

function openAccordion(event, item) {
    const accordionContainer = event.currentTarget.parentElement;
    const url = item.apiUrl + "?show-blocks=body&api-key=" + apiKey;
    fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            showAccordionInfo(data, accordionContainer);
        })
        .catch((error) => {
            console.error(error);
        });
}

function showAccordionInfo (data, accordionContainer) {
    const accordionHeader = accordionContainer.querySelector(".accordion-header");
    const accordionBody = accordionContainer.querySelector(".accordion-body");
    const icon = accordionContainer.querySelector(".accordion-header i");

    const accordionShown = accordionContainer.getAttribute("data-accordion-shown");
    const link = document.createElement("a");

    accordionBody.innerHTML = data.response.content.blocks.body[0].elements[0].textTypeData.html;
    link.setAttribute("href", data.response.content.webUrl);
    link.innerText = "Read full news";
    accordionBody.appendChild(link);

    if (accordionShown === "false") {
        accordionHeader.style.background = "lightskyblue";
        accordionBody.style.display = "block";
        accordionContainer.setAttribute("data-accordion-shown", true);
        icon.classList.remove("fa-caret-down");
        icon.classList.add("fa-caret-up");
    } else {
        accordionHeader.style.background = "none";
        accordionBody.style.display = "none";
        accordionContainer.setAttribute("data-accordion-shown", false);
        icon.classList.remove("fa-caret-up");
        icon.classList.add("fa-caret-down");
    }
}

function showMessageError (message) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
}

function handleRefreshClick () {
    loadNews();
}