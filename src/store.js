import { Container } from "unstated";

const defaultState = {
  list: [
    {
      name: "Default List",
      filteredList: [],
      filterType: "1",
      todos: [
        {
          id: 1,
          completed: false,
          text: "Read README"
        },
        {
          id: 2,
          completed: false,
          text: "Add one todo"
        },
        {
          id: 3,
          completed: false,
          text: "Add filters"
        },
        {
          id: 4,
          completed: false,
          text: "Add multiple lists"
        },
        {
          id: 5,
          completed: false,
          text: "Optional: add tests"
        }
      ]
    }
  ]
};

class TodosContainer extends Container {
  constructor(props) {
    super(props);

    this.state = this.readStorage();
  }

  readStorage() {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem("appState");
      if (state) {
        return JSON.parse(state);
      }
    }

    return defaultState;
  }

  syncStorage() {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state);
      window.localStorage.setItem("appState", state);
    }
  }

  getList(id) {
    if (!id) {
      return this.state.list;
    }

    return this.state.list[id];
  }

  toggleComplete = async (id, listId) => {
    const item = this.state.list[listId].todos.find(i => i.id === id);
    const completed = !item.completed;

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const updated_list = state.list[listId].todos.map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          completed
        };
      });

      state.list[listId].todos = updated_list;

      const list = state.list;

      return { list };
    });

    this.syncStorage();
  };

  createTodo = async (text, listId) => {
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.list[listId].todos.length + 1
      };

      state.list[listId].todos.push(item);

      const list = state.list;

      return { list };
    });

    this.syncStorage();
  };

  createTodoList = async name => {
    await this.setState(state => {
      const newList = {
        name,
        todos: [],
        filteredList: [],
        filterType: "1"
      };

      state.list.push(newList);

      const list = state.list;

      return { list };
    });

    this.syncStorage();
  };

  onFilterChange = async (type, listId) => {
    await this.setState(state => {
      const originalListTodos = state.list[listId].todos;


      let completed = null;

      if (type === "1") {
        state.list[listId].filteredList = originalListTodos;
      }

      if (type === "2") {
        completed = true;
      }
      if (type === "3") {
        completed = false;
      }

      if (type === "2" || type === "3") {
        state.list[listId].filteredList = originalListTodos.filter(
          todo => todo.completed === completed
        );
      }

      state.list[listId].filterType = type;

      const list = state.list;
      
      return { list };
    });

    this.syncStorage();
  };
}

export default TodosContainer;
