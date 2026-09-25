import './cancelaragendamento.css'

// Converte a data para o formato usado no Brasil.
function formatarDataBr(data) {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
}

export default function CancelarAgendamento({ agendamento, onConfirmar, onFechar }) {
    // Não renderiza o modal quando não há agendamento selecionado.
    if (!agendamento) return null

    return (
        // Clicar no fundo fecha o modal.
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
                            // Confirma o cancelamento e fecha o modal.
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
