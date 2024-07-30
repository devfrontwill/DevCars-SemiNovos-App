import { Image, StyleSheet, View, Dimensions, Text } from 'react-native';

const { width: widthScreen } = Dimensions.get("window");

export function Banner({ url }: { url: string }){
    return(
        <Image
            source={{ uri: url }}
            style={styles.cover}
            resizeMode='cover'
        />
    )
}

const styles = StyleSheet.create({
    cover: {
        width: widthScreen / 1.15,
        height: 330,
        marginLeft: 6,
        marginRight: 6,
        borderRadius: 8,
        marginTop: 8
    },   
})