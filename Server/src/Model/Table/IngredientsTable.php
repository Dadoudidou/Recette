<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Model\Table;

/**
 * Description of IngredientsTable
 *
 * @author Dadou
 */
class IngredientsTable extends \Cake\ORM\Table {
    
    public function initialize(array $config) {
        $this->belongsToMany('Recettes', [
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
