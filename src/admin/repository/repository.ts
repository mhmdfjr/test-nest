import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection.js';

// External repository dummy
export class Repository {
  connection: Connection;

  save() {
    console.info(
      `Save repository with connection ${this.connection.getName()}`,
    );
  }
}

// Factory Provider
export function createRepository(connection: Connection): Repository {
  const repository = new Repository();
  repository.connection = connection;
  return repository;
}
