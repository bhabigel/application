import { Image, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';

interface Teacher {
  id: string;
  name: string;
  imageUrl: string;
}

const SAMPLE_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Mary',
    imageUrl: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'John',
    imageUrl: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Jane',
    imageUrl: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'Steve',
    imageUrl: 'https://i.pravatar.cc/150?img=4'
  }
];

export default function TeachersScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderTeacherGrid = () => {
    const rows = [];
    for (let i = 0; i < SAMPLE_TEACHERS.length; i += 2) {
      const row = (
        <View key={i} style={styles.row}>
          {renderTeacherCard(SAMPLE_TEACHERS[i])}
          {i + 1 < SAMPLE_TEACHERS.length && renderTeacherCard(SAMPLE_TEACHERS[i + 1])}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  const renderTeacherCard = (teacher: Teacher) => (
    <View style={[styles.teacherCard, { backgroundColor: theme.card }]}>
      <Image source={{ uri: teacher.imageUrl }} style={styles.teacherImage} />
      <ThemedText style={styles.name}>{teacher.name}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {renderTeacherGrid()}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  teacherCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  teacherImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});