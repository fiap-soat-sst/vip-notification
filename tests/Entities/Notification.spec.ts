import { describe, it, expect } from 'vitest'
import { Notification } from '../../src/Entities/Notification'
import { InputNotificationDTO, NotificationDTO } from '../../src/Entities/DTOs/Notification.dto'

describe('Notification Entity', () => {
  describe('when creating a new notification with NotificationDTO', () => {
    it('should create a notification with the provided id', () => {
      const input: NotificationDTO = {
        id: '123',
        videoId: 'video123',
        email: 'test@example.com',
        type: 'ERROR',
        message: 'This is a test notification'
      }
      const notification = new Notification(input)
      expect(notification.id).toBe(input.id)
      expect(notification.videoId).toBe(input.videoId)
      expect(notification.email).toBe(input.email)
      expect(notification.type).toBe(input.type)
      expect(notification.message).toBe(input.message)
    })
  })

  describe('when creating a new notification with InputNotificationDTO', () => {
    it('should create a notification with a generated id', () => {
      const input: InputNotificationDTO = {
        videoId: 'video123',
        email: 'test@example.com',
        type: 'SUCCESS',
        message: 'This is a test notification'
      }
      const notification = new Notification(input)
      expect(notification.id).toBeDefined()
      expect(notification.videoId).toBe(input.videoId)
      expect(notification.email).toBe(input.email)
      expect(notification.type).toBe(input.type)
      expect(notification.message).toBe(input.message)
    })
  })
})