import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './StateSlice';

export default configureStore({
    reducer: shoppingCartReducer
})
