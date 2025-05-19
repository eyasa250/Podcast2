
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router"; 
import { useAuth } from "@/hooks/useAuth"; // Importer le hook useAuth
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
import { Ionicons } from '@expo/vector-icons'; 

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp, loading, error } = useAuth(); // Utiliser signUp et loading/error du hook
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

const onSignUpPressed = async () => {
  const nameError = nameValidator(name.value);
  const emailError = emailValidator(email.value);
  const passwordError = passwordValidator(password.value);
  const confirmPasswordError = password.value !== confirmPassword.value ? "Les mots de passe ne correspondent pas" : "";

  if (emailError || passwordError || nameError || confirmPasswordError) {
    setName({ ...name, error: nameError });
    setEmail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });
    setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
    return;
  }

  try {
    await signUp(name.value, email.value, password.value, confirmPassword.value);
    Alert.alert("Succès", "Votre compte a été créé avec succès.");
    router.push("/auth/login");
  } catch (err) {
if (err instanceof Error) {
  Alert.alert("Erreur", err.message);
} else {
  Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription.");
}
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
    {/* 💥 Affichage des erreurs backend ici */}
{error && (
  <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
)}
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
