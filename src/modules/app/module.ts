import { OrderRepository } from './repositories/order';
import { OrderService } from './services/order';
import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { OrderController } from './controllers/order';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, OrderController],
  providers: [AuthService, UserService, OrderService, UserRepository, OrderRepository, DeviceRepository]
})
export class AppModule {}
