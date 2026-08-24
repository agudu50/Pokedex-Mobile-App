import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpSupportScreen({ navigation }) {
  const faqs = [
    {
      q: 'Como adicionar um Pokémon aos favoritos?',
      a: 'Basta tocar no ícone de coração no canto superior direito do card do Pokémon ou na página de detalhes.',
    },
    {
      q: 'De onde vêm os dados dos Pokémon?',
      a: 'Os dados são obtidos diretamente dos endpoints REST da PokéAPI (https://pokeapi.co/).',
    },
    {
      q: 'Como filtrar Pokémon por tipo?',
      a: 'Toque no botão "Todos os tipos" ou deslize pelos botões de tipo na barra superior para filtrar instantaneamente.',
    },
    {
      q: 'Como ordenar a lista?',
      a: 'Toque no botão de ordenação para alternar entre Menor número, Maior número e Ordem alfabética.',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ajuda e Suporte</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.sectionHeader}>Perguntas Frequentes (FAQ)</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>❓ {faq.q}</Text>
            <Text style={styles.faqAnswer}>{faq.a}</Text>
          </View>
        ))}

        <View style={styles.contactCard}>
          <Ionicons name="mail-outline" size={28} color="#1E6091" style={{ marginBottom: 8 }} />
          <Text style={styles.contactTitle}>Precisa de mais ajuda?</Text>
          <Text style={styles.contactDesc}>
            Entre em contato com a equipe de suporte ou consulte a documentação da PokéAPI.
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL('https://pokeapi.co/docs/v2')}
          >
            <Text style={styles.contactBtnText}>Documentação da PokéAPI</Text>
            <Ionicons name="open-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#131F2A',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
  },
  contactCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  contactDesc: {
    fontSize: 13,
    color: '#3B82F6',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 18,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E6091',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
