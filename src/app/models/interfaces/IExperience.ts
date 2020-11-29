import { Month } from '../enumerations/month';

export interface IExperience {
    title: string | undefined;
    company: string | undefined;
    startMonth: Month | undefined;
    startYear: number | undefined;
    endMonth: Month | undefined;
    endYear: number | undefined;
    period: string | undefined;
    description: string | undefined;
    experiences: IExperience[];
    logoUrl: string;
}
