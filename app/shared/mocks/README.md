/**
 * Mock Data Management
 * 
 * This directory serves as the centralized location for all mock data used in the application.
 * All hardcoded mock data should be imported from here instead of being defined inline in components.
 * 
 * Structure:
 * - types.ts: TypeScript interfaces for all mock data types
 * - shop-admin/index.ts: Mock data for shop admin module
 * 
 * Usage:
 * ```ts
 * import { recruitmentMockData } from '~/app/shared/mocks/shop-admin'
 * 
 * const recruitments = recruitmentMockData
 * ```
 */

export * from './types'
export * from './shop-admin'
