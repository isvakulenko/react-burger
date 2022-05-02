import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import './app.css';

function App() {
  return (
    <header className="App">
        <AppHeader />
        <BurgerIngredients />
    </header>
  );
}

export default App;
