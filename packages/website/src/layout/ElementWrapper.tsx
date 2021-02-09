import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { getTheme, APPS } from '@localz/localz-bumbag-theme';
import { Provider, ToastManager, Spinner, Container } from 'bumbag';

export default function ElementWrapper(props: { element: React.ReactNode }) {
  const [theme, setTheme] = useState({});
  const { element } = props;

  useEffect(() => {
    const getLocalzTheme = async () => {
      try {
        const localzTheme = await getTheme({
          projectId: 'projectId',
          isDev: window.location.host !== 'style.localz.io',
          app: APPS.dashboard,
        });
        setTheme(localzTheme);
      } catch (e) {
        console.error(e, 'Failed to get theme');
      }
    };
    getLocalzTheme();
  }, []);
  return (
    <Provider theme={theme}>
      {_isEmpty(theme) ? (
        <Container display="flex" justifyContent="center" alignItems="center" height="calc(100vh)">
          <Spinner size="large" />
        </Container>
      ) : (
        element
      )}
      <ToastManager isStacked={false} />
    </Provider>
  );
}
