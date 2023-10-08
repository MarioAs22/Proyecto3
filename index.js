function openSidebar() {
    var sidebar = document.getElementById("mySidebar");
    var content = document.querySelector(".content");
    
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
        content.style.marginLeft = "0";
    } else {
        sidebar.style.left = "0px";
        content.style.marginLeft = "250px"; // Ajusta el valor para el ancho de la barra lateral
    }
}

// Agrega un evento para cerrar la barra lateral cuando se hace clic en la página principal
var content = document.querySelector(".content");
content.addEventListener("click", function() {
    var sidebar = document.getElementById("mySidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
        content.style.marginLeft = "0";
    }
});
function toggleSidebar() {
    var sidebar = document.getElementById("mySidebar");
    var content = document.querySelector(".content");
    var openButton = document.querySelector(".open-btn");
    
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
        content.style.marginLeft = "0";
        content.style.width = "100%"; // Restablece el ancho del contenido principal
        openButton.style.left = "10px";
    } else {
        sidebar.style.left = "0px";
        content.style.marginLeft = "250px";
        content.style.width = "calc(100% - 250px)"; // Ajusta el ancho del contenido principal
        openButton.style.left = "260px";
    }
}
// Función para cargar la información de la API y mostrarla
async function loadClassInfo(className) {
    try {
        const response = await axios.get(`https://www.dnd5eapi.co/docs/#get-/api/classes/${className}`);
        const classData = response.data;

        // Actualiza la sección principal con la información de la clase
        const classInfoContainer = document.querySelector(".class-info");
        classInfoContainer.innerHTML = `
            <h1>${classData.name}</h1>
            <h2>Descripción:</h2>
            <p>${classData.desc}</p>
            <!-- Agrega más información de la API aquí según tus necesidades -->
        `;
    } catch (error) {
        console.error("Error al cargar la información de la clase:", error);
    }
}

// Agrega eventos de clic a los enlaces de la barra lateral
const classLinks = document.querySelectorAll(".sidebar a");
classLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const className = this.textContent.toLowerCase();
        loadClassInfo(className);
    });
});