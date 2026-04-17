// Set max date to today so future dates can't be selected
document.getElementById('dob').max = new Date().toISOString().split('T')[0];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function calculateAge() {
  const dobInput = document.getElementById('dob').value;
  const resultEl = document.getElementById('result');
  const errorEl = document.getElementById('error');

  resultEl.hidden = true;
  errorEl.hidden = true;

  if (!dobInput) {
    errorEl.hidden = false;
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    errorEl.hidden = false;
    return;
  }

  // Calculate years, months, days
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Next birthday
  const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday <= today) nextBirthday.setFullYear(today.getFullYear() + 1);
  const daysToNext = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
  const nextBirthdayStr = daysToNext === 0
    ? 'Today!'
    : `${MONTHS[nextBirthday.getMonth()]} ${nextBirthday.getDate()} (in ${daysToNext} days)`;

  // Day of birth
  const dayOfBirthStr = `${DAYS[dob.getDay()]}, ${MONTHS[dob.getMonth()]} ${dob.getDate()}, ${dob.getFullYear()}`;

  // Update UI
  document.getElementById('ageYears').textContent = years;
  document.getElementById('ageMonths').textContent = months;
  document.getElementById('ageDays').textContent = days;
  document.getElementById('nextBirthday').textContent = nextBirthdayStr;
  document.getElementById('dayOfBirth').textContent = dayOfBirthStr;

  resultEl.hidden = false;
}

// Allow pressing Enter to calculate
document.getElementById('dob').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calculateAge();
});
