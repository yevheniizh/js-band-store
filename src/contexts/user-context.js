import { createContext } from 'react';

export const userContext = createContext();

export const UserProvider = userContext.Provider;
export const UserConsumer = userContext.Consumer;
