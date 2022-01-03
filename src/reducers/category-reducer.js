
const initialState =  [
    {
      "id": 1,
      "name": "Shopping"
    },
    {
      "id": 2,
      "name": "Front-End"
    }
]

const deleteList = (items,obj) => {
     const newList = items.filter(item => item.id !== obj.id);
     console.log("newList:", newList);
     return newList;

}
const CategoryReducer = (state = initialState, action ) => {
    // const fu = (data) => {
    //     return data;
    // }

 
// console.log(fetchAllCategories());
    switch(action.type) {
        case 'FETCH_DATA':
            state = [...state, ...action.payload];
            return state;
        case 'REMOVE_CATEGORY':
            return deleteList(state, action.payload);
        default:
            return state; 
    }

}

export default CategoryReducer;