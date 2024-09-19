import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const UserHomePage = () => {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [upcomingExams, setUpcomingExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user information and upcoming exams from the server
        async function fetchUserData() {
            try {
                // Fetch user info (replace with your actual API endpoint)
                const userInfoResponse = await axios.get('http://15.207.223.154:3600/api/users/' + userId);
                setUserInfo(userInfoResponse.data);
                // Fetch upcoming exams (replace with your actual API endpoint)
                const examsResponse = await axios.post('http://15.207.223.154:3600/api/mock/exams/getExamsBasedOnTags', {
                    tags : userInfoResponse.data.tags,
                });
                setUpcomingExams(examsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);

    const handleExamClick = (exam) => {
        // Navigate to the exam details page
        navigate(`/exam/${userId}`, { state: exam });
    };

    const handleProfileEdit = () => {
        // Navigate to the profile edit page
        navigate('/profile/edit');
    };

    return (
        <Container style={{ marginTop: '20%' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Your Home Page, {userInfo?.name}
            </Typography>

            {/* User Profile Section */}
            <Card style={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h6">Profile</Typography>
                    <Typography>Name: {userInfo?.displayName}</Typography>
                    <Typography>Email: {userInfo?.email}</Typography>
                    {/* Add more profile info as needed */}
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={handleProfileEdit}>
                        Edit Profile
                    </Button>
                </CardActions>
            </Card>

            {/* Upcoming Exams Section */}
            <Typography variant="h5" style={{ marginBottom: '10px' }}>
                Your Exams
            </Typography>
            <Grid container spacing={2}>
                {upcomingExams.map((exam) => (
                    <Grid item xs={12} md={6} key={exam._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{exam.examName}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleExamClick(exam)}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UserHomePage;
