// const calculatePeriod = (data) => {
//   if (data.periodType === 'months') {
//     return 2 ** Math.floor((data.timeToElapse * 30) / 3);
//   }
//   if (data.periodType === 'weeks') {
//     return 2 ** Math.floor((data.timeToElapse * 7) / 3);
//   }

//   return 2 ** Math.floor(data.timeToElapse / 3);
// };

const takeWholeNum = (x) => {
  const t = String(x);
  if (t.indexOf('.') < 0) {
    return Number(t);
  }
  return Number(t.slice(0, t.indexOf('.')));
};
// const infByReqTime = (elapsedTime, cInf) => {
//   const exponent = takeWholeNum(elapsedTime / 3);
//   return cInf * (2 ** exponent);
// };

const getDays = (data) => {
  if (data.periodType === 'months') {
    return 30 * data.timeToElapse;
  }
  if (data.periodType === 'weeks') {
    return 7 * data.timeToElapse;
  }

  return 1 * data.timeToElapse;
};

const currentInfections = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * takeWholeNum(data);
  const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
  const compute = (35 / 100) * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = Math.trunc(
    compute - severeCasesByRequestedTime
  );
  const casesForICUByRequestedTime = Math.trunc(
    (5 / 100) * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = (2 / 100) * infectionsByRequestedTime;
  const result = data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
  const dollarsInFlight = Math.trunc(
    infectionsByRequestedTime * result * getDays(data)
  );

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
  const infectionsByRequestedTime = currentlyInfected * takeWholeNum(data);
  const severeCasesByRequestedTime = (15 / 100) * infectionsByRequestedTime;
  const compute = (35 / 100) * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = Math.trunc(
    compute - severeCasesByRequestedTime
  );
  const casesForICUByRequestedTime = Math.trunc(
    (5 / 100) * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = (2 / 100) * infectionsByRequestedTime;
  const result = data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
  // const dollarsInFlight = infectionsByRequestedTime * result * getDays(data);

  // const dollarsInFlight = Math.trunc((infectionsByRequestedTime * 0.65 * 1.5) / 30)
  //   * result
  //   * getDays(data);
  const dollarsInFlight = Math.trunc(
    infectionsByRequestedTime * result * getDays(data)
  );

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
