class HtmlElementUtility {
    static insertRows($table, rows) {
        rows.forEach((row, i) => {
            HtmlElementUtility.insertRow($table, row);
        });
    }

    static insertRow($table, row, nameAttr, colspan) {
        let $row = $table.insertRow();
        let columns = Object.entries(row);

        columns.forEach((column, i) => {
            HtmlElementUtility.insertCell($row, column[0], column[1], colspan);
        });

        if (nameAttr) {
            $row.setAttribute('name', nameAttr);
        }

        return $row;
    }

    static insertCell($row, nameAttr, value, colspan = 1) {
        let $cell = $row.insertCell();
        $cell.innerHTML = value;
        $cell.setAttribute('name', nameAttr);
        $cell.setAttribute('colspan', colspan);

        return $cell;
    }

    static findRowIndexByName($table, name) {
        $table.forEach(($tr, index) => {
            if ($tr.getAttribute('name') === name) {
                return index;
            }
        });
    }

    static attachEventOnRows(
        $table,
        eventFunction,
        shouldAttachOnHeader = false
    ) {
        Array.from($table.rows).forEach(($tr, index) => {
            // header
            if (index === 0 && !shouldAttachOnHeader) {
                return true;
            }
            $tr['onclick'] = eventFunction;
        });
    }

    static clearTable($table) {
        Array.from($table.rows).forEach(($tr, index) => {
            // header
            if (index === 0) {
                return true;
            }

            $table.deleteRow(1);
        });
    }

    static showAlert(alertElementId, alertText) {
        let $alert = document.getElementById(alertElementId);
        $alert.getElementsByClassName('alert-text')[0].innerHTML = alertText;
        HtmlElementUtility.showElement($alert);
    }

    static showElement($element) {
        $element.className = $element.className.replaceAll('hide', '');
    }

    static hideElement($element) {
        $element.className = $element.className.replaceAll('hide', '');
        $element.className = $element.className + ' hide';
    }
}
