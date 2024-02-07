import React from 'react'
import {Spinner} from "@nextui-org/react";

const Loading = ({text}) => {
  return (
    <div>
      <Spinner label="Cargando" color="secondary" labelColor="secondary"/>
    </div>
  )
}

export default Loading
