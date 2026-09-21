import { useCallback, useEffect, useState } from 'react'
import { getAgendamentos, saveAgendamentos } from '../utils/storage'

// Hook que guarda os agendamentos em memória e mantém o localStorage sincronizado
export function useAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([])

    // Carrega os dados salvos assim que o app abre
    useEffect(() => {
        setAgendamentos(getAgendamentos())
    }, [])

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
