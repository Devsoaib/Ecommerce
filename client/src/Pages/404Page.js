import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/Css/404.css';

const NotFound = () => {
  return (
    <div className="container container-404">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="heading heading-404">404</h1>
          <p className="subheading subheading-404">Oops! Page not found</p>
          <p className="description description-404">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
          <Link to="/" className="btn btn-primary mt-3">Go back to home page</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
