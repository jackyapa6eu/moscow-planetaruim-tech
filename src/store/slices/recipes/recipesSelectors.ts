import { RootState } from '../..';
import { Recipe } from '../../../types/recipeType';

export const selectRecipes = (state: RootState) => state.recipes;
export const selectRecipesStatus = (state: RootState) => state.recipes.status;
/*
как назвал "посты"
какие поля у юзера

export const selectRecipeById = (id: string) => (state: RootState) => {
  return state.recipes.recipes.find((recipe: Recipe) => recipe.id === id);
};
export const selectRecipesByTags =
  (tagsArr: string[], type: string) =>
  ({ recipes: { recipes } }: RootState) => {
    if (!tagsArr.length) {
      return recipes.filter((recipe) => recipe.type === type);
    }

    return recipes.filter((recipe) => {
      if (recipe.tags) {
        return tagsArr.every((tag) =>
          recipe.tags.some((rTag) => rTag === tag && recipe.type === type)
        );
      }
    });
  };

export const selectRecipesByType =
  (type: string) =>
  ({ recipes: { recipes } }: RootState) => {
    return recipes.filter((recipe) => recipe.type === type);
  };

export const selectRecipesByOwner =
  (ownerId: string | null) =>
  ({ recipes: { recipes } }: RootState) => {
    return recipes.filter((recipe) => recipe.owner.id === ownerId);
  };
*/
