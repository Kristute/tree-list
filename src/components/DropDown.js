import React from "react";
import { addNewItem } from "../thunks";
import { connect } from "react-redux";

const DropDown = ({ open, show, id, addNewItem }) => (
    <div className="more" onClick={open}>
        <div className={`dropdown ${show ? 'dropdown--show' : ''}`}>
            <div className="dropdown__item" onClick={() => addNewItem(id)}>Add new</div>
            <div className="dropdown__item">Edit</div>
            <div className="dropdown__item">Delete</div>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    addNewItem: (id) => dispatch(addNewItem(id)),
});

export default connect(
    null,
    mapDispatchToProps,
)(DropDown);
