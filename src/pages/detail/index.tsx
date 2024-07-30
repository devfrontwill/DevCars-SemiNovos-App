import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, FlatList, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../routes/index';
import { CarDetailProps } from '../../types/cars.type';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { BannerList } from './components/bannerlist';

type RouteDetailParams = {
    detail: { id: string; };
}

type DetailRouteProps = RouteProp<RouteDetailParams, 'detail'>

export function Detail() {
    const route = useRoute<DetailRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    const [car, setCar] = useState<CarDetailProps>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadCar() {
            if (!route.params.id) { return }

            const docRef = doc(db, "cars", route.params.id)
            getDoc(docRef)
                .then((snapshot) => {
                    if (!snapshot.data()) {
                        navigation.goBack();
                    }

                    setCar({
                        id: snapshot.id,
                        name: snapshot.data()?.name,
                        year: snapshot.data()?.year,
                        city: snapshot.data()?.city,
                        model: snapshot.data()?.model,
                        uid: snapshot.data()?.uid,
                        createdAt: snapshot.data()?.createdAt,
                        description: snapshot.data()?.description,
                        km: snapshot.data()?.km,
                        owner: snapshot.data()?.owner,
                        price: snapshot.data()?.price,
                        whatsapp: snapshot.data()?.whatsapp,
                        images: snapshot.data()?.images
                    })
                })
                .finally(() => {
                    setLoading(false);
                })

        }

        loadCar();

    }, [route.params.id])

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View style={styles.container} >
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={36} color="#ff0000" />
                    </Pressable>
                    
                    {!loading && car?.images && (
                        <BannerList
                            images={car.images}
                            handleOpenImage={ (imageUrl) => {console.log(imageUrl)}}
                        />
                    )}

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f5f8",
        alignItems: 'center',
        paddingBottom: 16,
    },
    backButton: {
        width: 52,
        height: 52,
        borderRadius: 50,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 24,
        top: 44,
        zIndex: 99,
    }
})