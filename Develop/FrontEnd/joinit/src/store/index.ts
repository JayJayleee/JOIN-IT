import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth'

const store = configureStore({
  reducer: {
    auth : authReducer.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;