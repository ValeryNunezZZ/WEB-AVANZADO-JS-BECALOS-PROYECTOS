document.getElementById('registroEvento').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío automático del formulario

    // Variables
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    const horario = document.querySelector('input[name="horario"]:checked');
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    // Validaciones básicas
    if (!nombre || !correo || !telefono || intereses.length === 0 || !horario) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    const expresionRegTel = /55\d{8}/;
    const expresionRegMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const expresionRegUsuario = /^(?!.*[._]{2})(?![._])[a-zA-Z0-9._]{3,16}(?<![._])$/;

    if(!expresionRegTel.test(telefono)){
        alert('Teléfono inválido, por favor ingrese un teléfono válido.');
    }

    if(!expresionRegMail.test(correo)){
        alert('Correo inválido, por favor ingrese un teléfono válido.');
    }

    if(!expresionRegUsuario.test(nombre)){
        alert('Nombre de usuario inválido, por favor ingrese un teléfono válido.');
    }
    
    // Si todo está bien
    alert('Registro exitoso. ¡Gracias por registrarte!');
});