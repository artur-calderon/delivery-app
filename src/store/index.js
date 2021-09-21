import { createStore } from "redux";
import { db } from '../firebase';

let INITIAL_STATE = []

 db.collection('produtos')
    .orderBy('categoria')
    .onSnapshot(data => {
        data.docs.map(item => {
          
         return INITIAL_STATE.push(item.data())
        })
      
    })

  

function reducer(state = INITIAL_STATE, action){
 
  return state
}

export default createStore(reducer);