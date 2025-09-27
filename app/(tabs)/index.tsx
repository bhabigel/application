import { View, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image?: any;
  tag: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'University Open Day',
    summary: 'Join us for the annual University Open Day! Meet professors, explore facilities, and learn about our programs.',
    date: 'Today',
    image: require('@/assets/images/partial-react-logo.png'),
    tag: 'Event'
  },
  {
    id: '2',
    title: 'New Computer Lab Opening',
    summary: 'State-of-the-art computer lab opening next week. Features latest hardware and software for student use.',
    date: 'Yesterday',
    image: require('@/assets/images/partial-react-logo.png'),
    tag: 'Announcement'
  },
  {
    id: '3',
    title: 'Student Achievement Awards',
    summary: 'Congratulations to all students who received awards at the annual ceremony.',
    date: '2 days ago',
    image: require('@/assets/images/partial-react-logo.png'),
    tag: 'News'
  }
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderNewsItem = (item: NewsItem) => (
    <Pressable
      key={item.id}
      style={[styles.newsCard, { backgroundColor: theme.card }]}
      onPress={() => console.log('Selected news:', item.title)}>
      <Image source={item.image} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <View style={styles.newsHeader}>
          <View style={[styles.tagContainer, { backgroundColor: theme.accent }]}>
            <ThemedText style={styles.tagText}>{item.tag}</ThemedText>
          </View>
          <ThemedText style={[styles.date, { color: theme.textSecondary }]}>{item.date}</ThemedText>
        </View>
        <ThemedText style={styles.title}>{item.title}</ThemedText>
        <ThemedText style={[styles.summary, { color: theme.textSecondary }]} numberOfLines={2}>
          {item.summary}
        </ThemedText>
      </View>
    </Pressable>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.welcomeTitle}>University News</ThemedText>
          <Pressable onPress={() => console.log('Filter pressed')}>
            <Ionicons name="filter" size={24} color={theme.text} />
          </Pressable>
        </View>

        <View style={styles.newsList}>
          {NEWS_ITEMS.map(renderNewsItem)}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  newsList: {
    gap: 16,
  },
  newsCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 16,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
  },
});