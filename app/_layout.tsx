import { Slot } from 'expo-router'
import { LinearGradient }  from 'expo-linear-gradient'
import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NumberProvider } from '@/contexts/NumberProvider';
import Colors from '@/constants/colors';
import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
    SplashScreen.preventAutoHideAsync()
    const [fontsLoaded] = useFonts({
        'open-sans': require('@/assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('@/assets/fonts/OpenSans-Bold.ttf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <StatusBar style='light'/>
            <LinearGradient 
                style={styles.root} 
                colors={[Colors.primary700, Colors.accent500]}
                onLayout={onLayoutRootView}
            >
                <ImageBackground 
                    source={require('../assets/images/background.png')}
                    resizeMode='cover'
                    style={styles.root}
                    imageStyle={styles.backgroundImage}
                    >
                    <NumberProvider>
                        <SafeAreaView style={styles.root}>
                            <Slot/>
                        </SafeAreaView>
                    </NumberProvider>
                </ImageBackground>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    backgroundImage: {
        opacity: 0.15,
    }
})

export default RootLayout;