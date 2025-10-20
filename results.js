document.addEventListener('DOMContentLoaded', function () {
  var render = document.getElementById('render');
  var raw = null;
  try {
    raw = sessionStorage.getItem('formData');
  } catch (e) {
    // ignore
  }

  if (!raw) {
    render.textContent = 'No data found. Please submit the form first.';
    return;
  }

  var data = null;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    render.textContent = 'Could not read saved data.';
    return;
  }

  function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return '(empty)';
    var birthDate = new Date(dateOfBirth);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  var lines = [
    'You submitted:',
    '- First Name: ' + (data.firstName || '(empty)'),
    '- Last Name: ' + (data.lastName || '(empty)'),
    '- Email: ' + (data.email || '(empty)'),
    '- Phone: ' + (data.phone || '(empty)'),
    '- Age: ' + calculateAge(data.dateOfBirth),
    '- Address: ' + (data.address || '(empty)'),
    '- Place of Birth: ' + (data.placeOfBirth || '(empty)'),
    '- Date of Birth: ' + (data.dateOfBirth || '(empty)'),
    '- Gender: ' + (data.gender || '(empty)'),
    '- Religion: ' + (data.religion || '(empty)')
  ];

  render.textContent = lines.join('\n');
});


