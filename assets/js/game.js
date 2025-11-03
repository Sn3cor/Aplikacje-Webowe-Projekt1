import { Wordle } from "./Wordle.js"

let game_instance = new Wordle();
game_instance.init().then(() => {
    console.log(game_instance.getAns());
    console.log(game_instance.binary_search(game_instance.word_list, game_instance.getAns()))
    game_instance.rowInput();

});
