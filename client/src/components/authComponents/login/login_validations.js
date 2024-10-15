export default function loginValidations ({ username, password}) {
    if(!username && !password)return { error: true, message: 'Please complete username and password to continue.'}

    if(!username)return { error: true, message: 'Please complete username.'}
    if(!password)return { error: true, message: 'Please complete password.'}

    if(username.trim() === '' || password.trim() === '') {
        return { error: true, message: "Please enter valid username and password." }
    }

    return { error: false }
}