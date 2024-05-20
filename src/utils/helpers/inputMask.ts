import parsePhoneNumberFromString, { AsYouType } from 'libphonenumber-js'

export const normalizePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value)

  if (!phoneNumber) {
    return value
  }

  return phoneNumber.format('INTERNATIONAL')
}
