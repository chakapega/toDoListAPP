const addNewTaskButton = document.querySelector('.add-new-task__button');
addNewTaskButton.addEventListener('click', () => {
  document.querySelector('.new-task_form').style.display = 'flex';
  addNewTaskButton.style.display = 'none';
});