import { Response } from 'express';
import { ApiResponse } from '../types';

export function ok<T>(res: Response, data: T, message?: string): Response {
  const body: ApiResponse<T> = { success: true, data, message };
  return res.status(200).json(body);
}

export function created<T>(res: Response, data: T, message?: string): Response {
  const body: ApiResponse<T> = { success: true, data, message };
  return res.status(201).json(body);
}

export function noContent(res: Response): Response {
  return res.status(204).send();
}

export function badRequest(res: Response, message: string, errors?: string[]): Response {
  const body: ApiResponse = { success: false, message, errors };
  return res.status(400).json(body);
}

export function unauthorized(res: Response, message = 'Não autorizado'): Response {
  const body: ApiResponse = { success: false, message };
  return res.status(401).json(body);
}

export function notFound(res: Response, message = 'Recurso não encontrado'): Response {
  const body: ApiResponse = { success: false, message };
  return res.status(404).json(body);
}

export function serverError(res: Response, message = 'Erro interno do servidor'): Response {
  const body: ApiResponse = { success: false, message };
  return res.status(500).json(body);
}
