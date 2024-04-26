import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    Select,
    TextField,
} from '@mui/material';

const useStyles = {
    container: {
        padding: '16px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    input: {
        marginBottom: '16px',
    },
};

const Questions = () => {
    const classes = useStyles;
    const [question, setQuestion] = useState('');
    const [format, setFormat] = useState('text');
    const [options, setOptions] = useState([{ option: '', format: 'text', isCorrect: false }]);
    const [timeLimit, setTimeLimit] = useState(0);
    const [tags, setTags] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);

    const addOption = () => {
        setOptions((prevOptions) => [...prevOptions, { option: '', format: 'text', isCorrect: false }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (uploadedFile) {
            // if (format === 'audio' && uploadedFile.type !== 'audio/mpeg') {
            //     alert('Invalid file type. Please upload an MP3 file.');
            //     return;
            // }
            //formData.append('file', uploadedFile);
        }
        // try {
        //     await axios.post('http://localhost:3600/api/video/upload', uploadedFile, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     alert('Video uploaded successfully');
        // } catch (error) {
        //     console.error('Error uploading video:', error);
        // }
        const response = await axios.post('http://localhost:3600/api/questions/add', {
            question,
            format,
            options,
            timeLimit,
            tags,
        });
        setQuestion('');
        setFormat('text');
        setOptions((prevOptions) => [prevOptions[0]]);
        setTimeLimit(0);
        setTags([]);
        setUploadedFile(null);
    };

    const updateOption = (index, updatedOption) => {
        const newOptions = [...options];
        newOptions[index] = updatedOption;
        setOptions(newOptions);
    };

    return (
        <Container style={classes.container}>
            <h1>Questions</h1>
            <form style={classes.form} onSubmit={handleSubmit}>
                <TextField
                    id="question"
                    label="Question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    style={classes.input}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel id="format-label">Format</InputLabel>
                    <Select
                        labelId="format-label"
                        id="format"
                        value={format}
                        onChange={(event) => setFormat(event.target.value)}
                        style={classes.input}
                    >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="audio">Audio</MenuItem>
                        <MenuItem value="video">Video</MenuItem>
                    </Select>
                </FormControl>
                {uploadedFile && (
                    <div>
                        <p>File: {uploadedFile.name}</p>
                        <Button
                            variant="contained"
                            onClick={() => setUploadedFile(null)}
                        >
                            Remove File
                        </Button>
                    </div>
                )}
                {(format === 'video' || format === 'audio') && (
                    <input
                        type="file"
                        //accept=".mp4,.mp3"
                        onChange={(event) => setUploadedFile(event.target.files[0])}
                        style={classes.input}
                    />
                )}
                {options.map((option, index) => (
                    <div key={index}>
                        <TextField
                            id={`option-${index}`}
                            label={`Option ${index + 1}`}
                            value={option.option}
                            onChange={(event) => {
                                const newOption = { ...option };
                                newOption.option = event.target.value;
                                updateOption(index, newOption);
                            }}
                            style={classes.input}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel id={`format-${index}-label`}>Format</InputLabel>
                            <Select
                                labelId={`format-${index}-label`}
                                id={`format-${index}`}
                                value={option.format}
                                onChange={(event) => {
                                    const newOption = { ...option };
                                    newOption.format = event.target.value;
                                    updateOption(index, newOption);
                                }}
                                style={classes.input}
                            >
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="audio">Audio</MenuItem>
                                <MenuItem value="video">Video</MenuItem>
                            </Select>
                        </FormControl>
                        {(option.format === 'audio' || option.format === 'video') && (
                            <>
                                <input
                                    type="file"
                                    accept={option.format === 'audio' ? 'audio/*' : 'video/*'}
                                    onChange={(event) => {
                                        const newOption = { ...option };
                                        newOption.uploadedFile = event.target.files[0];
                                        updateOption(index, newOption);
                                    }}
                                    style={classes.input}
                                />
                                {option.uploadedFile && (
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            const newOption = { ...option };
                                            newOption.uploadedFile = null;
                                            updateOption(index, newOption);
                                        }}
                                    >
                                        Remove File
                                    </Button>
                                )}
                            </>
                        )}
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={option.isCorrect}
                                    onChange={() => {
                                        const newOptions = [...options];
                                        newOptions[index].isCorrect = !option.isCorrect;
                                        setOptions(newOptions);
                                    }}
                                />
                            }
                            label={`Correct Option ${index + 1}`}
                        />
                    </div>
                ))}
                <Button
                    variant="contained"
                    onClick={addOption}
                    style={classes.input}
                >
                    Add Option
                </Button>
                <TextField
                    id="timeLimit"
                    label="Time Limit"
                    value={timeLimit}
                    onChange={(event) => setTimeLimit(event.target.value)}
                    style={classes.input}
                    type="number"
                    fullWidth
                />
                <TextField
                    id="tags"
                    label="Tags"
                    value={tags.join(',')}
                    onChange={(event) => setTags(event.target.value.split(','))}
                    style={classes.input}
                    fullWidth
                />
                <Button
                    variant="contained"
                    type="submit"
                    style={classes.input}
                >
                    Add Question
                </Button>
            </form>
        </Container>
    );
};

export default Questions;