import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { BrandsService } from 'src/products/services/brands/brands.service';
import {
  BrandQueryDto,
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/products/dtos/brand.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all brands' })
  async getAll(@Query() query: BrandQueryDto) {
    const brands = await this.brandsService.findAll(query);

    return {
      data: brands,
    };
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a brand by ID' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.brandsService.findOne(id);

    return {
      data: brand,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  async create(@Body() body: CreateBrandDto) {
    const newBrand = await this.brandsService.create(body);

    return {
      message: 'Brand created successfully',
      data: newBrand,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing brand' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBrandDto,
  ) {
    const brand = await this.brandsService.update(id, body);

    return {
      message: 'Brand updated successfully',
      data: brand,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by ID' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.brandsService.delete(id);

    return {
      message: 'Brand deleted successfully',
      data: brand,
    };
  }
}
