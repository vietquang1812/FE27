const $ = (id) => {
  return document.getElementById(id)
}

const pubLic = {
  $rows: null,
  $cells: null,
  $titles: null,
  $title: null,
  $table: null,
  $btn: null,
}

pubLic.$rows = ($items) => {
  const tr = document.createElement('tr')
  $items.forEach(($item) => {
    tr.appendChild($item)
  })
  return tr
}

pubLic.$cells = (text) => {
  const td = document.createElement('td')
  const $text = document.createTextNode(text)
  td.appendChild($text)
  return td
}

pubLic.$titles = ($items) => {
  const $thead = document.createElement('thead')
  const $tr = $tr($items)
  $thead.appendChild($tr)
}

pubLic.$title = (title) => {
  const $th = document.createElement('th')
  const $text = document.createTextNode(title)
  $th.appendChild($text)
  return $th
}

pubLic.$table = ($thead, $rows) => {
  const $table = document.createElement('table')
  $table.appendChild($thead)
  const $tbody = document.creteElement('tbody')
  $rows.forEach(($rows) => {
    $tbody.appendChild($rows)
  })
  $table.appendChild($tbody)
  return $table
}

pubLic.$btn = (text, classes, handleEvent) => {
  const btn = document.createElement('button')
  btn.setAttribute('type', 'button')
  btn.className = classes
  const $text = document.createTextNode(text)
  btn.appendChild($text)
  btn.addEventListener('click', handleEvent)
  return btn
}

export { pubLic }
// module.exports = {pubLic}