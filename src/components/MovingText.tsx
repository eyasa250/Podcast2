import { useEffect } from 'react';
import Animated, {
  Easing,
  StyleProps,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
export type MovingTextProps = {
	text: string;
	animationThreshold: number;
	style?: StyleProps; // `StyleProps` vient de 'react-native' si tu veux définir des styles
  };
  
export const MovingText = ({ text, animationThreshold, style }: MovingTextProps) => {

  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;
  const textWidth = text.length * 3;

  useEffect(() => {
    if (!shouldAnimate) return;

    // Lance l'animation lorsque le texte est assez long
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1,
        true,
      ),
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [text, animationThreshold, shouldAnimate, textWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.Text
      numberOfLines={1}
      style={[style, animatedStyle, shouldAnimate && { width: 9999, paddingLeft: 16 }]}
    >
      {text}
    </Animated.Text>
  );
};
