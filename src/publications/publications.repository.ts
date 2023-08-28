import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePublicationDto) {
    return this.prisma.publications.create({ data });
  }

  async getById(id: number) {
    return this.prisma.publications.findFirst({ where: { id } });
  }

  async getAllPublications() {
    return this.prisma.publications.findMany();
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return await this.prisma.publications.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  async delete(id: number) {
    return this.prisma.publications.delete({ where: { id } });
  }

  async getByMediaId(mediaId: number) {
    return this.prisma.publications.findFirst({
      where: { mediaId }
    });
  }

  async getByPostId(postId: number) {
    return this.prisma.publications.findFirst({
      where: { postId }
    });
  }
}