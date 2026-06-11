import React from "react";
import { Link, Outlet } from 'react-router-dom';

function Structure() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
          <a className="navbar-brand fw-bold me-4" href="#">iScream</a>
          <div className="navbar-nav">

            <Link to='/Homepage'>
              <button className="btn btn-sm btn-outline-secondary text-white me-2">Home</button>
            </Link>
            <Link to='/Show'>
              <button className="btn btn-sm btn-outline-secondary text-white me-2">Product</button>
            </Link>
            <Link to='/NotFound'>
              <button className="btn btn-sm btn-outline-secondary text-white">Test</button>
            </Link>
          </div>
        </nav>
      </header >

      <Outlet />

      <footer className="bg-body-tertiary custom-footer px-4 py-4 mt-auto border-top">
                <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">


                    <a className="navbar-brand d-flex align-items-center gap-3 text-decoration-none text-dark" href="/">
                        <div className="brand-text">
                            <h6 className="m-0 fw-bold">iScream</h6>
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
