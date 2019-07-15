import * as ActionsType from "./actions";


let initialState = {
	Products: []
};

const reducer = (state = initialState, action)=>
{
	switch (action.type) {
		case ActionsType.FETCH:
			return{
				...state,
				Products: [...action.value]
			};
	}
	return state;
}

export default reducer;