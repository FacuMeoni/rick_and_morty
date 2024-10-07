import z from 'zod';

const userSchema = z.object({
    username: z.string({
        required_error: 'Username is required', invalid_type_error: 'Username must be a string'
    }).min(1, {message: 'Username must have at least one character'}),

    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }).min(1, { message: 'Password must have at least one character'}),
    
    confirmPassword: z.string({
        required_error: 'confirm Password is required',
        invalid_type_error: 'confirm Password must be a string'
    }).min(1, { message: 'confirm Password must have at least one character'})
});

export const validateUser = (user) => userSchema.safeParse(user);

export const partialValidateUser = (user) => userSchema.partial().safeParse(user);
