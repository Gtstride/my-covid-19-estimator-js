const input = {
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const covid19ImpactEstimator = (data) => {
// Challange 1:
  const currentlyInfected = data.reportedCases * 10;
  const severeImpact = data.reportedCases * 50;
  const infectionsByRequestedTimeForImpact = currentlyInfected * 512;
  const infectionsByRequestedTimeForSevereImpact = severeImpact * 512;

  return {
    data: input,
    impact: infectionsByRequestedTimeForImpact,
    severeImpact: infectionsByRequestedTimeForSevereImpact
  };
};

export default covid19ImpactEstimator;
