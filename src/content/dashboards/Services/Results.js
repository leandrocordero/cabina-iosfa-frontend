import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled
} from '@mui/material';


import { useTranslation } from 'react-i18next';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';


const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          box-shadow: none;
      }
    }
    `
);


const applyFilters = (servicios, query, filters) => {
 
  return servicios.filter((servicio) => {
    let matches = true;

    if (query) {
      const properties = ['estado', 'color', 'dni', 'empresa', 'nombre'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (servicio[property].toString().toLowerCase().includes(query.toString().toLowerCase())) {
          containsQuery = true;
        }
      });

     if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && servicio[key] !== value) {
        matches = false;
      }
    });
    
    return matches;
 
  });
};


const applyPagination = (servicios, page, limit) => {
  return servicios.slice(page * limit, page * limit + limit);
};

const Results = ({ servicios }) => {
  
  const { t } = useTranslation();
  const location = useLocation();

  const tabs = [
    {
      value: 'Todos',
      label: t('Todos')
    },
    {
      value: 'En Curso',
      label: t('En Curso')
    },
    {
      value: 'Finalizado Presencial',
      label: t('Finalizados Presencial')
    },
    {
      value: 'Finalizado Teleasistencia',
      label: t('Finalizados Teleasistencia')
    }
  ];

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    estado: null
  });
  const handleTabsChange = (_event, tabsValue) => {
    let value = null;

    if (tabsValue !== 'Todos') {
      value = tabsValue;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      estado: value
    }));

  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
     };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredService = applyFilters(servicios, query, filters);
  const paginatedService = applyPagination(filteredService, page, limit);
  
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        pb={3}
      >
        <TabsWrapper
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          value={filters.estado || 'Todos'}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </TabsWrapper>
        
      </Box>
    
        <Card>
          <Box p={2}>
            
              <TextField
                sx={{
                  m: 0
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  )
                }}
                onChange={handleQueryChange}
                placeholder={t('Busqueda por estado, color, nombre, dni o empresa....')}
                value={query}
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            
          </Box>

          <Divider />
           
          {paginatedService.length === 0 ? (
            <>
              <Typography
                sx={{
                  py: 10
                }}
                variant="h3"
                fontWeight="normal"
                color="text.secondary"
                align="center"
              >
                {t("No encontramos resultados que coincidan con la búsqueda requerida")}
              </Typography>
            </>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('Color')}</TableCell>
                      <TableCell>{t('Estado')}</TableCell>
                      <TableCell>{t('Nombre')}</TableCell>
                      <TableCell>{t('Dni')}</TableCell>
                      <TableCell>{t('Localidad')}</TableCell>
                      <TableCell>{t('Provincia')}</TableCell>
                      <TableCell>{t('Empresa')}</TableCell>
                      <TableCell>{t('Acciones')}</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedService.map((servicio) => {
                      
                      return (
                        <TableRow hover key={servicio._id} selected={false}>
                          <TableCell>
                            <Typography>
                              {servicio.color}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{servicio.estado}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {servicio.nombre}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {servicio.dni}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {servicio.localidad}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {servicio.provincia}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {servicio.empresa}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap>
                              <Tooltip title={t('View')} arrow>
                                <IconButton
                                  component={RouterLink}
                                  to={`/${
                                    location.pathname.split('/')[1]
                                  }/management/users/single/`}
                                  color="primary"
                                >
                                  <LaunchTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={filteredService.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Box>
            </>
          )}
        </Card>
   
    </>
  );
};

Results.propTypes = {
  servicios: PropTypes.array.isRequired

};

Results.defaultProps = {
  users: [],
  servicios: []

};

export default Results;
