import axios from 'axios'
/* Este MODULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */
const BASE_URL_API = "http://localhost:3005/api";


export const getTodos = async () => {

    try {
        const todos = await axios.get(`${BASE_URL_API}/todos`)
        console.log("llamada axios", todos)
        return todos.data;
    } catch (err) {
        console.log("Error al obtener los TODOs:", err);
        return []
    }
}

/* export const todos = getTodos() */
//todos();
/* console.log(todos) */

/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
export async function addTodo(item) {
    //const todos = getTodos()

    /* todos.push({ ...item, done: false });
    persist(); */
    try {
        const response = await axios.post(`${BASE_URL_API}/todos`, { ...item, done: 0 })
        return response.data;
    } catch (err) {
        console.log("Error al crear el TODO :", err);
        return {}
    }
}

export async function toggleDone(id){
    try {
        const response = await axios.put(`${BASE_URL_API}/todos`, { id });
        return response.data;
    } catch (err) {
        console.log("Error al hacer toggle:", err);
        return {};
    }
}


export async function removeTodo(id) {
    //const todos = getTodos()
    //todos.splice(index, 1);
    //persist();
    try{
        //const response = await axios.delete(`${BASE_URL_API}/todos`, {id});

        const response = await axios.delete(`${BASE_URL_API}/todos`, {
            data: { id } 
        });
        return response.data;
    }catch(err){
        console.log("Error al crear el TODO :", err);
        return {}
    }
}

/* function persist() {
    localStorage.setItem("todos", JSON.stringify(todos));
} */


//LOS QUE YO ESTOY CREANDO

export async function registrarUsuario(userData) {
    try {
        const response = await axios.post(`${BASE_URL_API}/user/register`, userData)
        return response.data;
    } catch (err) {
        console.log("Error al crear al registrar Usuario :", err);
        return {}
    }
}


export const loggearUsuario = async (userData) => {

    try {
        const res = await axios.post(`${BASE_URL_API}/user/login`, userData)
        console.log("llamada axios", res)
        return res.data;
    } catch (err) {
        console.log("Error al obtener los TODOs:", err);
        return []
    }
}