<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Controller;

/**
 * Description of RecipesController
 *
 * @author Dadou
 */
class RecettesController extends AppController {
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }
    
    public function index()
    {
        //gestion des filtres
        $filtres = $this->request->query("filtres");
        if($filtres == NULL) {
            $filtres = [];
        } else {
            $filtres = explode("|", $filtres);
        }
        //debug($filtres);
        $filtresIngredients = array();
        for($i=0; $i<count($filtres); $i++){
            list($type, $id) = explode(',',$filtres[$i]);
            if(strtoupper($type) == "INGREDIENT"){
                array_push($filtresIngredients, $id);
            }
            $filtres[$i] = [ 'type' => $type, 'filtre' => [ 'id' => $id ] ];
        }
        
        
        $queries = $this->request->query;
        $limit = (isset($queries['nb'])) ? $queries['nb'] : 50;
        $search = (isset($queries['s'])) ? $queries['s'] : null;
        
        $conditions = [
            'contain' => ['Ingredients'],
            'order' => ['Recettes.nom' => 'ASC'],
            'limit' => $limit
        ];
        
        $recettes = $this->Recettes->find('all', $conditions)->distinct(['Recettes.id']);
        //match ingredients
        if(count($filtresIngredients) > 0){
            $recettes->matching('Ingredients', function($q) use($filtresIngredients){
                return $q->where([ 
                    'Ingredients.id IN' => $filtresIngredients
                ]);
            });
        }
        
        $_recettes = $recettes->toArray();
        $recettes = array();
        foreach($_recettes as $_recette){
            //test ingredients
            $testIngredient = false;
            if(count($filtresIngredients) > 0){
                $ids = array_map(function($n){ return $n->id; }, $_recette->ingredients);
                $array_diff = array_diff($filtresIngredients, $ids);
                if(count($array_diff) == 0){
                    $testIngredient = true;
                }
            } else {
                $testIngredient = true;
            }
            
            
            if($testIngredient == true){
                array_push($recettes, $_recette);
            }
        }
        
        $this->set([
            'recettes' => $recettes,
            'filtres' => $filtres,
            '_serialize' => ['recettes']
        ]);
    }
    
    public function view($id)
    {
        $recipe = $this->Recettes->get($id, [
            'contain' => ['Ingredients']
        ]);
        $this->set([
            'recette' => $recipe,
            '_serialize' => ['recette']
        ]);
    }
    
    public function add()
    {
        $recipe = $this->Recettes->newEntity($this->request->data, [
            'associated' => 'Ingredients'
        ]);
        if ($this->Recettes->save($recipe)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            'recette' => $recipe,
            '_serialize' => ['message', 'recette']
        ]);
    }

    public function edit($id)
    {
        $recipe = $this->Recettes->get($id, [
            'contain' => ['Ingredients']
        ]);
        if ($this->request->is(['post', 'put'])) {
            $recipe = $this->Recettes->patchEntity($recipe, $this->request->data, [
                'associated' => ['Ingredients']
            ]);
            if ($this->Recettes->save($recipe)) {
                $message = 'Saved';
            } else {
                $message = 'Error';
            }
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }

    public function delete($id)
    {
        $recipe = $this->Recettes->get($id);
        $message = 'Deleted';
        if (!$this->Recettes->delete($recipe)) {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }
}
