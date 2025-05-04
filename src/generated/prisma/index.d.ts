
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model FamilyMember
 * 
 */
export type FamilyMember = $Result.DefaultSelection<Prisma.$FamilyMemberPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.familyMember`: Exposes CRUD operations for the **FamilyMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FamilyMembers
    * const familyMembers = await prisma.familyMember.findMany()
    * ```
    */
  get familyMember(): Prisma.FamilyMemberDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    FamilyMember: 'FamilyMember'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "familyMember"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      FamilyMember: {
        payload: Prisma.$FamilyMemberPayload<ExtArgs>
        fields: Prisma.FamilyMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FamilyMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FamilyMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>
          }
          findFirst: {
            args: Prisma.FamilyMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FamilyMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>
          }
          findMany: {
            args: Prisma.FamilyMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>[]
          }
          create: {
            args: Prisma.FamilyMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>
          }
          createMany: {
            args: Prisma.FamilyMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FamilyMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>[]
          }
          delete: {
            args: Prisma.FamilyMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>
          }
          update: {
            args: Prisma.FamilyMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>
          }
          deleteMany: {
            args: Prisma.FamilyMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FamilyMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FamilyMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>[]
          }
          upsert: {
            args: Prisma.FamilyMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMemberPayload>
          }
          aggregate: {
            args: Prisma.FamilyMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFamilyMember>
          }
          groupBy: {
            args: Prisma.FamilyMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<FamilyMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.FamilyMemberCountArgs<ExtArgs>
            result: $Utils.Optional<FamilyMemberCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    familyMember?: FamilyMemberOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    familyMembers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    familyMembers?: boolean | UserCountOutputTypeCountFamilyMembersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFamilyMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyMemberWhereInput
  }


  /**
   * Count Type FamilyMemberCountOutputType
   */

  export type FamilyMemberCountOutputType = {
    children1: number
    children2: number
  }

  export type FamilyMemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children1?: boolean | FamilyMemberCountOutputTypeCountChildren1Args
    children2?: boolean | FamilyMemberCountOutputTypeCountChildren2Args
  }

  // Custom InputTypes
  /**
   * FamilyMemberCountOutputType without action
   */
  export type FamilyMemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMemberCountOutputType
     */
    select?: FamilyMemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FamilyMemberCountOutputType without action
   */
  export type FamilyMemberCountOutputTypeCountChildren1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyMemberWhereInput
  }

  /**
   * FamilyMemberCountOutputType without action
   */
  export type FamilyMemberCountOutputTypeCountChildren2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyMemberWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    familyMembers?: boolean | User$familyMembersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    familyMembers?: boolean | User$familyMembersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      familyMembers: Prisma.$FamilyMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    familyMembers<T extends User$familyMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$familyMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.familyMembers
   */
  export type User$familyMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    where?: FamilyMemberWhereInput
    orderBy?: FamilyMemberOrderByWithRelationInput | FamilyMemberOrderByWithRelationInput[]
    cursor?: FamilyMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FamilyMemberScalarFieldEnum | FamilyMemberScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model FamilyMember
   */

  export type AggregateFamilyMember = {
    _count: FamilyMemberCountAggregateOutputType | null
    _min: FamilyMemberMinAggregateOutputType | null
    _max: FamilyMemberMaxAggregateOutputType | null
  }

  export type FamilyMemberMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    gender: string | null
    birthDate: Date | null
    deathDate: Date | null
    birthPlace: string | null
    pictureUrl: string | null
    parentId1: string | null
    parentId2: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type FamilyMemberMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    gender: string | null
    birthDate: Date | null
    deathDate: Date | null
    birthPlace: string | null
    pictureUrl: string | null
    parentId1: string | null
    parentId2: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type FamilyMemberCountAggregateOutputType = {
    id: number
    fullName: number
    gender: number
    birthDate: number
    deathDate: number
    birthPlace: number
    pictureUrl: number
    parentId1: number
    parentId2: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type FamilyMemberMinAggregateInputType = {
    id?: true
    fullName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    birthPlace?: true
    pictureUrl?: true
    parentId1?: true
    parentId2?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type FamilyMemberMaxAggregateInputType = {
    id?: true
    fullName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    birthPlace?: true
    pictureUrl?: true
    parentId1?: true
    parentId2?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type FamilyMemberCountAggregateInputType = {
    id?: true
    fullName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    birthPlace?: true
    pictureUrl?: true
    parentId1?: true
    parentId2?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type FamilyMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FamilyMember to aggregate.
     */
    where?: FamilyMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FamilyMembers to fetch.
     */
    orderBy?: FamilyMemberOrderByWithRelationInput | FamilyMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FamilyMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FamilyMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FamilyMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FamilyMembers
    **/
    _count?: true | FamilyMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FamilyMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FamilyMemberMaxAggregateInputType
  }

  export type GetFamilyMemberAggregateType<T extends FamilyMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateFamilyMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFamilyMember[P]>
      : GetScalarType<T[P], AggregateFamilyMember[P]>
  }




  export type FamilyMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyMemberWhereInput
    orderBy?: FamilyMemberOrderByWithAggregationInput | FamilyMemberOrderByWithAggregationInput[]
    by: FamilyMemberScalarFieldEnum[] | FamilyMemberScalarFieldEnum
    having?: FamilyMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FamilyMemberCountAggregateInputType | true
    _min?: FamilyMemberMinAggregateInputType
    _max?: FamilyMemberMaxAggregateInputType
  }

  export type FamilyMemberGroupByOutputType = {
    id: string
    fullName: string
    gender: string
    birthDate: Date | null
    deathDate: Date | null
    birthPlace: string | null
    pictureUrl: string | null
    parentId1: string | null
    parentId2: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: FamilyMemberCountAggregateOutputType | null
    _min: FamilyMemberMinAggregateOutputType | null
    _max: FamilyMemberMaxAggregateOutputType | null
  }

  type GetFamilyMemberGroupByPayload<T extends FamilyMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FamilyMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FamilyMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FamilyMemberGroupByOutputType[P]>
            : GetScalarType<T[P], FamilyMemberGroupByOutputType[P]>
        }
      >
    >


  export type FamilyMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    birthPlace?: boolean
    pictureUrl?: boolean
    parentId1?: boolean
    parentId2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    children1?: boolean | FamilyMember$children1Args<ExtArgs>
    children2?: boolean | FamilyMember$children2Args<ExtArgs>
    parent1?: boolean | FamilyMember$parent1Args<ExtArgs>
    parent2?: boolean | FamilyMember$parent2Args<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | FamilyMemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["familyMember"]>

  export type FamilyMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    birthPlace?: boolean
    pictureUrl?: boolean
    parentId1?: boolean
    parentId2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    parent1?: boolean | FamilyMember$parent1Args<ExtArgs>
    parent2?: boolean | FamilyMember$parent2Args<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["familyMember"]>

  export type FamilyMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    birthPlace?: boolean
    pictureUrl?: boolean
    parentId1?: boolean
    parentId2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    parent1?: boolean | FamilyMember$parent1Args<ExtArgs>
    parent2?: boolean | FamilyMember$parent2Args<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["familyMember"]>

  export type FamilyMemberSelectScalar = {
    id?: boolean
    fullName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    birthPlace?: boolean
    pictureUrl?: boolean
    parentId1?: boolean
    parentId2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type FamilyMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "gender" | "birthDate" | "deathDate" | "birthPlace" | "pictureUrl" | "parentId1" | "parentId2" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["familyMember"]>
  export type FamilyMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children1?: boolean | FamilyMember$children1Args<ExtArgs>
    children2?: boolean | FamilyMember$children2Args<ExtArgs>
    parent1?: boolean | FamilyMember$parent1Args<ExtArgs>
    parent2?: boolean | FamilyMember$parent2Args<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | FamilyMemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FamilyMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent1?: boolean | FamilyMember$parent1Args<ExtArgs>
    parent2?: boolean | FamilyMember$parent2Args<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FamilyMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent1?: boolean | FamilyMember$parent1Args<ExtArgs>
    parent2?: boolean | FamilyMember$parent2Args<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FamilyMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FamilyMember"
    objects: {
      children1: Prisma.$FamilyMemberPayload<ExtArgs>[]
      children2: Prisma.$FamilyMemberPayload<ExtArgs>[]
      parent1: Prisma.$FamilyMemberPayload<ExtArgs> | null
      parent2: Prisma.$FamilyMemberPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      gender: string
      birthDate: Date | null
      deathDate: Date | null
      birthPlace: string | null
      pictureUrl: string | null
      parentId1: string | null
      parentId2: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["familyMember"]>
    composites: {}
  }

  type FamilyMemberGetPayload<S extends boolean | null | undefined | FamilyMemberDefaultArgs> = $Result.GetResult<Prisma.$FamilyMemberPayload, S>

  type FamilyMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FamilyMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FamilyMemberCountAggregateInputType | true
    }

  export interface FamilyMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FamilyMember'], meta: { name: 'FamilyMember' } }
    /**
     * Find zero or one FamilyMember that matches the filter.
     * @param {FamilyMemberFindUniqueArgs} args - Arguments to find a FamilyMember
     * @example
     * // Get one FamilyMember
     * const familyMember = await prisma.familyMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FamilyMemberFindUniqueArgs>(args: SelectSubset<T, FamilyMemberFindUniqueArgs<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FamilyMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FamilyMemberFindUniqueOrThrowArgs} args - Arguments to find a FamilyMember
     * @example
     * // Get one FamilyMember
     * const familyMember = await prisma.familyMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FamilyMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, FamilyMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FamilyMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMemberFindFirstArgs} args - Arguments to find a FamilyMember
     * @example
     * // Get one FamilyMember
     * const familyMember = await prisma.familyMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FamilyMemberFindFirstArgs>(args?: SelectSubset<T, FamilyMemberFindFirstArgs<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FamilyMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMemberFindFirstOrThrowArgs} args - Arguments to find a FamilyMember
     * @example
     * // Get one FamilyMember
     * const familyMember = await prisma.familyMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FamilyMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, FamilyMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FamilyMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FamilyMembers
     * const familyMembers = await prisma.familyMember.findMany()
     * 
     * // Get first 10 FamilyMembers
     * const familyMembers = await prisma.familyMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const familyMemberWithIdOnly = await prisma.familyMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FamilyMemberFindManyArgs>(args?: SelectSubset<T, FamilyMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FamilyMember.
     * @param {FamilyMemberCreateArgs} args - Arguments to create a FamilyMember.
     * @example
     * // Create one FamilyMember
     * const FamilyMember = await prisma.familyMember.create({
     *   data: {
     *     // ... data to create a FamilyMember
     *   }
     * })
     * 
     */
    create<T extends FamilyMemberCreateArgs>(args: SelectSubset<T, FamilyMemberCreateArgs<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FamilyMembers.
     * @param {FamilyMemberCreateManyArgs} args - Arguments to create many FamilyMembers.
     * @example
     * // Create many FamilyMembers
     * const familyMember = await prisma.familyMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FamilyMemberCreateManyArgs>(args?: SelectSubset<T, FamilyMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FamilyMembers and returns the data saved in the database.
     * @param {FamilyMemberCreateManyAndReturnArgs} args - Arguments to create many FamilyMembers.
     * @example
     * // Create many FamilyMembers
     * const familyMember = await prisma.familyMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FamilyMembers and only return the `id`
     * const familyMemberWithIdOnly = await prisma.familyMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FamilyMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, FamilyMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FamilyMember.
     * @param {FamilyMemberDeleteArgs} args - Arguments to delete one FamilyMember.
     * @example
     * // Delete one FamilyMember
     * const FamilyMember = await prisma.familyMember.delete({
     *   where: {
     *     // ... filter to delete one FamilyMember
     *   }
     * })
     * 
     */
    delete<T extends FamilyMemberDeleteArgs>(args: SelectSubset<T, FamilyMemberDeleteArgs<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FamilyMember.
     * @param {FamilyMemberUpdateArgs} args - Arguments to update one FamilyMember.
     * @example
     * // Update one FamilyMember
     * const familyMember = await prisma.familyMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FamilyMemberUpdateArgs>(args: SelectSubset<T, FamilyMemberUpdateArgs<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FamilyMembers.
     * @param {FamilyMemberDeleteManyArgs} args - Arguments to filter FamilyMembers to delete.
     * @example
     * // Delete a few FamilyMembers
     * const { count } = await prisma.familyMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FamilyMemberDeleteManyArgs>(args?: SelectSubset<T, FamilyMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FamilyMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FamilyMembers
     * const familyMember = await prisma.familyMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FamilyMemberUpdateManyArgs>(args: SelectSubset<T, FamilyMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FamilyMembers and returns the data updated in the database.
     * @param {FamilyMemberUpdateManyAndReturnArgs} args - Arguments to update many FamilyMembers.
     * @example
     * // Update many FamilyMembers
     * const familyMember = await prisma.familyMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FamilyMembers and only return the `id`
     * const familyMemberWithIdOnly = await prisma.familyMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FamilyMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, FamilyMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FamilyMember.
     * @param {FamilyMemberUpsertArgs} args - Arguments to update or create a FamilyMember.
     * @example
     * // Update or create a FamilyMember
     * const familyMember = await prisma.familyMember.upsert({
     *   create: {
     *     // ... data to create a FamilyMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FamilyMember we want to update
     *   }
     * })
     */
    upsert<T extends FamilyMemberUpsertArgs>(args: SelectSubset<T, FamilyMemberUpsertArgs<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FamilyMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMemberCountArgs} args - Arguments to filter FamilyMembers to count.
     * @example
     * // Count the number of FamilyMembers
     * const count = await prisma.familyMember.count({
     *   where: {
     *     // ... the filter for the FamilyMembers we want to count
     *   }
     * })
    **/
    count<T extends FamilyMemberCountArgs>(
      args?: Subset<T, FamilyMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FamilyMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FamilyMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FamilyMemberAggregateArgs>(args: Subset<T, FamilyMemberAggregateArgs>): Prisma.PrismaPromise<GetFamilyMemberAggregateType<T>>

    /**
     * Group by FamilyMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FamilyMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FamilyMemberGroupByArgs['orderBy'] }
        : { orderBy?: FamilyMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FamilyMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFamilyMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FamilyMember model
   */
  readonly fields: FamilyMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FamilyMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FamilyMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    children1<T extends FamilyMember$children1Args<ExtArgs> = {}>(args?: Subset<T, FamilyMember$children1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    children2<T extends FamilyMember$children2Args<ExtArgs> = {}>(args?: Subset<T, FamilyMember$children2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parent1<T extends FamilyMember$parent1Args<ExtArgs> = {}>(args?: Subset<T, FamilyMember$parent1Args<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    parent2<T extends FamilyMember$parent2Args<ExtArgs> = {}>(args?: Subset<T, FamilyMember$parent2Args<ExtArgs>>): Prisma__FamilyMemberClient<$Result.GetResult<Prisma.$FamilyMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FamilyMember model
   */
  interface FamilyMemberFieldRefs {
    readonly id: FieldRef<"FamilyMember", 'String'>
    readonly fullName: FieldRef<"FamilyMember", 'String'>
    readonly gender: FieldRef<"FamilyMember", 'String'>
    readonly birthDate: FieldRef<"FamilyMember", 'DateTime'>
    readonly deathDate: FieldRef<"FamilyMember", 'DateTime'>
    readonly birthPlace: FieldRef<"FamilyMember", 'String'>
    readonly pictureUrl: FieldRef<"FamilyMember", 'String'>
    readonly parentId1: FieldRef<"FamilyMember", 'String'>
    readonly parentId2: FieldRef<"FamilyMember", 'String'>
    readonly createdAt: FieldRef<"FamilyMember", 'DateTime'>
    readonly updatedAt: FieldRef<"FamilyMember", 'DateTime'>
    readonly userId: FieldRef<"FamilyMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FamilyMember findUnique
   */
  export type FamilyMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMember to fetch.
     */
    where: FamilyMemberWhereUniqueInput
  }

  /**
   * FamilyMember findUniqueOrThrow
   */
  export type FamilyMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMember to fetch.
     */
    where: FamilyMemberWhereUniqueInput
  }

  /**
   * FamilyMember findFirst
   */
  export type FamilyMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMember to fetch.
     */
    where?: FamilyMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FamilyMembers to fetch.
     */
    orderBy?: FamilyMemberOrderByWithRelationInput | FamilyMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FamilyMembers.
     */
    cursor?: FamilyMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FamilyMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FamilyMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FamilyMembers.
     */
    distinct?: FamilyMemberScalarFieldEnum | FamilyMemberScalarFieldEnum[]
  }

  /**
   * FamilyMember findFirstOrThrow
   */
  export type FamilyMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMember to fetch.
     */
    where?: FamilyMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FamilyMembers to fetch.
     */
    orderBy?: FamilyMemberOrderByWithRelationInput | FamilyMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FamilyMembers.
     */
    cursor?: FamilyMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FamilyMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FamilyMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FamilyMembers.
     */
    distinct?: FamilyMemberScalarFieldEnum | FamilyMemberScalarFieldEnum[]
  }

  /**
   * FamilyMember findMany
   */
  export type FamilyMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMembers to fetch.
     */
    where?: FamilyMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FamilyMembers to fetch.
     */
    orderBy?: FamilyMemberOrderByWithRelationInput | FamilyMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FamilyMembers.
     */
    cursor?: FamilyMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FamilyMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FamilyMembers.
     */
    skip?: number
    distinct?: FamilyMemberScalarFieldEnum | FamilyMemberScalarFieldEnum[]
  }

  /**
   * FamilyMember create
   */
  export type FamilyMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a FamilyMember.
     */
    data: XOR<FamilyMemberCreateInput, FamilyMemberUncheckedCreateInput>
  }

  /**
   * FamilyMember createMany
   */
  export type FamilyMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FamilyMembers.
     */
    data: FamilyMemberCreateManyInput | FamilyMemberCreateManyInput[]
  }

  /**
   * FamilyMember createManyAndReturn
   */
  export type FamilyMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * The data used to create many FamilyMembers.
     */
    data: FamilyMemberCreateManyInput | FamilyMemberCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FamilyMember update
   */
  export type FamilyMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a FamilyMember.
     */
    data: XOR<FamilyMemberUpdateInput, FamilyMemberUncheckedUpdateInput>
    /**
     * Choose, which FamilyMember to update.
     */
    where: FamilyMemberWhereUniqueInput
  }

  /**
   * FamilyMember updateMany
   */
  export type FamilyMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FamilyMembers.
     */
    data: XOR<FamilyMemberUpdateManyMutationInput, FamilyMemberUncheckedUpdateManyInput>
    /**
     * Filter which FamilyMembers to update
     */
    where?: FamilyMemberWhereInput
    /**
     * Limit how many FamilyMembers to update.
     */
    limit?: number
  }

  /**
   * FamilyMember updateManyAndReturn
   */
  export type FamilyMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * The data used to update FamilyMembers.
     */
    data: XOR<FamilyMemberUpdateManyMutationInput, FamilyMemberUncheckedUpdateManyInput>
    /**
     * Filter which FamilyMembers to update
     */
    where?: FamilyMemberWhereInput
    /**
     * Limit how many FamilyMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FamilyMember upsert
   */
  export type FamilyMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the FamilyMember to update in case it exists.
     */
    where: FamilyMemberWhereUniqueInput
    /**
     * In case the FamilyMember found by the `where` argument doesn't exist, create a new FamilyMember with this data.
     */
    create: XOR<FamilyMemberCreateInput, FamilyMemberUncheckedCreateInput>
    /**
     * In case the FamilyMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FamilyMemberUpdateInput, FamilyMemberUncheckedUpdateInput>
  }

  /**
   * FamilyMember delete
   */
  export type FamilyMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    /**
     * Filter which FamilyMember to delete.
     */
    where: FamilyMemberWhereUniqueInput
  }

  /**
   * FamilyMember deleteMany
   */
  export type FamilyMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FamilyMembers to delete
     */
    where?: FamilyMemberWhereInput
    /**
     * Limit how many FamilyMembers to delete.
     */
    limit?: number
  }

  /**
   * FamilyMember.children1
   */
  export type FamilyMember$children1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    where?: FamilyMemberWhereInput
    orderBy?: FamilyMemberOrderByWithRelationInput | FamilyMemberOrderByWithRelationInput[]
    cursor?: FamilyMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FamilyMemberScalarFieldEnum | FamilyMemberScalarFieldEnum[]
  }

  /**
   * FamilyMember.children2
   */
  export type FamilyMember$children2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    where?: FamilyMemberWhereInput
    orderBy?: FamilyMemberOrderByWithRelationInput | FamilyMemberOrderByWithRelationInput[]
    cursor?: FamilyMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FamilyMemberScalarFieldEnum | FamilyMemberScalarFieldEnum[]
  }

  /**
   * FamilyMember.parent1
   */
  export type FamilyMember$parent1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    where?: FamilyMemberWhereInput
  }

  /**
   * FamilyMember.parent2
   */
  export type FamilyMember$parent2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
    where?: FamilyMemberWhereInput
  }

  /**
   * FamilyMember without action
   */
  export type FamilyMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMember
     */
    select?: FamilyMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMember
     */
    omit?: FamilyMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMemberInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FamilyMemberScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    gender: 'gender',
    birthDate: 'birthDate',
    deathDate: 'deathDate',
    birthPlace: 'birthPlace',
    pictureUrl: 'pictureUrl',
    parentId1: 'parentId1',
    parentId2: 'parentId2',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type FamilyMemberScalarFieldEnum = (typeof FamilyMemberScalarFieldEnum)[keyof typeof FamilyMemberScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    familyMembers?: FamilyMemberListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    familyMembers?: FamilyMemberOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    familyMembers?: FamilyMemberListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FamilyMemberWhereInput = {
    AND?: FamilyMemberWhereInput | FamilyMemberWhereInput[]
    OR?: FamilyMemberWhereInput[]
    NOT?: FamilyMemberWhereInput | FamilyMemberWhereInput[]
    id?: StringFilter<"FamilyMember"> | string
    fullName?: StringFilter<"FamilyMember"> | string
    gender?: StringFilter<"FamilyMember"> | string
    birthDate?: DateTimeNullableFilter<"FamilyMember"> | Date | string | null
    deathDate?: DateTimeNullableFilter<"FamilyMember"> | Date | string | null
    birthPlace?: StringNullableFilter<"FamilyMember"> | string | null
    pictureUrl?: StringNullableFilter<"FamilyMember"> | string | null
    parentId1?: StringNullableFilter<"FamilyMember"> | string | null
    parentId2?: StringNullableFilter<"FamilyMember"> | string | null
    createdAt?: DateTimeFilter<"FamilyMember"> | Date | string
    updatedAt?: DateTimeFilter<"FamilyMember"> | Date | string
    userId?: StringFilter<"FamilyMember"> | string
    children1?: FamilyMemberListRelationFilter
    children2?: FamilyMemberListRelationFilter
    parent1?: XOR<FamilyMemberNullableScalarRelationFilter, FamilyMemberWhereInput> | null
    parent2?: XOR<FamilyMemberNullableScalarRelationFilter, FamilyMemberWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FamilyMemberOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    deathDate?: SortOrderInput | SortOrder
    birthPlace?: SortOrderInput | SortOrder
    pictureUrl?: SortOrderInput | SortOrder
    parentId1?: SortOrderInput | SortOrder
    parentId2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    children1?: FamilyMemberOrderByRelationAggregateInput
    children2?: FamilyMemberOrderByRelationAggregateInput
    parent1?: FamilyMemberOrderByWithRelationInput
    parent2?: FamilyMemberOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type FamilyMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FamilyMemberWhereInput | FamilyMemberWhereInput[]
    OR?: FamilyMemberWhereInput[]
    NOT?: FamilyMemberWhereInput | FamilyMemberWhereInput[]
    fullName?: StringFilter<"FamilyMember"> | string
    gender?: StringFilter<"FamilyMember"> | string
    birthDate?: DateTimeNullableFilter<"FamilyMember"> | Date | string | null
    deathDate?: DateTimeNullableFilter<"FamilyMember"> | Date | string | null
    birthPlace?: StringNullableFilter<"FamilyMember"> | string | null
    pictureUrl?: StringNullableFilter<"FamilyMember"> | string | null
    parentId1?: StringNullableFilter<"FamilyMember"> | string | null
    parentId2?: StringNullableFilter<"FamilyMember"> | string | null
    createdAt?: DateTimeFilter<"FamilyMember"> | Date | string
    updatedAt?: DateTimeFilter<"FamilyMember"> | Date | string
    userId?: StringFilter<"FamilyMember"> | string
    children1?: FamilyMemberListRelationFilter
    children2?: FamilyMemberListRelationFilter
    parent1?: XOR<FamilyMemberNullableScalarRelationFilter, FamilyMemberWhereInput> | null
    parent2?: XOR<FamilyMemberNullableScalarRelationFilter, FamilyMemberWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FamilyMemberOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    deathDate?: SortOrderInput | SortOrder
    birthPlace?: SortOrderInput | SortOrder
    pictureUrl?: SortOrderInput | SortOrder
    parentId1?: SortOrderInput | SortOrder
    parentId2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: FamilyMemberCountOrderByAggregateInput
    _max?: FamilyMemberMaxOrderByAggregateInput
    _min?: FamilyMemberMinOrderByAggregateInput
  }

  export type FamilyMemberScalarWhereWithAggregatesInput = {
    AND?: FamilyMemberScalarWhereWithAggregatesInput | FamilyMemberScalarWhereWithAggregatesInput[]
    OR?: FamilyMemberScalarWhereWithAggregatesInput[]
    NOT?: FamilyMemberScalarWhereWithAggregatesInput | FamilyMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FamilyMember"> | string
    fullName?: StringWithAggregatesFilter<"FamilyMember"> | string
    gender?: StringWithAggregatesFilter<"FamilyMember"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"FamilyMember"> | Date | string | null
    deathDate?: DateTimeNullableWithAggregatesFilter<"FamilyMember"> | Date | string | null
    birthPlace?: StringNullableWithAggregatesFilter<"FamilyMember"> | string | null
    pictureUrl?: StringNullableWithAggregatesFilter<"FamilyMember"> | string | null
    parentId1?: StringNullableWithAggregatesFilter<"FamilyMember"> | string | null
    parentId2?: StringNullableWithAggregatesFilter<"FamilyMember"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FamilyMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FamilyMember"> | Date | string
    userId?: StringWithAggregatesFilter<"FamilyMember"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    familyMembers?: FamilyMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    familyMembers?: FamilyMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familyMembers?: FamilyMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familyMembers?: FamilyMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMemberCreateInput = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children1?: FamilyMemberCreateNestedManyWithoutParent1Input
    children2?: FamilyMemberCreateNestedManyWithoutParent2Input
    parent1?: FamilyMemberCreateNestedOneWithoutChildren1Input
    parent2?: FamilyMemberCreateNestedOneWithoutChildren2Input
    user: UserCreateNestedOneWithoutFamilyMembersInput
  }

  export type FamilyMemberUncheckedCreateInput = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId1?: string | null
    parentId2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    children1?: FamilyMemberUncheckedCreateNestedManyWithoutParent1Input
    children2?: FamilyMemberUncheckedCreateNestedManyWithoutParent2Input
  }

  export type FamilyMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children1?: FamilyMemberUpdateManyWithoutParent1NestedInput
    children2?: FamilyMemberUpdateManyWithoutParent2NestedInput
    parent1?: FamilyMemberUpdateOneWithoutChildren1NestedInput
    parent2?: FamilyMemberUpdateOneWithoutChildren2NestedInput
    user?: UserUpdateOneRequiredWithoutFamilyMembersNestedInput
  }

  export type FamilyMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId1?: NullableStringFieldUpdateOperationsInput | string | null
    parentId2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    children1?: FamilyMemberUncheckedUpdateManyWithoutParent1NestedInput
    children2?: FamilyMemberUncheckedUpdateManyWithoutParent2NestedInput
  }

  export type FamilyMemberCreateManyInput = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId1?: string | null
    parentId2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type FamilyMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId1?: NullableStringFieldUpdateOperationsInput | string | null
    parentId2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FamilyMemberListRelationFilter = {
    every?: FamilyMemberWhereInput
    some?: FamilyMemberWhereInput
    none?: FamilyMemberWhereInput
  }

  export type FamilyMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FamilyMemberNullableScalarRelationFilter = {
    is?: FamilyMemberWhereInput | null
    isNot?: FamilyMemberWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FamilyMemberCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    birthPlace?: SortOrder
    pictureUrl?: SortOrder
    parentId1?: SortOrder
    parentId2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type FamilyMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    birthPlace?: SortOrder
    pictureUrl?: SortOrder
    parentId1?: SortOrder
    parentId2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type FamilyMemberMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    birthPlace?: SortOrder
    pictureUrl?: SortOrder
    parentId1?: SortOrder
    parentId2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FamilyMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<FamilyMemberCreateWithoutUserInput, FamilyMemberUncheckedCreateWithoutUserInput> | FamilyMemberCreateWithoutUserInput[] | FamilyMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutUserInput | FamilyMemberCreateOrConnectWithoutUserInput[]
    createMany?: FamilyMemberCreateManyUserInputEnvelope
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
  }

  export type FamilyMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FamilyMemberCreateWithoutUserInput, FamilyMemberUncheckedCreateWithoutUserInput> | FamilyMemberCreateWithoutUserInput[] | FamilyMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutUserInput | FamilyMemberCreateOrConnectWithoutUserInput[]
    createMany?: FamilyMemberCreateManyUserInputEnvelope
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FamilyMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<FamilyMemberCreateWithoutUserInput, FamilyMemberUncheckedCreateWithoutUserInput> | FamilyMemberCreateWithoutUserInput[] | FamilyMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutUserInput | FamilyMemberCreateOrConnectWithoutUserInput[]
    upsert?: FamilyMemberUpsertWithWhereUniqueWithoutUserInput | FamilyMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FamilyMemberCreateManyUserInputEnvelope
    set?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    disconnect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    delete?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    update?: FamilyMemberUpdateWithWhereUniqueWithoutUserInput | FamilyMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FamilyMemberUpdateManyWithWhereWithoutUserInput | FamilyMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FamilyMemberScalarWhereInput | FamilyMemberScalarWhereInput[]
  }

  export type FamilyMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FamilyMemberCreateWithoutUserInput, FamilyMemberUncheckedCreateWithoutUserInput> | FamilyMemberCreateWithoutUserInput[] | FamilyMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutUserInput | FamilyMemberCreateOrConnectWithoutUserInput[]
    upsert?: FamilyMemberUpsertWithWhereUniqueWithoutUserInput | FamilyMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FamilyMemberCreateManyUserInputEnvelope
    set?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    disconnect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    delete?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    update?: FamilyMemberUpdateWithWhereUniqueWithoutUserInput | FamilyMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FamilyMemberUpdateManyWithWhereWithoutUserInput | FamilyMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FamilyMemberScalarWhereInput | FamilyMemberScalarWhereInput[]
  }

  export type FamilyMemberCreateNestedManyWithoutParent1Input = {
    create?: XOR<FamilyMemberCreateWithoutParent1Input, FamilyMemberUncheckedCreateWithoutParent1Input> | FamilyMemberCreateWithoutParent1Input[] | FamilyMemberUncheckedCreateWithoutParent1Input[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutParent1Input | FamilyMemberCreateOrConnectWithoutParent1Input[]
    createMany?: FamilyMemberCreateManyParent1InputEnvelope
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
  }

  export type FamilyMemberCreateNestedManyWithoutParent2Input = {
    create?: XOR<FamilyMemberCreateWithoutParent2Input, FamilyMemberUncheckedCreateWithoutParent2Input> | FamilyMemberCreateWithoutParent2Input[] | FamilyMemberUncheckedCreateWithoutParent2Input[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutParent2Input | FamilyMemberCreateOrConnectWithoutParent2Input[]
    createMany?: FamilyMemberCreateManyParent2InputEnvelope
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
  }

  export type FamilyMemberCreateNestedOneWithoutChildren1Input = {
    create?: XOR<FamilyMemberCreateWithoutChildren1Input, FamilyMemberUncheckedCreateWithoutChildren1Input>
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutChildren1Input
    connect?: FamilyMemberWhereUniqueInput
  }

  export type FamilyMemberCreateNestedOneWithoutChildren2Input = {
    create?: XOR<FamilyMemberCreateWithoutChildren2Input, FamilyMemberUncheckedCreateWithoutChildren2Input>
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutChildren2Input
    connect?: FamilyMemberWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFamilyMembersInput = {
    create?: XOR<UserCreateWithoutFamilyMembersInput, UserUncheckedCreateWithoutFamilyMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFamilyMembersInput
    connect?: UserWhereUniqueInput
  }

  export type FamilyMemberUncheckedCreateNestedManyWithoutParent1Input = {
    create?: XOR<FamilyMemberCreateWithoutParent1Input, FamilyMemberUncheckedCreateWithoutParent1Input> | FamilyMemberCreateWithoutParent1Input[] | FamilyMemberUncheckedCreateWithoutParent1Input[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutParent1Input | FamilyMemberCreateOrConnectWithoutParent1Input[]
    createMany?: FamilyMemberCreateManyParent1InputEnvelope
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
  }

  export type FamilyMemberUncheckedCreateNestedManyWithoutParent2Input = {
    create?: XOR<FamilyMemberCreateWithoutParent2Input, FamilyMemberUncheckedCreateWithoutParent2Input> | FamilyMemberCreateWithoutParent2Input[] | FamilyMemberUncheckedCreateWithoutParent2Input[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutParent2Input | FamilyMemberCreateOrConnectWithoutParent2Input[]
    createMany?: FamilyMemberCreateManyParent2InputEnvelope
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FamilyMemberUpdateManyWithoutParent1NestedInput = {
    create?: XOR<FamilyMemberCreateWithoutParent1Input, FamilyMemberUncheckedCreateWithoutParent1Input> | FamilyMemberCreateWithoutParent1Input[] | FamilyMemberUncheckedCreateWithoutParent1Input[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutParent1Input | FamilyMemberCreateOrConnectWithoutParent1Input[]
    upsert?: FamilyMemberUpsertWithWhereUniqueWithoutParent1Input | FamilyMemberUpsertWithWhereUniqueWithoutParent1Input[]
    createMany?: FamilyMemberCreateManyParent1InputEnvelope
    set?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    disconnect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    delete?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    update?: FamilyMemberUpdateWithWhereUniqueWithoutParent1Input | FamilyMemberUpdateWithWhereUniqueWithoutParent1Input[]
    updateMany?: FamilyMemberUpdateManyWithWhereWithoutParent1Input | FamilyMemberUpdateManyWithWhereWithoutParent1Input[]
    deleteMany?: FamilyMemberScalarWhereInput | FamilyMemberScalarWhereInput[]
  }

  export type FamilyMemberUpdateManyWithoutParent2NestedInput = {
    create?: XOR<FamilyMemberCreateWithoutParent2Input, FamilyMemberUncheckedCreateWithoutParent2Input> | FamilyMemberCreateWithoutParent2Input[] | FamilyMemberUncheckedCreateWithoutParent2Input[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutParent2Input | FamilyMemberCreateOrConnectWithoutParent2Input[]
    upsert?: FamilyMemberUpsertWithWhereUniqueWithoutParent2Input | FamilyMemberUpsertWithWhereUniqueWithoutParent2Input[]
    createMany?: FamilyMemberCreateManyParent2InputEnvelope
    set?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    disconnect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    delete?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    update?: FamilyMemberUpdateWithWhereUniqueWithoutParent2Input | FamilyMemberUpdateWithWhereUniqueWithoutParent2Input[]
    updateMany?: FamilyMemberUpdateManyWithWhereWithoutParent2Input | FamilyMemberUpdateManyWithWhereWithoutParent2Input[]
    deleteMany?: FamilyMemberScalarWhereInput | FamilyMemberScalarWhereInput[]
  }

  export type FamilyMemberUpdateOneWithoutChildren1NestedInput = {
    create?: XOR<FamilyMemberCreateWithoutChildren1Input, FamilyMemberUncheckedCreateWithoutChildren1Input>
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutChildren1Input
    upsert?: FamilyMemberUpsertWithoutChildren1Input
    disconnect?: FamilyMemberWhereInput | boolean
    delete?: FamilyMemberWhereInput | boolean
    connect?: FamilyMemberWhereUniqueInput
    update?: XOR<XOR<FamilyMemberUpdateToOneWithWhereWithoutChildren1Input, FamilyMemberUpdateWithoutChildren1Input>, FamilyMemberUncheckedUpdateWithoutChildren1Input>
  }

  export type FamilyMemberUpdateOneWithoutChildren2NestedInput = {
    create?: XOR<FamilyMemberCreateWithoutChildren2Input, FamilyMemberUncheckedCreateWithoutChildren2Input>
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutChildren2Input
    upsert?: FamilyMemberUpsertWithoutChildren2Input
    disconnect?: FamilyMemberWhereInput | boolean
    delete?: FamilyMemberWhereInput | boolean
    connect?: FamilyMemberWhereUniqueInput
    update?: XOR<XOR<FamilyMemberUpdateToOneWithWhereWithoutChildren2Input, FamilyMemberUpdateWithoutChildren2Input>, FamilyMemberUncheckedUpdateWithoutChildren2Input>
  }

  export type UserUpdateOneRequiredWithoutFamilyMembersNestedInput = {
    create?: XOR<UserCreateWithoutFamilyMembersInput, UserUncheckedCreateWithoutFamilyMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFamilyMembersInput
    upsert?: UserUpsertWithoutFamilyMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFamilyMembersInput, UserUpdateWithoutFamilyMembersInput>, UserUncheckedUpdateWithoutFamilyMembersInput>
  }

  export type FamilyMemberUncheckedUpdateManyWithoutParent1NestedInput = {
    create?: XOR<FamilyMemberCreateWithoutParent1Input, FamilyMemberUncheckedCreateWithoutParent1Input> | FamilyMemberCreateWithoutParent1Input[] | FamilyMemberUncheckedCreateWithoutParent1Input[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutParent1Input | FamilyMemberCreateOrConnectWithoutParent1Input[]
    upsert?: FamilyMemberUpsertWithWhereUniqueWithoutParent1Input | FamilyMemberUpsertWithWhereUniqueWithoutParent1Input[]
    createMany?: FamilyMemberCreateManyParent1InputEnvelope
    set?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    disconnect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    delete?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    update?: FamilyMemberUpdateWithWhereUniqueWithoutParent1Input | FamilyMemberUpdateWithWhereUniqueWithoutParent1Input[]
    updateMany?: FamilyMemberUpdateManyWithWhereWithoutParent1Input | FamilyMemberUpdateManyWithWhereWithoutParent1Input[]
    deleteMany?: FamilyMemberScalarWhereInput | FamilyMemberScalarWhereInput[]
  }

  export type FamilyMemberUncheckedUpdateManyWithoutParent2NestedInput = {
    create?: XOR<FamilyMemberCreateWithoutParent2Input, FamilyMemberUncheckedCreateWithoutParent2Input> | FamilyMemberCreateWithoutParent2Input[] | FamilyMemberUncheckedCreateWithoutParent2Input[]
    connectOrCreate?: FamilyMemberCreateOrConnectWithoutParent2Input | FamilyMemberCreateOrConnectWithoutParent2Input[]
    upsert?: FamilyMemberUpsertWithWhereUniqueWithoutParent2Input | FamilyMemberUpsertWithWhereUniqueWithoutParent2Input[]
    createMany?: FamilyMemberCreateManyParent2InputEnvelope
    set?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    disconnect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    delete?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    connect?: FamilyMemberWhereUniqueInput | FamilyMemberWhereUniqueInput[]
    update?: FamilyMemberUpdateWithWhereUniqueWithoutParent2Input | FamilyMemberUpdateWithWhereUniqueWithoutParent2Input[]
    updateMany?: FamilyMemberUpdateManyWithWhereWithoutParent2Input | FamilyMemberUpdateManyWithWhereWithoutParent2Input[]
    deleteMany?: FamilyMemberScalarWhereInput | FamilyMemberScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FamilyMemberCreateWithoutUserInput = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children1?: FamilyMemberCreateNestedManyWithoutParent1Input
    children2?: FamilyMemberCreateNestedManyWithoutParent2Input
    parent1?: FamilyMemberCreateNestedOneWithoutChildren1Input
    parent2?: FamilyMemberCreateNestedOneWithoutChildren2Input
  }

  export type FamilyMemberUncheckedCreateWithoutUserInput = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId1?: string | null
    parentId2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children1?: FamilyMemberUncheckedCreateNestedManyWithoutParent1Input
    children2?: FamilyMemberUncheckedCreateNestedManyWithoutParent2Input
  }

  export type FamilyMemberCreateOrConnectWithoutUserInput = {
    where: FamilyMemberWhereUniqueInput
    create: XOR<FamilyMemberCreateWithoutUserInput, FamilyMemberUncheckedCreateWithoutUserInput>
  }

  export type FamilyMemberCreateManyUserInputEnvelope = {
    data: FamilyMemberCreateManyUserInput | FamilyMemberCreateManyUserInput[]
  }

  export type FamilyMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: FamilyMemberWhereUniqueInput
    update: XOR<FamilyMemberUpdateWithoutUserInput, FamilyMemberUncheckedUpdateWithoutUserInput>
    create: XOR<FamilyMemberCreateWithoutUserInput, FamilyMemberUncheckedCreateWithoutUserInput>
  }

  export type FamilyMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: FamilyMemberWhereUniqueInput
    data: XOR<FamilyMemberUpdateWithoutUserInput, FamilyMemberUncheckedUpdateWithoutUserInput>
  }

  export type FamilyMemberUpdateManyWithWhereWithoutUserInput = {
    where: FamilyMemberScalarWhereInput
    data: XOR<FamilyMemberUpdateManyMutationInput, FamilyMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type FamilyMemberScalarWhereInput = {
    AND?: FamilyMemberScalarWhereInput | FamilyMemberScalarWhereInput[]
    OR?: FamilyMemberScalarWhereInput[]
    NOT?: FamilyMemberScalarWhereInput | FamilyMemberScalarWhereInput[]
    id?: StringFilter<"FamilyMember"> | string
    fullName?: StringFilter<"FamilyMember"> | string
    gender?: StringFilter<"FamilyMember"> | string
    birthDate?: DateTimeNullableFilter<"FamilyMember"> | Date | string | null
    deathDate?: DateTimeNullableFilter<"FamilyMember"> | Date | string | null
    birthPlace?: StringNullableFilter<"FamilyMember"> | string | null
    pictureUrl?: StringNullableFilter<"FamilyMember"> | string | null
    parentId1?: StringNullableFilter<"FamilyMember"> | string | null
    parentId2?: StringNullableFilter<"FamilyMember"> | string | null
    createdAt?: DateTimeFilter<"FamilyMember"> | Date | string
    updatedAt?: DateTimeFilter<"FamilyMember"> | Date | string
    userId?: StringFilter<"FamilyMember"> | string
  }

  export type FamilyMemberCreateWithoutParent1Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children1?: FamilyMemberCreateNestedManyWithoutParent1Input
    children2?: FamilyMemberCreateNestedManyWithoutParent2Input
    parent2?: FamilyMemberCreateNestedOneWithoutChildren2Input
    user: UserCreateNestedOneWithoutFamilyMembersInput
  }

  export type FamilyMemberUncheckedCreateWithoutParent1Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    children1?: FamilyMemberUncheckedCreateNestedManyWithoutParent1Input
    children2?: FamilyMemberUncheckedCreateNestedManyWithoutParent2Input
  }

  export type FamilyMemberCreateOrConnectWithoutParent1Input = {
    where: FamilyMemberWhereUniqueInput
    create: XOR<FamilyMemberCreateWithoutParent1Input, FamilyMemberUncheckedCreateWithoutParent1Input>
  }

  export type FamilyMemberCreateManyParent1InputEnvelope = {
    data: FamilyMemberCreateManyParent1Input | FamilyMemberCreateManyParent1Input[]
  }

  export type FamilyMemberCreateWithoutParent2Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children1?: FamilyMemberCreateNestedManyWithoutParent1Input
    children2?: FamilyMemberCreateNestedManyWithoutParent2Input
    parent1?: FamilyMemberCreateNestedOneWithoutChildren1Input
    user: UserCreateNestedOneWithoutFamilyMembersInput
  }

  export type FamilyMemberUncheckedCreateWithoutParent2Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId1?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    children1?: FamilyMemberUncheckedCreateNestedManyWithoutParent1Input
    children2?: FamilyMemberUncheckedCreateNestedManyWithoutParent2Input
  }

  export type FamilyMemberCreateOrConnectWithoutParent2Input = {
    where: FamilyMemberWhereUniqueInput
    create: XOR<FamilyMemberCreateWithoutParent2Input, FamilyMemberUncheckedCreateWithoutParent2Input>
  }

  export type FamilyMemberCreateManyParent2InputEnvelope = {
    data: FamilyMemberCreateManyParent2Input | FamilyMemberCreateManyParent2Input[]
  }

  export type FamilyMemberCreateWithoutChildren1Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children2?: FamilyMemberCreateNestedManyWithoutParent2Input
    parent1?: FamilyMemberCreateNestedOneWithoutChildren1Input
    parent2?: FamilyMemberCreateNestedOneWithoutChildren2Input
    user: UserCreateNestedOneWithoutFamilyMembersInput
  }

  export type FamilyMemberUncheckedCreateWithoutChildren1Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId1?: string | null
    parentId2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    children2?: FamilyMemberUncheckedCreateNestedManyWithoutParent2Input
  }

  export type FamilyMemberCreateOrConnectWithoutChildren1Input = {
    where: FamilyMemberWhereUniqueInput
    create: XOR<FamilyMemberCreateWithoutChildren1Input, FamilyMemberUncheckedCreateWithoutChildren1Input>
  }

  export type FamilyMemberCreateWithoutChildren2Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children1?: FamilyMemberCreateNestedManyWithoutParent1Input
    parent1?: FamilyMemberCreateNestedOneWithoutChildren1Input
    parent2?: FamilyMemberCreateNestedOneWithoutChildren2Input
    user: UserCreateNestedOneWithoutFamilyMembersInput
  }

  export type FamilyMemberUncheckedCreateWithoutChildren2Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId1?: string | null
    parentId2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    children1?: FamilyMemberUncheckedCreateNestedManyWithoutParent1Input
  }

  export type FamilyMemberCreateOrConnectWithoutChildren2Input = {
    where: FamilyMemberWhereUniqueInput
    create: XOR<FamilyMemberCreateWithoutChildren2Input, FamilyMemberUncheckedCreateWithoutChildren2Input>
  }

  export type UserCreateWithoutFamilyMembersInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutFamilyMembersInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutFamilyMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFamilyMembersInput, UserUncheckedCreateWithoutFamilyMembersInput>
  }

  export type FamilyMemberUpsertWithWhereUniqueWithoutParent1Input = {
    where: FamilyMemberWhereUniqueInput
    update: XOR<FamilyMemberUpdateWithoutParent1Input, FamilyMemberUncheckedUpdateWithoutParent1Input>
    create: XOR<FamilyMemberCreateWithoutParent1Input, FamilyMemberUncheckedCreateWithoutParent1Input>
  }

  export type FamilyMemberUpdateWithWhereUniqueWithoutParent1Input = {
    where: FamilyMemberWhereUniqueInput
    data: XOR<FamilyMemberUpdateWithoutParent1Input, FamilyMemberUncheckedUpdateWithoutParent1Input>
  }

  export type FamilyMemberUpdateManyWithWhereWithoutParent1Input = {
    where: FamilyMemberScalarWhereInput
    data: XOR<FamilyMemberUpdateManyMutationInput, FamilyMemberUncheckedUpdateManyWithoutParent1Input>
  }

  export type FamilyMemberUpsertWithWhereUniqueWithoutParent2Input = {
    where: FamilyMemberWhereUniqueInput
    update: XOR<FamilyMemberUpdateWithoutParent2Input, FamilyMemberUncheckedUpdateWithoutParent2Input>
    create: XOR<FamilyMemberCreateWithoutParent2Input, FamilyMemberUncheckedCreateWithoutParent2Input>
  }

  export type FamilyMemberUpdateWithWhereUniqueWithoutParent2Input = {
    where: FamilyMemberWhereUniqueInput
    data: XOR<FamilyMemberUpdateWithoutParent2Input, FamilyMemberUncheckedUpdateWithoutParent2Input>
  }

  export type FamilyMemberUpdateManyWithWhereWithoutParent2Input = {
    where: FamilyMemberScalarWhereInput
    data: XOR<FamilyMemberUpdateManyMutationInput, FamilyMemberUncheckedUpdateManyWithoutParent2Input>
  }

  export type FamilyMemberUpsertWithoutChildren1Input = {
    update: XOR<FamilyMemberUpdateWithoutChildren1Input, FamilyMemberUncheckedUpdateWithoutChildren1Input>
    create: XOR<FamilyMemberCreateWithoutChildren1Input, FamilyMemberUncheckedCreateWithoutChildren1Input>
    where?: FamilyMemberWhereInput
  }

  export type FamilyMemberUpdateToOneWithWhereWithoutChildren1Input = {
    where?: FamilyMemberWhereInput
    data: XOR<FamilyMemberUpdateWithoutChildren1Input, FamilyMemberUncheckedUpdateWithoutChildren1Input>
  }

  export type FamilyMemberUpdateWithoutChildren1Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children2?: FamilyMemberUpdateManyWithoutParent2NestedInput
    parent1?: FamilyMemberUpdateOneWithoutChildren1NestedInput
    parent2?: FamilyMemberUpdateOneWithoutChildren2NestedInput
    user?: UserUpdateOneRequiredWithoutFamilyMembersNestedInput
  }

  export type FamilyMemberUncheckedUpdateWithoutChildren1Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId1?: NullableStringFieldUpdateOperationsInput | string | null
    parentId2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    children2?: FamilyMemberUncheckedUpdateManyWithoutParent2NestedInput
  }

  export type FamilyMemberUpsertWithoutChildren2Input = {
    update: XOR<FamilyMemberUpdateWithoutChildren2Input, FamilyMemberUncheckedUpdateWithoutChildren2Input>
    create: XOR<FamilyMemberCreateWithoutChildren2Input, FamilyMemberUncheckedCreateWithoutChildren2Input>
    where?: FamilyMemberWhereInput
  }

  export type FamilyMemberUpdateToOneWithWhereWithoutChildren2Input = {
    where?: FamilyMemberWhereInput
    data: XOR<FamilyMemberUpdateWithoutChildren2Input, FamilyMemberUncheckedUpdateWithoutChildren2Input>
  }

  export type FamilyMemberUpdateWithoutChildren2Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children1?: FamilyMemberUpdateManyWithoutParent1NestedInput
    parent1?: FamilyMemberUpdateOneWithoutChildren1NestedInput
    parent2?: FamilyMemberUpdateOneWithoutChildren2NestedInput
    user?: UserUpdateOneRequiredWithoutFamilyMembersNestedInput
  }

  export type FamilyMemberUncheckedUpdateWithoutChildren2Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId1?: NullableStringFieldUpdateOperationsInput | string | null
    parentId2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    children1?: FamilyMemberUncheckedUpdateManyWithoutParent1NestedInput
  }

  export type UserUpsertWithoutFamilyMembersInput = {
    update: XOR<UserUpdateWithoutFamilyMembersInput, UserUncheckedUpdateWithoutFamilyMembersInput>
    create: XOR<UserCreateWithoutFamilyMembersInput, UserUncheckedCreateWithoutFamilyMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFamilyMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFamilyMembersInput, UserUncheckedUpdateWithoutFamilyMembersInput>
  }

  export type UserUpdateWithoutFamilyMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutFamilyMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMemberCreateManyUserInput = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId1?: string | null
    parentId2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FamilyMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children1?: FamilyMemberUpdateManyWithoutParent1NestedInput
    children2?: FamilyMemberUpdateManyWithoutParent2NestedInput
    parent1?: FamilyMemberUpdateOneWithoutChildren1NestedInput
    parent2?: FamilyMemberUpdateOneWithoutChildren2NestedInput
  }

  export type FamilyMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId1?: NullableStringFieldUpdateOperationsInput | string | null
    parentId2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children1?: FamilyMemberUncheckedUpdateManyWithoutParent1NestedInput
    children2?: FamilyMemberUncheckedUpdateManyWithoutParent2NestedInput
  }

  export type FamilyMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId1?: NullableStringFieldUpdateOperationsInput | string | null
    parentId2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMemberCreateManyParent1Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type FamilyMemberCreateManyParent2Input = {
    id?: string
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    pictureUrl?: string | null
    parentId1?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type FamilyMemberUpdateWithoutParent1Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children1?: FamilyMemberUpdateManyWithoutParent1NestedInput
    children2?: FamilyMemberUpdateManyWithoutParent2NestedInput
    parent2?: FamilyMemberUpdateOneWithoutChildren2NestedInput
    user?: UserUpdateOneRequiredWithoutFamilyMembersNestedInput
  }

  export type FamilyMemberUncheckedUpdateWithoutParent1Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    children1?: FamilyMemberUncheckedUpdateManyWithoutParent1NestedInput
    children2?: FamilyMemberUncheckedUpdateManyWithoutParent2NestedInput
  }

  export type FamilyMemberUncheckedUpdateManyWithoutParent1Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FamilyMemberUpdateWithoutParent2Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children1?: FamilyMemberUpdateManyWithoutParent1NestedInput
    children2?: FamilyMemberUpdateManyWithoutParent2NestedInput
    parent1?: FamilyMemberUpdateOneWithoutChildren1NestedInput
    user?: UserUpdateOneRequiredWithoutFamilyMembersNestedInput
  }

  export type FamilyMemberUncheckedUpdateWithoutParent2Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId1?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    children1?: FamilyMemberUncheckedUpdateManyWithoutParent1NestedInput
    children2?: FamilyMemberUncheckedUpdateManyWithoutParent2NestedInput
  }

  export type FamilyMemberUncheckedUpdateManyWithoutParent2Input = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    pictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    parentId1?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}