import { Field, ID, InterfaceType } from '@nestjs/graphql';

/**
 * Node interface for Relay Global Object Identification
 * https://relay.dev/graphql/objectidentification.htm
 */
@InterfaceType()
export abstract class Node {
  @Field(() => ID)
  id: string;
}