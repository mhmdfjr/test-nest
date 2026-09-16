import { Injectable } from '@nestjs/common';

// External service dummy
export class MailService {
  send() {
    console.info('Sending email...');
  }
}

// Value Provider
export const mailService = new MailService();
