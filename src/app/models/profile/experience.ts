import { Month } from '../enumerations/month';
import { IExperience } from '../interfaces/IExperience';

export class Experience implements IExperience {
    public title: string;
    public company: string;
    public startMonth: Month;
    public startYear: number;
    public endMonth: Month;
    public endYear: number;
    public logoUrl: string;
    public experiences: Experience[];

    private mDescription: string;
    public get description(): string {
        return this.mDescription;
    }

    public set description(value: string) {
        this.mDescription = value ? value.replace('\n', '<br>') : '';
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
}
