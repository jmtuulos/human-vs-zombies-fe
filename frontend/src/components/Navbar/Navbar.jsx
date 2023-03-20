import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import keycloak from "../../keycloak"

const Navbar = () => {
    const { user } = useUser()

    return (
        <div className="container pt-7">
            <nav className="navbar navbar-expand-sm navbar-light">
                <p className="navbar-brand">HvZ</p>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation"></button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <ul className="nav-item">
                            <li className="nav-link active" aria-current="page"><NavLink to='/'>Home</NavLink><span className="visually-hidden">(current)</span></li>
                        </ul>
                        <ul className="nav-item">
                            <li className="nav-link"><NavLink to='/gamedetails'>Game Details</NavLink></li>
                        </ul>
                        <ul className="nav-item">
                            <ul>
                                <section className="actions">
                                    {!keycloak.authenticated && (
                                        <button className="btn btn-primary" onClick={() => keycloak.login()}>Login</button>
                                    )}
                                    {keycloak.authenticated && (
                                        <button className="btn btn-warning" onClick={() => keycloak.logout()}>Logout</button>
                                    )}
                                </section>
                            </ul>
                        </ul>
                    </ul>
                    {/* <form className="d-flex my-2 my-lg-0">
                        <input className="form-control me-sm-2" type="text" placeholder="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
