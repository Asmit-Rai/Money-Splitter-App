import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { FIREBASE_APP } from "@/firebaseConfig"; 

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
            console.error("Error in sign-in:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔐 Welcome Back! Please log in to continue 🚀</Text>
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
    title: {
        fontSize: 28, 
        fontWeight: 'bold', 
        marginBottom: 30, 
        color: '#333', 
        textAlign: 'center', 
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