import { useCallback, useState } from 'react'
import { getAgendamentos, saveAgendamentos } from '../utils/storage'

export function useAgendamentos() {
    const [agendamentos, setAgendamentos] = useState(() => getAgendamentos())

    const adicionarAgendamento = useCallback((novoAgendamento) => {
        setAgendamentos((atuais) => {
            const atualizados = [...atuais, novoAgendamento]
            saveAgendamentos(atualizados)
            return atualizados
        })
    }, [])

    const removerAgendamento = useCallback((id) => {
        setAgendamentos((atuais) => {
            const atualizados = atuais.filter((agendamento) => agendamento.id !== id)
            saveAgendamentos(atualizados)
            return atualizados
        })
    }, [])

    return { agendamentos, adicionarAgendamento, removerAgendamento }
}
