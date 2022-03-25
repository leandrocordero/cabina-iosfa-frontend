import useRefMounted from 'src/hooks/useRefMounted';
import { useCallback, useContext, useEffect, useState } from 'react';
import { fechtConjwt } from 'src/helpers/fetch';
import { SocketContext } from 'src/contexts/SocketContext';
import AuthContext from 'src/contexts/JWTAuthContext';

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
  const [enCurso, setEnCurso] = useState(0);
  const [serviciosTotales, setServiciosTotales] = useState(0);
  const [fpresencial, setFpresencial] = useState(0);
  const [fteleasistencia, setFteleasistencia] = useState(0);
  const [serviciosGAM, setServiciosGAM] = useState(0);
  const [serviciosVittal, setServiciosVittal] = useState(0);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  
  const getServicios = useCallback(async () => {
    
    try {
      const response = await fechtConjwt('services/getServices',{fechaMin: new Date("2020-01-18"), fechaMax: new Date("2022-03-28")},'POST');
      const serviciosResp = await response.json();
      

      if (isMountedRef.current) {
        
       
        const serviciosTotalesEmp = serviciosResp.servicios.filter((servicio)=> servicio.empresa === user.empresa && servicio.estado === 'Tomado').length;
        const serviciosEnCurso = serviciosResp.servicios.filter((servicio)=> servicio.empresa === user.empresa && servicio.estado === 'En Curso').length;
        const serviciosFinalizadosPres = serviciosResp.servicios.filter((servicio)=> servicio.empresa === user.empresa && servicio.estado === 'Finalizado Presencial').length;
        const serviciosFinalizadosTele = serviciosResp.servicios.filter((servicio)=> servicio.empresa === user.empresa && servicio.estado === 'Finalizado Teleasistencia').length;
        const servGam = serviciosResp.servicios.filter((servicio)=> servicio.empresa === 'GRUPO AYUDA MEDICA' && (servicio.estado === 'Finalizado Presencial' || servicio.estado === 'Finalizado Teleasistencia')).length;     
        const servVittal = serviciosResp.servicios.filter((servicio)=> servicio.empresa === 'VITTAL' && (servicio.estado === 'Finalizado Presencial' || servicio.estado === 'Finalizado Teleasistencia')).length;
        

        console.log("Servicios Vittal: ", servVittal);
        console.log("Servicios GAM: ", servGam);
          setServiciosTotales(serviciosTotalesEmp);
          setEnCurso(serviciosEnCurso);
          setFpresencial(serviciosFinalizadosPres);
          setFteleasistencia(serviciosFinalizadosTele);
          setServiciosGAM(servGam);
          setServiciosVittal(servVittal);
        
      }
        
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getServicios();
  }, [ getServicios, isMountedRef ]);

  useEffect(() => {
        
    socket.on('nuevo-registro-cargado', () => {
      
      getServicios();
        
      });
      
      return () => socket.off('nuevo-registro-cargado');
}, [ socket ])



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
                  teleasistencia = { fteleasistencia }
                  presencial = { fpresencial } />
        </Grid>
        
        <Grid item xs={12}>
          <Block5 servGam = { serviciosGAM }
                  servVittal = { serviciosVittal } />
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
        
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardReports;
