import React from 'react'
import {Spinner} from "@nextui-org/react";

const Loading = () => {
  return (
    <div>
      <Spinner label="Cargando.." color="secondary" labelColor="secondary"/>
    </div>
  )
}

export default Loading
