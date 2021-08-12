let file = new XMLHttpRequest;
let lang = navigator.language.split("-")[0];
switch (lang) {
    case "ru":
        // file.open("GET", "../pages/ru.html", true);
        file.open("GET", "/portfolio/pages/ru.html", true);
        break;
    default:
        // file.open("GET", "../pages/en.html", true);
        file.open("GET", "/portfolio/pages/en.html", true);
        break;
}
file.onload = function () {
    document.getElementById("html").innerHTML = file.responseText;
    document.getElementById("html").lang = lang;
}
file.send(null);