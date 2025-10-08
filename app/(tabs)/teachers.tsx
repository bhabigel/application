import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useLanguage } from '../../hooks/useLanguage';
import { getSubjects, getTeachers, Teacher } from '../../services/api';

export default function TeachersScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { language } = useLanguage();
  
  // State management
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load subjects
  useEffect(() => {
    const loadSubjects = async () => {
      if (!language) {
        console.log('No language set, skipping subjects fetch');
        return;
      }
      
      try {
        console.log('Loading subjects for language:', language);
        const data = await getSubjects(language);
        console.log('Loaded subjects:', data);
        setSubjects(data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to load subjects';
        setError(errorMessage);
      }
    };
    
    loadSubjects();
  }, [language]);

  // Load teachers
  useEffect(() => {
    const loadTeachers = async () => {
      if (!language) {
        console.log('No language set, skipping teachers fetch');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('Loading teachers for language:', language);
        const data = await getTeachers(language);
        console.log('Loaded teachers:', data.length);
        
        data.sort((a, b) => a.name.localeCompare(b.name));
        setTeachers(data);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        setError(errorMessage.length > 300 ? 
          errorMessage.substring(0, 300) + '... (see console for full details)' : 
          errorMessage
        );
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, [language]);

  // Filter teachers based on search query and selected subjects
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      teacher.subjects.some(subject => 
        subject.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (selectedSubjects.length === 0) {
      return matchesSearch;
    }

    const matchesSubjects = teacher.subjects.some(subject => 
      selectedSubjects.includes(subject)
    );

    return matchesSearch && matchesSubjects;
  });

  const renderTeacherList = () => (
    <ScrollView contentContainerStyle={styles.content}>
      {filteredTeachers.map(teacher => renderTeacherCard(teacher))}
    </ScrollView>
  );

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;

    // Ha már teljes URL
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Normalizálás – ha hiányzik az első '/', tedd oda
    const normalizedPath = imagePath.startsWith('/')
      ? imagePath
      : `/${imagePath}`;

    // Az API útvonal szerint a képek az /uploads/ alatt vannak
    return `https://api.cassini-org.info/uploads${normalizedPath}`;
  };

  const renderTeacherCard = (teacher: Teacher) => (
    <TouchableOpacity
      key={teacher.id}
      style={[styles.teacherCard, { backgroundColor: theme.card }]}
      onPress={() => setSelectedTeacher(teacher)}
    >
      <View style={styles.cardContent}>
        <Image 
          source={
            getImageUrl(teacher.image) 
              ? { uri: getImageUrl(teacher.image) as string }
              : undefined
          }
          style={[
            styles.teacherImage,
            !getImageUrl(teacher.image) && { backgroundColor: theme.card }
          ]}
          resizeMode="cover"
          onLoadStart={() => console.log('Started loading image for:', teacher.name)}
          onLoadEnd={() => console.log('Finished loading image for:', teacher.name)}
          onError={(error) => {
            console.error(`Failed to load image for ${teacher.name}:`, error.nativeEvent.error);
            console.error('Image URL was:', getImageUrl(teacher.image));
          }}
        />
        <View style={styles.teacherInfo}>
          <ThemedText style={styles.name}>{teacher.name}</ThemedText>
          <ThemedText style={styles.description} numberOfLines={2}>
            {teacher.description.replace(/<[^>]*>/g, '')}
          </ThemedText>
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

  const renderTeacherDetails = () => {
    if (!selectedTeacher) return null;

    const imageUrl = getImageUrl(selectedTeacher.image);
    console.log('Loading detail image:', imageUrl);

    return (
      <ScrollView contentContainerStyle={styles.detailsContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedTeacher(null)}
        >
          <ThemedText style={styles.backButtonText}>← Back to list</ThemedText>
        </TouchableOpacity>
        <View style={[styles.detailsCard, { backgroundColor: theme.card }]}>
          <Image 
            source={
              imageUrl 
                ? { uri: imageUrl } 
                : undefined
            }
            style={[
              styles.detailsImage,
              !imageUrl && { backgroundColor: theme.card }
            ]}
            resizeMode="cover"
            onError={(error) => {
              console.error(`Failed to load detail image for ${selectedTeacher.name}:`, error.nativeEvent.error);
              console.error('Detail image URL was:', imageUrl);
            }}
          />
          <ThemedText style={styles.detailsName}>{selectedTeacher.name}</ThemedText>
          <ThemedText style={styles.detailsDescription}>
            {selectedTeacher.description.replace(/<[^>]*>/g, '')}
          </ThemedText>
          <View style={styles.detailsSubjects}>
            {selectedTeacher.subjects.map((subject, index) => (
              <View key={index} style={[styles.subjectTag, { backgroundColor: theme.primary }]}>
                <ThemedText style={styles.subjectText}>{subject}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

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

  const renderSubjectFilters = () => (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.subjectsContainer}
      contentContainerStyle={styles.subjectsContent}
    >
      {subjects.map((subject, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.subjectButton,
            {
              backgroundColor: selectedSubjects.includes(subject) 
                ? theme.primary 
                : theme.card
            }
          ]}
          onPress={() => {
            if (selectedSubjects.includes(subject)) {
              // Ha már ki van választva, töröljük a kijelölést
              setSelectedSubjects([]);
            } else {
              // Ha új tantárgyat választunk, csak az lesz kiválasztva
              setSelectedSubjects([subject]);
            }
          }}
        >
          <ThemedText style={[
            styles.subjectButtonText,
            { color: selectedSubjects.includes(subject) ? '#FFFFFF' : theme.text }
          ]}>
            {subject}
          </ThemedText>
        </TouchableOpacity>
      ))}
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
          <View style={styles.filterContainer}>
            <TextInput
              style={[styles.searchInput, { 
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border
              }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search teachers or subjects..."
              placeholderTextColor={theme.textSecondary}
            />
            {renderSubjectFilters()}
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
  filterContainer: {
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
    marginBottom: 12,
  },
  subjectsContainer: {
    maxHeight: 40,
  },
  subjectsContent: {
    paddingHorizontal: 4,
  },
  subjectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  subjectButtonText: {
    fontSize: 14,
    fontWeight: '500',
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
  subjectsRow: {
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