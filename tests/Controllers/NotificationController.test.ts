import { describe, it, beforeEach, vi, Mock, expect } from 'vitest';
import { Request, Response } from 'express';
import NotificationController from '../../src/Controllers/NotificationController';
import { ISendEmailNotificationUseCase } from '../../src/UseCases/Notification/ISendEmailNotificationUseCase';
import { Left, Right } from '../../src/@Shared/Either';

describe('NotificationController', () => {
  let sendEmailNotificationUseCase: ISendEmailNotificationUseCase;
  let notificationController: NotificationController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    sendEmailNotificationUseCase = {
      execute: vi.fn(),
    };
    notificationController = new NotificationController(sendEmailNotificationUseCase);
    req = {
      body: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
  });

  it('should return 400 if required fields are missing', async () => {
    req.body = {};

    await notificationController.sendEmailNotification(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing required fields: videoId, email, type, message',
    });
  });

  it('should return 400 if use case returns an error', async () => {
    req.body = {
      videoId: 'invalid-id',
      email: 'test@example.com',
      type: 'notification',
      message: 'Test message',
    };
    (sendEmailNotificationUseCase.execute as Mock).mockResolvedValueOnce(Left({ message: 'Error' }));

    await notificationController.sendEmailNotification(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Error');
  });

  it('should return 200 if email notification is sent successfully', async () => {
    req.body = {
      videoId: 'valid-id',
      email: 'test@example.com',
      type: 'notification',
      message: 'Test message',
    };
    (sendEmailNotificationUseCase.execute as Mock).mockResolvedValueOnce(Right({ success: true }));

    await notificationController.sendEmailNotification(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it('should return 400 if email is invalid', async () => {
    req.body = {
      videoId: 'valid-id',
      email: 'invalid-email',
      type: 'notification',
      message: 'Test message',
    };
    (sendEmailNotificationUseCase.execute as Mock).mockResolvedValueOnce(Left({ message: 'Invalid email format' }));

    await notificationController.sendEmailNotification(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      'Invalid email format',
    );
  });

  it('should return 400 if videoId is invalid', async () => {
    req.body = {
      videoId: '',
      email: 'test@example.com',
      type: 'notification',
      message: 'Test message',
    };

    await notificationController.sendEmailNotification(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing required fields: videoId, '
    });
  });
});