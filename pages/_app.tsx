import type { AppProps } from 'next/app';
import 'regenerator-runtime/runtime';
import theme from '../src/util/theme';
import createEmotionCache from '../src/util/createEmotionCache';
import { EmotionCache } from '@emotion/cache';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from 'state';
import Layout from 'components/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppPropsMod extends AppProps {
  emotionCache: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsMod) => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CacheProvider value={emotionCache}>
          <StyledThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Provider>
          </StyledThemeProvider>
        </CacheProvider>
      </MuiThemeProvider>
    </>
  );
};

export default MyApp;
