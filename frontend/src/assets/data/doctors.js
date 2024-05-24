import doctorImg01 from '../images/doctor-img01.png'
import doctorImg02 from '../images/doctor-img02.png'
import doctorImg03 from '../images/doctor-img03.png'

export const doctors = [
  {
    id: '01',
    name: 'Dr. Arthur Ioan',
    specialization: 'Surgeon',
    avgRating: 4.8,
    totalRating: 333,
    photo: doctorImg01,
    totalPatients: 2500,
    hospital: 'Spitalul Judetean de Urgenta Timisoara.',
  },
  {
    id: '02',
    name: 'Dr. Ivan Sandu',
    specialization: 'Neurologist',
    avgRating: 4.9,
    totalRating: 222,
    photo: doctorImg02,
    totalPatients: 1500,
    hospital: 'Clinica Sante, Hunedoara.',
  },
  {
    id: '03',
    name: 'Dr. Murariu Catalin',
    specialization: 'Dermatologist',
    avgRating: 4.7,
    totalRating: 100,
    photo: doctorImg03,
    totalPatients: 1000,
    hospital: 'Clinica Sante, Deva.',
  },
]
