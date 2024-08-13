import { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, Keyboard } from 'react-native';
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

    //funcao que aplica a tecnica debounce
    const debounce = (func: (...args: string[]) => void, delay: number) => {
        let timeout: NodeJS.Timeout | null = null;

        return (...args: string[]) => {
            if(timeout){
                clearInterval(timeout);
            }

            timeout = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }

    function handleInputChange(text: string) {
        setSearchInput(text)
        delayedApiCall(text)
    }

    //funcao que completa a aplicação da tecnica debounce
    const delayedApiCall = useCallback(
        debounce(async (newText:string) => await fetchSearchCar(newText), 1000),
        []
    )

    //funcao para buscar os items pesquisados no banco de dados.
    async function fetchSearchCar(newText: string){
        if(newText === ""){
            await loadCars();
            setSearchInput("");
            return;
        }

        setCars([]);

        //metodo do firebase que busca os dados de acordo com a comparação definida
        const q = query(collection(db, "cars"),
            where("name", ">=", newText.toLocaleUpperCase()),
            where("name", "<=", newText.toLocaleUpperCase() + "\uf8ff"),
        )

        const querySnapshot = await getDocs(q);

        let listcars = [] as CarsProps[];

        querySnapshot.forEach((doc) => {
            listcars.push({
                id: doc.id,
                name: doc.data().name,
                year: doc.data().year,
                km: doc.data().km,
                price: doc.data().price,
                uid: doc.data().uid,
                city: doc.data().city,
                images: doc.data().images,
            })
        })

        setCars(listcars);
        Keyboard.dismiss();
    }


    return (
        <>
            <Header />

            <View style={styles.container}>
                <View style={styles.inputArea}>
                    <Input
                        placeholder='Procurando algum veiculo ?'
                        value={searchInput}
                        onChangeText={(text) => handleInputChange(text)}
                    />
                </View>

                {loading && (
                    <ActivityIndicator style={{ marginTop: 14 }} size="large" color="#000" />
                )}

                <FlatList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CarItem data={item} widthScreen={cars.length <= 1 ? "100%" : "49%"} />}
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