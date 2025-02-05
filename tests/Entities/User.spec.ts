import { describe, it, expect } from 'vitest'
import User from '../../src/Entities/User'
import Video from '../../src/Entities/Video'

describe('User Entity', () => {
  describe('when creating a new user', () => {
    it('should create a user with the provided email and password', () => {
      const email = 'test@example.com'
      const password = 'password123'
      const videos: Video[] = []
      const user = new User(email, password, videos)
      
      expect(user.email).toBe(email)
      expect(user.password).toBe(password)
      expect(user.videos).toBe(videos)
    })

    it('should throw an error if email is not provided', () => {
      const email = ''
      const password = 'password123'
      const videos: Video[] = []

      expect(() => new User(email, password, videos)).toThrow('Invalid user properties')
    })

    it('should throw an error if password is not provided', () => {
      const email = 'test@example.com'
      const password = ''
      const videos: Video[] = []

      expect(() => new User(email, password, videos)).toThrow('Invalid user properties')
    })

    it('should create a user with an empty videos array if no videos are provided', () => {
      const email = 'test@example.com'
      const password = 'password123'
      const user = new User(email, password, [])

      expect(user.videos).toEqual([])
    })

    it('should create a user with the provided videos', () => {
      const email = 'test@example.com'
      const password = 'password123'
      const videos: Video[] = [new Video('123', 'Test Video', 100, 'video/mp4', '123'), new Video('456', 'Test Video 2', 200, 'video/mp4', '456')]
      const user = new User(email, password, videos)

      expect(user.videos).toBe(videos)
    })
  })
})