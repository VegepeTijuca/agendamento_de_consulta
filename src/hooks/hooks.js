import { useCallback, useState } from 'react'
import { getAgendamentos, saveAgendamentos } from '../utils/storage'

// Hook que guarda os agendamentos em memória e mantém o localStorage sincronizado (Passo 3)
export function useAgendamentos() {
    // Lê o localStorage já na primeira renderização, sem precisar de useEffect
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
