import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Resource } from "../models/resource";

// Get the repository for interacting with the Resource entity
const resourceRepository = AppDataSource.getRepository(Resource);

export const createResource = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { name, description } = req.body;

  try {
    const resource = new Resource();
    resource.name = name;
    resource.description = description;

    await resourceRepository.save(resource);
    return res.status(201).json(resource);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to create resource", message: err.message });
  }
};

export const getResources = async (req: Request, res: Response): Promise<any> => {
  try {
    const resources = await resourceRepository.find();
    return res.status(200).json(resources);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve resources", message: err.message });
  }
};

export const getResourceById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const resource = await resourceRepository.findOneBy({ id: parseInt(id) });
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    return res.status(200).json(resource);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve resource", message: err.message });
  }
};

export const updateResource = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const resource = await resourceRepository.findOneBy({ id: parseInt(id) });

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    resource.name = name || resource.name;
    resource.description = description || resource.description;

    await resourceRepository.save(resource);
    return res.status(200).json(resource);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to update resource", message: err.message });
  }
};

export const deleteResource = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const resource = await resourceRepository.findOneBy({ id: parseInt(id) });
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    await resourceRepository.remove(resource);
    return res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to delete resource", message: err.message });
  }
};
