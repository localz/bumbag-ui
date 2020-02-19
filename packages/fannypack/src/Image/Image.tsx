import { Box as ReakitBox } from 'reakit';

import { useClassName, createComponent, createElement, createHook } from '../utils';
import { Box, BoxProps } from '../Box';

import * as styles from './styles';

export type LocalImageProps = {
  src: string;
  /** How the image fits its bounds */
  fit?: 'cover' | 'contain';
  /** Positioning of the fitted image. Value can be "top", "left", "center", "right", "bottom" or an "x y" coordinate */
  fitPosition?: string;
  /** Fix the width of the image. It will not be responsive. */
  isFixed?: boolean;
};
export type ImageProps = BoxProps & React.ImgHTMLAttributes<any> & LocalImageProps;

const useProps = createHook<ImageProps>(
  (props, { themeKey, themeKeyOverride }) => {
    const boxProps = Box.useProps(props);

    const className = useClassName({
      style: styles.Image,
      styleProps: props,
      themeKey,
      themeKeyOverride,
      prevClassName: boxProps.className
    });

    return { ...boxProps, className, children: undefined };
  },
  { themeKey: 'Image' }
);

export const Image = createComponent<ImageProps>(
  props => {
    const imageProps = useProps(props);
    return createElement({ component: ReakitBox, use: props.use, htmlProps: imageProps });
  },
  {
    attach: {
      useProps
    },
    defaultProps: {
      use: 'img'
    },
    themeKey: 'Image'
  }
);