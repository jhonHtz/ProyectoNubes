const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'al062075@uacam.mx', // Tu correo Gmail
    pass: 'manb btkz cane jqfg' // Contraseña de la aplicación (no la contraseña normal)
  }
});

// Endpoint para manejar el formulario
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Configura el correo electrónico
  const mailOptions = {
    from: email,
    to: 'al062075@uacam.mx', // A dónde llegará el correo
    subject: `Nuevo mensaje de ${name}`,
    text: `Has recibido un mensaje de ${name} (${email}):\n\n${message}`
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado exitosamente');
    }
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
