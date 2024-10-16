import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import characterReducer from './charactersSlice';
import persistReducer from "redux-persist/es/persistReducer";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';



const persistConfig = {
    key: 'root',
    storage
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedCharacterReducer = persistReducer(persistConfig, characterReducer);

export const store = configureStore({
    reducer: { user: persistedUserReducer, characters: persistedCharacterReducer } ,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          // Ignorar estas acciones específicas de redux-persist
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
});

export const persistor = persistStore(store);
