import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { PageProps } from 'gatsby';
import { useEmblaCarousel } from 'embla-carousel/react';
import classNames from 'classnames';
import ReactAudioPlayer from 'react-audio-player';
import { ReactComponent as PlayButton } from '../../assets/svg/play.svg';
import { ReactComponent as PauseButton } from '../../assets/svg/pause.svg';
import { ReactComponent as RewindButton } from '../../assets/svg/rewind.svg';
import { ReactComponent as FastForwardButton } from '../../assets/svg/fast-forward.svg';
import { PageTitle } from '../../components/PageTitle';
import { worldMusicAlbum } from '../../data/albums';
import styles from '../../style/pages/albums/world-music-album.module.scss';

const WorldMusicAlbum: FunctionComponent<PageProps> = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [emblaRef, emblaAPI] = useEmblaCarousel({ loop: true, inViewThreshold: 1 });

  const audioPlayerRef = useRef<ReactAudioPlayer>(null);

  const handleTrackControls = (action: 'play' | 'rewind' | 'fastforward') => {
    if (!audioPlayerRef.current || !audioPlayerRef.current.audioEl.current) return;

    const audioElement = audioPlayerRef.current.audioEl.current;

    const isPlaying = !audioElement.paused;

    switch (action) {
      case 'play':
        if (isPlaying) {
          audioElement.pause();
          setIsAudioPlaying(false);
        } else {
          audioElement.play();
          setIsAudioPlaying(true);
        }
        break;
      case 'rewind':
        audioElement.currentTime -= 10;
        break;
      case 'fastforward':
        audioElement.currentTime += 10;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!emblaAPI) return;

    const onSelect = () => {
      setActiveSlideIndex(emblaAPI.selectedScrollSnap);
      setIsAudioPlaying(false);
    };

    emblaAPI.on('select', onSelect);

    // eslint-disable-next-line consistent-return
    return () => {
      emblaAPI.off('select', onSelect);
    };
  }, [emblaAPI]);

  useEffect(() => {
    if (!audioPlayerRef.current || !audioPlayerRef.current.audioEl.current) return;

    const audioElement = audioPlayerRef.current.audioEl.current;

    const onEnded = () => {
      setIsAudioPlaying(false);
    };

    audioElement.addEventListener('ended', onEnded);

    // eslint-disable-next-line consistent-return
    return () => {
      audioElement.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <main>
      <PageTitle title="World Music Album" />
      <div className={classNames('container', styles.contentWrapper)}>
        <div className={styles.carousel} ref={emblaRef}>
          <ul className={styles.carouselContent}>
            {worldMusicAlbum.map((track, index) => (
              <li className={styles.slide} key={track.title}>
                <div
                  className={classNames(
                    styles.buttonsOverlay,
                    activeSlideIndex === index && styles.isActive
                  )}
                >
                  <button
                    className={styles.controlButton}
                    type="button"
                    onClick={() => handleTrackControls('rewind')}
                  >
                    <RewindButton />
                  </button>
                  <button
                    className={styles.controlButton}
                    type="button"
                    onClick={() => handleTrackControls('play')}
                  >
                    {isAudioPlaying ? <PauseButton /> : <PlayButton />}
                  </button>
                  <button
                    className={styles.controlButton}
                    type="button"
                    onClick={() => handleTrackControls('fastforward')}
                  >
                    <FastForwardButton />
                  </button>
                </div>
                <img src={track.artwork} alt={track.title} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{worldMusicAlbum[activeSlideIndex].title}</h3>
          <p className={styles.description}>{worldMusicAlbum[activeSlideIndex].description}</p>
          <ReactAudioPlayer
            className={styles.audioPlayer}
            src={worldMusicAlbum[activeSlideIndex].audioFile}
            ref={audioPlayerRef}
            controlsList="nodownload"
            controls
          />
          <ul className={styles.trackList}>
            {worldMusicAlbum.map((track, index) => (
              <li
                className={classNames(styles.track, activeSlideIndex === index && styles.isActive)}
                key={track.title}
              >
                <button type="button" onClick={() => emblaAPI?.scrollTo(index)}>
                  {`${(index + 1).toString().padStart(2, '0')}. ${track.title}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default WorldMusicAlbum;
