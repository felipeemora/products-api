import { Router } from 'express';
import * as Product from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middlewares';

const router = Router();

router.get('/', Product.getAll)

router.get('/:id',
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  Product.getById)

router.post('/',
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
  body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio del producto no puede ir vacío')
    .custom(value => value > 0).withMessage('Precio no válido'),
  handleInputErrors,
  Product.create)

router.put('/:id',
  param('id').isInt().withMessage('Id no válido'),
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
  body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio del producto no puede ir vacío')
    .custom(value => value > 0).withMessage('Precio no válido'),
  body('isAvailable')
    .isBoolean().withMessage('Valor de disponibilidad no válido'),
  handleInputErrors,
  Product.update)

router.patch('/:id',
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  Product.updateAvailable)

router.delete('/:id',
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  Product.deleteProduct
)
export default router;