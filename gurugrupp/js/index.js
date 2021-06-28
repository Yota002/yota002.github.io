const url = "https://6075786f0baf7c0017fa64ce.mockapi.io/products";
const imgUrl = "https://source.unsplash.com/random";

function getCard(seen, oldPrice, price, title, locality, date, imgUrl) {
    if (locality.length > 15) {
        locality = locality.substring(0, 15);
    }
    const template = `
    <div class="card" seen=${seen}>
        <img alt="Card Image" class="card__image" src="${imgUrl}"></img>
            <div class="card__container">
                <p class="card__oldprice">${oldPrice} ₽</p>
                <p class="card__price">${price} ₽</p>
                <p class="card__title">${title}</p>
                <div class="card__info">
                    <p>${locality}</p>
                    <p>${date}</p>
                </div>
        </div>
        <div class="card__button card__like"></div>
        <div class="card__button card__compare"></div>
        <div class="card__button card__delivery"></div>
        <div class="card__button card__deal"></div>
        <div class="card__carouselcontainer">
            <div class="card__button card__carousel"></div>
            <div class="card__button card__carousel"></div>
            <div class="card__button card__carousel"></div>
            <div class="card__button card__carousel"></div>
        </div>
    </div>
    `;
    return template;
}

function formatDate(date) {
    let ye = new Intl.DateTimeFormat('ru', { year: '2-digit' }).format(date);
    let mo = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(date);
    let da = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(date);
    let ho = new Intl.DateTimeFormat('ru', { hour: '2-digit' }).format(date);
    let mi = new Intl.DateTimeFormat('ru', { minute: '2-digit' }).format(date);
    return `${da}.${mo}.${ye}, ${ho}:${mi}`;
}

async function appendData(data) {
    var mainContainer = document.getElementById("cardContainer");
    for (var i = 0; i < 16; i++) {
        const response = await fetch(imgUrl);
        mainContainer.innerHTML += getCard(data[i].seen, data[i].oldPrice, data[i].price, data[i].title, data[i].locality, formatDate(data[i].date), response.url);
    }
}

var data;

fetch(url).then(response => {
    response.json().then(res => {
        data = res;
        appendData(res);
    });
});

var showMoreButton = document.getElementById("showMore");
showMoreButton.onclick = async function () {
    var mainContainer = document.getElementById("cardContainer");
    showMoreButton.style.display = "none";
    for (var i = 16; i < data.length; i++) {
        const response = await fetch(imgUrl);
        mainContainer.innerHTML += getCard(data[i].seen, data[i].oldPrice, data[i].price, data[i].title, data[i].locality, formatDate(data[i].date), response.url);
    }
}