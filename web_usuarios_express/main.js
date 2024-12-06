$(function() {
    // Mostrar todos los usuarios por defecto
    $.ajax({
        url: "http://localhost:5000/users",
        type: "GET",
        success: function(result){
            $(".content").empty();
            for(let eachCard of result){
                $(".content").append(`
                    <div class="card"> 
                        <p class="userid">Usuario ${eachCard.id}</p> 
                        <p class="usernameandsurname">${eachCard.name} ${eachCard.apellido}</p> 
                        <p class="userphone">${eachCard.tlf}</p> 
                    </div>
                `);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", status, error);
            $(".content").empty();
            $(".content").append("<p>Hubo un error al obtener los datos.</p>");
        },
    })

    // Mostrar todos los usuarios
    $("#showall").click(() => {
        $.ajax({
            url: "http://localhost:5000/users",
            type: "GET",
            success: function(result){
                $(".content").empty();
                for(let eachCard of result){
                    $(".content").append(`
                        <div class="card"> 
                            <p class="userid">Usuario ${eachCard.id}</p> 
                            <p class="usernameandsurname">${eachCard.name} ${eachCard.apellido}</p> 
                            <p class="userphone">${eachCard.tlf}</p> 
                        </div>
                    `);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
                $(".content").empty();
                $(".content").append("<p>Hubo un error al obtener los datos.</p>");
            },
        })
    });

    // Buscar usuario por ID
    $("#searchuser").click(() => {
        let userId = $("#searchbar").val();
        let userFound;

        $.ajax({
            url: `http://localhost:5000/users/${userId}`,
            type: "GET",
            success: function(result){
                userFound = result
                $(".content").empty();
                $(".content").append(`
                    <div class="card"> 
                        <p class="userid">Usuario ${userFound.id}</p> 
                        <p class="usernameandsurname">${userFound.name} ${userFound.apellido}</p> 
                        <p class="userphone">${userFound.tlf}</p> 
                    </div>
                `);
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
                $(".content").empty();
                $(".content").append("<p>Hubo un error al obtener los datos.</p>");
            },
        })
    });

    // Mostrar el modal
    $("#adduser").click(() => {
        $("#modal").removeClass("hidden");
    });

    // Cerrar el modal
    $("#closemodal").click(() => {
        $("#modal").addClass("hidden");
    });

    // Guardar un nuevo usuario
    $("#saveuser").click(() => {
        let name = $("#name").val();
        let surname = $("#surname").val();
        let phone = $("#phone").val();

        if (name && surname && phone) {
            // Enviar los datos al servidor
            $.ajax({
                url: "http://localhost:5000/users",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ name: name, apellido: surname, tlf: phone }),
                success: function () {
                    alert("Usuario agregado exitosamente");
                    $("#modal").addClass("hidden"); // Cerrar modal
                    $("#name").val(""); // Limpiar campos
                    $("#surname").val("");
                    $("#phone").val("");
                    location.reload();
                },
                error: function (xhr, status, error) {
                    console.error("Error al agregar usuario:", status, error);
                    alert("Hubo un problema al agregar el usuario.");
                },
            });
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
})