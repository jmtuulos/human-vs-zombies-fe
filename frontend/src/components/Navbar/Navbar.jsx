import { NavLink, Link } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import keycloak from "../../keycloak"

const Navbar = () => {
    const { user } = useUser()

    return (
        <nav class="navbar navbar-expand-sm navbar-light">
            <Link class="navbar-brand" to="/">HvZ</Link>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation"></button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <li class="nav-link active" aria-current="page"><NavLink to='/'></NavLink><span class="visually-hidden">(current)</span></li>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/gamedetails">Game Details</Link>
                    </li>
                    <li class="nav-item">
                        <section className="actions">
                            {!keycloak.authenticated && (
                                <button class="btn btn-primary" onClick={() => keycloak.login()}>Login</button>
                            )}
                            {keycloak.authenticated && (
                                <button class="btn btn-warning" onClick={() => keycloak.logout()}>Logout</button>
                            )}
                        </section>
                    </li>
                </ul>
                <form class="d-flex my-2 my-lg-0">
                    <input class="form-control me-sm-2" type="text" placeholder="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar
