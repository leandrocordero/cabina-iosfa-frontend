import useRefMounted from 'src/hooks/useRefMounted';
import { useCallback, useEffect, useState } from 'react';
import { fechtConjwt } from 'src/helpers/fetch';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import PageHeader from './PageHeader';
import Results from './Results';

function ServiceReports() {

  const isMountedRef = useRefMounted();
  const [servicios, setServicios] = useState([]);

  const getServicios = useCallback(async () => {
    try {
      const response = await fechtConjwt('services/getServices');
      const servicios = await response.json();
      if (isMountedRef.current) {
        setServicios(servicios.servicios);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getServicios();
  }, [getServicios]);



  return (
    <>
      <Helmet>
        <title>Reportes de Prestaciones</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
        <Results servicios={servicios} />  
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ServiceReports;
