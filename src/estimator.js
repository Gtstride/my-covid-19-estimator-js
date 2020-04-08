/* eslint-disable max-len */
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

  // Challange II:
  const severeCasesByRequestedTimeForImpact = infectionsByRequestedTimeForImpact * 0.15;
  const severeCasesByRequestedTimeForSevereImpact = infectionsByRequestedTimeForSevereImpact * 0.15;
  const totalHospitalBedsAt95Percent = data.totalHospitalBeds * 0.95;
  const bedsAlreadyOccupied = totalHospitalBedsAt95Percent * 0.65;

  const availableBedsAfter65PercentOccupied = totalHospitalBedsAt95Percent - bedsAlreadyOccupied;
  const severeCasesByRequestedTimeForImpactAt35Percent = severeCasesByRequestedTimeForImpact * 0.35;

  const severeCasesByRequestedTimeForSevereImpactAt35Percent = severeCasesByRequestedTimeForSevereImpact * 0.35;
  const hospitalBedsByRequestedTimeForImpact = availableBedsAfter65PercentOccupied
    - severeCasesByRequestedTimeForImpactAt35Percent;
  const hospitalBedsByRequestedTimeForSevereImpact = availableBedsAfter65PercentOccupied
    - severeCasesByRequestedTimeForSevereImpactAt35Percent;

  return {
    data: input,
    impact: hospitalBedsByRequestedTimeForImpact,
    severeImpact: hospitalBedsByRequestedTimeForSevereImpact
  };
};

export default covid19ImpactEstimator;
