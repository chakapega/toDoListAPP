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

  const imgDelete = document.createElement('img');
  imgDelete.classList.add('img-delete');
  imgDelete.title = 'Remove';
  imgDelete.src = "./images/delete.png";

  const imgEdit = document.createElement('img');
  imgEdit.classList.add('img-edit');
  imgEdit.title = 'Edit';
  imgEdit.src = "./images/edit.png";

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  imageContainer.appendChild(imgEdit);
  imageContainer.appendChild(imgDelete);

  taskContainer.appendChild(taskSpan);
  taskContainer.appendChild(imageContainer);
  
  addedTasksContainer.appendChild(taskContainer);

  imgDelete.addEventListener('click', e => {
    e.stopPropagation();

    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    db.collection('tasks').doc(id).delete();
  });
};

const closeNewTaskForm = () => {
  document.querySelector('#new-task_form__input_name').value = '';
  document.querySelector('#new-task_form__textarea_description').value = '';
  document.querySelector('.new-task_form').style.display = 'none';
};

const addNewTask = e => {
  db.collection('tasks').add({
    name: e.srcElement[0].value,
    description: e.srcElement[1].value
  });
};

addNewTaskButton.addEventListener('click', e => {
  document.querySelector('.new-task_form').style.display = 'flex';
});

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  if(e.srcElement[0].value !== '' && e.srcElement[1].value !== '') {
    addNewTask(e);
    closeNewTaskForm();
  } else{
    alert('Please fill in all fields');
  };
});

newTaskFormBtnCancel.addEventListener('click', () => {
  closeNewTaskForm();
});