export function validateCredentials (credentials) {

    const { username, password, confirmPassword } = credentials;

    if(!username && !confirmPassword && !password) return { error: true, message: "Please complete all information." }

    if(!username) return { error: true, message: 'Username is required' }
    if(!password) return { error: true, message: 'Password is required' }
    if(!confirmPassword) return { error: true, message: 'confirm password is required' }

    if(password !== confirmPassword) return { error: true, message: "Password and confirm password don't match." }

    if(username.length > 15 || username.length < 3) return { error: true, message: "Username must be between 3 and 15 characters."}

    return { error: false }
}