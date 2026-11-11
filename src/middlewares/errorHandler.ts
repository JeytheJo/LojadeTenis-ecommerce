import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: err.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
    });
    return;
  }

  if (err instanceof Error) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
    return;
  }

  res.status(500).json({ success: false, message: 'Erro interno do servidor' });
}
