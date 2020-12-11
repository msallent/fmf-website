import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { PageProps } from 'gatsby';
import { gsap } from 'gsap';
import { PageTitle } from '../components/PageTitle';
import styles from '../style/pages/work.module.scss';
import { workItems } from '../data/work';

const Work: FunctionComponent<PageProps> = () => {
  const [activeOverlayIndex, setActiveOverlayIndex] = useState(-1);

  const videoOverlayRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const activeOverlay = videoOverlayRefs.current[activeOverlayIndex];
    const activeVideo = videoRefs.current[activeOverlayIndex];

    if (!activeOverlay || !activeVideo) return;

    gsap.to(activeOverlay, {
      autoAlpha: 1,
      duration: 0.35,
      onComplete: () => {
        activeVideo.play();
      },
    });

    return () => {
      gsap.to(activeOverlay, {
        autoAlpha: 0,
        duration: 0.25,
        onStart: () => {
          activeVideo.pause();
          activeVideo.currentTime = 0;
        },
      });
    };
  }, [activeOverlayIndex]);

  return (
    <main>
      <PageTitle title="Work" />
      <div className="container">
        <ul className={styles.workList}>
          {workItems.map(({ title, artwork, video }, index) => (
            <li key={title} className={styles.workItem}>
              <button type="button" onClick={() => setActiveOverlayIndex(index)}>
                <img src={artwork} alt={title} />
              </button>
              <button
                className={styles.videoOverlay}
                type="button"
                onClick={() => setActiveOverlayIndex(-1)}
                ref={(el) => {
                  videoOverlayRefs.current[index] = el;
                }}
              >
                <video
                  className={styles.video}
                  preload="metadata"
                  controls
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                >
                  <source src={video.desktop} type="video/mp4" />
                </video>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Work;
