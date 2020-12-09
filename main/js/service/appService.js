class AppService {
    constructor() {
        this.groceryDao = new GroceryDao();
        this.authDao = new AuthDao();
    }

    addGrocery(grocery) {
        if (this.getGroceries().length >= 10) {
            throw 'Limit exceeded';
        }
        this.groceryDao.addGrocery(this.getCurrentUser(), grocery);
    }

    getGroceries() {
        const groceries = this.groceryDao.getGroceries(this.getCurrentUser());
        return groceries;
    }

    deleteGrocery(grocery) {
        this.groceryDao.removeGrocery(this.getCurrentUser(), grocery);
    }

    getCurrentUser() {
        return this.authDao.getCurrentUser();
    }

    createNewUser(credential, confirmPassword) {
        if (credential.password !== confirmPassword) {
            throw "Password doesn't match";
        }

        if (this.isUserExist(credential.username)) {
            throw 'User already exists';
        }

        this.authDao.addAuth(credential);
        this.authDao.setCurrentSession(credential.username);
    }

    loginUser(credential) {
        if (!this.hasAccess(credential)) {
            throw 'Wrong credentials';
        }

        this.authDao.setCurrentSession(credential.username);
    }
    hasAccess(credential) {
        return this.authDao.hasAccess(credential);
    }

    isUserExist(username) {
        return this.authDao.isUserExist(username);
    }

    static getInstance() {
        if (AppService.appService === undefined) {
            AppService.appService = new AppService();
            return AppService.appService;
        }
        return AppService.appService;
    }
}
