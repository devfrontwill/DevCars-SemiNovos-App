import { FlatList, TouchableOpacity } from "react-native";
import { CarImageProps } from "../../../types/cars.type";
import { Banner } from "./banner";

interface BannerListProps{
    images: CarImageProps[];
    handleOpenImage: (imageUrl: string) => void;
}

export function BannerList({ images, handleOpenImage }: BannerListProps){
    return(
        <FlatList 
            data={images}
            keyExtractor={(item) => item.name}
            renderItem={ ({ item }) => (
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleOpenImage(item.url)}>
                    <Banner url={item.url} />
                </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    )
}