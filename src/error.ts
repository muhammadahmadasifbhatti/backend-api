type CustomErrorType = {
    message: string;
    statusCode: number;
}

class CustomError extends Error {
    statusCode: number;

    constructor({message, statusCode}: CustomErrorType) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ValidationError extends CustomError {
    constructor(message: string) {
        super({message, statusCode: 400});
    }
}

class AlreadyExistsError extends CustomError {
    constructor(message: string) {
        super({message, statusCode: 403});
    }
}

class NotFoundError extends CustomError {
    constructor(message: string) {
        super({message, statusCode: 404});
    }
}

export default CustomError;
export {ValidationError, AlreadyExistsError, NotFoundError};