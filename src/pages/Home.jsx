import {Box, Container} from "@mui/system"
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import { Grid } from "@mui/material";
import { Skeletons } from "../components/Skeletons";

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons()
    }, []);

    const getPokemons = () => {
        var endpoints = [];
        for (var i = 1; i<200; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
        
    };

    const pokemonFilter = (name) => {
        var filteredPokemons = [];
        if (name === "") {
          getPokemons();
        }
        for (var i in pokemons) {
          if (pokemons[i].data.name.includes(name)) {
            filteredPokemons.push(pokemons[i]);
          }
        }
    
        setPokemons(filteredPokemons);
      };
    
    return (
        <div>
        <NavBar pokemonFilter={pokemonFilter}/>
        <Container maxWidth="xg">
            <Grid container spacing={3}>
            {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <Box>
                    <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                </Box>
                </Grid>
                )))}
            </Grid>
        </Container>
        
        </div>
    )
}