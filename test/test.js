const appServiceTest = AppService.getInstance();

// Test data
const credential = new Credential('test-user1', 'test');
const newGrocery = new Grocery('Sugar', 1);

function createNewUserTest() {
    appServiceTest.createNewUser(credential);
    if (!appServiceTest.isUserExist(credential.username)) {
        throw 'Assertion failed';
    }

    console.log('Passed: createNewUserTest');
}

function sessionTest() {
    const username = appServiceTest.getCurrentUser();
    if (credential.username !== username) {
        throw 'Assertion failed';
    }
    console.log('Passed: sessionTest');
}

function addGroceryTest() {
    appServiceTest.addGrocery(newGrocery);
    const allGroceries = appServiceTest.getGroceries();
    const isNewGroceryPresent = Utility.isPresent(allGroceries, newGrocery);

    if (!isNewGroceryPresent) {
        throw 'Assertion Failed';
    }

    console.log('Passed: addGroceryTest');
}

function removeGroceryTest() {
    appServiceTest.deleteGrocery(newGrocery);
    const allGroceries = appServiceTest.getGroceries();
    const isNewGroceryPresent = Utility.isPresent(allGroceries, newGrocery);

    if (isNewGroceryPresent) {
        throw 'Assertion Failed';
    }

    console.log('Passed: removeGroceryTest');
}
