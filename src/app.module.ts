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
  // imports: [ConfigModule.forRoot(),AuthModule, UsersModule,MongooseModule.forRoot(`mongodb://localhost:${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`), TasksModule, HttpModule],
  imports: [ConfigModule.forRoot(),AuthModule, UsersModule,MongooseModule.forRoot(`mongodb+srv://${process.env.PROD_DATABASE_USER}:${process.env.PROD_DATABASE_PASSWORD}@cluster0.g09fo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`), TasksModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, GoogleService],
})
export class AppModule {}
