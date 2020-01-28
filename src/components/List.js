import React from 'react';
import DropDown from "./DropDown";
import { updateTempName, updateName } from "../actions"
import { connect } from "react-redux";

const _List = ({ list, filter, openMore, openMoreId, name, updateTempName, updateName }) => {
    return list
        .filter(filter)
        .map(item => {
            return (
                <ul key={item.id}>
                    <li className="list__item">
                        {item.name !== null
                            ? (
                                <div className="list__title">
                                    <span className="folder folder-closed" />
                                    {item.name}
                                    <DropDown
                                        open={() => openMore(item.id)}
                                        show={openMoreId === item.id}
                                        id={item.id}
                                    />
                                </div>
                            )
                            : (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter new title"
                                        className="list__newItem"
                                        onChange={(event) => updateTempName(event.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="button"
                                        onClick={() => updateName(item.id)}
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                    </li>
                    {item.subOptions.length > 0
                        ? (
                            <List
                                filter={(mainListItem) => item.subOptions.includes(mainListItem.id)}
                                list={list}
                                openMore={openMore}
                                openMoreId={openMoreId}
                            />
                        )
                        : null
                    }
                </ul>
            )
        })
};

const mapStateToProps = (state) => ({
    name: state.tempName,
});

const mapDispatchToProps = (dispatch) => ({
    updateName: (itemId) => dispatch(updateName(itemId)),
    updateTempName: (name) => dispatch(updateTempName(name)),
});

const List = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_List);

export default List;