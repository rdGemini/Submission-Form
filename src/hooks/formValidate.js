function ValidateMethods() {
    function isEmail(value) {
        const emailRule =
            /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        return {
            message: `Looks like this is not an email.`,
            isPass: new RegExp(emailRule).test(value),
        };
    }

    function isNotEmpty(value, name) {
        return {
            message: `${name} cannot be empty.`,
            isPass: value !== "",
        };
    }

    return {
        isEmail,
        isNotEmpty,
    };
}

function validateForm(value, checkList, name) {
    const validateMethods = new ValidateMethods();
    let result = {
        isPass: true,
        message: "",
    };
    let errorIndex;
    // * if all pass return !true else !false
    let isAllPass = checkList.every((eachMethod, index) => {
        const status = validateMethods[eachMethod](value, name);
        if (!status.isPass) {
            errorIndex = index;
            return false;
        }
        return true;
    });

    if (!isAllPass) {
        const status = validateMethods[checkList[errorIndex]](value, name);
        result = {
            isPass: status.isPass,
            message: status.message,
        };
    }
    return result;
}

export { validateForm };
