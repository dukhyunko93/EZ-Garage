  
export default function manageUser(state = {
    user: [],
    total_earning: null,
    address: []
  }, action) {
    switch (action.type) {
      
      case 'SAVE_USER':
        return {
          ...state,
          user:[ action.user ]
        }

      case 'SAVE_EARNING':
        return {
          ...state,
          total_earning: action.total_earning 
        }

      case 'SAVE_ADDRESS':
        return {
          ...state,
          address: [action.address]
        }
      
  
      default:
        return state;
    }
  }