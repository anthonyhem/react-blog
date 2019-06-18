import JsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());
	const userIds = _.uniq(_.map(getState().posts, 'userId'));
	userIds.forEach(id => dispatch(fetchUser(id)));
}

export const fetchPosts = () => async (dispatch) => {
		const response = await JsonPlaceholder.get('/posts');

		dispatch({
			type: 'FETCH_POSTS',
			payload: response.data
		});
	};

//returns a function that returns fetchUser called
// export const fetchUser = (id) => (dispatch) => _fetchUser(id,dispatch);

// //this underscore tells others that this is a function to only be 
// //called internally 
// const _fetchUser = _.memoize(async(id, dispatch) => {
// 	const response = await JsonPlaceholder.get(`/users/${id}`);

// 	dispatch({
// 		type: 'FETCH_USER',
// 		payload: response.data
// 	})
// });

export const fetchUser = id => async dispatch => {
	const response = await JsonPlaceholder.get(`/users/${id}`);
	dispatch({ type: 'FETCH_USER', payload: response.data });
}