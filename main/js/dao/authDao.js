class AuthDao {
    static CREDENTIAL_TABLE = 'auth';
    static SESSION_TABLE = 'session';

    constructor() {
        this.db = DataSourceFactory.getInstance();
    }

    hasAccess(credential) {
        let savedCreds = this.db.getPlainObject(AuthDao.CREDENTIAL_TABLE)[
            credential.username
        ];
        return Utility.equals(savedCreds, credential);
    }

    isUserExist(username) {
        let rows = this.db.getPlainObject(AuthDao.CREDENTIAL_TABLE);
        return !Utility.isEmpty(Utility.extractDataSafe(rows, username));
    }

    addAuth(credential) {
        let allData = this.db.getPlainObject(AuthDao.CREDENTIAL_TABLE);

        if (allData == null) {
            allData = {};
        }

        allData[credential.username] = credential;
        this.db.setPlainObject(AuthDao.CREDENTIAL_TABLE, allData);
    }

    setCurrentSession(user) {
        this.db.setPlainObject(AuthDao.SESSION_TABLE, user);
    }

    getCurrentUser() {
        return this.db.getPlainObject(AuthDao.SESSION_TABLE);
    }
}
