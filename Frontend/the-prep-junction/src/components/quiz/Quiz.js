// Quiz.js
import React from 'react';

const Quiz = ({ question, onAnswerSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedOption = e.target.elements.option.value;
    onAnswerSubmit(question.id, selectedOption);
  };

  return (
    <div>
      <h3>{question.question}</h3>
      <form onSubmit={handleSubmit}>
        {question.options.map(option => (
          <div key={option.id}>
            <input type="radio" id={option.id} name="option" value={option.id} />
            <label htmlFor={option.id}>{option.text}</label>
          </div>
        ))}
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
};

export default Quiz;
