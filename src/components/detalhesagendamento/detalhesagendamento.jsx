import './detalhesagendamento.css'

export default function DetalhesAgendamento({ agendamento, onCancelar, onFechar }) {
    if (!agendamento) return null

    return (
        <div className="modal-fundo" onClick={onFechar}>
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <h2>Detalhes do agendamento</h2>
                <p><strong>Paciente:</strong> {agendamento.paciente}</p>
                <p><strong>E-mail:</strong> {agendamento.email}</p>
                <p><strong>Data:</strong> {agendamento.data}</p>
                <p><strong>Horário:</strong> {agendamento.horario}</p>
                <p><strong>Duração:</strong> {agendamento.duracao} minutos</p>
                {agendamento.observacao && <p><strong>Observação:</strong> {agendamento.observacao}</p>}

                <div className="acoes-formulario">
                    <button
                        type="button"
                        className="perigo"
                        onClick={() => {
                            if (confirm(`Cancelar a consulta de ${agendamento.paciente}?`)) {
                                onCancelar(agendamento.id)
                                onFechar()
                            }
                        }}
                    >
                        Cancelar consulta
                    </button>
                    <button type="button" className="secundario" onClick={onFechar}>Fechar</button>
                </div>
            </div>
        </div>
    )
}
