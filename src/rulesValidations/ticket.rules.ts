import Validator from 'validatorjs'

Validator.register('differentOfZeroOrNull', (value, requirement, attribute) => {
  return Number(value) !== 0 && value !== null
})

const ticketRules: object = {
  priorityId: 'required|differentOfZeroOrNull',
  description: 'required',
}

const ticketMessages: object = {
  'required.priorityId': 'Debes seleccionar una prioridad para el ticket 1',
  'differentOfZeroOrNull.priorityId': 'Debes seleccionar una prioridad para el ticket 2',
  'required.description': 'El campo descripción es obligatorio',
}

export { ticketRules, ticketMessages }
