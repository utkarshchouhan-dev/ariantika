import { FaChevronDown } from "react-icons/fa6";
import adamMalikGeneralHospitalLogo from "@/assets/images/experience/adam-malik-general-hospital.png";
import universitasSumateraUtaraLogo from "@/assets/images/experience/universitas-sumatera-utara.png";
import universitasSumateraUtaraHospitalLogo from "@/assets/images/experience/universitas-sumatera-utara-hospital.png";

import { getExperienceDuration } from "@/utils";

const duration = getExperienceDuration();

export const experienceSection = {
  experienceHeadingId: "experience-heading",
  icon: FaChevronDown,

  header: {
    accent: "My",
    prefix: "Experience",
    subtitle:
      "Years of study, research, and professional experience dedicated to improving public health.",
  },

  items: [
    {
      id: 1,
      type: "work",
      logo: universitasSumateraUtaraHospitalLogo,
      logoAlt: "Universitas Sumatera Utara Hospital Logo",
      initials: "USU",
      role: "Research Assistant",
      company: "Universitas Sumatera Utara Hospital",
      employmentType: "Full-time",
      duration,
      location: "Medan, Indonesia",
      period: "2017 – Present",
      details: [
        "Conducted epidemiological research in oncology, infectious diseases, and hospital-based studies.",
        "Managed large clinical and public health datasets, ensuring data quality and research integrity.",
        "Performed statistical analysis using SPSS and interpreted quantitative findings for publication.",
        "Supported research design, protocol development, and methodology planning.",
        "Assisted in manuscript preparation for national and international scientific journals.",
        "Coordinated ethics submissions, research documentation, and institutional approvals.",
        "Collaborated with multidisciplinary healthcare professionals and academic researchers.",
      ],
    },
    {
      id: 2,
      type: "education",
      logo: universitasSumateraUtaraLogo,
      logoAlt: "Universitas Sumatera Utara Logo",
      initials: "MPH",
      role: "Master of Public Health, Epidemiology",
      company: "Universitas Sumatera Utara",
      location: "Medan, Indonesia",
      period: "2022 – 2024",
      details: [
        "Published research on quality of life in advanced-stage lung cancer patients.",
        "Conducted advanced statistical analysis using SPSS.",
        "Developed expertise in scientific manuscript preparation and publication processes.",
        "Graduated with a GPA of 3.85/4.00.",
      ],
    },
    {
      id: 3,
      type: "work",
      logo: adamMalikGeneralHospitalLogo,
      logoAlt: "Adam Malik General Hospital Logo",
      initials: "RSAM",
      role: "Administration Officer",
      company: "Adam Malik General Hospital",
      location: "Medan, Indonesia",
      period: "2021 – 2023",
      details: [
        "Coordinated administrative workflows and documentation processes.",
        "Managed institutional correspondence and hospital records.",
        "Organized meetings, schedules, and departmental activities.",
        "Maintained confidential records and operational documentation.",
        "Supported internal reporting and workflow efficiency initiatives.",
        "Facilitated communication between medical teams and external stakeholders.",
      ],
    },
    {
      id: 4,
      type: "education",
      logo: universitasSumateraUtaraLogo,
      logoAlt: "Universitas Sumatera Utara Logo",
      initials: "BPH",
      role: "Bachelor of Public Health, Environmental Health",
      company: "Universitas Sumatera Utara",
      location: "Medan, Indonesia",
      period: "2012 – 2017",
      details: [
        "Completed research on environmental health awareness among junior high school students.",
        "Participated in public health education and community outreach initiatives.",
        "Developed foundational skills in research, data collection, and public health analysis.",
        "Graduated with a GPA of 3.34/4.00.",
      ],
    },
  ],
};
