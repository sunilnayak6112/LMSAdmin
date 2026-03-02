# 👤 Hirepre Solution — Employee Self-Service Portal

A complete Employee User Panel with 7 feature-rich sections.

---

## 📁 Project Structure

```
hirepre-user/
│
├── frontend/
│   └── employee-panel.html    ← Complete UI (single file, open in browser)
│
└── backend/
    ├── server.js              ← Express entry point
    ├── package.json
    ├── .env
    ├── seed.js                ← Demo data seeder
    ├── models/
    │   ├── Employee.js
    │   ├── Leave.js
    │   ├── Payslip.js
    │   └── Letter.js
    ├── routes/
    │   ├── auth.js            ← Login / change password
    │   ├── profile.js         ← View & update profile
    │   ├── attendance.js      ← View attendance, check-in/out
    │   ├── payslips.js        ← View payslips
    │   ├── leaves.js          ← Apply, view, cancel leaves
    │   ├── letters.js         ← View & request letters
    │   └── salary.js          ← Salary breakdown & history
    └── middleware/
        └── auth.js            ← JWT authentication
```

---

## 🚀 Quick Start (Frontend Only — No Server Needed)

Open `frontend/employee-panel.html` in any browser:

```
Login: alex@hirepre.com  /  emp123
```

---

## ⚙️ Full Stack Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure `.env`
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/hirepre_employee_portal
JWT_SECRET=hirepre_emp_portal_secret_2026
JWT_EXPIRE=7d
```

### 3. Seed Demo Data
```bash
node seed.js
```

### 4. Start Server
```bash
npm run dev     # development
npm start       # production
```

### 5. Access
```
http://localhost:5001
```

---

## 🔗 API Reference

All routes (except login) require `Authorization: Bearer <token>` header.

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Employee login |
| GET | `/api/auth/me` | Get logged-in employee |
| POST | `/api/auth/change-password` | Change password |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/me` | Full profile + dashboard data |
| PUT | `/api/me` | Update contact details |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance?month=3&year=2026` | Monthly attendance |
| POST | `/api/attendance/checkin` | Check in |
| POST | `/api/attendance/checkout` | Check out |

### Payslips
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payslips` | All payslips |
| GET | `/api/payslips/:year/:month` | Specific month |

### Leave
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leaves` | Leave history |
| GET | `/api/leaves/balance` | Leave balance |
| POST | `/api/leaves` | Apply for leave |
| PUT | `/api/leaves/:id/cancel` | Cancel leave |

### Letters
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/letters` | All letters |
| GET | `/api/letters/:id` | Single letter |
| POST | `/api/letters/request` | Request new letter |

### Salary
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/salary` | Salary structure + history |

---

## 📱 Features

| Feature | Status |
|---------|--------|
| 🔐 JWT Login with validation | ✅ |
| 📊 Dashboard with summary cards | ✅ |
| 👤 Profile view & edit | ✅ |
| 📅 Monthly attendance calendar | ✅ |
| 💳 Payslip view & download | ✅ |
| 📄 Letters view, preview & download | ✅ |
| 🏖️ Leave apply with form validation | ✅ |
| 💰 Full salary breakdown | ✅ |
| 📱 Mobile responsive | ✅ |
| ✅ Form validation | ✅ |
| 🍞 Toast notifications | ✅ |

---

## 🎨 Design

- **Fonts:** Fraunces (headings) + Plus Jakarta Sans (body)
- **Colors:** Navy `#0f2d6b` → Blue `#1a56db` → Light blue
- **Style:** Clean corporate, sidebar layout, card-based UI
- **Responsive:** Full mobile support with collapsible sidebar

---

© 2026 Hirepre Solution. All Rights Reserved.
