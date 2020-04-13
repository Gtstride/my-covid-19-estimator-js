const takeWholeNum = (x) => {
  const t = String(x);
  if (t.indexOf('.') < 0) {
    return Number(t);
  }
  return Number(t.slice(0, t.indexOf('.')));
};

const infectionsByRequestedTime = (elapsedTime, cInf) => {
  const exponent = takeWholeNum(elapsedTime / 3);
  return cInf * 2 ** exponent;
};

const getDays = (periodType, timeToElapse) => {
  let result;
  if (periodType === 'days') {
    result = timeToElapse;
  } else if (periodType === 'weeks') {
    result = timeToElapse * 7;
  } else if (periodType === 'months') {
    result = timeToElapse * 30;
  }
  return result;
};

const covid19ImpactEstimator = (data) => {
  const impactRequstedCases = data.reportedCases * 10;
  const sImpactRC = data.reportedCases * 50;
  const normalTTE = takeWholeNum(getDays(data.periodType, data.timeToElapse));
  const impactInfByRT = takeWholeNum(
    infectionsByRequestedTime(normalTTE, impactRequstedCases)
  );
  const sImpactInfByRT = takeWholeNum(
    infectionsByRequestedTime(normalTTE, sImpactRC)
  );
  const impactSCByRT = takeWholeNum(0.15 * impactInfByRT);
  const sImpactSCByRT = takeWholeNum(0.15 * sImpactInfByRT);
  const availableBeds = 0.35 * data.totalHospitalBeds;
  const impactHBByRT = takeWholeNum(availableBeds - 0.15 * impactInfByRT);
  const sImpactHBByRT = takeWholeNum(availableBeds - 0.15 * sImpactInfByRT);
  const impactCForICUByRT = takeWholeNum(0.05 * impactInfByRT);
  const sImpactCForICUByRT = takeWholeNum(0.05 * sImpactInfByRT);
  const impactVent = takeWholeNum(0.02 * impactInfByRT);
  const sImpactVent = takeWholeNum(0.02 * sImpactInfByRT);
  const myltp = impactInfByRT * data.region.avgDailyIncomePopulation;
  const impactDInF = takeWholeNum(
    (myltp * data.region.avgDailyIncomeInUSD) / normalTTE
  );
  const multp2 = sImpactInfByRT * data.region.avgDailyIncomePopulation;
  const sImpactDInF = takeWholeNum(
    (multp2 * data.region.avgDailyIncomeInUSD) / normalTTE
  );
  return {
    data,
    impact: {
      currentlyInfected: impactRequstedCases,
      infectionsByRequestedTime: impactInfByRT,
      severeCasesByRequestedTime: impactSCByRT,
      hospitalBedsByRequestedTime: impactHBByRT,
      casesForICUByRequestedTime: impactCForICUByRT,
      casesForVentilatorsByRequestedTime: impactVent,
      dollarsInFlight: impactDInF
    },
    severeImpact: {
      currentlyInfected: sImpactRC,
      infectionsByRequestedTime: sImpactInfByRT,
      severeCasesByRequestedTime: sImpactSCByRT,
      hospitalBedsByRequestedTime: sImpactHBByRT,
      casesForICUByRequestedTime: sImpactCForICUByRT,
      casesForVentilatorsByRequestedTime: sImpactVent,
      dollarsInFlight: sImpactDInF
    }
  };
};
export default covid19ImpactEstimator;
