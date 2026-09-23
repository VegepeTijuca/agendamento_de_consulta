export function getAgendamentos() {
    const dados = localStorage.getItem('agendamentos')
    return dados ? JSON.parse(dados) : []
}

export function saveAgendamentos(agendamentos) {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
}
