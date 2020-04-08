const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: this.currentlyInfected * 512,
    severeCasesByRequestedTime: (15 / 100) * this.infectionsByRequestedTime,
    hospitalBedsByRequestedTime:
      (35 / 100) * data.totalHospitalBeds - this.severeCasesByRequestedTime
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: this.currentlyInfected * 512,
    severeCasesByRequestedTime:
      (15 / 100) * this.infectionsByRequestedTime.covid19ImpactEstimator,
    hospitalBedsByRequestedTime:
      (35 / 100) * data.totalHospitalBeds - this.severeCasesByRequestedTime
  }
});

export default covid19ImpactEstimator;
