import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'

import style from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <section>
    <h1 className="mt-10 mb-5 text text_type_main-large">
    Соберите бургер
</h1>
    <div style={{ display: 'flex' }}>
      <Tab value="1" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="2" active={current === 'two'} onClick={setCurrent}>
        Соусы
        </Tab>
      <Tab value="3" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    </section>
  )
}

export default BurgerIngredients;
