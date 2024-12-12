import {createContext} from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean
    loggedInUser: string | undefined
    loggedInUserId: string | undefined
    userRoles: string[];
    hasRole: (role: string) => boolean;
    login: () => void
    logout: () => void
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    loggedInUserId: undefined,
    userRoles: [],
    hasRole: () => false,
    login: () => {
    },
    logout: () => {
    },
})

