import {NavLink} from "react-router-dom"
import {useAppUser} from "../../context/AppUserContext"
import keycloak from "../../keycloak"
import './Navbar.css';
import {FiLogIn, FiLogOut, FiMenu} from 'react-icons/fi';

const Navbar = () => {
    const {appUser} = useAppUser()

    return (
        <div className="mb-4">
            <nav className="navbar navbar-expand-sm navbar-light mb-1 shadow">
                <div className="container">
                    <p className="navbar-brand"><NavLink to='/'>HvZ</NavLink></p>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                            aria-expanded="false" aria-label="Toggle navigation"><span><FiMenu className="burger-icon"/></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <ul className="nav-item">
                                <li className="nav-link active" aria-current="page"><NavLink to='/'>Home</NavLink><span
                                    className="visually-hidden">(current)</span></li>
                            </ul>
                            {appUser && <ul className="nav-item">
                                <li className="nav-link"><NavLink to='/gamedetails'>Game Details</NavLink></li>
                            </ul>}
                            {keycloak.hasRealmRole('admin') && <ul className="nav-item">
                                <li className="nav-link"><NavLink to='/dashboard'>Admin Dashboard</NavLink></li>
                            </ul>}
                        </ul>
                        <div className="nav-right">
                            <ul className="nav">
                                <ul>
                                    <section className="actions">
                                        {!keycloak.authenticated && (
                                            <button className="btn btn-outline-light"
                                                    onClick={() => keycloak.login()}>Login <FiLogIn
                                                className="log-icon"/></button>
                                        )}
                                        {keycloak.authenticated && (
                                            <button className="btn btn-outline-light"
                                                    onClick={() => keycloak.logout()}>Logout <FiLogOut
                                                className="log-icon"/></button>
                                        )}
                                    </section>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="ms-2">
                {keycloak.authenticated && <p>Signed in as: {keycloak.idTokenParsed.name}</p>}
            </div>
        </div>
    )
}

export default Navbar
