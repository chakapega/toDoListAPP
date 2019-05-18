const addNewTaskButton = document.querySelector('.add-new-task__button');
addNewTaskButton.addEventListener('click', () => {
  document.querySelector('.new-task_container').style.display = 'flex';
  addNewTaskButton.style.display = 'none';
});

const newTaskContainerBtnAdd = document.querySelector('.new-task_container__btn_add');
newTaskContainerBtnAdd.addEventListener('click', () => {
  console.log(document.querySelector('#new-task_container__input_name').value);
});

