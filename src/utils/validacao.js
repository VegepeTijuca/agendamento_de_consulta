export const HORARIO_INICIO_MIN = 8 * 60 // 08:00
export const HORARIO_FIM_MIN = 18 * 60 // 18:00

// Converte "HH:MM" em minutos desde meia-noite
export function paraMinutos(horario) {
    const [horas, minutos] = horario.split(':').map(Number)
    return horas * 60 + minutos
}

// Validação simples de formato: algo@algo.algo
export function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Verifica se um horário (com duração) está dentro do expediente e alinhado aos slots de 30min
export function horarioValido(horario, duracao) {
    const inicio = paraMinutos(horario)
    const fim = inicio + Number(duracao)
    return inicio >= HORARIO_INICIO_MIN && fim <= HORARIO_FIM_MIN && inicio % 30 === 0
}

// Verifica se o novo agendamento colide com algum já existente no mesmo dia
export function temConflito(agendamentos, novo, excluirId = null) {
    const inicio = paraMinutos(novo.horario)
    const fim = inicio + Number(novo.duracao)

    return agendamentos.some((agendamento) => {
        if (agendamento.id === excluirId) return false
        if (agendamento.data !== novo.data) return false

        const outroInicio = paraMinutos(agendamento.horario)
        const outroFim = outroInicio + Number(agendamento.duracao)
        return inicio < outroFim && fim > outroInicio
    })
}
