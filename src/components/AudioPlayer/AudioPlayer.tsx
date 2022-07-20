import React, {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {isIOS, isMobile} from "react-device-detect";

export const AudioPlayer = () => {

  const [audioUrl, setAudioUrl] = useState<string>('');
  const [currentFilm, setCurrentFilm] = useState<any>({});

  const desktopAudio = useRef<HTMLAudioElement | null>(null);
  const mobileAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {

    connectSocket();

    fetch('http://10.10.120.140:8080')
      .then(response => {
        return response.json();
      })
      .then(film =>  {
        // @ts-ignore
        if (film) {
          setCurrentFilm(film);
        }

      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    const now = Date.now();

    if (currentFilm && (currentFilm.timeEnd > now)) {
      getAudioFile('summer');
    }
  }, [currentFilm])

  const startAudio = () => {
    let audio;
    if (isMobile && isIOS) {
      audio = mobileAudio.current;
    } else {
      audio = desktopAudio.current;
    }
    if (audio === null) {
      return
    } else {
      audio.currentTime = getCurrentTiming();
      audio.play()
        .then((t: any) => {console.log(t)})
        .catch((error: any) => {console.log(error)})
    }

  };

  function getCurrentTiming() {
    const diff = new Date(Date.now() - currentFilm.timeStart);
    return  (diff.getMinutes() * 60 + diff.getSeconds())
  }

  function getAudioFile(showNameAndLang: string) {
    fetch(`http://10.10.120.140:8080/${showNameAndLang}`)
      .then(response => {
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
      .then(url => setAudioUrl(url))
      .catch(err => console.error(err))
  }

  function connectSocket() {
    const socket = io("ws://localhost:3001");
    socket.connect();
    socket.on('message', (msg) => {
      setCurrentFilm(msg);
    });
  }


  return (
    <div>
      {(isMobile && isIOS) ?
        <audio ref={mobileAudio} onCanPlay={() => {console.log('mobile canplay')}} controls>
          <source src={audioUrl} type="audio/mpeg"/>
          <source src={audioUrl} type="audio/ogg" />
          <source src={audioUrl} type="mp3" />
        </audio>
        :
        <audio
          onCanPlay={() => {console.log('desktop canplay')}}
          ref={desktopAudio}
          src={audioUrl}
          controls
        />
      }
      <p>Current film: {currentFilm.film}</p>
      <p>Current time: {getCurrentTiming()}</p>
      <p>{audioUrl}</p>
      <button type="button" onClick={startAudio}>Click</button>
    </div>
  );
};
