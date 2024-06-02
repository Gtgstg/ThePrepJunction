import React, { useState, useEffect } from 'react';

const Quiz = ({ question, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(null); // Reset selected option when question changes
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnswerSubmit(question.id, selectedOption);
    setSelectedOption(null); // Reset selected option after submitting answer
  };

  const handleOptionChange = (e) => {
    setSelectedOption(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <h3>{question.question}</h3>
      <form onSubmit={handleSubmit}>
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name="option"
              value={index}
              checked={selectedOption === index}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option${index}`}>{option.option}</label>
          </div>
        ))}
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
};

export default Quiz;
