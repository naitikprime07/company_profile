import LegalPage from "../components/LegalPage";

// Structure inspired by standard privacy-notice layouts, written for the
// Prime Softech website (contact form, career applications, and general
// browsing are the ways we collect data on this project).
const sections = [
  {
    id: "information-we-collect",
    number: "01",
    title: "What information do we collect?",
    blocks: [
      {
        type: "p",
        text: "The personal information you disclose to us. We collect personal information that you voluntarily provide to us when you express interest in our services or products through the contact form, apply for a job or share your resume on our careers pages, subscribe to updates, or otherwise contact Prime Softech.",
      },
      {
        type: "p",
        text: "The personal information we collect may include the following:",
      },
      {
        type: "ul",
        items: [
          "Names",
          "Phone numbers",
          "Email addresses",
          "Mailing addresses",
          "Job application details, experience, and resume/CV files",
          "Other similar information you choose to share",
        ],
      },
      {
        type: "p",
        text: "All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.",
      },
      {
        type: "p",
        text: "Information automatically collected. Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our Website.",
      },
      {
        type: "p",
        text: "The information we collect includes:",
      },
      {
        type: "ul",
        items: [
          "Log and Usage Data: Service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Website.",
          "Device Data: Information about your computer, phone, tablet, or other devices you use to access the Website, including IP address, device identification numbers, browser type, and operating system.",
          "Location Data: General location information about your device, which can be either precise or imprecise. You can opt out by disabling location settings on your device.",
        ],
      },
    ],
  },
  {
    id: "how-we-use-information",
    number: "02",
    title: "How do we use your information?",
    blocks: [
      {
        type: "p",
        text: "We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. We use the information we collect or receive to:",
      },
      {
        type: "ul",
        items: [
          "Respond to inquiries you send through our contact form and schedule discussions about your project.",
          "Review job applications, evaluate resumes, and communicate with candidates about career opportunities.",
          "Send administrative information to you, including product, service, and new feature updates, and changes to our terms, conditions, and policies.",
          "Protect our Services, including for fraud monitoring and prevention.",
          "Enforce our terms, conditions, and policies for business purposes and comply with legal and regulatory requirements.",
          "Send you marketing and promotional communications (you can opt out at any time).",
          "Improve our Website, services, and internal processes based on usage trends.",
        ],
      },
    ],
  },
  {
    id: "information-sharing",
    number: "03",
    title: "Will your information be shared with anyone?",
    blocks: [
      {
        type: "p",
        text: "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data based on the following legal bases:",
      },
      {
        type: "ul",
        items: [
          "Consent: We may process your data if you have given us specific consent to use your personal information for a specific purpose.",
          "Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.",
          "Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.",
          "Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, or court orders.",
          "Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, or threats to safety.",
          "Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.",
        ],
      },
    ],
  },
  {
    id: "cookies-tracking",
    number: "04",
    title: "Do we use cookies and other tracking technologies?",
    blocks: [
      {
        type: "p",
        text: "We may use cookies and other tracking technologies to collect and store your information. Cookies are small data files stored on your device that help the Website function properly, remember your preferences, and understand which pages are useful to visitors.",
      },
      {
        type: "p",
        text: "Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject cookies, though this could affect certain features of our Website.",
      },
    ],
  },
  {
    id: "data-retention",
    number: "05",
    title: "How long do we keep your information?",
    blocks: [
      {
        type: "p",
        text: "We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law. Personal information submitted through job applications (including resumes) is retained for up to 2 years so we can consider you for future openings, after which it is deleted from our active records.",
      },
      {
        type: "p",
        text: "No purpose in this notice will require us to keep your personal information for longer than reasonably necessary.",
      },
    ],
  },
  {
    id: "data-safety",
    number: "06",
    title: "How do we keep your information safe?",
    blocks: [
      {
        type: "p",
        text: "We aim to protect your personal information through a system of organizational and technical security measures. We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.",
      },
      {
        type: "p",
        text: "Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.",
      },
    ],
  },
  {
    id: "minors",
    number: "07",
    title: "Do we collect information from minors?",
    blocks: [
      {
        type: "p",
        text: "We do not knowingly solicit data from or market to children under 18 years of age. By using the Website, you represent that you are at least 18, or that you are the parent or guardian of a minor and consent to such minor dependent's use of the Website. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.",
      },
      {
        type: "p",
        contact: true,
        text: "If you become aware of any data we may have collected from children under age 18, please contact us at",
      },
    ],
  },
  {
    id: "privacy-rights",
    number: "08",
    title: "What are your privacy rights?",
    blocks: [
      {
        type: "p",
        text: "In some regions (like the European Economic Area (EEA) and United Kingdom (UK)), you have certain rights under applicable data protection laws. These may include the right to:",
      },
      {
        type: "ul",
        items: [
          "Request access and obtain a copy of your personal information.",
          "Request rectification or erasure of your personal information.",
          "Restrict the processing of your personal information.",
          "Data portability, if applicable.",
          "Object to the processing of your personal information in certain circumstances.",
        ],
      },
      {
        type: "p",
        text: "To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.",
      },
      {
        type: "p",
        text: "For users in India: Under the Digital Personal Data Protection Act, 2023 (DPDP Act), you may also have the right to nominate another person to exercise these rights in the event of your death or incapacity.",
      },
      {
        type: "p",
        text: "For California residents: The California Consumer Privacy Act (CCPA) gives you the right to request disclosure of the categories and specific pieces of personal information we have collected about you, and the right to request deletion. We do not sell personal information.",
      },
    ],
  },
  {
    id: "do-not-track",
    number: "09",
    title: "Controls for Do-Not-Track features",
    blocks: [
      {
        type: "p",
        text: "Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (\"DNT\") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.",
      },
    ],
  },
  {
    id: "updates",
    number: "10",
    title: "Do we make updates to this notice?",
    blocks: [
      {
        type: "p",
        text: "Yes, we will update this notice as necessary to stay compliant with relevant laws. We may update this privacy notice from time to time. The updated version will be indicated by an updated \"Revised\" date and will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to stay informed of how we are protecting your information.",
      },
    ],
  },
  {
    id: "contact-us",
    number: "11",
    title: "How can you contact us about this notice?",
    blocks: [
      {
        type: "p",
        contact: true,
        text: "If you have questions or comments about this notice, you may email us at",
      },
      {
        type: "address",
      },
    ],
  },
  {
    id: "review-update-delete",
    number: "12",
    title:
      "How can you review, update, or delete the data we collect from you?",
    blocks: [
      {
        type: "p",
        text: "Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please contact us using the details in Section 11.",
      },
    ],
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy notice"
      title="Your privacy,"
      accent="handled with care."
      intro="This privacy notice explains what personal information Prime Softech collects from you, how we use it, and the choices you have when you visit our website or work with us."
      sections={sections}
    />
  );
}

export default PrivacyPage;
