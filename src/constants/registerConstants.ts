const RegisterConstants = {
  PAGE_HEADING: 'Sign up with NextGen!',
  NAME_LABEL: 'Name',
  NAME_REQUIRED: 'Full name is required to create an account.',
  NAME_PLACEHOLDER: 'Enter your full name matching Pan card',

  EMAIL_LABEL: 'Email address',
  EMAIL_REGEX: /\S+@\S+\.\S+/,
  EMAIL_REQUIRED: 'Email address is required to create an account.',
  EMAIL_NOT_VALID: 'Entered value does not match email format',
  EMAIL_PLACEHOLDER: 'Enter your registered email address',

  PASSWORD_LABEL: 'Password',
  PASSWORD_REGEX:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  PASSWORD_REQUIRED: 'Password is required to create an account.',
  PASSWORD_NOT_VALID:
    'Password must be of minimum eight characters, have at least one letter, one number and one special character',
  PASSWORD_PLACEHOLDER: 'Enter your password',

  PHONE_LABEL: 'Phone number',
  PHONE_REGEX: /^\d+$/,
  PHONE_REQUIRED: 'Phone number is required to create an account.',
  PHONE_NOT_VALID:
    'Phone number length must be equal to 10 and should contain only digits',
  PHONE_PLACEHOLDER: 'Enter your phone number',

  RESIDENCE_LABEL: 'Your address',
  RESIDENCE_PLACEHOLDER: 'Enter your address',

  OCCUPATION_LABEL: 'Your occupation',
  OCCUPATION_OPTIONS: [
    { label: 'Select an occupation', value: '' },
    { label: 'Goverment Services', value: 'Govt' },
    { label: 'Private services', value: 'private' },
    { label: 'Business', value: 'business' },
    { label: 'Unemployed', value: 'unemployed' },
    { label: 'Others', value: 'others' },
  ],

  INCOME_LABEL: 'Your income',
  INCOME_REQUIRED: 'Income is required to create an account.',
  INCOME_OPTIONS: [
    { label: 'Select income range', value: '' },
    { label: 'Less than 3 Lacs', value: '300000' },
    { label: '3 Lacs-10 Lacs', value: '300001' },
    { label: 'more than 10 Lacs', value: '1000001' },
  ],

  GOVTID_LABEL: 'Pan card number',
  GOVTID_REGEX: /^[a-z0-9]+$/i,
  GOVTID_REQUIRED: 'Pan card is required to create an account.',
  GOVTID_NOT_VALID: 'Pan card length must be equal to 10',
  GOVTID_PLACEHOLDER: 'Enter your Pan card number',
};

export default RegisterConstants;
