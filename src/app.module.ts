import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/users/roles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://api_usuarios:Mongodb%40123@54.234.150.200:27017/usuarios_db'),
        UsersModule,
        RolesModule,
        JwtModule.register({
            secret: 'yourSecretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
})
export class AppModule {}