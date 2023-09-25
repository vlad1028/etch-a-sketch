const canvas = document.querySelector('#canvas');
const sizeSlider = document.querySelector('#size-slider');
const boardSizeRepresentation = document.querySelector('#board-size');

function setBoardSizeRepresentation() {
    size = sizeSlider.value;
    boardSizeRepresentation.textContent = `${size} x ${size}`;
}

setBoardSizeRepresentation();
sizeSlider.addEventListener('input', (event) => {
    setBoardSizeRepresentation();
    resetBoard();
})

function currentBoardSize() {
    return sizeSlider.value;
}

function createBlock() {
    let block = document.createElement('div');
    block.classList.add('block');
    block.style.width = `${100 / sizeSlider.value}%`;
    block.addEventListener('mouseover', updateState);
    block.addEventListener('mousedown', updateState);
    return block;
}

function createRow() {
    let row = document.createElement('div');
    row.classList.add('block-row')
    return row;
}

function createRowOfBlocks(size) {
    let row = createRow();
    for (let i = 0; i < size; i++) {
        let block = createBlock();
        row.appendChild(block);
    }
    return row;
}

function createBoard(rows, cols) {
    for (let i = 0; i < rows; i++) {
        let row = createRowOfBlocks(cols);
        canvas.appendChild(row);
    }
}

function clearBoard() {
    let blocks = document.querySelectorAll('.block');
    blocks.forEach(block => paintBlock(block, 'white'));
}

function resetBoard() {
    canvas.replaceChildren();
    createBoard(currentBoardSize(), currentBoardSize());
    blocks = document.querySelectorAll('.block');
}

createBoard(currentBoardSize(), currentBoardSize());

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function paintBlock(block, color) {
    block.style.background = color;
}

function updateState(e) {
    if (e.type === 'mouseover' && !mouseDown)
        return;
    paintBlock(e.target, 'black');
}

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', clearBoard);