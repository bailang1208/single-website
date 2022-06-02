import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AppLayout from '../layout/AppLayout';

const Home = React.lazy(() => import('./home'));
const Images = React.lazy(() => import('./images'));

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/images' element={<Images />} />
      </Route>
    </Routes>
  );
};

export default App;
