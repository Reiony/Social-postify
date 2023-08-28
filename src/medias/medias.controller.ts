import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto): Promise<Media> {
    return this.mediasService.create(createMediaDto);
  }

  @Get()  
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mediasService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }
}
