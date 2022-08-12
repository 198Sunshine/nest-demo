import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Home } from './entities/home.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { EmptyError } from 'rxjs';
import { Desc } from './entities/desc.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home) // 创建数据表
    private readonly HomeRepository: Repository<Home>,

    @InjectRepository(Desc)
    private readonly DescRepository: Repository<Desc>,
  ) {}

  findAll() {
    return this.HomeRepository.find({
      relations: ['descs'],
    }); //查询数据
  }

  async findOne(id: number) {
    // throw new InternalServerErrorException('KFC Crazy Thursday need 50 yuan.');
    const home = await this.HomeRepository.findOne(id, {
      relations: ['descs'],
    });
    if (!home) {
      // throw new HttpException(`id为${id}的不存在`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`id为${id}的不存在`);
    }
    return home;
  }

  async createHome(createHomeDto: CreateHomeDto) {
    const descs = await Promise.all(
      createHomeDto.descs.map((name) => this.preloadDescByName(name)),
    );
    console.log(descs, '---');
    const newHome = this.HomeRepository.create({
      ...createHomeDto,
      descs,
    });
    return this.HomeRepository.save(newHome);
  }

  async updateHome(id: number, updateHomeDto: UpdateHomeDto) {
    const descs =
      updateHomeDto.descs &&
      (await Promise.all(
        updateHomeDto.descs.map((name) => this.preloadDescByName(name)),
      ));
    const newHome = await this.HomeRepository.preload({
      id: +id,
      ...updateHomeDto,
      descs,
    });
    if (!newHome) {
      throw new NotFoundException(`Home id is Not Found.`);
    }
    return this.HomeRepository.save(newHome);
  }

  async deleteHome(id: number) {
    const home = await this.HomeRepository.findOne(id);
    if (!home) {
      throw new NotFoundException(`${id} of Home is Not Found.`);
    }
    return this.HomeRepository.remove(home);
  }

  private async preloadDescByName(name: string): Promise<Desc> {
    const desc = await this.DescRepository.findOne({ name });
    if (desc) {
      return desc;
    }
    return this.DescRepository.create({ name });
  }
}
