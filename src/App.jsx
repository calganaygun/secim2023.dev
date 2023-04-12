import React, { useState, useEffect } from "react";
import axios from "axios";
import Dhondt from "./lib/dhondt";

import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Backdrop,
  Box,
} from "@mui/material";

import { electionAreasToSeats, getIdByAreaName } from "./lib/electionAreas";
import { getPreviousResultsByAreaId } from "./lib/previousElections";

import CitySelect from "./components/CitySelect";
import PartyVotes from "./components/PartyVotes";
import ResultsTable from "./components/ResultsTable";
import PreviousResultsTable from "./components/PreviousResultsTable";

const App = () => {
  const [votes, setVotes] = useState({});
  const [seats, setSeats] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [parties, setParties] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [previousResults, setPreviousResults] = useState(null);

  const fetchCityData = async (cityId) => {
    try {
      const response = await axios.get(`/api/secim/28/sehir/${cityId}`);
      const data = response.data;

      // Extract unique party names
      const uniqueParties = [...new Set(data.map((item) => item.party_name))];

      // Create an object with party names as keys and their vote counts initialized to 0
      const partyVotes = uniqueParties.reduce((obj, party) => {
        obj[party] = 0;
        return obj;
      }, {});

      setParties(uniqueParties);
      setCandidates(data);
      setVotes(partyVotes);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const handleVoteChange = (party, value) => {
    setVotes({
      ...votes,
      [party]: parseInt(value),
    });
  };

  const calculateSeats = () => {
    const dhondt = new Dhondt(votes, seats);
    const calculatedResults = dhondt.calculate();
    setResults(calculatedResults);
  };

  const handleAddParty = () => {
    setParties([...parties, `Parti ${parties.length + 1}`]);
  };

  useEffect(() => {
    if (city) {
      const results = getPreviousResultsByAreaId(city);
      setPreviousResults(results);
    }
  }, [city]);

  return (
    <Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom align="center">
          Seçim 2023 D'Hondt Hesap Makinesi
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CitySelect
            city={city}
            electionEnvironments={electionAreasToSeats}
            getIdByAreaName={getIdByAreaName}
            setCity={setCity}
            setSeats={setSeats}
            setResults={setResults}
            setLoading={setLoading}
            fetchCityData={fetchCityData}
          />
        </Grid>

        <PartyVotes
          parties={parties}
          handleVoteChange={handleVoteChange}
          handleAddParty={handleAddParty}
        />
        <Grid item xs={12}>
          <PreviousResultsTable previousResults={previousResults} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Sandalye Sayısı"
            type="number"
            onChange={(e) => setSeats(parseInt(e.target.value))}
            value={seats}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={calculateSeats}>
            Vekilleri Hesapla
          </Button>
        </Grid>
      </Grid>
      <ResultsTable results={results} candidates={candidates} />
      <Box mt={4} mb={4}>
        <Typography variant="body2" gutterBottom align="center">
          Developed by <a href="https://calgan.dev/tw">@calganaygun</a>. Source
          code is available on{" "}
          <a href="https://github.com/calganaygun/secim2023.dev">GitHub</a>.
        </Typography>
      </Box>
    </Container>
  );
};

export default App;
