import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

import {
    getSeatsById,
  } from "../lib/electionAreas";

const CitySelect = ({
  city,
  electionEnvironments,
  getIdByAreaName,
  setCity,
  setSeats,
  setResults,
  setLoading,
  fetchCityData,
}) => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
    <FormControl fullWidth>
      <InputLabel>Seçim Bölgesi</InputLabel>
      <Select
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setSeats(getSeatsById(e.target.value));
          setLoading(true);
          setResults([]);
          fetchCityData(e.target.value);
          setLoading(false);
        }}
      >
        {Object.keys(electionEnvironments).map((cityName) => (
          <MenuItem
            key={cityName}
            value={getIdByAreaName(cityName)}
          >
            {cityName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Grid>
    </Grid>
  );
};

export default CitySelect;
