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
  const $btn = document.createElement('button')
  const $text = document.createTextNode(text)

  $btn.className = classes
  $btn.appendChild($text)
  $btn.addEventListener('click', handleEvent)

  return $btn
}

const Hotel = function (
  id = 0,
  roomID = '',
  roomType = '',
  roomPrice = '',
  checkinDate = '',
  checkoutDate = '',
) {
  this.id = id
  this.roomID = roomID
  this.roomType = roomType
  this.roomPrice = roomPrice
  this.checkinDate = checkinDate
  this.checkoutDate = checkoutDate
}

Hotel.prototype.initRowHotel = function (index, count, detail, $action) {
  const $index = $td(index + 1)
  const $count = $td(count)
  const $roomID = $td(this.roomID)
  const $roomType = $td(this.roomType)
  const $roomPrice = $td(this.roomPrice)
  const $checkinDate = $td(this.checkinDate)
  const $checkoutDate = $td(this.checkoutDate)
  const $detail = document.createElement('td')
  $detail.appendChild(detail)
  return $tr([
    $index,
    $roomID,
    $count,
    $roomType,
    $roomPrice,
    $checkinDate,
    $checkoutDate,
    $detail,
    $action,
  ])
}

const Guest = function (
  id = 0,
  fullName = '',
  gender = '',
  birthday = '',
  cardID = '',
) {
  this.id = id
  this.fullName = fullName
  this.gender = gender
  this.birthday = birthday
  this.cardID = cardID
}

Guest.prototype.initRowGuest = function (index, $action) {
  const $index = $td(index + 1)
  const $fullName = $td(this.fullName)
  const $gender = $td(this.gender)
  const $birthday = $td(this.birthday)
  const $cardID = $td(this.cardID)
  const $row = $tr([$index, $fullName, $gender, $birthday, $cardID, $action])
  return $row
}

const managerGuest = {
  getStorage: null,
  setStorage: null,
  guests: [],
  auto_increase_id: 1,
  update: null,
  add: null,
  show: null,
  delete: null,
  findByHotel: null,
  deleteByHotel: null,
  setForm: null,
  initTable: null,
}

const managerHotel = {
  getStorage: null,
  setStorage: null,
  auto_increase_id: 1,
  hotels: [],
  update: null,
  add: null,
  setSelect: null,
  show: null,
  delete: null,
  setForm: null,
}

managerGuest.setStorage = function () {
  localStorage.setItem('guests', JSON.stringify(this.guests))
}

managerGuest.getStorage = function () {
  this.guests = JSON.parse(localStorage.getItem('guests') || '[]').map(
    (g) =>
      new Guest(g.id, g.fullName, g.gender, g.birthday, g.cardID, g.hotel_id),
  )
  this.auto_increase_id = Math.max(...this.guests.map((g) => g.id), 0) + 1
}

managerGuest.add = function (fullName, gender, birthday, cardID, hotel_id) {
  const guest = new Guest(
    this.auto_increase_id++,
    fullName,
    gender,
    birthday,
    cardID,
    hotel_id,
  )
  this.guests.push(guest)
  this.setStorage()
  managerHotel.show()
}

managerGuest.findByHotel = function (hotel_id) {
  return this.guests.filter((g) => g.hotel_id == hotel_id) || []
}

managerGuest.delete = function (id) {
  const index = this.guests.findIndex((g) => g.id == id)
  if (index == -1) return
  this.guests.splice(index, 1)
  this.setStorage()
  managerHotel.show()
}

managerGuest.deleteByHotel = function (hotel_id) {
  this.guests = this.guests.filter(g => g.hotel_id != hotel_id);
  this.setStorage();
  managerHotel.show();
}

managerGuest.update = function (
  id,
  fullName,
  gender,
  birthday,
  cardID,
  hotel_id,
) {
  const guest = this.guests.find((g) => g.id == id)
  if (guest == null) {
    alert('Guest is not exist')
    return
  }
  guest.fullName = fullName
  guest.gender = gender
  guest.birthday = birthday
  guest.cardID = cardID
  guest.hotel_id = hotel_id

  this.setStorage()
  this.setForm(new Guest())
  managerHotel.show()
}

managerGuest.show = function (hotel_id) {
  const guests = this.findByHotel(hotel_id)
  if (guests.length == 0) return document.createElement('table')

  let $rows = []
  guests.forEach((guest, i) => {
    const $action = document.createElement('td')
    const $edit = $btn(
      'Edit',
      'btn btn-warning',
      this.setForm.bind(this, guest),
    )
    const $delete = $btn(
      'Delete',
      'btn btn-danger ms-2',
      this.delete.bind(this, guest.id),
    )
    $action.appendChild($edit)
    $action.appendChild($delete)
    $rows.push(guest.initRowGuest(i, $action))
  })
  return this.initTable($rows)
}

managerGuest.initTable = function ($rows) {
  const thead = $thead(
    'No.',
    'Full Name',
    'Gender',
    'Birthday',
    'Card ID',
    'Action',
  )
  const tbody = document.createElement('tbody')
  $rows.forEach(($row) => {
    tbody.appendChild($row)
  })
  return $table(thead, tbody)
}

managerGuest.setForm = function (g) {
  $('fullName').value = g.fullName
  $('gender').checked = g.gender == 'Male' ? true : false
  $('birthday').value = g.birthday
  $('cardID').value = g.cardID
  $('room').value = g.hotel_id
  if (g.id != 0) {
    $('update_guest').value = g.id
    $('update_guest').classList.remove('d-none')
    $('add_guest').classList.add('d-none')
  } else {
    $('update_guest').classList.add('d-none')
    $('add_guest').classList.remove('d-none')
  }
}

managerGuest.count = function(hotel_id) {
  return this.guests.filter(g => g.hotel_id == hotel_id).length;
}

managerGuest.validate = function(fullName, birthday, cardID, hotel_id) {
  if(fullName == '') {
    alert('Fullname is required');
    return false;
  }
  if(birthday == '') {
    alert('Birthday is required');
    return false;
  }
  if(cardID == null || cardID == '') {
    alert('Card ID is not exist')
    return false;
  }
  if(hotel_id == '') {
    alert('Hotel is required');
    return false;
  }
  return true;
}

managerGuest.getStorage();

managerHotel.setStorage = function () {
  localStorage.setItem('hotels', JSON.stringify(this.hotels))
}

managerHotel.getStorage = function () {
  const hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
  this.hotels = hotels.map(h => new Hotel(h.id, h.roomID, h.roomType, h.roomPrice, h.checkinDate, h.checkoutDate));
  this.auto_increase_id = Math.max(...this.hotels.map(g => g.id), 0) + 1;
  this.show();
}

managerHotel.add = function(roomID, roomType, roomPrice, checkinDate, checkoutDate) {
  this.hotels.push(this.auto_increase_id++, roomID, roomType, roomPrice, checkinDate, checkoutDate);
  this.setStorage();
  this.setForm(new Hotel());
  this.show();
}

managerHotel.setSelect = function() {
  let html = '';
  this.hotels.forEach(h => {
    html += `<option value="${h.id}">${h.roomID}</option>`
  })  
  $('room').innerHTML = html;
}

managerHotel.show = function() {
  $('app').innerHTML = '';
  this.setSelect();
  this.hotels.forEach((h, i) => {
      const $action = document.createElement('td');
      const $edit = $btn('Edit', 'btn btn-warning', this.setForm.bind(this, h));
      const $delete = $btn('Delete', 'btn btn-danger ms-2', this.delete.bind(this, h.id));
      
      $action.appendChild($edit);
      $action.appendChild($delete);

      const $detail = managerGuest.show(h.id);
      $('app').appendChild(h.initRowHotel(i, managerGuest.count(h.id), $detail, $action));
  });
}

managerHotel.update = function(id, roomID, roomType, roomPrice, checkinDate, checkoutDate) 
{
  const h = this.hotels.find(h => h.id == id);
  if (h == null) {
    alert('Hotel is not exist');
    return;
  }
  h.roomID = roomID;
  h.roomType = roomType;
  h.roomPrice = roomPrice;
  roomPrice = parseInt(roomPrice);
  h.checkinDate = checkinDate;
  h.checkoutDate = checkoutDate;
  this.setStorage();
  this.setForm(new Hotel());
  this.show();
}

managerHotel.delete = function(id) {
  const index = this.hotels.findIndex(h => h.id == id);
  if(index >= 0) {
    this.hotels.splice(index, 1);
    managerGuest.deleteByHotel(id);
    this.setStorage();
    this.show();
  }
}

managerHotel.setForm = function(h) {
  $('roomID').value = h.roomID;
  $('roomType').value = h.roomType;
  $('roomPrice').value = h.roomPrice;
  $('checkinDate').value = h.checkinDate;
  $('checkoutDate').value = h.checkoutDate;
  if(h.id != 0) {
    $('add_hotel').classList.add('d-none');
    $('update_hotel').value = h.id;
    $('update_hotel').classList.remove('d-none');
  } else {
    $('add_hotel').classList.remove('d-none');
    $('update_hotel').classList.add('d-none');
  }
}

managerHotel.validate = function(roomID, roomType, roomPrice, checkinDate, checkoutDate) {
  if(roomID == '') {
    alert('Room ID is required');
    return false
  } 
  if(roomType == '') {
    alert('Room type is required');
    return false;
  }
  roomPrice = parseInt(roomPrice)
  if(roomPrice == '' || isNaN(roomPrice) || roomPrice < 0) {
    alert('Room price is invalid')
    return false;
  }
  if(checkinDate == '') {
    alert('Checkin Date is required');
    return false;
  }
  if(checkoutDate == '') {
    alert('Checkout Date is required');
    return false;
  }
  return true;
}

managerHotel.getStorage();

$('add_hotel').onclick = function() {
  const roomID = $('roomID').value;
  const roomType = $('roomType').value;
  let roomPrice = $('roomPrice').value;
  roomPrice = parseInt(roomPrice);
  const checkinDate = $('checkinDate').value;
  const checkoutDate = $('checkoutDate').value;
  if(managerHotel.validate(roomID, roomType, roomPrice, checkinDate, checkoutDate)) {
    managerHotel.add(roomID, roomType, roomPrice, checkinDate, checkoutDate);
  }
}


$('update_hotel').onclick = function() {
  const id = this.value;
  const roomID = $('roomID').value;
  const roomType = $('roomType').value;
  let roomPrice = $('roomPrice').value;
  roomPrice = parseInt(roomPrice);
  const checkinDate = $('checkinDate').value;
  const checkoutDate = $('checkoutDate').value;
  if(managerHotel.validate(roomID, roomType, roomPrice, checkinDate, checkoutDate)) {
    managerHotel.update(id, roomID, roomType, roomPrice, checkinDate, checkoutDate);
  }
}

$('add_guest').onclick = function() {
  const fullName = $('fullName').value;
  const gender = $('gender').checked ? 'Male' : 'Female';
  const birthday = $('birthday').value;
  const cardID = $('cardID').value;
  const hotel_id = $('room').value;
  if(managerGuest.validate(fullName, birthday, cardID, hotel_id)) {
    managerGuest.add(fullName, gender, birthday, cardID, hotel_id);
  }
}

$('update_guest').onclick = function() {
  const id = this.value;
  const fullName = $('fullName').value;
  const gender = $('gender').checked ? 'Male' : 'Female';
  const birthday = $('birthday').value;
  const cardID = $('cardID').value;
  const hotel_id = $('room').value;
  if(managerGuest.validate(fullName, birthday, cardID, hotel_id)) {
    managerGuest.update(id, fullName, gender, birthday, cardID, hotel_id);
  }
}