import { TIngredient, TConstructorlngredient } from "../../utils/types/data";
import {
  CONSTRUCTOR_SET,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER,
} from "../constants";

export type TConstructorSetAction = {
  readonly type: typeof CONSTRUCTOR_SET;
  readonly payload: TConstructorlngredient;
};

export type TConstructorResetAction = {
  readonly type: typeof CONSTRUCTOR_RESET;
};

export type TConstructorDeleteAction = {
  readonly type: typeof CONSTRUCTOR_DELETE;
  readonly payload: number;
};

export type TConstructorReorderAction = {
  readonly type: typeof CONSTRUCTOR_REORDER;
  readonly payload: {
    dragIndex: number;
    hoverIndex: number;
  };
};

export type TConstructorActions =
    TConstructorSetAction
  | TConstructorResetAction
  | TConstructorDeleteAction
  | TConstructorReorderAction;

export const addToConstructor = (
  ingredient: TIngredient
): TConstructorSetAction => {
  return {
    type: CONSTRUCTOR_SET,
    payload: {
      ...ingredient,
      id: Math.random().toString(36).slice(2),
    },
  };
};
