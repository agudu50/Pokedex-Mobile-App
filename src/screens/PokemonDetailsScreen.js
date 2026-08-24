import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypeBadge from '../components/TypeBadge';
import {
  TYPE_CONFIG,
  formatPokemonNumber,
  capitalize,
  getPokemonImage,
} from '../constants/pokemonAssets';
import { useFavorites } from '../context/FavoritesContext';

export default function PokemonDetailsScreen({ route, navigation }) {
  const { pokemonId, pokemonName, initialTypes = [], initialImage } = route.params || {};

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(pokemonId);

  useEffect(() => {
    let isMounted = true;

    async function fetchPokemonDetails() {
      try {
        setLoading(true);
        setError(null);
        const idOrName = pokemonId || pokemonName;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
        if (!response.ok) {
          throw new Error(`Failed to load details: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setDetails(data);
        }
      } catch (err) {
        console.error('Error fetching Pokemon details:', err);
        if (isMounted) {
          setError(err.message || 'Unable to fetch Pokemon details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPokemonDetails();

    return () => {
      isMounted = false;
    };
  }, [pokemonId, pokemonName]);

  // Extract types from details or fallback to initial
  const types = details
    ? details.types.map((t) => t.type.name)
    : initialTypes.length > 0
    ? initialTypes
    : ['normal'];

  const primaryType = types[0] || 'normal';
  const typeConfig = TYPE_CONFIG[primaryType.toLowerCase()] || TYPE_CONFIG.normal;
  const imageSource = initialImage || getPokemonImage(pokemonId, pokemonName);

  // Conversions for PokeAPI:
  // height is in decimetres (0.1 m) -> divide by 10 to get meters
  // weight is in hectograms (0.1 kg) -> divide by 10 to get kg
  const heightMeters = details ? (details.height / 10).toFixed(1) : '--';
  const weightKg = details ? (details.weight / 10).toFixed(1) : '--';
  const abilities = details ? details.abilities.map((a) => capitalize(a.ability.name)).join(', ') : '--';

  const stats = details?.stats || [];

  const statNamesMap = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defesa',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Velocidade',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: typeConfig.bgTint }]}>
      {/* Navigation Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>{capitalize(pokemonName || details?.name || '')}</Text>
        <TouchableOpacity
          style={[styles.favoriteButton, favorited && styles.favoriteButtonActive]}
          onPress={() => toggleFavorite(pokemonId)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={22}
            color={favorited ? '#FF3B30' : '#475569'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Hero Section */}
        <View style={styles.heroSection}>
          {/* Background element circle */}
          <View
            style={[
              styles.imageCircleBg,
              { backgroundColor: typeConfig.containerColor },
            ]}
          >
            <View style={styles.imageInnerCircle} />
            <Image
              source={imageSource}
              style={styles.pokemonLargeImage}
              resizeMode="contain"
            />
          </View>

          {/* Number & Name */}
          <Text style={styles.pokemonNumberText}>
            {formatPokemonNumber(pokemonId || details?.id)}
          </Text>
          <Text style={styles.pokemonHeroName}>
            {capitalize(pokemonName || details?.name || '')}
          </Text>

          {/* Types Badges */}
          <View style={styles.typesContainer}>
            {types.map((type, index) => (
              <TypeBadge key={index} typeName={type} size="large" />
            ))}
          </View>
        </View>

        {/* Content Card */}
        <View style={styles.detailsCard}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={typeConfig.containerColor} />
              <Text style={styles.loadingText}>Buscando dados na PokéAPI...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : (
            <>
              {/* Dimensions Row: Height & Weight (Required by Task) */}
              <Text style={styles.sectionTitle}>Características</Text>
              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <View style={styles.metricIconBg}>
                    <Ionicons name="resize-outline" size={20} color="#1E293B" />
                  </View>
                  <Text style={styles.metricValue}>{heightMeters} m</Text>
                  <Text style={styles.metricLabel}>Altura</Text>
                </View>

                <View style={styles.metricDivider} />

                <View style={styles.metricItem}>
                  <View style={styles.metricIconBg}>
                    <Ionicons name="barbell-outline" size={20} color="#1E293B" />
                  </View>
                  <Text style={styles.metricValue}>{weightKg} kg</Text>
                  <Text style={styles.metricLabel}>Peso</Text>
                </View>

                <View style={styles.metricDivider} />

                <View style={styles.metricItem}>
                  <View style={styles.metricIconBg}>
                    <Ionicons name="sparkles-outline" size={20} color="#1E293B" />
                  </View>
                  <Text style={styles.metricValue}>{details?.base_experience || '--'} XP</Text>
                  <Text style={styles.metricLabel}>Exp. Base</Text>
                </View>
              </View>

              {/* Abilities */}
              <View style={styles.infoRowContainer}>
                <Text style={styles.infoRowLabel}>Habilidades:</Text>
                <Text style={styles.infoRowValue}>{abilities}</Text>
              </View>

              {/* Base Stats */}
              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Status Base</Text>
              <View style={styles.statsContainer}>
                {stats.map((statItem, idx) => {
                  const statName = statNamesMap[statItem.stat.name] || statItem.stat.name;
                  const statVal = statItem.base_stat;
                  const percentage = Math.min((statVal / 200) * 100, 100);

                  return (
                    <View key={idx} style={styles.statRow}>
                      <Text style={styles.statNameText}>{statName}</Text>
                      <Text style={styles.statValText}>{statVal}</Text>
                      <View style={styles.statBarTrack}>
                        <View
                          style={[
                            styles.statBarFill,
                            {
                              width: `${percentage}%`,
                              backgroundColor: typeConfig.containerColor,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  favoriteButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  favoriteButtonActive: {
    backgroundColor: '#FFE4E6',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  imageCircleBg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  imageInnerCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  pokemonLargeImage: {
    width: 160,
    height: 160,
    zIndex: 2,
  },
  pokemonNumberText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 2,
  },
  pokemonHeroName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#131F2A',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  loadingContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#E11D48',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricIconBg: {
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  metricDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E2E8F0',
  },
  infoRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoRowLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    width: 100,
  },
  infoRowValue: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
    fontWeight: '500',
  },
  statsContainer: {
    gap: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statNameText: {
    width: 80,
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  statValText: {
    width: 36,
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'right',
    marginRight: 12,
  },
  statBarTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
