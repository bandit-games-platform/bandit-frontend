// import {useQuery} from "@tanstack/react-query";
// import {getGameDetailsFromList} from "../../services/gameRegistryService.ts";
//
// export function useGameDetailsFromLibrary(library: { gameId: string }[]) {
//     const {isLoading, isError, data: gameLibraryDetails} = useQuery({
//         queryKey: ['game-details', library],
//         queryFn: () => getGameDetailsFromList(library),
//         enabled: !!library && library.length > 0,
//     });
//     return {
//         isLoading, isError, gameLibraryDetails
//     }
// }
//
//
