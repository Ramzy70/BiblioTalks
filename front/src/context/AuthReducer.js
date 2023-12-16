const AuthReducer = (state,action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching: true,
                error:false
            }
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isFetching: false,
                error:false
            }
        case "LOGIN_FAILURE":
            return{
                user:null,
                isFetching: false,
                error:action.payload
            }
        case "LOGOUT":
            return{
                user:null,
                isFetching: false,
                error:false
            }
        case "WISHLIST":
            return{
                ...state,
                user:{
                    ...state.user,
                    wishList:[...state.user.wishList,action.payload]
                }
            }
        case "UNWISHLIST":
            return{
                ...state,
                user:{
                    ...state.user,
                    wishList:state.user.wishList.filter(bookItem=> bookItem !== action.payload)
                }
            }
        default:
            return state
    }
}

export default AuthReducer