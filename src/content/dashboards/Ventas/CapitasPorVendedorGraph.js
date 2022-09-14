import {
  Divider,
  Box,
  Card,
  Typography,
  IconButton,
  useTheme,
 } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import Chart from 'react-apexcharts';


function CapitasPorVendedorGraph( props ) {

  const { data, title, subtitle } = props;
 
  const { t } = useTranslation();
  const theme = useTheme();
  
  const dataChart = [];
  const serieDebito = [];
  const serieCobrador = [];
  const vendedoresList = [];


  data.forEach(vendedor=>{

    const personas = vendedor.grupos.debito.personas + vendedor.grupos.cobrador.personas;
    const objColor = (personas >= 20 ? 'green' : 'red');
    
    if(personas > 0){
      dataChart.push(
        {
          x: vendedor.vendedorNombre,
          y: personas ,
          goals: [
            {
              name: 'Objetivo Cápitas',
              value: 20,
              strokeHeight: 3,
              strokeDashArray: 2,
              strokeColor: objColor
            }
            
          ]
        })
        
        serieDebito.push(vendedor.grupos.debito.personas)
        serieCobrador.push(vendedor.grupos.cobrador.personas)
        vendedoresList.push(vendedor.vendedorNombre)
   
      }

  })

  const dataSeries = [
    {name: 'Débito Automatico',
     data: serieDebito,
    },
    {name: 'Débito Cobrador',
     data: serieCobrador}

  ]

  dataChart.sort((a,b)=>{
    return a.y - b.y;
  })

  
  
  
  const Box1Options = {
    chart: {
    type: 'bar',
    stacked: true,
    rangeBarOverlap:true,
    toolbar: {
      show: false
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    zoom: {
      enabled: true
    }
  },

  xaxis: {
    categories: vendedoresList
  },
  legend: {
    show: true,
    showForSingleSeries: true,
  },
  fill: {
    opacity: 1
  }
  };
  
  const Box1Data = [
    {
      name: 'Ventas',
      data: dataChart
    }
   
  ];

  console.log(Box1Data)

  return (
    <Card height='45vh'>
      <Box
        px={2}
        py={1.8}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            gutterBottom
            sx={{
              fontSize: `${theme.typography.pxToRem(16)}`
            }}
            variant="h4"
          >
            {t(title || 'Algun Titulo')} - {t(data[0]?.equipoNombre || 'Sin datos para mostrar')}
          </Typography>
          <Typography variant="subtitle2">
            {t(subtitle || 'Algun SubTitulo')}
          </Typography>
        </Box>
        <IconButton color="primary">
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>
      <Divider />
       
         <Chart options={Box1Options} series={dataSeries} type="bar" height={450} />
        
          
           
      <Box
        p={3}
        sx={{
          textAlign: 'center'
        }}
      />
      
     
    </Card>
  );
}

export default CapitasPorVendedorGraph;
