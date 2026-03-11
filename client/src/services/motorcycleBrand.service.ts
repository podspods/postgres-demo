import {
  MotorcycleBrand,
  PaginatedResponse,
  ApiResponse,
  QueryParams,
  CreateMotorcycleBrandDto,
  UpdateMotorcycleBrandDto,
} from "../types/motorcycleBrand.types";
import { apiClient } from "./api-client";

/**
 * Motorcycle Brand Service
 * Handles all API calls related to motorcycle brands
 */
export const createMotorcycleBrandService = (baseUrl: string = "/api/motorcycle-brands") => {
  /**
   * Get all brands with pagination
   */
  const getAll = async (params: QueryParams = {}): Promise<PaginatedResponse<MotorcycleBrand>> => {
    const response = await apiClient.get(baseUrl, { params });
    return response.data;
  };

  /**
   * Get brand by ID
   */
  const getById = async (id: number): Promise<ApiResponse<MotorcycleBrand>> => {
    const response = await apiClient.get(`${baseUrl}/${id}`);
    return response.data;
  };

  /**
   * Get brands by country
   */
  const getByCountry = async (country: string): Promise<ApiResponse<MotorcycleBrand[]>> => {
    const response = await apiClient.get(`${baseUrl}/by-country`, {
      params: { country },
    });
    return response.data;
  };

  /**
   * Search brands by name
   */
  const search = async (query: string): Promise<ApiResponse<MotorcycleBrand[]>> => {
    const response = await apiClient.get(`${baseUrl}/search`, {
      params: { q: query },
    });
    return response.data;
  };

  /**
   * Create new brand
   */
  const create = async (data: CreateMotorcycleBrandDto): Promise<ApiResponse<MotorcycleBrand>> => {
    const response = await apiClient.post(baseUrl, data);
    return response.data;
  };

  /**
   * Update existing brand
   */
  const update = async (
    id: number,
    data: UpdateMotorcycleBrandDto,
  ): Promise<ApiResponse<MotorcycleBrand>> => {
    const response = await apiClient.put(`${baseUrl}/${id}`, data);
    return response.data;
  };

  /**
   * Delete brand
   */
  const remove = async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`${baseUrl}/${id}`);
    return response.data;
  };

  return {
    getAll,
    getById,
    getByCountry,
    search,
    create,
    update,
    delete: remove,
  };
};

// Create and export singleton instance
export const motorcycleBrandService = createMotorcycleBrandService();
