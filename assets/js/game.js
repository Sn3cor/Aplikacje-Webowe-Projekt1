import { Wordle } from "./Wordle.js"

let game_instance = new Wordle();
game_instance.init().then(() => {
    // console.log(game_instance.getAns());
    game_instance.rowInput();

});
