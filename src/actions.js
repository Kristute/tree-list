export const setList = (list) => ({
    type: 'setList',
    list,
});

export const addItem = (itemId, name, entryPoint = false) => ({
    type: 'addItem',
    itemId,
    name,
    entryPoint,
});

export const addChild = (itemId, childId) => ({
    type: 'addChild',
    itemId,
    childId,
});

export const updateTempName = (name) => ({
    type: 'updateTempName',
    name
});

export const updateName = (itemId) => ({
    type: 'updateName',
    itemId
});

export const deleteItem = (itemId) => ({
    type: 'deleteItem',
    itemId
});