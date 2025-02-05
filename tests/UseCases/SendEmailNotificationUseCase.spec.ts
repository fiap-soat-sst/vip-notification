import { describe, it, expect, vi } from 'vitest';
import { SendEmailNotificationUseCase } from '../../src/UseCases/Notification/SendEmailNotificationUseCase';
import { InputNotificationDTO } from '../../src/Entities/DTOs/Notification.dto';
import { IEmailAdapter } from '../../src/External/Email/IEmailAdapter';
import { IVideoGateway } from '../../src/Gateways/contracts/IVideoGateway';
import { isLeft, isRight, Left, Right } from '../../src/@Shared/Either';
import { Email } from '../../src/Entities/Email';
import Video from '../../src/Entities/Video';

describe('SendEmailNotificationUseCase', () => {
  const mockEmailAdapter: IEmailAdapter = {
    sendEmail: vi.fn(),
  };

  const mockVideoGateway: IVideoGateway = {
    findVideo: vi.fn(),
    createVideoExample: vi.fn(),
  };

  const useCase = new SendEmailNotificationUseCase(mockEmailAdapter, mockVideoGateway);

  describe('when executing with valid input', () => {
    it('should send an email successfully', async () => {
      const input: InputNotificationDTO = {
        videoId: 'video123',
        email: 'test@example.com',
        type: 'SUCCESS',
        message: 'This is a test notification',
      };

      const mockVideo: Video = {
        id: 'video123',
        name: 'Test Video',
        size: 1024,
        contentType: 'video/mp4',
        hash: 'hash123',
        managerService: { url: 'http://manager.url' },
        processService: { images: [{ url: 'http://process.url' }] },
        compressService: { url: 'http://compress.url' },
      };

      vi.spyOn(mockVideoGateway, 'findVideo').mockResolvedValue(Right(mockVideo));
      vi.spyOn(mockEmailAdapter, 'sendEmail').mockResolvedValue(Right('Email sent'));

      const result = await useCase.execute(input);

      expect(isRight(result)).toBe(true);
      expect(result.value).toBe('Email sent successfully');
      expect(mockVideoGateway.findVideo).toHaveBeenCalledWith(input.email, input.videoId);
      expect(mockEmailAdapter.sendEmail).toHaveBeenCalledWith(expect.any(Email));
    });
  });

  describe('when video is not found', () => {
    it('should return an error', async () => {
      const input: InputNotificationDTO = {
        videoId: 'video123',
        email: 'test@example.com',
        type: 'ERROR',
        message: 'This is a test notification',
      };

      vi.spyOn(mockVideoGateway, 'findVideo').mockResolvedValue(Left(new Error('Video not found')));

      const result = await useCase.execute(input);

      expect(isLeft(result)).toBe(true);
      expect(result.value).toEqual(new Error('Video not found'));
      expect(mockVideoGateway.findVideo).toHaveBeenCalledWith(input.email, input.videoId);
    });
  });

  describe('when email sending fails', () => {
    it('should return an error', async () => {
      const input: InputNotificationDTO = {
        videoId: 'video123',
        email: 'test@example.com',
        type: 'ERROR',
        message: 'This is a test notification',
      };

      const mockVideo: Video = {
        id: 'video123',
        name: 'Test Video',
        size: 1024,
        contentType: 'video/mp4',
        hash: 'hash123',
        managerService: { url: 'http://manager.url' },
        processService: { images: [{ url: 'http://process.url' }] },
      };

      vi.spyOn(mockVideoGateway, 'findVideo').mockResolvedValue(Right(mockVideo));
      vi.spyOn(mockEmailAdapter, 'sendEmail').mockResolvedValue(Left(new Error('Email sending failed')));

      const result = await useCase.execute(input);

      expect(isLeft(result)).toBe(true);
      expect(result.value).toEqual(new Error('Email sending failed'));
      expect(mockVideoGateway.findVideo).toHaveBeenCalledWith(input.email, input.videoId);
      expect(mockEmailAdapter.sendEmail).toHaveBeenCalledWith(expect.any(Email));
    });
  });
});