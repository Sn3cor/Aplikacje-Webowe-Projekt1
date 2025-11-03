class Wordle {
    #ans;
    activerow;
    board;
    word_list;
    constructor() {
        this.activerow = 0;
        this.board = this.generateBoard();
    }

    init = async () => {
        const ans_list = await this.getWordList("wordle-La")
        this.#ans = ans_list[Math.floor(Math.random() * ans_list.length)];

        const listLa = await this.getWordList("wordle-La");
        const listTa = await this.getWordList("wordle-Ta");
        this.word_list = listLa.concat(listTa).sort();
    }

    // getAns = () => {
    //     return this.#ans;
    // }

    generateBoard = () => {
        const guess_list = document.querySelector(".guess-list")

        for (let i = 0; i < 6; i++) {

            const row = document.createElement("div");
            row.classList.add("guess-row");
            guess_list.appendChild(row);
        }

        for (const child of guess_list.children) {
            for (let i = 0; i < 5; i++) {

                const el = document.createElement("div");
                el.classList.add("guess", "font", "font-size-l");
                child.appendChild(el);
            }
        }
        return guess_list;

    }

    getWordList = async (file_name) => {
        const response = await fetch(`assets/js/${file_name}.txt`)
        const text = await response.text();
        return text.split("\n");
    }

    binary_search = (arr, key) => {
        const mid = Math.floor(arr.length / 2);
        const mid_value = arr[mid];

        if (key === mid_value) return true;
        if (arr.length <= 1) return false;
        if (mid_value < key) {
            return this.binary_search(arr.slice(mid + 1), key);
        }
        else if (mid_value > key) {
            return this.binary_search(arr.slice(0, mid), key);
        }
        return false;

    }
    //moze jakis timeout zeby animka fajniej wygladala
    colorRow = (guess_word) => {
        for (let i = 0; i < 5; i++) {
            const el = this.board.children[this.activerow].children[i];
            if (guess_word[i] == this.#ans[i]) {
                el.style.backgroundColor = "var(--green)";
            }
            else if (this.#ans.includes(guess_word[i])) {
                el.style.backgroundColor = "var(--yellow)";
            }
            else {
                el.style.backgroundColor = "grey";
            }
        }
    }

    checkGuessWord = (guess_word) => {
        const err = document.querySelector(".err");
        if (!this.binary_search(this.word_list, guess_word)) {
            err.style.color = "var(--sec-font-color)"
            err.innerHTML = "Nie istnieje takie słowo";
            return false;
        }

        return true
    }

    rowInput = () => {
        const index = this.activerow;
        let word = "";
        const curr_row = this.board.children[index]
        const err = document.querySelector(".err");
        let curr_index = 0;

        const handleInput = (e) => {
            const key = e.key;
            err.style.color = "transparent";
            err.innerHTML = "";
            if (key === "Backspace") {
                if (curr_index > 0) {
                    curr_index--;
                    word = word.slice(0, -1);
                    curr_row.children[curr_index].innerHTML = "";
                }
            } else if (key === "Enter") {
                if (curr_index < 5) {
                    err.style.color = "var(--sec-font-color)"
                    err.innerHTML = "Podane słowo jest za krótkie"
                }
                else {

                    if (this.checkGuessWord(word)) {
                        this.colorRow(word);
                        if (word === this.#ans) {
                            err.style.color = "var(--green)";
                            err.innerHTML = `Gratulacje odgadłeś hasło: ${this.#ans}`;
                            document.removeEventListener("keydown", handleInput);
                            return
                        }

                        if (this.activerow < 5) {
                            this.activerow += 1;
                        }
                        else {
                            err.style.color = "var(--sec-font-color)";
                            err.innerHTML = `Niestety nie odgadłeś hasła: ${this.#ans}`;
                            document.removeEventListener("keydown", handleInput);
                            return
                        }

                        document.removeEventListener("keydown", handleInput);

                        if (this.activerow < 6) {
                            this.rowInput();
                        }

                    }
                }

            } else if (/^[a-zA-Z]$/.test(key)) {
                if (curr_index < 5) {
                    curr_row.children[curr_index].innerHTML = key.toUpperCase();
                    word += key.toLowerCase();
                    curr_index++;
                }
            }
        }
        document.addEventListener("keydown", handleInput);
    }

}

export { Wordle };