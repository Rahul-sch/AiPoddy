import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Text,
  List,
  Switch,
  Divider,
  IconButton,
  Button,
  Portal,
  Modal,
  RadioButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../contexts/ThemeContext";

const VOICES = [
  { id: "default", name: "Default Voice" },
  { id: "obama", name: "Barack Obama" },
  { id: "morgan", name: "Morgan Freeman" },
  { id: "attenborough", name: "David Attenborough" },
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
];

export const SettingsScreen = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [downloadTranscript, setDownloadTranscript] = useState(false);
  const [defaultLength, setDefaultLength] = useState(5);
  const [selectedVoice, setSelectedVoice] = useState("default");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const navigation = useNavigation();
  const { isDarkMode, toggleTheme, theme } = useThemeContext();

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigation.navigate("Welcome");
  };

  const renderModal = (
    visible: boolean,
    onDismiss: () => void,
    title: string,
    options: { id: string; name: string }[] | { code: string; name: string }[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modal,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text variant="titleLarge" style={styles.modalTitle}>
          {title}
        </Text>
        <RadioButton.Group
          onValueChange={(value) => {
            onSelect(value);
            onDismiss();
          }}
          value={selectedValue}
        >
          {options.map((option) => (
            <RadioButton.Item
              key={"id" in option ? option.id : option.code}
              label={option.name}
              value={"id" in option ? option.id : option.code}
            />
          ))}
        </RadioButton.Group>
      </Modal>
    </Portal>
  );

  const renderAboutModal = () => (
    <Portal>
      <Modal
        visible={showAboutModal}
        onDismiss={() => setShowAboutModal(false)}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text variant="titleLarge" style={styles.modalTitle}>
          About PodcastAI
        </Text>
        <Text variant="bodyMedium" style={styles.modalText}>
          PodcastAI is your personal AI-powered podcast companion. Create,
          discover, and enjoy personalized podcasts tailored to your interests.
        </Text>
        <Text variant="bodyMedium" style={styles.modalVersion}>
          Version 1.0.0
        </Text>
        <Button mode="contained" onPress={() => setShowAboutModal(false)}>
          Close
        </Button>
      </Modal>
    </Portal>
  );

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
        <Text variant="headlineMedium" style={styles.title}>
          Settings
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView style={styles.content}>
        <List.Section>
          <List.Subheader>Playback</List.Subheader>
          <List.Item
            title="Auto-play next podcast"
            right={() => (
              <Switch value={autoPlay} onValueChange={setAutoPlay} />
            )}
          />
          <List.Item
            title="Download transcript"
            right={() => (
              <Switch
                value={downloadTranscript}
                onValueChange={setDownloadTranscript}
              />
            )}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Podcast Preferences</List.Subheader>
          <List.Item
            title="Default Voice"
            description={VOICES.find((v) => v.id === selectedVoice)?.name}
            onPress={() => setShowVoiceModal(true)}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title="Default Language"
            description={
              LANGUAGES.find((l) => l.code === selectedLanguage)?.name
            }
            onPress={() => setShowLanguageModal(true)}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark Mode"
            right={() => (
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
            )}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            right={() => <Switch value={true} />}
          />
          <List.Item
            title="Email Notifications"
            right={() => <Switch value={false} />}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="About PodcastAI"
            onPress={() => setShowAboutModal(true)}
          />
          <List.Item
            title="Privacy Policy"
            onPress={() => {
              /* TODO: Implement */
            }}
          />
          <List.Item
            title="Terms of Service"
            onPress={() => {
              /* TODO: Implement */
            }}
          />
        </List.Section>

        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={theme.colors.error}
          >
            Log Out
          </Button>
        </View>
      </ScrollView>

      {renderModal(
        showVoiceModal,
        () => setShowVoiceModal(false),
        "Select Voice",
        VOICES,
        selectedVoice,
        setSelectedVoice
      )}

      {renderModal(
        showLanguageModal,
        () => setShowLanguageModal(false),
        "Select Language",
        LANGUAGES,
        selectedLanguage,
        setSelectedLanguage
      )}

      {renderAboutModal()}
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
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  modal: {
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  logoutContainer: {
    padding: 20,
    marginBottom: 20,
  },
  logoutButton: {
    borderColor: "red",
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalText: {
    marginBottom: 16,
  },
  modalVersion: {
    marginBottom: 24,
    opacity: 0.7,
  },
});
