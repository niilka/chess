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

    cellEventHandler(event) {
        let currentCell = event.target;
        let self = this;

        function moveFigure(figure, cell) {
            cell.appendChild(figure);
            self.cellHighlight(false);
        }

        function isHighlighted(cell) {
            if (cell.classList.contains('highlight'))
                return true;
            return false;
        }

        function isSelected() {
            if (document.getElementsByClassName('selected').length)
                return true;
            return false
        }

        function getSelectedFigure() {
            let figure = document.getElementsByClassName('selected')[0];
            return figure;
        }

        if (isHighlighted(currentCell)) {
            if (isSelected())
                moveFigure(getSelectedFigure(), currentCell);
        }

    }

    addCellEvent() {
        Field.cells.forEach((cell) => {
            cell.addEventListener('mousedown', (event) => {
                this.cellEventHandler(event)
            });
        });
    }

    cellHighlight(highlitedCells) {
        if (highlitedCells) {
            Field.cells.forEach((cell) => {
                let currentCell = cell.getAttribute('cell');
                if (highlitedCells.indexOf(currentCell) !== -1)
                    cell.classList.add('highlight')
            });
        } else {
            Field.cells.forEach((cell) => {
                cell.classList.remove('highlight');
            });
        }
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

    addFiguresEvent() {
        Field.figures.forEach((figure) => {
            figure.addEventListener('mousedown', (event) => {
                this.figureEventHandler(event);
            });
        });
    }

    figureEventHandler(event) {
        function changeSelected(selectFigure) {
            Field.figures.forEach((figure) => {
                if (figure.classList.contains('selected'))
                    figure.classList.remove('selected');
            })
            selectFigure.classList.toggle('selected');
        };
        event.preventDefault();
        event.stopPropagation();
        changeSelected(event.target);
        this.figureListener(event.target);
    }

    stepLogic(figureObject) {
        switch (figureObject.figureName) {
            case 'pawn':
                super.cellHighlight(false);
                super.cellHighlight(pawn(figureObject));
                break;
        }

        function pawn(figureObject) {
            let cellName = figureObject.cellName;
            let team = figureObject.figureTeam;
            let letter = cellName[0];
            let number = parseInt(cellName[1]);
            let steps = [];
            if (team === 'white') {
                steps = [letter + (number + 1), letter + (number + 2)];
            } else {
                steps = [letter + (number - 1), letter + (number - 2)];
            }
            return steps;
        }
    }

    figureListener(figure) {
        let figureObject = {
            cellName: figure.parentNode.getAttribute('cell'),
            figureName: figure.getAttribute('figure'),
            figureTeam: figure.getAttribute('team')
        }
        this.stepLogic(figureObject);
    }
}

class Figure extends Figures {
    constructor(figure) {
        this.steps;
        this.eats;
        this.cell = figure.cellName;
        this.team = figure.teamName;
        this.figureName = figure.figureName;
    }

    get steps() {
        return this.steps;
    }

    set steps(value) {
        this.steps = value;
    }

    get eats() {
        return this.eats;
    }

    set eats(value) {
        this.eats = value;
    }
}

let field = new Field();
field.createField();
field.addCellEvent();
let figures = new Figures();
figures.buildTeams();
figures.addFiguresEvent();