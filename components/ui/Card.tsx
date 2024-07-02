import Colors from "@/constants/colors"
import { StyleSheet, View } from "react-native"

interface CardProps {
    children: React.ReactNode
}

export const Card = ({ children }: CardProps) => {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: Colors.primary800,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2, 
        },
        shadowRadius: 6,
        shadowOpacity: 0.25
      },
})