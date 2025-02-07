import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // ✅ Enable CORS
   app.enableCors({
    origin: "*", // ⚠️ Allow all origins (for testing)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
