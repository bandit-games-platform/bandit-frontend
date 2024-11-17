import {useEffect, useState} from 'react';

export function useDebouncedSearch(searchterm: string, delay: number) {
    const [debouncedTerm, setDebouncedTerm] = useState(searchterm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchterm);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchterm, delay]);

    return debouncedTerm;
}
