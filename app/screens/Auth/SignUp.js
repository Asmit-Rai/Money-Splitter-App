import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_APP } from "@/firebaseConfig";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(FIREBASE_APP);
    const navigation = useNavigation();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully!');
            navigation.navigate('Login'); 
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>👋 New here? Create an account and join us! 🎉</Text>
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button mode="contained" onPress={handleSignup} style={styles.button}>
                Signup
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28, 
        fontWeight: 'bold', 
        marginBottom: 30, 
        color: '#333', 
        textAlign: 'center', 
    },
    input: {
        width: '80%',
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
    },
});

export default SignUp;