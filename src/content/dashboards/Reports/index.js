import useRefMounted from 'src/hooks/useRefMounted';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fechtConjwt } from 'src/helpers/fetch';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import Block1 from 'src/content/blocks/Statistics/Block3';
import Block2 from 'src/content/blocks/ListsLarge/Block8';
import PageHeader from './PageHeader';
import Block3 from './Block3';
import Block5 from './Block5';

function DashboardReports() {

  const isMountedRef = useRefMounted();
  const [servicios, setServicios] = useState([]);

  const newService = useSelector( newService => newService );
  
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


  const updateService = useCallback(async(newService)=>{
    try{
    
      const serviciosTotales =  serviciosTotales + 1;

      console.log(serviciosTotales)
      console.log(newService)


    }catch(err){
      console.log(err)
    }
  })

  useEffect(() => {
    getServicios();
  }, [getServicios]);


  useEffect(() => {
    updateService(newService);
  }, [newService]);


  const serviciosTotales = servicios.length;
  
  const enCurso = servicios.filter(servicio=> servicio.estado === 'En curso').length;
  const fTeleasistencia = servicios.filter(servicio=> servicio.estado === 'Finalizado Teleasistencia').length;
  const fPresencial = servicios.filter(servicio=> servicio.estado === 'Finalizado Presencial').length;
  
  

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
          <Block1 serviciosTotales = {serviciosTotales}
                  enCurso = { enCurso }
                  teleasistencia = { fTeleasistencia }
                  presencial = { fPresencial } />
        </Grid>
        <Grid item md={7} xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xs={12}>
              <Block2 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} xs={12}>
          <Block3 />
        </Grid>
        <Grid item xs={12}>
          <Block5 />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardReports;
