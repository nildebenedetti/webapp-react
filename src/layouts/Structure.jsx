import React from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';

import Logo from '../img/logo.png'
import soloLogo from '../img/solologo.png'
import bella from '../img/bella.png'

function Structure() {

  const navigate = useNavigate();
  const [navSearch, setNavSearch] = useState('');

  const handleNavbarSearch = () => {
    if (navSearch.trim() === '') return;
    navigate(`/Show?search=${encodeURIComponent(navSearch)}`);
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-light bg-warning px-4">

          <Link className="navbar-brand" to="/Homepage">
            <img src={Logo} alt="Logo BB" style={{ width: '270px', borderRadius: '50px' }} />
          </Link>

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

            <div className="me-auto" />
            <div className="d-flex align-items-center gap-2">
              <Link to="/Homepage">
                <button className="btn btn-sm btn-dark text-white">Home</button>
              </Link>
              <Link to="/Show">
                <button className="btn btn-sm btn-dark text-white">Menù</button>
              </Link>
              <Link to="/WhoWeAre">
                <button className="btn btn-sm btn-dark text-white">Chi Siamo</button>
              </Link>
              <input
                className="form-control form-control-sm border-0 text-dark"
                type="search"
                placeholder="We all melt down here..."
                style={{ width: '200px' }}
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNavbarSearch()}
              />
              <button
                className="btn btn-sm btn-dark text-white fw-bold border-light border-3"
                onClick={handleNavbarSearch}
              >
                Cerca
              </button>

            </div>

          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main >

      <footer className="bg-warning custom-footer px-4 py-4 mt-auto border-top">
        <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

          <a className="navbar-brand d-flex align-items-center gap-3 text-decoration-none text-dark" href="/">
            <div className="brand-text">
              <img style={{ width: '200px', borderRadius: '50px' }} src={bella} alt="Logo BB" />
            </div>
          </a>

          <ul className="nav align-items-center gap-3 flex-wrap justify-content-center">
            <li className="nav-item">
              <Link to="/privacy" className="text-decoration-none text-secondary fw-medium small px-2">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/WhoWeAre" className="text-decoration-none text-secondary fw-medium small px-2">
                About Us
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

        <div className="d-flex flex-column align-items-center mt-3">
          <span className="text-dark fw-bold mb-2">Follow us</span>
          <div className="d-flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
              <i className="bi bi-tiktok"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Structure
