<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Model\Table;

/**
 * Description of RecettesIngredientsTable
 *
 * @author Dadou
 */
class RecettesIngredientsTable extends \Cake\ORM\Table {
    public function initialize(array $config) {
        $this->table("recettes_ingredients");
        $this->belongsTo('Recettes');
        $this->belongsTo('Ingredients');
    }
}
