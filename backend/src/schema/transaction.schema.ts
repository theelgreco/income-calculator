/**
 * @openapi
 * components:
 *  schemas:
 *      CreateTransactionInput:
 *          type: object
 *          required:
 *              - name
 *              - isExpense
 *              - amountInPence
 *              - isRecurring
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
 *              recurrenceRateType:
 *                  type: string
 *                  enum: [specific_day_of_week, specific_day_of_month, first_last_day_of_month]
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
 *          type: object
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
 *              recurrenceRateType:
 *                  type: string
 *                  enum: [specific_day_of_week, specific_day_of_month, first_last_day_of_month]
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
 *      GetTransactionYearParams:
 *          type: integer
 *      GetTransactionYearResponse:
 *          type: array
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
 *          minItems: 12
 *          maxItems: 12
 */
