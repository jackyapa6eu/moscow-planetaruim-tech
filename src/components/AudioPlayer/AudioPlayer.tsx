import React, {useEffect, useRef, useState} from "react";
import {isIOS, isMobile} from "react-device-detect";
import {currentFilm} from "../../types/AudioPlayerTypes";
import './index.css'
import {AvailableLanguages} from "../AvailableLanguages/AvailableLanguages";
import {Loader} from "../Loader/Loader";

export const AudioPlayer = () => {

  const [audioUrl, setAudioUrl] = useState<string>('');
  const [currentFilm, setCurrentFilm] = useState<currentFilm>({
    available_languages: [],
    end_time_ms: 0,
    show_name: "",
    start_time_ms: 0
  });
  const [chosenLanguage, setChosenLanguage] = useState<string>('')
  const [canPlay, setCanPlay] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoing, setIsGoing] = useState<boolean>(false);
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);
  const [someError, setSomeError] = useState<any>('');

  const desktopAudio = useRef<HTMLAudioElement | null>(null);
  const mobileAudio = useRef<HTMLAudioElement | null>(null);
  const playBtn = useRef<HTMLButtonElement | null>(null);
  const pauseBtn = useRef<HTMLButtonElement | null>(null);
  const btnDoNothing = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    connectSocket();
    fetch('http://91.229.221.53/api/narrations')
      .then(response => {
        if (response.status === 204) {
          setIsGoing(false);
          return
        }
        return response.json();
      })
      .then((film: currentFilm) =>  {
        if (film) {
          handleFilmInfo(film);
        }

      })
      .catch(err => console.log(err))

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) return
      connectSocket();
    })
  }, []);

  useEffect(() => {
    const now = Date.now();
    if (now > currentFilm.end_time_ms) {
      setIsGoing(false);
      setCanPlay(false);
      return
    }
    if (currentFilm && chosenLanguage) {
      setIsGoing(true);
      getAudioFile(chosenLanguage);
    }
  }, [chosenLanguage, currentFilm]);

  const startAudio = () => {
    playAudio(desktopAudio.current);
    playAudio(mobileAudio.current);
  };


  function playAudio(audioPlayerRef: HTMLAudioElement | null) {
    // @ts-ignore
    audioPlayerRef.volume = 1;
    // @ts-ignore
    audioPlayerRef.currentTime = getCurrentTiming();
    audioPlayerRef?.load()
    audioPlayerRef?.play()
      .then(() => {
        // @ts-ignore
        audioPlayerRef.currentTime = getCurrentTiming();
      })
      .catch((error: any) => {
        //alert(error);

      })
  }

  function pauseAudio() {
    player?.pause();
  }


  function getCurrentTiming() {
    const diff = new Date(Date.now() - currentFilm.start_time_ms);
    return  (diff.getMinutes() * 60 + diff.getSeconds())
  }

  function getAudioFile(lang: string) {
    setCanPlay(false);
    setIsLoading(true);
    const headers = new Headers();
    headers.append('pragma', 'no-cache');
    headers.append('cache-control', 'no-cache');
    fetch(`http://91.229.221.53/api/narrations/${lang}`)
      .then(response => {
        // @ts-ignore
        console.log(response);
        // @ts-ignore
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            // @ts-ignore
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          }
        })
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
        setAudioUrl(url);
        setCanPlay(true);
      })
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
          btnDoNothing.current?.click();
        }, 1000)
      })
  }

  function chooseLanguage(lang: string) {
    setChosenLanguage(lang);
    pauseAudio();
    btnDoNothing.current?.click();
  }

  function canPlayHandler() {
    setCanPlay(true);
  }

  function handleFilmInfo(film: currentFilm) {
    setChosenLanguage('');
    setIsGoing(true);
    setCurrentFilm(film);
    setCanPlay(false);
  }

  function connectSocket() {
    const socket = new WebSocket("ws://91.229.221.53/api/ws");
    socket.onmessage = (data) => {
      handleFilmInfo(JSON.parse(JSON.parse(data.data)));
    }
    socket.onopen = (data) => {
      //console.log('socket opened');
    }
  }

  return (
    <div className={'translation-main-container'}>
      <button className={'button-do-nothing'} type="button" ref={btnDoNothing}/>
      <Loader isLoading={isLoading}/>
      {isGoing ?
        <>
            <audio ref={mobileAudio} onCanPlay={canPlayHandler} className={'audio-player'}>
              <source src={audioUrl} type="audio/mpeg"/>
              <source src={audioUrl} type="audio/ogg" />
              <source src={audioUrl} type="mp3" />
            </audio>

            <audio
              className={'audio-player'}
              onCanPlay={canPlayHandler}
              ref={desktopAudio}
              src={audioUrl}
            />


          <div className={'translation-main-container__info-container'}>
            <p>Now: {currentFilm.show_name}</p>
            <p>Available languages: </p>
            <p>Error: {someError}</p>
            <AvailableLanguages languages={currentFilm.available_languages} chooseLanguage={chooseLanguage} chosenLanguage={chosenLanguage}/>
          </div>
          {canPlay && <button className="button-control button-control_type_play" ref={playBtn} type="button" onClick={startAudio}/>}
          {canPlay && <button className="button-control button-control_type_pause" ref={pauseBtn} type="button" onClick={pauseAudio}/>}
        </> :
        <p>Дождитесь начала программы</p>
      }

    </div>
  );
};
