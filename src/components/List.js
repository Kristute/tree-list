import React from "react";
import '../assets/main.scss'

class List extends React.Component {

    render(){
        const { name } = this.props;
        return (
                <li className="header">
                    <h3 className="header__title">
                        <div className="folder folder-closed"></div>
                        {name}
                        <div className="more"></div>
                    </h3>
                </li>
        );
    }
}

export default List;