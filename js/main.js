const addedTasksContainer = document.querySelector('.added-tasks_container');
const newTaskForm = document.querySelector('.new-task_form');
const addNewTaskButton = document.querySelector('.add-new-task__button');
const newTaskFormBtnCancel = document.querySelector('.new-task_form__btn_cancel');

db.collection('tasks').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  
  changes.forEach(change => {
    if(change.type === 'added') {
      renderTask(change.doc);
    } else if(change.type === 'removed') {
      let addedTask = addedTasksContainer.querySelector('[data-id=' + change.doc.id + ']');
      addedTasksContainer.removeChild(addedTask);
    };
  });
});

const renderTask = doc => {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('added-task_container');
  taskContainer.setAttribute('data-id', doc.id);

  const taskSpan = document.createElement('span');
  taskSpan.classList.add('added-task_span');
  taskSpan.textContent = 'Name: ' + doc.data().name;
  taskSpan.textContent += ' | Description: ' + doc.data().description;

  const xSpan = document.createElement('span');
  xSpan.classList.add('x-span');
  xSpan.textContent = 'X';

  taskContainer.appendChild(taskSpan);
  taskContainer.appendChild(xSpan);

  addedTasksContainer.appendChild(taskContainer);

  xSpan.addEventListener('click', e => {
    e.stopPropagation();

    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('tasks').doc(id).delete();
  });
};

const cancelAddNewTask = () => {
  document.querySelector('#new-task_form__input_name').value = '';
  document.querySelector('#new-task_form__textarea_description').value = '';

  document.querySelector('.new-task_form').style.display = 'none';
  addNewTaskButton.style.display = 'inline';
};

addNewTaskButton.addEventListener('click', () => {
  document.querySelector('.new-task_form').style.display = 'flex';
  addNewTaskButton.style.display = 'none';
});

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  if(e.srcElement[0].value !== '' && e.srcElement[1].value !== '') {
    db.collection('tasks').add({
      name: e.srcElement[0].value,
      description: e.srcElement[1].value
    });

    e.srcElement[0].value = '';
    e.srcElement[1].value = '';
  
    document.querySelector('.new-task_form').style.display = 'none';
    addNewTaskButton.style.display = 'inline';
  } else{
    alert('Please fill in all fields');
  };
});

newTaskFormBtnCancel.addEventListener('click', () => {
  cancelAddNewTask();
});