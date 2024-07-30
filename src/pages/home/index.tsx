import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { CarItem } from '../../components/carlist';
import { CarsProps } from '../../types/cars.type';
import { db } from '../../services/firebaseConnection';
import { collection, orderBy, query, where, getDocs, doc } from 'firebase/firestore';

export function Home() {
    const [searchInput, setSearchInput] = useState("");
    const [cars, setCars] = useState<CarsProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCars() {
            await loadCars();
        }

        fetchCars();
    }, [])

    async function loadCars() {
        const carsRef = collection(db, "cars")
        const queryRef = query(carsRef, orderBy("createdAt", "desc"))

        getDocs(queryRef)
            .then((snapshot) => {
                let listcars = [] as CarsProps[];

                snapshot.forEach(doc => {
                    listcars.push({
                        id: doc.id,
                        name: doc.data().name,
                        year: doc.data().year,
                        city: doc.data().city,
                        km: doc.data().km,
                        price: doc.data().price,
                        uid: doc.data().uid,
                        images: doc.data().images,
                    })
                })
                setCars(listcars);
                setLoading(false);
            })
    }

    return (
        <>
            <Header />

            <View style={styles.container}>
                <View style={styles.inputArea}>
                    <Input
                        placeholder='Procurando algum veiculo ?'
                        value={searchInput}
                        onChangeText={(text) => setSearchInput(text)}
                    />
                </View>

                { loading && (
                    <ActivityIndicator style={{ marginTop: 14 }} size="large" color="#000" />
                )}

                <FlatList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CarItem data={item} widthScreen={ cars.length <= 1 ? "100%" : "49%"} /> }
                    style={styles.list}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingBottom: 14 }}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f5f8",
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
        alignItems: 'center',
    },
    inputArea: {
        width: '100%',
        marginTop: 14,
        padding: 8,
        backgroundColor: "#FFF",
        borderRadius: 8,
    },
    list: {
        flex: 1,
        marginTop: 4,
        paddingTop: 14,
    }
})