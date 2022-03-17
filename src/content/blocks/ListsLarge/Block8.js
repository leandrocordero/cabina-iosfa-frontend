import {
  Box,
  Card,
  Typography,
  useTheme,
 } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Maps } from 'src/content/dashboards/Reports/Maps';


function Block8() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          background: `${theme.colors.alpha.black[5]}`
        }}
        p={2}
      >
        <Box>
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{
              fontSize: `${theme.typography.pxToRem(12)}`
            }}
          >
            {t('Progress')}
          </Typography>
          <Typography variant="h4">{t('Users Analytics')}</Typography>
        </Box>
      </Box>
      <Maps />
    </Card>
  );
}

export default Block8;
