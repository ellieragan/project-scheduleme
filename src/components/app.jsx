// copied from Chloe Fugle starterpack

import React from 'react';
import {
  BrowserRouter, Routes, Route, // useParams,
} from 'react-router-dom';
import Nav from './nav';
import Main from './main';
import Edit from './edit';
import Import from './import';

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/import" element={<Import />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}

export default App;
