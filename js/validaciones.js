export function valida(input) {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "El campo de fecha de nacimiento no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "El campo número no puede estar vacío",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
  },
  direccion: {
    valueMissing: "El campo dirección no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 1 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "El campo ciudad no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 1 a 40 caracteres",
  },
  estado: {
    valueMissing: "El campo estado no puede estar vacío",
    patternMismatch: "El estado debe contener entre 1 a 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input) {
  let mensaje = " ";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      //   console.log(tipoInput);
      //   console.log(error);
      mensaje = mensajesDeError[tipoInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  mayorDeEdad(fechaCliente);
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}

// Función que compara la fecha de nacimiento del usuario (sumando al año 18 años)
function mayorDeEdad(fecha) {
  const fechaActual = new Date();

  // Si la fecha del usuario sumado con 18 años más
  // es menor o igual que la fecha actual,
  // tiene más de 18 años,
  // sino es menor de edad
  //
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
