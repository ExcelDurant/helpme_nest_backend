import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // await app.listen(3000);
  const PORT = Number(process.env.PORT) || 8080;
  await app.listen(PORT);
  console.log(`Server is running at http://localhost:${PORT}`);
}
bootstrap();
