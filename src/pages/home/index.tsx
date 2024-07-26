import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
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
    }
})