<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
    exit;
}

// 1. Verificación Honeypot Anti-Spam
if (!empty($_POST['b_honeypot'])) {
    echo json_encode(['status' => 'success', 'message' => 'Mensaje procesado.']);
    exit;
}

// 2. Sanitización y Captura de Datos
$nombre   = isset($_POST['nombre']) ? trim(strip_tags($_POST['nombre'])) : '';
$empresa  = isset($_POST['empresa']) ? trim(strip_tags($_POST['empresa'])) : '';
$correo   = isset($_POST['correo']) ? filter_var(trim($_POST['correo']), FILTER_SANITIZE_EMAIL) : '';
$telefono = isset($_POST['telefono']) ? trim(strip_tags($_POST['telefono'])) : '';
$servicio = isset($_POST['servicio']) ? trim(strip_tags($_POST['servicio'])) : '';
$mensaje  = isset($_POST['mensaje']) ? trim(strip_tags($_POST['mensaje'])) : '';

// 3. Validación de Campos Obligatorios
if (empty($nombre) || empty($empresa) || empty($correo) || !filter_var($correo, FILTER_VALIDATE_EMAIL) || empty($telefono) || empty($servicio) || empty($mensaje)) {
    echo json_encode(['status' => 'error', 'message' => 'Por favor completa todos los campos requeridos adecuadamente.']);
    exit;
}

// 4. Configuración del Correo
$to      = 'fov.cruz@gmail.com';
$subject = "Nueva Cotización Kronodata: {$empresa} - {$nombre}";

$email_content  = "Has recibido una nueva solicitud de cotización desde el sitio web Kronodata:\n\n";
$email_content .= "Nombre: {$nombre}\n";
$email_content .= "Empresa: {$empresa}\n";
$email_content .= "Correo: {$correo}\n";
$email_content .= "Teléfono/WhatsApp: {$telefono}\n";
$email_content .= "Servicio Requerido: {$servicio}\n\n";
$email_content .= "Mensaje:\n{$mensaje}\n\n";
$email_content .= "---\nEste mensaje fue enviado desde el formulario de contacto de Kronodata.";

$headers  = "From: Kronodata Web <no-reply@" . $_SERVER['SERVER_NAME'] . ">\r\n";
$headers .= "Reply-To: {$nombre} <{$correo}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 5. Envío
if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Correo enviado correctamente.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Ocurrió un error al enviar el correo. Por favor intenta más tarde.']);
}