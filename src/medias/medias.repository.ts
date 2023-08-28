import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto'
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMediaDto) {
    return this.prisma.medias.create({data});
  }

  async getMediaByTitleAndUsername(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;
    return this.prisma.medias.findFirst({
      where: { title, username },
    });
  }

  async get() {
    return this.prisma.medias.findMany();
  }

  async getById(id: number) {
    return this.prisma.medias.findFirst({
      where: { id }
    });
  }

  async update(id: number, data: UpdateMediaDto) {
    return this.prisma.medias.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.medias.delete({
      where: { id },
    });
  }
}