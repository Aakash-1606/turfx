
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const bookingSchema = z.object({
  turfId: z.string().uuid('Invalid turf ID'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  price: z.number().positive('Price must be positive'),
});

export const turfSchema = z.object({
  name: z.string().min(1, 'Turf name is required').max(100, 'Name is too long'),
  location: z.string().min(1, 'Location is required').max(200, 'Location is too long'),
  sport: z.string().min(1, 'Sport is required'),
  price: z.number().positive('Price must be positive'),
  description: z.string().max(500, 'Description is too long').optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type TurfFormData = z.infer<typeof turfSchema>;
