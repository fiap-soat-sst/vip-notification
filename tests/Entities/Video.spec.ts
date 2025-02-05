import { describe, expect, it } from 'vitest'
import Video from '../../src/Entities/Video'

describe('Video Entity', () => {
  describe('when creating a new video with valid properties', () => {
    it('should create a video with the provided properties', () => {
      const video = new Video(
        '123',
        'Test Video',
        1024,
        'video/mp4',
        'hash123',
        { url: 'http://manager.service' },
        { images: [{ url: 'http://process.service/image1' }] },
        { url: 'http://compress.service' }
      )
      expect(video.id).toBe('123')
      expect(video.name).toBe('Test Video')
      expect(video.size).toBe(1024)
      expect(video.contentType).toBe('video/mp4')
      expect(video.hash).toBe('hash123')
      expect(video.managerService?.url).toBe('http://manager.service')
      expect(video.processService?.images[0].url).toBe('http://process.service/image1')
      expect(video.compressService?.url).toBe('http://compress.service')
    })
  })

  describe('when creating a new video with invalid properties', () => {
    it('should throw an error if name is missing', () => {
      expect(() => new Video('123', '', 1024, 'video/mp4', 'hash123')).toThrow('Invalid video properties')
    })

    it('should throw an error if contentType is missing', () => {
      expect(() => new Video('123', 'Test Video', 1024, '', 'hash123')).toThrow('Invalid video properties')
    })

    it('should throw an error if size is less than or equal to 0', () => {
      expect(() => new Video('123', 'Test Video', 0, 'video/mp4', 'hash123')).toThrow('Invalid video properties')
    })
  })
})