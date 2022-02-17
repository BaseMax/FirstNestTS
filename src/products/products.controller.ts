import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('price') prodPrice: number,
        @Body('description') prodDesc: string,
    ) {
        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodPrice,
            prodDesc,
        );
        return {
            id: generatedId
        };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('price') prodPrice: number,
        @Body('description') prodDesc: string,
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodPrice, prodDesc);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productsService.deleteProduct(prodId);
        return null;
    }
}
