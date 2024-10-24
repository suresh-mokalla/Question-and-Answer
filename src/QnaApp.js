import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
  const [qnaList, setQnaList] = useState([{ question: '', answer: '' }]);
  const [savedQnAs, setSavedQnAs] = useState([]);

  // Handle input change for the question and answer fields
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQnaList = [...qnaList];
    updatedQnaList[index][name] = value;
    setQnaList(updatedQnaList);
  };

  // Add a new Q&A input field inside a separate card
  const addQnaField = () => {
    setQnaList([...qnaList, { question: '', answer: '' }]);
  };

  // Remove a specific Q&A input field
  const removeQnaField = (index) => {
    const updatedQnaList = qnaList.filter((_, i) => i !== index);
    setQnaList(updatedQnaList);

    // If the item was saved, remove it from the saved Q&A list as well
    const updatedSavedQnAs = savedQnAs.filter((_, i) => i !== index);
    setSavedQnAs(updatedSavedQnAs);
  };

  // Save the Q&A items to the preview section
  const saveQnaList = () => {
    setSavedQnAs(qnaList);
  };

  // Handle drag end to reorder Q&A list
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination (dragged outside), do nothing
    if (!destination) {
      return;
    }

    // Reorder the qnaList array
    const updatedQnaList = Array.from(qnaList);
    const [removed] = updatedQnaList.splice(source.index, 1);
    updatedQnaList.splice(destination.index, 0, removed);

    setQnaList(updatedQnaList);
  };

  return (
    <div className="App">
      <div className="qna-container">
        {/* Q&A Form */}
        <div className="qna-form">
          <h2>Q&A List</h2>
          
          {/* Buttons first */}
          <div className="controls">
            <button onClick={addQnaField}>Add New Q&A</button>
            <button className="save-btn" onClick={saveQnaList}>Save</button>
          </div>

          {/* Render the Q&A fields below the buttons in cards */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="qnaList">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {qnaList.map((qna, index) => (
                    <Draggable
                      key={`qna-${index}`}
                      draggableId={`qna-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="qna-item-card"
                        >
                          <div className="qna-item">
                          <button
                              className="delete-btn"
                              onClick={() => removeQnaField(index)}
                            >
                              🗑️
                            </button>
                            <label>Question</label>
                            <input
                              type="text"
                              name="question"
                              placeholder="Enter question"
                              value={qna.question}
                              onChange={(event) => handleInputChange(index, event)}
                            /><label>Answer</label>
                            <input
                              type="text"
                              name="answer"
                              placeholder="Enter answer"
                              value={qna.answer}
                              onChange={(event) => handleInputChange(index, event)}
                            />
                           
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder} {/* This is essential to maintain spacing */}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Q&A Preview */}
        <div className="qna-preview">
          <h2>Q&A Preview</h2>
          <div className="preview">
            {savedQnAs.length === 0 ? (
              <p>No Q&As</p>
            ) : (
              savedQnAs.map((qna, index) => (
                <div key={index} className="saved-qna-card">
                  <div className="saved-qna">
                    <p>
                      <strong></strong>{qna.question}
                    </p>
                    <p>
                      <strong></strong>{qna.answer}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;