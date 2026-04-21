'use client';

import Lottie from 'lottie-react';

interface LottieIconProps {
  animationData: any;
  size?: number;
  className?: string;
  loop?: boolean;
}

export default function LottieIcon({ animationData, size = 24, className = '', loop = true }: LottieIconProps) {
  return (
    <div style={{ width: size, height: size }} className={className}>
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
}
