const Question = require('../models/Question');
const Tag = require('../models/Tag'); 

async function checkAndAddTags(tagNames) {
    // Array to store tag IDs
    const tagIds = [];

    // Iterate through each tag name
    for (const name of tagNames) {
        // Check if the tag already exists
        let tag = await Tag.findOne({ name });

        // If the tag doesn't exist, create a new tag
        if (!tag) {
            tag = new Tag({ name });
            await tag.save();
        }

        // Add the tag ID to the array
        tagIds.push(tag._id);
    }

    return tagIds;
}

exports.addQuestion = async (req, res) => {
    const { question, format, options, timeLimit, tags } = req.body;
    const tagIds = await checkAndAddTags(tags);
    const newQuestion = new Question({ question, format, options, timeLimit, tags: tagIds });
    await newQuestion.save();
    res.status(201).json(newQuestion);
};

exports.addOptions = async (req, res) => {
    const { id } = req.params;
    const { option, format, isCorrect } = req.body;
    const question = await Question.findByIdAndUpdate(id, { $push: { options: { option, format, isCorrect } } }, { new: true });
    res.status(200).json(question);
};

exports.addTags = async (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    const question = await Question.findByIdAndUpdate(id, { $push: { tags: tag } }, { new: true });
    res.status(200).json(question);
};

exports.getQuestionsForTags = async (req, res) => {
    const { tags } = req.body;
    const tagDocs = await Tag.find({ name: { $in: tags } }).exec();
    console.log(tagDocs)
    const tagIds = tagDocs.map(tag => tag._id);

    const questions = await Question.find({ tags: { $in: tagIds } }).exec();
    console.log(questions)
    res.status(200).json(questions);
};

exports.getQuestionsByIds = async (req, res) => {
    const { ids } = req.body;
    try {
      const questions = await Question.find({ _id: { $in: ids } }).populate('tags');
      res.json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.getAllTags = async (req, res) => {
    try {
        // Retrieve all tags from the Tag collection
        const tags = await Tag.find().exec();
        // Respond with the retrieved tags
        res.status(200).json(tags);
    } catch (error) {
        // Handle errors and respond with an appropriate status code and message
        res.status(500).json({ error: 'Failed to retrieve tags' });
    }
};