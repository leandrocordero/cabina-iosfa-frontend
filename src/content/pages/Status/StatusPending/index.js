import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { useTranslation } from 'react-i18next';


const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Status500() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Pendiente de Autorización</title>
      </Helmet>
      <MainContent>
       
          <Grid
            xs={12}
            md={6}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                <img
                  alt="500"
                  height={260}
                  src="/static/images/status/500.svg"
                />
                <Typography
                  variant="h2"
                  sx={{
                    my: 2
                  }}
                >
                  {t('Solicitud de cuenta pendiente de autorización.')}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 4
                  }}
                >
                  {t(
                    'Estamos revisando tu solicitud, el administrador habiliatará tu cuenta pronto'
                  )}
                </Typography>
                <Button
                  href="/extended-sidebar/dashboards"
                  variant="contained"
                  sx={{
                    ml: 1
                  }}
                >
                  {t('Volver al Loguin')}
                </Button>
              </Box>
            </Container>
          </Grid>
      </MainContent>
    </>
  );
}

export default Status500;
