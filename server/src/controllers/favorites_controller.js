import { ConflictError, NotFoundError, ValidationError } from "../utils/errors.js";
import { userModel, characterModel } from "../database/models.js";
import { isValidUUIDv4 } from "../utils/validate_id.js";


export const postUserFavorites = async(req, res) => {
    const { userID, characterID } = req.body;

    if(!userID || !characterID)throw new ValidationError("Ids are required.");
    if(!(isValidUUIDv4(userID)) || isNaN(characterID))throw new ValidationError("Invalid ID.");

    const user = await userModel.findByPk(userID, {
        include: {
            model: characterModel,
            as: 'favorites',
            through: { attributes: [] }
        }}
    );
    if(!user) throw new NotFoundError(`No user found with ID: ${userID}`);
    
    const character = await characterModel.findByPk(characterID);
    if(!character) throw new NotFoundError(`No character found with ID: ${characterID}`);
    
    const isAlreadyOnFavorites = user.favorites.find(favorite => favorite.id === character.id);
    if(isAlreadyOnFavorites)throw new ConflictError('Character already exists on favorites.')
    
    await user.addFavorite(character);
    
    return res.status(201).json({
        success: true,
        message: 'Character added to favorites successfully.'
    });
}


export const deleteUserFavorite = async(req,res) => {
    const { userID, characterID } = req.body;

    if(!userID || !characterID)throw new ValidationError("Ids are required.");
    if(!(isValidUUIDv4(userID)) || isNaN(characterID))throw new ValidationError("Invalid ID.");
    
    const user = await userModel.findByPk(userID, {
        include: {
            model: characterModel,
            as: 'favorites',
            through: { attributes: [] }
        }}
    );

    if(!user) throw new NotFoundError(`No user found with ID: ${userID}`);
    
    const character = await characterModel.findByPk(characterID);
    if(!character) throw new NotFoundError(`No character found with ID: ${characterID}`);

    const isAlreadyOnFavorites = user.favorites.find(favorite => favorite.id === character.id);
    if(!isAlreadyOnFavorites)throw new ValidationError('The character is not in user favorites');
    
    await user.removeFavorite(character);

    return res.status(200).json({
        success: true,
        message: 'Delete favorite successfully.'
    });
}