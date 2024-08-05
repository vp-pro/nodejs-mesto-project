import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = (_req: Request, res: Response) =>
  User.find({})
    .then((users) => res.send(users));

export const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;  // Use req.params instead of req.body

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ message: err.message }));
};
