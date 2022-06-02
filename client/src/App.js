import React, { Suspense } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

const Pages = React.lazy(() => import('./pages'));

function App() {
  return (
    <Routes>
      <Route path="*" element={<Pages />} />
    </Routes>
  );
}

export default App;
