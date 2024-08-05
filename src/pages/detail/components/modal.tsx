import { View, Text, StyleSheet, Pressable, Image, TouchableWithoutFeedback } from "react-native";

interface ModalBannerProps{
    closeModal: () => void;
    imageUrl: string;
}

export function ModalBanner({ imageUrl, closeModal }: ModalBannerProps){
    return(
        <View style={styles.container}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
            <TouchableWithoutFeedback>
                <Image
                    source={{ uri: imageUrl}}
                    style={styles.image}
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0, 0.9)"
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    closeButton: {
        backgroundColor: "#FF0000",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        position: 'absolute',
        top: 100,
        zIndex: 99,
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: '700',
        color: "#FFF"
    }
})