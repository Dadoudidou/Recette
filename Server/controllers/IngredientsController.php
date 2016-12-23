<?php

use Dadou\RestServer\RestException;
use MysqliDb;
use Recipes\Models\Bdd\Ingredient as IngredientBdd;

class IngredientsController {
    
    /**
     * 
     * @url GET /
     */
    public function test(){
        
        $ingredient = new IngredientBdd();
        $ingredient->nom = "courgette";
        $id = $ingredient->save();
        if($id == null){
            throw new RestException(500, MysqliDb::getInstance()->getLastError());
        }
        return $ingredient;
    }
    
}
