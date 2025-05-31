/* (MODULO) Este es el punto de entrada del aplicativo, el que concentra todas las funcionalidades */

import { userSchema, todoSchema, validate, userSchemaLogin} from "./schema.js";
import { addTodo, registrarUsuario, loggearUsuario, removeTodo, toggleDone} from "./state.js";
import {
    renderErrors,
    renderRegisterOutput,
    renderTodoList,
    //setupTodoActions,
} from "./dom.js";


const todoForm = document.querySelector("#todoForm");
const todoList = document.querySelector("#todoList");

/* ---------- 1. Registro ---------- */
const registerForm = document.querySelector("#registerForm");
const registerOutput = document.querySelector("#registerOutput");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(registerForm));
    const { data, errors } = validate(userSchema, formData);

    console.log("FORMDATA:", formData)

    if (errors) {
        renderErrors(registerForm, errors);
    } else {
        renderErrors(registerForm); // limpia
        registrarUsuario(data);
        //renderRegisterOutput(registerOutput, data);
        registerForm.reset();
    }
});


/* ---------- 2. Iniciar sesión ---------- */
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(loginForm));
    const { data, errors } = validate(userSchemaLogin, formData);

    console.log("FORMDATA:", formData)

    let usuario;

    if (errors) {
        console.log(errors)
        //renderErrors(loginForm, errors);
    } else {
        //renderErrors(loginForm); // limpia
        usuario = await loggearUsuario(data);  // <- ahora sí esperas el resultado

        refreshTodos();
        //setupTodoActions(todoList, refreshTodos);

        //renderRegisterOutput(registerOutput, data);
        loginForm.reset();
    }
});




todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(todoForm));
    const { data, errors } = validate(todoSchema, formData);

    if (errors) {
        renderErrors(todoForm, errors);
    } else {
        await addTodo(data);
        renderErrors(todoForm);
        todoForm.reset();
        refreshTodos();
    }
});


document.addEventListener('click', async (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;

    if (action === "toggle") {
        await toggleDone(id);
        refreshTodos();
        // Aquí podrías hacer una petición al backend o actualizar la UI
    } else if (action === "delete") {
        //alert("delete" +  id);
        await removeTodo(id);
        refreshTodos();
    }
});





/* ---------- 2. Todo App ---------- */

function refreshTodos() {
    renderTodoList(todoList);
}



