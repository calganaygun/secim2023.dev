import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PreviousResults = ({ previousResults }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="previous-results-content"
      >
        <Typography>2018 Genel Seçim Sonuçları</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {previousResults ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Parti</TableCell>
                  <TableCell align="right">Oy Oranı (%)</TableCell>
                  <TableCell align="right">Oy Sayısı</TableCell>
                  <TableCell align="right">Vekil Sayısı</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previousResults.parties
                  .sort((a, b) => b.votes - a.votes)
                  .map((party, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {party.name}
                      </TableCell>
                      <TableCell align="right">
                        %
                        {(
                          (party.votes / previousResults.total_votes) *
                          100
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{party.votes}</TableCell>
                      <TableCell align="right">{party.candidates}</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell component="th" scope="row" fontWeight="bold">
                    Toplam Oy Sayısı
                  </TableCell>
                  <TableCell />
                  <TableCell align="right" fontWeight="bold">
                    {previousResults.total_votes}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>
            27. Dönem Genel Seçim sonuçlarını getirmek için şehir seçin...
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default PreviousResults;
