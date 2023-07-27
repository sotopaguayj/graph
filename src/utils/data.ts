// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

export const pokemonName = async () => {
  const petit = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  const json = await petit.json();

  const pokemons = json.results.map((pokemon, i: number) => ({
    id: i,
    label: pokemon.name
  }))
  return pokemons;
}

export const pokemonImage = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await response.json();

    const pokemons = await Promise.all(
      data.results.map(async (el, i) => {
        const pet = await fetch(el.url);
        const json = await pet.json();
        const img = json.sprites.front_default;
        return { id: i, img: img };
      })
    );
    return pokemons;
  } catch (error) {
    console.error('Error here:', error);
    return [];
  }
};

