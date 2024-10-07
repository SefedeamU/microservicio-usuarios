"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('createUserDto:', createUserDto); // Registra el DTO para depurar
            const createdUser = new this.userModel(createUserDto);
            yield createdUser.save();
            console.log('createdUser:', createdUser); // Registra el usuario creado para depurar
            const token = this.jwtService.sign({ id: createdUser._id, email: createdUser.email }, { expiresIn: '1h' });
            return { user: createdUser, token };
        });
    }
    validateUser(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email: loginUserDto.email }).exec();
            if (user && user.password === loginUserDto.password) {
                return user;
            }
            throw new Error('Invalid credentials');
        });
    }
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { username: user.nombre, sub: user._id };
            return this.jwtService.sign(payload);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.find().exec();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findById(id).exec();
        });
    }
    update(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findByIdAndDelete(id).exec();
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
