import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mock.css';

const Mock = () => {
    const [questionsList, setQuestionList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [newCourseName, setNewCourseName] = useState('');
    const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false);
    const [courseNameToAddMock, setCourseNameToAddMock] = useState('');
    const [newMockTestName, setNewMockTestName] = useState('');

    useEffect(() => {
        async function fetchData() {
            const tagsResponse = await axios.get('http://localhost:3600/api/questions/getAllTags');
            setTagList(tagsResponse.data);
            const coursesResponse = await axios.get('http://localhost:3600/api/mock/courses/getAllCourses');
            setCoursesList(coursesResponse.data);
            console.log(coursesList);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchQuestions() {
            if (selectedTags.length > 0) {
                const questionResponse = await axios.post('http://localhost:3600/api/questions/getQuestionsForTags', {
                    tags: selectedTags
                });
                setQuestionList(questionResponse.data);
            }
        }
        fetchQuestions();
    }, [selectedTags]);

    const handleTagSelection = (selectedTags) => {
        setSelectedTags(selectedTags);
    };

    const handleQuestionSelection = (questionId) => {
        const updatedQuestions = selectedQuestions.includes(questionId)
            ? selectedQuestions.filter(id => id !== questionId)
            : [...selectedQuestions, questionId];
        setSelectedQuestions(updatedQuestions);
    };

    const createMockTest = async () => {
        // Implement logic to create a mock test using selected questions
        const response = await axios.post('http://localhost:3600/api/mock/courses/addMock', {
            courseName: courseNameToAddMock,
            mockTestName: newMockTestName,
            questions : selectedQuestions
        });
        console.log('Selected Questions:', response.body);
    };

    const handleCourseSelection = (courseId) => {
        if (courseId === 'new') {
            setShowCreateCourseDialog(true);
        } else {
            setCourseNameToAddMock(courseId);
            setShowCreateCourseDialog(false);
        }
    };

    const handleNewCourseNameChange = (e) => {
        setNewCourseName(e.target.value);
    };

    const handleMockTestNameChange = (e) => {
        setNewMockTestName(e.target.value);
    };

    const handleCreateCourse = async () => {
        const response = await axios.post('http://localhost:3600/api/mock/courses/createCourse', {
            courseName: newCourseName
        });

        const newCourse = response.data.courseName;
        setCoursesList([...coursesList, newCourse]);
        setShowCreateCourseDialog(false);
    };

    return (
        <div className="container">
            <h1 className="title">Select Tags:</h1>
            <select multiple className="select-tags" onChange={(e) => handleTagSelection(Array.from(e.target.selectedOptions, option => option.value))}>
                {tagList.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>
            <div className="selected-tags">
                <h2>Selected Tags: {selectedTags.join(', ')}</h2>
            </div>
            <div className="questions-container">
                <h3 className="questions-title">Questions:</h3>
                <ul className="questions-list">
                    {questionsList.map(question => (
                        <li key={question._id} className="question-item">
                            <input
                                type="checkbox"
                                value={question._id}
                                onChange={() => handleQuestionSelection(question._id)}
                            />
                            <label className="question-label">{question.question}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <h1 className="title">Select Course:</h1>
            <select className="select-courses" onChange={(e) => handleCourseSelection(e.target.value)}>
                <option value="">Select Course</option>
                {coursesList.map(course => (
                    <option key={course._id} value={course._id}>{course}</option>
                ))}
                <option value="new">Create New Course</option>
            </select>
            <h1 className="title">Mock Test Name:</h1>
            <input type="text" value={newMockTestName} onChange={handleMockTestNameChange} />
            <button onClick={createMockTest} className="create-mock-button">Create Mock Test</button>
            {showCreateCourseDialog && (
                <div className="create-course-dialog">
                    <input type="text" value={newCourseName} onChange={handleNewCourseNameChange} />
                    <button onClick={handleCreateCourse}>Create</button>
                    <button onClick={() => setShowCreateCourseDialog(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Mock;