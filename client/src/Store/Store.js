import React from "react"

import Reducer from "../Reducer/Reducer"
import {createStore} from "redux"

const store = createStore(Reducer)
export default  store 
