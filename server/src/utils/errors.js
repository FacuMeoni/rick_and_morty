export class AppError extends Error {
    constructor(message, statusCode){
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
    }
}

export class ValidationError extends AppError {
    name = 'Validation Error'

    constructor(message) {
        super(message, 400)
    }
}

export class ConflictError extends AppError {
    name = 'Conflict Error'

    constructor(message) {
        super(message, 409)
    }
}

export class AuthorizationError extends AppError {
    name = 'Authorization error'

    constructor(message) {
        super(message, 401)
    }
}


export class NotFoundError extends AppError {
    name = 'Not Found error'

    constructor(message) {
        super(message, 404)
    }
}