import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ResultsTable = ({ results, candidates }) => {
  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parti</TableCell>
              <TableCell align="right">Sandalyeler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results
              .flatMap((result) => {
                const partyCandidates = candidates.filter(
                  (candidate) =>
                    candidate.party_name === result.party &&
                    candidate.candidate_rank <= result.seats
                );

                if (partyCandidates.length < result.seats) {
                  const numUnknownCandidates =
                    result.seats - partyCandidates.length;
                  const unknownCandidates = Array.from(
                    { length: numUnknownCandidates },
                    (_, i) => ({
                      party_name: result.party,
                      candidate_name: `Bilinmeyen Aday ${
                        partyCandidates.length + i + 1
                      }`,
                      candidate_rank: partyCandidates.length + i + 1,
                    })
                  );

                  return partyCandidates.concat(unknownCandidates);
                } else {
                  return partyCandidates;
                }
              })
              .map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {candidate.party_name}
                  </TableCell>
                  <TableCell>
                    {candidate.candidate_name} {candidate.surname}
                  </TableCell>
                  <TableCell align="right">
                    {candidate.candidate_rank}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResultsTable;
