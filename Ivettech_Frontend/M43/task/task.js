'use strict'

const $ = (id) => {
  return document.getElementById(id);
}

const managerTask = {
  tasks: [],
  setStorage: function() {
    localStorage.setItem('task', JSON.stringify(this.tasks));
  },
  getStorage: function() {
    this.tasks = JSON.parse(localStorage.getItem('task') || '[]');
    this.show();
  },
  add: function() {
    const task = $('inputTask').value;
    if(task == '') {
      alert('Please enter task');
      return;
    }
    this.tasks.push(task);
    this.setStorage();
    this.show();
    $('inputTask').value = '';
  },
  delete: function(index) {
    this.tasks.splice(index, 1);
    this.setStorage();
    this.show();
  },
  clear: function() {
    this.tasks.length = 0;
    localStorage.removeItem('task');
    this.show();
  },
  update: function() {
    const index = parseInt($('update').value);
    const task = $('inputTask').value;
    if(task == '') {
      alert('Task is required');
      return;
    }
    this.tasks[index] = task;
    this.setStorage();
    this.show();
    $('update').classList.add('d-none');
    $('add').classList.remove('d-none');
  },
  setForm: function(index) {
    $('inputTask').value = this.tasks[index];
    $('update').value = index;
    $('update').classList.remove('d-none');
    $('add').classList.add('d-none');
  },
  show: function() {
    $('tasks').innerHTML = '';
    this.tasks.forEach((item, i) => {
      const $li = document.createElement('li');
      $li.className = 'list-group-item border-0';
      const $btn = document.createElement('button');
      $btn.setAttribute('type', 'button');
      $btn.classList = 'btn btn-link';
      const textbtn = document.createTextNode('Delete');
      $btn.appendChild(textbtn);
      $btn.addEventListener('click', this.delete.bind(this, i))
      const text = document.createTextNode(item);

      const $edit = document.createElement('button');
      $edit.setAttribute('type', 'button');
      $edit.classList = 'btn btn-link';
      const textEdit = document.createTextNode('Edit');
      $edit.appendChild(textEdit);
      $edit.addEventListener('click', this.setForm.bind(this, i))

      $li.appendChild($btn);
      $li.appendChild($edit);
      $li.appendChild(text);
      $('tasks').appendChild($li);
    })
  } 
}

managerTask.getStorage();
$('add').onclick = function() {
  managerTask.add();
}
$('clear').onclick = function() {
  managerTask.clear();
}
$('update').onclick = function() {
  managerTask.update();
}
