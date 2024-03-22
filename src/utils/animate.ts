import { keyframes } from '@emotion/react';

export const animationLeft = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: initial;
    opacity: 1;
  }
`;

export const animation = `${animationLeft} 0.3s ease-in-out`;

