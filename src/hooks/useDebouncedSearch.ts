import { useState, useEffect } from 'react';

export function useDebouncedSearch(term: string, delay: number) {
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(term);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [term, delay]);

    return debouncedTerm;
}
