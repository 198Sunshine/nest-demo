import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Home } from './entities/home.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHomeDto } from './dto/create-home.dto';
import {UpdateHomeDto} from "./dto/update-home.dto";

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home) // 创建数据表
    private readonly HomeRepository: Repository<Home>,
  ) {}


  findAll() {
    return this.HomeRepository.find(); //查询数据
  }

  async findOne(id: number) {
    const home = await this.HomeRepository.findOne(id);
    if (!home) {
      // throw new HttpException(`id为${id}的不存在`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`id为${id}的不存在`);
    }
    return home;
  }

  createHome(createHomeDto: CreateHomeDto) {
    const newHome = this.HomeRepository.create(createHomeDto);
    return this.HomeRepository.save(newHome);
  }

  async updateHome(id: number, updateHomeDto: UpdateHomeDto) {
    const newHome = await this.HomeRepository.preload({
      id: +id,
      ...updateHomeDto,
    })
    if(!newHome){
      throw new NotFoundException(`Home id is Not Found.`)
    }
    return this.HomeRepository.save(newHome);
  }

  async deleteHome(id: number) {
    const home = await this.HomeRepository.findOne(id);
    if(!home) {
       throw new NotFoundException(`${id} of Home is Not Found.`)
    }
    return this.HomeRepository.remove(home);
  }
}
