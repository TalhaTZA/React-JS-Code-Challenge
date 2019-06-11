import React, { Component } from "react";
import { Provider, Subscribe } from "unstated";

import styled from "styled-components";

import TodosContainer from "../store";

import TodoList from "./TodoList";
import AddTodoOrList from "./AddTodoOrList";

class IndividualList extends Component {
  render() {
    return (
      <Provider>
        <Wrapper>
          <Subscribe to={[TodosContainer]}>
            {todos => {
              const id = this.props.match.params.list_id;
              const list = todos.getList(id);
              return (
                <TodosWrapper>
                  <AddTodoOrList listId={id} onAddTodo={todos.createTodo} />
                  <TodoList
                    items={list.todos}
                    listId={id}
                    toggleComplete={todos.toggleComplete}
                  />
                </TodosWrapper>
              );
            }}
          </Subscribe>
        </Wrapper>
      </Provider>
    );
  }
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

export default IndividualList;
