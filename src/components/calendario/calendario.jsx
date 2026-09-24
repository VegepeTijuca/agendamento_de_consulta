import { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { temConflito } from '../../utils/validacao'
import './calendario.css'

// Soma a duração (em minutos) ao horário de início e devolve o instante final em ISO local
function calcularFim(data, horario, duracao) {
    const inicio = new Date(`${data}T${horario}`)
    const fim = new Date(inicio.getTime() + Number(duracao) * 60000)
    return fim.toISOString().slice(0, 19)
}

// Conteúdo de cada bloco de consulta no calendário
function renderizarEvento(info) {
    return (
        <div className="evento-consulta">
            <span className="evento-consulta-horario">{info.timeText}</span>
            <span className="evento-consulta-paciente">{info.event.title}</span>
        </div>
    )
}

export default function Calendario({ agendamentos, onSlotClick, onSlotOcupado, onEventoClick }) {
    // pra pegar dados da API do calendário
    const calendarioRef = useRef(null)

    const eventos = agendamentos.map((agendamento) => ({
        id: agendamento.id,
        title: agendamento.paciente,
        start: `${agendamento.data}T${agendamento.horario}`,
        end: calcularFim(agendamento.data, agendamento.horario, agendamento.duracao),
    }))

    function aoClicarNaData(info) {
        if (info.view.type === 'dayGridMonth') {
            calendarioRef.current?.getApi().changeView('timeGridDay', info.dateStr)
            return
        }

        const [data, horario] = info.dateStr.split('T')
        const horarioCurto = horario ? horario.slice(0, 5) : ''
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
            selectable={true}
            unselectAuto={false}
            events={eventos}
            eventContent={renderizarEvento}
            dateClick={aoClicarNaData}
            eventClick={(info) => onEventoClick?.(info.event.id)}
        />
    )
}
