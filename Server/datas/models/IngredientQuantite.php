<?php

namespace datas\models;

/**
 * Description of IngredientQuantite
 *
 * @author dviolet
 * @property float $quantite
 * @property string $unite
 * @property Ingredient $ingredient
 */
class IngredientQuantite extends \LessQL\DbObject
{
    //protected $primaryKey = array('id','recette_id', 'ingredient_id');
    protected $primaryKey = 'id';
    protected $dbTable = "ingredientsquantites";
    protected $relations = array(
        'ingredient' => array('hasOne', '\datas\models\Ingredient', 'ingredient_id'),
        'recette' => array('hasOne', '\datas\models\Recette', 'recette_id')
    );
}
