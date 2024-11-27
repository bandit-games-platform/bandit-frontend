import {ReactNode, useContext} from 'react'
import SecurityContext from '../context/SecurityContext.ts'

export interface RouteGuardProps {
    children: ReactNode
}

export function RouteGuard({children}: RouteGuardProps) {
    const {isAuthenticated} = useContext(SecurityContext)

    if (isAuthenticated()) {
        return children
    } else {
        return <h2>🌀 Loading...</h2>;
    }
}
