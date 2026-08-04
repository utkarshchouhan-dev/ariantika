const CAREER_START = new Date("2017-08-01");

export function getExperienceDuration() {
  const now = new Date();

  const totalMonths =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months };
}
