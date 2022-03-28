import { useContext, useRef, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  MenuItem,
  Menu,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';
import { SocketContext } from 'src/contexts/SocketContext';

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

function PageHeader() {
  const { t } = useTranslation();
  const { reportsDates } = useContext(SocketContext);

  const periods = [
    {
      value: 'today',
      text: t('Hoy')
    },
    {
      value: 'yesterday',
      text: t('Ayer')
    },
    {
      value: 'last_month',
      text: t('Último Mes')
    },
    {
      value: 'last_year',
      text: t('Último Año')
    }
  ];

  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[reportsDates.optionValue].text);
  const actionRef1 = useRef(null);

  const updatePeriod = (period)=>{
    setPeriod(period)
    console.log(period)
  }

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
            {t('Reportes')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Indicadores de servicios informados por las cabinas')}
          </Typography>
        </Box>
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <Button
          variant="outlined"
          ref={actionRef1}
          onClick={() => setOpenMenuPeriod(true)}
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
          onClose={() => setOpenMenuPeriod(false)}
          open={openPeriod}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {periods.map((_period) => (
            <MenuItem
              key={_period.value}
              onClick={() => {
                updatePeriod(_period.value);
                setOpenMenuPeriod(false);
              }}
            >
              {_period.text}
            </MenuItem>
          ))}
        </Menu>

        <Button variant="contained" startIcon={<DocumentScannerTwoToneIcon />}>
          {t('Exportar')}
        </Button>
      </Box>
    </Box>
  );
}

export default PageHeader;
