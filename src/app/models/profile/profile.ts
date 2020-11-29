import { IExperience } from './../interfaces/IExperience';

export class Profile {
    public displayName: string;
    public currentPosition: string;
    public phoneNumber: string;
    public emailAddress: string;
    public physicalAddress: string;
    public overview: string;
    public experiences: IExperience[];

    constructor() {
        this.experiences = new Array<IExperience>();
    }

    public addExperience(experience: IExperience): void {
        if (!experience) {
            return;
        }

        this.experiences.push(experience);
    }
}
