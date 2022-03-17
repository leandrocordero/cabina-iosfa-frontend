import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';

const menuItems = [
  {
    heading: 'General',
    items: [
      {
        name: 'Dashboards',
        icon: SmartToyTwoToneIcon,
        link: '/extended-sidebar/dashboards',
        items: [
          {
            name: 'Servicios',
            link: 'dashboards/reports',
            badge: null,
            badgeTooltip: null
          }
        ]
      },
     ]
  },
  {
    heading: 'Listas',
    items: [
      {
        name: 'Servicios',
        icon: SupportTwoToneIcon,
        link: '/extended-sidebar/dashboards/services'
      }
    ]
  },
  {
    heading: 'Configuración',
    items: [
      {
        name: 'Users',
        icon: AssignmentIndTwoToneIcon,
        link: '/extended-sidebar/management/users',
        items: [
          {
            name: 'List',
            link: 'management/users/list'
          },
          {
            name: 'User Profile',
            link: 'management/users/single'
          },
        ]
      },
      {
        name: 'Documentación',
        icon: SupportTwoToneIcon,
        link: '/docs'
      }
    ]
  }
  
];

export default menuItems;
