import { vi, Mocked } from 'vitest'

export const createMock = <T>(): Mocked<T> => {
    return new Proxy(
        {},
        {
            get: (target: any, prop) => {
                if (!(prop in target)) {
                    target[prop] = vi.fn()
                }
                return target[prop]
            }
        }
    )
}