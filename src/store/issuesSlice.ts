import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface IssuesState {
  issues: Issue[];
  loading: boolean;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setIssues, setLoading } = issuesSlice.actions;

export default issuesSlice.reducer;
