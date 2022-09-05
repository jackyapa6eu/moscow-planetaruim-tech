import loader from "../../images/loader.gif";
import React from "react";
import './index.css';

interface IProps {
  isLoading: boolean
}

export const Loader = ({isLoading}: IProps) => {

  const loaderClasses = `loader ${isLoading ? 'loader_active' : ''}`

  return (
    <img src={loader} alt={'loader'} className={loaderClasses}/>
  )
}
