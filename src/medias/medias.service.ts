import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}

  async create(createMediaDto: CreateMediaDto) {
    const existingMedia = await this.mediasRepository.getMediaByTitleAndUsername(createMediaDto);
    if (existingMedia) {
      throw new ConflictException('Media with the same title and username already exists');
    }

    return await this.mediasRepository.create(createMediaDto);
  }

  async findAll(): Promise<Media[]> {
    return this.mediasRepository.get();
  }

  async findOne(id: number) {
    const media = await this.mediasRepository.getById(id);
    if (!media) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const existingMedia = await this.mediasRepository.getById(id);
    if (!existingMedia) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
    
    return this.mediasRepository.update(id, updateMediaDto);
  }

  async remove(id: number): Promise<void> {
    const media = await this.mediasRepository.getById(id);
    if (!media) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }

    await this.mediasRepository.delete(id);
  }
}