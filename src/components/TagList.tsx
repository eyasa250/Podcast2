import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/core/theme';

type TagListProps = {
  tags: string[];
  onTagPress?: (tag: string) => void;
};

export const TagList = ({ tags, onTagPress }: TagListProps) => {
  return (
    <View style={styles.container}>
      {tags.map((tag) => (
        <TouchableOpacity
          key={tag}
          style={styles.tag}
          onPress={() => onTagPress?.(tag)}
        >
          <Text style={styles.tagText}>#{tag}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: colors.primary || '#eee',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
