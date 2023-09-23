const canvas = document.querySelector('#canvas');
const borderSize = document.querySelector('#border-size');
const sizeSlider = document.querySelector('#size-slider');
borderSize.textContent = sizeSlider.value;

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

function createGrid(rows, cols) {
    for (let i = 0; i < rows; i++) {
        let row = createRowOfBlocks(cols);
        canvas.appendChild(row);
    }
}

createGrid(sizeSlider.value, sizeSlider.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function paintBlock(block, color) {
    block.style.background = color;
}

function updateState(e) {
    console.log(e.target);
    if (e.type === 'mouseover' && !mouseDown)
        return;
    paintBlock(e.target, 'black');
}

function clearGrid() {
    let blocks = document.querySelectorAll('.block');
    blocks.forEach(block => paintBlock(block, 'white'));
}

function resetGrid() {
    canvas.replaceChildren();
    createGrid(sizeSlider.value, sizeSlider.value);
    blocks = document.querySelectorAll('.block');
}

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', clearGrid);

sizeSlider.addEventListener('input', (event) => {
    borderSize.textContent = event.target.value;
    resetGrid();
})