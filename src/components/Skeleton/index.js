import React from 'react'
import { Skeleton } from '@mui/material'

const ComponentLoader = ( { canitdad = [{key:1, variant: "text", animation: "wave"}, {key:2, variant: "text", animation: "wave"}, {key:3, variant: "text", animation: "wave"}] } ) => {
return (
<>
    {
       canitdad.map(elemento=>(

        <Skeleton key = {elemento}
                  variant = {elemento.variant}
                  animation= {elemento.animation} />

       ))
    }

</>
)
  
}

export default ComponentLoader;
