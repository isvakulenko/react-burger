import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {rootReducer} from '../../services/reducers/'
import {TConstructorActions} from '../../services/actions/constructor'
import {TGetIngredientAction } from '../../services/actions/ingredient'

//import {store} from '../../services/store'


type TApplicationActions = TConstructorActions | TGetIngredientAction 

//В теории даётся не очень удобное/корректное описание типа для AppThunk и AppDispatch,
//с ним возможны проблемы. Поэтому держите рабочий вариант:

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, TApplicationActions>;

//export type AppDispatch = typeof store.dispatch; 

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;