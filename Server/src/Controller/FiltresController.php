<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Controller;

/**
 * Description of FiltresController
 *
 * @author Dadou
 */
class FiltresController extends AppController {
    
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }
    
    public function index()
    {
        //tables
        $_ingredients = \Cake\ORM\TableRegistry::get("Ingredients");
        
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
                    'nom LIKE' =>  '%'.$search.'%'
                ]
            ]);
        }
        
        $filtres = [];
        
        //recherche dans ingredients
        $ingredients = $_ingredients->find('all', $conditions);
        
        //recherche dans tags
        
        //merge and order
        foreach ($ingredients as $ingredient) {
            array_push($filtres, [ 'type' => 'ingredient', 'filtre' => $ingredient ]);
        }
        
        //reponse
        $this->set([
            'filtres' => $filtres,
            'datas' => $this->request->query,
            '_serialize' => ['filtres', 'datas']
        ]);
    }
}
