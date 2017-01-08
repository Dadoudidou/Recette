<?php

namespace App\Model\Table;

/**
 * Description of RecipesTable
 *
 * @author Dadou
 */
class RecettesTable extends \Cake\ORM\Table {
    
    public function initialize(array $config) {
        $this->belongsToMany('Ingredients', [
            'through' => 'RecettesIngredients'
        ]);
    }


    public  function validationDefault(\Cake\Validation\Validator $validator) {
        $validator
            ->notEmpty('nom')
            ->requirePresence('nom');
        return $validator;
    }
}
