import React, { useState } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import {
  Text,
  Card,
  FAB,
  IconButton,
  useTheme,
  Button,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { Podcast } from "../types";

export const MainScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]); // Will be populated from backend
  const navigation = useNavigation();
  const theme = useTheme();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // TODO: Fetch podcasts from backend
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text variant="headlineSmall" style={styles.emptyStateText}>
        No Podcasts Yet
      </Text>
      <Text variant="bodyMedium" style={styles.emptyStateSubtext}>
        Create your first AI-powered podcast by tapping the button below
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("CreatePodcast")}
        style={styles.createButton}
      >
        Create Your First Podcast
      </Button>
    </View>
  );

  const renderPodcastCard = (podcast: Podcast) => (
    <Card
      key={podcast.id}
      style={styles.card}
      onPress={() =>
        navigation.navigate("PodcastPlayer", { podcastId: podcast.id })
      }
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="titleLarge" numberOfLines={1}>
            {podcast.title}
          </Text>
          <IconButton icon="dots-vertical" onPress={() => {}} />
        </View>
        <Text variant="bodyMedium" style={styles.topic}>
          Topic: {podcast.topic}
        </Text>
        <Text variant="bodySmall" style={styles.duration}>
          Duration: {Math.round(podcast.duration / 60)} minutes
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Your Podcasts
        </Text>
        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigation.navigate("Settings")}
        />
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {podcasts.length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={styles.podcastList}>
            {podcasts.map(renderPodcastCard)}
          </View>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("CreatePodcast")}
        label="New Podcast"
      />
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  podcastList: {
    padding: 16,
    gap: 16,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  topic: {
    marginBottom: 4,
    opacity: 0.7,
  },
  duration: {
    opacity: 0.5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: "50%",
  },
  emptyStateText: {
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtext: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 20,
  },
  createButton: {
    marginTop: 16,
  },
});
