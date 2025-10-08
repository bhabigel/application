import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { BlogPost } from '../../services/api';
import { getBlogPosts } from '../../services/api';
import { getImageUrl } from '../../services/images';

const Events = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Események és Hírek</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.card}>
            <Image
              source={{ uri: post.image ? getImageUrl(post.image) : undefined }}
              defaultSource={require('../../assets/images/partial-react-logo.png')}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <Text style={styles.tag}>{post.tag}</Text>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.date}>{new Date(post.date).toLocaleDateString('hu-HU')}</Text>
              <Text style={styles.summary} numberOfLines={3}>{post.summary}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 16,
    width: 300,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  tag: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  date: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default Events;
