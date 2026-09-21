export function getAgendamentos() {
const data = localStorage.getItem('agendamentos');
return data ? JSON.parse(data) : [];
}

export function saveAgendamentos(agendamentos) {
localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}