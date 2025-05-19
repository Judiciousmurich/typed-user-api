import { Router } from 'express';
import { User } from '../models/user.model';

const router = Router();

interface CreateUserDTO {
  name: string;
  email: string;
}

router.post('/', async (req, res) => {
  try {
    const data: CreateUserDTO = req.body;
    const user = await User.create(data);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
