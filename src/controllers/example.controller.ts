// CONFIGURACION REUTILIZABLE (NO TOCAR)
// Estructura basica de un controlador CRUD con manejo de errores estandar en Express y Sequelize
import { Request, Response } from "express";
import { Example } from "../models/example.js";

// MODIFICAR AQUI PARA EL PROYECTO REAL
// Modificar la logica de las funciones CRUD, validaciones internas y respuestas segun la entidad requerida
export const createExample = async (req: Request, res: Response) => {
    try {
        const example = await Example.create(req.body);
        res.status(201).json(example);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al crear el registro"
        });
    }
};

export const getExamples = async (_req: Request, res: Response) => {
    try {
        const examples = await Example.findAll();
        res.status(200).json(examples);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al obtener los registros"
        });
    }
};

export const getExampleById = async (req: Request, res: Response) => {
    try {
        const example = await Example.findByPk(req.params.id as string);
        if (!example) {
            res.status(404).json({
                message: "Registro no encontrado"
            });
            return;
        }
        res.status(200).json(example);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al obtener el registro"
        });
    }
};

export const updateExample = async (req: Request, res: Response) => {
    try {
        const example = await Example.findByPk(req.params.id as string);
        if (!example) {
            res.status(404).json({
                message: "Registro no encontrado"
            });
            return;
        }
        await example.update(req.body);
        res.status(200).json(example);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al actualizar el registro"
        });
    }
};

export const deleteExample = async (req: Request, res: Response) => {
    try {
        const example = await Example.findByPk(req.params.id as string);
        if (!example) {
            res.status(404).json({
                message: "Registro no encontrado"
            });
            return;
        }
        await example.destroy();
        res.status(200).json({
            message: "Registro eliminado correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al eliminar el registro"
        });
    }
};