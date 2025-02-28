import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export const CreatePodcastScreen = () => {
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState(5); // minutes
  const [language, setLanguage] = useState("en");
  const [style, setStyle] = useState<"conversational" | "formal">(
    "conversational"
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();

  const handleCreate = async () => {
    if (!topic.trim()) {
      // TODO: Show error message
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Call API to generate podcast
      // TODO: Upload to storage
      // TODO: Save to database
      navigation.navigate("PodcastPlayer", { podcastId: "new-podcast-id" });
    } catch (error) {
      console.error(error);
      // TODO: Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              Create New Podcast
            </Text>
          </View>

          <View style={styles.form}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              What would you like to learn about?
            </Text>
            <TextInput
              mode="outlined"
              value={topic}
              onChangeText={setTopic}
              placeholder="E.g., Latest developments in AI, History of Rome..."
              multiline
              numberOfLines={3}
              style={styles.topicInput}
            />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Podcast Length: {length} minutes
            </Text>
            <View style={styles.sliderContainer}>
              <Text variant="bodySmall">3 min</Text>
              <View style={styles.slider}>
                <TextInput
                  value={length.toString()}
                  onChangeText={(value) => {
                    const num = parseInt(value);
                    if (!isNaN(num) && num >= 3 && num <= 30) {
                      setLength(num);
                    }
                  }}
                  keyboardType="numeric"
                  style={styles.lengthInput}
                />
              </View>
              <Text variant="bodySmall">30 min</Text>
            </View>

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Language
            </Text>
            <SegmentedButtons
              value={language}
              onValueChange={setLanguage}
              buttons={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
              ]}
              style={styles.segmentedButton}
            />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Style
            </Text>
            <SegmentedButtons
              value={style}
              onValueChange={(value) =>
                setStyle(value as "conversational" | "formal")
              }
              buttons={[
                { value: "conversational", label: "Conversational" },
                { value: "formal", label: "Formal" },
              ]}
              style={styles.segmentedButton}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleCreate}
            loading={isLoading}
            disabled={isLoading || !topic.trim()}
            style={styles.createButton}
          >
            Create Podcast
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontWeight: "bold",
  },
  form: {
    padding: 20,
    gap: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  topicInput: {
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  lengthInput: {
    textAlign: "center",
    height: 40,
  },
  segmentedButton: {
    marginBottom: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  createButton: {
    padding: 5,
  },
});
