// const covid19ImpactEstimator = require('./estimator').data;

// // const impact = require('./estimator').data;

// exports.dataPost = (req, res, next) => {
//   const {
//     name,
//     averageAge,
//     averageDailyIncomeInUSD,
//     factor,
//     periodType,
//     timeToElapse,
//     reportedCases,
//     population,
//     totalHospitalBeds
//   } = req.body;


//   // console.log(name, averageAge, averageDailyIncomeInUSD);

//   res.status(201).json({
//     message: 'The Data Suuccessfully created',
//     data: {
//       id: new Date().toISOString(),
//       name,
//       averageAge,
//       averageDailyIncomeInUSD,
//       factor,
//       periodType,
//       timeToElapse,
//       reportedCases,
//       population,
//       totalHospitalBeds
//     }
//   });
//   next();
// };

// exports.getData = (req, res) => {
//   const {
//     currentlyInfected,
//     infectionsByRequestedTime,
//     severeCasesByRequestedTime,
//     hospitalBedsByRequestedTime,
//     casesForICUByRequestedTime,
//     casesForVentilatorsByRequestedTime,
//     dollarsInFlight
//   } = req.body;

//   return res.status(200).json({
//     impact: // JSON.stringify([
//       {
//         currentlyInfected,
//         infectionsByRequestedTime,
//         severeCasesByRequestedTime,
//         hospitalBedsByRequestedTime,
//         casesForICUByRequestedTime,
//         casesForVentilatorsByRequestedTime,
//         dollarsInFlight
//       },
//     // ]),

//     severeImpact: // JSON.stringify([
//       {
//         currentlyInfected,
//         infectionsByRequestedTime,
//         severeCasesByRequestedTime,
//         hospitalBedsByRequestedTime,
//         casesForICUByRequestedTime,
//         casesForVentilatorsByRequestedTime,
//         dollarsInFlight
//       }
//     // ])
//   });
// };

// module.export = covid19ImpactEstimator;
