import {useState} from 'react';
import {Box, OutlinedInput, InputAdornment, Typography, Avatar} from '@mui/material';
import {Search} from '@mui/icons-material';
import {useDebouncedSearch} from '../../hooks/gameRegistry/useDebouncedSearch';
import {usePlayerFriendsDetails} from '../../hooks/player/usePlayerFriendsDetails';
import InviteFriendToGameButton from "./InviteFriendToGameButton.tsx";
import NewFriendInviteButton from "./NewFriendInviteButton.tsx";

export default function FriendsSearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredFriend, setHoveredFriend] = useState('');

    // Use custom debounce hook
    const debouncedQuery = useDebouncedSearch(searchQuery, 300);

    // Fetch friends details based on the debounced query
    const {friendsList, isLoading, isError} = usePlayerFriendsDetails(debouncedQuery);
    return (
        <Box sx={{padding: '0 16px', marginTop: '0.5em'}}>
            <OutlinedInput
                fullWidth
                placeholder="Find new friends..."
                onChange={(e) => setSearchQuery(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                }
                sx={{
                    backgroundColor: 'black',
                    borderRadius: '20px',
                    '&:hover': {
                        borderColor: '#f31da4',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '6px 12px',
                    },
                }}
            />

            {isLoading && <Typography>Loading...</Typography>}
            {isError && <Typography>Error fetching friends list!</Typography>}

            {/* Render search results if available */}
            {friendsList && friendsList.length > 0 ? (
                <Box sx={{marginTop: '1em'}}>
                    {friendsList.map((friend) => (
                        <Box
                            key={friend.id}
                            onMouseEnter={() => setHoveredFriend(friend.id)}
                            onMouseLeave={() => setHoveredFriend('')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 0',
                                borderBottom: '1px solid #ccc',
                            }}
                        >
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Avatar
                                    alt={friend.username}
                                    src={friend.avatar}
                                    sx={{marginRight: '12px'}}
                                />
                                <Typography>{friend.username}</Typography>
                            </Box>
                            {hoveredFriend === friend.id && (
                                <>
                                    {friend.existingFriend ? (
                                        <InviteFriendToGameButton/>
                                    ) : (
                                        <NewFriendInviteButton friendId={friend.id} friendUsername={friend.username}/>
                                    )}
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
            ) : (
                searchQuery && <Typography>No friends found</Typography>
            )}
        </Box>
    );
}
