import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { UserService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UserRepository } from './users/user.repository';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities:  [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, AuthService, UserService, UserRepository, JwtService],
})
export class AppModule {}