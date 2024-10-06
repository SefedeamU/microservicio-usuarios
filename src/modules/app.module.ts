import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RolesModule } from './users/roles.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://api_usuarios:Mongodb@123@54.234.150.200:27017/usuarios_db'),
        UsersModule,
        RolesModule,
    ],
})
export class AppModule {}
