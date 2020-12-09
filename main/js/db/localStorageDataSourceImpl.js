class LocalStorageDataSourceImpl {
    getPlainObject(tableName) {
        return JSON.parse(localStorage.getItem(tableName));
    }

    setPlainObject(tableName, data) {
        localStorage.setItem(tableName, JSON.stringify(data));
    }

    getTotalCount(tableName) {
        let rows = getPlainObject(tableName);
        return rows ? rows.length : 0;
    }
}
