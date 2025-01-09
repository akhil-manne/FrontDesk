import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with the correct origin
  app.enableCors({
    origin: 'http://localhost:4000', // Allow requests from the frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If cookies or authorization headers are required
  });

  await app.listen(3000);
  console.log('Backend is running on http://localhost:3000');
}
bootstrap();
