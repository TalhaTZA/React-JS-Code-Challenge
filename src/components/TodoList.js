import React from "react";

import styled from "styled-components";

import TodoItem from "./TodoItem";

const TodoList = ({ history, items, toggleComplete, listId }) => (
  <Wrapper>
    {items.length < 1 && <NoTodo>No Todo in List! Add More </NoTodo>}

    {listId &&
      items.map(item => {
        const onComplete = e => {
          toggleComplete(item.id, listId);
        };

        return <TodoItem key={item.id} {...item} onComplete={onComplete} />;
      })}

    {!listId &&
      items.map((list, id) => {
        return <TodoItem history={history} id={id} key={id} {...list} />;
      })}
  </Wrapper>
);

const NoTodo = styled.div`
  background: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 40px;
  width: 500px;
  margin-bottom: 16px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TodoList;
