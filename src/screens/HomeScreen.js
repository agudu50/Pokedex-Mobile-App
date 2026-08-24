import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import PokemonCard from '../components/PokemonCard';
import PokemonFilterHeader from '../components/PokemonFilterHeader';
import { useFavorites } from '../context/FavoritesContext';
import { getPokemonImage } from '../constants/pokemonAssets';

// Standard Kanto Pokemon types mapping for instant & accurate badge rendering
const KANTO_TYPE_MAP = {
  1: ['grass', 'poison'],      // Bulbasaur
  2: ['grass', 'poison'],      // Ivysaur
  3: ['grass', 'poison'],      // Venusaur
  4: ['fire'],                 // Charmander
  5: ['fire'],                 // Charmeleon
  6: ['fire', 'flying'],       // Charizard
  7: ['water'],                // Squirtle
  8: ['water'],                // Wartortle
  9: ['water'],                // Blastoise
  10: ['bug'],                 // Caterpie
  11: ['bug'],                 // Metapod
  12: ['bug', 'flying'],       // Butterfree
  13: ['bug', 'poison'],       // Weedle
  14: ['bug', 'poison'],       // Kakuna
  15: ['bug', 'poison'],       // Beedrill
  16: ['normal', 'flying'],    // Pidgey
  17: ['normal', 'flying'],    // Pidgeotto
  18: ['normal', 'flying'],    // Pidgeot
  19: ['normal'],              // Rattata
  20: ['normal'],              // Raticate
  21: ['normal', 'flying'],    // Spearow
  22: ['normal', 'flying'],    // Fearow
  23: ['poison'],              // Ekans
  24: ['poison'],              // Arbok
  25: ['electric'],            // Pikachu
  26: ['electric'],            // Raichu
  27: ['ground'],              // Sandshrew
  28: ['ground'],              // Sandslash
  29: ['poison'],              // Nidoran♀
  30: ['poison'],              // Nidorina
  31: ['poison', 'ground'],    // Nidoqueen
  32: ['poison'],              // Nidoran♂
  33: ['poison'],              // Nidorino
  34: ['poison', 'ground'],    // Nidoking
  35: ['fairy'],               // Clefairy
  36: ['fairy'],               // Clefable
  37: ['fire'],                // Vulpix
  38: ['fire'],                // Ninetales
  39: ['normal', 'fairy'],     // Jigglypuff
  40: ['normal', 'fairy'],     // Wigglytuff
  41: ['poison', 'flying'],    // Zubat
  42: ['poison', 'flying'],    // Golbat
  43: ['grass', 'poison'],     // Oddish
  44: ['grass', 'poison'],     // Gloom
  45: ['grass', 'poison'],     // Vileplume
  46: ['bug', 'grass'],        // Paras
  47: ['bug', 'grass'],        // Parasect
  48: ['bug', 'poison'],       // Venonat
  49: ['bug', 'poison'],       // Venomoth
  50: ['ground'],              // Diglett
  51: ['ground'],              // Dugtrio
  52: ['normal'],              // Meowth
  53: ['normal'],              // Persian
  54: ['water'],               // Psyduck
  55: ['water'],               // Golduck
  56: ['fighting'],            // Mankey
  57: ['fighting'],            // Primeape
  58: ['fire'],                // Growlithe
  59: ['fire'],                // Arcanine
  60: ['water'],               // Poliwag
  61: ['water'],               // Poliwhirl
  62: ['water', 'fighting'],   // Poliwrath
  63: ['psychic'],             // Abra
  64: ['psychic'],             // Kadabra
  65: ['psychic'],             // Alakazam
  66: ['fighting'],            // Machop
  67: ['fighting'],            // Machoke
  68: ['fighting'],            // Machamp
  69: ['grass', 'poison'],     // Bellsprout
  70: ['grass', 'poison'],     // Weepinbell
  71: ['grass', 'poison'],     // Victreebel
  72: ['water', 'poison'],     // Tentacool
  73: ['water', 'poison'],     // Tentacruel
  74: ['rock', 'ground'],      // Geodude
  75: ['rock', 'ground'],      // Graveler
  76: ['rock', 'ground'],      // Golem
  77: ['fire'],                // Ponyta
  78: ['fire'],                // Rapidash
  79: ['water', 'psychic'],    // Slowpoke
  80: ['water', 'psychic'],    // Slowbro
  81: ['electric', 'steel'],   // Magnemite
  82: ['electric', 'steel'],   // Magneton
  83: ['normal', 'flying'],    // Farfetch'd
  84: ['normal', 'flying'],    // Doduo
  85: ['normal', 'flying'],    // Dodrio
  86: ['water'],               // Seel
  87: ['water', 'ice'],        // Dewgong
  88: ['poison'],              // Grimer
  89: ['poison'],              // Muk
  90: ['water'],               // Shellder
  91: ['water', 'ice'],        // Cloyster
  92: ['ghost', 'poison'],     // Gastly
  93: ['ghost', 'poison'],     // Haunter
  94: ['ghost', 'poison'],     // Gengar
  95: ['rock', 'ground'],      // Onix
  96: ['psychic'],             // Drowzee
  97: ['psychic'],             // Hypno
  98: ['water'],               // Krabby
  99: ['water'],               // Kingler
  100: ['electric'],           // Voltorb
  101: ['electric'],           // Electrode
  102: ['grass', 'psychic'],   // Exeggcute
  103: ['grass', 'psychic'],   // Exeggutor
  104: ['ground'],             // Cubone
  105: ['ground'],             // Marowak
  106: ['fighting'],           // Hitmonlee
  107: ['fighting'],           // Hitmonchan
  108: ['normal'],             // Lickitung
  109: ['poison'],             // Koffing
  110: ['poison'],             // Weezing
  111: ['ground', 'rock'],     // Rhyhorn
  112: ['ground', 'rock'],     // Rhydon
  113: ['normal'],             // Chansey
  114: ['grass'],              // Tangela
  115: ['normal'],             // Kangaskhan
  116: ['water'],               // Horsea
  117: ['water'],               // Seadra
  118: ['water'],               // Goldeen
  119: ['water'],               // Seaking
  120: ['water'],               // Staryu
  121: ['water', 'psychic'],   // Starmie
  122: ['psychic', 'fairy'],   // Mr. Mime
  123: ['bug', 'flying'],      // Scyther
  124: ['ice', 'psychic'],     // Jynx
  125: ['electric'],           // Electabuzz
  126: ['fire'],               // Magmar
  127: ['bug'],                // Pinsir
  128: ['normal'],             // Tauros
  129: ['water'],              // Magikarp
  130: ['water', 'flying'],    // Gyarados
  131: ['water', 'ice'],       // Lapras
  132: ['normal'],             // Ditto
  133: ['normal'],             // Eevee
  134: ['water'],              // Vaporeon
  135: ['electric'],           // Jolteon
  136: ['fire'],               // Flareon
  137: ['normal'],             // Porygon
  138: ['rock', 'water'],      // Omanyte
  139: ['rock', 'water'],      // Omastar
  140: ['rock', 'water'],      // Kabuto
  141: ['rock', 'water'],      // Kabutops
  142: ['rock', 'flying'],     // Aerodactyl
  143: ['normal'],             // Snorlax
  144: ['ice', 'flying'],      // Articuno
  145: ['electric', 'flying'], // Zapdos
  146: ['fire', 'flying'],     // Moltres
  147: ['dragon'],             // Dratini
  148: ['dragon'],             // Dragonair
  149: ['dragon', 'flying'],   // Dragonite
  150: ['psychic'],            // Mewtwo
  151: ['psychic'],            // Mew
};

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('asc'); // 'asc' | 'desc' | 'name'

  const { isFavorite, toggleFavorite } = useFavorites();

  const fetchPokemonList = useCallback(async () => {
    try {
      setError(null);
      // Fetch the original 151 Kanto Pokemon from PokéAPI
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      if (!response.ok) {
        throw new Error(`Failed to load Pokemon: status ${response.status}`);
      }
      const data = await response.json();

      // Process items and extract ID and mapped types
      const formatted = data.results.map((item, index) => {
        const id = index + 1;
        const types = KANTO_TYPE_MAP[id] || ['normal'];
        const image = getPokemonImage(id, item.name);

        return {
          id,
          name: item.name,
          url: item.url,
          types,
          image,
        };
      });

      setPokemonList(formatted);
    } catch (err) {
      console.error('Error fetching Pokemon:', err);
      setError(err.message || 'Could not fetch Pokemon list. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPokemonList();
  };

  const handleToggleSort = () => {
    setSortBy((current) => {
      if (current === 'asc') return 'desc';
      if (current === 'desc') return 'name';
      return 'asc';
    });
  };

  // Filter and sort the pokemon list
  const filteredPokemon = useMemo(() => {
    let list = [...pokemonList];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          String(p.id).includes(q) ||
          `N°${String(p.id).padStart(3, '0')}`.toLowerCase().includes(q)
        );
      });
    }

    // Filter by type
    if (selectedType !== 'all') {
      list = list.filter((p) => p.types.includes(selectedType.toLowerCase()));
    }

    // Sort
    if (sortBy === 'asc') {
      list.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'desc') {
      list.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [pokemonList, searchQuery, selectedType, sortBy]);

  const renderPokemonCard = ({ item }) => {
    return (
      <PokemonCard
        number={item.id}
        name={item.name}
        image={item.image}
        types={item.types}
        isFavorite={isFavorite(item.id)}
        onToggleFavorite={() => toggleFavorite(item.id)}
        onPress={() => {
          navigation.navigate('PokemonDetails', {
            pokemonId: item.id,
            pokemonName: item.name,
            initialTypes: item.types,
            initialImage: item.image,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PokemonFilterHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        sortBy={sortBy}
        onToggleSort={handleToggleSort}
        onOpenDrawer={() => {
          if (navigation.openDrawer) {
            navigation.openDrawer();
          } else {
            navigation.getParent()?.openDrawer?.();
          }
        }}
      />

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1E6091" />
          <Text style={styles.loadingText}>Loading Pokédex...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPokemonList}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredPokemon}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderPokemonCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1E6091']} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nenhum Pokémon encontrado</Text>
              <Text style={styles.emptySubtitle}>Tente pesquisar com outro nome ou filtro</Text>
            </View>
          }
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
  listContent: {
    paddingVertical: 10,
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#E11D48',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#1E6091',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});
