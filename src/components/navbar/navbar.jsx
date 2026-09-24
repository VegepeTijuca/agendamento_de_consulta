import logo from '../../assets/logo-clinica.png'
import './navbar.css'

// Nav fake
const LINKS = [
    { label: 'Agenda', ativo: true },
    { label: 'Pacientes', ativo: false },
    { label: 'Financeiro', ativo: false },
    { label: 'Configurações', ativo: false },
]

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-marca">
                <img src={logo} alt="Clínica Médica" className="navbar-logo" />
            </div>

            <ul className="navbar-links">
                {LINKS.map((link) => (
                    <li key={link.label}>
                        <a
                            href="#"
                            className={link.ativo ? 'ativo' : ''}
                            onClick={(e) => e.preventDefault()}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="navbar-usuario">
                <span className="navbar-avatar">VR</span>
                <span className="navbar-usuario-nome">Vitor Regisson</span>
            </div>
        </nav>
    )
}
