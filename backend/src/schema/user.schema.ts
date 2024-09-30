/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required: [id, createdAt, username, email, image]
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *                  format: email
 *              image:
 *                  type: string
 *                  format: uri
 */
