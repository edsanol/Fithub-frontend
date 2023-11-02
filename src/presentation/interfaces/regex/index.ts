export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+}{:;<>,.?\-|]{8,}$/;

export const nameRegex = /^[A-Za-z\s']+$/;

export const phoneRegex = /^\d{10}$/;

export const nitRegex = /^\d{7,10}$/;

export const notEmptyRegex = /\S+/;
