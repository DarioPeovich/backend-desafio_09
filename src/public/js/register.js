const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch("/api/sessions/register", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(result => result.json())
    .then(json => {
        // Verificar si la respuesta indica éxito
        if (json.status === "success") {
            // Mostrar SweetAlert de éxito
            Swal.fire({
                title: "Success!",
                text: "Registro exitoso.",
                icon: "success",
            });

            // Puedes redirigir a otra página si es necesario
            // window.location.href = "/success-page";
        } else {
            // Si hay errores, puedes manejarlos aquí o simplemente mostrar una alerta
            console.error("Registration failed:", json.error);
            Swal.fire({
                title: "Error!",
                text: "Registracion fallido. Por favor vuelva a intentarlo.",
                icon: "error",
            });
        }
    })
    .catch(error => {
        // Manejar errores de red o de la solicitud
        console.error("Fetch error:", error);
        Swal.fire({
            title: "Error!",
            text: "Un error a ocurrido. Vuelva a intentar.",
            icon: "error",
        });
    });
});

//.then(result=>result.json()).then(json => console.log(json))