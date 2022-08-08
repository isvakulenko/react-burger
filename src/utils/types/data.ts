export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  imagemobile: string;
  imagelarge: string;
};

export type TConstructorlngredient = TIngredient & {
  id: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};
