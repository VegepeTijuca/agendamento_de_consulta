import './agendamentoinvalido.css'
import { useEffect, useState } from 'react'

// Exibe um modal informando que o horário escolhido está indisponível.
export default function AgendamentoInvalido({ aberto = true, onFechar }) {
	// Define por quanto tempo o modal permanecerá aberto automaticamente.
	const duracao = 5000
	// Armazena o tempo restante para atualizar a barra de progresso.
	const [tempoRestante, setTempoRestante] = useState(duracao)

	useEffect(() => {
		// Não inicia o temporizador enquanto o modal estiver fechado.
		if (!aberto) return

		// Registra o momento em que a contagem regressiva começou.
		const inicio = Date.now()
		setTempoRestante(duracao)

		// Atualiza o tempo restante a cada 50 ms.
		const intervalo = setInterval(() => {
			// Impede que o valor fique negativo caso o intervalo ultrapasse a duração.
			const restante = Math.max(0, duracao - (Date.now() - inicio))
			setTempoRestante(restante)

			// Fecha o modal quando a contagem chega a zero.
			if (restante === 0) {
				clearInterval(intervalo)
				onFechar?.()
			}
		}, 50)

		// Limpa o intervalo ao fechar o modal ou desmontar o componente.
		return () => clearInterval(intervalo)
	}, [aberto, onFechar])

	// Não renderiza nada quando o modal está fechado.
	if (!aberto) return null

	return (
		// Clique fora da caixa também fecha o modal.
		<div
			role="presentation"
			onClick={onFechar}
		>
			<section
				role="alertdialog"
				aria-modal="true"
				aria-labelledby="agendamento-invalido-titulo"
				aria-describedby="agendamento-invalido-mensagem"
				// Evita que um clique dentro do modal seja propagado para o contêiner externo.
				onClick={(evento) => evento.stopPropagation()}
			>
				<h2 id="agendamento-invalido-titulo">
					Horário indisponível
				</h2>
				<p id="agendamento-invalido-mensagem">
					Esse horário já está ocupado. Escolha outro horário para o agendamento.
				</p>
				{/* Permite fechar o modal manualmente. */}
				<button type="button" onClick={onFechar} autoFocus>
					Entendi
				</button>
				{/* Barra que indica visualmente quanto tempo falta para o fechamento automático. */}
			<div
				role="progressbar"
				aria-label="Tempo até o modal fechar"
				aria-valuemin={0}
				aria-valuemax={duracao}
				aria-valuenow={tempoRestante}
				style={{
					width: '100%',
					height: '8px',
					marginTop: '16px',
					backgroundColor: 'rgba(0, 0, 0, 0.12)',
					borderRadius: '999px',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						width: `${(tempoRestante / duracao) * 100}%`,
						height: '100%',
						backgroundColor: 'var(--accent, #0e6f63)',
						transition: 'width 50ms linear',
					}}
				/>
			</div>
			</section>
		</div>
	)
}
