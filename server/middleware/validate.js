const { z } = require('zod');

const enquirySchema = z.object({
  studentName: z.string().min(2).max(50).trim(),
  parentName: z.string().min(2).max(50).trim(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit Indian number'),
  classVal: z.enum(['Std 5', 'Std 6', 'Std 7', 'Std 8', 'Std 9', 'Std 10', 'Std 11 Science', 'Std 11 Commerce', 'Std 12 Science', 'Std 12 Commerce']),
  board: z.enum(['GSEB', 'CBSE']),
  message: z.string().max(500).optional().default(''),
});

const validate = (req, res, next) => {
  const result = enquirySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: result.error.format()
    });
  }
  req.validatedData = result.data;
  next();
};

module.exports = { validate, enquirySchema };
