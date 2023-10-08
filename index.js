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

// Se Agrega un evento para cerrar la barra lateral cuando se hace clic en la página principal
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
// Se crea una función para cargar la información de la API y mostrarla

async function loadClassInfo(className) {
    try {
        const response = await axios.get(`https://www.dnd5eapi.co/api/classes/${className}`);

        const classData = response.data;
        
        console.log(classData)

        // Actualizamos la sección principal con la información de la clase
        const classInfoContainer = document.querySelector(".class-info");
        classInfoContainer.innerHTML = `
            <h1>${classData.name}</h1>
            <h2>Descripción:</h2>
            <p>Hit die: 1d${classData.hit_die}</p>
            <p>Skills: ${classData.proficiency_choices[0].desc}</p>
            <!-- Agrega más información de la API aquí según tus necesidades -->
        `;
    } catch (error) {
        console.error("Error al cargar la información de la clase:", error);
    }
}

// Agregremos eventos de clic a los enlaces de la barra lateral
const classLinks = document.querySelectorAll(".sidebar a");
classLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const className = this.textContent.toLowerCase();
        loadClassInfo(className);
    });
});