import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_APP } from "@/firebaseConfig"; 
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const auth = getAuth(FIREBASE_APP);
    const navigation = useNavigation();

    const handleSignup = async () => {
        if (!email.includes('@') || password.length < 6) {
            Alert.alert('Invalid Input', 'Please enter a valid email and a password with at least 6 characters.');
            return;
        }

        setLoading(true); 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const response = await axios.post('https://money-splitter-backend.onrender.com/api/users/add-users', {
                email,
                password,
            });

            if (response.status === 201 || response.status === 200) {
                Alert.alert('Success', 'User created successfully!');
                navigation.navigate('Login'); 
            } else {
                throw new Error('Failed to add user to the backend.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert('Signup Error', error.message || 'An error occurred during signup.');
        } finally {
            setLoading(false); 
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
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button
                mode="contained"
                onPress={handleSignup}
                style={styles.button}
                disabled={loading} 
            >
                {loading ? <ActivityIndicator color="#fff" /> : 'Signup'}
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
