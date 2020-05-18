/**
 * @swagger
 * 
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     name: Login
 *     summary: Login User
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             phone:
 *               type: number
 *             password:
 *               type: string
 *             type:
 *               type: string
 *     responses:
 *       'Notes':
 *         description: You have to pass only 3 parameters For Login type,password and(email OR Phone)
 *       '200':
 *         description: Verify successfully
 *       '401':
 *         description: Port id, not found in db
 *       '403':
 *         description: Not Found
 */
/**
 * @swagger
 * /api/gulam/test:
 *  post:
 *     tags:
 *      - testing
 *     name: Test
 *     summary: Test Swagger
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *             name:
 *               type: string
 *             phone:
 *               type: number
 *             password:
 *               type: string
 *             type:
 *               type: string
 *    
 */