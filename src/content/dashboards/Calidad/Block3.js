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
import moment from 'moment'


import Chart from 'react-apexcharts';


function Block3() {
  const { t } = useTranslation();
  const theme = useTheme();

  const Box1Options = {
    chart: {
    type: 'bar',
    stacked: false,
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
    type: 'category',
    labels: {
      formatter: (val)=>{
         return `Q ${moment(val).quarter()}`
      }
    },
  },
  group: {
    style: {
      fontSize: '10px',
      fontWeight: 700
    },
    groups: [
      { title: '2019', cols: 4 },
      { title: '2020', cols: 4 }
    ]
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ['Objetivo', 'Bajas'],
    markers: {
      fillColors: ['#775DD0', '#fa6761']
    }
  },
  fill: {
    opacity: 1
  }
  };
  const Box1Data = [
    {
      name: 'Ventas',
      data: [{
        x: '2019/01/01',
        y: 400,
        goals: [
          {
            name: 'Objetivo',
            value: 300,
            strokeHeight: 3,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          },
          {
            name: 'Bajas',
            value: 200,
            strokeHeight: 5,
            strokeColor: '#fa6761'
          }
        ]
      }, {
        x: '2019/04/01',
        y: 430,
        goals: [
          {
            name: 'Objetivo',
            value: 300,
            strokeHeight: 3,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          },
          {
            name: 'Bajas',
            value: 200,
            strokeHeight: 5,
            strokeColor: '#fa6761'
          }
        ]
      }, {
        x: '2019/07/01',
        y: 448,
        goals: [
          {
            name: 'Objetivo',
            value: 300,
            strokeHeight: 3,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          },
          {
            name: 'Bajas',
            value: 200,
            strokeHeight: 5,
            strokeColor: '#fa6761'
          }
        ]
      }, {
        x: '2019/10/01',
        y: 470,
        goals: [
          {
            name: 'Objetivo',
            value: 300,
            strokeHeight: 3,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          },
          {
            name: 'Bajas',
            value: 200,
            strokeHeight: 5,
            strokeColor: '#fa6761'
          }
        ]
      }, {
        x: '2020/01/01',
        y: 540,
        goals: [
          {
            name: 'Objetivo',
            value: 300,
            strokeHeight: 3,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          },
          {
            name: 'Bajas',
            value: 200,
            strokeHeight: 5,
            strokeColor: '#fa6761'
          }
        ]
      }, {
        x: '2020/04/01',
        y: 580,
        goals: [
          {
            name: 'Objetivo',
            value: 300,
            strokeHeight: 3,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          },
          {
            name: 'Bajas',
            value: 200,
            strokeHeight: 5,
            strokeColor: '#fa6761'
          }
        ]
      }, {
        x: '2020/07/01',
        y: 690,
        goals: [
          {
            name: 'Objetivo',
            value: 300,
            strokeHeight: 3,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          },
          {
            name: 'Bajas',
            value: 200,
            strokeHeight: 5,
            strokeColor: '#fa6761'
          }
        ]
      }, {
        x: '2020/10/01',
        y: 690,
        goals: [
          {
            name: 'Objetivo',
            value: 300,
            strokeHeight: 3,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          },
          {
            name: 'Bajas',
            value: 200,
            strokeHeight: 5,
            strokeColor: '#fa6761'
          }
        ]
      }]
    }
   
  ];

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
            {t('Servicios Semanales')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Reporte de servicios por día')}
          </Typography>
        </Box>
        <IconButton color="primary">
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>
      <Divider />
       
         <Chart options={Box1Options} series={Box1Data} type="bar" height={450} />
        
          
           
      <Box
        p={3}
        sx={{
          textAlign: 'center'
        }}
      />
      
     
    </Card>
  );
}

export default Block3;
