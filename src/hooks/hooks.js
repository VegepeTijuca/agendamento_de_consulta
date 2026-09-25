import { useCallback, useState } from 'react'
import { getAgendamentos, saveAgendamentos } from '../utils/storage'

export function useAgendamentos() {
    // Mantém os agendamentos em estado e carrega os dados salvos inicialmente.
    const [agendamentos, setAgendamentos] = useState(() => getAgendamentos())

    // Adiciona um agendamento e atualiza o armazenamento local.
    const adicionarAgendamento = useCallback((novoAgendamento) => {
        setAgendamentos((atuais) => {
            const atualizados = [...atuais, novoAgendamento]
            saveAgendamentos(atualizados)
            return atualizados
        })
    }, [])

    // Remove o agendamento que corresponde ao identificador informado.
    const removerAgendamento = useCallback((id) => {
        setAgendamentos((atuais) => {
            const atualizados = atuais.filter((agendamento) => agendamento.id !== id)
            saveAgendamentos(atualizados)
            return atualizados
        })
    }, [])

    // Expõe os dados e as funções para os componentes que usam este hook.
    return { agendamentos, adicionarAgendamento, removerAgendamento }
}
