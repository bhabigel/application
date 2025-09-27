import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';

const PROFILE_DATA = {
  name: 'Name Surname',
  avatar: 'https://i.pravatar.cc/150',
};

const MENU_ITEMS = [
  { icon: 'settings-outline', title: 'Settings' },
  { icon: 'notifications-outline', title: 'Notifications' },
  { icon: 'book-outline', title: 'My Courses' },
  { icon: 'help-circle-outline', title: 'Support' },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderMenuItem = (icon: string, title: string) => (
    <Pressable
      key={title}
      style={[styles.menuItem, { backgroundColor: theme.card }]}
      onPress={() => console.log(`Pressed ${title}`)}>
      <Ionicons name={icon as any} size={24} color={theme.text} style={styles.menuIcon} />
      <ThemedText style={styles.menuItemText}>{title}</ThemedText>
    </Pressable>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.profileCard, { backgroundColor: theme.card }]}>
          <Image
            source={{ uri: PROFILE_DATA.avatar }}
            style={styles.profileImage}
          />
          <ThemedText style={styles.name}>{PROFILE_DATA.name}</ThemedText>
        </View>

        <View style={styles.menuSection}>
          {MENU_ITEMS.map(item => renderMenuItem(item.icon, item.title))}
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
    gap: 16,
  },
  profileCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  menuSection: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
});