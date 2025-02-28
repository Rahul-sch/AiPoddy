import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import {
  Text,
  IconButton,
  ProgressBar,
  useTheme,
  Surface,
  Portal,
  Modal,
  Button,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { Podcast } from "../types";

const SAMPLE_PODCAST: Podcast = {
  id: "sample-1",
  title: "The Future of AI and Its Impact",
  content: "This is a sample podcast content...",
  audioUrl: "https://example.com/audio.mp3",
  transcript: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
  duration: 300, // 5 minutes
  createdAt: new Date().toISOString(),
  userId: "user-1",
  topic: "Artificial Intelligence",
};

export const PodcastPlayerScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();

  // In a real app, we would fetch the podcast data using the podcastId from route.params
  const podcast = SAMPLE_PODCAST;

  useEffect(() => {
    setupAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const setupAudio = async () => {
    try {
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: podcast.audioUrl },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(audioSound);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / (podcast.duration * 1000));
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
      }
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = async (value: number) => {
    if (!sound) return;
    const newPosition = value * podcast.duration * 1000;
    await sound.setPositionAsync(newPosition);
    setPosition(value);
  };

  const handleSpeedChange = async () => {
    if (!sound) return;
    const speeds = [1.0, 1.25, 1.5, 1.75, 2.0];
    const nextSpeed =
      speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    await sound.setRateAsync(nextSpeed, true);
    setPlaybackSpeed(nextSpeed);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon="text"
          size={24}
          onPress={() => setShowTranscript(true)}
        />
      </View>

      <View style={styles.content}>
        <Surface style={styles.playerCard} elevation={2}>
          <Text variant="headlineSmall" style={styles.title}>
            {podcast.title}
          </Text>
          <Text variant="bodyMedium" style={styles.topic}>
            {podcast.topic}
          </Text>

          <View style={styles.progressContainer}>
            <ProgressBar progress={position} style={styles.progressBar} />
            <View style={styles.timeContainer}>
              <Text variant="bodySmall">
                {formatTime(position * podcast.duration)}
              </Text>
              <Text variant="bodySmall">{formatTime(podcast.duration)}</Text>
            </View>
          </View>

          <View style={styles.controls}>
            <IconButton
              icon="rewind-10"
              size={32}
              onPress={() =>
                handleSeek(Math.max(0, position - 10 / podcast.duration))
              }
            />
            <IconButton
              icon={isPlaying ? "pause-circle" : "play-circle"}
              size={64}
              onPress={handlePlayPause}
            />
            <IconButton
              icon="fast-forward-10"
              size={32}
              onPress={() =>
                handleSeek(Math.min(1, position + 10 / podcast.duration))
              }
            />
          </View>

          <View style={styles.secondaryControls}>
            <Button
              mode="outlined"
              onPress={handleSpeedChange}
              style={styles.speedButton}
            >
              {playbackSpeed}x
            </Button>
          </View>
        </Surface>
      </View>

      <Portal>
        <Modal
          visible={showTranscript}
          onDismiss={() => setShowTranscript(false)}
          contentContainerStyle={styles.transcriptModal}
        >
          <ScrollView style={styles.transcriptScroll}>
            <Text variant="titleLarge" style={styles.transcriptTitle}>
              Transcript
            </Text>
            <Text variant="bodyMedium" style={styles.transcript}>
              {podcast.transcript}
            </Text>
          </ScrollView>
          <Button
            mode="contained"
            onPress={() => setShowTranscript(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  playerCard: {
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  topic: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 32,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  secondaryControls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  speedButton: {
    borderRadius: 20,
  },
  transcriptModal: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    height: Dimensions.get("window").height * 0.8,
  },
  transcriptScroll: {
    marginBottom: 20,
  },
  transcriptTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  transcript: {
    lineHeight: 24,
  },
  closeButton: {
    marginTop: 10,
  },
});
