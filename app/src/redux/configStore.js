import {applyMiddleware, combineReducers, createStore} from 'redux'
import LoadingReducer from './reducers/LoadingReducer'
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './sagas/rootSaga';
import UserReducer from './reducers/UserReducer';
import ProjectReducer from './reducers/ProjectReducer';
import DrawerReducer from './reducers/DrawerReducer';
import IssueReducer from './reducers/IssueReducer';
import ModalReducer from './reducers/ModalReducer';
import CommentReducer from './reducers/CommentReducer';

const middlewareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
    LoadingReducer,
    UserReducer,
    ProjectReducer,
    DrawerReducer,
    IssueReducer,
    ModalReducer,
    CommentReducer
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));
middlewareSaga.run(rootSaga);

export default store;