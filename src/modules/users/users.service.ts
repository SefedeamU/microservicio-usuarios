import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async create(createUserDto: CreateUserDto): Promise<{ user: User, token: string }> {
        console.log('createUserDto:', createUserDto); // Registra el DTO para depurar
        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();
        console.log('createdUser:', createdUser); // Registra el usuario creado para depurar
        const token = this.jwtService.sign({ id: createdUser._id, email: createdUser.email }, { expiresIn: '1h' });
        return { user: createdUser, token };
    }

    async validateUser(loginUserDto: LoginUserDto): Promise<User> {
        const user = await this.userModel.findOne({ email: loginUserDto.email }).exec();
        if (user && user.password === loginUserDto.password) {
            return user;
        }
        throw new Error('Invalid credentials');
    }

    async generateToken(user: User): Promise<string> {
        const payload = { username: user.nombre, sub: user._id };
        return this.jwtService.sign(payload);
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