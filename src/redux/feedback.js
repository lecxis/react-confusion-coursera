import * as ActionTypes from './ActionTypes';

export const feedback=(state = {
    isLoading:true,
    errMess: null,
    feedback: []

}, action)=>{
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACK:
          var feed = action.payload;
          return { ...state, feedback: state.feedback.concat(feed)};

        default:
          return state;
      }

}