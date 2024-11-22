import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
      user: { id: null,name:null, role: null, },
      admin:{id:null,name:null,role:null}
      
  },
  reducers: {
    setUser: ((state,action)=>{state.user=action.payload}),
      removeUser: (state => { state.user = { id: null,name:null, role: null } }),
      setAdmin: ((state,action)=>{state.admin=action.payload}),
    removeAdmin: (state=>{state.admin={ id: null,name:null, role: null }})
  }
})


export const { setUser,setAdmin,removeAdmin,removeUser } = userSlice.actions

export default userSlice.reducer