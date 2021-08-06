import {
	SET_SCREAMS,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	LOADING_DATA,
	DELETE_SCREAM,
	POST_SCREAM,
	SET_SCREAM,
	SUBMIT_COMMENT,
} from '../types'
//for immutable rule
import produce from 'immer'

const initialState = {
	screams: [],
	scream: {},
	loading: false,
}

// after using 'immer' it can be mutable
export default produce((state, action) => {
	switch (action.type) {
		case LOADING_DATA:
			state.loading = true
			return
		// return {
		// 	...state,
		// 	loading: true,
		// }
		case SET_SCREAMS:
			state.screams = action.payload
			state.loading = false
			return
		// return {
		// 	...state,
		// 	screams: action.payload,
		// 	loading: false,
		// }
		case SET_SCREAM:
			state.scream = action.payload
			return
		// return {
		// 	...state,
		// 	scream: action.payload,
		// }
		case LIKE_SCREAM:
		case UNLIKE_SCREAM:
			let index = state.screams.findIndex(
				(scream) => scream.screamId === action.payload.screamId
			)
			state.screams[index] = action.payload
			return
		// return {
		// 	...state,
		// }
		case DELETE_SCREAM:
			index = state.screams.findIndex(
				(scream) => scream.screamId === action.payload
			)
			state.screams.splice(index, 1)
			return
		// return {
		// 	...state,
		// }
		case POST_SCREAM:
			state.screams = [action.payload, ...state.screams]
			return
		// return {
		// 	...state,
		// 	screams: [action.payload, ...state.screams],
		// }
		case SUBMIT_COMMENT:
			let indexComment = state.screams.findIndex(
				(scream) => scream.screamId === action.payload.screamId
			)
			let commentCount = state.screams[indexComment].commentCount + 1
			state.screams[indexComment] = {
				...state.screams[indexComment],
				commentCount: commentCount,
			}
			return
		// return {
		// 	...state,
		// 	scream: {
		// 		...state.scream,
		// 		comments: [action.payload, ...state.scream.comments],
		// 		commentCount: state.scream.commentCount + 1,
		// 	},
		// }
		default:
			return state
	}
}, initialState)
