const { DebounceRequest } = require('./index')

const mockRequest = jest.fn((res) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(res)
    }, 500);
}))


describe('request interval',() => {
    beforeEach(() => {
        mockRequest.mockClear()
    });
    it('same params and parallel request', async() => {
        const request = DebounceRequest(mockRequest,1000)
        await Promise.all([
            request('haha',500),
            request('haha',1500),
            request('haha',800),
        ])   
        expect(mockRequest.mock.calls.length).toBe(1)
        
    });

    it('same params and serial request', async() => {
        const request = DebounceRequest(mockRequest,1000)
        const a = await request('a');
        const b = await request('a')
        const c = await request('a')
        expect(a).toBe('a')
        expect(b).toBe('a')
        expect(c).toBe('a')
        expect(mockRequest.mock.calls.length).toBe(1)
        
    });
    
    it('different params', async() => {
        const request = DebounceRequest(mockRequest)
        const a = await request('a');
        const b = await request('b')
        const c = await request('c')
        expect(mockRequest.mock.calls.length).toBe(3)
        expect(a).toBe('a')
        expect(b).toBe('b')
        expect(c).toBe('c')
        
    });
})

describe('request out interval',() => {
    beforeEach(() => {
        mockRequest.mockClear()
    });

    it('same params and serial request', async() => {
        const request = DebounceRequest(mockRequest,200)
        const a = await request('a');
        const b = await request('a')
        const c = await request('a')
        expect(a).toBe('a')
        expect(b).toBe('a')
        expect(c).toBe('a')
        expect(mockRequest.mock.calls.length).toBe(3)
        
    });
    
    it('differents params', async() => {
        const request = DebounceRequest(mockRequest,200)
        const a = await request('a');
        const b = await request('b')
        const c = await request('c')
        expect(mockRequest.mock.calls.length).toBe(3)
        expect(a).toBe('a')
        expect(b).toBe('b')
        expect(c).toBe('c')
        
    });
})
