import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sprout, Heart, Sun, Droplets } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Icon animations
  const icon1Anim = useRef(new Animated.Value(0)).current;
  const icon2Anim = useRef(new Animated.Value(0)).current;
  const icon3Anim = useRef(new Animated.Value(0)).current;
  const icon4Anim = useRef(new Animated.Value(0)).current;

  // Loading dots animations
  const dot1Anim = useRef(new Animated.Value(0.3)).current;
  const dot2Anim = useRef(new Animated.Value(0.3)).current;
  const dot3Anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Start animations
    const startAnimations = () => {
      // Main logo animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }).start();

      // Rotating animation for emoji
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();

      // Loading dots animation
      const createDotAnimation = (dotAnim: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(dotAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(dotAnim, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
          { iterations: -1 }
        );
      };

      setTimeout(() => {
        createDotAnimation(dot1Anim, 0).start();
      }, 800);
      
      setTimeout(() => {
        createDotAnimation(dot2Anim, 200).start();
      }, 1000);
      
      setTimeout(() => {
        createDotAnimation(dot3Anim, 400).start();
      }, 1200);

      // Staggered icon animations
      setTimeout(() => {
        Animated.stagger(200, [
          Animated.spring(icon1Anim, {
            toValue: 1,
            tension: 150,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(icon2Anim, {
            toValue: 1,
            tension: 150,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(icon3Anim, {
            toValue: 1,
            tension: 150,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(icon4Anim, {
            toValue: 1,
            tension: 150,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }, 500);
    };

    startAnimations();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#22c55e', '#16a34a', '#15803d']}
        style={styles.gradient}
      >
        {/* Floating Icons */}
        <Animated.View 
          style={[
            styles.floatingIcon,
            styles.icon1,
            {
              opacity: icon1Anim,
              transform: [
                {
                  scale: icon1Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Sprout size={24} color="#ffffff" />
        </Animated.View>

        <Animated.View 
          style={[
            styles.floatingIcon,
            styles.icon2,
            {
              opacity: icon2Anim,
              transform: [
                {
                  scale: icon2Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Heart size={20} color="#ffffff" />
        </Animated.View>

        <Animated.View 
          style={[
            styles.floatingIcon,
            styles.icon3,
            {
              opacity: icon3Anim,
              transform: [
                {
                  scale: icon3Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Sun size={22} color="#ffffff" />
        </Animated.View>

        <Animated.View 
          style={[
            styles.floatingIcon,
            styles.icon4,
            {
              opacity: icon4Anim,
              transform: [
                {
                  scale: icon4Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Droplets size={18} color="#ffffff" />
        </Animated.View>

        {/* Main Content */}
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateY: slideAnim },
                ],
              },
            ]}
          >
            <Animated.Text
              style={[
                styles.emoji,
                {
                  transform: [{ rotate: spin }],
                },
              ]}
            >
              🌾
            </Animated.Text>
            <Text style={styles.appName}>GramSetu</Text>
            <Text style={styles.tagline}>ग्रामीण भारत का डिजिटल सेतु</Text>
            <Text style={styles.subtitle}>Bridging India's Rural Digital Divide</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.loadingContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.loadingBar}>
              <Animated.View
                style={[
                  styles.loadingProgress,
                  {
                    transform: [
                      {
                        scaleX: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
            <View style={styles.loadingTextContainer}>
              <Text style={styles.loadingText}>लोड हो रहा है</Text>
              <View style={styles.dotsContainer}>
                <Animated.View style={[styles.dot, { opacity: dot1Anim }]} />
                <Animated.View style={[styles.dot, { opacity: dot2Anim }]} />
                <Animated.View style={[styles.dot, { opacity: dot3Anim }]} />
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Bottom Text */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.footerText}>किसानों के लिए, किसानों के द्वारा</Text>
          <Text style={styles.footerSubtext}>For Farmers, By Technology</Text>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  floatingIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon1: {
    top: height * 0.15,
    left: width * 0.1,
  },
  icon2: {
    top: height * 0.25,
    right: width * 0.15,
  },
  icon3: {
    bottom: height * 0.25,
    left: width * 0.2,
  },
  icon4: {
    bottom: height * 0.15,
    right: width * 0.1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
    opacity: 0.9,
  },
  subtitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  loadingContainer: {
    alignItems: 'center',
    width: width * 0.6,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 15,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    transformOrigin: 'left',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
  },
  loadingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    marginHorizontal: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    opacity: 0.9,
  },
  footerSubtext: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.7,
    fontStyle: 'italic',
  },
});
