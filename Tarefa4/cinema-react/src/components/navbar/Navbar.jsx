
import { Link } from 'react-router-dom'




function Navbar({

}) {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-secondary px-4 mb-5">
                <div className="container-fluid d-flex justify-content-center align-items-center gap-4">
                    <a href="/home" className="navbar-brand">
                        <img src="Tarefa4/cinema-react/src/assets/logo2.png" alt="Logo" width="91" height="65" />
                    </a>

                    <div>
                        <ul className="navbar-nav nav-underline d-flex flex-sm-row gap-4">
                            <li className="nav-item"> <Link className='nav-link text-dark fonte-principal' to='/home'>Home</Link></li>
                            <li className="nav-item"> <Link className='nav-link text-dark fonte-principal' to='/cadastrarFilme'>Cadastrar Filmes</Link></li>
                            <li className="nav-item"> <Link className='nav-link text-dark fonte-principal' to='/cadastrarSala'>Cadastrar Salas</Link></li>
                            <li className="nav-item"> <Link className='nav-link text-dark fonte-principal' to='/cadastrarSessão'>Cadastrar Sessões</Link></li>
                            <li className="nav-item"> <Link className='nav-link text-dark fonte-principal' to='/ingresso'>Ingresso</Link></li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}


export default Navbar;