import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../contexts/ThemeContext";

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { theme } = useThemeContext();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>
          Welcome to PodcastAI
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Your personal AI-powered podcast companion
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Button>

          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    opacity: 0.7,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    marginVertical: 8,
  },
});
