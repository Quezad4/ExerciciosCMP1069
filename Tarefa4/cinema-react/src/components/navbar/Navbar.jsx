
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo2.png'


function Navbar({

}) {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-secondary px-4 mb-5">
                <div className="container-fluid d-flex justify-content-center align-items-center gap-4">
                    <a href="/home" className="navbar-brand">
                        <img src={logo} alt="Logo" width="91" height="65" />
                    </a>

                    <div>
                        <ul className="navbar-nav nav-underline d-flex flex-sm-row gap-4">
                            <li className="nav-item"> <NavLink className="nav-link text-dark fonte-principal" to='/home'>Home</NavLink></li>
                            <li className="nav-item"> <NavLink className='nav-link text-dark fonte-principal' to='/cadastrarFilme'>Cadastrar Filmes</NavLink></li>
                            <li className="nav-item"> <NavLink className='nav-link text-dark fonte-principal' to='/cadastrarSala'>Cadastrar Salas</NavLink></li>
                            <li className="nav-item"> <NavLink className='nav-link text-dark fonte-principal' to='/cadastrarSessao'>Cadastrar Sessões</NavLink></li>
                            <li className="nav-item"> <NavLink className='nav-link text-dark fonte-principal' to='/ingressos'>Venda de Ingressos</NavLink></li>
                            <li className="nav-item"> <NavLink className='nav-link text-dark fonte-principal' to='/sessoes'>Listagem de Sessões</NavLink></li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}


export default Navbar;