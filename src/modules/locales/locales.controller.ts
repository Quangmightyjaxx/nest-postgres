import { sessionMaxAge } from '@config';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import parseDuration from 'parse-duration';

@Controller('locales')
export class LocalesController {
    @Get(':lang')
    setLang(@Param('lang') lang: string, @Res() res: Response) {
        res.cookie('lang', lang, { maxAge: parseDuration(sessionMaxAge, 'ms') });
        res.redirect('back');
    }
}
