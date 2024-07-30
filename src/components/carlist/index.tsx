import { View, Text, StyleSheet, Pressable, DimensionValue, Image } from 'react-native';
import { CarsProps } from '../../types/cars.type';

interface CarItemProps{
    data: CarsProps;
    widthScreen: DimensionValue;
}

export function CarItem({ data, widthScreen }: CarItemProps){
    return(
        <Pressable style={[styles.container, { width: widthScreen }]} >
            <Image
                style={styles.cover}
                source={{ uri: data.images[0].url }}
            />

            <Text style={styles.title} >{data.name}</Text>
            <Text style={styles.text} >{data.year} - {data.km} Km</Text>
            <Text style={[styles.title, { marginTop: 14 }]} >R$ {data.price}</Text>

            <View style={styles.divisor}></View>
            <Text style={[styles.text, { marginTop: 4 }]}>{data.city}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#FFF",
        padding: 4,
        borderRadius: 4,
        marginBottom: 14,
    },
    cover:{
        width: '100%',
        height: 140,
        borderRadius: 4,
        marginBottom: 14,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 6
    },
    text: {
        marginBottom: 4,
        fontSize: 12,
    },
    divisor: {
        width: '100%',
        height: 1,
        backgroundColor: "#d9d9d9"
    }
})