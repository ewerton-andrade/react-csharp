import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/index.tsx';
import { Provider } from "react-redux";
import { store } from './store.ts';
import "./Styles/global.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { DrawerProvider } from './shared/contexts/DrawerContext.tsx';
import { AppThemeProvider } from './shared/contexts/ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <DrawerProvider>
            <AppRoutes />
        </DrawerProvider>
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>,
)