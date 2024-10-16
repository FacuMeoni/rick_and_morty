import { createSlice } from '@reduxjs/toolkit';

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        allCharacters: [],
        character: {
            id: null,
            name: '',
            status: '',
            species: '',
            gender: '',
            origin: '',
            image: ''
          }
    },
    reducer: {
        setCharacters(state, { payload }) {
            state.characters = payload.characters
        },
        setCharacterDetail(state, { payload }) {
            const { character } = state ;
            character.id = payload.id,
            character.name = payload.name,
            character.origin = payload.origin,
            character.status = payload.status,
            character.image = payload.image,
            character.species = payload.species,
            character.gender = payload.gender
        },
    }
});


export const { setCharacters, setCharacterDetails } = charactersSlice.actions;
export default charactersSlice.reducer;
