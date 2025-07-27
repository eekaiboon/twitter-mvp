import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { toGlobalId } from '../utils/id-utils';

/**
 * Node interface for Relay Global Object Identification
 * https://relay.dev/graphql/objectidentification.htm
 */
@InterfaceType()
export abstract class Node {
  /**
   * Database ID used internally - not exposed in GraphQL
   */
  databaseId: number;
  
  /**
   * Global ID that follows the Relay specification - exposed in GraphQL
   */
  @Field(() => ID)
  get id(): string {
    // Use the entity type name and database ID to create a global ID
    return toGlobalId(this.constructor.name as any, this.databaseId);
  }
}