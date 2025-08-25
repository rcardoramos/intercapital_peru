// script para validar o manejar el formulario de inversionista
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("investor-form");
    const submitButton = document.getElementById("submit-investor");

    if (!form) return; // Evita errores si el formulario no existe

    form.addEventListener("submit", function (e) {
        // Validación básica (puedes mejorarla si deseas)
        const nombre = document.getElementById("nombre_inver").value.trim();
        const celular = document.getElementById("celular_inver").value.trim();
        const monto = document.getElementById("monto_inver").value.trim();
        const opcion = document.getElementById("opcion_inver").value;

        if (!nombre || !celular || !monto || !opcion) {
            e.preventDefault(); // Evita el envío
            alert("Por favor completa todos los campos antes de enviar.");
            return;
        }

        // Desactiva el botón para evitar envíos múltiples
        submitButton.disabled = true;
        submitButton.innerText = "Enviando...";
    });
});
