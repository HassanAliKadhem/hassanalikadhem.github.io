let hslDiv;
let hueDiv;
let lumiDiv;
let axisX;
let axisY;

export function pick() {
    let hsl = document.createElement("div");
    hsl.classList.add("hsl");
    document.body.appendChild(hsl);
    hslDiv = [...document.getElementsByClassName("hsl")].pop();

    let hue = document.createElement("div");
    hue.classList.add("hue");
    hue.classList.add("text");
    document.body.appendChild(hue);
    hueDiv = [...document.getElementsByClassName("hue")].pop();

    let lumi = document.createElement("div");
    lumi.classList.add("luminosity");
    lumi.classList.add("text");
    document.body.appendChild(lumi);
    lumiDiv = [...document.getElementsByClassName("luminosity")].pop();

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", document.body.clientWidth);
    line.setAttribute("y2", 0);
    svg.classList.add("svg");
    line.classList.add("line")
    line.id = "axisY";
    svg.appendChild(line);
    document.body.appendChild(svg);

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", 0);
    line.setAttribute("y2", document.body.clientHeight);
    svg.classList.add("svg");
    line.classList.add("line")
    line.id = "axisX";
    svg.appendChild(line);
    document.body.appendChild(svg);

    let lines = [...document.getElementsByClassName("line")];
    axisY = lines[0];
    axisX = lines[1];

    document.addEventListener("mousemove", updateColor);
    document.addEventListener("mousedown", chooseColor);

}

let hsl = "hsl(0, 50%, 50%)";

function updateColor(event) {
    let hue = Math.round((event.offsetX / document.body.clientWidth) * 360);
    let lumi = Math.round((event.offsetY / document.body.clientHeight) * 100);
    hsl = "hsl(" + hue + ", 50%, " + lumi + "%)";
    hslDiv.innerHTML = hsl;
    hueDiv.innerHTML = "Hue\n" + hue;
    lumiDiv.innerHTML = lumi + "\nluminosity";
    // document.documentElement.style.setProperty("--background", hsl);
    document.querySelector("body").style.background = hsl;
    console.log(document.querySelector("body").style.background);

    axisX.setAttribute("x1", event.offsetX);
    axisX.setAttribute("x2", event.offsetX);
    axisY.setAttribute("y1", event.offsetY);
    axisY.setAttribute("y2", event.offsetY);
}

function chooseColor(event) {
    // console.log(hsl + " copied");
    navigator.clipboard.writeText(hsl);
}