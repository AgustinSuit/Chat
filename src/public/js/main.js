// Creamos una instancia de socket.io desde el lado del cliente ahora:

const socket = io();

// Creamos una variable para guardar al usuario.
let user;
const chatBox = document.getElementById("chatBox");

// Utilizamos SweetAlert para el mensaje de Bienvenida.

// Swal es un objeto global que nos permite usar los métodos de la librería.
// Fire es un método que nos permite configurar el alerta.

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresá un usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "necesitás escribir un nombre para continuar";
    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value;
})

chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            // Trim nos permite sacar los espacios en blanco del principio y del final de un String.
            // Si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor.
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
})

// Listener de mensajes:

socket.on("mesaggesLogs", data => {
    const log = document.getElementById("mesaggesLogs");
    let messages = "";

    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}<br>`
    })
    log.innerHTML = messages
})
