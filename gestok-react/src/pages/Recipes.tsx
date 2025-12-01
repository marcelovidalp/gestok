import React, { useState } from 'react'
import { Card, Select, Input, Button } from '@/components/ui'
import useResourceStore from '@/stores/resourceStore'
import useRecipeStore from '@/stores/recipeStore'
import { genId, fmtCLP } from '@/utils/helpers'
import { Recipe, RecipeIngredient } from '@/types'
import { Trash2 } from 'lucide-react'

const Recipes: React.FC = () => {
  const { resources } = useResourceStore()
  const { recipes, addRecipe, deleteRecipe } = useRecipeStore()
  const [recipeName, setRecipeName] = useState('')
  const [selectedResource, setSelectedResource] = useState('')
  const [quantity, setQuantity] = useState('')
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([])

  const addIngredient = () => {
    if (!selectedResource || !quantity || Number(quantity) <= 0) {
      alert('Selecciona ingrediente y cantidad válida')
      return
    }

    setIngredients([...ingredients, {
      id: genId(),
      resourceId: selectedResource,
      qty: Number(quantity)
    }])
    setSelectedResource('')
    setQuantity('')
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(i => i.id !== id))
  }

  const calculateCost = () => {
    let costCLP = 0
    ingredients.forEach(ing => {
      const resource = resources.find(r => r.id === ing.resourceId)
      if (resource) {
        costCLP += resource.priceCLP * ing.qty
      }
    })
    return { costCLP }
  }

  const saveRecipe = () => {
    if (!recipeName.trim()) {
      alert('Nombre de receta requerido')
      return
    }
    if (ingredients.length === 0) {
      alert('Añade al menos un ingrediente')
      return
    }

    const costs = calculateCost()
    const newRecipe: Recipe = {
      id: genId(),
      name: recipeName,
      ingredients: ingredients,
      costCLP: costs.costCLP,
      created: new Date().toISOString()
    }

    addRecipe(newRecipe)
    setRecipeName('')
    setIngredients([])
    alert('Receta guardada')
  }

  const costs = calculateCost()
  const resourceOptions = [
    { value: '', label: 'Seleccione recurso' },
    ...resources.map(r => ({ value: r.id, label: `${r.name} (${r.unit})` }))
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Crear receta" subtitle="Administrar recetas">
        <Input
          label="Nombre receta"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Ej: Brownie clásico"
        />

        <Select
          label="Seleccionar ingrediente"
          options={resourceOptions}
          value={selectedResource}
          onChange={(e) => setSelectedResource(e.target.value)}
        />

        <Input
          label="Cantidad ingrediente"
          type="number"
          step="0.01"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Ej: 0.5"
        />

        <div className="flex gap-2 mb-6">
          <Button variant="primary" onClick={addIngredient}>Añadir ingrediente</Button>
          <Button variant="ghost" onClick={saveRecipe}>Guardar receta</Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
          <h4 className="font-semibold dark:text-white mb-2">Ingredientes ({ingredients.length})</h4>
          {ingredients.length === 0 ? (
            <p className="text-muted dark:text-gray-400 text-sm">No hay ingredientes</p>
          ) : (
            <ul className="space-y-2">
              {ingredients.map(ing => {
                const resource = resources.find(r => r.id === ing.resourceId)
                return (
                  <li key={ing.id} className="flex justify-between items-center dark:text-gray-200">
                    <span>{resource?.name} — {ing.qty} {resource?.unit}</span>
                    <Button variant="danger" onClick={() => removeIngredient(ing.id)} className="p-2">
                      <Trash2 size={14} />
                    </Button>
                  </li>
                )
              })}
            </ul>
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="text-sm text-muted dark:text-gray-300">Costo CLP: <span className="font-semibold">{fmtCLP(costs.costCLP)}</span></div>
          </div>
        </div>
      </Card>

      <Card title="Recetas guardadas" subtitle={`${recipes.length} recetas`}>
        <div className="space-y-4">
          {recipes.length === 0 ? (
            <p className="text-muted dark:text-gray-400 text-sm">No hay recetas guardadas</p>
          ) : (
            recipes.map(recipe => (
              <div key={recipe.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold dark:text-white">{recipe.name}</h4>
                  <Button variant="danger" onClick={() => {
                    if (window.confirm('¿Eliminar receta?')) deleteRecipe(recipe.id)
                  }} className="p-2">
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="text-sm text-muted dark:text-gray-300">Costo: {fmtCLP(recipe.costCLP)}</div>
                <div className="text-xs text-muted dark:text-gray-400 mt-2">{recipe.ingredients.length} ingredientes</div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}

export default Recipes