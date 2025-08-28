import getLogger from "./logger.utils.js";

const log = getLogger();

export const registrationFormatter = (registration) => {
  try {
    if (typeof registration !== "string") {
      throw new Error("La patente debe ser un string");
    }
    const reg = registration.replace(/\s+/g, "");
    // Formato 1: XX111XX
    const formato1 = /^([A-Z]{2})(\d{3})([A-Z]{2})$/;
    // Formato 2: XXX111
    const formato2 = /^([A-Z]{3})(\d{3})$/;
    // Formato 3: X111XXX
    const formato3 = /^([A-Z]{1})(\d{3})([A-Z]{3})$/;

    if (formato1.test(reg)) {
      const [, l1, n, l2] = reg.match(formato1);
      return `${l1} ${n} ${l2}`.toUpperCase();
    }
    if (formato2.test(reg)) {
      const [, l, n] = reg.match(formato2);
      return `${l} ${n}`.toUpperCase();
    }
    if (formato3.test(reg)) {
      const [, l, n, l2] = reg.match(formato3);
      return `${l} ${n} ${l2}`.toUpperCase();
    }
  } catch (error) {
    log.error("Error formatting registration: ", error.message);
    // Si el formato es inválido, lanza un error
    throw new Error(
      "Formato de patente inválido. Debe ser 'XX111XX', 'XXX111' o 'X111XXX'"
    );
  }
};
