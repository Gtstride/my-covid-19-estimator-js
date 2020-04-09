const calculatePeriod = (data) => {
  if (data.periodType === 'weeks') {
    return 2 ** Math.floor((data.timeToElapse * 7) / 3);
  }
  if (data.periodType === 'months') {
    return 2 ** Math.floor((data.timeToElapse * 30) / 3);
  }

  return 2 ** Math.floor(data.timeToElapse);
};

const getDays = (data) => {
  if (data.periodType === 'weeks') {
    return 7 * data.timeToElapse;
  }
  if (data.periodType === 'months') {
    return 30 * data.timeToElapse;
  }

  return 1 * data.timeToElapse;
};

const currentInfections = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * calculatePeriod(data);
  const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
  const compute = (35 / 100) * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = compute - severeCasesByRequestedTime;
  const casesForICUByRequestedTime = (5 / 100) * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = (2 / 100) * infectionsByRequestedTime;
  const result = data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
  const dollarsInFlight = infectionsByRequestedTime * result * getDays(data);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};
const projectedInfections = (data) => {
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * calculatePeriod(data);
  const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
  const compute = (35 / 100) * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = compute - severeCasesByRequestedTime;
  const casesForICUByRequestedTime = (5 / 100) * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = (2 / 100) * infectionsByRequestedTime;
  const result = data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
  const dollarsInFlight = infectionsByRequestedTime * result * getDays(data);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: currentInfections(data),
  severeImpact: projectedInfections(data)
});

export default covid19ImpactEstimator;
