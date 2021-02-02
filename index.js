
const backing = document.getElementById("backing");
const button = document.getElementById("new-grid");

window.addEventListener("resize", () => initializeDrawArea(16, backing));
button.addEventListener("click", () => sizeGridSquares(backing));

const sizeField = box => {
  const width =
    window.innerWidth < window.innerHeight - 95
      ? window.innerWidth - 20
      : window.innerHeight - 95;
  box.style.width = `${width}px`;
  box.style.height = `${width}px`;
}

function colorIn() {
  let currentOpacity = +this.style.opacity;
  if (currentOpacity < 1) currentOpacity += 0.1;
  this.style.opacity = currentOpacity;
}

const createGrid = (squaresPerSide, container) => {
  const squareSize = +container.style.width.slice(0, -2) / squaresPerSide;
  const numberOfSquares = squaresPerSide * squaresPerSide;

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let i = 1; i <= numberOfSquares; i++) {
    const div = document.createElement("div");

    div.classList = "square";
    div.setAttribute(
      "style",
      `
            border: none;
            margin: 0;
            padding: 0;
            height: ${squareSize}px;
            width: ${squareSize}px;
            background-color: black;
            opacity: .1;
            display: inline-block;
        `
    );

    container.appendChild(div);
    div.addEventListener("mouseenter", colorIn);
  }
}

const initialiseDrawArea = (squareSize, container) => {
  sizeField(container);
  createGrid(squareSize, container);
}

initialiseDrawArea(16, backing);


const sizeGridSquares = container => {
  const squaresPerSide = prompt('How fine would you like your pen, the higher the number, the finer?')
  if (!squaresPerSide || !Number.isInteger(+squaresPerSide)) {
    alert('Input must be a number!')
    return;
  }
  squaresPerSide > 100 || squaresPerSide < 0 ? 
    alert('Number out of range, should be between 0 and 100') :
    createGrid(squaresPerSide, container)
};