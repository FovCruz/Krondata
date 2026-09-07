/**
 * KRONDATA - Integración EmailJS y Modal Glassmorphism
 * Destino del correo: qt.krondata@gmail.com
 */

(function () {
    // 1. Inicialización de EmailJS con la clave pública
    // Reemplaza 'TU_PUBLIC_KEY' con tu clave obtenida en emailjs.com
    emailjs.init("VnP3aYx8yW6U-_DRO");

    document.addEventListener("DOMContentLoaded", function () {
        const contactForm = document.getElementById("contactForm");
        const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

        // Elementos del Modal Unificado Glassmorphism
        const popupOverlay = document.getElementById("unifiedPopupOverlay");
        const popupContainer = document.getElementById("popupContentContainer");
        const popupCloseBtn = document.getElementById("popupClose");

        if (!contactForm) return;

        // Limpiar errores visuales al escribir
        const inputs = contactForm.querySelectorAll("input, select, textarea");
        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                const formGroup = input.closest(".form-group");
                if (formGroup) formGroup.classList.remove("error");
            });
        });

        // Event listener principal del submit
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Verificación Honeypot anti-spam
            const honeypot = contactForm.querySelector('input[name="b_honeypot"]');
            if (honeypot && honeypot.value !== "") {
                return false;
            }

            // Validación manual de campos requeridos
            let hasError = false;
            const requiredInputs = contactForm.querySelectorAll("[required]");

            requiredInputs.forEach((input) => {
                const formGroup = input.closest(".form-group");
                if (!input.value.trim()) {
                    if (formGroup) formGroup.classList.add("error");
                    hasError = true;
                } else if (input.type === "email" && !validateEmail(input.value)) {
                    if (formGroup) formGroup.classList.add("error");
                    hasError = true;
                } else {
                    if (formGroup) formGroup.classList.remove("error");
                }
            });

            if (hasError) return;

            // Bloquear botón durante el envío
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando mensaje...";

            // Parámetros a enviar en el Email (coinciden con la plantilla de EmailJS)
            // Asegúrate de configurar en tu template EmailJS que llegue a: contacto@krondata.cl
            const templateParams = {
                nombre: document.getElementById("nombre").value.trim(),
                empresa: document.getElementById("empresa").value.trim(),
                correo: document.getElementById("correo").value.trim(),
                telefono: document.getElementById("telefono").value.trim(),
                servicio: document.getElementById("servicio").value,
                mensaje: document.getElementById("mensaje").value.trim(),
                to_email: "qt.krondata@gmail.com" // Destino del correo
            };

            // Reemplaza 'YOUR_SERVICE_ID' y 'YOUR_TEMPLATE_ID' con tus credenciales de EmailJS
            emailjs.send("service_b1xyqge", "template_ej70wjl", templateParams)
                .then(function (response) {
                    // Éxito en el envío
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;

                    // Desplegar Modal Glassmorphism de éxito
                    showSuccessGlassmodal();
                })
                .catch(function (error) {
                    console.error("Error al enviar el mensaje por EmailJS:", error);
                    alert("Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp.");
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });

        // Función para renderizar el Popup Glassmorphism de Éxito
        function showSuccessGlassmodal() {
            if (!popupOverlay || !popupContainer) return;

            popupContainer.innerHTML = `
                <div class="popup-icon-wrapper">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span class="popup-tag">Solicitud Recepcionada</span>
                <h3>¡Mensaje Enviado con Éxito!</h3>
                <p>Hemos recibido tus datos correctamente. Nuestro equipo revisará la información de tu proyecto y se contactará contigo a la brevedad.</p>
                <button type="button" class="btn btn-primary w-100" id="closeSuccessModalBtn">Entendido</button>
            `;

            popupOverlay.classList.add("active");
            popupOverlay.setAttribute("aria-hidden", "false");

            const closeBtn = document.getElementById("closeSuccessModalBtn");
            if (closeBtn) {
                closeBtn.addEventListener("click", hideGlassmodal);
            }
        }

        // Cierre de Modal
        function hideGlassmodal() {
            if (popupOverlay) {
                popupOverlay.classList.remove("active");
                popupOverlay.setAttribute("aria-hidden", "true");
            }
        }

        if (popupCloseBtn) {
            popupCloseBtn.addEventListener("click", hideGlassmodal);
        }

        if (popupOverlay) {
            popupOverlay.addEventListener("click", function (e) {
                if (e.target === popupOverlay) {
                    hideGlassmodal();
                }
            });
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    });
})();