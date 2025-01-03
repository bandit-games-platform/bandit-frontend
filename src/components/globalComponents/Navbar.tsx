import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import theme from '../../theme/theme.ts';
import SecurityContext from "../../context/SecurityContext.ts";
import {Link} from "react-router-dom";
import {Avatar, Tooltip} from "@mui/material";
import {GameInvitesComponent} from "./GameInvitesComponent.tsx";

const pages = [
    {name: 'Store', path: '/store', roles: ['player']},
    {name: 'Library', path: '/library', roles: ['player']},
    {name: 'Stats', path: '/statistics', roles: ['player']},
    {name: 'Dashboard', path: '/admin-dashboard', roles: ['admin']},
];

const logoutSetting = 'Logout';

export function Navbar() {
    const {logout, loggedInUser, hasRole} = useContext(SecurityContext);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" sx={{backgroundColor: theme.palette.primary.main}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{alignItems: 'center'}}>
                    <VideogameAssetIcon
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            color: theme.palette.secondary.main,
                            mr: 1.5,
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: '"Sarpanch", sans-serif',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BanditGames
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            {pages
                                .filter((page) => page.roles.some(hasRole))
                                .map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Link to={page.path}>
                                            <Typography
                                                sx={{
                                                    textAlign: 'center',
                                                    fontFamily: '"Sarpanch", sans-serif',
                                                    color: 'white',
                                                    '&:hover': {
                                                        textDecoration: 'underline',
                                                        textDecorationThickness: 3,
                                                        textDecorationColor: theme.palette.secondary.main,
                                                    },
                                                }}
                                            >
                                                {page.name}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                    <VideogameAssetIcon
                        sx={{
                            display: {xs: 'flex', md: 'none'},
                            color: theme.palette.secondary.main,
                            mr: 0.5,
                        }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: '"Sarpanch", sans-serif',
                            fontWeight: 700,
                            fontSize: "12px",
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BanditGames
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'center', gap: 5}}>
                        {pages
                            .filter((page) => page.roles.some(hasRole))
                            .map((page) => (
                                <Link to={page.path} key={page.name}>
                                    <Button
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 1,
                                            color: 'white',
                                            display: 'block',
                                            transition: 'all 0.4s ease',
                                            fontFamily: '"Sarpanch", sans-serif',
                                            fontSize: '1.1rem',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                textDecorationThickness: 3,
                                                textDecorationColor: theme.palette.secondary.main,
                                            },
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                </Link>
                            ))}
                    </Box>

                    <GameInvitesComponent/>

                    <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar src="/avatar.png"/>
                            </IconButton>
                        </Tooltip>

                        <Typography sx={{textAlign: 'right', display: {xs: 'none', sm: 'block'}}}>
                            Hello, {loggedInUser}!
                        </Typography>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography sx={{textAlign: 'center'}} onClick={logout}>
                                    {logoutSetting}
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
