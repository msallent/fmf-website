import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import { useEmblaCarousel } from 'embla-carousel/react';
import classNames from 'classnames';
import ReactAudioPlayer from 'react-audio-player';
import { ReactComponent as PlayButton } from '../../assets/svg/play.svg';
import { ReactComponent as PauseButton } from '../../assets/svg/pause.svg';
import { PageTitle } from '../../components/PageTitle';
import styles from '../../style/pages/albums/world-music-album.module.scss';

interface AlbumPageData {
  albumsJson: {
    title: string;
    tracks: Array<{
      title: string;
      description: string;
      artwork: string;
      audioFile: string;
    }>;
  };
}

const WorldMusicAlbum: FunctionComponent<PageProps<AlbumPageData>> = ({
  data: {
    albumsJson: { title, tracks },
  },
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [emblaRef, emblaAPI] = useEmblaCarousel({ loop: true, inViewThreshold: 1 });

  const audioPlayerRef = useRef<ReactAudioPlayer>(null);

  const allTracks = tracks.length <= 2 ? [...tracks, ...tracks] : tracks;

  const playOrPauseAudio = () => {
    if (!audioPlayerRef.current || !audioPlayerRef.current.audioEl.current) return;

    const audioElement = audioPlayerRef.current.audioEl.current;

    const isPlaying = !audioElement.paused;

    if (isPlaying) {
      audioElement.pause();
      setIsAudioPlaying(false);
    } else {
      const playPromise = audioElement.play();

      playPromise
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch(() => {
          setIsAudioPlaying(false);
        });
    }
  };

  useEffect(() => {
    if (!emblaAPI) return;

    const onSelect = () => {
      setActiveSlideIndex(emblaAPI.selectedScrollSnap);
      setTimeout(() => {
        playOrPauseAudio();
      }, 0);
    };

    emblaAPI.on('select', onSelect);

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

    return () => {
      audioElement.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <main>
      <PageTitle title={title} />
      <div className={classNames('container', styles.contentWrapper)}>
        <div className={styles.carousel} ref={emblaRef}>
          <ul className={styles.carouselContent}>
            {allTracks.map((track, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className={styles.slide} key={`${track.title}-${index}`}>
                <div
                  className={classNames(
                    styles.buttonsOverlay,
                    activeSlideIndex === index && styles.isActive
                  )}
                >
                  <button className={styles.controlButton} type="button" onClick={playOrPauseAudio}>
                    {isAudioPlaying ? <PauseButton /> : <PlayButton />}
                  </button>
                </div>
                <img src={track.artwork} alt={track.title} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{allTracks[activeSlideIndex].title}</h3>
          <p className={styles.description}>{allTracks[activeSlideIndex].description}</p>
          <ReactAudioPlayer
            className={styles.audioPlayer}
            src={allTracks[activeSlideIndex].audioFile}
            ref={audioPlayerRef}
            controlsList="nodownload"
            controls
          />
          <ul className={styles.trackList}>
            {tracks.map((track, index) => (
              <li
                className={classNames(
                  styles.track,
                  activeSlideIndex % 2 === index && styles.isActive
                )}
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

export const query = graphql`
  query AlbumQuery($id: String!) {
    albumsJson(id: { eq: $id }) {
      title
      tracks {
        title
        artwork
        description
        audioFile
      }
    }
  }
`;

export default WorldMusicAlbum;
