interface WorkItem {
  title: string;
  artwork: string;
  video: {
    mobile?: string;
    desktop: string;
  };
}

export const workItems: Array<WorkItem> = [
  {
    title: 'Solo Los Dos',
    artwork: '/images/work/solo-los-dos/artwork.jpg',
    video: {
      mobile: '/video/work/solo-los-dos/mobile.mp4',
      desktop: '/video/work/solo-los-dos/desktop.mp4',
    },
  },
  {
    title: 'Wabi',
    artwork: '/images/work/wabi/artwork.jpg',
    video: {
      desktop: '/video/work/wabi/video.mp4',
    },
  },
];
