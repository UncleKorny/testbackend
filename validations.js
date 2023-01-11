import { body } from 'express-validator';

export const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
]
export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    body('fullName').isLength({ min: 4, max: 32 }),
    body('avatarUrl').optional().isURL(),
]
export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min:3}).isString(),
    body('text', 'Введите текст статьи').isLength({min:10}).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]