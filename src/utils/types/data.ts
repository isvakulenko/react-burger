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
  image_mobile: string;
  image_large: string;
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

export type TNewOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
} 

//Вспомогательный дженерик-тип TServerResponse,
//который будет добавлять какие-нибудь общие
//(например, success) поля к типу, который в него передали)
export type TServerResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};
export type TServerResponseWithMessage = {
  success: boolean;
  message: string;
};

export type TToken = {
  accessToken: string;
  refreshToken: string;
};

export type TGetIngredientsResponse = TServerResponse<TIngredient[]>;
export type TCreateUserResponse = { success: boolean; user: TUser } & TToken;
export type TRefreshTokenResponse = {success: boolean}  & TToken;
export type TLoginRequestResponse = TServerResponse<TUser> & TToken;
export type TUserResponse = TServerResponse<TUser>;
