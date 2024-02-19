import React from 'react';
import { Header } from "./Components/Header";
import { Homepage } from "./Components/Homepage";
import { Column } from './Components/StyledComponents';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Column>
        <Header />
        <Homepage />
      </Column>
    </div>
  );
}

export default App;
