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