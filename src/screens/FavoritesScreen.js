import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { capitalize, formatPokemonNumber, getPokemonImage, TYPE_CONFIG } from '../constants/pokemonAssets';
import TypeBadge from '../components/TypeBadge';

// Kanto type map (subset for favorites display)
const KANTO_TYPE_MAP = {
  1: ['grass', 'poison'], 2: ['grass', 'poison'], 3: ['grass', 'poison'],
  4: ['fire'], 5: ['fire'], 6: ['fire', 'flying'],
  7: ['water'], 8: ['water'], 9: ['water'],
  10: ['bug'], 11: ['bug'], 12: ['bug', 'flying'],
  13: ['bug', 'poison'], 14: ['bug', 'poison'], 15: ['bug', 'poison'],
  16: ['normal', 'flying'], 17: ['normal', 'flying'], 18: ['normal', 'flying'],
  19: ['normal'], 20: ['normal'], 21: ['normal', 'flying'], 22: ['normal', 'flying'],
  23: ['poison'], 24: ['poison'], 25: ['electric'], 26: ['electric'],
  27: ['ground'], 28: ['ground'], 29: ['poison'], 30: ['poison'],
  31: ['poison', 'ground'], 32: ['poison'], 33: ['poison'], 34: ['poison', 'ground'],
  35: ['fairy'], 36: ['fairy'], 37: ['fire'], 38: ['fire'],
  39: ['normal', 'fairy'], 40: ['normal', 'fairy'],
  41: ['poison', 'flying'], 42: ['poison', 'flying'],
  43: ['grass', 'poison'], 44: ['grass', 'poison'], 45: ['grass', 'poison'],
  46: ['bug', 'grass'], 47: ['bug', 'grass'],
  48: ['bug', 'poison'], 49: ['bug', 'poison'],
  50: ['ground'], 51: ['ground'], 52: ['normal'], 53: ['normal'],
  54: ['water'], 55: ['water'], 56: ['fighting'], 57: ['fighting'],
  58: ['fire'], 59: ['fire'], 60: ['water'], 61: ['water'],
  62: ['water', 'fighting'], 63: ['psychic'], 64: ['psychic'], 65: ['psychic'],
  66: ['fighting'], 67: ['fighting'], 68: ['fighting'],
  69: ['grass', 'poison'], 70: ['grass', 'poison'], 71: ['grass', 'poison'],
  72: ['water', 'poison'], 73: ['water', 'poison'],
  74: ['rock', 'ground'], 75: ['rock', 'ground'], 76: ['rock', 'ground'],
  77: ['fire'], 78: ['fire'],
  79: ['water', 'psychic'], 80: ['water', 'psychic'],
  81: ['electric', 'steel'], 82: ['electric', 'steel'],
  83: ['normal', 'flying'], 84: ['normal', 'flying'], 85: ['normal', 'flying'],
  86: ['water'], 87: ['water', 'ice'],
  88: ['poison'], 89: ['poison'],
  90: ['water'], 91: ['water', 'ice'],
  92: ['ghost', 'poison'], 93: ['ghost', 'poison'], 94: ['ghost', 'poison'],
  95: ['rock', 'ground'], 96: ['psychic'], 97: ['psychic'],
  98: ['water'], 99: ['water'], 100: ['electric'], 101: ['electric'],
  102: ['grass', 'psychic'], 103: ['grass', 'psychic'],
  104: ['ground'], 105: ['ground'], 106: ['fighting'], 107: ['fighting'],
  108: ['normal'], 109: ['poison'], 110: ['poison'],
  111: ['ground', 'rock'], 112: ['ground', 'rock'], 113: ['normal'],
  114: ['grass'], 115: ['normal'],
  116: ['water'], 117: ['water'], 118: ['water'], 119: ['water'],
  120: ['water'], 121: ['water', 'psychic'],
  122: ['psychic', 'fairy'], 123: ['bug', 'flying'],
  124: ['ice', 'psychic'], 125: ['electric'], 126: ['fire'],
  127: ['bug'], 128: ['normal'], 129: ['water'], 130: ['water', 'flying'],
  131: ['water', 'ice'], 132: ['normal'], 133: ['normal'],
  134: ['water'], 135: ['electric'], 136: ['fire'], 137: ['normal'],
  138: ['rock', 'water'], 139: ['rock', 'water'],
  140: ['rock', 'water'], 141: ['rock', 'water'],
  142: ['rock', 'flying'], 143: ['normal'],
  144: ['ice', 'flying'], 145: ['electric', 'flying'], 146: ['fire', 'flying'],
  147: ['dragon'], 148: ['dragon'], 149: ['dragon', 'flying'],
  150: ['psychic'], 151: ['psychic'],
};

// Hardcoded names for Kanto pokemon
const KANTO_NAMES = [
  '', 'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard',
  'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree',
  'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot',
  'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok',
  'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran-f', 'nidorina',
  'nidoqueen', 'nidoran-m', 'nidorino', 'nidoking', 'clefairy', 'clefable',
  'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat',
  'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth',
  'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck',
  'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl',
  'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp',
  'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel',
  'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro',
  'magnemite', 'magneton', 'farfetchd', 'doduo', 'dodrio', 'seel', 'dewgong',
  'grimer', 'muk', 'shellder', 'cloyster', 'gastly', 'haunter', 'gengar',
  'onix', 'drowzee', 'hypno', 'krabby', 'kingler', 'voltorb', 'electrode',
  'exeggcute', 'exeggutor', 'cubone', 'marowak', 'hitmonlee', 'hitmonchan',
  'lickitung', 'koffing', 'weezing', 'rhyhorn', 'rhydon', 'chansey',
  'tangela', 'kangaskhan', 'horsea', 'seadra', 'goldeen', 'seaking',
  'staryu', 'starmie', 'mr-mime', 'scyther', 'jynx', 'electabuzz', 'magmar',
  'pinsir', 'tauros', 'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee',
  'vaporeon', 'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar',
  'kabuto', 'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos',
  'moltres', 'dratini', 'dragonair', 'dragonite', 'mewtwo', 'mew',
];

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFavorite } = useFavorites();

  // Build list of favorited pokemon
  const favoritedPokemon = Object.keys(favorites)
    .filter((id) => favorites[id])
    .map((id) => {
      const numId = parseInt(id, 10);
      const name = KANTO_NAMES[numId] || `pokemon-${numId}`;
      return {
        id: numId,
        name,
        types: KANTO_TYPE_MAP[numId] || ['normal'],
        image: getPokemonImage(numId, name),
      };
    })
    .sort((a, b) => a.id - b.id);

  const renderFavItem = ({ item }) => {
    const primaryType = item.types[0] || 'normal';
    const typeConfig = TYPE_CONFIG[primaryType] || TYPE_CONFIG.normal;

    return (
      <TouchableOpacity
        style={styles.favCard}
        activeOpacity={0.85}
        onPress={() => {
          navigation.navigate('PokemonDetails', {
            pokemonId: item.id,
            pokemonName: item.name,
            initialTypes: item.types,
            initialImage: item.image,
          });
        }}
      >
        <View style={[styles.favImageContainer, { backgroundColor: typeConfig.containerColor }]}>
          <Image source={item.image} style={styles.favImage} resizeMode="contain" />
        </View>
        <View style={styles.favInfo}>
          <Text style={styles.favNumber}>{formatPokemonNumber(item.id)}</Text>
          <Text style={styles.favName}>{capitalize(item.name)}</Text>
          <View style={styles.favTypes}>
            {item.types.map((type, idx) => (
              <TypeBadge key={idx} typeName={type} size="small" />
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="heart" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.count}>{favoritedPokemon.length} Pokémon</Text>
      </View>

      {favoritedPokemon.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
          <Text style={styles.emptySubtitle}>
            Toque no ícone de coração em qualquer Pokémon para adicioná-lo aqui
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritedPokemon}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderFavItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#131F2A',
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  favCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  favImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  favImage: {
    width: 48,
    height: 48,
  },
  favInfo: {
    flex: 1,
    marginLeft: 12,
  },
  favNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  favName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  favTypes: {
    flexDirection: 'row',
  },
  removeBtn: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});
