import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useLanguage } from '../../hooks/useLanguage';
import { getTeachers, Teacher } from '../../services/api';

export default function TeachersScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTeachers(language);
        // Sort teachers by name
        data.sort((a, b) => a.name.localeCompare(b.name));
        setTeachers(data);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch teachers');
      } finally {
        setLoading(false);
      }
    };

    if (language) {
      fetchTeachers();
    }
  }, [language]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          teacher.subjects.some(subject => 
                            subject.toLowerCase().includes(searchQuery.toLowerCase())
                          );
      return matchesSearch;
    });
  }, [teachers, searchQuery]);

  const renderTeacherList = () => (
    <ScrollView contentContainerStyle={styles.content}>
      {filteredTeachers.map(teacher => renderTeacherCard(teacher))}
    </ScrollView>
  );

  const renderTeacherCard = (teacher: Teacher) => (
    <TouchableOpacity
      key={teacher.id}
      style={[styles.teacherCard, { backgroundColor: theme.card }]}
      onPress={() => setSelectedTeacher(teacher)}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: teacher.image }} style={styles.teacherImage} />
        <View style={styles.teacherInfo}>
          <ThemedText style={styles.name}>{teacher.name}</ThemedText>
          <ThemedText style={styles.description} numberOfLines={2}>{teacher.description}</ThemedText>
          <View style={styles.subjectsContainer}>
            {teacher.subjects.map((subject, index) => (
              <View key={index} style={[styles.subjectTag, { backgroundColor: theme.primary }]}>
                <ThemedText style={styles.subjectText}>{subject}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTeacherDetails = () => (
    <ScrollView contentContainerStyle={styles.detailsContent}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedTeacher(null)}
      >
        <ThemedText style={styles.backButtonText}>← Back to list</ThemedText>
      </TouchableOpacity>
      <View style={[styles.detailsCard, { backgroundColor: theme.card }]}>
        <Image source={{ uri: selectedTeacher?.image }} style={styles.detailsImage} />
        <ThemedText style={styles.detailsName}>{selectedTeacher?.name}</ThemedText>
        <ThemedText style={styles.detailsDescription}>{selectedTeacher?.description}</ThemedText>
        <View style={styles.detailsSubjects}>
          {selectedTeacher?.subjects.map((subject, index) => (
            <View key={index} style={[styles.subjectTag, { backgroundColor: theme.primary }]}>
              <ThemedText style={styles.subjectText}>{subject}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  if (loading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center' }]}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      {selectedTeacher ? (
        renderTeacherDetails()
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.searchInput, { 
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border
              }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search teachers or subjects..."
              placeholderTextColor={theme.tabIconDefault}
            />
          </View>
          {renderTeacherList()}
        </>
      )}
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
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  teacherCard: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teacherImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  teacherInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  subjectTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  subjectText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginHorizontal: 20,
  },
  detailsContent: {
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  detailsCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  detailsImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  detailsName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  detailsDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  detailsSubjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
});