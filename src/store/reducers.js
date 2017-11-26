import {
  ADDFIELD,
  DELETEFIELD,
  FILLINGREDIENT,
  GETRESULT,
  VALIDITY
} from "./types";

let keyID = 0;

const initialState = [
  {
    id: keyID,
    name: "Ingredient",
    payload: ""
  }
];

export const manageIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADDFIELD:
      keyID++;
      return [
        ...state,
        {
          id: keyID,
          name: `Ingrediant`,
          payload: ""
        }
      ];
    case DELETEFIELD:
      return state.length > 1
        ? state.filter(ingredient => ingredient.id !== action.id)
        : state;
    case FILLINGREDIENT:
      return state.map(
        ingredient =>
          ingredient.id === action.id
            ? { ...ingredient, payload: action.payload }
            : ingredient
      );
    default:
      return state;
  }
};

export const result = (state = {}, action) => {
  switch (action.type) {
    case GETRESULT:
      console.log(state, action);
      return { ...state, payload: action.payload };
    default:
      return state;
  }
};

export const validity = (state = true, action) => {
  switch (action.type) {
    case VALIDITY:
      return action.payload;
    default:
      return state;
  }
};
