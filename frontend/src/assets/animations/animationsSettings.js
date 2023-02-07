import LoadingSmall from './loading1.json';
import LoadingLarge from './loading2.json';

export const animationLoadingSmallSettings = {
  loop: true,
  autoplay: true,
  animationData: LoadingSmall,
  rendererSettings: {
    preserveAspectRadio: 'xMidYMid slice',
  },
};

export const animationLoadingLargeSettings = {
  loop: true,
  autoplay: true,
  animationData: LoadingLarge,
  rendererSettings: {
    preserveAspectRadio: 'xMidYMid slice',
  },
};
