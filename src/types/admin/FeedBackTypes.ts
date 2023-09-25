export type TStatus = {
  id: number;
  umbrellaUuid: number;
  content: string;
  etc: string;
};

export type TConditionRes = {
  conditionReports: TStatus[];
};

export type TImprovementRes = {
  improvementReports: TStatus[];
};
