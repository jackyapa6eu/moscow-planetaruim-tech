import './index.css';

const langList = {
  ch: 'Chinese',
  ger: 'German',
  fr: 'French',
  esp: 'Spanish',
  kor: 'Korean',
  eng: 'English',
  jap: 'Japanese'
}

interface Iprops {
  lang: string,
  chooseLanguage: (lang: string) => void,
  chosenLanguage: string
}

export const ButtonAvailableLanguage = ({lang, chooseLanguage, chosenLanguage}: Iprops) => {
  const buttonClasses = `available-languages__button ${chosenLanguage === lang ? 'available-languages__button_active' : ''}`
  function handleClick() {
    if (chosenLanguage === lang) return
    chooseLanguage(lang);
  }
  // @ts-ignore
  return (<button onClick={handleClick} className={buttonClasses}>{langList[lang]}</button>
  )
}
