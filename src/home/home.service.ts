import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HomeDto } from '../DTO/home.dto';

@Injectable()
export class HomeService {
  private homeData: HomeDto[] = [
    {
      id: 1,
      name: 'home',
      desc: ['home'],
      createTime: `${new Date().toLocaleDateString()}`,
    },
  ];

  findAll() {
    return this.homeData;
  }

  findOne(id: string) {
    const home = this.homeData.find((item: HomeDto) => item.id === +id);
    if (!home) {
      // throw new HttpException(`id为${id}的不存在`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`id为${id}的不存在`);
    }
    return home;
  }

  createHome(body: HomeDto) {
    const newId = ++this.homeData[0].id;
    this.homeData.push({
      id: newId,
      ...body,
    });
    return this.homeData;
  }

  updateHome(id: string, body: any) {
    const currentIndex = this.homeData.findIndex((item) => item.id === +id);
    let newData = this.homeData;
    if (currentIndex >= 0) {
      newData = this.homeData.map((item, index) => {
        if (currentIndex === index) {
          item = {
            ...item,
            ...body,
          };
        }
        return item;
      });
    }
    return newData;
  }

  deleteHome(id: string) {
    const currentIndex = this.homeData.findIndex((item) => item.id === +id);
    if (currentIndex >= 0) {
      this.homeData.splice(currentIndex, 1);
    }
    return this.homeData;
  }
}
