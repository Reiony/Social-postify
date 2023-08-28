import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prisma.posts.create({
      data: createPostDto,
    });
  }

  async getById(id: number){
    return this.prisma.posts.findUnique({ where: { id } });
  }

  async getAllPosts() {
    return this.prisma.posts.findMany();
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async delete(id: number){
    await this.prisma.posts.delete({ where: { id } });
  }
}