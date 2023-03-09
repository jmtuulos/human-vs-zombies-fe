import keycloak from "../keycloak";

const LandingPage = () => {
  return (
<div>
      <h1>Landing Page</h1>
      <section className="actions">
        {!keycloak.authenticated && (
          <button onClick={() => keycloak.login()}>Login</button>
        )}
        {keycloak.authenticated && (
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </section>
    </div>
  );
}

export default LandingPage
