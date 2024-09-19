import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Typography,
    Grid,
} from '@mui/material';

const TagsAndExams = () => {
    const { userId } = useParams();
    const [tags, setTags] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const tagsResponse = await axios.get('http://15.207.223.154:3600/api/questions/getAllTags');
            const tags = tagsResponse.data;
            setTags(tags);
        }
        fetchData();
    }, []);

    // Function to handle tag selection
    const handleTagSelection = (tagId) => {
        if (selectedTagIds.includes(tagId)) {
            // Remove the tag ID if it's already selected
            setSelectedTagIds(selectedTagIds.filter(id => id !== tagId));
        } else {
            // Add the tag ID if it's not already selected
            setSelectedTagIds([...selectedTagIds, tagId]);
        }
    };

    // Function to update the user's tags in the database and navigate to home
    async function enrollSelectedTags() {
        try {
            const response = await axios.put(`http://15.207.223.154:3600/api/users/${userId}`, {
                selectedTagIds
            });
            console.log("Response from server:", response.data);
            // Navigate to the user's home page after successful update
            navigate(`/home/user/${userId}`);
        } catch (error) {
            console.error("Error updating selected tags:", error);
            // Handle error appropriately
        }
    }

    return (
        <div className="container mx-auto p-4" style={{ marginTop: '20%' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Select Tags to View Exams
            </Typography>

            {/* Tags Section */}
            <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
                {tags.map((tag) => (
                    <Grid item key={tag._id}>
                        <Button
                            variant={selectedTagIds.includes(tag._id) ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleTagSelection(tag._id)}
                            fullWidth
                        >
                            {tag.name}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            {/* Enroll Button */}
            <div style={{ marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={enrollSelectedTags}
                >
                    Enroll Selected Tags
                </Button>
            </div>
        </div>
    );
};

export default TagsAndExams;
