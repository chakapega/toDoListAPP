const addedTasksContainer = document.querySelector('.added-tasks_container');
const newTaskForm = document.querySelector('.new-task_form');

db.collection('tasks').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    renderTask(doc);
  });
});

const renderTask = doc => {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('added-task_container');

  const taskSpan = document.createElement('span');
  taskSpan.classList.add('added-task_span');
  taskSpan.textContent = 'Name :' + doc.data().name;
  taskSpan.textContent += ' | Description :' + doc.data().description;

  const xSpan = document.createElement('span');
  xSpan.classList.add('x-span');
  xSpan.textContent = 'X';

  taskContainer.appendChild(taskSpan);
  taskContainer.appendChild(xSpan);

  addedTasksContainer.appendChild(taskContainer);
}

const addNewTaskButton = document.querySelector('.add-new-task__button');
addNewTaskButton.addEventListener('click', () => {
  document.querySelector('.new-task_form').style.display = 'flex';
  addNewTaskButton.style.display = 'none';
});

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  db.collection('tasks').add({
    name: e.srcElement[0].value,
    description: e.srcElement[1].value
  });

});
