import './listaconsultas.css'

// Converte "AAAA-MM-DD" para "DD-MM-AAAA", mais familiar
function formatarDataBr(data) {
    // Reorganiza a data para o formato usado no Brasil.
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
}

export default function ListaConsultas({ agendamentos, onCancelar }) {
    // Cria uma cópia para ordenar sem alterar a lista original.
    const ordenados = [...agendamentos].sort((a, b) =>
        `${a.data}${a.horario}`.localeCompare(`${b.data}${b.horario}`)
    )

    // Exibe uma mensagem quando ainda não há consultas.
    if (ordenados.length === 0) {
        return <p className="lista-vazia">Nenhuma consulta agendada ainda.</p>
    }

    return (
        <ul className="lista-consultas">
            {ordenados.map((agendamento) => (
                <li key={agendamento.id}>
                    <div>
                        {/* Mostra os dados principais e a observação, se houver. */}
                        <strong>{agendamento.paciente}</strong>
                        <span>{formatarDataBr(agendamento.data)} às {agendamento.horario} · {agendamento.duracao} min</span>
                        {agendamento.observacao && <p>{agendamento.observacao}</p>}
                    </div>
                    {/* Solicita o cancelamento da consulta selecionada. */}
                    <button
                        type="button"
                        className="perigo"
                        onClick={() => onCancelar(agendamento.id)}
                    >
                        Cancelar
                    </button>
                </li>
            ))}
        </ul>
    )
}
