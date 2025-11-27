import {Router} from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/products.ts';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware/index.ts';
const router = Router();

router.get('/', getProducts);

router.get('/:id', 

    param('id').isInt().withMessage('ID must be a Integer'),

    handleInputErrors,
    
    getProductsById);

router.post('/', 
    
    body('name').notEmpty().withMessage('Name is required'),
                            
    body('price').isNumeric().withMessage('Price must be a number')
                .notEmpty().withMessage('Price is required')
                .custom((value) => value > 0).withMessage('Price must be greater than zero'),

    handleInputErrors,
    
    createProduct);


router.put('/:id',
    
    body('name').notEmpty().withMessage('Name is required'),
                            
    body('price').isNumeric().withMessage('Price must be a number')
                .notEmpty().withMessage('Price is required')
                .custom((value) => value > 0).withMessage('Price must be greater than zero'),

    body('availability').isBoolean().withMessage('Availability must be a boolean'),

    param('id').isInt().withMessage('ID must be a Integer'),

    handleInputErrors,

    updateProduct);

router.delete('/:id', 

    param('id').isInt().withMessage('ID must be a Integer'),

    handleInputErrors,

    deleteProduct);

router.patch('/:id', 

    body('availability').isBoolean().withMessage('Availability must be a boolean'),

    param('id').isInt().withMessage('ID must be a Integer'),

    handleInputErrors,

    updateAvailability);

export default router;