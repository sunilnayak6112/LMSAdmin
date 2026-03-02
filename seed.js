// Run: node seed.js
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Employee = require('./models/Employee');
const Payslip  = require('./models/Payslip');
const Letter   = require('./models/Letter');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Employee.deleteMany({});
    await Payslip.deleteMany({});
    await Letter.deleteMany({});
    console.log('🗑️  Cleared collections');

    // Create employees
    const employees = await Employee.create([
      {
        firstName: 'Alex', lastName: 'Kumar',
        email: 'alex@hirepre.com', password: 'emp123',
        phone: '+91 98765 43210', personalEmail: 'alex.personal@gmail.com',
        dateOfBirth: new Date('1995-04-15'), gender: 'Male',
        address: '42 MG Road, Bengaluru, Karnataka 560001',
        department: 'Engineering', position: 'Senior Developer',
        joinDate: new Date('2022-03-15'), status: 'Active',
        manager: 'James Wong',
        leaveBalance: { annual: 12, sick: 10, casual: 5, unpaid: 10 },
        bankDetails: { bankName: 'HDFC Bank', accountNumber: 'XXXX XXXX 4521', ifscCode: 'HDFC0001234' },
        emergencyContact: { name: 'Priya Kumar', phone: '+91 87654 32109', relation: 'Spouse' }
      },
      {
        firstName: 'Lisa', lastName: 'Mendes',
        email: 'lisa@hirepre.com', password: 'emp123',
        phone: '+91 87654 32109', department: 'Design',
        position: 'UI/UX Designer', joinDate: new Date('2021-07-01'),
        status: 'Active', leaveBalance: { annual: 15, sick: 10, casual: 6, unpaid: 10 }
      }
    ]);

    const alex = employees[0];
    console.log('👤 Employees created');

    // Payslips for Alex
    const months = [
      { month: 2, year: 2026 }, { month: 1, year: 2026 },
      { month: 12, year: 2025 }, { month: 11, year: 2025 },
      { month: 10, year: 2025 }, { month: 9, year: 2025 }
    ];

    for (const { month, year } of months) {
      const isNew = year === 2026;
      const basic = isNew ? 3000 : 2700;
      await Payslip.create({
        employee: alex._id, month, year,
        basicSalary: basic,
        allowances: { hra: isNew ? 800 : 720, transport: 200, medical: 150, special: isNew ? 250 : 230, other: 0 },
        deductions: { tax: isNew ? 380 : 340, providentFund: isNew ? 180 : 162, insurance: 60, other: 100 },
        bonus: 0, presentDays: 22, leaveDays: 2,
        paymentStatus: 'Paid',
        creditedOn: new Date(year, month - 1, 10)
      });
    }
    console.log('💳 Payslips created');

    // Letters for Alex
    await Letter.create([
      {
        employee: alex._id, letterType: 'Offer Letter',
        title: 'Offer Letter - Senior Developer',
        content: 'Official offer letter', issuedDate: new Date('2022-03-01'),
        issuedBy: 'Sarah Lee (CEO)'
      },
      {
        employee: alex._id, letterType: 'Appointment Letter',
        title: 'Appointment Letter', issuedDate: new Date('2022-03-15'),
        issuedBy: 'Sarah Lee (CEO)'
      },
      {
        employee: alex._id, letterType: 'Increment Letter',
        title: 'Salary Increment - Annual Review 2025',
        content: '12% increment letter', issuedDate: new Date('2026-01-10'),
        issuedBy: 'Priya Nair (HR Head)'
      },
      {
        employee: alex._id, letterType: 'Experience Letter',
        title: 'Experience Letter', issuedDate: new Date('2026-02-05'),
        issuedBy: 'Priya Nair (HR Head)'
      }
    ]);
    console.log('📄 Letters created');

    console.log('\n🎉 Seed complete!');
    console.log('🔑 Login: alex@hirepre.com / emp123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
