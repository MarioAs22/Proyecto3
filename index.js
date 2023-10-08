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
        const response = await axios.get(`https://www.dnd5eapi.co/api/classes/${className}`);
        const response2 = await axios.get(`https://www.dnd5eapi.co/api/classes/${className}/levels`);

        const classData = response.data;
        const classLvl = response2.data;
        
        console.log(classLvl)
        

        const levels = classLvl.map((level) => level.level);
        const levelNames = classLvl.map((level) => level.name);

        // Configura los datos para el gráfico
        const chartData = {
            labels: levelNames,
            datasets: [{
                label: `Niveles de ${className}`,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: levels,
                }]
            }
        
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };

        // Crea el gráfico en el elemento canvas
        const ctx = document.getElementById('classLevelsChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
        });
        

        // Actualiza la sección principal con la información de la clase
        const classInfoContainer = document.querySelector(".class-info");
        classInfoContainer.innerHTML = `
            <h1>${classData.name}</h1>
            <h2>Descripción:</h2>
            <p>Hit die: 1d${classData.hit_die}</p>
            <p>Skills: ${classData.proficiency_choices[0].desc}</p>
            <p>${classLvl.data  }</p>
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
    