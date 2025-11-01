document.getElementById("clear").addEventListener("click", (e) => {
    console.log(e);
    document.getElementById("form").reset();
})

const customValidity = (input) => {
    const validity = input.validity;

    if (validity.valueMissing) return "Pole nie moze być puste";
    if (validity.tooShort && input.name === 'name') return "Imię jest za krótkie";
    if (validity.typeMismatch && input.type === 'email')
        return "Podaj poprawny adres email";

    return '';
}

const validateInput = (input) => {
    input.setCustomValidity(customValidity(input));
}

const form = document.querySelector("form");
form.toggleAttribute('novalidate', true);

form.addEventListener("input", e => {

    const input = e.target;
    console.log(input)
    input.parentElement.querySelector(".form-error").innerHTML = '';
    input.style.borderColor = 'var(--font-color)'
})

form.addEventListener("submit", e => {
    const inputs = Array.from(e.currentTarget.querySelectorAll("input, textarea, select"));
    console.log(inputs);
    for (const input of inputs) {
        inp_validity = customValidity(input);
        if (inp_validity) {
            input.parentElement.querySelector(".form-error").innerHTML = inp_validity;
            input.style.borderColor = 'var(--sec-font-color)'
            e.preventDefault();
            break;
        }
    }
})