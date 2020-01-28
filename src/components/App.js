import React from 'react';
import '../App.css';
import { connect } from "react-redux";
import '../assets/main.scss'
import { loadInitialData } from "../thunks";
import List from "./List";

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            openDropdown: null,
            selectedParent: null,
        };
    }

    componentDidMount() {
        this.props.loadInitialData();
    }

    renderList = () => {
        return (
            <List
                filter={item => item.entryPoint === true}
                list={this.props.list}
                openMore={this.openMore}
                openMoreId={this.state.openDropdown}
            />
        );
    };

    openMore = (id) => {
        this.setState({openDropdown: id});
    };

    render ()
    {
        return (
            <div className="App">
                <div className="header header--fixed">
                    <div className="header__title">
                        Layers <span className="layers_number">476</span>
                        <span className="more" />
                        <span className="refresh" />
                    </div>
                </div>

                <div className="wrapper">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.list,
});

const mapDispatchToProps = (dispatch) => ({
    loadInitialData: () => dispatch(loadInitialData()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
