/**

A class representing the D'Hondt method for calculating proportional representation in an election.

@constructor

@param {Object} votes - An object containing the number of votes for each party.

@param {number} seats - The total number of seats to be allocated.
*/
class Dhondt {
    constructor(votes, seats) {
      this.votes = votes;
      this.seats = seats;
    }
  
    /**
      
      Calculates the allocation of seats for each party using the D'Hondt method.
      
      @returns {Array} An array of objects containing the party name, number of seats allocated, and number of votes received.
      */
    calculate() {
      let results = [];
      let totalSeats = 0;
  
      for (let party in this.votes) {
        results.push({ party: party, seats: 0, votes: this.votes[party] });
      }
  
      while (totalSeats < this.seats) {
        let max = -1;
        let index = -1;
  
        for (let i = 0; i < results.length; i++) {
          let quotient = results[i].votes / (results[i].seats + 1);
          if (quotient > max) {
            max = quotient;
            index = i;
          }
        }
  
        results[index].seats += 1;
        totalSeats += 1;
      }
  
      return results;
    }
  }
  
  export default Dhondt;