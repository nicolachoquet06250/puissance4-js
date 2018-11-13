'use strict';

class Puissance4 {
    constructor() {
        this.player = 1;
        this.column = 5;
        this.line = 5;
        this.game = true;
        this.text = '';
        this.plateau = [];
        this.$text_notice = document.querySelector('#text-annonce');
        this.$puissance4_table = document.querySelector('#puissance4');
        for (let i = 0; i < this.line; i++) {
            this.plateau[i] = [];
        }
        this.new();
    }
    new() {
        for(let i = 0; i < this.line; i++ ) {
            for(let j = 0; j < this.column; j++) {
                this.plateau[i][j] = 0;
            }
        }
        this.player = 1;
        this.print_text_annonce(`Le jeu commance ! c'est au tour du joueur ${this.get_player_name()}`);
        this.game = true;
        this.create_table();
    }
    get_player_name() {
        return this.player === 1 ? "rouge" : "bleu";
    }
    change_player() {
        this.player = this.player === 1 ? 2 : 1;
    }
    print_text_annonce(text) {
        this.$text_notice.innerHTML = text;
    }
    create_table() {
        this.text = '<table>';
        for (let i = 0; i < this.line; i++) {
            this.text += '<tr>';
            for(let j = 0; j < this.column; j++) {
                this.text += `<td class="cel" data-j="${j}" id="case_${i}_${j}">`;
                this.text += `<div class="player player${this.plateau[i][j]}"></div>`;
                this.text += `</td>`;
            }
            this.text += '</tr>';
        }
        this.text += '</table>';
        this.$puissance4_table.innerHTML = this.text;
    }
    onClick(j) {
        if(this.checkPosition(j) && this.game) {
            let currentLine = this.poseGeton(j);
            let checkEnd = this.run(currentLine, j, 0, 0);
            console.log(checkEnd, 'l56');
            this.game = checkEnd ? false : (this.player === 1 ? 2 : 1);
            if(checkEnd) this.print_text_annonce(`Le joueur ${this.get_player_name()} à gagné !`);
            else {
                this.change_player();
                this.print_text_annonce(`C'est au tour du joueur ${this.get_player_name()}`);
            }
        }
    }
    checkPosition(j) {
        return this.plateau[0][j] === 0;
    }
    poseGeton(j) {
        for(let i = this.line-1; i >= 0; i--) {
            if(this.plateau[i][j] === 0) {
                this.plateau[i][j] = this.player;
                this.refreshTable(i, j);
                return i;
            }
        }
    }
    refreshTable(x, y) {
        document.querySelector(`#case_${x}_${y}`).innerHTML = `<div class="player player${this.player}"></div>`;
    }
    run(line, column, l, c) {
        // console.log(`Valeurs : ${line} ${column} / Incrément ${l} ${c}`);
        if(l === 0 && c === 0) {
            let va = 1 + this.run(line + 1, column, 1, 0) + this.run(line-1, column, -1, 0);
            let vb = 1 + this.run(line, column + 1, 0, 1) + this.run(line, column - 1, 0, -1);
            let vc = 1 + this.run(line + 1, column + 1, 1, 1) + this.run(line - 1, column - 1, -1, -1);
            let vd = 1 + this.run(line - 1, column + 1, -1, 1) + this.run(line + 1, column - 1, 1, -1);
            console.log(va, vb, vc, vd, 'l87');
            return va === 4 || vb === 4 || vc === 4 || vd === 4;
        }
        if(line < this.line && line >= 0 && column < this.column && column >= 0) {
            if(this.plateau[line][column] === this.player) {
                let run_result = this.run(line + 1, column + c, l, c);
                console.log(1 + run_result, 'l92');
                return 1 + run_result;
            }
            else {
                return 0;
            }
        }
    }
}