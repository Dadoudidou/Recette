<?php
    //require 'bootstrap.php';
    //libs
    require(__DIR__.'/libs/restServer/RestServer.php');
    use Dadou\RestServer\RestServer;


    //require(__DIR__.'/libs/MysqliDb/MysqliDb.php');
    //require(__DIR__.'/libs/MysqliDb/dbObject.php');


    //controllers
    //require(__DIR__.'/controllers/TestController.php');
    //require(__DIR__.'/controllers/IngredientsController.php');
    require(__DIR__.'/controllers/RecettesController.php');

    //require(__DIR__.'/models/mappers/RecetteMapper.php');

    //dto
    //require(__DIR__.'/models/dto/Ingredient.php');
    //require(__DIR__.'/models/dto/RecetteIngredient.php');
    //require(__DIR__.'/models/dto/Recette.php');

    //bdd
    //require(__DIR__.'/models/bdd/Recette.php');
    //require(__DIR__.'/models/bdd/RecetteIngredient.php');
    //require(__DIR__.'/models/bdd/Ingredient.php');

    //use models\Ingredient;
    //use models\Recette;
    //use models\RecetteIngredient;

    //$db = new MysqliDb("192.168.1.12", "recipes", "recipes@dadou", "app_recipes");

    // http://lessql.net/guide
    require 'libs/Lessql/JsonSerializable.php';
    require 'libs/Lessql/Database.php';
    require 'libs/Lessql/Literal.php';
    require 'libs/Lessql/Result.php';
    require 'libs/Lessql/Row.php';
    require 'libs/Lessql/DbObject.php';

    require 'datas/models/Recette.php';
    require 'datas/models/IngredientQuantite.php';
    require 'datas/models/Ingredient.php';


    $connection = new PDO("mysql:dbname=recipes;host=127.0.0.1", "root");
    $db = new \LessQL\Database( $connection );

    $db->setAlias("ingredients", "ingredientsquantites");
    $db->setPrimary("ingredientsquantites", array("ingredient_id", "recette_id"));
    //$db->setBackReference("ingredientsquantites", "ingredients", "recette_id");
    //$db->setReference("ingredientsquantites", "ingredient", "ingredient_id");

    $server = new RestServer('debug');
    //$server->addClass('TestController');
    //$server->addClass('IngredientsController', '/ingredients');
    $server->addClass('RecettesController', '/recettes');
    $server->handle();



    //$recette = new datas\models\Recette();
    //$recette->nom = "coucou";
    //$recette->save();

    //$recette = datas\models\Recette::getById(2);
    //$recette->addIngredient("", 50, "ml");
    //$recette->save();
    //$recette->delete();
    //$recette = new \datas\models\Recette();
    //$ingr3 = new datas\models\Ingredient(array("nom" => "ingre03"));
    //$recette->addIngredient($ingr3, 10, "ml");


    /*$recette = new \datas\models\Recette();
    $recette->nom = "sqsfdfgerg";
    $ingr3 = new datas\models\Ingredient(array("nom" => "ingre03"));
    $recette->addIngredient($ingr3, 10, "ml");*/


    /*$recette = new \datas\models\Recette(array(
            'nom' => 'essai',
            'ingredientsquantitesList' => array(
                array(
                    'ingredient' => array('nom' => 'ingre01')
                ),
                array(
                    'ingredient' => array('nom' => 'ingre02')
                )
            )
        ));*/
    /*try {
        //$ingr3->save();
        $recette->save();
    } catch(Exception $e){
        echo "<pre>";
        var_dump($e->getMessage());
        echo "</pre>";
    }

    echo "<pre>";
    //echo json_encode($recette->jsonSerialize());
    var_dump($recette->getDatas());
    var_dump($recette->getDB()->queries);
    var_dump($recette->getDB());
    echo "</pre>";*/








