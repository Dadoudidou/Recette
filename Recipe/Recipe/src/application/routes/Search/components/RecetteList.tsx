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
                    (this.props.recettes.length > 0) ?
                    this.props.recettes.map((recette) => {
                        return (
                            <Col m={3} key={recette.id}>
                                <RecetteCard recette={recette}  />
                            </Col>
                        );
                        }) :
                        <Col m={12}>
                            <div className="text-center">
                                Aucnune recette trouvée
                            </div>
                        </Col>
                }
            </Row>
        );
    }

}

export default RecetteList;