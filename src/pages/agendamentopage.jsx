import { useState } from 'react'
import { Calendario, FormularioAgendamento, ListaConsultas, DetalhesAgendamento, CancelarAgendamento, AgendamentoInvalido } from '../components'
import { useAgendamentos } from '../hooks/hooks'

export default function AgendamentoPage() {
    // Centraliza a lista de consultas e as ações de adicionar/remover.
    const { agendamentos, adicionarAgendamento, removerAgendamento } = useAgendamentos()

    // Controla o formulário, a consulta selecionada e o cancelamento aberto.
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [valoresIniciais, setValoresIniciais] = useState({})
    const [idSelecionado, setIdSelecionado] = useState(null)
    const [idParaCancelar, setIdParaCancelar] = useState(null)
    const [mostrarAgendamentoInvalido, setMostrarAgendamentoInvalido] = useState(false)

    const agendamentoSelecionado = agendamentos.find((a) => a.id === idSelecionado)
    const agendamentoParaCancelar = agendamentos.find((a) => a.id === idParaCancelar)

    function confirmarCancelamento(id) {
        removerAgendamento(id)
        // Fecha os detalhes caso a consulta cancelada estivesse selecionada.
        setIdSelecionado((atual) => (atual === id ? null : atual))
    }

    function abrirFormularioComData(dataStr) {
        // Preenche o formulário com a data e o horário do slot escolhido.
        const [data, horario] = dataStr.split('T')
        setValoresIniciais({ data, horario: horario ? horario.slice(0, 5) : '' })
        setMostrarFormulario(true)
    }

    function salvarAgendamento(novoAgendamento) {
        adicionarAgendamento(novoAgendamento)
        // Após salvar, volta a exibir a lista de consultas.
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
                    {/* O calendário permite criar ou visualizar agendamentos. */}
                    <Calendario
                        agendamentos={agendamentos}
                        onSlotClick={abrirFormularioComData}
                        onSlotOcupado={() => setMostrarAgendamentoInvalido(true)}
                        onEventoClick={setIdSelecionado}
                    />
                </main>

                <aside className="painel-lateral">
                    {/* Alterna entre o formulário e a lista de próximas consultas. */}
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

            <AgendamentoInvalido
                aberto={mostrarAgendamentoInvalido}
                onFechar={() => setMostrarAgendamentoInvalido(false)}
            />
        </div>
    )
}
