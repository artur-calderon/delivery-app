import { orderBy } from 'firebase/firestore'
import { db, collection, onSnapshot, query } from '../../firebase'

let INITIAL_STATE = []
const q = query(collection(db, 'produtos'), orderBy('categoria'))
onSnapshot(q, res => {
  res.docs.map(item => {
    return INITIAL_STATE.push(item)
  })
})

export default function Procuct(state = INITIAL_STATE, action) {
  return state
}
