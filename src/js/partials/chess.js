'use strict'

// Game field

class Field {
    constructor() { // Run field building
        this.createField();
    }

    static get fieldPosition() { // Get chess table element
        return document.querySelector('.chess_table');
    }

    static get fieldMap() { // Map of the game
        return [
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            [1, 2, 3, 4, 5, 6, 7, 8]
        ];
    }

    static get cells() { // Get all cells on chess board
        return document.querySelector('.cell');
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

let field = new Field();