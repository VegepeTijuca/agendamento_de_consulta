import { useState } from 'react'
import { emailValido, horarioValido, temConflito } from '../../utils/validacao'
import './formularioagendamento.css'

// Valores em branco usados tanto para abrir um formulário novo quanto para limpá-lo após salvar
const CAMPOS_VAZIOS = { paciente: '', email: '', data: '', horario: '', duracao: '30', observacao: '' }

export default function FormularioAgendamento({ agendamentos, valoresIniciais, onSalvar, onCancelar }) {
    // Começa com os valores em branco, sobrescritos pelos valoresIniciais
    // (ex.: data/horário já preenchidos ao clicar num horário vago do calendário)
    const [formulario, setFormulario] = useState({ ...CAMPOS_VAZIOS, ...valoresIniciais })
    const [erro, setErro] = useState('')

    function alterarCampo(evento) {
        setFormulario({ ...formulario, [evento.target.name]: evento.target.value })
        setErro('') // limpa o erro anterior assim que o usuário volta a digitar
    }

    function salvar(evento) {
        evento.preventDefault()

        if (!formulario.paciente.trim() || !formulario.email.trim() || !formulario.data || !formulario.horario) {
            setErro('Preencha todos os campos obrigatórios.')
            return
        }

        if (!emailValido(formulario.email)) {
            setErro('Informe um e-mail válido.')
            return
        }

        if (!horarioValido(formulario.horario, formulario.duracao)) {
            setErro('Escolha um horário entre 08:00 e 18:00, em intervalos de 30 minutos.')
            return
        }

        const novoAgendamento = { ...formulario, id: crypto.randomUUID(), duracao: Number(formulario.duracao) }
        if (temConflito(agendamentos, novoAgendamento)) {
            setErro('Já existe um agendamento nesse horário.')
            return
        }

        onSalvar(novoAgendamento)
        setFormulario(CAMPOS_VAZIOS)
    }

    return (
        <form className="formulario" onSubmit={salvar}>
            <h2>Novo agendamento</h2>
            {erro && <p className="erro" role="alert">{erro}</p>}

            <label>
                Paciente
                <input name="paciente" value={formulario.paciente} onChange={alterarCampo} required />
            </label>
            <label>
                E-mail
                <input type="email" name="email" value={formulario.email} onChange={alterarCampo} required />
            </label>
            <label>
                Data
                <input type="date" name="data" value={formulario.data} onChange={alterarCampo} required />
            </label>
            <label>
                Horário
                <input type="time" name="horario" step="1800" value={formulario.horario} onChange={alterarCampo} required />
            </label>
            <label>
                Duração
                <select name="duracao" value={formulario.duracao} onChange={alterarCampo}>
                    <option value="30">30 minutos</option>
                    <option value="60">60 minutos</option>
                </select>
            </label>
            <label>
                Observação
                <textarea name="observacao" value={formulario.observacao} onChange={alterarCampo} />
            </label>

            <div className="acoes-formulario">
                <button type="submit">Agendar</button>
                <button type="button" className="secundario" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    )
}
