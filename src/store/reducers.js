import {
  ADDFIELD,
  DELETEFIELD,
  FILLINGREDIENT,
  VALIDITY,
  STEP1,
  STEP2,
  STEP3,
  GETRESULTAC,
  GETRESULTRECIPE,
  GETRECIPE,
  LASTRECIPES
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
    case GETRESULTAC:
      return { ...state, resultAC: action.payload };
    case GETRESULTRECIPE:
      return { ...state, resultRecipe: action.payload };
    case GETRECIPE:
      return { ...state, resultRecipeFinal: action.payload };
    case LASTRECIPES:
      return { ...state, resultLastRecipe: action.payload };
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

const initialStateStepping = [{ isSteped1: false }];

export const stepping = (state = initialStateStepping, action) => {
  switch (action.type) {
    case STEP1:
      return state.map(value => {
        return { isSteped1: true, ...action.payload };
      });
    case STEP2:
      const ingredientsTitle = action.payload.map(value => ({
        ingredient: value.payload
      }));
      return [...state, { isSteped2: true, ingredientsTitle }];
    case STEP3:
      return [...state, { isSteped3: true, recipe: action.payload }];
    default:
      return state;
  }
};
