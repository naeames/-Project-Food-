

const initalState = {
    listUsers : []
}

function Reducer(state = initalState,action) {
   switch(action.type)
   {
       case "LIST_USERS" : 
       return {...state, listUsers:action.payload}
       default : return state 
   }
}

export default Reducer
