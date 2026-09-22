import './listaconsultas.css'

// Converte "AAAA-MM-DD" para "DD/MM/AAAA", formato mais familiar para o usuário
function formatarDataBr(data) {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
}

// Lista lateral de consultas confirmadas (Passo 8), ordenadas por data e horário
export default function ListaConsultas({ agendamentos, onCancelar }) {
    const ordenados = [...agendamentos].sort((a, b) =>
        `${a.data}${a.horario}`.localeCompare(`${b.data}${b.horario}`)
    )

    if (ordenados.length === 0) {
        return <p className="lista-vazia">Nenhuma consulta agendada ainda.</p>
    }

    return (
        <ul className="lista-consultas">
            {ordenados.map((agendamento) => (
                <li key={agendamento.id}>
                    <div>
                        <strong>{agendamento.paciente}</strong>
                        <span>{formatarDataBr(agendamento.data)} às {agendamento.horario} · {agendamento.duracao} min</span>
                        {agendamento.observacao && <p>{agendamento.observacao}</p>}
                    </div>
                    <button
                        type="button"
                        className="perigo"
                        onClick={() => {
                            // Passo 8: pede confirmação antes de remover o agendamento
                            if (confirm(`Cancelar a consulta de ${agendamento.paciente}?`)) {
                                onCancelar(agendamento.id)
                            }
                        }}
                    >
                        Cancelar
                    </button>
                </li>
            ))}
        </ul>
    )
}
