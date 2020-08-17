import React, { useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash';

import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import background from '../../assets/images/background.png';
import background2 from '../../assets/images/background2.png';
import studyImage from '../../assets/images/icons/study.png';
import giveClassesImage from '../../assets/images/icons/give-classes.png';
import nextImage from '../../assets/images/icons/next.png';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  singleSlide: {
    flex: 1,
    width,
  },

  header: {
    height: 350,
    padding: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageConfig: {
    width: 96,
    height: 96,
  },

  bottomSlide: {
    width,
    flex: 1,
    padding: 40,
  },

  texts: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#6A618026',
    fontSize: 40,
    fontFamily: 'Archivo_700Bold',
  },

  description: {
    color: '#6A6180',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    paddingRight: 24,
  },

  bottomController: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bullets: {
    width: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  bullet: {
    width: 5,
    height: 5,
    borderRadius: 1,
    backgroundColor: '#C1BCCC',
  },

  active: {
    backgroundColor: '#8257e5',
  },
});

const FirstEntrySlide: React.FC = () => {
  const { navigate } = useNavigation();
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  const x = useValue(0);
  const onScroll = onScrollEvent({ x });
  const backgroundColor = interpolateColor(x, {
    inputRange: [0, width],
    outputRange: ['#8257E5', '#04D361'],
  });

  const handleButtonNext = useCallback(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current
        .getNode()
        .scrollTo({ x: width * 2, animated: true });
    }
  }, []);

  const handleGotoLogin = useCallback(() => {
    AsyncStorage.setItem(
      '@proffy:firstEntry',
      JSON.stringify('isFirstEntry')
      // JSON.stringify('isNotFirstEntry')
    ).then(_response => {
      navigate('Login');
    });
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        scrollEventThrottle={1}
        {...{ onScroll }}
      >
        <View style={styles.singleSlide}>
          <Animated.View style={[styles.header, { backgroundColor }]}>
            <ImageBackground
              source={background}
              style={styles.backgroundImageContainer}
              resizeMode="contain"
            >
              <Image
                resizeMode="contain"
                source={studyImage}
                style={styles.imageConfig}
              />
            </ImageBackground>
          </Animated.View>

          <View style={styles.bottomSlide}>
            <View style={styles.texts}>
              <Text style={styles.title}>01.</Text>
              <Text style={styles.description}>
                Encontre vários professores para ensinar você
              </Text>
            </View>
            <View style={styles.bottomController}>
              <View style={styles.bullets}>
                <View style={[styles.bullet, styles.active]} />
                <View style={styles.bullet} />
              </View>
              <BorderlessButton onPress={handleButtonNext}>
                <Image source={nextImage} />
              </BorderlessButton>
            </View>
          </View>
        </View>

        <View style={styles.singleSlide}>
          <Animated.View style={[styles.header, { backgroundColor }]}>
            <ImageBackground
              source={background2}
              style={styles.backgroundImageContainer}
              resizeMode="contain"
            >
              <Image
                resizeMode="contain"
                source={giveClassesImage}
                style={styles.imageConfig}
              />
            </ImageBackground>
          </Animated.View>

          <View style={styles.bottomSlide}>
            <View style={styles.texts}>
              <Text style={styles.title}>02.</Text>
              <Text style={styles.description}>
                Ou dê aulas sobre o que você mais conhece
              </Text>
            </View>
            <View style={styles.bottomController}>
              <View style={styles.bullets}>
                <View style={styles.bullet} />
                <View style={[styles.bullet, styles.active]} />
              </View>
              <BorderlessButton onPress={handleGotoLogin}>
                <Image source={nextImage} />
              </BorderlessButton>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default FirstEntrySlide;
