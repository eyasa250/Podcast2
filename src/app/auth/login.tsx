import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";

import Background from "@/components/Background";
import { emailValidator } from "@/helpers/emailValidator";
import { passwordValidator } from "@/helpers/passwordValidator";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import theme from "@/core/theme";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { signIn, clearError } from "@/store/slices/authSlice";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const { user, loading, error } = useAppSelector((state) => state.auth);

  // ✅ Redirection automatique si connecté
  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/home");
    }
  }, [user]);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    // 🔁 Appel Redux thunk
    dispatch(signIn({ email: email.value, password: password.value }));
  };

  return (
    <Background>
      <BackButton goBack={() => router.back()} />
      <Logo />
      <Header>Welcome Back!</Header>

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

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => router.push("/auth/ResetPasswordScreen")}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={onLoginPressed} loading={loading}>
        {loading ? "Logging in..." : "Log in"}
      </Button>

      {/* 💥 Affichage des erreurs Redux */}
      {error && (
        <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
      )}

      <View style={styles.row}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearError());
            router.push("/auth/register");
          }}
        >
          <Text style={styles.link}> Sign up!</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
