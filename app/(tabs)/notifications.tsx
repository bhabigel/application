import { FlatList, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';

interface Notification {
  id: string;
  message: string;
  time: string;
  link?: string;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    message: 'Lorem ipsum dolor amet, congue rone elit',
    time: '9:36',
  },
  {
    id: '2',
    message: 'Lorem ipsum doloe amet, congue rone elit',
    time: '8:43',
  },
  {
    id: '3',
    message: 'Lorem ipsum doloea amet, congue rone elit',
    time: '8:26',
    link: 'rone elit'
  }
];

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={[styles.notificationItem, { backgroundColor: theme.card }]}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, { backgroundColor: theme.accent }]}>
          <ThemedText style={styles.iconText}>A</ThemedText>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ThemedText style={styles.time}>{item.time}</ThemedText>
        <View style={styles.messageContainer}>
          <ThemedText style={styles.message}>
            {item.message}
            {item.link && (
              <ThemedText style={[styles.link, { color: theme.link }]}>
                {' ' + item.link}
              </ThemedText>
            )}
          </ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={SAMPLE_NOTIFICATIONS}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    fontSize: 14,
    lineHeight: 20,
  },
});