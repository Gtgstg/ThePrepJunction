import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mock.css';

const Mock = () => {
    const [questionsList, setQuestionList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [examsList, setExamsList] = useState([]);
    const [newExamName, setNewExamName] = useState('');
    const [showCreateExamDialog, setShowCreateExamDialog] = useState(false);
    const [examNameToAddMock, setExamNameToAddMock] = useState('');
    const [newMockTestName, setNewMockTestName] = useState('');

    useEffect(() => {
        async function fetchData() {
            const tagsResponse = await axios.get('http://13.126.195.239:3600/api/questions/getAllTags');
            const tags  = tagsResponse.data.map(tag => tag.name);
            setTagList(tags);
            const examsResponse = await axios.get('http://13.126.195.239:3600/api/mock/exams/getAllExams');
            setExamsList(examsResponse.data);
            console.log(examsList);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchQuestions() {
            if (selectedTags.length > 0) {
                const questionResponse = await axios.post('http://13.126.195.239:3600/api/questions/getQuestionsForTags', {
                    tags: selectedTags
                });
                console.log(questionResponse.data);
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
        try {
            // Implement logic to create a mock test using selected questions
            const response = await axios.post('http://13.126.195.239:3600/api/mock/exams/addMock', {
                examName: examNameToAddMock,
                mockTestName: newMockTestName,
                questions: selectedQuestions,
                tags: selectedTags,
            });
            console.log('Selected Questions:', response.data);

            // Reset selected tags, questions, and mock test name
            setSelectedTags([]);
            setSelectedQuestions([]);
            setNewMockTestName('');
            setExamNameToAddMock('');
        } catch (error) {
            console.error('Error creating mock test:', error);
        }
    };

    const handleExamSelection = (examId) => {
        if (examId === 'new') {
            setShowCreateExamDialog(true);
        } else {
            setExamNameToAddMock(examId);
            setShowCreateExamDialog(false);
        }
    };

    const handleNewExamNameChange = (e) => {
        setNewExamName(e.target.value);
    };

    const handleMockTestNameChange = (e) => {
        setNewMockTestName(e.target.value);
    };

    const handleCreateExam = async () => {
        const response = await axios.post('http://13.126.195.239:3600/api/mock/exams/createExam', {
            examName: newExamName
        });

        const newExam = response.data.examName;
        setExamsList([...examsList, newExam]);
        setShowCreateExamDialog(false);
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
            <h1 className="title">Select Exam:</h1>
            <select className="select-exams" onChange={(e) => handleExamSelection(e.target.value)}>
                <option value="">Select Exam</option>
                {examsList.map(exam => (
                    <option key={exam._id} value={exam._id}>{exam}</option>
                ))}
                <option value="new">Create New Exam</option>
            </select>
            <h1 className="title">Mock Test Name:</h1>
            <input type="text" value={newMockTestName} onChange={handleMockTestNameChange} />
            <button onClick={createMockTest} className="create-mock-button">Create Mock Test</button>
            {showCreateExamDialog && (
                <div className="create-exam-dialog">
                    <input type="text" value={newExamName} onChange={handleNewExamNameChange} />
                    <button onClick={handleCreateExam}>Create</button>
                    <button onClick={() => setShowCreateExamDialog(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Mock;