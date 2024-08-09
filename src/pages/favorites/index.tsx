import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes';
import { CarsProps } from '../../types/cars.type';
import { CarItem } from '../../components/carlist';
import useStorage from '../../hooks/useStorage';

export function Favorites() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const [cars, setCars] = useState<CarsProps[]>([])
    const { getItem, removeItem } = useStorage();
    const isFocused = useIsFocused();


    useEffect(() => {
        async function loadFavoriteCars(){
            const listCars = await getItem();
            setCars(listCars);
        }

        loadFavoriteCars();
    }, [isFocused])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}> 
                    <Feather name='arrow-left' size={33} color='#FF0000' />
                </Pressable>
                <Text style={styles.title}>Meus Favoritos</Text>
            </View>

            <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <CarItem data={item} widthScreen={"100%"} />}
                contentContainerStyle={{ paddingBottom: 14 }}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f5f8",
        paddingLeft: 14,
        paddingRight: 14,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        paddingTop: 8,
        paddingBottom: 8,
    },
    title: {
        fontSize: 24,
        color: "#000",
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
        marginTop: 4,
        paddingTop: 14,
    }
})