export default function calculateAge(birthDate: Date) {
  const currentDate = new Date();
  if (birthDate > currentDate) {
    throw new Error("Birth date cannot be in the future.");
  }

  const age = { years: 0, months: 0, days: 0 };

  if (birthDate === currentDate) {
    return age;
  }

  if (currentDate.getDate() >= birthDate.getDate()) {
    age.days = currentDate.getDate() - birthDate.getDate();
  } else {
    const currentMonth = currentDate.getMonth();
    const currentMothDays = new Date(
      currentDate.getFullYear(),
      currentMonth,
      0
    ).getDate();
    age.days = currentMothDays + currentDate.getDate() - birthDate.getDate();
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  if (currentDate.getMonth() >= birthDate.getMonth()) {
    age.months = currentDate.getMonth() - birthDate.getMonth();
  } else {
    age.months = 12 + currentDate.getMonth() - birthDate.getMonth();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
  }

  age.years = currentDate.getFullYear() - birthDate.getFullYear();

  console.log(age);

  return age;
}
