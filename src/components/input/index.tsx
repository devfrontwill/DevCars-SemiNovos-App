import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {}

export function Input({ ...rest }: InputProps){
    return(
        <TextInput 
            style={styles.input}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        height: 40,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 4,

    }

})