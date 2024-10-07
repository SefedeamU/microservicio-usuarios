import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    nombre: string = '';

    @Prop({ required: true, unique: true })
    email: string = '';

    @Prop({ required: true })
    password: string = '';

    @Prop({ default: Date.now })
    fecha_creacion: Date = new Date();

    @Prop()
    ultimo_acceso?: Date;

    @Prop({ default: true })
    activo: boolean = true;
}

export const UserSchema = SchemaFactory.createForClass(User);