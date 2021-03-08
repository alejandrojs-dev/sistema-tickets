const ticketStatusRules: object = {
  status: 'required|string',
  active: 'required|boolean',
}

const ticketStatusMessages: object = {
  'required.status': 'El campo status es obligatorio',
  'string.status': 'El campo status debe ser una cadena',
  'boolean.active': 'El campo activo debe ser un valor booleano',
  'required.active': 'El campo activo es obligatorio',
}

export { ticketStatusRules, ticketStatusMessages }
