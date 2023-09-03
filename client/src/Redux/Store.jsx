import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {Clientreducer} from './userState'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { proffesionalReducer } from './ProState';
import { Adminreducer } from './AdminState'

const usePersiterConfig = {
    key : 'user',
    storage
}
const userPersistReducer = persistReducer(usePersiterConfig,Clientreducer)

const proffesionalPersistConfig = {
  key:'proffessional',
  storage
}
const proffesionalPersistReducer = persistReducer(proffesionalPersistConfig,proffesionalReducer)

const adminPersistConfig ={
  key:'admin',
  storage
}
const AdminPersistReducer = persistReducer(adminPersistConfig,Adminreducer)



export const Store = configureStore({
    reducer:{
        Client:userPersistReducer,
        Proffessional:proffesionalPersistReducer
        ,Admin:AdminPersistReducer
    },
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable serializableCheck
  }),
})

export const persistor = persistStore(Store)