import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './schemas/role.schema';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const createdRole = new this.roleModel(createRoleDto);
        return createdRole.save();
    }

    async findAll(): Promise<Role[]> {
        return this.roleModel.find().exec();
    }

    async findOne(id: string): Promise<Role | null> {
        return this.roleModel.findById(id).exec();
    }

    async update(id: string, updateRoleDto: CreateRoleDto): Promise<Role | null> {
        return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Role | null> {
        return this.roleModel.findByIdAndDelete(id).exec();
    }
}