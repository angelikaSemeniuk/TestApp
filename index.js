
const url = 'https://content.guardianapis.com/search?api-key=64725228-5b31-4c1c-aba5-faa61edfb7be';
const params = { method: 'get' };
const errorElement = document.querySelector(".messageError");
const button = document.querySelector("button");
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

    var listConrainer = document.querySelector(".list");
    listConrainer.innerHTML = "";

    for (var i = 0; i < data.response.results.length; i++) {
        var liElement = document.createElement("li");
        liElement.className = "item";
        var headerElement = document.createElement("h3");

        headerElement.innerText = data.response.results[i].webTitle;
        liElement.appendChild(headerElement);
        listConrainer.appendChild(liElement);
    }
}

function showMessageError (message) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
}

function handleRefreshClick () {
    loadNews();
}