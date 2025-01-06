import {ReactNode} from "react";
import {useLocation} from "react-router-dom";

interface ExcludeForPathsProps {
    paths: string[],
    children: ReactNode
}

export function ExcludeForPaths({paths, children}: ExcludeForPathsProps) {
    const {pathname} = useLocation();

    if (paths.some((path) => pathname.includes(path))) {
        return false;
    }

    return (
        <>{children}</>
    );
}
