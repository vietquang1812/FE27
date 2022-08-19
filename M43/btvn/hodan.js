'use strict';

const $ = id => (document.getElementById(id));



const $tr = $list => {
    const tr = document.createElement('tr');
    $list.forEach($item => {
        tr.appendChild($item);
    });

    return tr;
}

const $td = text => {
    const td = document.createElement('td');
    const $text = document.createTextNode(text);
    td.appendChild($text);

    return td;
}
const $thead = (...texts) => {
    const thead = document.createElement('thead');
    let $texts = [];
    texts.forEach(text => {
        const td = $td(text);
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

const $btn = (text, classes, handleEvent) => {
    const $btn = document.createElement('button');
    const $text = document.createTextNode(text);

    $btn.className = classes;
    $btn.appendChild($text);
    $btn.addEventListener('click', handleEvent);

    return $btn;
}

const HouseHole = function(id = 0, address = '') {
    this.id = id;
    this.address = address;
}

HouseHole.prototype.initRowHH = function(index, count, detail, $action) {
    const $index = $td(index+1);
    const $count = $td(count);
    const $address = $td(this.address);
    const $detail = document.createElement('td');
    $detail.appendChild(detail);
    return $tr([$index, $address, $count, $detail, $action]);
}

const PeoPle = function(id = 0, fullname = '', gender = '', bod = '', hh_id = '') {
    this.id = id;
    this.fullname = fullname;
    this.gender = gender;
    this.bod = bod;
    this.hh_id = hh_id;
}

PeoPle.prototype.initRowPeoPle = function(index, $action) {
    const $index = $td(index+1);
    const $fullname = $td(this.fullname);
    const $gender = $td(this.gender);
    const $bod = $td(this.bod);
    const tr = $tr([$index, $fullname, $gender, $bod, $action]);
    return tr;
}

const managerPeople = {
    get: null,
    set: null,
    peoples: [],
    auto_increase_id: 1,
    update: null,
    add: null,
    show: null,
    delete: null,
    findByHH: null,
    deleteByHH: null,
    setForm: null,
    initTable: null,
}
const managerHouseHole = {
    get: null,
    set: null,
    houseHoles: [],
    auto_increase_id: 1,
    update: null,
    add: null,
    show: null,
    delete: null,
    setForm: null,
}

managerPeople.get = function() {
    this.peoples = JSON.parse(localStorage.getItem('peoples') || '[]')
                    .map(p => new PeoPle(p.id, p.fullname, p.gender, p.bod, p.hh_id));

    this.auto_increase_id = Math.max(...this.peoples.map(p => p.id), 0) + 1;
}

managerPeople.set = function() {
    localStorage.setItem('peoples', JSON.stringify(this.peoples));
}

managerPeople.add = function(fullname, gender, bod, hh_id) {
    const pp = new PeoPle(this.auto_increase_id++, fullname,gender,bod, hh_id);
    this.peoples.push(pp);
    this.set();
    managerHouseHole.show();
}
managerPeople.update = function(id, fullname, gender, bod, hh_id) {
    const pp = this.peoples.find(p => p.id == id);
    if(pp == null) {
        alert('People is not exist');
        return;
    }
    pp.fullname = fullname;
    pp.gender = gender;
    pp.bod = bod;
    pp.hh_id = hh_id;
    this.set();
    this.setForm(new PeoPle());
    managerHouseHole.show();
}

managerPeople.findByHH = function(hh_id) {
    return this.peoples.filter(p => p.hh_id == hh_id) || [];
}

managerPeople.delete = function(id) {
    const index = this.peoples.findIndex(p => p.id == id);
    if(index == -1) return;
    this.peoples.splice(index, 1);
    this.set();
    managerHouseHole.show();
}

managerPeople.deleteByHH = function(hh_id) {
    this.peoples = [...this.peoples.filter(p => p.hh_id == hh_id)];
    this.set();
}

managerPeople.show = function(hh_id) {
    const pps = this.findByHH(hh_id);
    if(pps.length == 0) return document.createElement('table');

    let $rows = [];
    pps.forEach((pp, i) => {
        const $action = document.createElement('td');
        const $edit = $btn('Edit', 'btn btn-info', this.setForm.bind(this, pp));
        const $dlte = $btn('Delete', 'btn btn-danger ms-2', this.delete.bind(this, pp.id));
        $action.appendChild($edit);
        $action.appendChild($dlte);
        $rows.push(pp.initRowPeoPle(i, $action));
    })
    return this.initTable($rows);
}

managerPeople.initTable = function($rows) {
    const thead = $thead('No.', 'Full Name', 'Gender', 'BoD', 'Action');
    const tbody = document.createElement('tbody');
    $rows.forEach($row => {
        tbody.appendChild($row);
    });
    return $table(thead, tbody);
}

managerPeople.setForm = function(p) {
    $('fullname').value = p.fullname;
    $('gender').checked = p.gender == 'Male' ? true : false;
    $('bod').value = p.bod;
    $('houseHole').value = p.hh_id;
    if(p.id != 0) {
        $('update_people').value = p.id;
        $('update_people').classList.remove('d-none');
        $('add_people').classList.add('d-none');
    } else {
        $('update_people').classList.add('d-none');
        $('add_people').classList.remove('d-none');
    }
    
}

managerPeople.count = function(hh_id) {
    return this.peoples.filter(p => p.hh_id == hh_id).length;
}

managerPeople.validate = function(fullname, bod, hh_id) {
    if(fullname == '') {
        alert('Fullname is required');
        return false;
    }
    if(bod == '') {
        alert('BoD is required');
        return false;
    }
    if(hh_id == '') {
        alert('HH is required');
        return false;
    }
    return true;
}


managerHouseHole.get = function() {
    const hhs = JSON.parse(localStorage.getItem('houseHoles') || '[]');
    this.houseHoles = hhs.map(h => new HouseHole(h.id, h.address));
    this.auto_increase_id = Math.max(...this.houseHoles.map(p => p.id), 0) + 1;
    this.show();
}

managerHouseHole.set = function() {
    localStorage.setItem('houseHoles', JSON.stringify(this.houseHoles));
}

managerHouseHole.add = function(address) {
    this.houseHoles.push(new HouseHole(this.auto_increase_id++, address));
    this.set();
    this.setForm(new HouseHole());
    this.show();
}

managerHouseHole.setSelect = function() {
    let html = '';
    this.houseHoles.forEach(h => {
        html += `<option value="${h.id}">${h.address}</option>`
    })
    $('houseHole').innerHTML = html;
}

managerHouseHole.show = function() {
    $('app').innerHTML = '';
    this.setSelect();
    this.houseHoles.forEach((h, i) => {
        const $action = document.createElement('td');
        const $edit = $btn('Edit', 'btn btn-info', this.setForm.bind(this, h));
        const $dlte = $btn('Delete', 'btn btn-danger ms-2', this.delete.bind(this, h.id));
        
        $action.appendChild($edit);
        $action.appendChild($dlte);

        const $detail = managerPeople.show(h.id);
        $('app').appendChild(h.initRowHH(i, managerPeople.count(h.id), $detail, $action));

    });
}

managerHouseHole.update = function(id, address) {
    const h = this.houseHoles.find(h => h.id == id);
    if(h == null) {
        alert('House Hole is not exist');
        return;
    }
    h.address = address;
    this.set();
    this.setForm(new HouseHole());
    this.show();
}

managerHouseHole.delete = function(id) {
    const index = this.houseHoles.findIndex(h => h.id == id);
    if(index >= 0) {
        this.houseHoles.splice(index, 1);
        managerPeople.deleteByHH(id);
        this.set();

        this.show();
    }
}
managerHouseHole.setForm = function(h) {
    $('address').value = h.address;
    if(h.id != 0) {
        $('add_houseHole').classList.add('d-none');
        $('update_houseHole').value = h.id;
        $('update_houseHole').classList.remove('d-none');
    } else {
        $('add_houseHole').classList.remove('d-none');
        $('update_houseHole').classList.add('d-none');
    }
    
}

managerHouseHole.validate = function(address) {
    if(address == '') {
        alert('Address is required');
        return false;
    }
    return true;
}


managerPeople.get();
managerHouseHole.get();

$('add_houseHole').onclick =  function() {
    const address = $('address').value;
    if(managerHouseHole.validate(address)) {
        managerHouseHole.add(address);
    }
}

$('update_houseHole').onclick =  function() {
    const id = this.value;
    const address = $('address').value;
    if(managerHouseHole.validate(address)) {
        managerHouseHole.update(id,address);
    }
}


$('add_people').onclick =  function() {
    const fullname = $('fullname').value;
    const gender = $('gender').checked ? 'Male' : 'Female';
    const bod = $('bod').value;
    const hh_id = $('houseHole').value;
    if(managerPeople.validate(fullname, bod, hh_id)) {
        managerPeople.add(fullname, gender, bod, hh_id);
    }
}

$('update_people').onclick =  function() {
    const id = this.value;
    const fullname = $('fullname').value;
    const gender = $('gender').checked ? 'Male' : 'Female';
    const bod = $('bod').value;
    const hh_id = $('houseHole').value;
    if(managerPeople.validate(fullname, bod, hh_id)) {
        managerPeople.update(id,fullname, gender, bod, hh_id);
    }
}
