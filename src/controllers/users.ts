import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import InvalidRequest from '../errors/invalid-request';
import NotFound from '../errors/not-found';
import Unauthorized from '../errors/unauthorized-error';
import Conflict from '../errors/conflict-error';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized('Передан неверный логин или пароль.'));
    });
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequest('Некорректный запрос.'));
      } else {
        next(err);
      }
    });
};

export const getUserMe = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.user?._id)
  .orFail(() => {
    throw new NotFound('Пользователь по указанному id не найден.');
  })
  .then((user) => res.send({ user }))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new InvalidRequest('Некорректный _id пользователя.'));
    } else {
      next(err);
    }
  });

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequest('Некорректный _id пользователя.'));
      } else {
        next(err);
      }
    });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash: string) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(201).send({
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new Conflict('Пользователь с указаным Email уже существует.'));
        return;
      }

      if (err.name === 'CastError') {
        next(new InvalidRequest('Некорректный запрос.'));
      } else {
        next(err);
      }
    });
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user?._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest('Переданы некорректные данные при обновлении профиля.'));
      } else if (err.name === 'CastError') {
        next(new InvalidRequest('Некорректный _id пользователя.'));
      } else {
        next(err);
      }
    });
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user?._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest('Переданы некорректные данные при обновлении аватара.'));
      } else if (err.name === 'CastError') {
        next(new InvalidRequest('Некорректный _id пользователя.'));
      } else {
        next(err);
      }
    });
};
