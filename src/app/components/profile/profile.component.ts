import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { Month } from 'src/app/models/enumerations/month';
import { Experience } from 'src/app/models/profile/experience';
import { GroupExperience } from 'src/app/models/profile/groupExperience';
import { Profile } from 'src/app/models/profile/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  public profile: Profile;

  constructor() {
    this.profile = this.createProfile();
    this.createExperiences();
  }

  ngOnInit(): void {
  }

  public download(): void {
    const source: HTMLElement | null = document.getElementById('resume');

    if (!source) {
      return;
    }

    const htmlWidth = $('#resume').width() ?? 0;
    const htmlHeight = $('#resume').height() ?? 0;
    const margin = 30;
    const pdfWidth = htmlWidth + (margin * 2);
    const pdfHeight = (pdfWidth * 1.5) + (margin * 4);
    const canvasImageWidth = htmlWidth;
    const canvasImageHeight = htmlHeight;

    console.log(canvasImageHeight / pdfHeight);
    const totalPDFPages = Math.floor(canvasImageHeight / pdfHeight);

    html2canvas($('#resume')[0], { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'pt',  [pdfWidth, pdfHeight]);
      for (let i = 0; i <= totalPDFPages; i++) {
        let yPosition = margin;

        if (i > 0) {
          pdf.addPage();
          yPosition = -(pdfHeight * i) + margin;
        }

        pdf.addImage(imgData, 'JPG', margin, yPosition, canvasImageWidth, canvasImageHeight);
      }
      pdf.save('HTML-Document.pdf');
    });
  }

  private createProfile(): Profile {
    const profile = new Profile ();
    profile.displayName = 'Wilson Joe';
    profile.currentPosition = 'Software Engineer @ Tradify';
    profile.phoneNumber = '0220503080';
    profile.emailAddress = 'wilsona73@live.com';
    profile.physicalAddress = '64 Rimu street, New Lynn, Auckland 0600';
    profile.overview = 'I am a talented and experienced full stack developer, who is able to work alongside other talented IT professionals from a wide range of background in crafting high quality software solution, with a strong academic background and some industry experience to back it up, I am currently looking for a web or mobile developer role that will allow me to work in a team of developers that will utilise my skills and experiences and contribute positively to the company. ';
    return profile;
  }

  private createExperiences(): void {
    const tradify = new GroupExperience();
    tradify.company = 'Tradify';
    tradify.logoUrl = 'https://media-exp1.licdn.com/dms/image/C4E0BAQGgRF_zkrli6Q/company-logo_100_100/0/1585360470107?e=1614816000&v=beta&t=5Fxe2Ey0sqtCS8oiVuqyP3IchC1B4mga02IErSsgGbA';
    const tradify1 = new Experience();
    tradify1.title = 'Junior Mobile Developer';
    tradify1.startMonth = Month.March;
    tradify1.startYear = 2018;
    tradify1.endMonth = Month.March;
    tradify1.endYear = 2019;
    tradify1.description = 'Add features, improve and maintain Tradify mobile app in Xamarin native & Forms (iOS and Android)<br><br>Technologies: C#, Xamarin, Android, iOS, AppCenter, git';
    tradify.addExperience(tradify1);
    const tradify2 = new Experience();
    tradify2.title = 'Intermediate Software Engineer';
    tradify2.startMonth = Month.March;
    tradify2.startYear = 2019;
    tradify2.description = 'Fullstack Web & Mobile development<br><br>- Improve and maintain Web App and API (Typescript, Javascript, Entity Framework API, ASP.net MVC & Angular front end) <br>- Integrate with accounting software (Xero API) with Two way sync functionality <br>- Mentoring and giving tips & trick for other developers to follow best practices and create a maintainable and testable solutions<br>- Add features, improve and maintain Tradify mobile app in Xamarin native & Forms (iOS and Android)<br>- Do some technical planning<br>- Project task management<br>- Code reviews and technical advice<br>- Continuous integration with AppCenter and Teamcity<br>- Releasing apps to both Apple Apps Store and Google Play Store<br><br>Technologies: C#, Git, SQL, Typescript, Javascript, Entity Framework, Xamarin, Android, iOS, AppCenter, JQuery, ASP.net MVC and AngularJS<br><br>Notable achievements: <br>- New features in mobile and web app, Improvement in mobile App stability,  Integration Xamarin Forms into Xamarin native mobile app.<br>- Jumping in and out from backend, frontend and mobile with ease.<br>- Architect on how Xero and Tradify syncing invoices in both way<br>- Training interns/grads<br><br>Features:<br>- Progress invoicing<br>- Mobile onboarding<br>- Mobile settings<br>- Electrical certificate (Mobile & Web)<br>- Referral<br>- Xero two way sync<br>- Job service report (Mobile, Web and Customer destination page)<br>- Two factor authentication';
    tradify.addExperience(tradify2);
    this.profile.addExperience(tradify);

    const suitebox = new Experience();
    suitebox.title = 'Junior Backend Developer';
    suitebox.logoUrl = 'https://media-exp1.licdn.com/dms/image/C4D0BAQF7NSTnV6EC8A/company-logo_100_100/0/1546727930269?e=1614816000&v=beta&t=WG7NDMsHGBO0E3ICbO918cWE8VRqv1AeqGrVTywJjWc';
    suitebox.company = 'Suitebox';
    suitebox.startMonth = Month.August;
    suitebox.startYear = 2017;
    suitebox.endMonth = Month.December;
    suitebox.endYear = 2017;
    suitebox.description = 'Build new features, Maintain and improve backend Soap and Java Restful API<br><br>Technologies: SOAP, Java, Springboot, and SoapUI';
    this.profile.addExperience(suitebox);

    const plexure = new Experience();
    plexure.title = 'Test Engineer';
    plexure.logoUrl = 'https://media-exp1.licdn.com/dms/image/C510BAQE7aMrtEzZT5w/company-logo_100_100/0/1559595970286?e=1614816000&v=beta&t=-r3ETUwHxIKObEltvwQFPvCH0yZBGWpzhnXcHGO1C8E';
    plexure.company = 'Plexure';
    plexure.startMonth = Month.January;
    plexure.startYear = 2017;
    plexure.endMonth = Month.June;
    plexure.endYear = 2017;
    plexure.description = 'Create Test cases for new and existing features in the Web Application and API<br>Create automation Test cases focusing on Web Application and API<br><br>Technologies: C#, Selenium, Cucumber (BDD), and TFS';
    this.profile.addExperience(plexure);
  }
}
