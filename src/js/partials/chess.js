'use strict'

// Game field

class Field {
    static get fieldPosition() { // Get chess table element
        return document.querySelector('.chess_table');
    }

    static get fieldMap() { // Get map of the game
        return [
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            [1, 2, 3, 4, 5, 6, 7, 8],
            ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
        ];
    }

    static get cells() { // Get all cells on chess board
        return document.querySelectorAll('.cell');
    }

    static get figures() {
        return document.querySelectorAll('.figure');
    }

    createField() { // Create field
        function addCell(cellName) { // Add new cell in chess board
            let newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('cell', cellName);
            Field.fieldPosition.appendChild(newCell);
        };

        let lastPosition = 8;

        for (let i = 0; i < 8; i++) { // Fill the board with cells
            for (let i = 0; i < 8; i++) {
                let newCellLetter = Field.fieldMap[0][i]; // Get current letter symbol
                let newCellNumber = lastPosition; // Get current number symbol
                addCell(newCellLetter + newCellNumber); // Create new cell
            }
            --lastPosition;
        }
    }
}

// Figures

class Figures extends Field {

    static get figuresCollection() { // Figures collection
        return {
            king: {
                symbol: '&#9812;'
            },
            queen: {
                symbol: '&#9813;'
            },
            rook: {
                symbol: '&#9814;'
            },
            bishop: {
                symbol: '&#9815;'
            },
            knight: {
                symbol: '&#9816;'
            },
            pawn: {
                symbol: '&#9817;'
            }
        }
    }

    getFigure(figure, team) { // Get new figure
        let newFigure = document.createElement('div');
        newFigure.classList.add('figure');
        newFigure.setAttribute('team', team);
        newFigure.setAttribute('figure', figure);
        newFigure.innerHTML = Figures.figuresCollection[figure].symbol;
        return newFigure;
    }

    addFigure(cell, figure) { // Add figure on field
        [].forEach.call(Field.cells, checkedCell => {
            if (checkedCell.getAttribute('cell') === cell)
                checkedCell.appendChild(figure);
        });
    }

    buildTeams() { // Create teams
        let whiteTeam = [];
        let blackTeam = [];

        [].forEach.call(Field.cells, (cell, index) => {
            if (index < 16)
                blackTeam.push(cell);
            else if (index > 47)
                whiteTeam.push(cell);
        });

        // Create black team

        Field.fieldMap[2].forEach((figure, index) => {
            let currentCell = blackTeam[index].getAttribute('cell');
            this.addFigure(currentCell, this.getFigure(figure, 'black'));
        });

        blackTeam.forEach((cell) => {
            let currentCell = cell.getAttribute('cell');
            if (!(cell.child))
                this.addFigure(currentCell, this.getFigure('pawn', 'black'));
        });

        // Create white team

        whiteTeam.forEach((cell, index) => {
            if (index < 8) {
                let currentCell = cell.getAttribute('cell');
                this.addFigure(currentCell, this.getFigure('pawn', 'white'));
            }
        });

        let currentWhiteFigure = 0;

        for (let i = 15; i > 0; i--) {
            if (currentWhiteFigure < 8) {
                let currentCell = whiteTeam[i].getAttribute('cell');
                let currentFigure = this.getFigure(Field.fieldMap[2][currentWhiteFigure], 'white');
                this.addFigure(currentCell, currentFigure);
                ++currentWhiteFigure;
            }
        }
    }
}

class Cell extends Field {

    moveFigure(cell, figure) {
        cell.appendChild(figure);
        Figure.cellsUnHightlight();
    }

    isSelected() {
        let selectedFigures = document.querySelectorAll('.selected');
        if (selectedFigures.length > 0)
            return selectedFigures[0];
    }

    returnSelectedFigure() {
        let selectedFigure = document.getElementsByClassName('selected')[0];
        return selectedFigure;
    }

    isHighlighted(cell) {
        if (cell.classList.contains('highlight'))
            return true;
        return false;
    }

    cellHandler(cell) {
        if (this.isSelected())
            if (this.isHighlighted(cell))
                this.moveFigure(cell, this.returnSelectedFigure());
    }
}

class Figure extends Figures {
    constructor(figure) {
        super();
        this.parseFigure(figure);
        this.cellName;
        this.figureName;
        this.teamName;
    }

    get cell() {
        return this.cellName;
    }

    set cell(value) {
        this.cellName = value;
    }

    get figure() {
        return this.figureName;
    }

    set figure(value) {
        this.figureName = value;
    }

    get team() {
        return this.teamName;
    }

    set team(value) {
        this.teamName = value;
    }

    parseFigure(figure) {
        this.cell = figure.parentNode.getAttribute('cell');
        this.figure = figure.getAttribute('figure');
        this.team = figure.getAttribute('team');
        this.changeSelect(figure);
    }

    changeDeselect() {
        let selectedCells = document.getElementsByClassName('selected');
        if (selectedCells.length)
            selectedCells[0].classList.remove('selected');
    }

    changeSelect(parentFigure) {
        this.changeDeselect();
        parentFigure.classList.toggle('selected');
        this.calcMoves();
    }

    cellsHightlight(cells) {
        Figure.cellsUnHightlight();
        Field.cells.forEach((cell) => {
            let currentCell = cell.getAttribute('cell');
            if (cells.indexOf(currentCell) !== -1)
                cell.classList.add('highlight')
        });
    };

    static cellsUnHightlight() {
        Field.cells.forEach((cell) => {
            if (cell.classList.contains('highlight'))
                cell.classList.remove('highlight');
        });
    };

    calcMoves() {

    }
}

class Pawn extends Figure {
    constructor(figure) {
        super(figure);
    }
    calcMoves() {
        let self = this;
        let steps = [];
        let currentCell = this.cell;
        let currentTeam = this.team;
        steps.push(oneStep(currentCell));

        function oneStep(cell) {
            let newStep;
            let cellLetter = cell[0];
            let cellNumber = parseInt(cell[1]);
            if (self.team === 'white')
                newStep = cellLetter + ++cellNumber;
            else
                newStep = cellLetter + --cellNumber;
            return newStep;
        }
        this.cellsHightlight(steps);
    }
}

let field = new Field();
field.createField();
let figures = new Figures();
let cellLogic = new Cell();
figures.buildTeams();


Field.figures.forEach((figure) => {
    figure.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        let figure = new Pawn(event.target);
    });
});

Field.cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
        cellLogic.cellHandler(event.target);
    });
});