import { describe, it, expect } from 'vitest'
import { Email } from '../../src/Entities/Email'
import { InputEmailDTO, EmailDTO } from '../../src/Entities/DTOs/Email.dto'

describe('Email Entity', () => {
  describe('when creating a new email with EmailDTO', () => {
    it('should create an email with the provided id', () => {
      const input: EmailDTO = {
        id: '123',
        sender: 'sender@example.com',
        receiver: 'receiver@example.com',
        type: 'ERROR',
        subject: 'Erro no processamento do vídeo',
        body: 'test ${errorMessage} ${videoTitle}',
        data: {
          errorMessage: 'An error occurred',
          videoTitle: 'Test Video'
        }
      }
      const email = new Email(input)
      expect(email.id).toBe(input.id)
      expect(email.sender).toBe(input.sender)
      expect(email.receiver).toBe(input.receiver)
      expect(email.type).toBe(input.type)
      expect(email.subject).toBe(input.subject)
      expect(email.body).toContain(input.data.errorMessage)
      expect(email.body).toContain(input.data.videoTitle)
    })
  })

  describe('when creating a new email with InputEmailDTO', () => {
    it('should create an email with a generated id', () => {
      const input: InputEmailDTO = {
        sender: 'sender@example.com',
        receiver: 'receiver@example.com',
        type: 'SUCCESS',
        data: {
          urlVideo: 'http://example.com/video',
          videoTitle: 'Test Video'
        },
        body: 'test ${urlVideo} ${videoTitle}'
      }
      const email = new Email(input)
      expect(email.id).toBeDefined()
      expect(email.sender).toBe(input.sender)
      expect(email.receiver).toBe(input.receiver)
      expect(email.type).toBe(input.type)
      expect(email.subject).toBe('Vídeo processado com sucesso')
      expect(email.body).toContain(input.data.urlVideo)
      expect(email.body).toContain(input.data.videoTitle)
    })

    // it('should throw an error for invalid email type', () => {
    //   const input: InputEmailDTO = {
    //     sender: 'sender@example.com',
    //     receiver: 'receiver@example.com',
    //     type: 'INVALID_TYPE' as any,
    //     data: {
    //       errorMessage: 'An error occurred',
    //       videoTitle: 'Test Video'
    //     },
    //     body: 'test ${errorMessage} ${videoTitle}'
    //   }
    //   expect(() => new Email(input)).toThrow('Invalid email type')
    // })
  })
})