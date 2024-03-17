export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+}{:;<>,.?\-|]{8,}$/;

export const nameRegex = /^[\wáéíóúÁÉÍÓÚñÑ\s,']+$/u;

export const phoneRegex = /^\d{10}$/;

export const nitRegex = /^\d{7,10}$/;

export const notEmptyRegex = /\S+/;

export const numberRegex = /^(?!0+$)\d+$/;

export const cardCodeRegex = /^[a-zA-Z0-9]+$/;

export const measurementRegex = /^(?!0+$)(?!0[0-9]+)([1-9][0-9]*(\.[0-9]+)?|0\.[0-9]*[1-9][0-9]*)$/;
