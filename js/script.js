'use strict';

let game_obj = new Puissance4();

document.querySelector('#new-game').onclick = () => {
    game_obj.new();
};

document.querySelectorAll('.cel').forEach(cel => {
    cel.onclick = () => {
        game_obj.onClick(cel.getAttribute('data-j'));
    };
});