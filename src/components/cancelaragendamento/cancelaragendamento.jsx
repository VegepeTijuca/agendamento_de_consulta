import './cancelaragendamento.css'

// Converte "AAAA-MM-DD" para "DD/MM/AAAA", mais familiar
function formatarDataBr(data) {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
}

export default function CancelarAgendamento({ agendamento, onConfirmar, onFechar }) {
    if (!agendamento) return null

    return (
        <div className="modal-fundo" onClick={onFechar}>
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <h2>Cancelar consulta</h2>
                <p>
                    Tem certeza que deseja cancelar a consulta de{' '}
                    <strong>{agendamento.paciente}</strong>, marcada para{' '}
                    <strong>{formatarDataBr(agendamento.data)}</strong> às{' '}
                    <strong>{agendamento.horario}</strong>?
                </p>
                <p className="aviso-cancelamento">Essa ação não pode ser desfeita.</p>

                <div className="acoes-formulario">
                    <button
                        type="button"
                        className="perigo"
                        onClick={() => {
                            onConfirmar(agendamento.id)
                            onFechar()
                        }}
                    >
                        Sim, cancelar
                    </button>
                    <button type="button" className="secundario" onClick={onFechar}>
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    )
}
