import useRefMounted from 'src/hooks/useRefMounted';
import { useEffect, useCallback } from 'react';
import { fechtConjwt } from 'src/helpers/fetch';
/* import { SocketContext } from 'src/contexts/SocketContext'; */
/* import AuthContext from 'src/contexts/JWTAuthContext'; */

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import Block1 from 'src/content/blocks/Statistics/Block3';
import PageHeader from './PageHeader';
import Block3 from './Block3';


function DashboardReports() {

  const isMountedRef = useRefMounted();
  
  /* const { socket, reportsDates } = useContext(SocketContext); */
  /* const { user } = useContext(AuthContext); */
  
  const getServicios = useCallback(async () => {
    
    try {
      const response = await fechtConjwt('metrics/estadisticasAfiliados');
      const serviciosResp = await response.json();
      
      console.log(serviciosResp);
     
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getServicios();
  }, [ getServicios, isMountedRef ]);


 
  return (
    <>
      <Helmet>
        <title>Tablero de Control</title>
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
          <Block1 serviciosTotales = {3}
                  enCurso = { 3 }
                  teleasistencia = { 3 }
                  presencial = { 3 } />
        </Grid>
        
          
        
        
        <Grid item xs={12}>
          <Block3 />
        </Grid>
        
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardReports;
