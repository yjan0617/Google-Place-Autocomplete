import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer, { RootState } from '../reducers';
import rootEpic from '../epics';
import { AnyAction } from 'redux';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

export default store;
export type { RootState };  // Ensure RootState is exported
