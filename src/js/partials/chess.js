'use strict';

class Table {
    createField() {

        const tablePosition = document.getElementsByClassName('chess_table')[0];

        let appendCell = function (cell) {
            tablePosition.appendChild(cell);
        };

        let createCell = function (cellName) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('cell', cellName)
            appendCell(cell);
        }
        let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let ranges = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1
        }

        for (let i = 64; i >= 0; i--) {
            if (i >= 56) {
                if (ranges[8] < 9) {
                    createCell(chars[ranges[8] - 1] + 8);
                    ranges[8]++;
                }
            } else if (i >= 48) {
                if (ranges[7] < 9) {
                    createCell(chars[ranges[7] - 1] + 7);
                    ranges[7]++;
                }
            } else if (i >= 40) {
                if (ranges[6] < 9) {
                    createCell(chars[ranges[6] - 1] + 6);
                    ranges[6]++;
                }
            } else if (i >= 32) {
                if (ranges[5] < 9) {
                    createCell(chars[ranges[5] - 1] + 5);
                    ranges[5]++;
                }
            } else if (i >= 24) {
                if (ranges[4] < 9) {
                    createCell(chars[ranges[4] - 1] + 4);
                    ranges[4]++;
                }
            } else if (i >= 16) {
                if (ranges[3] < 9) {
                    createCell(chars[ranges[3] - 1] + 3);
                    ranges[3]++;
                }
            } else if (i >= 8) {
                if (ranges[2] < 9) {
                    createCell(chars[ranges[2] - 1] + 2);
                    ranges[2]++;
                }
            } else if (i >= 0) {
                if (ranges[1] < 9) {
                    createCell(chars[ranges[1] - 1] + 1);
                    ranges[1]++;
                }
            }
        }
    }
}

let table = new Table();
table.createField();