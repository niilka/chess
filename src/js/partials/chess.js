'use strict';

class Table {
    createField() {
        const TABLE_POSITION = document.getElementsByClassName('chess_table')[0];

        let appendCell = function (cell) {
            TABLE_POSITION.appendChild(cell);
        };

        let createCell = function (cellName) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('cell', cellName)
            appendCell(cell);
        }

        const MAP = [
            'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
            'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
            'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
            'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
            'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
        ]

        MAP.forEach((cellName) => {
            createCell(cellName);
        }, this);
    }
}

class Figures {
    getFigure(figure, color) {
        const FIGURES_COLLECTION = {
            king: {
                white: '&#9812;',
                black: '&#9818;'
            },
            queen: {
                white: '&#9813;',
                black: '&#9819;'
            },
            rook: {
                white: '&#9814;',
                black: '&#9820;'
            },
            bishop: {
                white: '&#9815;',
                black: '&#9821;'
            },
            knight: {
                white: '&#9816;',
                black: '&#9822;'
            },
            pawn: {
                white: '&#9817;',
                black: '&#9823;'
            }
        }

        let newFigure = document.createElement('div');
        newFigure.setAttribute('team', color);
        newFigure.classList.add('figure');
        newFigure.innerHTML = FIGURES_COLLECTION[figure][color];
        return newFigure;
    }

    setFigure(cell, figure) {
        let allCells = document.getElementsByClassName('cell');
        [].forEach.call(allCells, checkedCell => {
            if (checkedCell.getAttribute('cell') === cell) {
                checkedCell.appendChild(figure);
            }
        });
    }

    setAllFigures() {
        let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        const FIGURES_TEMPLATE = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        for (let i = 0; i < 8; i++) {
            this.setFigure(`${chars[i]}1`, this.getFigure(FIGURES_TEMPLATE[i], 'white'));
        }

        for (let i = 0; i < 8; i++) {
            this.setFigure(`${chars[i]}2`, this.getFigure('pawn', 'white'));
        }

        for (let i = 0; i < 8; i++) {
            this.setFigure(`${chars[i]}8`, this.getFigure(FIGURES_TEMPLATE[i], 'black'));
        }

        for (let i = 0; i < 8; i++) {
            this.setFigure(`${chars[i]}7`, this.getFigure('pawn', 'black'));
        }
    }

    setSelectedEvent() {
        let allFiguresOnDesk = document.getElementsByClassName('figure');
        for (let i = 0; i < allFiguresOnDesk.length; i++) {
            allFiguresOnDesk[i].addEventListener('click', function (event) {
                for (let i = 0; i < allFiguresOnDesk.length; i++) {
                    allFiguresOnDesk[i].classList.remove('selected');
                }
                event.target.classList.toggle('selected');
            });
        }
    }
}

let table = new Table();
table.createField();
let figures = new Figures();
figures.setAllFigures();
figures.setSelectedEvent();


let allCells = document.getElementsByClassName('cell');
[].forEach.call(allCells, checkedCell => {
    checkedCell.addEventListener('click', (event) => {
        let allFiguresOnDesk = document.getElementsByClassName('figure');
        for (let i = 0; i < allFiguresOnDesk.length; i++) {
            if (allFiguresOnDesk[i].classList.contains('selected')) {
                event.target.appendChild(allFiguresOnDesk[i]);
            }
        }
    });
});