import { config } from 'dotenv';
config();
const { APIURL } = process.env;
import { characterModel } from "../database/models.js";
import axios from 'axios';
import { tryCatch } from '../utils/try_catch.js';
import { ValidationError } from 'sequelize';
import { NotFoundError } from '../utils/errors.js';

const getCharactersOnAPI = async() => {

    let characters = [];
    let page = 1;

    while(page < 43){
        const { data } = await axios.get(`${APIURL}?page=${page}`);

        await Promise.all(
            data.results.map(async(character) => {
                characters.push({
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    gender: character.gender,
                    origin: character.origin?.name,
                    image:character.image
                })
            })
        )
        page += 1
    }

    return characters;
}

export const saveCharactersOnDB = async() => {
    const characters = await getCharactersOnAPI();
    const created =  await characterModel.bulkCreate(characters);

    console.log(`${created.length} characters saved successfully`);
}

export const getCharacterByID = async(req, res) => {
  const { id } = req.params;

  const characterId = parseInt(id, 10);// convert in a integer

  if(isNaN(characterId))throw new ValidationError("Invalid ID.")

  const character = await characterModel.findByPk(characterId);

  if(!character)throw new NotFoundError(`No character found with ID ${id}.`);

  return res.status(200).json({
    success: true,
    character
  })
}

export const getAllCharacters = async(req,res) => {
    const characters = await characterModel.findAll();

    if(!characters)throw NotFoundError("No characters found.")

    return res.status(200).json({
        characters: characters.map(character => {
            return {
                id: character.id,
                name: character.name,
                status:character.status,
                image: character.image
            }
        })
    })
}