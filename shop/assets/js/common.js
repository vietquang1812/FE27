const $ = id => (document.getElementById(id));

const common = {};

common.$row = $items => {
    const $tr = document.createElement('tr');
    $items.forEach($item => {
        $tr.appendChild($item);
    })

    return $tr;
}

common.$cell = text => {
    const $td = document.createElement('td');
    const $text = document.createTextNode(text);
    $td.appendChild($text);
    return $td;
}

common.$titles = $items => {
    const $thead = document.createElement('thead');
    const $tr = $tr($items);
    $thead.appendChild($tr);
}

common.$title = title=> {
    const $th = document.createElement('th');
    const $text = document.createTextNode(title);
    $th.appendChild($text);
    return $th;
}
common.$table = ($thead, $rows) => {
    const $tb = document.createElement('table');
    $tb.appendChild($thead);
    const $tbody = document.createElement('tbody');
    $rows.forEach($row => {
        $tbody.appendChild($row);

    });
    $tb.appendChild($tbody);
    return $tb;
}
