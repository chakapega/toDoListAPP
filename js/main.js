const addNewTaskButton = document.querySelector('.add-new-task__button');
addNewTaskButton.addEventListener('click', () => {
  document.querySelector('.new-task_container').style.display = 'flex';
  addNewTaskButton.style.display = 'none';
});

const newTaskContainerBtnAdd = document.querySelector('.new-task_container__btn_add');
newTaskContainerBtnAdd.addEventListener('click', () => {
  showNewTask(createNewTask());
});

const createNewTask = () => {
  // const task = {
  //   [document.querySelector('#new-task_container__input_name').value]: 
  //   document.querySelector('#new-task_container__textarea_description').value
  // };
  
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('added-task_container');

  const taskSpan = document.createElement('span');
  taskSpan.classList.add('added-task_span');
  taskSpan.textContent = 'Name :' + document.querySelector('#new-task_container__input_name').value;
  taskSpan.textContent += ' | Description :' + document.querySelector('#new-task_container__textarea_description').value;

  taskContainer.appendChild(taskSpan);

  return taskContainer;
};

const showNewTask = element => {
  const addedTasksContainer = document.querySelector('.added-tasks_container');
  addedTasksContainer.appendChild(element);
};

