import { useEffect, useRef } from "react";
import { Text, Pressable, Animated, StyleSheet, View } from "react-native";
import { MessagesProps } from '../../context/toastContext';


interface ToastProps {
    messages: MessagesProps[];
    hideToast: () => void;
}

export function Toast({ messages, hideToast }: ToastProps) {
    const opacityAnimated = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (messages) {
            Animated.timing(opacityAnimated, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
        }
    }, [messages])

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: opacityAnimated
                }
            ]}>
            {messages && messages.map((item, index) => (
                <Pressable
                    key={index}
                    style={[styles.toast, item.type === "DEFAULT" ? styles.default : styles.success]}
                    onPress={hideToast}
                >
                    <Text style={styles.toastText}>{item.message}</Text>
                </Pressable>
            ))}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        marginLeft: 14,
        marginRight: 14,
    },
    toast: {
        backgroundColor: "rgba(0,0,0,0.8)",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 8,
        borderRadius: 8,
    },
    toastText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: '500'
    },
    default: {
        backgroundColor: "rgba(0,0,0, 0.89)",
    },
    success: {
        backgroundColor: "rgba(0,184,95,0.89)"
    },
})