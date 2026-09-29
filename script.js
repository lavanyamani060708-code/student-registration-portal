const form = document.getElementById('studentForm');
const resultSection = document.getElementById('resultSection');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const student = {
    name: document.getElementById('fullName').value.trim(),
    regNo: document.getElementById('regNo').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim() || 'Not provided',
    course: document.getElementById('course').value,
    year: document.getElementById('year').value
  };

  const subjects = [];
  for (let i = 1; i <= 5; i++) {
    const subject = document.getElementById(`sub${i}`).value.trim();
    const markInput = document.getElementById(`mark${i}`);
    const mark = Number(markInput.value);

    if (!subject || markInput.value === '' || mark < 0 || mark > 100) {
      markInput.setCustomValidity('Enter a mark from 0 to 100.');
      markInput.reportValidity();
      markInput.setCustomValidity('');
      return;
    }
    subjects.push({ subject, mark });
  }

  const total = subjects.reduce((sum, item) => sum + item.mark, 0);
  const percentage = total / subjects.length;
  const passed = subjects.every(item => item.mark >= 40);

  document.getElementById('studentSummary').innerHTML = '';
  const summary = [
    ['Full Name', student.name],
    ['Register Number', student.regNo],
    ['Email Address', student.email],
    ['Phone Number', student.phone],
    ['Course', student.course],
    ['Year of Study', student.year]
  ];
  summary.forEach(([label, value]) => {
    const item = document.createElement('div');
    item.className = 'summary-item';
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    const valueEl = document.createElement('strong');
    valueEl.textContent = value;
    item.append(labelEl, valueEl);
    document.getElementById('studentSummary').appendChild(item);
  });

  const rows = document.getElementById('resultRows');
  rows.innerHTML = '';
  subjects.forEach((item, index) => {
    const row = document.createElement('tr');
    const values = [
      index + 1,
      item.subject,
      `${item.mark} / 100`,
      item.mark >= 40 ? 'PASS' : 'FAIL'
    ];
    values.forEach((value, colIndex) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      if (colIndex === 3) cell.className = item.mark >= 40 ? 'pass' : 'fail';
      row.appendChild(cell);
    });
    rows.appendChild(row);
  });

  document.getElementById('totalMarks').textContent = `${total} / 500`;
  document.getElementById('percentage').textContent = `${percentage.toFixed(2)}%`;
  document.getElementById('overallResult').textContent = passed ? 'PASS' : 'FAIL';
  const badge = document.getElementById('statusBadge');
  badge.textContent = passed ? 'PASSED' : 'NEEDS IMPROVEMENT';
  badge.style.background = passed ? '#e8f8ef' : '#fff0f1';
  badge.style.color = passed ? '#13845b' : '#c43b50';

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

form.addEventListener('reset', function () {
  resultSection.hidden = true;
});
