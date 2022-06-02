import React from 'react';

import TopNav from '../containers/Topnav';
import { useOutlet } from 'react-router-dom';

const AppLayout = ({ containerClassnames, history }) => {

  const outlet = useOutlet();

  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <main>
        <div className="container-fluid">{outlet}</div>
      </main>
    </div>
  );
};

export default AppLayout;
