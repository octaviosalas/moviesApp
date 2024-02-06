import React from 'react'
import {SearchIcon} from "../icons/SearchIcon.jsx";
import {Input} from "@nextui-org/react";




const Search = ({inputValue}) => {
  return (
    <div>
        <Input
          classNames={{
            base: "h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          className="w-72 md:w-[350px] xl:w-[500px] 2xl:w-[650px]"
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          color={"secondary"}
          onChange={(e) => inputValue(e.target.value)}
        />
    </div>
  )
}

export default Search
