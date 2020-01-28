import axios from 'axios';
import {addChild, setList, addItem} from './actions';

export const loadInitialData  = () => (dispatch) => {
    return axios
        .get(`http://www.mocky.io/v2/5e2f5c4e310000680071074a`)
        .then((response) => {
            dispatch(setList(response.data.results));
        });
};

export const addNewItem = (parentId, entryPoint = false) => (dispatch, getState) => {
    const newId = Math.max(...getState().list.map(item => item.id), 0) + 1;
    const name = getState().tempName === null ? null : getState().tempName;
    dispatch(addItem(newId, name, entryPoint));
    dispatch(addChild(parentId, newId));
}
