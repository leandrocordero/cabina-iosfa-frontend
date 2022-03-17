import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Container,
  Link,
  Typography,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import useAuth from 'src/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import JWTRegister from '../RegisterJWT';

SwiperCore.use([Navigation, Pagination]);

const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

const MainContent = styled(Box)(
  () => `
    padding: 0 0 0 0px;
    width: 100%;
    display: flex;
    align-items: center;
`
);

function RegisterCover() {
  const { method } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>
      <Content>
        <MainContent>
          <Container maxWidth="sm">
            <Card
              sx={{
                p: 4,
                my: 4
              }}
            >
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Crear Cuenta')}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3
                  }}
                >
                  {t('Ingresa tus datos para solicitar una cuenta.')}
                </Typography>
              </Box>
              {method === 'JWT' && <JWTRegister />}
              <Box mt={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {t('Ya tenes cuenta?')}
                </Typography>{' '}
                <Link component={RouterLink} to="/account/login">
                  <b>{t('Ingresa Aquí')}</b>
                </Link>
              </Box>
            </Card>
          </Container>
        </MainContent>
      </Content>
    </>
  );
}

export default RegisterCover;
