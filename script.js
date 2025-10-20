document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var output = document.getElementById('output');

  function setError(id, message) {
    var input = document.getElementById(id);
    var errorEl = document.getElementById(id + 'Error');
    if (message) {
      input.classList.add('error');
      if (errorEl) errorEl.textContent = message;
    } else {
      input.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    }
  }

  function validateEmail(value) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }

  function validatePhone(value) {
    if (!value) return true; // optional
    var onlyDigits = /^\d{7,15}$/; // simple digits-only check
    return onlyDigits.test(value);
  }


  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var address = document.getElementById('address') ? document.getElementById('address').value.trim() : '';
    var placeOfBirth = document.getElementById('placeOfBirth') ? document.getElementById('placeOfBirth').value.trim() : '';
    var dateOfBirth = document.getElementById('dateOfBirth') ? document.getElementById('dateOfBirth').value : '';
    var gender = document.getElementById('gender') ? document.getElementById('gender').value : '';
    var religion = document.getElementById('religion') ? document.getElementById('religion').value : '';

    var isValid = true;

    setError('firstName', firstName ? '' : 'First name is required');
    if (!firstName) isValid = false;

    setError('lastName', lastName ? '' : 'Last name is required');
    if (!lastName) isValid = false;

    if (!email) {
      setError('email', 'Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setError('email', 'Enter a valid email');
      isValid = false;
    } else {
      setError('email', '');
    }

    if (!validatePhone(phone)) {
      setError('phone', 'Phone must be 7-15 digits');
      isValid = false;
    } else {
      setError('phone', '');
    }


    if (!isValid) {
      output.textContent = 'Please fix the errors above and submit again.';
      return;
    }

    var payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      placeOfBirth: placeOfBirth,
      dateOfBirth: dateOfBirth,
      gender: gender,
      religion: religion
    };

    try {
      sessionStorage.setItem('formData', JSON.stringify(payload));
    } catch (e) {
      // If storage fails, fall back to inline output
      output.textContent = 'Storage disabled; cannot redirect to results page.';
      return;
    }

    window.location.href = 'results.html';
  });
});


