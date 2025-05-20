// import { POST, GET, PUT, DELETE } from '../src/app/api/score/route';
// import { createMocks } from 'node-mocks-http';
// import type { NextApiRequest, NextApiResponse } from 'next';

// describe('Score API', () => {
//   it('should save clicks and return success', async () => {
//     const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
//       method: 'POST',
//       body: { clicks: 5, sessionId: 'test-user-id' },
//     });

//     await POST(req as any, res as any);

//     expect(res._getStatusCode()).toBe(200);
//     expect(JSON.parse(res._getData())).toEqual({ message: 'POST' });
//   });

//   it('should return 400 for invalid input', async () => {
//     const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
//       method: 'POST',
//       body: { clicks: 'not a number', sessionId: 'test-user-id' },
//     });

//     await POST(req as any, res as any);

//     expect(res._getStatusCode()).toBe(400);
//   });

//   it('should return 405 for non-POST requests', async () => {
//     const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
//       method: 'GET',
//     });

//     await POST(req as any, res as any);

//     expect(res._getStatusCode()).toBe(405);
//   });
// });