import { Injectable } from "@nestjs/common";
import { CommodityEntity } from "./entities/commodity.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CommodityService {
  constructor(
    @InjectRepository(CommodityEntity)
    private readonly CommodityRepository: Repository<any>,
  ) {}

  async queryCommodityList(body: any): Promise<any> {
    const { pageSize = 1, pageNum = 1, keywords = '' } = body;
    return await this.CommodityRepository.find();
  }
}
