import logo from './logo.svg';
import './App.css';
import Board from './Pages/Board';
import { useContext, createContext, useEffect, useState } from 'react';
import DifficultySelect from './Pages/DifficultySelect';
import Game from './Pages/Game';


function App() {


  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
