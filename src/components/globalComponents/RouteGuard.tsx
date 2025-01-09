import {ReactNode, useContext} from 'react'
import SecurityContext from '../../context/SecurityContext.ts'

export interface RouteGuardProps {
    children: ReactNode
    requiredRole: string
}

export function RouteGuard({children, requiredRole}: RouteGuardProps) {
    const {isAuthenticated, hasRole} = useContext(SecurityContext)

    if (isAuthenticated()) {
        if (hasRole(requiredRole)) {
            return children;
        } else {
            return <h2>Woah... you can't access this!</h2>
        }
    } else {
        return <h2>🌀 Loading...</h2>;
    }
}
