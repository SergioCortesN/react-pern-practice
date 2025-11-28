import {Router} from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/products.ts';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware/index.ts';

const router = Router();
/**
 * @swagger
 * components: 
 *         schemas:
 *          Product:
 *              type: object
 *              properties:
 *                      id:
 *                          type: integer
 *                          description: The Product ID
 *                          example: 1
 *                      name:
 *                          type: string
 *                          description: The Product name
 *                          example: Monitor Curvo 49 Pulgadas
 *                      price:
 *                          type: number
 *                          description: The price
 *                          example: 99999
 *                      avaibility:
 *                          type: boolean
 *                          description: The  product availability
 *                          example: true
 */
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfully response
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 *                                  
 * 
 *          
 * 
 * 
 * 
 * 
 */

router.get('/', getProducts);


/**
 * 
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters: 
 *        - in: path 
 *          name: id
 *          description: The ID of the product to review
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *                  
 *          404:
 *              description: not found
 *          400:     
 *              description: Bad Request - Invalid ID
 * 
 * 
 * 
 * 
 * 
 * 
 */
router.get('/:id', 

    param('id').isInt().withMessage('ID must be a Integer'),

    handleInputErrors,
    
    getProductsById);



/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid Input
 */


/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Update a product by its unique ID
 *      parameters: 
 *          - in: path 
 *            name: id
 *            description: The ID of the product to update
 *            required: true
 *            schema:
 *                type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or invalid input data
 *          404:
 *              description: Product not found
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updates product avaibability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters: 
 *          - in: path 
 *            name: id
 *            description: The ID of the product to update
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters: 
 *          - in: path 
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 */

router.patch('/:id', 

    body('availability').isBoolean().withMessage('Availability must be a boolean'),

    param('id').isInt().withMessage('ID must be a Integer'),

    handleInputErrors,

    updateAvailability);

export default router;