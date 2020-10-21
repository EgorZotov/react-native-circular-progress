import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularInfinite extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rotationAnimation: new Animated.Value(props.rotation)
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
  }

  animate(dur, ease) {
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;
    const useNativeDriver = this.props.useNativeDriver;
    const anim = Animated.loop(
      Animated.timing(this.state.rotationAnimation, {
        useNativeDriver,
        toValue: 360,
        easing,
        duration,
      })
    )
    anim.start();
    return anim;
  }

  animateColor() {
    if (!this.props.tintColorSecondary) {
      return this.props.tintColor
    }

    const tintAnimation = this.state.rotationAnimation.interpolate({
      inputRange: [0, 360],
      outputRange: [this.props.tintColor, this.props.tintColorSecondary]
    })

    return tintAnimation
  }

  render() {
    const { ...other } = this.props;
    return <AnimatedProgress {...other} rotation={this.state.rotationAnimation} tintColor={this.animateColor()} />;
  }
}

AnimatedCircularInfinite.propTypes = {
  ...CircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
  useNativeDriver: PropTypes.bool,
};

AnimatedCircularInfinite.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
  rotation: 0,
  useNativeDriver: false,
};
