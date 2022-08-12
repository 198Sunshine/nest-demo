import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get()
  findAll() {
    // return 'This is return the home';
    return this.homeService.findAll();
  }

  // @Get()
  // findOne(@Query() pagination: { pageSize: number; pageNum: number }) {
  //   // const { pageSize, pageNum } = pagination;
  //   // return `PageSize:${pageSize},PageNum:${pageNum}`;
  // }

  @Get(':id')
  findId(@Param('id') id: number) {
    console.log(typeof id);
    // return `This is return the ${id} home`;
    return this.homeService.findOne(id);
  }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createHomeDto: CreateHomeDto) {
    // console.log(createHomeDto instanceof CreateHomeDto, createHomeDto);
    // return body;
    return this.homeService.createHome(createHomeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHomeDto: UpdateHomeDto) {
    // return `This is update the ${id} home`;
    return this.homeService.updateHome(id, updateHomeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    // return `This is remove the ${id} home`;
    return this.homeService.deleteHome(id);
  }
}
