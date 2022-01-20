import React from "react";

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>
        {anecdote.content} by {anecdote.author}
      </h3>
      <div>has {anecdote.votes}</div>
      <div>for more info please see at {anecdote.info}</div>
    </div>
  );
};

export default Anecdote;
