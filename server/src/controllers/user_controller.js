import { characterModel, userModel } from '../database/models.js';
import { validateUser, partialValidateUser } from '../validations/user_validations.js';
import { AuthorizationError, ConflictError, NotFoundError, ValidationError } from '../utils/errors.js';
import { isValidUUIDv4 } from '../utils/validate_id.js';
import bcrypt from 'bcrypt';

export const registerUser = async(req, res) => {
    const { username, password, confirmPassword} = req.body;
    
    const { data, error } = validateUser({ username, password, confirmPassword });
    if(error)throw error;

    const userAlreadyExists = await userModel.findOne({ where: { username }});
    if(userAlreadyExists)throw new ConflictError('User already exists.');


    if(password !== confirmPassword) throw new ValidationError("Password and confirm password doesn't match.");

    const hashedPassword = await bcrypt.hash(password, 8);
    
    const newUser = await userModel.create({username, password: hashedPassword});

    return res.status(201).json({
        success: true,
        message: 'User register successfully',
        userId: newUser.id,
        username: newUser.username
    });
}

export const loginUser = async(req, res) => {
    const { username, password } = req.body;

    const { data, error } = partialValidateUser({ username, password });

    if(error)throw error;

    const user = await userModel.findOne({ where: { username }});
    if(!user)throw new AuthorizationError("Wrong username or password.");

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword)throw new AuthorizationError("Wrong username or password");
    
    return res.status(200).json({ 
        success: true,
        message: 'User login successfully',
        userId: user.id,
        username
    });
}

export const getUserFavorites = async(req, res) => {
    const { id } = req.params;
    
    if(!id)throw new ValidationError("ID is required.");
    
    const isUUID = isValidUUIDv4(id);
    if(!isUUID)throw new ValidationError("Invalid UUID.");

    const user = await userModel.findByPk(id,{
        include: {
            model: characterModel,
            as: 'favorites',
            through: { attributes: [] }
        }
    });
    if(!user)throw new NotFoundError(`No user found with ID ${id}.`);

    return res.status(200).json({ 
        success: true,
        message: 'user favorites found successfully',
        favorites: user.favorites
    });
}