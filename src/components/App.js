import React from 'react';
import '../App.css';
import axios from 'axios';
import '../assets/main.scss'

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            list: [],
            openDropdown: null,
            name: '',
            selectedParent: null,
        };
    }

    componentDidMount() {
        axios.get(`http://www.mocky.io/v2/5e2c90153100008300267f43`)
            .then(response => {
                this.setState({
                    list: response.data.results,
                });
            })
    }

    nestedElements = list => {
        return list.map(item => {
            const dropdownClass = ["dropdown"];
            if(item.name === this.state.openDropdown) {
                dropdownClass.push('dropdown--show');
            }
            return (
                <ul>
                    <li className="list__item">
                        {item.name !== null
                            ? (
                                <div className="list__title">
                                    <div className="folder folder-closed"></div>
                                    {item.name}
                                    <div className="more" onClick={this.openMore.bind(this)} data-id={item.name}>
                                        <div className={dropdownClass.join(' ')}>
                                            <div className="dropdown__item" onClick={this.addNewItem.bind(this)} data-id={item.name}>Add new</div>
                                            <div className="dropdown__item">Edit</div>
                                            <div className="dropdown__item" onClick={this.deleteItem.bind(this)} data-id={item.name}>Delete</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        : (
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter new title"
                                    className="list__newItem"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                />
                                <button
                                    type="submit"
                                    className="button"
                                    onClick={(e) => this.onSubmit(e)}
                                >
                                    Add
                                </button>
                            </div>
                            )}
                    </li>
                    {item.subOptions.length > 0 ? this.nestedElements(item.subOptions) : null}
                </ul>
            );
        });
    };

    openMore = (e) => {
        this.setState({openDropdown: e.currentTarget.dataset.id});
    };

    addNewItem = e => {
        const updatedList = this.updateStateWithNewInput(this.state.list, e.currentTarget.dataset.id);
        console.log(updatedList, this.state.list)
        this.setState({ selectedParent: e.currentTarget.dataset.id });
    };

    updateStateWithNewInput = (list, name) => {
        return list.map((item) => {
            if (item.name === name) {
                item.subOptions.push({
                    name: null,
                    subOptions: [],
                })
            }

            return {
                name: item.name,
                subOptions: this.updateStateWithNewInput(item.subOptions, name)
            };
        })
    };

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const updatedList = this.updateStateOnSubmit(this.state.list);
        this.setState({ list: updatedList });
    };

    updateStateOnSubmit = (list) => {
        return list.map((item) => {
            if (item.name === this.state.selectedParent) {

            const index = item.subOptions.findIndex(item => item.name === null );
            if (index !== -1) {
                    item.subOptions[index].name = this.state.name;
                    this.setState({name: ''});
                }
            }

            return {
                name: item.name,
                subOptions: this.updateStateOnSubmit(item.subOptions)
            };
        })
    };

    deleteItem = e => {
        const updatedList = this.updateStateWithNewList(this.state.list, e.currentTarget.dataset.id);
        this.setState({
            list: updatedList
        });
    };

    updateStateWithNewList = (list, name) => {
        const index = list.findIndex(item => item.name === name);
        if (index !== -1) {
            list.splice(index, 1);

            return list;
        }

        return list.map(item => ({
            name: item.name,
            subOptions: this.updateStateWithNewList(item.subOptions, name)
        }));
    };

    submitNewItem = () => {

    };

    render ()
    {
        return (
            <div className="App">
                <div className="header header--fixed">
                    <div className="header__title">
                        Layers <span className="layers_number">476</span>
                        <div className="more"></div>
                        <div className="refresh"></div>
                    </div>
                </div>

                <div className="wrapper">
                    {this.nestedElements(this.state.list)}
                </div>
            </div>
        );
    }
}

export default App;
