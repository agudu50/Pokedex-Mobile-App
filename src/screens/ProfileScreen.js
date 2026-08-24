import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color="#1E6091" />
          </View>
          <Text style={styles.userName}>Treinador Pokémon</Text>
          <Text style={styles.userEmail}>treinador@pokedex.com</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={22} color="#1E6091" />
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="trophy-outline" size={22} color="#1E6091" />
            <Text style={styles.menuText}>Conquistas</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="stats-chart-outline" size={22} color="#1E6091" />
            <Text style={styles.menuText}>Estatísticas</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Ionicons name="settings-outline" size={22} color="#1E6091" />
            <Text style={styles.menuText}>Configurações</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#131F2A',
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 14,
  },
});
