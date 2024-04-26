import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
    Typography,
    Grid,
} from '@mui/material';

const TagsAndExams = () => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [exams, setExams] = useState([]);
    const [selectedExams, setSelectedExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const tagsResponse = await axios.get('http://localhost:3600/api/questions/getAllTags');
            const tags = tagsResponse.data.map(tag =>  tag.name);
            setTags(tags);
        }
        fetchData();
    }, []);

    const handleTagSelection = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    useEffect(() => {
        async function fetchExams() {
            if (selectedTags.length > 0) {
                const questionResponse = await axios.post('http://localhost:3600/api/mock/exams/getExamsBasedOnTags', {
                    tags: selectedTags
                });
                setExams(questionResponse.data);
            }
        }
        fetchExams();
    }, [selectedTags]);

    const handleExamSelection = (exam) => {
        if (selectedExams.includes(exam._id)) {
            setSelectedExams(selectedExams.filter(selectedExam => selectedExam !== exam._id));
        } else {
            setSelectedExams([...selectedExams, exam._id]);
        }
    };

    const enrollSelectedExams = () => {
        selectedExams.forEach(examId => {
            // Implement your logic to enroll in each exam here
            navigate('/');
            console.log(`Enrolling in exam with ID: ${examId}`);
        });
    };

    return (
        <div className="container mx-auto p-4" style={{ marginTop: '20%' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Select Tags to View Exams
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {tags.map((tag) => (
                    <Grid item key={tag}>
                        <Button
                            variant={selectedTags.includes(tag) ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleTagSelection(tag)}
                            fullWidth // Display the button as full width
                        >
                            {tag}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <h2 className="text-xl font-bold mb-2 mt-6 text-center">Exams</h2>
            <ul className="list-inside space-y-4">
                {exams.map(exam => (
                    <li key={exam._id} className="bg-gray-100 p-4 rounded flex items-center justify-between">
                        <span>
                            <input
                                type="checkbox"
                                checked={selectedExams.includes(exam._id)}
                                onChange={() => handleExamSelection(exam)}
                                className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
                            />
                            {exam.examName}
                        </span>
                    </li>
                ))}
            </ul>
            <button
                className="bg-indigo-500 text-white py-2 px-4 rounded mt-4"
                onClick={enrollSelectedExams}
            >
                Enroll Selected Exams
            </button>
        </div>
    );
};

export default TagsAndExams;