import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../../types/recipeType';
import { SliceRecipes } from '../../../types/recipeType';

const initialState: SliceRecipes = {
  status: {
    loadedAll: false,
    loading: false,
    error: null,
  },
  recipes: [],
};

export const recipesSlice = createSlice({
  initialState: initialState,
  name: 'recipes',
  reducers: {
    setRecipes: (state, { payload }: PayloadAction<Recipe[]>) => {
      state.status.loadedAll = true;
      state.recipes = payload;
    },
    addRecipe: (state, { payload }: PayloadAction<Recipe>) => {
      state.recipes.push(payload);
    },
    updateRecipe: (state, { payload }: PayloadAction<Recipe>) => {
      state.recipes.map((recipe) =>
        recipe.id === payload.id ? payload : recipe
      );
    },
  },
});

// Action creator
export const { setRecipes, addRecipe, updateRecipe } = recipesSlice.actions;
// Reducer
export const recipesReducer = recipesSlice.reducer;
