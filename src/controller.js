import covid19ImpactEstimator from './estimator';

// const impact = require('./estimator');

exports.dataPost = (req, res, next) => {
  const {
    name,
    averageAge,
    averageDailyIncomeInUSD,
    factor,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;

  // console.log(name, averageAge, averageDailyIncomeInUSD);

  res.status(201).json({
    message: 'The Data Suuccessfully created',
    data: {
      id: new Date().toISOString(),
      name,
      averageAge,
      averageDailyIncomeInUSD,
      factor,
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    }
  });
  next();
};

exports.getData = (req, res, next) => {
  const {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  } = req.body;

  res.status(200).json({
    impact: JSON.stringify([
      {
        currentlyInfected,
        infectionsByRequestedTime,
        severeCasesByRequestedTime,
        hospitalBedsByRequestedTime,
        casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime,
        dollarsInFlight
      }
    ]),

    severeImpact: JSON.stringify([
      {
        currentlyInfected,
        infectionsByRequestedTime,
        severeCasesByRequestedTime,
        hospitalBedsByRequestedTime,
        casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime,
        dollarsInFlight
      }
    ])
  });
  next();
};

export default covid19ImpactEstimator;
