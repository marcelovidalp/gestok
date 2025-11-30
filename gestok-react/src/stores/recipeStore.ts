import { create } from 'zustand'
import { Recipe } from '@/types'
import { load, save, LS_RECIPES } from '@/utils/helpers'

interface RecipeState {
  recipes: Recipe[]
  
  // Actions
  addRecipe: (recipe: Recipe) => void
  updateRecipe: (id: string, updates: Partial<Recipe>) => void
  deleteRecipe: (id: string) => void
  loadRecipes: () => void
}

const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: load<Recipe>(LS_RECIPES),

  addRecipe: (recipe: Recipe) => {
    const recipes = [...get().recipes, recipe]
    save(LS_RECIPES, recipes)
    set({ recipes })
  },

  updateRecipe: (id: string, updates: Partial<Recipe>) => {
    const recipes = get().recipes.map((r: Recipe) => 
      r.id === id ? { ...r, ...updates } : r
    )
    save(LS_RECIPES, recipes)
    set({ recipes })
  },

  deleteRecipe: (id: string) => {
    const recipes = get().recipes.filter((r: Recipe) => r.id !== id)
    save(LS_RECIPES, recipes)
    set({ recipes })
  },

  loadRecipes: () => {
    set({ recipes: load<Recipe>(LS_RECIPES) })
  }
}))

export default useRecipeStore
