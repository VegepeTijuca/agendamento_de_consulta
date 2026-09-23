import { useState } from 'react'
import { Calendario, FormularioAgendamento, ListaConsultas, DetalhesAgendamento, CancelarAgendamento } from '../components'
import { useAgendamentos } from '../hooks/hooks'

export default function AgendamentoPage() {
    const { agendamentos, adicionarAgendamento, removerAgendamento } = useAgendamentos()

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [valoresIniciais, setValoresIniciais] = useState({})
    const [idSelecionado, setIdSelecionado] = useState(null)
    const [idParaCancelar, setIdParaCancelar] = useState(null)

    const agendamentoSelecionado = agendamentos.find((a) => a.id === idSelecionado)
    const agendamentoParaCancelar = agendamentos.find((a) => a.id === idParaCancelar)

    function confirmarCancelamento(id) {
        removerAgendamento(id)
        // Se o agendamento cancelado estava aberto nos detalhes, fecha também
        setIdSelecionado((atual) => (atual === id ? null : atual))
    }

    function abrirFormularioComData(dataStr) {
        const [data, horario] = dataStr.split('T')
        setValoresIniciais({ data, horario: horario ? horario.slice(0, 5) : '' })
        setMostrarFormulario(true)
    }

    function salvarAgendamento(novoAgendamento) {
        adicionarAgendamento(novoAgendamento)
        setMostrarFormulario(false)
    }

    return (
        <div className="pagina-agendamento">
            <header className="cabecalho">
                <h1>Agendamento de Consultas</h1>
                <button
                    type="button"
                    className="botao-nova-consulta"
                    onClick={() => { setValoresIniciais({}); setMostrarFormulario(true) }}
                >
                    + Nova consulta
                </button>
            </header>

            <div className="conteudo">
                <main className="area-calendario">
                    <Calendario
                        agendamentos={agendamentos}
                        onSlotClick={abrirFormularioComData}
                        onSlotOcupado={() => alert('Esse horário já está ocupado. Escolha outro.')}
                        onEventoClick={setIdSelecionado}
                    />
                </main>

                <aside className="painel-lateral">
                    {mostrarFormulario ? (
                        <FormularioAgendamento
                            agendamentos={agendamentos}
                            valoresIniciais={valoresIniciais}
                            onSalvar={salvarAgendamento}
                            onCancelar={() => setMostrarFormulario(false)}
                        />
                    ) : (
                        <>
                            <h2>Próximas consultas</h2>
                            <ListaConsultas agendamentos={agendamentos} onCancelar={setIdParaCancelar} />
                        </>
                    )}
                </aside>
            </div>

            <DetalhesAgendamento
                agendamento={agendamentoSelecionado}
                onCancelar={setIdParaCancelar}
                onFechar={() => setIdSelecionado(null)}
            />

            <CancelarAgendamento
                agendamento={agendamentoParaCancelar}
                onConfirmar={confirmarCancelamento}
                onFechar={() => setIdParaCancelar(null)}
            />
        </div>
    )
}
