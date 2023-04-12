import React from "react";
import { Grid, TextField, Button } from "@mui/material";

const PartyVotes = ({ parties, handleVoteChange, handleAddParty }) => {
  return (
    <>
      {parties.map((party, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <TextField
            label={`${party} Oy Sayısı`}
            type="number"
            onChange={(e) => handleVoteChange(party, e.target.value)}
            fullWidth
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Grid container justifyContent="left">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddParty}
            >
              Parti Ekle
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PartyVotes;
