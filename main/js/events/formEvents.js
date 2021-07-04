const LOGIN = 'Login';
const SIGN_UP = 'Sign Up';
const LOGIN_ACTION = 'data-action';

function onSubmitLoginForm($form, event) {
    event.preventDefault();
    if ($form.getAttribute(LOGIN_ACTION) === LOGIN) {
        onLogin($form);
        return;
    }

    onSignUp($form);
}

function onSignUp($form) {
    let formData = new FormData($form);
    let credential = new Credential(
        formData.get('username'),
        formData.get('password')
    );

    try {
        AppService.getInstance().createNewUser(
            credential,
            formData.get('confirm-password')
        );
    } catch (error) {
        HtmlElementUtility.showAlert('login-form-alert', error);
        return;
    }

    HtmlElementUtility.hideElement(document.getElementById('login-form-alert'));
    HtmlElementUtility.hideElement(document.getElementById('login-container'));
    HtmlElementUtility.showElement(document.getElementById('main-container'));
    loadTable();
}

function onLogin($form) {
    let formData = new FormData($form);
    let credential = new Credential(
        formData.get('username'),
        formData.get('password')
    );

    try {
        AppService.getInstance().loginUser(credential);
    } catch (error) {
        HtmlElementUtility.showAlert('login-form-alert', error);
        return;
    }

    HtmlElementUtility.hideElement(document.getElementById('login-form-alert'));
    HtmlElementUtility.hideElement(document.getElementById('login-container'));
    HtmlElementUtility.showElement(document.getElementById('main-container'));
    loadTable();
}

function validateUser() {
    const username = document.getElementById('username').value;
    const isUserExist = AppService.getInstance().isUserExist(username);

    const confirmPassword = document.getElementById('confirm-password');
    const loginActionButton = document.getElementById('action-button');
    const $form = document.getElementById('login-form');

    if (!isUserExist) {
        confirmPassword.setAttribute('required', true);
        HtmlElementUtility.showElement(confirmPassword.parentElement);
        loginActionButton.value = SIGN_UP;
        $form.setAttribute(LOGIN_ACTION, SIGN_UP);
    } else {
        confirmPassword.removeAttribute('required');

        HtmlElementUtility.hideElement(confirmPassword.parentElement);
        loginActionButton.value = LOGIN;
        $form.setAttribute(LOGIN_ACTION, LOGIN);
    }
}

function onSubmitGroceryForm($form, event) {
    event.preventDefault();

    let formData = new FormData($form);
    let grocery = new Grocery(
        formData.get('item-name'),
        formData.get('quantity')
    );

    try {
        AppService.getInstance().addGrocery(grocery);
    } catch (error) {
        HtmlElementUtility.showAlert('grocery-form-alert', error);
    }

    loadTable();
}

function onCloseAlert($alert) {
    HtmlElementUtility.hideElement($alert);
}
