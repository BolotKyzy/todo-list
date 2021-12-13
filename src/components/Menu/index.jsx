import React from 'react';
import onDelete from '../../assets/img/delete.svg';
import './Menu.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import {removeCategory} from '../../actions'

const Menu = ({lists,items, isRemovable = false , onClick, onRemove, onClickItem, activeItem, removeCategory} ) => {
  const removeItem = (obj) => {
    if(window.confirm("Are you really want to delete this category? ")) {
      const newList = items.filter(item => item.id !== obj.id);
      axios.delete("http://localhost:3002/lists/"+obj.id).then(() => {
        onRemove(newList);  
      })
    }
    // removeCategory(obj);
    // console.log("neww: ", lists);
    // onRemove(lists);
  }

  const onClickTheitem = (item) =>  {
    if(typeof onClickItem === "function")  onClickItem(item)};
  
    return <ul className = "list" onClick = {onClick}>
      {
        items.map((item, index) => {
          return (
                <li  onClick={() => onClickTheitem(item)} key = {index} className =  {activeItem && activeItem.id === item.id ? "active" : "" }  >
                     <i>
                       {item.img ? <img src={item.img} alt="Menu" /> : <div className = "badge"></div>}
                     </i>
                     <span>{item.name} {item.tasks && ` (${item.tasks.length})`}</span>

                     {isRemovable && <img onClick={()=> removeItem(item)} className='list__remove-icon' src={onDelete} alt="Delete" /> }

                </li>

            
          )
        })
      }


    </ul>

}

const mapStateToProps = (state) => {
  return {
    lists: state.lists
    // tasks: state.tasks
  }

}
const mapDispatchToProps =  (dispatch) => {
  return {
    removeCategory: (obj)=> dispatch(removeCategory(obj))
  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);