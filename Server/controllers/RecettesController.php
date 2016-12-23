<?php

use Dadou\RestServer\RestException;



/**
 * Description of RecetteController
 *
 * @author Dadou
 */
class RecettesController {

     private function getRecetteInclude($recette){
        $recette->ingredients = $recette->ingredientsList();
        foreach ($recette->ingredients as $ingredient) {
            $ingredient->ingredient = $ingredient->ingredient();
        }
        return $recette;
     }

    /**
     * @url GET /
     * @url GET /$id
     */
    public function index($id = null){
        $db = LessQL\Database::getInstance();
        if($id == null){
            $recettes = $db->recette();
            foreach ($recettes as $recette) {
                $this->getRecetteInclude($recette);
            }
        } else {
            $recettes = $db->recette($id);
            $this->getRecetteInclude($recettes);
        }
        return $recettes;
    }

    /**
     * @url POST /
     * @url PUT /$id
     */
    public function save($id, $data){

        $db = LessQL\Database::getInstance();
        $_data = json_decode(json_encode($data), true);

        //validation
        if(isset($_data["ingredients"])){
            $_data["ingredientsList"] = $_data["ingredients"];
            unset($_data["ingredients"]);
        }

        if($id == null){
            $recette = $db->recette()->createRow($_data);
        } else {
            $recette = $db->recette($id);
            if($recette==null) throw new RestException(500, "Recette inexistante");
            $this->getRecetteInclude($recette);
            //update ingredient a corriger
            $recette->setData($_data);
        }

        try{
        $db->begin();
        $recette->save();
        $db->commit();
        } catch(Exception $e){
            var_dump($db->queries);
            throw new RestException(500, $e->getMessage());
        }
        return $recette;
    }

    /**
     *
     * @url DELETE /$id
     */
    public function delete($id){
        $db = LessQL\Database::getInstance();
        if($id == null) throw new RestException(500, "Id est null");

        $recette = $db->recette($id);
        if($recette == null) return false;

        try{
            $db->begin();
            $recette->delete();
            $db->commit();
        } catch(Exception $e){
            return false;
        }
        return true;
    }


}
