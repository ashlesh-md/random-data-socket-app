import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Authentication() {
  const navigation = useNavigation();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const auth = FIREBASE_AUTH;

  const toggleSignup = () => {
    setError(null); // Reset error on toggle
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleAuthentication = async () => {
    setError(null); // Reset error on each authentication attempt

    try {
      // Disable the button to prevent multiple clicks during authentication
      setIsButtonDisabled(true);

      if (isSignup) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      // Navigate to Home screen on successful authentication
      navigation.navigate('Home');
    } catch (error) {
      setError(error.message);
    } finally {
      // Enable the button after authentication attempt (success or failure)
      setIsButtonDisabled(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {isSignup && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isButtonDisabled ? '#95a5a6' : '#3498db' }]}
            onPress={handleAuthentication}
            disabled={isButtonDisabled}
          >
            <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <Text style={styles.link} onPress={toggleSignup}>
              {isSignup ? 'Log in' : 'Sign up'}
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    width: '50%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
  signupText: {
    color: '#3498db',
    marginTop: 10,
  },
  link: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
