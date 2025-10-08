import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useLanguage } from '../../hooks/useLanguage';
import { getPresenters, Presenter } from '../../services/api';
import { getImageUrl } from '../../services/images';

export default function LecturesScreen() {
  const [presenters, setPresenters] = useState<Presenter[]>([]);
  const [selectedPresenter, setSelectedPresenter] = useState<Presenter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    const fetchPresenters = async () => {
      setIsLoading(true);
      try {
        const data = await getPresenters(language);
        setPresenters(data);
      } catch (error) {
        console.error('Failed to fetch presenters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresenters();
  }, [language]);

  const renderPresenter = ({ item }: { item: Presenter }) => {
    const isSelected = selectedPresenter?.id === item.id;

    return (
      <Pressable 
        style={[styles.presenterCard, { backgroundColor: theme.card }]}
        onPress={() => setSelectedPresenter(isSelected ? null : item)}>
        <View style={[
          styles.imageContainer, 
          { backgroundColor: theme.cardBackground }
        ]}>
          <Image
            source={{ uri: item.image ? getImageUrl(item.image) : undefined }}
            defaultSource={require('../../assets/images/partial-react-logo.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          <View style={styles.themeContainer}>
            {item.themes.map((theme, index) => (
              <View key={index} style={[
                styles.themeTag, 
                { backgroundColor: colorScheme === 'dark' ? '#1A237E' : '#e1f5fe' }
              ]}>
                <ThemedText 
                  style={[
                    styles.themeText, 
                    { color: colorScheme === 'dark' ? '#E1F5FE' : '#0288d1' }
                  ]} 
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {theme}
                </ThemedText>
              </View>
            ))}
          </View>
          {isSelected && (
            <View style={styles.descriptionContainer}>
              <ThemedText 
                style={styles.description}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {item.description.replace(/<\/?p>/g, '')}
              </ThemedText>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
        <ThemedText style={styles.loadingText}>Betöltés...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={presenters}
        renderItem={renderPresenter}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  presenterCard: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'white',
    padding: 12,
    alignItems: 'center',
    maxWidth: '45%',
    minHeight: 280,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  themeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  themeTag: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '45%',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  themeText: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
});