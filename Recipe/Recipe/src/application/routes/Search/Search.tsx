import * as React from "react";
import { Link, IndexLink } from "react-router";
import { Row, Col, Navbar, NavGroupItem, NavItem, Input, Content, Chip, Preloader } from "dadou-react-mat";
import RecetteList from "./components/RecetteList";

import Layout from "src/application/layouts/AppLayout/AppLayout";

import * as models from "src/application/modules/Recette/models";


interface ISearchProps {
    onInit?: () => void
    onSelect?: (item: models.Recette) => void
    onSearchRecettes?: (filtres: models.Filtre[]) => void
    onSearchFiltre?: (value: string) => void
    onAddFiltre?: (filtre: models.Filtre) => void
    onRemoveFiltre?: (filtre: models.Filtre) => void

    filtres?: models.Filtre[]
    recettesSearches?: models.Recette[]
    filtresSearches?: models.Filtre[]

    isSearchingRecette?: boolean
}

interface ISearchState { }

class Search extends React.Component<ISearchProps, ISearchState>{

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onRemoveFiltre = this.onRemoveFiltre.bind(this);
    }

    componentDidMount() {
        if (this.props.onInit) this.props.onInit();
    }

    //#region AUTO COMPLETE

    matchItem(item: models.Filtre, value: string): boolean {
        return true;
    }

    renderItem(item: models.Filtre): React.ReactNode {
        return (
            <div>
                <div className={"chip chip_" + item.type}>{item.type}</div>
                <span>{item.filtre.nom}</span>
            </div>
        );
    }

    renderItemSelected(item: models.Filtre): string {
        return "";
    }

    sortItem(item1: models.Filtre, item2: models.Filtre): number {
        return 0;
    }

    onSelect(item: models.Filtre) {
        if (this.props.onAddFiltre)
            this.props.onAddFiltre(item);
        if (this.props.onSearchRecettes) {
            var filtres = this.props.filtres;
            if (filtres == undefined) filtres = [];
            filtres.push(item);
            this.props.onSearchRecettes(filtres);
        }
    }

    onSearch(evt: React.FormEvent<any>) {
        let input = evt.target as HTMLInputElement;
        if (input.value.trim() != "") {
            if (this.props.onSearchFiltre) this.props.onSearchFiltre(input.value);
        }
    }

    //#endregion

    onRemoveFiltre(filtre: models.Filtre) {
        if (this.props.onRemoveFiltre)
            this.props.onRemoveFiltre(filtre);
    }

    render() {
        let __this = this;
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
                                <Input type="AutoComplete" placeHolder="Rechercher"
                                    onChange={this.onSearch}
                                    customs={{
                                        autoComplete: {
                                            items: this.props.filtresSearches,
                                            matchItem: this.matchItem,
                                            onSelect: this.onSelect,
                                            renderItem: this.renderItem,
                                            renderItemSelected: this.renderItemSelected,
                                            sortItem: this.sortItem
                                        }
                                    }} />
                            </Content>
                        </Row>
                    </Navbar>
                    <Row>
                        <Col m={9}>
                            <Content>
                                {
                                    (this.props.filtres && this.props.filtres.length > 0) ?
                                        this.props.filtres.map((filtre) => {
                                            let _classname = ['chip', 'chip_' + filtre.type];
                                            return (
                                                <div className={_classname.join(' ')} key={filtre.type + "_" + filtre.filtre.id}>
                                                    {filtre.filtre.nom} <a title="Retirer" onClick={() => { __this.onRemoveFiltre(filtre) } }><i className="fa fa-close" /></a>
                                                </div>
                                            );
                                        })
                                        :
                                        ""
                                }
                            </Content>
                        </Col>
                        <Col m={3}>
                            <Content className="align-right">
                                Sort By Types
                            </Content>
                        </Col>
                    </Row>
                    <div className="container">
                        {
                            (this.props.isSearchingRecette == true) ?
                                <div className="text-center">
                                    <Preloader />
                                </div>
                                :
                                <RecetteList recettes={this.props.recettesSearches} />
                        }
                    </div>
                </div>
            </Layout>
        );
    }
}

import { connect } from "react-redux";
import { ISearchReducer } from "./reducer";
import * as actions from "./actions";

const mapStateToProps = (state: ISearchReducer): ISearchProps => {
    return {
        recettesSearches: state.Search.get("recettes").toArray(),
        filtres: state.Search.get("filtres").toArray(),
        filtresSearches: state.Search.get("search_filtres").toArray(),
        isSearchingRecette: state.Search.get("searching_recettes")
    };
}

const mapDispatchToProps = (dispatch): ISearchProps => {
    return {
        onInit: () => {
            //dispatch(actions.search({filtres: []}));
        },
        onSearchFiltre: (value: string) => {
            dispatch(actions.searchFiltres(value));
        },
        onAddFiltre: (item: models.Filtre) => {
            dispatch(actions.addFiltre(item));
        },
        onRemoveFiltre: (item: models.Filtre) => {
            dispatch(actions.removeFiltre(item));
        },
        onSearchRecettes: (filtres: models.Filtre[]) => {
            dispatch(actions.search({ filtres: filtres }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);