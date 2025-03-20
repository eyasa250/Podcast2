  /* import React, { useState } from "react";
  import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
  import { Text } from "react-native-paper";
  import { useRouter } from "expo-router"; // 🔥 Utilisation de useRouter()
  import axios from "axios";

  import Background from "@/components/Background";
  import { emailValidator } from "@/helpers/emailValidator";
  import { passwordValidator } from "@/helpers/passwordValidator";
  import BackButton from "@/components/BackButton";
  import Header from "@/components/Header";
  import TextInput from "@/components/TextInput";
  import Button from "@/components/Button";
  import Logo from "@/components/Logo";
  import theme from "@/core/theme";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  export default function LoginScreen() {
    const router = useRouter(); // Utilisation de useRouter()
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false); // Ajout de l'état de chargement

    const onLoginPressed = async () => {
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }

      // Indiquer que la requête est en cours
      setLoading(true);

      try {
        // Envoi de la requête avec Axios
        const response = await axios.post("http://192.168.1.24:3001/auth/login", {
          email: email.value,
          password: password.value,
        });

        // Si la connexion est réussie, tu peux traiter la réponse ici
        console.log("Réponse de l'API:", response.data);

        // Si le token est dans la réponse (supposons que la clé est 'access_token')
        const token = response.data.access_token;

        // Sauvegarder le token dans AsyncStorage
        await AsyncStorage.setItem('auth_token', token);

        // Rediriger l'utilisateur vers l'écran "home" ou d'accueil
        router.replace("/(tabs)/home");
      } 
      catch (error) {
        // Type de garde pour vérifier si l'erreur est une erreur Axios
        if (axios.isAxiosError(error)) {
          console.error("Erreur Axios lors de la connexion:", error.response?.data || error.message);
          // Afficher un message d'erreur
          Alert.alert("Erreur", "Identifiants incorrects. Veuillez réessayer.");
        } else {
          // Si l'erreur n'est pas une erreur Axios
          console.error("Erreur inconnue:", error);
          Alert.alert("Erreur", "Une erreur inconnue est survenue.");
        }
        } finally {
        setLoading(false); // Remettre l'état de chargement à false
      }
    };

    return (
      <Background>
        <BackButton goBack={() => router.back()} />
        <Logo />
        <Header>Hello.</Header>
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
        <Button mode="contained" onPress={onLoginPressed} disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
        <View style={styles.row}>
          <Text>You do not have an account yet?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={styles.link}> Create one!</Text>
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
  */
  import React, { useState } from "react";
  import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
  import { Text } from "react-native-paper";
  import { useRouter } from "expo-router";
  import { useAuth } from "@/hooks/useAuth"; // Hook d'authentification
  import Background from "@/components/Background";
  import { emailValidator } from "@/helpers/emailValidator";
  import { passwordValidator } from "@/helpers/passwordValidator";
  import BackButton from "@/components/BackButton";
  import Header from "@/components/Header";
  import TextInput from "@/components/TextInput";
  import Button from "@/components/Button";
  import Logo from "@/components/Logo";
  import theme from "@/core/theme";
  
  export default function LoginScreen() {
    const router = useRouter();
    const { signIn, loading } = useAuth(); // Utilisation du hook useAuth
  
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
  
    const onLoginPressed = async () => {
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }
    
      try {
        await signIn(email.value, password.value);
      } catch (err) {
        Alert.alert("Erreur", "Identifiants incorrects ou problème serveur.");
      }
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
        <View style={styles.row}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
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
  
