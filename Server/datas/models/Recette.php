<?php

namespace datas\models;

/**
 * Description of Recette
 *
 * @author dviolet
 * @property int $id
 * @property string $nom
 * @property IngredientQuantite $ingredients
 */
class Recette extends \LessQL\DbObject
{
    protected $dbTable = "recette";
    protected $relations = array(
        'ingredients' => array('hasMany', '\datas\models\IngredientQuantite', 'recette_id')
    );

    /**
     *
     * @param Ingredient $ingredient
     * @param float $quantite
     * @param string $unite
     */
    public function addIngredient($ingredient, $quantite, $unite){
        
        $_ingredients = array();
        if(count($this->ingredients) > 0) $_ingredients = $this->ingredients;

        $_ingr = new IngredientQuantite();
        $_ingr->quantite = $quantite;
        $_ingr->unite = $unite;
        $_ingr->ingredient = $ingredient;
        array_push($_ingredients, $_ingr);

        $this->ingredients = $_ingredients;
    }
}
