import React from 'react'
import GoogleMapReact from 'google-map-react';
import { styled, useTheme} from '@mui/material';

export const Maps = () => {

    
    const defaultProps = {
        center: {
          lat: -34.73,
          lng: -58.25
        },
        zoom: 11
      };


    const data = [

      { lat: -34.7392484, long: -58.2547405, status: "Finalizado" },
      { lat: -34.7392483, long: -58.2547403, status: "En curso" },
      { lat: -34.7251692, long: -58.2585836, status: "Finalizado" },
      { lat: -34.7526262, long: -58.232151, status: "En curso" },
      { lat: -34.720356, long: -58.258404, status: "En curso" },
      { lat: -34.74139, long: -58.290693, status: "Finalizado" }

    ]

      const DotLegend = styled('span')(
        ({ theme }) => `
          border-radius: 22px;
          width: ${theme.spacing(1.5)};
          height: ${theme.spacing(1.5)};
          display: inline-block;
          border: ${theme.colors.alpha.white[100]} solid 1px;
      `
      );
      
      const theme = useTheme();

     
    return (

        <div style={{ height: '565px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key:"AIzaSyA1h1LA106eMKGwI9w-07Q-imicrNk3Myw" }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {data.map((coord)=>{

          if(coord.status === 'En curso'){
            return <DotLegend 
              key= {coord.lat&&coord.long}
              lat={coord.lat}
              lng={coord.long}
              style={{
                animation: `pulse 1s infinite`,
                background: `${theme.colors.success.main}`
              }}
            />
                      }
          
          return <DotLegend 
            key= {coord.lat&&coord.long}
            lat={coord.lat}
            lng={coord.long}
            style={{
              background: `${theme.colors.error.main}`
            }}
          />
            
        
          })}
        
      </GoogleMapReact>
    </div>
    
  )
}
