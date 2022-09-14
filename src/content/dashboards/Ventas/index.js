import useRefMounted from 'src/hooks/useRefMounted';
import { useEffect, useCallback, useState } from 'react';
import { fechtConjwt } from 'src/helpers/fetch';
/* import { SocketContext } from 'src/contexts/SocketContext'; */
/* import AuthContext from 'src/contexts/JWTAuthContext'; */

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import PageHeader from './PageHeader';
import CapitasPorVendedorGraph from './CapitasPorVendedorGraph';
import Cards from './Cards';
import GridBlock from './GridBlock';
import ComponentLoader from '../../../components/Skeleton';


function DashboardReports() {

  const isMountedRef = useRefMounted();
  
  /* const { socket, reportsDates } = useContext(SocketContext); */
  /* const { user } = useContext(AuthContext); */

const [data, setData] = useState([])

const [basico, setBasico] = useState(0)
const [metodo, setMetodo] = useState(0)
const [odonto, setOdonto] = useState(0)
const [universal, setUniversal] = useState(0);
const [facturacion, setFacturacion] = useState(0);
const [loading, setLoading] = useState(true)


  
  
  const getServicios = useCallback(async (equipo) => {
    
    try {
      const response = await fechtConjwt('ventasvendedores/2022-03-15/2022-04-14');
      const serviciosResp = await response.json();
         
      const vtasPorEquipo = serviciosResp.filter((vendedor) => (vendedor.equipoNombre === equipo )); 
     
      setData(vtasPorEquipo)
     
       
      let countBasico = 0;
      let countMetodo = 0;
      let countOdonto = 0;
      let countUniversal = 0;
      let sumFacturacion = facturacion;
  
     

      

      vtasPorEquipo.forEach(vendedor => {

        const { debito, cobrador } = vendedor.grupos;

       
        if( vendedor.paquetes.basico !== null ){
        countBasico += vendedor.paquetes.basico
        countMetodo += vendedor.paquetes.metodo
        countOdonto += vendedor.paquetes.odontologia
        countUniversal += vendedor.paquetes.universal
        sumFacturacion += debito.importeCuota + cobrador.importeCuota
       }
     
      })
      setBasico(countBasico)
      setMetodo(countMetodo)
      setOdonto(countOdonto)
      setUniversal(countUniversal)
      setLoading(false)
      setFacturacion(Math.round(sumFacturacion))

 
         
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getServicios('Telemarketing Turno Tarde');
  }, [ getServicios, isMountedRef ]);

  

 
  return (
    <>
      <Helmet>
        <title>Tablero de Control - Comercial</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title='Indicadores Ventas'
                    subtitle='Detalle de cápitas y áreas protegidas'
                    getServicios= { getServicios } />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        marginBottom={4}>

          <Grid item xs={12}>
            {
              loading ? 
              <Grid>
                <ComponentLoader />
              </Grid >
             :
            (<GridBlock facturacion = { facturacion }   />)
}
          </Grid>

      </Grid>

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
          {loading ? 
            <Grid>
              <ComponentLoader />
            </Grid >
           :
          (<Cards basico = {basico}
                  metodo = { metodo }
                  odonto = { odonto }
                  universal = { universal } />)
          }
        </Grid>
        
          
        
        
        <Grid item xs={12}>
         {
           loading ? 
            <Grid>
              <ComponentLoader />
            </Grid >
           :

           ( <CapitasPorVendedorGraph 
            data = { data }
            title = 'Ventas por equipo'
            subtitle = 'Detalle de cápitas por vendedor' />)
         }
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardReports;
