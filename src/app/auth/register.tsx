import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router"; 
import axios, { AxiosError } from "axios";
import { emailValidator } from "@/helpers/emailValidator";
import { nameValidator } from "@/helpers/nameValidator";
import { passwordValidator } from "@/helpers/passwordValidator";
import Background from "@/components/Background";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import theme from "@/core/theme";
import { Picker } from "@react-native-picker/picker";  // Import du Picker
import { Ionicons } from '@expo/vector-icons'; // Icônes pour afficher/cacher le mot de passe

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
  const [role, setRole] = useState("AUDITOR");  // Valeur initiale du rôle
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // État pour afficher/masquer la confirmation du mot de passe

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    // Vérification du mot de passe et confirmation du mot de passe
    if (password.value !== confirmPassword.value) {
      setConfirmPassword({ ...confirmPassword, error: "Les mots de passe ne correspondent pas" });
    }

    if (emailError || passwordError || nameError || confirmPassword.error) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    try {
      const apiUrl = 'http://192.168.1.24:3001/auth/signup'; // Remplace par l'IP locale de ta machine
      const response = await axios.post(apiUrl, {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        role: role, // Utilisation du rôle choisi
      });

      console.log("Réponse de l'API:", response.data);
      
      // Après l'inscription réussie, tu peux rediriger l'utilisateur
      Alert.alert("Succès", "Votre compte a été créé avec succès.");
      router.push("/auth/login"); // Redirige vers la page de connexion

    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Erreur lors de l'inscription:", axiosError.response?.data || axiosError.message);
        Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <BackButton goBack={() => router.back()} />
      <Logo />
      <Header>Welcome.</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          returnKeyType="next"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
          <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>Role:</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Podcaster" value="PODCASTER" />
          <Picker.Item label="Auditor" value="AUDITOR" />
        </Picker>
      </View>
      <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }} loading={loading}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>I already have an account!</Text>
        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={styles.link}> Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  roleContainer: {
    marginVertical: 10,
    width: "100%",
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
});
