import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeResolver } from './notice.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import NoticeSchema from '../../schemas/Notice.model';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Notice', schema: NoticeSchema }]), AuthModule],
	providers: [NoticeService, NoticeResolver],
	exports: [NoticeService],
})
export class NoticeModule {}
