import * as React from "react";
import { Row, Col } from "dadou-react-mat";

import RecetteCard from "./RecetteCard";

import { Recette } from "./../../../modules/Recette/models"

export interface IRecetteListProps {
    recettes: Recette[]
}

class RecetteList extends React.Component<IRecetteListProps, any> {

    render() {
        return (
            <Row>
                {
                    this.props.recettes.map((recette) => {
                        return (
                            <Col m={3} key={recette.__id}>
                                <RecetteCard recette={recette}  />
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }

}

export default RecetteList;