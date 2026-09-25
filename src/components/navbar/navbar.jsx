import logo from '../../assets/logo-clinica.png'
import './navbar.css'

// Itens exibidos no menu; apenas a Agenda começa marcada como ativa.
const LINKS = [
    { label: 'Agenda', ativo: true },
    { label: 'Pacientes', ativo: false },
    { label: 'Financeiro', ativo: false },
    { label: 'Configurações', ativo: false },
]

export default function Navbar() {
    return (
        // Estrutura principal da barra de navegação.
        <nav className="navbar">
            {/* Logo da clínica. */}
            <div className="navbar-marca">
                <img src={logo} alt="Clínica Médica" className="navbar-logo" />
            </div>

            {/* Renderiza os links do menu a partir da lista acima. */}
            <ul className="navbar-links">
                {LINKS.map((link) => (
                    <li key={link.label}>
                        <a
                            href="#"
                            className={link.ativo ? 'ativo' : ''}
                            // Os links são visuais por enquanto e não navegam.
                            onClick={(e) => e.preventDefault()}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Identificação do usuário atual. */}
            <div className="navbar-usuario">
                <span className="navbar-avatar">VR</span>
                <span className="navbar-usuario-nome">Vitor Regison</span>
            </div>
        </nav>
    )
}
