import {ReactNode, useEffect, useState} from 'react'
import SecurityContext from './SecurityContext'
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from '../services/auth'
import {isExpired} from 'react-jwt'
import Keycloak from 'keycloak-js'
import {useCheckInPlayerRegistration} from "../hooks/player/useCheckInPlayerRegistration.ts";

interface IWithChildren {
    children: ReactNode
}

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
}
const keycloak: Keycloak = new Keycloak(keycloakConfig)

type ResourceAccess = {
    [resource: string]: {
        roles: string[];
    };
};

export default function SecurityContextProvider({children}: IWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>(undefined)
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const {checkInPlayerRegistration} = useCheckInPlayerRegistration();

    useEffect(() => {
        keycloak.init({
            onLoad: 'login-required'
        })
    }, [])

    keycloak.onAuthSuccess = async () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.given_name)
        setLoggedInUserId(keycloak.idTokenParsed?.sub)
        setUserRoles(getUserRoles)

        await checkInPlayerRegistration();
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
        setUserRoles([]);
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader()
        setUserRoles([]);
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.given_name)
            setLoggedInUserId(keycloak.idTokenParsed?.sub)
            setUserRoles(getUserRoles());
        })
    }

    function getUserRoles(): string[] {
        const roles: string[] = [];
        const tokenParsed = keycloak.tokenParsed;

        if (tokenParsed) {
            if (tokenParsed.realm_access?.roles) {
                roles.push(...tokenParsed.realm_access.roles);
            }
            if (tokenParsed.resource_access) {
                const resourceAccess = tokenParsed.resource_access as ResourceAccess;
                Object.values(resourceAccess).forEach((resource) => {
                    if (resource.roles) {
                        roles.push(...resource.roles);
                    }
                });
            }
        }

        return roles;
    }

    function login() {
        keycloak.login()
    }

    function logout() {
        const logoutOptions = {redirectUri: import.meta.env.VITE_REACT_APP_URL}
        keycloak.logout(logoutOptions)
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token)
        else return false
    }

    function hasRole(role: string): boolean {
        return userRoles.includes(role);
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated,
                loggedInUser,
                loggedInUserId,
                login,
                logout,
                userRoles,
                hasRole,
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}
