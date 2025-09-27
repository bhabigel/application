import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';

interface Lecture {
  id: string;
  title: string;
  teacher: string;
  time: string;
  room: string;
  type: 'live' | 'recorded';
}

const SAMPLE_LECTURES: Lecture[] = [
  {
    id: '1',
    title: 'Introduction to AI',
    teacher: 'Dr. Sarah Johnson',
    time: 'Monday 10:00 - 11:30',
    room: 'Room 101',
    type: 'live'
  },
  {
    id: '2',
    title: 'Data Structures and Algorithms',
    teacher: 'Prof. Michael Chen',
    time: 'Tuesday 14:00 - 15:30',
    room: 'Room 203',
    type: 'live'
  },
  {
    id: '3',
    title: 'Software Engineering Principles',
    teacher: 'Dr. Emma Williams',
    time: 'Available Now',
    room: 'Online',
    type: 'recorded'
  }
];

export default function LecturesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderLecture = ({ item }: { item: Lecture }) => (
    <Pressable 
      style={[styles.lectureItem, { backgroundColor: theme.card }]}
      onPress={() => {
        // Handle lecture selection
        console.log('Selected lecture:', item.title);
      }}>
      <View style={styles.lectureInfo}>
        <View style={styles.headerRow}>
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          {item.type === 'live' ? (
            <View style={[styles.badge, { backgroundColor: theme.accent }]}>
              <ThemedText style={styles.badgeText}>LIVE</ThemedText>
            </View>
          ) : null}
        </View>
        <ThemedText style={styles.teacher}>{item.teacher}</ThemedText>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={theme.textSecondary} />
            <ThemedText style={[styles.detailText, { color: theme.textSecondary }]}>{item.time}</ThemedText>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color={theme.textSecondary} />
            <ThemedText style={[styles.detailText, { color: theme.textSecondary }]}>{item.room}</ThemedText>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={SAMPLE_LECTURES}
        renderItem={renderLecture}
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
  },
  lectureItem: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lectureInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  teacher: {
    fontSize: 16,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    opacity: 0.7,
  },
});