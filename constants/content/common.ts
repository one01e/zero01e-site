import { FORM_URLS } from "./forms";

export const COMMON_CONTENT = {
  brand: {
    name: "ZERO01E",
    highlight: "01E",
    persona: "일이",
  },
  urls: {
    individualForm: FORM_URLS.individualDiagnosis,
    corporateForm: FORM_URLS.corporateInquiry,
    waitlistForm: FORM_URLS.labsResourceWaitlist,
    bsclSeason2WaitlistForm: FORM_URLS.bsclSeason2Waitlist,
    bsclOpenTalk: "https://open.kakao.com/o/gZ7KJ0ei",
    threads: "https://www.threads.com/@one01e",
    blog: "https://one01e.com",
  },
} as const;
