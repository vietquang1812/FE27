const $ = (id) => {
  return document.getElementById(id)
}

const pubLic = {}

pubLic.$rows = ($items) => {
  const tr = document.createElement('tr')
  $items.forEach(($item) => {
    tr.appendChild($item)
  })
  return tr
}

pubLic.$cells = (text, classes = '') => {
  const td = document.createElement('td')
  if (typeof text == 'object') {
    td.appendChild(text)
  } else {
    const $text = document.createTextNode(text)
    td.appendChild($text)
    td.className = classes
  }
  return td
}

pubLic.$cellImage = (url) => {
  const td = document.createElement('td')
  const img = new Image()
  img.src = url
  img.style.width = '150px'
  img.style.height = 'auto'
  td.appendChild(img)
  return td
}

pubLic.$titles = (titles) => {
  const $thead = document.createElement('thead')
  const $tr = pubLic.$rows(titles.map((title) => pubLic.$title(title)))
  $thead.appendChild($tr)
  return $thead
}

pubLic.$title = (title) => {
  const $th = document.createElement('th')
  const $text = document.createTextNode(title)
  $th.appendChild($text)
  return $th
}

pubLic.$table = ($thead, $rows) => {
  const $tb = document.createElement('table')
  $tb.className = 'table '
  $tb.appendChild($thead)
  const $tbody = document.createElement('tbody')
  $rows.forEach(($row) => {
    $tbody.appendChild($row)
  })
  $tb.appendChild($tbody)
  return $tb
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

pubLic.$div = (classes, $childs) => {
  const div = document.createElement('div')
  div.className = classes
  $childs.forEach(($child) => {
    div.appendChild($child)
  })
  return div
}

pubLic.$colProduct = (product, handleEvent) => {
  const $h5 = document.createElement('h5')
  $h5.className = 'card-title'
  const $title = document.createTextNode(product.name)
  $h5.appendChild($title)

  const $p = document.createElement('p')
  $p.className = 'card-text text-success'
  const $price = document.createTextNode(`${product.price} VNĐ`)
  $p.appendChild($price)

  const $btn = pubLic.$btn('Add to cart', 'btn btn-sm btn-primary', handleEvent)

  const $cardBody = pubLic.$div('card-body', [$h5, $p, $btn])
  const $img = new Image()
  $img.src = product.url
  $img.className = 'img-product'
  const $card = pubLic.$div('card', [$img, $cardBody])
  const $col = pubLic.$div('mt-3 col-12 col-sm-6 col-lg-4 col-xl-3', [$card])
  return $col
}

pubLic.formatPrice = price => {
  if(isNaN(price)) {
      return price;
  }
  let text = '';
  while(price > 0) {
      const du = price % 1000000;
      price = Math.floor(price / 1000);
      text = du + text;
      if(price > 0) {
          text = ',' + text;
      }
  }
  return text;
}

