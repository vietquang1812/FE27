'use strict'

const $ = (id) => {
  return document.getElementById(id);
}

const $tr = ($item) => {
  let tr = document.createElement('tr');
  $item.forEach(item => {
    tr.appendChild(item);
  })
  return tr;
}

const $td = (text) => {
  let $text = document.createTextNode(text);
  const td = document.createElement('td');
  td.appendChild($text);
  return td;
}

const $thead = (...texts) => {
  const thead = document.createElement('thead');
  let $texts = [];
  texts.forEach(text => {
    const td =$td(text);
    $texts.push(td);
  })
  const tr = $tr($texts);
  thead.appendChild(tr);
  return thead;
}

const $table = (thead, tbody) => {
  const table = document.createElement('table');
  table.className = 'table';
  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

const $btn = (text, classes, handerEvent) => {
  const btn = documen.createElement('button');
  btn.setAttribute('type', 'button');
  btn.className = classes;
  const $text = document.createTextNode(text);
  btn.appendChild($text);
  btn.addEventListener('click', handerEvent);
  return btn;
}

const managerPeople = {
  peoples: [],
  setStorage: function() {
    localStorage.setItem('people', JSON.stringify(this.peoples));
  },
  getStorage: function() {
    this.peoples = JSON.parse(localStorage.getItem('people') || '[]')
    this.show();
  },
  add: function(people_id, fullName, relationship, birthday, job) {
    const item = {
      people_id,
      fullName,
      relationship,
      birthday, 
      job
    }
    this.setStorage();
    this.peoples.push(item);
  },
  update: function(old_people_id, people_id,  fullName, relationship, birthday, job) {
    const item = this.peoples.find(t => t.people_id == old_people_id)
    if (item == null) {
      alert('Item is not exist')
      return
    }
    item.people_id = people_id,
    item.fullName = fullName,
    item.relationship = relationship,
    item.birthday = birthday,
    item.job = job
    
    this.setStorage();
    this.show();
    $('update').classList.add('d-none');
    $('add').classList.remove('d-none');
  },
  setForm: function(index) {
    $('fullName').value = item.fullName;
    $('relationship').value = item.relationship;
    $('birthday').value = item.birthday;
    $('job').value = item.job; 
    $('update').value = index
    $('update').classList.remove('d-none');
    $('add').classList.add('d-none');
  },

  show: function() {
    $('people').innerHTML = '';
    for(let i = 0; i < this.peoples.length; i++) {
      const $people_id = $td(this.peoples[i].people_id);
      const $fullName = $td(this.peoples[i].fullName);
      const $relationship = $td(this.peoples[i].relationship);
      const $birthday = $td(this.peoples[i].birthday);
      const $job = $td(this.peoples[i].job);
      const $row = $tr([$people_id, $fullName, $relationship, $birthday, $job]);
      $('people').appendChild($row);
    }
  },

  checkExistId: function(id) {
    let is_exist = false;
    for(let i = 0; i < this.peoples.length; i++) {
      if(id == this.peoples[i].people_id) {
        is_exist = true;
        break;
      }
    }
    return is_exist;
  }
}

managerPeople.getStorage();

$('add_people').onclick = () => {
  const people_id = $('people_id').value;
  const fullName = $('fullName').value;
  const relationship = $('relationship').value;
  const birthday = $('birthday').value;
  const job = $('job').value;
  if (managerPeople.checkExistId(people_id) || people_id == '') {
    alert('People ID not null or has exist')
    return
  } 
  if (fullName == '') {
    alert('Full Name is reuired')
    return
  }
  if (relationship == '') {
    alert('Relationship is required')
    return
  }
  if (birthday == '') {
    alert('Please choose date')
    return
  }
  if (job == '') {
    alert('Job is required')
    return
  }
  managerPeople.add(people_id, fullName, relationship, birthday, job)
  managerPeople.show();
  $('people_id').value = '';
  $('fullName').value = '';
  $('relationship').value = '';
  $('birthday').value = '';
  $('job').value = '';
}

const managerHousehold = {
  households: [],
  add: function(household_id, address) {
    const item = {
      household_id,
      address
    }
    this.households.push(item);
  },

  number: function() {
    let sum = 0;  
    for(let i = 0; i < this.households.length; i++) {
      
    }
  },
  update: function() {},
  setForm: function() {},
  delete: function() {},
  show: function() {},
  addPeople() {},
  removePeople() {},
  editPeople() {}
}