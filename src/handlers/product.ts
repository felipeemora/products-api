import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const create = async(req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({ product });
  } catch (error) {
    console.log("🚀 ~ create ~ error:", error)
  }
}

export const getAll = async(_req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [
        ['id', 'DESC']
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    res.json({ products })
  } catch (error) {
    console.log("🚀 ~ getAll ~ error:", error)
  }
}

export const getById = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({
        error: 'Producto no encontrado'
      });
    } 

    res.json({ product });
  } catch (error) {
    console.log("🚀 ~ getById ~ error:", error) 
  }
}

export const update = async(req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({
        error: 'Producto no encontrado'
      });
    }
    await product.update(req.body)
    await product.save();
    res.json({ product });
  } catch (error) {
    console.log("🚀 ~ update ~ error:", error) 
  }
} 

export const updateAvailable = async(req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({
        error: 'Producto no encontrado'
      });
    }
    product.isAvailable = !product.dataValues.isAvailable;
    await product.save();

    res.json({ product });
  } catch (error) {
    console.log("🚀 ~ update ~ error:", error) 
  }
} 

export const deleteProduct = async(req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({
        error: 'Producto no encontrado'
      });
    }

    await product.destroy();

    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    console.log("🚀 ~ update ~ error:", error) 
  }
} 
