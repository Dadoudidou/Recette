import * as React from "react";
import { Link, IndexLink } from "react-router";
import { Row, Col, Navbar, NavGroupItem, NavItem, Input, Content } from "dadou-react-mat";
import RecetteList from "./components/RecetteList";

import Layout from "src/application/layouts/AppLayout/AppLayout";

import * as models from "src/application/modules/Recette/models";


interface ISearchProps {
    
}

interface ISearchState { }

class Search extends React.Component<ISearchProps, ISearchState>{
    
    render() {

        let recettes: models.Recette[] = [];
        recettes.push(new models.Recette({ titre: "Soupe de légumes", nbParts: 6, description:"un simple texte" }));
        recettes.push(new models.Recette({ titre: "Soupe de légumes", nbParts: 6 }));
        recettes.push(new models.Recette({ titre: "Soupe de légumes", nbParts: 6 }));
        recettes.push(new models.Recette({ titre: "Soupe de légumes", nbParts: 6 }));
        recettes.push(new models.Recette({ titre: "Soupe de légumes", nbParts: 6 }));
        recettes.push(new models.Recette({ titre: "Soupe de légumes", nbParts: 6 }));
        recettes.push(new models.Recette({ titre: "Soupe de légumes", nbParts: 6 }));

        return (
            <Layout>
                <div className="Search">
                    <Navbar>
                        <Row>
                            <NavGroupItem position="right">
                                <NavItem>Préférences</NavItem>
                            </NavGroupItem>
                        </Row>
                        <Row>
                            <Content>
                                <Input type="AutoComplete" placeHolder="Rechercher" />
                            </Content>
                        </Row>
                    </Navbar>
                    <Row>
                        <Col m={9}>
                            <Content>
                                Chips Selected
                            </Content>
                        </Col>
                        <Col m={3}>
                            <Content className="align-right">
                                Sort By Types
                            </Content>
                        </Col>
                    </Row>
                    <RecetteList recettes={recettes} />
                </div>
            </Layout>
        );
    }
}

export default Search;