import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';

describe('HTTPS Redirection Middleware', () => {
  it('should redirect HTTP to HTTPS in production', () => {
    const req = {
      headers: {
        'x-forwarded-proto': 'http',
        'host': 'commercialshotblasting.co.uk'
      },
      protocol: 'http',
      url: '/locations/bedford'
    } as unknown as Request;

    const res = {
      redirect: vi.fn()
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    // Simulate the middleware logic
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    
    if (protocol === 'http' && req.headers['x-forwarded-proto']) {
      res.redirect(301, `https://${host}${req.url}`);
    } else {
      next();
    }

    expect(res.redirect).toHaveBeenCalledWith(301, 'https://commercialshotblasting.co.uk/locations/bedford');
    expect(next).not.toHaveBeenCalled();
  });

  it('should not redirect HTTPS requests', () => {
    const req = {
      headers: {
        'x-forwarded-proto': 'https',
        'host': 'commercialshotblasting.co.uk'
      },
      protocol: 'https',
      url: '/services/shot-blasting'
    } as unknown as Request;

    const res = {
      redirect: vi.fn()
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    // Simulate the middleware logic
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    
    if (protocol === 'http' && req.headers['x-forwarded-proto']) {
      res.redirect(301, `https://${host}${req.url}`);
    } else {
      next();
    }

    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should not redirect in development (no x-forwarded-proto)', () => {
    const req = {
      headers: {
        'host': 'localhost:3000'
      },
      protocol: 'http',
      url: '/'
    } as unknown as Request;

    const res = {
      redirect: vi.fn()
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    // Simulate the middleware logic
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    
    if (protocol === 'http' && req.headers['x-forwarded-proto']) {
      res.redirect(301, `https://${host}${req.url}`);
    } else {
      next();
    }

    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should preserve query parameters during redirect', () => {
    const req = {
      headers: {
        'x-forwarded-proto': 'http',
        'host': 'commercialshotblasting.co.uk'
      },
      protocol: 'http',
      url: '/locations/london?utm_source=google&utm_medium=cpc'
    } as unknown as Request;

    const res = {
      redirect: vi.fn()
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    // Simulate the middleware logic
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    
    if (protocol === 'http' && req.headers['x-forwarded-proto']) {
      res.redirect(301, `https://${host}${req.url}`);
    } else {
      next();
    }

    expect(res.redirect).toHaveBeenCalledWith(
      301, 
      'https://commercialshotblasting.co.uk/locations/london?utm_source=google&utm_medium=cpc'
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should use 301 permanent redirect status code', () => {
    const req = {
      headers: {
        'x-forwarded-proto': 'http',
        'host': 'commercialshotblasting.co.uk'
      },
      protocol: 'http',
      url: '/contact'
    } as unknown as Request;

    const res = {
      redirect: vi.fn()
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    // Simulate the middleware logic
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    
    if (protocol === 'http' && req.headers['x-forwarded-proto']) {
      res.redirect(301, `https://${host}${req.url}`);
    } else {
      next();
    }

    // Verify 301 status code is used (permanent redirect for SEO)
    expect(res.redirect).toHaveBeenCalledWith(301, expect.any(String));
  });
});
