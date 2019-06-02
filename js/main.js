const addedTasksContainer = document.querySelector('.added-tasks_container');
const addNewTaskButton = document.querySelector('.add-new-task__button');

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

  imgEdit.addEventListener('click', e => {
    e.stopPropagation();

    editAddedTask(e);
  });
};

const editAddedTask = e => {
  let idEditableTask = e.target.parentElement.parentElement.getAttribute('data-id');
  const editTaskForm = document.querySelector('.edit-task_form');

  db.collection('tasks').doc(idEditableTask).get().then(doc => {
    document.querySelector('#edit-task_form__input_name').value = doc.data().name;
    document.querySelector('#edit-task_form__textarea_description').value = doc.data().description;

    editTaskForm.style.display = 'flex';

    editTaskForm.addEventListener('submit', e => {
      e.preventDefault();

      db.collection('tasks').doc(idEditableTask).set({
        name: e.srcElement[0].value,
        description: e.srcElement[1].value
      });

      editTaskForm.style.display = 'none';
    });
  });
};

const closeNewTaskForm = () => {
  const newTaskForm = document.querySelector('.new-task_form');

  document.querySelector('main').removeChild(newTaskForm);
};

const addNewTask = e => {
  db.collection('tasks').add({
    name: e.srcElement[0].value,
    description: e.srcElement[1].value
  });
};

const showNewTaskForm = () => {
  document.querySelector('main').appendChild(createNewTaskForm());
};

const createNewTaskForm = () => {
  const newTaskForm = document.createElement('form');
  newTaskForm.classList.add('new-task_form');

  const newTaskFormLabelName = document.createElement('label');
  newTaskFormLabelName.classList.add('new-task_form__label_name');
  newTaskFormLabelName.htmlFor = 'new-task_form__input_name';
  newTaskFormLabelName.textContent = 'The name of your new task';

  const newTaskFormInputName = document.createElement('input');
  newTaskFormInputName.type = 'text';
  newTaskFormInputName.name = 'name';
  newTaskFormInputName.id = 'new-task_form__input_name';

  const newTaskFormLabelDescription = document.createElement('label');
  newTaskFormLabelDescription.classList.add('new-task_form__label_description');
  newTaskFormLabelDescription.htmlFor = 'new-task_form__textarea_description';
  newTaskFormLabelDescription.textContent = 'Description of your new task';

  const newTaskFormTextareaDescription = document.createElement('textarea');
  newTaskFormTextareaDescription.name = 'description';
  newTaskFormTextareaDescription.id = 'new-task_form__textarea_description';
  newTaskFormTextareaDescription.cols = '30';
  newTaskFormTextareaDescription.rows = '5';

  const newTaskFormBtns = document.createElement('div');
  newTaskFormBtns.classList.add('new-task_form__btns');

  const newTaskFormBtnAdd = document.createElement('button');
  newTaskFormBtnAdd.type = 'submit';
  newTaskFormBtnAdd.classList.add('new-task_form__btn_add');
  newTaskFormBtnAdd.textContent = 'Add';

  const newTaskFormBtnCancel = document.createElement('button');
  newTaskFormBtnCancel.type = 'button';
  newTaskFormBtnCancel.classList.add('new-task_form__btn_cancel');
  newTaskFormBtnCancel.textContent = 'Cancel';

  newTaskForm.appendChild(newTaskFormLabelName);
  newTaskForm.appendChild(newTaskFormInputName);
  newTaskForm.appendChild(newTaskFormLabelDescription);
  newTaskForm.appendChild(newTaskFormTextareaDescription);
  newTaskForm.appendChild(newTaskFormBtns);

  newTaskFormBtns.appendChild(newTaskFormBtnAdd);
  newTaskFormBtns.appendChild(newTaskFormBtnCancel);

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

  return newTaskForm;
};

addNewTaskButton.addEventListener('click', e => {
  showNewTaskForm();
});

document.querySelector('body').addEventListener('click', e => {
  if(document.querySelector('.new-task_form')) {
    const newTaskForm = document.querySelector('.new-task_form');

    if(!newTaskForm.contains(e.target) && e.target !== addNewTaskButton) {
      closeNewTaskForm();
    };
  };
});