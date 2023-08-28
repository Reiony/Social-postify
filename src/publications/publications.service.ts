import { Injectable , NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationsRepository: PublicationsRepository) {}
  async create(createPublicationDto: CreatePublicationDto) {
    return await this.publicationsRepository.create(createPublicationDto);
  }

  async findAll(){
    return await this.publicationsRepository.getAllPublications();
  }

  async findOne(id: number){
    return await this.getPublicationById(id);
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const existingPublication = await this.publicationsRepository.getById(id);
    if (!existingPublication) {
      throw new NotFoundException(`Publication with id ${id} not found`);
    }

    const currentDate = new Date();
    const publicationDate = new Date(existingPublication.date);

    if (publicationDate <= currentDate) {
      throw new ForbiddenException
      ('Cannot update a publication that has already occurred');
    }

    return this.publicationsRepository.update(id, updatePublicationDto);
}

  async remove(id: number) {
    const publiExists = await this.publicationsRepository.getById(id);
    if (!publiExists) {
      throw new NotFoundException
      ('Publication not found, no deletion applied!');
    }
    return await this.publicationsRepository.delete(id);
  }

  private async getPublicationById(id: number) {
    const publication = await this.publicationsRepository.getById(id);
    if (!publication) {
      throw new NotFoundException(`Publication with id ${id} not found`);
    }
    return publication;
  }

  async findPublicationsByMediaId(mediaId: number) {
    return await this.publicationsRepository.getByMediaId(mediaId);
  }

  async findPublicationsByPostId(postId: number){
    return await this.publicationsRepository.getByPostId(postId);
  }
}
