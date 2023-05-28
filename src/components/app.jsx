// copied from Chloe Fugle starterpack

import React from 'react';
import {
  BrowserRouter, Routes, Route, // useParams,
} from 'react-router-dom';
import Nav from './nav/nav';
// eslint-disable-next-line import/no-named-as-default
import Main from './main/main';
import Edit from './edit/edit';
import Import from './import/import';
import Create from './createCalendar/create';

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Create />} />
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="/scheduler/:SchedulerId" element={<Main />} />
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
