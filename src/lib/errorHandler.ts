
import { toast } from 'sonner';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: any, userMessage?: string) => {
  console.error('Application error:', error);
  
  // Log detailed error for debugging
  if (error instanceof AppError) {
    console.error(`AppError [${error.code}]: ${error.message}`);
  }
  
  // Show user-friendly message
  const message = userMessage || getUserFriendlyMessage(error);
  toast.error(message);
};

const getUserFriendlyMessage = (error: any): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  // Handle common Supabase errors
  if (error?.code === 'PGRST116') {
    return 'Record not found or access denied';
  }
  
  if (error?.code === '23505') {
    return 'This record already exists';
  }
  
  if (error?.message?.includes('JWT')) {
    return 'Session expired. Please login again';
  }
  
  if (error?.message?.includes('network')) {
    return 'Network error. Please check your connection';
  }
  
  // Generic fallback
  return 'Something went wrong. Please try again later';
};

export const validateInput = (data: any, schema: any) => {
  try {
    return schema.parse(data);
  } catch (error) {
    throw new AppError('Invalid input data', 'VALIDATION_ERROR', 400);
  }
};
