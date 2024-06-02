const MockTest = require('../models/MockTest');
const Tag = require('../models/Tag');
const mongoose = require('mongoose');

exports.createExam = async (req, res) => {
    const { examName } = req.body;
    const newExam = new MockTest({ examName, mockTests: [] });
    await newExam.save();
    res.status(201).json(newExam);
};

async function checkTags(tagNames) {
    // Array to store tag IDs
    const tagIds = [];

    // Iterate through each tag name
    for (const name of tagNames) {
        // Check if the tag already exists
        let tag = await Tag.findOne({ name });

        // Add the tag ID to the array
        tagIds.push(tag._id);
    }

    return tagIds;
}

exports.addMockTest = async (req, res) => {
    try {
        const { examName, mockTestName, questions, tags } = req.body;
        const tagIds = await checkTags(tags);
        console.log("hello", tagIds);
        // Find the exam by name
        const exam = await MockTest.findOne({ examName });

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Validate that each question ID is a valid ObjectId
        const validQuestionIds = questions.filter(questionId => mongoose.Types.ObjectId.isValid(questionId));

        // Check if all questions are valid ObjectId references
        if (validQuestionIds.length !== questions.length) {
            return res.status(400).json({ message: 'Invalid question IDs provided' });
        }

        // Map the valid question IDs to the mock test
        exam.mockTests.push({ testName: mockTestName, questions: validQuestionIds });

        exam.tags = tagIds;
        console.log("hiii",exam);
        // Save the updated exam
        await exam.save();

        res.status(200).json(exam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllMockTests = async (req, res) => {
    try {
        const allMockTests = await MockTest.find();
        res.status(200).json(allMockTests);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve mock tests" });
    }
};

exports.getAllExams = async (req, res) => {
    const examName = await MockTest.distinct('examName');
    res.status(200).json(examName);
}

exports.getExamsBasedOnTags = async (req, res) => {
    const { tags } = req.body;
    const tagDocs = await Tag.find({ _id: { $in: tags } }).exec();
    const tagIds = tagDocs.map(tag => tag._id);
    try {
        const exams = await MockTest.find({ tags: { $in: tagIds } }).exec();
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exam names by tags' });
    }
}
