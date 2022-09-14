import {
  Box,
  CardHeader,
  Card,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  useTheme
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone';
import EvStationTwoToneIcon from '@mui/icons-material/EvStationTwoTone';
import Text from 'src/components/Text';

function Block12() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card variant="outlined">
      <CardHeader
        sx={{
          p: 3
        }}
        disableTypography
        title={
          <Typography
            variant="h4"
            sx={{
              fontSize: `${theme.typography.pxToRem(16)}`
            }}
          >
            {t('Latest issues')}
          </Typography>
        }
      />
      <Divider />
      <List
        sx={{
          py: 0
        }}
      >
        <ListItem
          sx={{
            alignItems: 'flex-start',
            p: 2
          }}
        >
          <ListItemAvatar
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              minWidth: 0
            }}
          >
            <ContactPhoneTwoToneIcon
              sx={{
                fontSize: `${theme.typography.pxToRem(23)}`,
                color: `${theme.colors.warning.main}`
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h4">{t('Reports')}</Typography>}
            secondary={
              <Typography noWrap variant="subtitle2">
                {t('Monthly sales reports')}
              </Typography>
            }
          />
          <Box alignSelf="center">
            <Typography variant="h4">
              <Text color="error">29.544</Text>
            </Typography>
          </Box>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            alignItems: 'flex-start',
            p: 2
          }}
        >
          <ListItemAvatar
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              minWidth: 0
            }}
          >
            <EvStationTwoToneIcon
              sx={{
                fontSize: `${theme.typography.pxToRem(23)}`,
                color: `${theme.colors.info.main}`
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h4">{t('User')}</Typography>}
            secondary={
              <Typography noWrap variant="subtitle2">
                {t('Visitors last week')}
              </Typography>
            }
          />
          <Box alignSelf="center">
            <Typography variant="h4">
              <Text color="success">684</Text>
            </Typography>
          </Box>
        </ListItem>
      </List>
    </Card>
  );
}

export default Block12;