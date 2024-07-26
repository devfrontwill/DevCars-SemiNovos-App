import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { Input } from '../../components/input';

export function Home() {
    const [searchInput, setSearchInput] = useState("");

    return (
        <>
            <Header />

            <View style={styles.container}>
                <View style={styles.inputArea}>
                    <Input
                        placeholder='Procurando algum veiculo ?'
                        value={searchInput}
                        onChangeText={ (text) => setSearchInput(text) }
                    />
                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "blueviolet",
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