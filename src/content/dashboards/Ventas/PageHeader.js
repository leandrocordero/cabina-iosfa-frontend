import { useRef, useState } from 'react';
/* import moment from 'moment'; */
import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  MenuItem,
  Menu,
  styled,
  Modal,
  Fade,
  Backdrop
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';



/* const xlsx = require("json-as-xlsx") */


const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === 'dark'
          ? `0 1px 0 ${alpha(
              lighten(theme.colors.primary.main, 0.8),
              0.2
            )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)`
          : `0px 2px 4px -3px ${alpha(
              theme.colors.alpha.black[100],
              0.4
            )}, 0px 5px 16px -4px ${alpha(theme.colors.alpha.black[100], 0.2)}`
      };
`
);

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function PageHeader(props) {
  const { title, subtitle, getServicios } = props
  const { t } = useTranslation();
    
    
  /* 
let data = [
          {
            sheet: "Servicios",
            columns: [
              { label: "Id", value: "_id" },
              { label: "Estado", value: "estado" },
              { label: "Color", value: "color" },
              { label: "Nombre", value: "nombre" },
              { label: "Dni", value: "dni" },
              { label: "Localidad", value: "localidad" },
              { label: "Diagenostico", value: "diagnostico" },
              { label: "Empresa", value: "empresa" },              
            ],
            content: servicios.servicios,
          },
        ]
        
        let settings = {
          fileName: "Servicios", // Name of the resulting spreadsheet
          extraLength: 3, // A bigger number means that columns will be wider
          writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
        }
        
        xlsx(data, settings) 
  */
    
    const equipos = [
    {
      value: 'Edgardo Negro',
      text: t('Edgardo Negro')
    },
    {
      value: 'Ruben Rivera',
      text: t('Ruben Rivera')
    },
    {
      value: 'Telemarketing Turno Mañana',
      text: t('TMK Mañana')
    },
    {
      value: 'Telemarketing Turno Tarde',
      text: t('TMK Tarde')
    }
  ];

  
  const [openEquipo, setOpenMenuEquipo] = useState(false);
  const [period, setEquipos] = useState(equipos[3].text);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const actionRef1 = useRef(null);

  /* const updateStarDate = (period)=>{
    
    setStartDate(moment().subtract(1,period).format())
  } */

  return (
    <Box
      display="flex"
      alignItems={{ xs: 'stretch', md: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <AddAlertTwoToneIcon fontSize="large" />
        </AvatarPageTitle>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {t( title || 'Algun titulo' )}
          </Typography>
          <Typography variant="subtitle2">
            {t( subtitle || 'Algun subtitulo' )}
          </Typography>
        </Box>
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <Button
          variant="outlined"
          ref={actionRef1}
          onClick={() => setOpenMenuEquipo(true)}
          sx={{
            mr: 1
          }}
          endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
        >
          {period}
        </Button>

       <Menu
          disableScrollLock
          anchorEl={actionRef1.current}
          onClose={() => setOpenMenuEquipo(false)}
          open={openEquipo}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {equipos.map((equipo) => (
            <MenuItem
              key={equipo.value}
              onClick={() => {
                setEquipos(equipo.text);
                setOpenMenuEquipo(false);
                getServicios(equipo.value)
            
              }}
              
            >
              {equipo.text}
            </MenuItem>
          ))}
        </Menu>

        <Button variant="contained" startIcon={<DocumentScannerTwoToneIcon />} onClick={()=> handleOpen()}>
          {t('Exportar')}
        </Button>
      </Box>

      <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={ open }
    onClose={ handleClose }
    closeAfterTransition
    BackdropComponent={ Backdrop }
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <Box sx={ ModalStyle }>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Fade>
  </Modal>
  
  </Box>
    
    

  );
}

export default PageHeader;
