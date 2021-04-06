export const isAuthenticated = (state) => {  
    console.log('GETTER AUT', state)
    return !!state.user
  }
  export const token = (state) => {
    console.log('GETTER TOKEN', state)
    return state.user.token
  }
  