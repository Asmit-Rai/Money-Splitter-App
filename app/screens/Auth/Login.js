import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { FIREBASE_APP } from "@/firebaseConfig"; 
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const auth = getAuth(FIREBASE_APP); 

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password); 
            navigation.navigate('Money Splitter'); 
        } catch (error) {
            const errorMessage = error.message || "An error occurred during login.";
            Toast.show({
                type: 'error',
                text1: 'Authentication Error',
                text2: errorMessage,
            });
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/appLogo_t.png')} style={styles.logo} />
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.container2}>
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Login
                </Button>
                <View style={styles.buttonSpacing} />
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                    SignUp
                </Button>
            </View>
            {/* Include the Toast component */}
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'white',
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'white',
    },
    buttonSpacing: {
        width: 15, 
    },
    logo: {
        width: 350,
        height: 300,
        marginBottom: 30,
    },
    button: {
        flex: 1,
    },
    input: {
        width: '100%',
        marginBottom: 15,
    },
});

export default LoginScreen;
