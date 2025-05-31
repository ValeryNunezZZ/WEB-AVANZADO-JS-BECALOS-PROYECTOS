const form = document.querySelector("#registerForm");
const out = document.querySelector("#output")

const emailInput = document.querySelector("#email")

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const data = Object.fromEntries(new FormData(form))

    console.log(data);

    out.textContent = JSON.stringify(data, null, 2);

    form.reset()
})

emailInput.addEventListener('invalid', e => {
    e.target.setCustomValidity('Por ingresa un correo valido :(')
})

emailInput.addEventListener('input', e => {
    e.target.setCustomValidity("")
})