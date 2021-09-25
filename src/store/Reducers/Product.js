import { db } from '../../firebase'

let INITIAL_STATE = []

db.collection('produtos')
  .orderBy('categoria')
  .onSnapshot(data => {
    data.docs.map(item => {
      return INITIAL_STATE.push(item)
    })
  })

export default function Procuct(state = INITIAL_STATE, action) {
  return state
}
