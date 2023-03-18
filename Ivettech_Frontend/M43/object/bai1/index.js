'use strict'

const $ = (id) => {
  return document.getElementById(id)
}

const $tr = ($list) => {
  let tr = document.createElement('tr')
  $list.forEach(($item) => {
    tr.appendChild($item)
  })
  return tr
}

const $td = (text) => {
  const td = document.createElement('td')
  const $text = document.createTextNode(text)
  td.appendChild($text)
  return td
}

const $thead = (...texts) => {
  const thead = document.createElement('thead')
  let $texts = []
  texts.forEach((text) => {
    const td = $td(text)
    $texts.push(td)
  })
  const tr = $tr($texts)
  thead.appendChild(tr)
  return thead
}

const $table = (thead, tbody) => {
  const table = document.createElement('table')
  table.className = 'table'
  table.appendChild(thead)
  table.appendChild(tbody)
  return table
}

const $btn = (text, classes, handleEvent) => {
  const btn = document.createElement('button')
  btn.setAttribute('type', 'button')
  btn.className = classes
  const $text = document.createTextNode(text)
  btn.appendChild($text)
  btn.addEventListener('click', handleEvent)
  return btn
}

const People = function (
  id = 0,
  fullName = '',
  gender = '',
  relationship = '',
  birthday = '',
  job = '',
  household_id = '',
) {
  this.id = id
  this.fullName = fullName
  this.gender = gender
  this.relationship = relationship
  this.birthday = birthday
  this.job = job
  this.household_id = household_id
}

People.prototype.initRowPeople = function (index, $action) {
  const $index = $td(index + 1)
  const $fullName = $td(this.fullName)
  const $gender = $td(this.gender)
  const $relationship = $td(this.relationship)
  const $birthday = $td(this.birthday)
  const $job = $td(this.job)
  const tr = $tr([
    $index,
    $fullName,
    $gender,
    $relationship,
    $birthday,
    $job,
    $action,
  ])
  return tr
}

const HouseHold = function (id = 0, address = '') {
  this.id = id
  this.address = address
}

HouseHold.prototype.initRowHH = function (index, count, detail, $action) {
  const $index = $td(index + 1)
  const $count = $td(count)
  const $address = $td(this.address)
  const $detail = document.createElement('td')
  $detail.appendChild(detail)
  return $tr([$index, $count, $address, $detail, $action])
}

const managerPeople = {
  peoples: [],
  auto_increase_id: 1,
  setStorage: function () {
    localStorage.setItem('peoples', JSON.stringify(this.peoples))
  },
  getStorage: function () {
    this.peoples = JSON.parse(localStorage.getItem('peoples') || '[]').map(
      (p) =>
        new People(
          p.id,
          p.fullName,
          p.gender,
          p.relationship,
          p.birthday,
          p.job,
          p.household_id,
        ),
    )
    this.auto_increase_id = Math.max(...this.peoples.map((p) => p.id), 0) + 1
  },
  add: function (fullName, gender, relationship, birthday, job, household_id) {
    const pp = new People(
      this.auto_increase_id++,
      fullName,
      gender,
      relationship,
      birthday,
      job,
      household_id,
    )
    this.peoples.push(pp)
    this.setStorage()
    managerHousehold.show()
  },

  update: function (
    id,
    fullName,
    gender,
    relationship,
    birthday,
    job,
    household_id,
  ) {
    const pp = this.peoples.find((p) => p.id == id)
    if (pp == null) {
      alert('People is not exist')
      return
    }
    ;(pp.fullName = fullName),
      (pp.gender = gender),
      (pp.relationship = relationship),
      (pp.birthday = birthday),
      (pp.job = job),
      (pp.household_id = household_id)

    this.setStorage()
    this.setForm(new People())
    managerHousehold.show()
  },

  findByHH: function (household_id) {
    return this.peoples.filter((p) => p.household_id == household_id) || []
  },

  delete: function (id) {
    const index = this.peoples.findIndex((p) => p.id == id)
    if (index == -1) return
    this.peoples.splice(index, 1)
    this.setStorage()
    managerHousehold.show()
  },

  deleteByHH: function (household_id) {
    this.peoples = [
      ...this.peoples.filter((p) => p.household_id == household_id),
    ]
    this.setStorage()
  },

  show: function (household_id) {
    const pps = this.findByHH(household_id)
    if (pps.length == 0) return document.createElement('table')

    let $rows = []
    pps.forEach((pp, i) => {
      const $action = document.createElement('td')
      const $edit = $btn('Edit', 'btn btn-warning', this.setForm.bind(this, pp))
      const $delete = $btn(
        'Delete',
        'btn btn-danger ms-2',
        this.delete.bind(this, pp.id),
      )
      $action.appendChild($edit)
      $action.appendChild($delete)
      $rows.push(pp.initRowPeople(i, $action))
    })
    return this.initTable($rows)
  },

  initTable: function ($rows) {
    const thead = $thead(
      'No.',
      'Full Name',
      'Gender',
      'Relationship',
      'Birthday',
      'Job',
      'Action',
    )
    const tbody = document.createElement('tbody')
    $rows.forEach(($row) => {
      tbody.appendChild($row)
    })
    return $table(thead, tbody)
  },

  setForm: function (p) {
    $('fullName').value = p.fullName
    $('gender').checked = p.gender == 'Male' ? true : false
    $('relationship').value = p.relationship
    $('birthday').value = p.birthday
    $('job').value = p.job
    $('houseHold').value = p.household_id
    if (p.id != 0) {
      $('update_people').value = p.id
      $('update_people').classList.remove('d-none')
      $('add_people').classList.add('d-none')
    } else {
      $('update_people').classList.add('d-none')
      $('add_people').classList.remove('d-none')
    }
  },

  count: function (household_id) {
    return this.peoples.filter((p) => p.household_id == household_id).length
  },
}

managerPeople.getStorage()

const managerHousehold = {
  households: [],
  auto_increase_id: 1,
  setStorage: function () {
    localStorage.setItem('households', JSON.stringify(this.households))
  },
  getStorage: function () {
    const hhs = JSON.parse(localStorage.getItem('households') || '[]')
    this.households = hhs.map((h) => new HouseHold(h.id, h.address))
    this.auto_increase_id = Math.max(...this.households.map((p) => p.id), 0) + 1
    this.show()
  },

  add: function (address) {
    const item = new HouseHold(this.auto_increase_id++, address)
    this.households.push(item)
    this.setStorage()
    this.setForm(new HouseHold())
    this.show()
  },

  setSelect: function () {
    let html = ''
    this.households.forEach((h) => {
      html += `<option value="${h.id}">${h.address}</option>`
    })
    $('houseHold').innerHTML = html
  },

  show: function () {
    $('app').innerHTML = ''
    this.setSelect()
    this.households.forEach((h, i) => {
      const $action = document.createElement('td')
      const $edit = $btn('Edit', 'btn btn-warning', this.setForm.bind(this, h))
      const $delete = $btn(
        'Delete',
        'btn btn-danger ms-2',
        this.delete.bind(this, h.id),
      )
      $action.appendChild($edit)
      $action.appendChild($delete)

      const $detail = managerPeople.show(h.id)
      $('app').appendChild(
        h.initRowHH(i, managerPeople.count(h.id), $detail, $action),
      )
    })
  },

  update: function (id, address) {
    const h = this.households.find((h) => h.id == id)
    if (h == null) {
      alert('House hold is not exist')
      return
    }
    h.address = address
    this.setStorage()
    this.setForm(new HouseHold())
    this.show()
  },

  delete: function (id) {
    const index = this.households.findIndex((h) => h.id == id)
    if (index >= 0) {
      this.households.splice(index, 1)
      managerPeople.deleteByHH(id)
      this.setStorage()
      this.show()
    }
  },

  setForm: function (h) {
    $('address').value = h.address
    if (h.id != 0) {
      $('add_household').classList.add('d-none')
      $('update_household').value = h.id
      $('update_household').classList.remove('d-none')
    } else {
      $('add_household').classList.remove('d-none')
      $('update_household').classList.add('d-none')
    }
  },
}

managerHousehold.getStorage()

$('add_people').onclick = () => {
  const fullName = $('fullName').value
  const gender = $('gender').checked ? 'Male' : 'Female'
  const relationship = $('relationship').value
  const birthday = $('birthday').value
  const job = $('job').value
  const household_id = $('houseHold').value
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
  if (household_id == '') {
    alert('Household ID is required')
  }
  managerPeople.add(fullName, gender, relationship, birthday, job, household_id)
  $('fullName').value = ''
  $('relationship').value = ''
  $('birthday').value = ''
  $('job').value = ''
  $('houseHold').value = ''
}

$('update_people').onclick = () => {
  const id = this.value
  const fullName = $('fullName').value
  const gender = $('gender').checked ? 'Male' : 'Female'
  const relationship = $('relationship').value
  const birthday = $('birthday').value
  const job = $('job').value
  const household_id = $('houseHold').value
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
  if (household_id == '') {
    alert('Household ID is required')
  }
  managerPeople.update(
    id,
    fullName,
    gender,
    relationship,
    birthday,
    job,
    household_id,
  )
  $('fullName').value = ''
  $('relationship').value = ''
  $('birthday').value = ''
  $('job').value = ''
  $('houseHold').value = ''
}

$('add_household').onclick = () => {
  const address = $('address').value
  if (address == '') {
    alert('Address is required')
    return
  }
  managerHousehold.add(address)
  $('address').value = ''
}

$('update_household').onclick = () => {
  const id = this.value
  const address = $('address').value
  if (address == '') {
    alert('Address is required')
    return
  }
  managerHousehold.update(id, address)
  $('address').value = ''
}
