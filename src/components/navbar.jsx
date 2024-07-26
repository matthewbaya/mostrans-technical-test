import { NavLink } from "react-router-dom";
import logo from "../assets/rick2.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary border-body">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src={logo} alt="Rick and Morty" style={{ width: "50px" }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to={"/"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "nav-link"
                    : isActive
                    ? "fw-semibold nav-link text-primary"
                    : "nav-link"
                }
              >
                All Characters
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/location"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "nav-link"
                    : isActive
                    ? "fw-semibold nav-link text-primary"
                    : "nav-link"
                }
              >
                Characters by location
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
