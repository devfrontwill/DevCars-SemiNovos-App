import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarsProps } from "../types/cars.type";

const key = "@webcarsapp";

const useStorage = () => {

    const getItem = async (): Promise<CarsProps[]> => {
        try {
            const cars = await AsyncStorage.getItem(key);
            return cars && JSON.parse(cars) || [];
        } catch (error) {
            console.log(error);
            return[]
        }
    }

    const saveItem = async (newCar: CarsProps) => {
        try {
            let cars = await getItem();

            let findCar = cars.find(car => car.id === newCar.id);

            if(findCar){
                return;
            }

            cars.push(newCar);

            await AsyncStorage.setItem(key, JSON.stringify(cars))
            console.log("Carro favoritado com sucesso!")       
        } catch (error) {
            console.log("Erro ao salvar", error)
        }
    }

    const removeItem = async (id: string): Promise<CarsProps[] | []> => {
        try {
            let cars = await getItem();

            let updatedCarList = cars.filter(car => {
                return (car.id !== id)
            })

            await AsyncStorage.setItem(key, JSON.stringify(updatedCarList))

            return updatedCarList;
        } catch (error) {
            console.log("Erro ao remover", error)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }
}

export default useStorage;