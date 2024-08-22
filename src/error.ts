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

export default CustomError;