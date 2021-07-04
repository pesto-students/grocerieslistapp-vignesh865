class Utility {
    static equals(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    static extractDataSafe(obj, key, defaultValue = []) {
        return obj?.hasOwnProperty(key) ? obj[key] : defaultValue;
    }

    static isPresent(objList, objToCheck) {
        return (
            objList.filter((obj) => Utility.equals(obj, objToCheck)).length !==
            0
        );
    }

    static isEmpty(obj){
      return obj === null || obj === undefined || Object.values(obj).length === 0
    }
}
