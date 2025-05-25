/**
 * @openapi
 * components:
 *  schemas:
 *      Transaction:
 *          type: object
 *          required: [id, createdAt, userId, name, isExpense, amountInPence, startDate, finishDate, isRecurring, recurrenceType, recurrenceRate, specificDayOfWeek, specificDayOfMonth, firstLastDayOfMonth]
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              userId:
 *                  type: string
 *                  format: uuid
 *              name:
 *                  type: string
 *              isExpense:
 *                  type: boolean
 *              amountInPence:
 *                  type: number
 *              isRecurring:
 *                  type: boolean
 *              startDate:
 *                  type: [string, "null"]
 *                  format: date-time
 *              finishDate:
 *                  type: [string, "null"]
 *                  format: date-time
 *              recurrenceType:
 *                  type: [string, "null"]
 *                  enum: [day, week, month]
 *              recurrenceRate:
 *                  type: [number, "null"]
 *              specificDayOfWeek:
 *                  type: [int, "null"]
 *                  minimum: 0
 *                  maximum: 6
 *              specificDayOfMonth:
 *                  type: [int, "null"]
 *                  minimum: 1
 *                  maximum: 28
 *              firstLastDayOfMonth:
 *                  type: [string, "null"]
 *                  enum: [first_business, last_business, last, specific]
 *      CreateTransactionInput:
 *          type: object
 *          required: [name, isExpense, amountInPence, isRecurring]
 *          properties:
 *              name:
 *                  type: string
 *              isExpense:
 *                  type: boolean
 *                  default: false
 *              amountInPence:
 *                  type: number
 *                  default: 0.01
 *              isRecurring:
 *                  type: boolean
 *                  default: false
 *              startDate:
 *                  type: string
 *                  format: date-time
 *              finishDate:
 *                  type: string
 *                  format: date-time
 *              recurrenceType:
 *                  type: string
 *                  enum: [day, week, month, year]
 *              recurrenceRate:
 *                  type: number
 *                  default: 1
 *              specificDayOfWeek:
 *                  type: int
 *                  minimum: 0
 *                  maximum: 6
 *              specificDayOfMonth:
 *                  type: int
 *                  minimum: 1
 *                  maximum: 28
 *              firstLastDayOfMonth:
 *                  type: string
 *                  enum: [first_business, last_business, last, specific]
 *      CreateTransactionResponse:
 *          $ref: '#/components/schemas/Transaction'
 *      UpdateTransactionInput:
 *          type: object
 *          required: [name, isExpense, amountInPence, isRecurring, startDate, finishDate, recurrenceType, recurrenceRate, specificDayOfWeek, specificDayOfMonth, firstLastDayOfMonth]
 *          properties:
 *              name:
 *                  type: string
 *              isExpense:
 *                  type: boolean
 *                  default: false
 *              amountInPence:
 *                  type: number
 *                  default: 0.01
 *              isRecurring:
 *                  type: boolean
 *                  default: false
 *              startDate:
 *                  type: [string, "null"]
 *                  format: date-time
 *              finishDate:
 *                  type: [string, "null"]
 *                  format: date-time
 *              recurrenceType:
 *                  type: [string, "null"]
 *                  enum: [day, week, month, year]
 *              recurrenceRate:
 *                  type: [number, "null"]
 *                  default: 1
 *              specificDayOfWeek:
 *                  type: [int, "null"]
 *                  minimum: 0
 *                  maximum: 6
 *              specificDayOfMonth:
 *                  type: [int, "null"]
 *                  minimum: 1
 *                  maximum: 28
 *              firstLastDayOfMonth:
 *                  type: [string, "null"]
 *                  enum: [first_business, last_business, last, specific]
 *      GetTransactionYearResponse:
 *          type: array
 *          minItems: 12
 *          maxItems: 12
 *          items:
 *              type: object
 *              properties:
 *                  monthName:
 *                      type: string
 *                      enum: [January, February, March, April, May, June, July, August, September, October, November, December]
 *                  income:
 *                      type: number
 *                      min: 0
 *                  expenses:
 *                      type: number
 *                      min: 0
 *                  remaining:
 *                      type: number
 *                      min: 0
 *              required: [monthName, income, expenses, remaining]
 *      GetTransactionMonthResponse:
 *          type: array
 *          minItems: 27
 *          maxItems: 31
 *          items:
 *              type: object
 *              required: [date, transactions]
 *              properties:
 *                  date:
 *                      type: string
 *                      enum: [1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th, 13th, 14th, 15th, 16th, 17th, 18th, 19th, 20th, 21st, 22nd, 23rd, 24th, 25th, 26th, 27th, 28th, 29th, 30th, 31st]
 *                  transactions:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Transaction'
 */

export interface GetTransactionYearParams {
    year?: string;
}

export interface GetTransactionMonthParams {
    year?: string;
    month?: string;
}
