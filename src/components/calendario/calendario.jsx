import { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { temConflito } from '../../utils/validacao'
import './calendario.css'

// Soma a duração (em minutos) ao horário de início e devolve o instante final em horário local
function calcularFim(data, horario, duracao) {
    // Cria o horário inicial e soma a duração da consulta.
    const inicio = new Date(`${data}T${horario}`)
    const fim = new Date(inicio.getTime() + Number(duracao) * 60000)
    const pad = (valor) => String(valor).padStart(2, '0')
    return `${fim.getFullYear()}-${pad(fim.getMonth() + 1)}-${pad(fim.getDate())}T${pad(fim.getHours())}:${pad(fim.getMinutes())}:00`
}

// Conteúdo de cada bloco de consulta no calendário
function renderizarEvento(info) {
    // Exibe o horário e o nome do paciente dentro do evento.
    return (
        <div className="evento-consulta">
            <span className="evento-consulta-horario">{info.timeText}</span>
            <span className="evento-consulta-paciente">{info.event.title}</span>
        </div>
    )
}

export default function Calendario({ agendamentos, onSlotClick, onSlotOcupado, onEventoClick }) {
    // Permite acessar a API do FullCalendar para trocar de visualização.
    const calendarioRef = useRef(null)

    // Converte os agendamentos para o formato esperado pelo FullCalendar.
    const eventos = agendamentos.map((agendamento) => ({
        id: agendamento.id,
        title: agendamento.paciente,
        start: `${agendamento.data}T${agendamento.horario}`,
        end: calcularFim(agendamento.data, agendamento.horario, agendamento.duracao),
    }))

    function aoClicarNaData(info) {
        // No mês, um clique abre o dia correspondente em detalhes.
        if (info.view.type === 'dayGridMonth') {
            calendarioRef.current?.getApi().changeView('timeGridDay', info.dateStr)
            return
        }

        const [data, horario] = info.dateStr.split('T')
        const horarioCurto = horario ? horario.slice(0, 5) : ''
        // Impede novos agendamentos quando o horário já está ocupado.
        const ocupado = temConflito(agendamentos, { data, horario: horarioCurto, duracao: 30 })

        if (ocupado) {
            onSlotOcupado?.()
            return
        }

        onSlotClick?.(info.dateStr)
    }

    return (
        <FullCalendar
            ref={calendarioRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // Configura as visualizações e os controles do calendário.
            initialView="timeGridWeek"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locale={ptBrLocale}
            firstDay={1}
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            slotDuration="00:30:00"
            allDaySlot={false}
            height="auto"
            // Permite clicar nos horários e nos eventos existentes.
            selectable={true}
            unselectAuto={false}
            events={eventos}
            eventContent={renderizarEvento}
            dateClick={aoClicarNaData}
            eventClick={(info) => onEventoClick?.(info.event.id)}
        />
    )
}
