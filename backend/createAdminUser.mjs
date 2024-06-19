import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from './models/UserSchema.js' // Adjust the path based on your project structure

const createAdminUser = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://andreea27:doctorbackendapp@cluster0.cx4xsu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    const password = 'admin123'
    const hashedPassword = await bcrypt.hash(password, 10)

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      phone: '1234567890',
      photo: '',
      role: 'admin',
      gender: 'female',
      bloodType: 'O+',
    })

    await adminUser.save()
    console.log('Admin user created successfully')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

createAdminUser()
