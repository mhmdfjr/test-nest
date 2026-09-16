import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller.js';
import httpMock from 'node-mocks-http';
import { title } from 'process';
import { AdminService } from './admin.service.js';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
      imports: [],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello();
    expect(response).toBe('Hello Hasan');
  });

  it('should can view template', async () => {
    const response = httpMock.createResponse();
    controller.getView('Hasan', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Hasan',
      title: 'Template Engine',
    });
  });
});
