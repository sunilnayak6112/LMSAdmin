const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ── Middleware ──
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve Frontend ──
app.use(express.static(path.join(__dirname, '../frontend')));

// ── API Routes ──
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/me',         require('./routes/profile'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/payslips',   require('./routes/payslips'));
app.use('/api/leaves',     require('./routes/leaves'));
app.use('/api/letters',    require('./routes/letters'));
app.use('/api/salary',     require('./routes/salary'));

// ── Health ──
app.get('/api/health', (_, res) => res.json({ status: 'OK', service: 'Hirepre Employee Portal API' }));

// ── Catch-all ──
app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../frontend/employee-panel.html')));

// ── Connect & Listen ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Employee Portal running → http://localhost:${PORT}`);
    });
  })
  .catch(err => { console.error('❌ DB Error:', err.message); process.exit(1); });
