/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required: [id, createdAt, email, image]
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              email:
 *                  type: string
 *                  format: email
 *              image:
 *                  type: string
 *                  format: uri
 */
