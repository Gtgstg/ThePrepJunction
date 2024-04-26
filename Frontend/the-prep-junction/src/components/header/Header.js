import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ToggleColorMode from '../body/ToogleColorMode';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const logoStyle = {
    width: '250px',
    height: 'auto',
    cursor: 'pointer',
};

function Header() {
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState('light');
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <div>
                <AppBar
                    position="fixed"
                    sx={{
                        boxShadow: 0,
                        bgcolor: 'transparent',
                        backgroundImage: 'none',
                        mt: 2,
                    }}
                >
                    <Container maxWidth="lg">
                        <Toolbar
                            variant="regular"
                            sx={(theme) => ({
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexShrink: 0,
                                borderRadius: '999px',
                                bgcolor:
                                    theme.palette.mode === 'light'
                                        ? 'rgba(255, 255, 255, 0.4)'
                                        : 'rgba(0, 0, 0, 0.4)',
                                backdropFilter: 'blur(24px)',
                                maxHeight: 40,
                                border: '1px solid',
                                borderColor: 'divider',
                                boxShadow:
                                    theme.palette.mode === 'light'
                                        ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                        : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                            })}
                        >
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    ml: '-18px',
                                    px: 0,
                                }}
                            >
                                <img
                                    src={
                                        '/logo.png'
                                    }
                                    style={logoStyle}
                                    alt="logo of sitemark"
                                />
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <MenuItem
                                        onClick={() => scrollToSection('Exams')}
                                        sx={{ py: '6px', px: '12px' }}
                                    >
                                        <Typography variant="body2" color="text.primary">
                                            Exams
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => scrollToSection('Skill Learning')}
                                        sx={{ py: '6px', px: '12px' }}
                                    >
                                        <Typography variant="body2" color="text.primary">
                                            Skill Learning
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => scrollToSection('Super Coaching')}
                                        sx={{ py: '6px', px: '12px' }}
                                    >
                                        <Typography variant="body2" color="text.primary">
                                            Test Series
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => scrollToSection('pricing')}
                                        sx={{ py: '6px', px: '12px' }}
                                    >
                                        <Typography variant="body2" color="text.primary">
                                            More
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => scrollToSection('faq')}
                                        sx={{ py: '6px', px: '12px' }}
                                    >
                                        <Typography variant="body2" color="text.primary">
                                            FAQ
                                        </Typography>
                                    </MenuItem>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    gap: 0.5,
                                    alignItems: 'center',
                                }}
                            >
                                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                <Button
                                    color="primary"
                                    variant="text"
                                    size="small"
                                    component="a"
                                    href="/sign-in"
                                    target="_blank"
                                >
                                    Sign in/Sign up
                                </Button>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
        </div>
        </ThemeProvider>
    );
}

export default Header;