import { user } from './authTypes';

export interface RecipeIngredient {
  name: string;
  unit: string;
  count: number;
}

export interface RecipeInstruction {
  text: string;
  imgURL?: string;
}

export interface Recipe {
  id: string;
  type: string;
  title: string;
  description: string;
  owner: user;
  date: number;
  duration: number;
  diameter: number;
  imgUrl: string;
  tags: string[];
  ingredients: RecipeIngredient[];
  recipeText: RecipeInstruction[];
}

export interface SliceRecipesStatus {
  loadedAll: boolean;
  loading: boolean;
  error: string | null;
}

export interface SliceRecipes {
  status: SliceRecipesStatus;
  recipes: Recipe[];
}
