const validate = (val, rules, connectedValue) => {
	let isValid = true;
	for (const rule in rules) {
		switch (rule) {
			case 'isEmail':
				return (isValid = isValid && emailValidator(val));

			case 'minLength':
				return (isValid =
					isValid && minLengthValidator(val, rules[rule]));

			case 'equalTo':
				return (isValid =
					isValid && equalToValidator(val, connectedValue[rule]));

			case 'isNotEmpty':
				return (isValid = isValid && isNotEmptyValidator(val));

			default:
				isValid = true;
		}
	}
	return isValid;
};

const emailValidator = val => {
	return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
};

const minLengthValidator = (val, minLength) => {
	return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
	return val === checkValue;
};

const isNotEmptyValidator = val => {
	return val.trim() !== '';
};

export default validate;
