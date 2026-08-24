import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegionsScreen({ navigation }) {
  const regions = [
    { name: 'Kanto', gen: 'Geração I', pokemon: '1–151', color: '#E74C3C' },
    { name: 'Johto', gen: 'Geração II', pokemon: '152–251', color: '#3498DB' },
    { name: 'Hoenn', gen: 'Geração III', pokemon: '252–386', color: '#2ECC71' },
    { name: 'Sinnoh', gen: 'Geração IV', pokemon: '387–493', color: '#9B59B6' },
    { name: 'Unova', gen: 'Geração V', pokemon: '494–649', color: '#E67E22' },
    { name: 'Kalos', gen: 'Geração VI', pokemon: '650–721', color: '#1ABC9C' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Regiões</Text>
        <Text style={styles.subtitle}>Explore Pokémon por região</Text>

        {regions.map((region, index) => (
          <TouchableOpacity key={index} style={styles.regionCard} activeOpacity={0.85}>
            <View style={[styles.regionDot, { backgroundColor: region.color }]} />
            <View style={styles.regionInfo}>
              <Text style={styles.regionName}>{region.name}</Text>
              <Text style={styles.regionGen}>{region.gen} • {region.pokemon}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#131F2A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  regionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  regionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 14,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  regionGen: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
});
