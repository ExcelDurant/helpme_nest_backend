import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { GoogleService } from './google/google.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, UsersModule,MongooseModule.forRoot('mongodb://localhost:27017/helpme'), TasksModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, GoogleService],
})
export class AppModule {}
