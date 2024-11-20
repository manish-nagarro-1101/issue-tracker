import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';
import { RootState } from '../store';
import { setIssues, setLoading } from '../store/issuesSlice';
import { GET_ISSUES } from '../graphql/queries';
import { UPDATE_ISSUE, DELETE_ISSUE } from '../graphql/mutations';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const IssueList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { issues, loading } = useSelector((state: RootState) => state.issues);
  const { data, loading: apolloLoading, error } = useQuery(GET_ISSUES, {
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  const [updateIssue] = useMutation(UPDATE_ISSUE);
  const [deleteIssue] = useMutation(DELETE_ISSUE);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ title: '', description: '', status: '' });

  useEffect(() => {
    if (apolloLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (data && data.issues) {
      dispatch(setIssues(data.issues));
    }
  }, [data, apolloLoading, dispatch]);

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = (issue: any) => {
    setEditingId(issue._id);
    setEditValues({ title: issue.title, description: issue.description, status: issue.status });
  };

  const handleSave = async (id: string) => {
    try {
      await updateIssue({
        variables: {
          id,
          title: editValues.title,
          description: editValues.description,
          status: editValues.status,
        },
      });
      dispatch(setIssues(
        issues.map(issue =>
          issue._id === id ? { ...issue, ...editValues } : issue
        )
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating the issue:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (issueId: string) => {
    const issueToDelete = issues.find(issue => issue._id === issueId);
  
    if (!issueToDelete) {
      console.error('Issue not found');
      return;
    }
  
    const confirmDelete = window.confirm(`Are you sure you want to delete the issue "${issueToDelete.title}"?`);
  
    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await deleteIssue({ variables: { id: issueId } });
      if (response.data) {
        dispatch(setIssues(issues.filter(issue => issue._id !== issueId)));
        console.log('Issue deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Box mb={2} alignSelf="flex-start">
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          style={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          ← Back to Home
        </Button>
      </Box>
  
      {issues.length === 0 ? (
        <div style={{ marginTop: '20px', fontWeight: 'bold', color: '#555' }}>
          Add an item to see it in the list here.
        </div>
      ) : (
        <TableContainer component={Paper} style={{ maxWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>SR. NO</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Title</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Description</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue, index) => (
                <TableRow key={issue._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {editingId === issue._id ? (
                      <TextField
                        value={editValues.title}
                        onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      issue.title
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === issue._id ? (
                      <TextField
                        value={editValues.description}
                        onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      issue.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === issue._id ? (
                      <TextField
                        value={editValues.status}
                        onChange={(e) => setEditValues({ ...editValues, status: e.target.value })}
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      issue.status
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === issue._id ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleSave(issue._id)}
                          style={{ marginRight: '10px' }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleEdit(issue)}
                          style={{ marginRight: '10px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => handleDelete(issue._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
  
};

export default IssueList;
