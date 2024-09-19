import React from 'react';
import { Button } from '@mui/material';

const MainPage = () => {
    const openQuestionsInNewTab = () => {
        const questionsPageUrl = '/questions';
        const newTabWindow = window.open(questionsPageUrl, '_blank');
        newTabWindow.focus();
    };

    const openMockTestInNewTab = () => {
        const mockTestPageUrl = '/mock';
        const newTabWindow = window.open(mockTestPageUrl, '_blank');
        newTabWindow.focus();
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '50%',
            margin: 'auto',
            marginTop: '150px', // Add margin-top property
},
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '16px',
        },
        button: {
            width: '45%',
        },
    };

    return (
        <div style={styles.container}>
            <h1>Admin Dashboard</h1>
            <div style={styles.buttonsContainer}>
                <Button
                    variant="contained"
                    onClick={openQuestionsInNewTab}
                    style={styles.button}
                >
                    Add Questions
                </Button>
                <Button variant="contained" onClick={openMockTestInNewTab} style={styles.button}>
                    Add Mock Test
                </Button>
            </div>
        </div>
    );
};

export default MainPage;