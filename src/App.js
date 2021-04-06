import React, { useState } from 'react';
import Details from './Details';
import { Link, Router } from '@reach/router';
import SearchParams from './SearchParams';
import ThemeContext from './ThemeContext';

export default function App() {
  const themeHook = useState("darkblue");
  return (
    <ThemeContext.Provider value={themeHook}>
      {/* Now everything inside ThemeContext.Provider will have a global application state, themeHook */}
      <div>
        <header>
        <Link to="/">
          <h1>Adopt me!</h1>
        </Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  )
};
