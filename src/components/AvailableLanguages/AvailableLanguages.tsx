import React from "react";
import './index.css'
import {ButtonAvailableLanguage} from "./ButtonAvailableLanguage/ButtonAvailableLanguage";

interface Iprops {
  languages: string[],
  chooseLanguage: (language: string) => void,
  chosenLanguage: string
}

export const AvailableLanguages = ({languages, chooseLanguage, chosenLanguage}: Iprops) => {


  return (
    <div className={'available-languages'}>
      {languages?.map((lang, index) =>
        // @ts-ignore
        <div key={index} className={'button-wrapper'}><ButtonAvailableLanguage chooseLanguage={chooseLanguage} lang={lang} chosenLanguage={chosenLanguage}/></div>
      )}
    </div>
  )
}
