const ticketTypesRules: object = {
  type: 'required|string',
  active: 'required|boolean',
}

const ticketTypesMessages: object = {
  'required.type': 'El campo tipo es obligatorio',
  'string.type': 'El campo tipo debe ser una cadena',
  'boolean.active': 'El campo activo debe ser un valor booleano',
  'required.active': 'El campo activo es obligatorio',
}

export { ticketTypesRules, ticketTypesMessages }
