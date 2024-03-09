import React from 'react';
import { Header } from "./Components/Header";
import { Homepage } from "./Components/Homepage";
import { Column } from './Components/StyledComponents';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <Column>
        <Header />
        <Homepage />
      </Column>
    </div>
    </QueryClientProvider>
  );
}

export default App;
