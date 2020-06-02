/*
класс TodoList, у которого есть следующие методы:

- достаёт все тудушки из списка
- достаёт задание по его id
- добавляет новое задание в список
- удаляет задание из списка
- изменяет статус выполнения
- изменяет название
- достаёт только невыполненные задания
*/

class TodoList {
  constructor(apiPath) {
    this.apiPath = apiPath;
  }

  async getAllTodos() {
    const response = await fetch(this.apiPath);
    const result = await response.json();
    console.log(result);
    return result;
  }

  async getTodoById(id) {
    const response = await fetch(this.apiPath + '/' + id);
    const result = await response.json();
    console.log(result);
    return result;
  }

  async addNewTodo(title, checkedStatus, userId = 1) {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, userId, completed: checkedStatus }),
    }
    let response = null;

    try {
      response = await fetch(this.apiPath, options);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async removeTodo(id) {
    let response = null;

    try {
      response = await fetch(this.apiPath + '/' + id, { method: 'delete' });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    return response;
  }

  async changeCompletionState(id) {
    const data = await this.getTodoById(id);
    data.completed = !data.completed;

    const options = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }
    let response = null;

    try {
      response = await fetch(this.apiPath + '/' + id, options);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    return response;
  }

  async changeTitle(id, title) {
    const data = await this.getTodoById(id);
    data.title = title;

    const options = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }
    let response = null;

    try {
      response = await fetch(this.apiPath + '/' + id, options);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    return response;
  }

  async getUncompletedTodos() {
    const response = await fetch(this.apiPath + '?completed=false');
    const result = await response.json();
    console.log(result);
    return result;
  }
}

const apiPath = "http://localhost:3000/todos";

const todoList = new TodoList(apiPath);

const buttonGetTasks = document.getElementById("getTasks");
const buttonGetTask = document.getElementById("getTask");
const buttonAddTask = document.getElementById("addTask");
const buttonDeleteTask = document.getElementById("deleteTask");
const buttonChangeCompletionTask = document.getElementById(
  "changeCompletionTask"
);
const buttonChangeTitleTask = document.getElementById("changeTitleTask");
const buttonGetUncompletedTasks = document.getElementById(
  "getUncompletedTasks"
);

const inputGetById = document.querySelector("#getById");
const inputTitle = document.querySelector("#title");
const inputUserId = document.querySelector("#userId");
const inputCheckbox = document.querySelector("#checkbox");
const inputDeleteById = document.querySelector("#deleteById");
const inputChangeStateById = document.querySelector("#changeStateById");
const inputChangeTitleById = document.querySelector("#changeTitleById");
const inputChangeTitle = document.querySelector("#changeTitle");

buttonGetTasks.addEventListener('click', () => {
  todoList.getAllTodos();
});

buttonGetTask.addEventListener('click', () => {
  todoList.getTodoById(inputGetById.value);
});

buttonAddTask.addEventListener('click', () => {
  todoList.addNewTodo(inputTitle.value, inputCheckbox.checked, inputUserId.value);
});

buttonDeleteTask.addEventListener('click', () => {
  todoList.removeTodo(inputDeleteById.value);
});

buttonChangeCompletionTask.addEventListener('click', () => {
  todoList.changeCompletionState(inputChangeStateById.value);
});

buttonChangeTitleTask.addEventListener('click', () => {
  todoList.changeTitle(inputChangeTitleById.value, inputChangeTitle.value);
})

buttonGetUncompletedTasks.addEventListener('click', () => {
  todoList.getUncompletedTodos();
})