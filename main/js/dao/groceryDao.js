class GroceryDao {
    static GROCERY_TABLE = 'grocery';

    constructor() {
        this.db = DataSourceFactory.getInstance();
    }

    getGroceries(currentUser) {
        let allData = this.db.getPlainObject(GroceryDao.GROCERY_TABLE);
        return Utility.extractDataSafe(allData, currentUser);
    }

    addGrocery(currentUser, data) {
        let allData = this.db.getPlainObject(GroceryDao.GROCERY_TABLE);

        if (allData == null) {
            allData = {};
        }

        const currentUserData = Utility.extractDataSafe(allData, currentUser);

        if (Utility.isPresent(currentUserData, data)) {
            throw `${data.itemName} already Exists`;
        }

        currentUserData.push(data);

        allData[currentUser] = currentUserData;
        this.db.setPlainObject(GroceryDao.GROCERY_TABLE, allData);
    }

    removeGrocery(currentUser, data) {
        let allData = this.db.getPlainObject(GroceryDao.GROCERY_TABLE);

        if (allData == null) {
            throw `No data found to delete`;
        }

        const currentUserData = Utility.extractDataSafe(allData, currentUser);
        const filteredData = currentUserData.filter(function (dbData) {
            return !Utility.equals(dbData, data);
        });

        allData[currentUser] = filteredData;
        this.db.setPlainObject(GroceryDao.GROCERY_TABLE, allData);
    }
}
