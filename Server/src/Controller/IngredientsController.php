<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Controller;

/**
 * Description of IngredientsController
 *
 * @author Dadou
 */
class IngredientsController extends AppController{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }
    
    public function index()
    {
        $queries = $this->request->query;
        $limit = (isset($queries['nb'])) ? $queries['nb'] : 50;
        $search = (isset($queries['s'])) ? $queries['s'] : null;
        
        $conditions = [
            'order' => ['nom' => 'ASC'],
            'limit' => $limit
        ];
        if($search != null){
            $conditions = array_merge($conditions, [
                'conditions' => [
                    'Ingredients.nom LIKE' =>  '%'.$search.'%'
                ]
            ]);
        }
        
        $ingredients = $this->Ingredients->find('all', $conditions);
        $this->set([
            'ingredients' => $ingredients,
            'datas' => $this->request->query,
            '_serialize' => ['ingredients', 'datas']
        ]);
    }
}
