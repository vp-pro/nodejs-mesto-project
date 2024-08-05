import { Response, Request, NextFunction } from 'express';

import User from '../models/user';
import InvalidRequest from '../errors/invalid-request';
import NotFound from '../errors/not-found';

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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest('Переданы некорректные данные при создании пользователя.'));
      } else if (err.name === 'CastError') {
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
