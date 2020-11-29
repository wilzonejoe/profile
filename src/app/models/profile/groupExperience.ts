import 'array-linq';

import { Month } from './../enumerations/month';
import { Experience } from './experience';
import { IExperience } from './../interfaces/IExperience';

export class GroupExperience implements IExperience{
    public company: string;
    public logoUrl: string;

    public get title(): string | undefined {
        return this.experiences.firstOrUndefined()?.title;
    }

    public get startMonth(): Month | undefined {
        return this.experiences.lastOrUndefined()?.startMonth;
    }

    public get startYear(): number | undefined {
        return this.experiences.lastOrUndefined()?.startYear;
    }

    public get endMonth(): Month | undefined {
        return this.experiences.firstOrUndefined()?.endMonth;
    }

    public get endYear(): number | undefined {
        return this.experiences.firstOrUndefined()?.endYear;
    }

    public get description(): string | undefined {
        return this.experiences.firstOrUndefined()?.description;
    }

    private mExperiences: Experience[];
    public get experiences(): Experience[] {
        return this.mExperiences.orderByDescending((e: Experience) => e.startMonth && e.startYear);
    }

    public get period(): string | undefined {
        let startPeriod: string | undefined = this.startYear?.toString();
        let endPeriod: string | undefined = this.endYear?.toString();

        if (this.startMonth && this.startYear) {
            startPeriod = `${Month[this.startMonth]} ${this.startYear}`;
        }

        if (this.endMonth && this.endYear) {
            endPeriod = `${Month[this.endMonth]} ${this.endYear}`;
        }

        if (startPeriod && endPeriod) {
            return `${startPeriod} - ${endPeriod}`;
        } else if (startPeriod) {
            return `${startPeriod} - Now`;
        } else if (endPeriod) {
            return endPeriod;
        } else {
            return undefined;
        }
    }

    constructor() {
        this.mExperiences = new Array<Experience>();
    }

    public addExperience(experience: Experience): void {
        if (!experience) {
            return;
        }

        this.mExperiences.push(experience);
    }
}
