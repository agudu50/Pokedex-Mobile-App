import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="information-circle" size={48} color="#1E6091" />
          </View>
          <Text style={styles.title}>Pokédex Kanto</Text>
          <Text style={styles.subtitle}>DCIT 324 Mobile App Assignment</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre a Aplicação</Text>
          <Text style={styles.cardText}>
            Esta aplicação foi desenvolvida em React Native e Expo para demonstrar o uso de navegação
            em camadas (Stack, Bottom Tabs e Drawer), consumo da PokéAPI RESTful em tempo real, e
            gerenciamento de estados com design responsivo.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tecnologias Utilizadas</Text>
          <View style={styles.techRow}>
            <Ionicons name="logo-react" size={20} color="#61DAFB" />
            <Text style={styles.techText}>React Native & React 19</Text>
          </View>
          <View style={styles.techRow}>
            <Ionicons name="phone-portrait-outline" size={20} color="#000020" />
            <Text style={styles.techText}>Expo SDK 54</Text>
          </View>
          <View style={styles.techRow}>
            <Ionicons name="compass-outline" size={20} color="#E11D48" />
            <Text style={styles.techText}>React Navigation (Stack, Tabs & Drawer)</Text>
          </View>
          <View style={styles.techRow}>
            <Ionicons name="cloud-outline" size={20} color="#10B981" />
            <Text style={styles.techText}>PokéAPI (https://pokeapi.co/)</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recursos Implementados</Text>
          <Text style={styles.bulletPoint}>✓ Listagem dinâmica de Pokémon com PokeAPI</Text>
          <Text style={styles.bulletPoint}>✓ Componente de Card Reutilizável com props</Text>
          <Text style={styles.bulletPoint}>✓ Favoritos interativos com alternância de estado</Text>
          <Text style={styles.bulletPoint}>✓ Tela de detalhes com tipo, altura, peso e status</Text>
          <Text style={styles.bulletPoint}>✓ Bottom Tabs (Início e Sobre)</Text>
          <Text style={styles.bulletPoint}>✓ Drawer Menu (Configurações, Suporte e Sair)</Text>
        </View>

        <TouchableOpacity
          style={styles.apiButton}
          onPress={() => Linking.openURL('https://pokeapi.co/')}
          activeOpacity={0.8}
        >
          <Text style={styles.apiButtonText}>Visitar PokéAPI</Text>
          <Ionicons name="open-outline" size={18} color="#FFFFFF" />
        </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#131F2A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    gap: 10,
  },
  techText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 24,
    color: '#475569',
  },
  apiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E6091',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 8,
  },
  apiButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
