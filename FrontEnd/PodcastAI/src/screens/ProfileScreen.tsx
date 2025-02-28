import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import {
  Text,
  Button,
  Surface,
  IconButton,
  Portal,
  Modal,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../contexts/ThemeContext";

// Temporary mock data
const USER_DATA = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
  stats: {
    totalPodcasts: 12,
    totalListeningTime: "5h 23m",
    favoriteTopics: ["Technology", "Science", "History"],
  },
};

export const ProfileScreen = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(USER_DATA.name);
  const navigation = useNavigation();
  const { theme } = useThemeContext();

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditMode(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title} variant="headlineMedium">
          Profile
        </Text>
        <IconButton
          icon={isEditMode ? "check" : "pencil"}
          size={24}
          onPress={() => (isEditMode ? handleSave() : setIsEditMode(true))}
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Surface style={styles.avatarContainer}>
            <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
            <IconButton
              icon="camera"
              size={20}
              style={styles.cameraButton}
              onPress={() => {
                /* TODO: Implement image upload */
              }}
            />
          </Surface>
          {isEditMode ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.nameInput}
              mode="outlined"
            />
          ) : (
            <Text style={styles.name} variant="headlineMedium">
              {name}
            </Text>
          )}
          <Text style={styles.email} variant="bodyMedium">
            {USER_DATA.email}
          </Text>
        </View>

        <Surface style={styles.statsContainer}>
          <Text style={styles.statsTitle} variant="titleMedium">
            Your Statistics
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber} variant="headlineMedium">
                {USER_DATA.stats.totalPodcasts}
              </Text>
              <Text style={styles.statLabel} variant="bodyMedium">
                Total Podcasts
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber} variant="headlineMedium">
                {USER_DATA.stats.totalListeningTime}
              </Text>
              <Text style={styles.statLabel} variant="bodyMedium">
                Listening Time
              </Text>
            </View>
          </View>
        </Surface>

        <Surface style={styles.topicsContainer}>
          <Text style={styles.topicsTitle} variant="titleMedium">
            Favorite Topics
          </Text>
          <View style={styles.topicsList}>
            {USER_DATA.stats.favoriteTopics.map((topic, index) => (
              <Button
                key={index}
                mode="outlined"
                style={styles.topicButton}
                labelStyle={styles.topicButtonLabel}
              >
                {topic}
              </Button>
            ))}
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    right: -8,
    bottom: -8,
    backgroundColor: "white",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  nameInput: {
    width: "80%",
    marginBottom: 4,
  },
  email: {
    opacity: 0.7,
  },
  statsContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  statsTitle: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    opacity: 0.7,
  },
  topicsContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  topicsTitle: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  topicsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topicButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  topicButtonLabel: {
    fontSize: 12,
  },
});
