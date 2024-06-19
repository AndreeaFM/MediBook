// checkPasswordHash.mjs (using ES module syntax)
import bcrypt from 'bcryptjs'

const checkPassword = async () => {
  const password = 'admin123'
  const storedHashedPassword =
    '$2a$10$.ix5/4q5IwAl6tWoKsjrr.mwk2sns92gwu8BuDNcxKEPgqMzc4Dgi' // Use the hash you generated

  const isMatch = await bcrypt.compare(password, storedHashedPassword)
  console.log(isMatch) // Should print 'true' if the password matches
}

checkPassword()
