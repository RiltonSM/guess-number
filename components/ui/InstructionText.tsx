import Colors from '@/constants/colors'
import { StyleSheet, Text, TextProps } from 'react-native'

interface InstructionTextProps extends TextProps {
    children: React.ReactNode
}

export const InstructionText = ({ children, style }: InstructionTextProps) => {
    return (
        <Text style={[styles.instructionText, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24
    },
})