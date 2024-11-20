import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './issuesSlice';

const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
