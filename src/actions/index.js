import axios from "axios";

const fetchData = () =>  async dispatch => {
    const res = await axios.get("http://localhost:3002/lists?_embed=tasks");

    dispatch( {
        type: 'FETCH_DATA',
        payload: res.data
    })
}
const removeCategory = (obj) => async dispatch => {
    if(window.confirm("Are you really want to delete this category? ")) {
        await axios.delete("http://localhost:3002/lists/"+obj.id);
        dispatch( {
            type: 'REMOVE_CATEGORY',
            payload: obj
        })
    }
    console.log(obj);
}

const addCategory = (name, desc, imgUrl) => {
    return {
        type: 'ADD_NEW_CATEGORY',
        payload: [name, desc, imgUrl]

    }
}
// const addedToFavoriteList = (pokemon) => {
//     return {
//         type: 'ADDED_TO_FAVORITE_LIST',
//         payload: pokemon
//     }

// }
export {
    fetchData,
    removeCategory 
    // addData, 
    // addedToFavoriteList
};