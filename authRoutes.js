const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const JWT_SECRET = 'super-secret-key';
const users = []; // In-memory user store

router.post('/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const existing = users.find(user => user.email === email);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ email, password: hashedPassword });

    res.status(201).json({ message: 'User created' });
  }
);

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
