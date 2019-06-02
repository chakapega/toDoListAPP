const addNewTaskButton = document.querySelector('.add-new-task__button');

db.collection('tasks').onSnapshot(snapshot => {
  const addedTasksContainer = document.querySelector('.added-tasks_container');
  let changes = snapshot.docChanges();
  
  changes.forEach(change => {
    if(change.type === 'added') {
      renderTask(change.doc,addedTasksContainer);
    } else if(change.type === 'removed') {
      let removedTask = addedTasksContainer.querySelector('[data-id=' + change.doc.id + ']');
      addedTasksContainer.removeChild(removedTask);
    };
  });
});

const renderTask = (doc,parent) => {
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
  
  parent.appendChild(taskContainer);

  imgDelete.addEventListener('click', e => {
    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    db.collection('tasks').doc(id).delete();
  });

  imgEdit.addEventListener('click', e => {
    renderEditTaskForm(e);
  });
};

const renderEditTaskForm = e => {
  let idEditableTask = e.target.parentElement.parentElement.getAttribute('data-id');

  db.collection('tasks').doc(idEditableTask).get().then(doc => {
    const editTaskForm = document.createElement('form');
    editTaskForm.classList.add('edit-task_form');
  
    const editTaskFormLabelName = document.createElement('label');
    editTaskFormLabelName.classList.add('edit-task_form__label_name');
    editTaskFormLabelName.htmlFor = 'edit-task_form__input_name';
    editTaskFormLabelName.textContent = 'The name of your task';
  
    const editTaskFormInputName = document.createElement('input');
    editTaskFormInputName.type = 'text';
    editTaskFormInputName.name = 'name';
    editTaskFormInputName.id = 'edit-task_form__input_name';
    editTaskFormInputName.value = doc.data().name;
  
    const editTaskFormLabelDescription = document.createElement('label');
    editTaskFormLabelDescription.classList.add('edit-task_form__label_description');
    editTaskFormLabelDescription.htmlFor = 'edit-task_form__textarea_description';
    editTaskFormLabelDescription.textContent = 'Description of your task';
  
    const editTaskFormTextareaDescription = document.createElement('textarea');
    editTaskFormTextareaDescription.name = 'description';
    editTaskFormTextareaDescription.id = 'edit-task_form__textarea_description';
    editTaskFormTextareaDescription.cols = '30';
    editTaskFormTextareaDescription.rows = '5';
    editTaskFormTextareaDescription.value = doc.data().description;
  
    const editTaskFormBtns = document.createElement('div');
    editTaskFormBtns.classList.add('edit-task_form__btns');
  
    const editTaskFormBtnAdd = document.createElement('button');
    editTaskFormBtnAdd.type = 'submit';
    editTaskFormBtnAdd.classList.add('edit-task_form__btn_edit');
    editTaskFormBtnAdd.textContent = 'Edit';
  
    const editTaskFormBtnCancel = document.createElement('button');
    editTaskFormBtnCancel.type = 'button';
    editTaskFormBtnCancel.classList.add('edit-task_form__btn_cancel');
    editTaskFormBtnCancel.textContent = 'Cancel';
  
    editTaskForm.appendChild(editTaskFormLabelName);
    editTaskForm.appendChild(editTaskFormInputName);
    editTaskForm.appendChild(editTaskFormLabelDescription);
    editTaskForm.appendChild(editTaskFormTextareaDescription);
    editTaskForm.appendChild(editTaskFormBtns);
  
    editTaskFormBtns.appendChild(editTaskFormBtnAdd);
    editTaskFormBtns.appendChild(editTaskFormBtnCancel);

    editTaskForm.addEventListener('submit', e => {
      e.preventDefault();

      db.collection('tasks').doc(idEditableTask).set({
        name: e.srcElement[0].value,
        description: e.srcElement[1].value
      });
      closeEditTaskForm();
    });

    editTaskFormBtnCancel.addEventListener('click', () => {
      closeEditTaskForm();
    });

    document.querySelector('main').appendChild(editTaskForm);
  });
};

const closeEditTaskForm = () => {
  const editTaskForm = document.querySelector('.edit-task_form');

  document.querySelector('main').removeChild(editTaskForm);
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

document.querySelector('body').addEventListener('click', e => {
  if(document.querySelector('.edit-task_form')) {
    const editTaskForm = document.querySelector('.edit-task_form');
    const imgEdit = document.querySelector('.img-edit');

    if(!editTaskForm.contains(e.target) && e.target !== imgEdit) {
      closeEditTaskForm();
    };
  };
});