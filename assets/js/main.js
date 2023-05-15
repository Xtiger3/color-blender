// let colorInput = document.querySelector("#color");
// let hexInput = document.querySelector("#hex");

// colorInput.addEventListener("input", () => {
//     let color = colorInput.value;
//     hexInput.value = color;
//     document.body.style.backgroundColor = color;
//     //document.querySelector('h1').style.color = color;
// });

const container = document.getElementById("colors");
const colorIn1 = document.getElementById("color1");
const colorIn2 = document.getElementById("color2");
const stepsIn = document.getElementById("steps");

let details = {
    color1: () => colorIn1.value,
    color2: () => colorIn2.value,
    steps: () => stepsIn.value
};

const clearGrid = () => (container.innerHTML = "");

const applyGrid = (cols) => {
    container.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
};

const makeEl = (color, input) => {
    let div = document.createElement("div");
    let text = document.createElement("div");
    div.style.backgroundColor = color;
    div.className = "color";
    div.setAttribute("data-color", color);
    text.className = "color-text";
    // if condition text.className = "dark";
    container.appendChild(div);
    div.appendChild(text);
    if (input == 0) {
        let x = document.createElement("input");
        let l = document.createElement("label");
        x.setAttribute("type", "text");
        x.setAttribute("id", "hex1");
        x.setAttribute("value", color);
        x.setAttribute("onchange", "changeColor(this.value, 0)");
        text.appendChild(x);
        x.appendChild(l);
    } else if (input == 1) {
        let x = document.createElement("input");
        let l = document.createElement("label");
        x.setAttribute("type", "text");
        x.setAttribute("id", "hex2");
        x.setAttribute("value", color);
        x.setAttribute("onchange", "changeColor(this.value, 1)");
        text.appendChild(x);
        x.appendChild(l);
    } else {
        text.innerHTML = color; 
    }
};

const hexToRGB = (H) => {
    let r = 0,
        g = 0,
        b = 0,
        output;
        
    if (H.length == 4) {
        r = parseInt(H[1] + H[1], 16);
        g = parseInt(H[2] + H[2], 16);
        b = parseInt(H[3] + H[3], 16);
    } else if (H.length == 7) {
        r = parseInt(H[1] + H[2], 16);
        g = parseInt(H[3] + H[4], 16);
        b = parseInt(H[5] + H[6], 16);
    }

    //console.log("rgb(" + r + "," + g + "," + b + ")");

    output = {
        r: r,
        g: g,
        b: b,
        code: "rgb(" + r + "," + g + "," + b + ")"
    };
    return output;
};

const rgbToHex = (r, g, b) => {
    r = Math.round(r).toString(16);
    g = Math.round(g).toString(16);
    b = Math.round(b).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    // console.log("#" + r + g + b);

    return "#" + r + g + b;
};

const getColors = () => {
    let colors = [];
    (r = []), (g = []), (b = []);
    const color1 = hexToRGB(details.color1()),
        color2 = hexToRGB(details.color2()),
        steps = parseInt(details.steps()) + 1;
    r.push(color1.r);
    g.push(color1.g);
    b.push(color1.b);
    rDiff = (color2.r - color1.r) / steps;
    gDiff = (color2.g - color1.g) / steps;
    bDiff = (color2.b - color1.b) / steps;
    for (let i = 1; i < steps + 1; i++) {
        r.push(r[0] + rDiff * i);
        g.push(g[0] + gDiff * i);
        b.push(b[0] + bDiff * i);
    }

    for (let i = 0; i < r.length; i++) {
        colors.push(rgbToHex(r[i], g[i], b[i]));
    }
    return colors;
};

const run = () => {
    let colors = getColors();
    clearGrid();
    applyGrid(colors.length);
    for (let i = 0; i < colors.length; i++) {
        if (i == 0) {
            makeEl(colors[i], 0);
        } else if (i == colors.length - 1) {
            makeEl(colors[i], 1);
        } else {
            makeEl(colors[i], 2);
        }
    }
};

run();

colorIn1.oninput = () => run();
colorIn2.oninput = () => run();
stepsIn.oninput = () => run();

function changeColor(val, num) {
    if (num == 0) colorIn1.value = val;
    else if (num == 1) colorIn2.value = val;
    run();
}