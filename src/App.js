import React, { Component } from "react";
import { Provider, Subscribe } from "unstated";

import styled from "styled-components";

import TodosContainer from "./store";

import TodoList from "./components/TodoList";
import AddTodoOrList from "./components/AddTodoOrList";
import FilterTodos from "./components/FilterTodos";

class App extends Component {
  render() {
    return (
      <Provider>
        <Wrapper>
          <Subscribe to={[TodosContainer]}>
            {todos => {
              const id = this.props.match.params.list_id
                ? this.props.match.params.list_id
                : null;
              const list = todos.getList(id);

              if (!list) {
                return (
                  <NoListWithGivenID>No List With Given ID</NoListWithGivenID>
                );
              }

              return (
                <TodosWrapper>
                  {id ? (
                    <FilterTodos
                      type={list.filterType}
                      id={id}
                      onChange={todos.onFilterChange}
                    />
                  ) : (
                    ""
                  )}
                  <AddTodoOrList
                    listId={id}
                    onAddTodoOrList={
                      id ? todos.createTodo : todos.createTodoList
                    }
                  />
                  <TodoList
                    history={this.props.history}
                    items={id ? ((list.filterType==="2" || list.filterType==="3")? list.filteredList :list.todos) : list}
                    listId={id}
                    toggleComplete={id ? todos.toggleComplete : null}
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

const NoListWithGivenID = styled.div`
  display: flex;
  flex-direction: column;
  color: red;
`;

export default App;
