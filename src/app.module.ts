import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { GoogleService } from './google/google.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),AuthModule, UsersModule,MongooseModule.forRoot(`mongodb://localhost:${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`), TasksModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, GoogleService],
})
export class AppModule {}
