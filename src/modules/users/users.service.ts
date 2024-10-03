import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<{ user: User, token: string }> {
        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();
        const token = jwt.sign({ id: createdUser._id, email: createdUser.email }, 'secretKey', { expiresIn: '1h' });
        return { user: createdUser, token };
    }

    async login(loginUserDto: LoginUserDto): Promise<{ user: User, token: string } | null> {
        const user = await this.userModel.findOne({ email: loginUserDto.email, password: loginUserDto.password }).exec();
        if (user) {
            const token = jwt.sign({ id: user._id, email: user.email }, 'secretKey', { expiresIn: '1h' });
            return { user, token };
        }
        return null;
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: CreateUserDto): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async remove(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}