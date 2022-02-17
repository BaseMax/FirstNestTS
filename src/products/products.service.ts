import {v4 as uuidv4} from 'uuid';
import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    randomIntFromInterval(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
      
    insertProduct(title: string, price: number, description: string) {
        // const prodId = this.randomIntFromInterval(10000, 999999);
        const prodId = uuidv4()
        const newProduct = new Product(prodId, title, price, description);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId: string, title: string, price: number, description: string) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title)
            updatedProduct.title = title;
        if (price)
            updatedProduct.price = price;
        if (description)
            updatedProduct.description = description;
        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if (!product)
            throw new NotFoundException('Could not find product.');
        return [product, productIndex];
    }
}
