const ticketSubGroupRules: object = {
  ticketGroupId: 'required',
  ticketTypeId: 'required',
  name: 'required',
  serviceLevel: 'required|integer',
  numberAuth: 'required|integer',
}

const ticketSubGroupMessages: object = {
  'required.ticketGroupId': 'Seleccione un grupo de ticket',
  'required.ticketTypeId': 'Seleccione un tipo de ticket',
  'required.name': 'El nombre del subgrupo es obligatorio',
  'required.serviceLevel': 'El campo service level es obligatorio',
  'integer.serviceLevel': 'El campo service level debe ser un campo entero',
  'required.numberAuth': 'El campo nùmero de autorizaciones es obligatorio',
  'integer.numberAuth': 'El campo número de autorizaciones debe ser un campo entero',
}

export { ticketSubGroupRules, ticketSubGroupMessages }
