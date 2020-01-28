const initialStateOfList = {
    list: [],
    tempName: null
};

const listReducer = (state = initialStateOfList, action) => {
    switch (action.type) {
        case 'setList': return {
            ...state,
            list: action.list,
        };
        case 'updateTempName': return {
            ...state,
            tempName: action.name
        };
        case 'addItem': return {
            ...state,
            list: [
                ...state.list,
                {
                    name: action.name,
                    subOptions: [],
                    id: action.itemId,
                    entryPoint: action.entryPoint,
                }
            ],
        };
        case 'addChild':
            const itemIndex = state.list.findIndex(item => item.id === action.itemId);

            if (itemIndex === -1) {
                return { ...state }
            }

            const listCopy = [...state.list];
            listCopy[itemIndex].subOptions = [...listCopy[itemIndex].subOptions, action.childId];

            return {
                ...state,
                list: listCopy
            };
        case 'updateName': {
            const itemIndex = state.list.findIndex(item => item.id === action.itemId);
            if (itemIndex === -1) {
                return { ...state }
            }

            const listCopy = [...state.list];
            listCopy[itemIndex].name = state.tempName;
            const resetedTempName = null;

            return {
                ...state,
                list: listCopy,
                tempName: resetedTempName,
            }
        }
        case 'deleteItem': {
            const itemIndex = state.list.findIndex(item => item.id === action.itemId);

            if (itemIndex === -1) {
                return { ...state }
            }

            const listCopy = [...state.list];
            listCopy.splice(itemIndex, 1);

            const parentIndex = listCopy.findIndex(item => item.subOptions.includes(action.itemId));

            if (parentIndex === -1) {
                return {
                    ...state,
                    list: listCopy,
                }
            }

            return { ...state }
            // delete all children
        }


        default: return state;
    }
};

export default listReducer;