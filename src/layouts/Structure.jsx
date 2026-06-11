import React from "react";
import { Link, Outlet } from 'react-router-dom';

import Logo from '../img/logo.png'
import soloLogo from '../img/solologo.png'

function Structure() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-light bg-warning px-4">

          {/* Logo */}
          <Link className="navbar-brand" to="/Homepage">
            <img src={Logo} alt="Logo BB" style={{ width: '50px', borderRadius: '50px' }} />
          </Link>

          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Contenuto collassabile */}
          <div className="collapse navbar-collapse" id="navMenu">

            {/* Spazio a sinistra per spingere tutto a destra */}
            <div className="me-auto" />

            {/* Links + Ricerca affiancati a destra */}
            <div className="d-flex align-items-center gap-2">
              <Link to="/Homepage">
                <button className="btn btn-sm btn-dark text-white">Home</button>
              </Link>
              <Link to="/Show">
                <button className="btn btn-sm btn-dark text-white">Prodotti</button>
              </Link>
              <Link to="/NotFound">
                <button className="btn btn-sm btn-dark text-white">Test</button>
              </Link>
              <input
                className="form-control form-control-sm border-0 text-white"
                type="search"
                placeholder="Cerca..."
                style={{ width: '200px' }}
              />
            </div>

          </div>
        </nav>
      </header>

      <Outlet />

      <footer className="bg-warning custom-footer px-4 py-4 mt-auto border-top">
        <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">


          <a className="navbar-brand d-flex align-items-center gap-3 text-decoration-none text-dark" href="/">
            <div className="brand-text">
              <img style={{ width: '80px', borderRadius: '50px' }} src={soloLogo} alt="Logo BB" />
            </div>
          </a>

          <ul className="nav align-items-center gap-3 flex-wrap justify-content-center">
            <li className="nav-item">
              <Link to="/privacy" className="text-decoration-none text-secondary fw-medium small px-2">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/terms" className="text-decoration-none text-secondary fw-medium small px-2">
                Terms of Service
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-1 text-secondary fw-medium small px-2">
              <i className="bi bi-globe2 text-secondary"></i>
              <span>Florence, Italy</span>
            </li>
          </ul>

          <div className="text-secondary small">
            <span>© {new Date().getFullYear()} iScream.</span>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Structure
