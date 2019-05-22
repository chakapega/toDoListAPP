const addedTasksContainer = document.querySelector('.added-tasks_container');
const newTaskForm = document.querySelector('.new-task_form');

window.onload = () => {
  deletionTask();
  loadingCurrent();
};

const loadingCurrent = () => {
  db.collection('tasks').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderTask(doc);
    });
  });
};

const deletionTask = () => {
  const quantityTasks = document.querySelectorAll('.added-task_container').length;

  for(let i = 0; i < quantityTasks; i++) {
    document.querySelector('.added-task_container').remove();
  };
};

const renderTask = doc => {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('added-task_container');
  taskContainer.setAttribute('data-id', doc.id);

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

  xSpan.addEventListener('click', e => {
    e.stopPropagation();

    deletionTask();

    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('tasks').doc(id).delete();

    loadingCurrent();
  });
};

const addNewTaskButton = document.querySelector('.add-new-task__button');
addNewTaskButton.addEventListener('click', () => {
  document.querySelector('.new-task_form').style.display = 'flex';
  addNewTaskButton.style.display = 'none';
});

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  deletionTask();

  db.collection('tasks').add({
    name: e.srcElement[0].value,
    description: e.srcElement[1].value
  });

  e.srcElement[0].value = '';
  e.srcElement[1].value = '';

  document.querySelector('.new-task_form').style.display = 'none';
  addNewTaskButton.style.display = 'inline';

  loadingCurrent();
});
