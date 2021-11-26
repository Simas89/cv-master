import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: { main: '#1a73e9' },
    secondary: { main: '#ffcb2d' },
  },
  components: {
    MuiButton: { defaultProps: { disableRipple: true } },
    MuiIconButton: { defaultProps: { disableRipple: true } },
  },
});

export default theme;
