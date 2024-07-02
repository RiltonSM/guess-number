import Colors from '@/constants/colors'
import { View, Text, Pressable, StyleSheet, PressableProps } from 'react-native'

interface PrimaryButtonProps extends PressableProps {
    children: string | React.ReactNode
}


const PrimaryButton = ({children, ...rest}: PrimaryButtonProps) => {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                style={({pressed}) => pressed ? [styles.pressed, styles.buttonInnerContainer] : styles.buttonInnerContainer}
                android_ripple={{ color: Colors.primary600}}
                {...rest}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    }
})

export default PrimaryButton