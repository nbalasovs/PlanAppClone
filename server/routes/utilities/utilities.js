function checkField(value) {
  return !value || !value.trim()
}

exports.validateIndex = (body) => {
  let errors = ''
  if(checkField(body.username)) {
    errors += 'Username is required. '
  }
  if(checkField(body.password)) {
    errors += 'Password is required. '
  }
  if(checkField(body.first)) {
    errors += 'First name is required. '
  }
  if(checkField(body.last)) {
    errors += 'Last name is required. '
  }

  return {
    isValid: checkField(errors),
    message: errors
  }
}

exports.validateAuth = (body) => {
  let errors = ''

  if(checkField(body.username)) {
    errors += 'Username is required. '
  }
  if(checkField(body.password)) {
    errors += 'Password is required. '
  }

  return {
    isValid: checkField(errors),
    message: errors
  }
}