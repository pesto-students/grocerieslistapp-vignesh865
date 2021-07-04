function loadTable() {
    const groceries = AppService.getInstance().getGroceries();
    const $table = document.getElementById('grocery-table');
    setCaption($table, groceries.length);

    if (groceries.length === 0) {
        loadEmpty();
        return;
    }

    HtmlElementUtility.clearTable($table);
    HtmlElementUtility.insertRows($table, groceries);
    HtmlElementUtility.attachEventOnRows($table, onClickTableRow);
}

function setCaption($table, availableCount) {
    const $caption = $table.createCaption();
    $caption.className = 'count-label';
    $caption.innerText = `Available count - ${availableCount}/10`;
}

function onClickTableRow(event) {
    const $table = document.getElementById('grocery-table');

    Array.from($table.rows).forEach(($tr, i) => {
        $tr.className = $tr.className.replaceAll('table-select', '');
        $tr.removeAttribute('data-selected');
    });

    event.currentTarget.className = 'table-select';
    event.currentTarget.setAttribute('data-selected', true);
}

function onDeleteTableRow() {
    const $table = document.getElementById('grocery-table');
    const rows = $table.getElementsByTagName('tr');

    Array.from(rows).forEach(($tr, i) => {
        if ($tr.getAttribute('data-selected')) {
            let itemName = $tr.getElementsByTagName('td')[0].innerText;
            let quantity = $tr.getElementsByTagName('td')[1].innerText;

            let grocery = new Grocery(itemName, quantity);
            AppService.getInstance().deleteGrocery(grocery);
        }
    });

    loadTable();
}

function loadEmpty() {
    const emptyObject = {
        emptyTableTr: 'No grocery present',
    };

    const $table = document.getElementById('grocery-table');
    HtmlElementUtility.clearTable($table);
    var $emptyRow = HtmlElementUtility.insertRow(
        $table,
        emptyObject,
        'emptyTableTr',
        2
    );
    $emptyRow.cells[0].className = 'no-data-tr';
}

function searchTable() {
    const filter = document.getElementById('search-input').value.toUpperCase();
    const $table = document.getElementById('grocery-table');
    const $tr = $table.getElementsByTagName('tr');

    for (let i = 0; i < $tr.length; i++) {
        let $td = $tr[i].getElementsByTagName('td')[0];
        if ($td) {
            let txtValue = $td.textContent || $td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                $tr[i].style.display = '';
            } else {
                $tr[i].style.display = 'none';
            }
        }
    }
}
