<?php

namespace datas\models;

/**
 * Description of Ingredient
 *
 * @author dviolet
 * @property string $nom
 */
class Ingredient extends \LessQL\DbObject
{
    protected $dbTable = "ingredient";
    protected $relations = array(
        //'recettes' => array('hasMany', '\datas\models\IngredientQuantite', 'ingredient_id')
    );
}
