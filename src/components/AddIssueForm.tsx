import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, AlertColor, Box, Button } from '@mui/material';
import { ADD_ISSUE } from '../graphql/mutations';
import { GET_ISSUES } from '../graphql/queries';
import styles from './AddIssueForm.module.css';

const AddIssueForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const navigate = useNavigate();

  const [addIssue, { loading }] = useMutation(ADD_ISSUE, {
    refetchQueries: [{ query: GET_ISSUES }],
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addIssue({ variables: { title, description, status } });
      setSnackbarMessage('Issue added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTitle('');
      setDescription('');
      setStatus('open');
      setTimeout(() => {
        navigate('/issues');
      }, 1500);
    } catch (err) {
      console.error('Error adding issue:', err);
      setSnackbarMessage('Failed to add issue. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <div>Submitting...</div>;

  return (
    <div>
<Box mb={2} alignSelf="flex-start">
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          style={{ textTransform: 'none', fontWeight: 'bold', marginTop: '10px', marginLeft: '5px' }}
        >
          ← Back to Home
        </Button>
      </Box>
<div className={styles['issue-form-container']}>
      <h2>Add New Issue</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles['form-input']}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles['form-textarea']}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles['form-select']}
          >
            <option value="open">Open</option>
            <option value="inprogress">In-Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <button type="submit" className={styles['add-button']}>
          Add Issue
        </button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
    </div>
   
  );
};

export default AddIssueForm;
