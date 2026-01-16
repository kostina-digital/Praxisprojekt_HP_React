import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';

interface ColorModeSelectProps {
  sx?: object;
  toggleColorMode?: () => void;
  mode?: 'light' | 'dark';
}

export default function ColorModeSelect({ sx, toggleColorMode, mode }: ColorModeSelectProps) {
  const theme = useTheme();
  const [currentMode, setCurrentMode] = React.useState<'light' | 'dark'>(
    mode || (theme.palette.mode as 'light' | 'dark')
  );

  const handleToggle = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setCurrentMode(newMode);
    localStorage.setItem('themeMode', newMode);
    
    if (toggleColorMode) {
      toggleColorMode();
    } else {
      // Fallback: reload page to apply theme
      window.location.reload();
    }
  };

  return (
    <Box sx={sx}>
      <IconButton onClick={handleToggle} color="inherit">
        {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}


