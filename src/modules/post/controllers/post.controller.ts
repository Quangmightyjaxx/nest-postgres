import { Controller, UseFilters } from '@nestjs/common';
import { LocalAuthExceptionFilter } from '@shared';
@Controller()
@UseFilters(LocalAuthExceptionFilter)
export class PostController {}
