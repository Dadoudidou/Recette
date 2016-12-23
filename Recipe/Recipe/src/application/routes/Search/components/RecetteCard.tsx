import * as React from "react";
import { Card, CardActions, CardText, CardTitle } from "dadou-react-mat";

import { Recette } from "./../../../modules/Recette/models"

export interface IRecetteCardProps {
    recette: Recette
}

class RecetteCard extends React.Component<IRecetteCardProps, any> {

    render() {
        return (
            <Card height={300}>
                <CardTitle textBottom>
                    <h5>{this.props.recette.titre}</h5>
                </CardTitle>
                <CardText>
                    {this.props.recette.description}
                </CardText>
                <CardActions>
                    
                </CardActions>
            </Card>
        );
    }

}

export default RecetteCard;