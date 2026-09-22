// Funções de persistência (Passo 3): leem e gravam os agendamentos no localStorage,
// sob a chave 'agendamentos', no formato descrito no PDF do projeto.

export function getAgendamentos() {
    const dados = localStorage.getItem('agendamentos')
    return dados ? JSON.parse(dados) : []
}

export function saveAgendamentos(agendamentos) {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
}
