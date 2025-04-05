let selectedColor = 'black';

function setColor(color) {
    selectedColor = color;
}

function openTextWindow() {
    let text1 = document.getElementById("text1").value;
    let text2 = document.getElementById("text2").value;
    let fontSize = document.getElementById("fontSize").value;
    
    let newWindow = window.open("", "_blank", "width=400,height=300");
    newWindow.document.write(`
        <style>
            body { font-size: ${fontSize}; color: ${selectedColor}; }
        </style>
        <p>${text1}</p>
        <p>${text2}</p>
    `);
}

function openCombinedWindow() {
    let text1 = document.getElementById("text1").value;
    let text2 = document.getElementById("text2").value;
    let fontSize = document.getElementById("fontSize").value;
    
    let newWindow = window.open("", "_blank", "width=400,height=300");
    newWindow.document.write(`
        <style>
            body { font-size: ${fontSize}; color: ${selectedColor}; }
        </style>
        <p>${fontSize} ${selectedColor}</p>
        <p>${text1}</p>
        <p>${text2}</p>
    `);
}
