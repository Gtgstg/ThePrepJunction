import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

const ExamDetailsPage = () => {
    const { userId } = useParams();
    const location = useLocation();
    const examState = location.state;
    const [selectedQuestionIds, setSelectedQuestionIds] = useState('');
    const navigate = useNavigate();

    // Handle starting the test
    const handleStartTest = () => {
        if (selectedQuestionIds) {
            // Navigate to the test-taking page for the selected test
            navigate(`/quiz/${userId}`, { state: selectedQuestionIds });
        } else {
            console.log('No Active Questions');
        }
    };

    // Handle selection of a test from the dropdown menu
    const handleTestChange = (event) => {
        setSelectedQuestionIds(event.target.value);
    };

    // Render the exam details and the option to select and start a test
    return (
        <Container style={{ paddingTop: '200px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{examState.examName}</Typography>
                    <Typography variant="body1">Mock Tests:</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="select-test-label">Select Test</InputLabel>
                        <Select
                            labelId="select-test-label"
                            value={selectedQuestionIds}
                            onChange={handleTestChange}
                        >
                            {examState.mockTests.map((test) => (
                                <MenuItem key={test._id} value={test.questions}>
                                    {test.testName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
            <Button variant="contained" color="primary" onClick={handleStartTest}>
                Start Test
            </Button>
        </Container>
    );
};

export default ExamDetailsPage;
