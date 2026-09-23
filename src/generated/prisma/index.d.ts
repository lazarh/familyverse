
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
 * Model Family
 * 
 */
export type Family = $Result.DefaultSelection<Prisma.$FamilyPayload>
/**
 * Model UserFamily
 * 
 */
export type UserFamily = $Result.DefaultSelection<Prisma.$UserFamilyPayload>
/**
 * Model Person
 * 
 */
export type Person = $Result.DefaultSelection<Prisma.$PersonPayload>
/**
 * Model FamilyMembership
 * 
 */
export type FamilyMembership = $Result.DefaultSelection<Prisma.$FamilyMembershipPayload>
/**
 * Model ParentChild
 * 
 */
export type ParentChild = $Result.DefaultSelection<Prisma.$ParentChildPayload>
/**
 * Model Partnership
 * 
 */
export type Partnership = $Result.DefaultSelection<Prisma.$PartnershipPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ParentRole: {
  BIOLOGICAL: 'BIOLOGICAL',
  ADOPTIVE: 'ADOPTIVE',
  STEP: 'STEP',
  FOSTER: 'FOSTER',
  LEGAL_GUARDIAN: 'LEGAL_GUARDIAN'
};

export type ParentRole = (typeof ParentRole)[keyof typeof ParentRole]


export const PartnershipKind: {
  MARRIED: 'MARRIED',
  CIVIL_UNION: 'CIVIL_UNION',
  COHABITATION: 'COHABITATION'
};

export type PartnershipKind = (typeof PartnershipKind)[keyof typeof PartnershipKind]

}

export type ParentRole = $Enums.ParentRole

export const ParentRole: typeof $Enums.ParentRole

export type PartnershipKind = $Enums.PartnershipKind

export const PartnershipKind: typeof $Enums.PartnershipKind

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
   * `prisma.family`: Exposes CRUD operations for the **Family** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Families
    * const families = await prisma.family.findMany()
    * ```
    */
  get family(): Prisma.FamilyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userFamily`: Exposes CRUD operations for the **UserFamily** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserFamilies
    * const userFamilies = await prisma.userFamily.findMany()
    * ```
    */
  get userFamily(): Prisma.UserFamilyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.person`: Exposes CRUD operations for the **Person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.person.findMany()
    * ```
    */
  get person(): Prisma.PersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.familyMembership`: Exposes CRUD operations for the **FamilyMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FamilyMemberships
    * const familyMemberships = await prisma.familyMembership.findMany()
    * ```
    */
  get familyMembership(): Prisma.FamilyMembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parentChild`: Exposes CRUD operations for the **ParentChild** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParentChildren
    * const parentChildren = await prisma.parentChild.findMany()
    * ```
    */
  get parentChild(): Prisma.ParentChildDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.partnership`: Exposes CRUD operations for the **Partnership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Partnerships
    * const partnerships = await prisma.partnership.findMany()
    * ```
    */
  get partnership(): Prisma.PartnershipDelegate<ExtArgs, ClientOptions>;
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
    Family: 'Family',
    UserFamily: 'UserFamily',
    Person: 'Person',
    FamilyMembership: 'FamilyMembership',
    ParentChild: 'ParentChild',
    Partnership: 'Partnership'
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
      modelProps: "user" | "family" | "userFamily" | "person" | "familyMembership" | "parentChild" | "partnership"
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
      Family: {
        payload: Prisma.$FamilyPayload<ExtArgs>
        fields: Prisma.FamilyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FamilyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FamilyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          findFirst: {
            args: Prisma.FamilyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FamilyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          findMany: {
            args: Prisma.FamilyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          create: {
            args: Prisma.FamilyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          createMany: {
            args: Prisma.FamilyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FamilyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          delete: {
            args: Prisma.FamilyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          update: {
            args: Prisma.FamilyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          deleteMany: {
            args: Prisma.FamilyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FamilyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FamilyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          upsert: {
            args: Prisma.FamilyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          aggregate: {
            args: Prisma.FamilyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFamily>
          }
          groupBy: {
            args: Prisma.FamilyGroupByArgs<ExtArgs>
            result: $Utils.Optional<FamilyGroupByOutputType>[]
          }
          count: {
            args: Prisma.FamilyCountArgs<ExtArgs>
            result: $Utils.Optional<FamilyCountAggregateOutputType> | number
          }
        }
      }
      UserFamily: {
        payload: Prisma.$UserFamilyPayload<ExtArgs>
        fields: Prisma.UserFamilyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFamilyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFamilyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>
          }
          findFirst: {
            args: Prisma.UserFamilyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFamilyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>
          }
          findMany: {
            args: Prisma.UserFamilyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>[]
          }
          create: {
            args: Prisma.UserFamilyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>
          }
          createMany: {
            args: Prisma.UserFamilyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserFamilyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>[]
          }
          delete: {
            args: Prisma.UserFamilyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>
          }
          update: {
            args: Prisma.UserFamilyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>
          }
          deleteMany: {
            args: Prisma.UserFamilyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserFamilyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserFamilyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>[]
          }
          upsert: {
            args: Prisma.UserFamilyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFamilyPayload>
          }
          aggregate: {
            args: Prisma.UserFamilyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserFamily>
          }
          groupBy: {
            args: Prisma.UserFamilyGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserFamilyGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserFamilyCountArgs<ExtArgs>
            result: $Utils.Optional<UserFamilyCountAggregateOutputType> | number
          }
        }
      }
      Person: {
        payload: Prisma.$PersonPayload<ExtArgs>
        fields: Prisma.PersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findFirst: {
            args: Prisma.PersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findMany: {
            args: Prisma.PersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          create: {
            args: Prisma.PersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          createMany: {
            args: Prisma.PersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          delete: {
            args: Prisma.PersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          update: {
            args: Prisma.PersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          deleteMany: {
            args: Prisma.PersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          upsert: {
            args: Prisma.PersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          aggregate: {
            args: Prisma.PersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePerson>
          }
          groupBy: {
            args: Prisma.PersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonCountArgs<ExtArgs>
            result: $Utils.Optional<PersonCountAggregateOutputType> | number
          }
        }
      }
      FamilyMembership: {
        payload: Prisma.$FamilyMembershipPayload<ExtArgs>
        fields: Prisma.FamilyMembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FamilyMembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FamilyMembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>
          }
          findFirst: {
            args: Prisma.FamilyMembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FamilyMembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>
          }
          findMany: {
            args: Prisma.FamilyMembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>[]
          }
          create: {
            args: Prisma.FamilyMembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>
          }
          createMany: {
            args: Prisma.FamilyMembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FamilyMembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>[]
          }
          delete: {
            args: Prisma.FamilyMembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>
          }
          update: {
            args: Prisma.FamilyMembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>
          }
          deleteMany: {
            args: Prisma.FamilyMembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FamilyMembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FamilyMembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>[]
          }
          upsert: {
            args: Prisma.FamilyMembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyMembershipPayload>
          }
          aggregate: {
            args: Prisma.FamilyMembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFamilyMembership>
          }
          groupBy: {
            args: Prisma.FamilyMembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<FamilyMembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.FamilyMembershipCountArgs<ExtArgs>
            result: $Utils.Optional<FamilyMembershipCountAggregateOutputType> | number
          }
        }
      }
      ParentChild: {
        payload: Prisma.$ParentChildPayload<ExtArgs>
        fields: Prisma.ParentChildFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParentChildFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParentChildFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>
          }
          findFirst: {
            args: Prisma.ParentChildFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParentChildFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>
          }
          findMany: {
            args: Prisma.ParentChildFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>[]
          }
          create: {
            args: Prisma.ParentChildCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>
          }
          createMany: {
            args: Prisma.ParentChildCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParentChildCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>[]
          }
          delete: {
            args: Prisma.ParentChildDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>
          }
          update: {
            args: Prisma.ParentChildUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>
          }
          deleteMany: {
            args: Prisma.ParentChildDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParentChildUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParentChildUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>[]
          }
          upsert: {
            args: Prisma.ParentChildUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentChildPayload>
          }
          aggregate: {
            args: Prisma.ParentChildAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParentChild>
          }
          groupBy: {
            args: Prisma.ParentChildGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParentChildGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParentChildCountArgs<ExtArgs>
            result: $Utils.Optional<ParentChildCountAggregateOutputType> | number
          }
        }
      }
      Partnership: {
        payload: Prisma.$PartnershipPayload<ExtArgs>
        fields: Prisma.PartnershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>
          }
          findFirst: {
            args: Prisma.PartnershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>
          }
          findMany: {
            args: Prisma.PartnershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>[]
          }
          create: {
            args: Prisma.PartnershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>
          }
          createMany: {
            args: Prisma.PartnershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>[]
          }
          delete: {
            args: Prisma.PartnershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>
          }
          update: {
            args: Prisma.PartnershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>
          }
          deleteMany: {
            args: Prisma.PartnershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartnershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>[]
          }
          upsert: {
            args: Prisma.PartnershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnershipPayload>
          }
          aggregate: {
            args: Prisma.PartnershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartnership>
          }
          groupBy: {
            args: Prisma.PartnershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnershipCountArgs<ExtArgs>
            result: $Utils.Optional<PartnershipCountAggregateOutputType> | number
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
    family?: FamilyOmit
    userFamily?: UserFamilyOmit
    person?: PersonOmit
    familyMembership?: FamilyMembershipOmit
    parentChild?: ParentChildOmit
    partnership?: PartnershipOmit
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
    userFamilies: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userFamilies?: boolean | UserCountOutputTypeCountUserFamiliesArgs
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
  export type UserCountOutputTypeCountUserFamiliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFamilyWhereInput
  }


  /**
   * Count Type FamilyCountOutputType
   */

  export type FamilyCountOutputType = {
    memberships: number
    userFamilies: number
  }

  export type FamilyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | FamilyCountOutputTypeCountMembershipsArgs
    userFamilies?: boolean | FamilyCountOutputTypeCountUserFamiliesArgs
  }

  // Custom InputTypes
  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyCountOutputType
     */
    select?: FamilyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyMembershipWhereInput
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountUserFamiliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFamilyWhereInput
  }


  /**
   * Count Type PersonCountOutputType
   */

  export type PersonCountOutputType = {
    memberships: number
    childEdges: number
    parentEdges: number
    partnershipsA: number
    partnershipsB: number
  }

  export type PersonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | PersonCountOutputTypeCountMembershipsArgs
    childEdges?: boolean | PersonCountOutputTypeCountChildEdgesArgs
    parentEdges?: boolean | PersonCountOutputTypeCountParentEdgesArgs
    partnershipsA?: boolean | PersonCountOutputTypeCountPartnershipsAArgs
    partnershipsB?: boolean | PersonCountOutputTypeCountPartnershipsBArgs
  }

  // Custom InputTypes
  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonCountOutputType
     */
    select?: PersonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyMembershipWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountChildEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentChildWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountParentEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentChildWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountPartnershipsAArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnershipWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountPartnershipsBArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnershipWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    isConfirmed: boolean | null
    confirmationToken: string | null
    confirmationTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    isConfirmed: boolean | null
    confirmationToken: string | null
    confirmationTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    isConfirmed: number
    confirmationToken: number
    confirmationTokenExpiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    isConfirmed?: true
    confirmationToken?: true
    confirmationTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    isConfirmed?: true
    confirmationToken?: true
    confirmationTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    isConfirmed?: true
    confirmationToken?: true
    confirmationTokenExpiry?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    isConfirmed: boolean
    confirmationToken: string | null
    confirmationTokenExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    isConfirmed?: boolean
    confirmationToken?: boolean
    confirmationTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userFamilies?: boolean | User$userFamiliesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    isConfirmed?: boolean
    confirmationToken?: boolean
    confirmationTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    isConfirmed?: boolean
    confirmationToken?: boolean
    confirmationTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    isConfirmed?: boolean
    confirmationToken?: boolean
    confirmationTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "isConfirmed" | "confirmationToken" | "confirmationTokenExpiry" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userFamilies?: boolean | User$userFamiliesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      userFamilies: Prisma.$UserFamilyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      isConfirmed: boolean
      confirmationToken: string | null
      confirmationTokenExpiry: Date | null
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
    userFamilies<T extends User$userFamiliesArgs<ExtArgs> = {}>(args?: Subset<T, User$userFamiliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isConfirmed: FieldRef<"User", 'Boolean'>
    readonly confirmationToken: FieldRef<"User", 'String'>
    readonly confirmationTokenExpiry: FieldRef<"User", 'DateTime'>
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
    skipDuplicates?: boolean
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
    skipDuplicates?: boolean
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
   * User.userFamilies
   */
  export type User$userFamiliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    where?: UserFamilyWhereInput
    orderBy?: UserFamilyOrderByWithRelationInput | UserFamilyOrderByWithRelationInput[]
    cursor?: UserFamilyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserFamilyScalarFieldEnum | UserFamilyScalarFieldEnum[]
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
   * Model Family
   */

  export type AggregateFamily = {
    _count: FamilyCountAggregateOutputType | null
    _avg: FamilyAvgAggregateOutputType | null
    _sum: FamilySumAggregateOutputType | null
    _min: FamilyMinAggregateOutputType | null
    _max: FamilyMaxAggregateOutputType | null
  }

  export type FamilyAvgAggregateOutputType = {
    id: number | null
  }

  export type FamilySumAggregateOutputType = {
    id: number | null
  }

  export type FamilyMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FamilyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FamilyCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FamilyAvgAggregateInputType = {
    id?: true
  }

  export type FamilySumAggregateInputType = {
    id?: true
  }

  export type FamilyMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FamilyMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FamilyCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FamilyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Family to aggregate.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Families
    **/
    _count?: true | FamilyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FamilyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FamilySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FamilyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FamilyMaxAggregateInputType
  }

  export type GetFamilyAggregateType<T extends FamilyAggregateArgs> = {
        [P in keyof T & keyof AggregateFamily]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFamily[P]>
      : GetScalarType<T[P], AggregateFamily[P]>
  }




  export type FamilyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyWhereInput
    orderBy?: FamilyOrderByWithAggregationInput | FamilyOrderByWithAggregationInput[]
    by: FamilyScalarFieldEnum[] | FamilyScalarFieldEnum
    having?: FamilyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FamilyCountAggregateInputType | true
    _avg?: FamilyAvgAggregateInputType
    _sum?: FamilySumAggregateInputType
    _min?: FamilyMinAggregateInputType
    _max?: FamilyMaxAggregateInputType
  }

  export type FamilyGroupByOutputType = {
    id: number
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: FamilyCountAggregateOutputType | null
    _avg: FamilyAvgAggregateOutputType | null
    _sum: FamilySumAggregateOutputType | null
    _min: FamilyMinAggregateOutputType | null
    _max: FamilyMaxAggregateOutputType | null
  }

  type GetFamilyGroupByPayload<T extends FamilyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FamilyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FamilyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FamilyGroupByOutputType[P]>
            : GetScalarType<T[P], FamilyGroupByOutputType[P]>
        }
      >
    >


  export type FamilySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberships?: boolean | Family$membershipsArgs<ExtArgs>
    userFamilies?: boolean | Family$userFamiliesArgs<ExtArgs>
    _count?: boolean | FamilyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["family"]>

  export type FamilySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["family"]>

  export type FamilySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["family"]>

  export type FamilySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FamilyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["family"]>
  export type FamilyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | Family$membershipsArgs<ExtArgs>
    userFamilies?: boolean | Family$userFamiliesArgs<ExtArgs>
    _count?: boolean | FamilyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FamilyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FamilyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FamilyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Family"
    objects: {
      memberships: Prisma.$FamilyMembershipPayload<ExtArgs>[]
      userFamilies: Prisma.$UserFamilyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["family"]>
    composites: {}
  }

  type FamilyGetPayload<S extends boolean | null | undefined | FamilyDefaultArgs> = $Result.GetResult<Prisma.$FamilyPayload, S>

  type FamilyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FamilyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FamilyCountAggregateInputType | true
    }

  export interface FamilyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Family'], meta: { name: 'Family' } }
    /**
     * Find zero or one Family that matches the filter.
     * @param {FamilyFindUniqueArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FamilyFindUniqueArgs>(args: SelectSubset<T, FamilyFindUniqueArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Family that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FamilyFindUniqueOrThrowArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FamilyFindUniqueOrThrowArgs>(args: SelectSubset<T, FamilyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Family that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindFirstArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FamilyFindFirstArgs>(args?: SelectSubset<T, FamilyFindFirstArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Family that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindFirstOrThrowArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FamilyFindFirstOrThrowArgs>(args?: SelectSubset<T, FamilyFindFirstOrThrowArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Families that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Families
     * const families = await prisma.family.findMany()
     * 
     * // Get first 10 Families
     * const families = await prisma.family.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const familyWithIdOnly = await prisma.family.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FamilyFindManyArgs>(args?: SelectSubset<T, FamilyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Family.
     * @param {FamilyCreateArgs} args - Arguments to create a Family.
     * @example
     * // Create one Family
     * const Family = await prisma.family.create({
     *   data: {
     *     // ... data to create a Family
     *   }
     * })
     * 
     */
    create<T extends FamilyCreateArgs>(args: SelectSubset<T, FamilyCreateArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Families.
     * @param {FamilyCreateManyArgs} args - Arguments to create many Families.
     * @example
     * // Create many Families
     * const family = await prisma.family.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FamilyCreateManyArgs>(args?: SelectSubset<T, FamilyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Families and returns the data saved in the database.
     * @param {FamilyCreateManyAndReturnArgs} args - Arguments to create many Families.
     * @example
     * // Create many Families
     * const family = await prisma.family.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Families and only return the `id`
     * const familyWithIdOnly = await prisma.family.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FamilyCreateManyAndReturnArgs>(args?: SelectSubset<T, FamilyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Family.
     * @param {FamilyDeleteArgs} args - Arguments to delete one Family.
     * @example
     * // Delete one Family
     * const Family = await prisma.family.delete({
     *   where: {
     *     // ... filter to delete one Family
     *   }
     * })
     * 
     */
    delete<T extends FamilyDeleteArgs>(args: SelectSubset<T, FamilyDeleteArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Family.
     * @param {FamilyUpdateArgs} args - Arguments to update one Family.
     * @example
     * // Update one Family
     * const family = await prisma.family.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FamilyUpdateArgs>(args: SelectSubset<T, FamilyUpdateArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Families.
     * @param {FamilyDeleteManyArgs} args - Arguments to filter Families to delete.
     * @example
     * // Delete a few Families
     * const { count } = await prisma.family.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FamilyDeleteManyArgs>(args?: SelectSubset<T, FamilyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Families
     * const family = await prisma.family.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FamilyUpdateManyArgs>(args: SelectSubset<T, FamilyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Families and returns the data updated in the database.
     * @param {FamilyUpdateManyAndReturnArgs} args - Arguments to update many Families.
     * @example
     * // Update many Families
     * const family = await prisma.family.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Families and only return the `id`
     * const familyWithIdOnly = await prisma.family.updateManyAndReturn({
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
    updateManyAndReturn<T extends FamilyUpdateManyAndReturnArgs>(args: SelectSubset<T, FamilyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Family.
     * @param {FamilyUpsertArgs} args - Arguments to update or create a Family.
     * @example
     * // Update or create a Family
     * const family = await prisma.family.upsert({
     *   create: {
     *     // ... data to create a Family
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Family we want to update
     *   }
     * })
     */
    upsert<T extends FamilyUpsertArgs>(args: SelectSubset<T, FamilyUpsertArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyCountArgs} args - Arguments to filter Families to count.
     * @example
     * // Count the number of Families
     * const count = await prisma.family.count({
     *   where: {
     *     // ... the filter for the Families we want to count
     *   }
     * })
    **/
    count<T extends FamilyCountArgs>(
      args?: Subset<T, FamilyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FamilyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FamilyAggregateArgs>(args: Subset<T, FamilyAggregateArgs>): Prisma.PrismaPromise<GetFamilyAggregateType<T>>

    /**
     * Group by Family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyGroupByArgs} args - Group by arguments.
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
      T extends FamilyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FamilyGroupByArgs['orderBy'] }
        : { orderBy?: FamilyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FamilyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFamilyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Family model
   */
  readonly fields: FamilyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Family.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FamilyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberships<T extends Family$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Family$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userFamilies<T extends Family$userFamiliesArgs<ExtArgs> = {}>(args?: Subset<T, Family$userFamiliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Family model
   */
  interface FamilyFieldRefs {
    readonly id: FieldRef<"Family", 'Int'>
    readonly name: FieldRef<"Family", 'String'>
    readonly createdAt: FieldRef<"Family", 'DateTime'>
    readonly updatedAt: FieldRef<"Family", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Family findUnique
   */
  export type FamilyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family findUniqueOrThrow
   */
  export type FamilyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family findFirst
   */
  export type FamilyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family findFirstOrThrow
   */
  export type FamilyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family findMany
   */
  export type FamilyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Families to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family create
   */
  export type FamilyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The data needed to create a Family.
     */
    data: XOR<FamilyCreateInput, FamilyUncheckedCreateInput>
  }

  /**
   * Family createMany
   */
  export type FamilyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Families.
     */
    data: FamilyCreateManyInput | FamilyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Family createManyAndReturn
   */
  export type FamilyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * The data used to create many Families.
     */
    data: FamilyCreateManyInput | FamilyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Family update
   */
  export type FamilyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The data needed to update a Family.
     */
    data: XOR<FamilyUpdateInput, FamilyUncheckedUpdateInput>
    /**
     * Choose, which Family to update.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family updateMany
   */
  export type FamilyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Families.
     */
    data: XOR<FamilyUpdateManyMutationInput, FamilyUncheckedUpdateManyInput>
    /**
     * Filter which Families to update
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to update.
     */
    limit?: number
  }

  /**
   * Family updateManyAndReturn
   */
  export type FamilyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * The data used to update Families.
     */
    data: XOR<FamilyUpdateManyMutationInput, FamilyUncheckedUpdateManyInput>
    /**
     * Filter which Families to update
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to update.
     */
    limit?: number
  }

  /**
   * Family upsert
   */
  export type FamilyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The filter to search for the Family to update in case it exists.
     */
    where: FamilyWhereUniqueInput
    /**
     * In case the Family found by the `where` argument doesn't exist, create a new Family with this data.
     */
    create: XOR<FamilyCreateInput, FamilyUncheckedCreateInput>
    /**
     * In case the Family was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FamilyUpdateInput, FamilyUncheckedUpdateInput>
  }

  /**
   * Family delete
   */
  export type FamilyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter which Family to delete.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family deleteMany
   */
  export type FamilyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Families to delete
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to delete.
     */
    limit?: number
  }

  /**
   * Family.memberships
   */
  export type Family$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    where?: FamilyMembershipWhereInput
    orderBy?: FamilyMembershipOrderByWithRelationInput | FamilyMembershipOrderByWithRelationInput[]
    cursor?: FamilyMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FamilyMembershipScalarFieldEnum | FamilyMembershipScalarFieldEnum[]
  }

  /**
   * Family.userFamilies
   */
  export type Family$userFamiliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    where?: UserFamilyWhereInput
    orderBy?: UserFamilyOrderByWithRelationInput | UserFamilyOrderByWithRelationInput[]
    cursor?: UserFamilyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserFamilyScalarFieldEnum | UserFamilyScalarFieldEnum[]
  }

  /**
   * Family without action
   */
  export type FamilyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
  }


  /**
   * Model UserFamily
   */

  export type AggregateUserFamily = {
    _count: UserFamilyCountAggregateOutputType | null
    _avg: UserFamilyAvgAggregateOutputType | null
    _sum: UserFamilySumAggregateOutputType | null
    _min: UserFamilyMinAggregateOutputType | null
    _max: UserFamilyMaxAggregateOutputType | null
  }

  export type UserFamilyAvgAggregateOutputType = {
    userId: number | null
    familyId: number | null
  }

  export type UserFamilySumAggregateOutputType = {
    userId: number | null
    familyId: number | null
  }

  export type UserFamilyMinAggregateOutputType = {
    userId: number | null
    familyId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserFamilyMaxAggregateOutputType = {
    userId: number | null
    familyId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserFamilyCountAggregateOutputType = {
    userId: number
    familyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserFamilyAvgAggregateInputType = {
    userId?: true
    familyId?: true
  }

  export type UserFamilySumAggregateInputType = {
    userId?: true
    familyId?: true
  }

  export type UserFamilyMinAggregateInputType = {
    userId?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserFamilyMaxAggregateInputType = {
    userId?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserFamilyCountAggregateInputType = {
    userId?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserFamilyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserFamily to aggregate.
     */
    where?: UserFamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFamilies to fetch.
     */
    orderBy?: UserFamilyOrderByWithRelationInput | UserFamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserFamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFamilies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFamilies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserFamilies
    **/
    _count?: true | UserFamilyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserFamilyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserFamilySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserFamilyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserFamilyMaxAggregateInputType
  }

  export type GetUserFamilyAggregateType<T extends UserFamilyAggregateArgs> = {
        [P in keyof T & keyof AggregateUserFamily]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserFamily[P]>
      : GetScalarType<T[P], AggregateUserFamily[P]>
  }




  export type UserFamilyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFamilyWhereInput
    orderBy?: UserFamilyOrderByWithAggregationInput | UserFamilyOrderByWithAggregationInput[]
    by: UserFamilyScalarFieldEnum[] | UserFamilyScalarFieldEnum
    having?: UserFamilyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserFamilyCountAggregateInputType | true
    _avg?: UserFamilyAvgAggregateInputType
    _sum?: UserFamilySumAggregateInputType
    _min?: UserFamilyMinAggregateInputType
    _max?: UserFamilyMaxAggregateInputType
  }

  export type UserFamilyGroupByOutputType = {
    userId: number
    familyId: number
    createdAt: Date
    updatedAt: Date
    _count: UserFamilyCountAggregateOutputType | null
    _avg: UserFamilyAvgAggregateOutputType | null
    _sum: UserFamilySumAggregateOutputType | null
    _min: UserFamilyMinAggregateOutputType | null
    _max: UserFamilyMaxAggregateOutputType | null
  }

  type GetUserFamilyGroupByPayload<T extends UserFamilyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserFamilyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserFamilyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserFamilyGroupByOutputType[P]>
            : GetScalarType<T[P], UserFamilyGroupByOutputType[P]>
        }
      >
    >


  export type UserFamilySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFamily"]>

  export type UserFamilySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFamily"]>

  export type UserFamilySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFamily"]>

  export type UserFamilySelectScalar = {
    userId?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserFamilyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "familyId" | "createdAt" | "updatedAt", ExtArgs["result"]["userFamily"]>
  export type UserFamilyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type UserFamilyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type UserFamilyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $UserFamilyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserFamily"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      family: Prisma.$FamilyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: number
      familyId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userFamily"]>
    composites: {}
  }

  type UserFamilyGetPayload<S extends boolean | null | undefined | UserFamilyDefaultArgs> = $Result.GetResult<Prisma.$UserFamilyPayload, S>

  type UserFamilyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFamilyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserFamilyCountAggregateInputType | true
    }

  export interface UserFamilyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserFamily'], meta: { name: 'UserFamily' } }
    /**
     * Find zero or one UserFamily that matches the filter.
     * @param {UserFamilyFindUniqueArgs} args - Arguments to find a UserFamily
     * @example
     * // Get one UserFamily
     * const userFamily = await prisma.userFamily.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFamilyFindUniqueArgs>(args: SelectSubset<T, UserFamilyFindUniqueArgs<ExtArgs>>): Prisma__UserFamilyClient<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserFamily that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFamilyFindUniqueOrThrowArgs} args - Arguments to find a UserFamily
     * @example
     * // Get one UserFamily
     * const userFamily = await prisma.userFamily.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFamilyFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFamilyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserFamilyClient<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserFamily that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFamilyFindFirstArgs} args - Arguments to find a UserFamily
     * @example
     * // Get one UserFamily
     * const userFamily = await prisma.userFamily.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFamilyFindFirstArgs>(args?: SelectSubset<T, UserFamilyFindFirstArgs<ExtArgs>>): Prisma__UserFamilyClient<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserFamily that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFamilyFindFirstOrThrowArgs} args - Arguments to find a UserFamily
     * @example
     * // Get one UserFamily
     * const userFamily = await prisma.userFamily.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFamilyFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFamilyFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserFamilyClient<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserFamilies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFamilyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserFamilies
     * const userFamilies = await prisma.userFamily.findMany()
     * 
     * // Get first 10 UserFamilies
     * const userFamilies = await prisma.userFamily.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userFamilyWithUserIdOnly = await prisma.userFamily.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserFamilyFindManyArgs>(args?: SelectSubset<T, UserFamilyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserFamily.
     * @param {UserFamilyCreateArgs} args - Arguments to create a UserFamily.
     * @example
     * // Create one UserFamily
     * const UserFamily = await prisma.userFamily.create({
     *   data: {
     *     // ... data to create a UserFamily
     *   }
     * })
     * 
     */
    create<T extends UserFamilyCreateArgs>(args: SelectSubset<T, UserFamilyCreateArgs<ExtArgs>>): Prisma__UserFamilyClient<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserFamilies.
     * @param {UserFamilyCreateManyArgs} args - Arguments to create many UserFamilies.
     * @example
     * // Create many UserFamilies
     * const userFamily = await prisma.userFamily.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserFamilyCreateManyArgs>(args?: SelectSubset<T, UserFamilyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserFamilies and returns the data saved in the database.
     * @param {UserFamilyCreateManyAndReturnArgs} args - Arguments to create many UserFamilies.
     * @example
     * // Create many UserFamilies
     * const userFamily = await prisma.userFamily.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserFamilies and only return the `userId`
     * const userFamilyWithUserIdOnly = await prisma.userFamily.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserFamilyCreateManyAndReturnArgs>(args?: SelectSubset<T, UserFamilyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserFamily.
     * @param {UserFamilyDeleteArgs} args - Arguments to delete one UserFamily.
     * @example
     * // Delete one UserFamily
     * const UserFamily = await prisma.userFamily.delete({
     *   where: {
     *     // ... filter to delete one UserFamily
     *   }
     * })
     * 
     */
    delete<T extends UserFamilyDeleteArgs>(args: SelectSubset<T, UserFamilyDeleteArgs<ExtArgs>>): Prisma__UserFamilyClient<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserFamily.
     * @param {UserFamilyUpdateArgs} args - Arguments to update one UserFamily.
     * @example
     * // Update one UserFamily
     * const userFamily = await prisma.userFamily.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserFamilyUpdateArgs>(args: SelectSubset<T, UserFamilyUpdateArgs<ExtArgs>>): Prisma__UserFamilyClient<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserFamilies.
     * @param {UserFamilyDeleteManyArgs} args - Arguments to filter UserFamilies to delete.
     * @example
     * // Delete a few UserFamilies
     * const { count } = await prisma.userFamily.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserFamilyDeleteManyArgs>(args?: SelectSubset<T, UserFamilyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserFamilies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFamilyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserFamilies
     * const userFamily = await prisma.userFamily.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserFamilyUpdateManyArgs>(args: SelectSubset<T, UserFamilyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserFamilies and returns the data updated in the database.
     * @param {UserFamilyUpdateManyAndReturnArgs} args - Arguments to update many UserFamilies.
     * @example
     * // Update many UserFamilies
     * const userFamily = await prisma.userFamily.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserFamilies and only return the `userId`
     * const userFamilyWithUserIdOnly = await prisma.userFamily.updateManyAndReturn({
     *   select: { userId: true },
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
    updateManyAndReturn<T extends UserFamilyUpdateManyAndReturnArgs>(args: SelectSubset<T, UserFamilyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserFamily.
     * @param {UserFamilyUpsertArgs} args - Arguments to update or create a UserFamily.
     * @example
     * // Update or create a UserFamily
     * const userFamily = await prisma.userFamily.upsert({
     *   create: {
     *     // ... data to create a UserFamily
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserFamily we want to update
     *   }
     * })
     */
    upsert<T extends UserFamilyUpsertArgs>(args: SelectSubset<T, UserFamilyUpsertArgs<ExtArgs>>): Prisma__UserFamilyClient<$Result.GetResult<Prisma.$UserFamilyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserFamilies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFamilyCountArgs} args - Arguments to filter UserFamilies to count.
     * @example
     * // Count the number of UserFamilies
     * const count = await prisma.userFamily.count({
     *   where: {
     *     // ... the filter for the UserFamilies we want to count
     *   }
     * })
    **/
    count<T extends UserFamilyCountArgs>(
      args?: Subset<T, UserFamilyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserFamilyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserFamily.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFamilyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserFamilyAggregateArgs>(args: Subset<T, UserFamilyAggregateArgs>): Prisma.PrismaPromise<GetUserFamilyAggregateType<T>>

    /**
     * Group by UserFamily.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFamilyGroupByArgs} args - Group by arguments.
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
      T extends UserFamilyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserFamilyGroupByArgs['orderBy'] }
        : { orderBy?: UserFamilyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserFamilyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserFamilyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserFamily model
   */
  readonly fields: UserFamilyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserFamily.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserFamilyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserFamily model
   */
  interface UserFamilyFieldRefs {
    readonly userId: FieldRef<"UserFamily", 'Int'>
    readonly familyId: FieldRef<"UserFamily", 'Int'>
    readonly createdAt: FieldRef<"UserFamily", 'DateTime'>
    readonly updatedAt: FieldRef<"UserFamily", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserFamily findUnique
   */
  export type UserFamilyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * Filter, which UserFamily to fetch.
     */
    where: UserFamilyWhereUniqueInput
  }

  /**
   * UserFamily findUniqueOrThrow
   */
  export type UserFamilyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * Filter, which UserFamily to fetch.
     */
    where: UserFamilyWhereUniqueInput
  }

  /**
   * UserFamily findFirst
   */
  export type UserFamilyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * Filter, which UserFamily to fetch.
     */
    where?: UserFamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFamilies to fetch.
     */
    orderBy?: UserFamilyOrderByWithRelationInput | UserFamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserFamilies.
     */
    cursor?: UserFamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFamilies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFamilies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserFamilies.
     */
    distinct?: UserFamilyScalarFieldEnum | UserFamilyScalarFieldEnum[]
  }

  /**
   * UserFamily findFirstOrThrow
   */
  export type UserFamilyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * Filter, which UserFamily to fetch.
     */
    where?: UserFamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFamilies to fetch.
     */
    orderBy?: UserFamilyOrderByWithRelationInput | UserFamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserFamilies.
     */
    cursor?: UserFamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFamilies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFamilies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserFamilies.
     */
    distinct?: UserFamilyScalarFieldEnum | UserFamilyScalarFieldEnum[]
  }

  /**
   * UserFamily findMany
   */
  export type UserFamilyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * Filter, which UserFamilies to fetch.
     */
    where?: UserFamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFamilies to fetch.
     */
    orderBy?: UserFamilyOrderByWithRelationInput | UserFamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserFamilies.
     */
    cursor?: UserFamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFamilies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFamilies.
     */
    skip?: number
    distinct?: UserFamilyScalarFieldEnum | UserFamilyScalarFieldEnum[]
  }

  /**
   * UserFamily create
   */
  export type UserFamilyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * The data needed to create a UserFamily.
     */
    data: XOR<UserFamilyCreateInput, UserFamilyUncheckedCreateInput>
  }

  /**
   * UserFamily createMany
   */
  export type UserFamilyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserFamilies.
     */
    data: UserFamilyCreateManyInput | UserFamilyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserFamily createManyAndReturn
   */
  export type UserFamilyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * The data used to create many UserFamilies.
     */
    data: UserFamilyCreateManyInput | UserFamilyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserFamily update
   */
  export type UserFamilyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * The data needed to update a UserFamily.
     */
    data: XOR<UserFamilyUpdateInput, UserFamilyUncheckedUpdateInput>
    /**
     * Choose, which UserFamily to update.
     */
    where: UserFamilyWhereUniqueInput
  }

  /**
   * UserFamily updateMany
   */
  export type UserFamilyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserFamilies.
     */
    data: XOR<UserFamilyUpdateManyMutationInput, UserFamilyUncheckedUpdateManyInput>
    /**
     * Filter which UserFamilies to update
     */
    where?: UserFamilyWhereInput
    /**
     * Limit how many UserFamilies to update.
     */
    limit?: number
  }

  /**
   * UserFamily updateManyAndReturn
   */
  export type UserFamilyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * The data used to update UserFamilies.
     */
    data: XOR<UserFamilyUpdateManyMutationInput, UserFamilyUncheckedUpdateManyInput>
    /**
     * Filter which UserFamilies to update
     */
    where?: UserFamilyWhereInput
    /**
     * Limit how many UserFamilies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserFamily upsert
   */
  export type UserFamilyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * The filter to search for the UserFamily to update in case it exists.
     */
    where: UserFamilyWhereUniqueInput
    /**
     * In case the UserFamily found by the `where` argument doesn't exist, create a new UserFamily with this data.
     */
    create: XOR<UserFamilyCreateInput, UserFamilyUncheckedCreateInput>
    /**
     * In case the UserFamily was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserFamilyUpdateInput, UserFamilyUncheckedUpdateInput>
  }

  /**
   * UserFamily delete
   */
  export type UserFamilyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
    /**
     * Filter which UserFamily to delete.
     */
    where: UserFamilyWhereUniqueInput
  }

  /**
   * UserFamily deleteMany
   */
  export type UserFamilyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserFamilies to delete
     */
    where?: UserFamilyWhereInput
    /**
     * Limit how many UserFamilies to delete.
     */
    limit?: number
  }

  /**
   * UserFamily without action
   */
  export type UserFamilyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFamily
     */
    select?: UserFamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFamily
     */
    omit?: UserFamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFamilyInclude<ExtArgs> | null
  }


  /**
   * Model Person
   */

  export type AggregatePerson = {
    _count: PersonCountAggregateOutputType | null
    _avg: PersonAvgAggregateOutputType | null
    _sum: PersonSumAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  export type PersonAvgAggregateOutputType = {
    id: number | null
  }

  export type PersonSumAggregateOutputType = {
    id: number | null
  }

  export type PersonMinAggregateOutputType = {
    id: number | null
    fullName: string | null
    gender: string | null
    birthDate: Date | null
    deathDate: Date | null
    birthPlace: string | null
    bio: string | null
    picturePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonMaxAggregateOutputType = {
    id: number | null
    fullName: string | null
    gender: string | null
    birthDate: Date | null
    deathDate: Date | null
    birthPlace: string | null
    bio: string | null
    picturePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonCountAggregateOutputType = {
    id: number
    fullName: number
    gender: number
    birthDate: number
    deathDate: number
    birthPlace: number
    bio: number
    picturePath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PersonAvgAggregateInputType = {
    id?: true
  }

  export type PersonSumAggregateInputType = {
    id?: true
  }

  export type PersonMinAggregateInputType = {
    id?: true
    fullName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    birthPlace?: true
    bio?: true
    picturePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonMaxAggregateInputType = {
    id?: true
    fullName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    birthPlace?: true
    bio?: true
    picturePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonCountAggregateInputType = {
    id?: true
    fullName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    birthPlace?: true
    bio?: true
    picturePath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Person to aggregate.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned People
    **/
    _count?: true | PersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonMaxAggregateInputType
  }

  export type GetPersonAggregateType<T extends PersonAggregateArgs> = {
        [P in keyof T & keyof AggregatePerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePerson[P]>
      : GetScalarType<T[P], AggregatePerson[P]>
  }




  export type PersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithAggregationInput | PersonOrderByWithAggregationInput[]
    by: PersonScalarFieldEnum[] | PersonScalarFieldEnum
    having?: PersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonCountAggregateInputType | true
    _avg?: PersonAvgAggregateInputType
    _sum?: PersonSumAggregateInputType
    _min?: PersonMinAggregateInputType
    _max?: PersonMaxAggregateInputType
  }

  export type PersonGroupByOutputType = {
    id: number
    fullName: string
    gender: string
    birthDate: Date | null
    deathDate: Date | null
    birthPlace: string | null
    bio: string | null
    picturePath: string | null
    createdAt: Date
    updatedAt: Date
    _count: PersonCountAggregateOutputType | null
    _avg: PersonAvgAggregateOutputType | null
    _sum: PersonSumAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  type GetPersonGroupByPayload<T extends PersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonGroupByOutputType[P]>
            : GetScalarType<T[P], PersonGroupByOutputType[P]>
        }
      >
    >


  export type PersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    birthPlace?: boolean
    bio?: boolean
    picturePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberships?: boolean | Person$membershipsArgs<ExtArgs>
    childEdges?: boolean | Person$childEdgesArgs<ExtArgs>
    parentEdges?: boolean | Person$parentEdgesArgs<ExtArgs>
    partnershipsA?: boolean | Person$partnershipsAArgs<ExtArgs>
    partnershipsB?: boolean | Person$partnershipsBArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    birthPlace?: boolean
    bio?: boolean
    picturePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["person"]>

  export type PersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    birthPlace?: boolean
    bio?: boolean
    picturePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["person"]>

  export type PersonSelectScalar = {
    id?: boolean
    fullName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    birthPlace?: boolean
    bio?: boolean
    picturePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "gender" | "birthDate" | "deathDate" | "birthPlace" | "bio" | "picturePath" | "createdAt" | "updatedAt", ExtArgs["result"]["person"]>
  export type PersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | Person$membershipsArgs<ExtArgs>
    childEdges?: boolean | Person$childEdgesArgs<ExtArgs>
    parentEdges?: boolean | Person$parentEdgesArgs<ExtArgs>
    partnershipsA?: boolean | Person$partnershipsAArgs<ExtArgs>
    partnershipsB?: boolean | Person$partnershipsBArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Person"
    objects: {
      memberships: Prisma.$FamilyMembershipPayload<ExtArgs>[]
      childEdges: Prisma.$ParentChildPayload<ExtArgs>[]
      parentEdges: Prisma.$ParentChildPayload<ExtArgs>[]
      partnershipsA: Prisma.$PartnershipPayload<ExtArgs>[]
      partnershipsB: Prisma.$PartnershipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fullName: string
      gender: string
      birthDate: Date | null
      deathDate: Date | null
      birthPlace: string | null
      bio: string | null
      picturePath: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["person"]>
    composites: {}
  }

  type PersonGetPayload<S extends boolean | null | undefined | PersonDefaultArgs> = $Result.GetResult<Prisma.$PersonPayload, S>

  type PersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonCountAggregateInputType | true
    }

  export interface PersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Person'], meta: { name: 'Person' } }
    /**
     * Find zero or one Person that matches the filter.
     * @param {PersonFindUniqueArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonFindUniqueArgs>(args: SelectSubset<T, PersonFindUniqueArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Person that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonFindUniqueOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonFindFirstArgs>(args?: SelectSubset<T, PersonFindFirstArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.person.findMany()
     * 
     * // Get first 10 People
     * const people = await prisma.person.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personWithIdOnly = await prisma.person.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonFindManyArgs>(args?: SelectSubset<T, PersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Person.
     * @param {PersonCreateArgs} args - Arguments to create a Person.
     * @example
     * // Create one Person
     * const Person = await prisma.person.create({
     *   data: {
     *     // ... data to create a Person
     *   }
     * })
     * 
     */
    create<T extends PersonCreateArgs>(args: SelectSubset<T, PersonCreateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many People.
     * @param {PersonCreateManyArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonCreateManyArgs>(args?: SelectSubset<T, PersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many People and returns the data saved in the database.
     * @param {PersonCreateManyAndReturnArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many People and only return the `id`
     * const personWithIdOnly = await prisma.person.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Person.
     * @param {PersonDeleteArgs} args - Arguments to delete one Person.
     * @example
     * // Delete one Person
     * const Person = await prisma.person.delete({
     *   where: {
     *     // ... filter to delete one Person
     *   }
     * })
     * 
     */
    delete<T extends PersonDeleteArgs>(args: SelectSubset<T, PersonDeleteArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Person.
     * @param {PersonUpdateArgs} args - Arguments to update one Person.
     * @example
     * // Update one Person
     * const person = await prisma.person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonUpdateArgs>(args: SelectSubset<T, PersonUpdateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more People.
     * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonDeleteManyArgs>(args?: SelectSubset<T, PersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const person = await prisma.person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonUpdateManyArgs>(args: SelectSubset<T, PersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People and returns the data updated in the database.
     * @param {PersonUpdateManyAndReturnArgs} args - Arguments to update many People.
     * @example
     * // Update many People
     * const person = await prisma.person.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more People and only return the `id`
     * const personWithIdOnly = await prisma.person.updateManyAndReturn({
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
    updateManyAndReturn<T extends PersonUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Person.
     * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
     * @example
     * // Update or create a Person
     * const person = await prisma.person.upsert({
     *   create: {
     *     // ... data to create a Person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Person we want to update
     *   }
     * })
     */
    upsert<T extends PersonUpsertArgs>(args: SelectSubset<T, PersonUpsertArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.person.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PersonCountArgs>(
      args?: Subset<T, PersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonAggregateArgs>(args: Subset<T, PersonAggregateArgs>): Prisma.PrismaPromise<GetPersonAggregateType<T>>

    /**
     * Group by Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonGroupByArgs} args - Group by arguments.
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
      T extends PersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonGroupByArgs['orderBy'] }
        : { orderBy?: PersonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Person model
   */
  readonly fields: PersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Person.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberships<T extends Person$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Person$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    childEdges<T extends Person$childEdgesArgs<ExtArgs> = {}>(args?: Subset<T, Person$childEdgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parentEdges<T extends Person$parentEdgesArgs<ExtArgs> = {}>(args?: Subset<T, Person$parentEdgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    partnershipsA<T extends Person$partnershipsAArgs<ExtArgs> = {}>(args?: Subset<T, Person$partnershipsAArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    partnershipsB<T extends Person$partnershipsBArgs<ExtArgs> = {}>(args?: Subset<T, Person$partnershipsBArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Person model
   */
  interface PersonFieldRefs {
    readonly id: FieldRef<"Person", 'Int'>
    readonly fullName: FieldRef<"Person", 'String'>
    readonly gender: FieldRef<"Person", 'String'>
    readonly birthDate: FieldRef<"Person", 'DateTime'>
    readonly deathDate: FieldRef<"Person", 'DateTime'>
    readonly birthPlace: FieldRef<"Person", 'String'>
    readonly bio: FieldRef<"Person", 'String'>
    readonly picturePath: FieldRef<"Person", 'String'>
    readonly createdAt: FieldRef<"Person", 'DateTime'>
    readonly updatedAt: FieldRef<"Person", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Person findUnique
   */
  export type PersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findUniqueOrThrow
   */
  export type PersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findFirst
   */
  export type PersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findFirstOrThrow
   */
  export type PersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findMany
   */
  export type PersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person create
   */
  export type PersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to create a Person.
     */
    data: XOR<PersonCreateInput, PersonUncheckedCreateInput>
  }

  /**
   * Person createMany
   */
  export type PersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person createManyAndReturn
   */
  export type PersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person update
   */
  export type PersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to update a Person.
     */
    data: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
    /**
     * Choose, which Person to update.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person updateMany
   */
  export type PersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person updateManyAndReturn
   */
  export type PersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person upsert
   */
  export type PersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The filter to search for the Person to update in case it exists.
     */
    where: PersonWhereUniqueInput
    /**
     * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
     */
    create: XOR<PersonCreateInput, PersonUncheckedCreateInput>
    /**
     * In case the Person was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
  }

  /**
   * Person delete
   */
  export type PersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter which Person to delete.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person deleteMany
   */
  export type PersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which People to delete
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to delete.
     */
    limit?: number
  }

  /**
   * Person.memberships
   */
  export type Person$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    where?: FamilyMembershipWhereInput
    orderBy?: FamilyMembershipOrderByWithRelationInput | FamilyMembershipOrderByWithRelationInput[]
    cursor?: FamilyMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FamilyMembershipScalarFieldEnum | FamilyMembershipScalarFieldEnum[]
  }

  /**
   * Person.childEdges
   */
  export type Person$childEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    where?: ParentChildWhereInput
    orderBy?: ParentChildOrderByWithRelationInput | ParentChildOrderByWithRelationInput[]
    cursor?: ParentChildWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentChildScalarFieldEnum | ParentChildScalarFieldEnum[]
  }

  /**
   * Person.parentEdges
   */
  export type Person$parentEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    where?: ParentChildWhereInput
    orderBy?: ParentChildOrderByWithRelationInput | ParentChildOrderByWithRelationInput[]
    cursor?: ParentChildWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentChildScalarFieldEnum | ParentChildScalarFieldEnum[]
  }

  /**
   * Person.partnershipsA
   */
  export type Person$partnershipsAArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    where?: PartnershipWhereInput
    orderBy?: PartnershipOrderByWithRelationInput | PartnershipOrderByWithRelationInput[]
    cursor?: PartnershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartnershipScalarFieldEnum | PartnershipScalarFieldEnum[]
  }

  /**
   * Person.partnershipsB
   */
  export type Person$partnershipsBArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    where?: PartnershipWhereInput
    orderBy?: PartnershipOrderByWithRelationInput | PartnershipOrderByWithRelationInput[]
    cursor?: PartnershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartnershipScalarFieldEnum | PartnershipScalarFieldEnum[]
  }

  /**
   * Person without action
   */
  export type PersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
  }


  /**
   * Model FamilyMembership
   */

  export type AggregateFamilyMembership = {
    _count: FamilyMembershipCountAggregateOutputType | null
    _avg: FamilyMembershipAvgAggregateOutputType | null
    _sum: FamilyMembershipSumAggregateOutputType | null
    _min: FamilyMembershipMinAggregateOutputType | null
    _max: FamilyMembershipMaxAggregateOutputType | null
  }

  export type FamilyMembershipAvgAggregateOutputType = {
    personId: number | null
    familyId: number | null
  }

  export type FamilyMembershipSumAggregateOutputType = {
    personId: number | null
    familyId: number | null
  }

  export type FamilyMembershipMinAggregateOutputType = {
    personId: number | null
    familyId: number | null
    joinedAt: Date | null
  }

  export type FamilyMembershipMaxAggregateOutputType = {
    personId: number | null
    familyId: number | null
    joinedAt: Date | null
  }

  export type FamilyMembershipCountAggregateOutputType = {
    personId: number
    familyId: number
    joinedAt: number
    _all: number
  }


  export type FamilyMembershipAvgAggregateInputType = {
    personId?: true
    familyId?: true
  }

  export type FamilyMembershipSumAggregateInputType = {
    personId?: true
    familyId?: true
  }

  export type FamilyMembershipMinAggregateInputType = {
    personId?: true
    familyId?: true
    joinedAt?: true
  }

  export type FamilyMembershipMaxAggregateInputType = {
    personId?: true
    familyId?: true
    joinedAt?: true
  }

  export type FamilyMembershipCountAggregateInputType = {
    personId?: true
    familyId?: true
    joinedAt?: true
    _all?: true
  }

  export type FamilyMembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FamilyMembership to aggregate.
     */
    where?: FamilyMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FamilyMemberships to fetch.
     */
    orderBy?: FamilyMembershipOrderByWithRelationInput | FamilyMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FamilyMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FamilyMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FamilyMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FamilyMemberships
    **/
    _count?: true | FamilyMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FamilyMembershipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FamilyMembershipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FamilyMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FamilyMembershipMaxAggregateInputType
  }

  export type GetFamilyMembershipAggregateType<T extends FamilyMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateFamilyMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFamilyMembership[P]>
      : GetScalarType<T[P], AggregateFamilyMembership[P]>
  }




  export type FamilyMembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyMembershipWhereInput
    orderBy?: FamilyMembershipOrderByWithAggregationInput | FamilyMembershipOrderByWithAggregationInput[]
    by: FamilyMembershipScalarFieldEnum[] | FamilyMembershipScalarFieldEnum
    having?: FamilyMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FamilyMembershipCountAggregateInputType | true
    _avg?: FamilyMembershipAvgAggregateInputType
    _sum?: FamilyMembershipSumAggregateInputType
    _min?: FamilyMembershipMinAggregateInputType
    _max?: FamilyMembershipMaxAggregateInputType
  }

  export type FamilyMembershipGroupByOutputType = {
    personId: number
    familyId: number
    joinedAt: Date
    _count: FamilyMembershipCountAggregateOutputType | null
    _avg: FamilyMembershipAvgAggregateOutputType | null
    _sum: FamilyMembershipSumAggregateOutputType | null
    _min: FamilyMembershipMinAggregateOutputType | null
    _max: FamilyMembershipMaxAggregateOutputType | null
  }

  type GetFamilyMembershipGroupByPayload<T extends FamilyMembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FamilyMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FamilyMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FamilyMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], FamilyMembershipGroupByOutputType[P]>
        }
      >
    >


  export type FamilyMembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    personId?: boolean
    familyId?: boolean
    joinedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["familyMembership"]>

  export type FamilyMembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    personId?: boolean
    familyId?: boolean
    joinedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["familyMembership"]>

  export type FamilyMembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    personId?: boolean
    familyId?: boolean
    joinedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["familyMembership"]>

  export type FamilyMembershipSelectScalar = {
    personId?: boolean
    familyId?: boolean
    joinedAt?: boolean
  }

  export type FamilyMembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"personId" | "familyId" | "joinedAt", ExtArgs["result"]["familyMembership"]>
  export type FamilyMembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type FamilyMembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type FamilyMembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $FamilyMembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FamilyMembership"
    objects: {
      person: Prisma.$PersonPayload<ExtArgs>
      family: Prisma.$FamilyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      personId: number
      familyId: number
      joinedAt: Date
    }, ExtArgs["result"]["familyMembership"]>
    composites: {}
  }

  type FamilyMembershipGetPayload<S extends boolean | null | undefined | FamilyMembershipDefaultArgs> = $Result.GetResult<Prisma.$FamilyMembershipPayload, S>

  type FamilyMembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FamilyMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FamilyMembershipCountAggregateInputType | true
    }

  export interface FamilyMembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FamilyMembership'], meta: { name: 'FamilyMembership' } }
    /**
     * Find zero or one FamilyMembership that matches the filter.
     * @param {FamilyMembershipFindUniqueArgs} args - Arguments to find a FamilyMembership
     * @example
     * // Get one FamilyMembership
     * const familyMembership = await prisma.familyMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FamilyMembershipFindUniqueArgs>(args: SelectSubset<T, FamilyMembershipFindUniqueArgs<ExtArgs>>): Prisma__FamilyMembershipClient<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FamilyMembership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FamilyMembershipFindUniqueOrThrowArgs} args - Arguments to find a FamilyMembership
     * @example
     * // Get one FamilyMembership
     * const familyMembership = await prisma.familyMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FamilyMembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, FamilyMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FamilyMembershipClient<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FamilyMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMembershipFindFirstArgs} args - Arguments to find a FamilyMembership
     * @example
     * // Get one FamilyMembership
     * const familyMembership = await prisma.familyMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FamilyMembershipFindFirstArgs>(args?: SelectSubset<T, FamilyMembershipFindFirstArgs<ExtArgs>>): Prisma__FamilyMembershipClient<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FamilyMembership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMembershipFindFirstOrThrowArgs} args - Arguments to find a FamilyMembership
     * @example
     * // Get one FamilyMembership
     * const familyMembership = await prisma.familyMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FamilyMembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, FamilyMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__FamilyMembershipClient<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FamilyMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FamilyMemberships
     * const familyMemberships = await prisma.familyMembership.findMany()
     * 
     * // Get first 10 FamilyMemberships
     * const familyMemberships = await prisma.familyMembership.findMany({ take: 10 })
     * 
     * // Only select the `personId`
     * const familyMembershipWithPersonIdOnly = await prisma.familyMembership.findMany({ select: { personId: true } })
     * 
     */
    findMany<T extends FamilyMembershipFindManyArgs>(args?: SelectSubset<T, FamilyMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FamilyMembership.
     * @param {FamilyMembershipCreateArgs} args - Arguments to create a FamilyMembership.
     * @example
     * // Create one FamilyMembership
     * const FamilyMembership = await prisma.familyMembership.create({
     *   data: {
     *     // ... data to create a FamilyMembership
     *   }
     * })
     * 
     */
    create<T extends FamilyMembershipCreateArgs>(args: SelectSubset<T, FamilyMembershipCreateArgs<ExtArgs>>): Prisma__FamilyMembershipClient<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FamilyMemberships.
     * @param {FamilyMembershipCreateManyArgs} args - Arguments to create many FamilyMemberships.
     * @example
     * // Create many FamilyMemberships
     * const familyMembership = await prisma.familyMembership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FamilyMembershipCreateManyArgs>(args?: SelectSubset<T, FamilyMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FamilyMemberships and returns the data saved in the database.
     * @param {FamilyMembershipCreateManyAndReturnArgs} args - Arguments to create many FamilyMemberships.
     * @example
     * // Create many FamilyMemberships
     * const familyMembership = await prisma.familyMembership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FamilyMemberships and only return the `personId`
     * const familyMembershipWithPersonIdOnly = await prisma.familyMembership.createManyAndReturn({
     *   select: { personId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FamilyMembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, FamilyMembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FamilyMembership.
     * @param {FamilyMembershipDeleteArgs} args - Arguments to delete one FamilyMembership.
     * @example
     * // Delete one FamilyMembership
     * const FamilyMembership = await prisma.familyMembership.delete({
     *   where: {
     *     // ... filter to delete one FamilyMembership
     *   }
     * })
     * 
     */
    delete<T extends FamilyMembershipDeleteArgs>(args: SelectSubset<T, FamilyMembershipDeleteArgs<ExtArgs>>): Prisma__FamilyMembershipClient<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FamilyMembership.
     * @param {FamilyMembershipUpdateArgs} args - Arguments to update one FamilyMembership.
     * @example
     * // Update one FamilyMembership
     * const familyMembership = await prisma.familyMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FamilyMembershipUpdateArgs>(args: SelectSubset<T, FamilyMembershipUpdateArgs<ExtArgs>>): Prisma__FamilyMembershipClient<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FamilyMemberships.
     * @param {FamilyMembershipDeleteManyArgs} args - Arguments to filter FamilyMemberships to delete.
     * @example
     * // Delete a few FamilyMemberships
     * const { count } = await prisma.familyMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FamilyMembershipDeleteManyArgs>(args?: SelectSubset<T, FamilyMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FamilyMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FamilyMemberships
     * const familyMembership = await prisma.familyMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FamilyMembershipUpdateManyArgs>(args: SelectSubset<T, FamilyMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FamilyMemberships and returns the data updated in the database.
     * @param {FamilyMembershipUpdateManyAndReturnArgs} args - Arguments to update many FamilyMemberships.
     * @example
     * // Update many FamilyMemberships
     * const familyMembership = await prisma.familyMembership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FamilyMemberships and only return the `personId`
     * const familyMembershipWithPersonIdOnly = await prisma.familyMembership.updateManyAndReturn({
     *   select: { personId: true },
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
    updateManyAndReturn<T extends FamilyMembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, FamilyMembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FamilyMembership.
     * @param {FamilyMembershipUpsertArgs} args - Arguments to update or create a FamilyMembership.
     * @example
     * // Update or create a FamilyMembership
     * const familyMembership = await prisma.familyMembership.upsert({
     *   create: {
     *     // ... data to create a FamilyMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FamilyMembership we want to update
     *   }
     * })
     */
    upsert<T extends FamilyMembershipUpsertArgs>(args: SelectSubset<T, FamilyMembershipUpsertArgs<ExtArgs>>): Prisma__FamilyMembershipClient<$Result.GetResult<Prisma.$FamilyMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FamilyMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMembershipCountArgs} args - Arguments to filter FamilyMemberships to count.
     * @example
     * // Count the number of FamilyMemberships
     * const count = await prisma.familyMembership.count({
     *   where: {
     *     // ... the filter for the FamilyMemberships we want to count
     *   }
     * })
    **/
    count<T extends FamilyMembershipCountArgs>(
      args?: Subset<T, FamilyMembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FamilyMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FamilyMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FamilyMembershipAggregateArgs>(args: Subset<T, FamilyMembershipAggregateArgs>): Prisma.PrismaPromise<GetFamilyMembershipAggregateType<T>>

    /**
     * Group by FamilyMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyMembershipGroupByArgs} args - Group by arguments.
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
      T extends FamilyMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FamilyMembershipGroupByArgs['orderBy'] }
        : { orderBy?: FamilyMembershipGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FamilyMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFamilyMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FamilyMembership model
   */
  readonly fields: FamilyMembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FamilyMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FamilyMembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    person<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FamilyMembership model
   */
  interface FamilyMembershipFieldRefs {
    readonly personId: FieldRef<"FamilyMembership", 'Int'>
    readonly familyId: FieldRef<"FamilyMembership", 'Int'>
    readonly joinedAt: FieldRef<"FamilyMembership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FamilyMembership findUnique
   */
  export type FamilyMembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMembership to fetch.
     */
    where: FamilyMembershipWhereUniqueInput
  }

  /**
   * FamilyMembership findUniqueOrThrow
   */
  export type FamilyMembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMembership to fetch.
     */
    where: FamilyMembershipWhereUniqueInput
  }

  /**
   * FamilyMembership findFirst
   */
  export type FamilyMembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMembership to fetch.
     */
    where?: FamilyMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FamilyMemberships to fetch.
     */
    orderBy?: FamilyMembershipOrderByWithRelationInput | FamilyMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FamilyMemberships.
     */
    cursor?: FamilyMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FamilyMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FamilyMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FamilyMemberships.
     */
    distinct?: FamilyMembershipScalarFieldEnum | FamilyMembershipScalarFieldEnum[]
  }

  /**
   * FamilyMembership findFirstOrThrow
   */
  export type FamilyMembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMembership to fetch.
     */
    where?: FamilyMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FamilyMemberships to fetch.
     */
    orderBy?: FamilyMembershipOrderByWithRelationInput | FamilyMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FamilyMemberships.
     */
    cursor?: FamilyMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FamilyMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FamilyMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FamilyMemberships.
     */
    distinct?: FamilyMembershipScalarFieldEnum | FamilyMembershipScalarFieldEnum[]
  }

  /**
   * FamilyMembership findMany
   */
  export type FamilyMembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * Filter, which FamilyMemberships to fetch.
     */
    where?: FamilyMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FamilyMemberships to fetch.
     */
    orderBy?: FamilyMembershipOrderByWithRelationInput | FamilyMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FamilyMemberships.
     */
    cursor?: FamilyMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FamilyMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FamilyMemberships.
     */
    skip?: number
    distinct?: FamilyMembershipScalarFieldEnum | FamilyMembershipScalarFieldEnum[]
  }

  /**
   * FamilyMembership create
   */
  export type FamilyMembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a FamilyMembership.
     */
    data: XOR<FamilyMembershipCreateInput, FamilyMembershipUncheckedCreateInput>
  }

  /**
   * FamilyMembership createMany
   */
  export type FamilyMembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FamilyMemberships.
     */
    data: FamilyMembershipCreateManyInput | FamilyMembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FamilyMembership createManyAndReturn
   */
  export type FamilyMembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * The data used to create many FamilyMemberships.
     */
    data: FamilyMembershipCreateManyInput | FamilyMembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FamilyMembership update
   */
  export type FamilyMembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a FamilyMembership.
     */
    data: XOR<FamilyMembershipUpdateInput, FamilyMembershipUncheckedUpdateInput>
    /**
     * Choose, which FamilyMembership to update.
     */
    where: FamilyMembershipWhereUniqueInput
  }

  /**
   * FamilyMembership updateMany
   */
  export type FamilyMembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FamilyMemberships.
     */
    data: XOR<FamilyMembershipUpdateManyMutationInput, FamilyMembershipUncheckedUpdateManyInput>
    /**
     * Filter which FamilyMemberships to update
     */
    where?: FamilyMembershipWhereInput
    /**
     * Limit how many FamilyMemberships to update.
     */
    limit?: number
  }

  /**
   * FamilyMembership updateManyAndReturn
   */
  export type FamilyMembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * The data used to update FamilyMemberships.
     */
    data: XOR<FamilyMembershipUpdateManyMutationInput, FamilyMembershipUncheckedUpdateManyInput>
    /**
     * Filter which FamilyMemberships to update
     */
    where?: FamilyMembershipWhereInput
    /**
     * Limit how many FamilyMemberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FamilyMembership upsert
   */
  export type FamilyMembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the FamilyMembership to update in case it exists.
     */
    where: FamilyMembershipWhereUniqueInput
    /**
     * In case the FamilyMembership found by the `where` argument doesn't exist, create a new FamilyMembership with this data.
     */
    create: XOR<FamilyMembershipCreateInput, FamilyMembershipUncheckedCreateInput>
    /**
     * In case the FamilyMembership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FamilyMembershipUpdateInput, FamilyMembershipUncheckedUpdateInput>
  }

  /**
   * FamilyMembership delete
   */
  export type FamilyMembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
    /**
     * Filter which FamilyMembership to delete.
     */
    where: FamilyMembershipWhereUniqueInput
  }

  /**
   * FamilyMembership deleteMany
   */
  export type FamilyMembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FamilyMemberships to delete
     */
    where?: FamilyMembershipWhereInput
    /**
     * Limit how many FamilyMemberships to delete.
     */
    limit?: number
  }

  /**
   * FamilyMembership without action
   */
  export type FamilyMembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyMembership
     */
    select?: FamilyMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FamilyMembership
     */
    omit?: FamilyMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyMembershipInclude<ExtArgs> | null
  }


  /**
   * Model ParentChild
   */

  export type AggregateParentChild = {
    _count: ParentChildCountAggregateOutputType | null
    _avg: ParentChildAvgAggregateOutputType | null
    _sum: ParentChildSumAggregateOutputType | null
    _min: ParentChildMinAggregateOutputType | null
    _max: ParentChildMaxAggregateOutputType | null
  }

  export type ParentChildAvgAggregateOutputType = {
    childId: number | null
    parentId: number | null
  }

  export type ParentChildSumAggregateOutputType = {
    childId: number | null
    parentId: number | null
  }

  export type ParentChildMinAggregateOutputType = {
    childId: number | null
    parentId: number | null
    role: $Enums.ParentRole | null
  }

  export type ParentChildMaxAggregateOutputType = {
    childId: number | null
    parentId: number | null
    role: $Enums.ParentRole | null
  }

  export type ParentChildCountAggregateOutputType = {
    childId: number
    parentId: number
    role: number
    _all: number
  }


  export type ParentChildAvgAggregateInputType = {
    childId?: true
    parentId?: true
  }

  export type ParentChildSumAggregateInputType = {
    childId?: true
    parentId?: true
  }

  export type ParentChildMinAggregateInputType = {
    childId?: true
    parentId?: true
    role?: true
  }

  export type ParentChildMaxAggregateInputType = {
    childId?: true
    parentId?: true
    role?: true
  }

  export type ParentChildCountAggregateInputType = {
    childId?: true
    parentId?: true
    role?: true
    _all?: true
  }

  export type ParentChildAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentChild to aggregate.
     */
    where?: ParentChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentChildren to fetch.
     */
    orderBy?: ParentChildOrderByWithRelationInput | ParentChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParentChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentChildren from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentChildren.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParentChildren
    **/
    _count?: true | ParentChildCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParentChildAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParentChildSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParentChildMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParentChildMaxAggregateInputType
  }

  export type GetParentChildAggregateType<T extends ParentChildAggregateArgs> = {
        [P in keyof T & keyof AggregateParentChild]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParentChild[P]>
      : GetScalarType<T[P], AggregateParentChild[P]>
  }




  export type ParentChildGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentChildWhereInput
    orderBy?: ParentChildOrderByWithAggregationInput | ParentChildOrderByWithAggregationInput[]
    by: ParentChildScalarFieldEnum[] | ParentChildScalarFieldEnum
    having?: ParentChildScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParentChildCountAggregateInputType | true
    _avg?: ParentChildAvgAggregateInputType
    _sum?: ParentChildSumAggregateInputType
    _min?: ParentChildMinAggregateInputType
    _max?: ParentChildMaxAggregateInputType
  }

  export type ParentChildGroupByOutputType = {
    childId: number
    parentId: number
    role: $Enums.ParentRole
    _count: ParentChildCountAggregateOutputType | null
    _avg: ParentChildAvgAggregateOutputType | null
    _sum: ParentChildSumAggregateOutputType | null
    _min: ParentChildMinAggregateOutputType | null
    _max: ParentChildMaxAggregateOutputType | null
  }

  type GetParentChildGroupByPayload<T extends ParentChildGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParentChildGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParentChildGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParentChildGroupByOutputType[P]>
            : GetScalarType<T[P], ParentChildGroupByOutputType[P]>
        }
      >
    >


  export type ParentChildSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    childId?: boolean
    parentId?: boolean
    role?: boolean
    child?: boolean | PersonDefaultArgs<ExtArgs>
    parent?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentChild"]>

  export type ParentChildSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    childId?: boolean
    parentId?: boolean
    role?: boolean
    child?: boolean | PersonDefaultArgs<ExtArgs>
    parent?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentChild"]>

  export type ParentChildSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    childId?: boolean
    parentId?: boolean
    role?: boolean
    child?: boolean | PersonDefaultArgs<ExtArgs>
    parent?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentChild"]>

  export type ParentChildSelectScalar = {
    childId?: boolean
    parentId?: boolean
    role?: boolean
  }

  export type ParentChildOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"childId" | "parentId" | "role", ExtArgs["result"]["parentChild"]>
  export type ParentChildInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | PersonDefaultArgs<ExtArgs>
    parent?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type ParentChildIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | PersonDefaultArgs<ExtArgs>
    parent?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type ParentChildIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | PersonDefaultArgs<ExtArgs>
    parent?: boolean | PersonDefaultArgs<ExtArgs>
  }

  export type $ParentChildPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParentChild"
    objects: {
      child: Prisma.$PersonPayload<ExtArgs>
      parent: Prisma.$PersonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      childId: number
      parentId: number
      role: $Enums.ParentRole
    }, ExtArgs["result"]["parentChild"]>
    composites: {}
  }

  type ParentChildGetPayload<S extends boolean | null | undefined | ParentChildDefaultArgs> = $Result.GetResult<Prisma.$ParentChildPayload, S>

  type ParentChildCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParentChildFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParentChildCountAggregateInputType | true
    }

  export interface ParentChildDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParentChild'], meta: { name: 'ParentChild' } }
    /**
     * Find zero or one ParentChild that matches the filter.
     * @param {ParentChildFindUniqueArgs} args - Arguments to find a ParentChild
     * @example
     * // Get one ParentChild
     * const parentChild = await prisma.parentChild.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParentChildFindUniqueArgs>(args: SelectSubset<T, ParentChildFindUniqueArgs<ExtArgs>>): Prisma__ParentChildClient<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParentChild that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParentChildFindUniqueOrThrowArgs} args - Arguments to find a ParentChild
     * @example
     * // Get one ParentChild
     * const parentChild = await prisma.parentChild.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParentChildFindUniqueOrThrowArgs>(args: SelectSubset<T, ParentChildFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParentChildClient<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentChild that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentChildFindFirstArgs} args - Arguments to find a ParentChild
     * @example
     * // Get one ParentChild
     * const parentChild = await prisma.parentChild.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParentChildFindFirstArgs>(args?: SelectSubset<T, ParentChildFindFirstArgs<ExtArgs>>): Prisma__ParentChildClient<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentChild that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentChildFindFirstOrThrowArgs} args - Arguments to find a ParentChild
     * @example
     * // Get one ParentChild
     * const parentChild = await prisma.parentChild.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParentChildFindFirstOrThrowArgs>(args?: SelectSubset<T, ParentChildFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParentChildClient<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParentChildren that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentChildFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParentChildren
     * const parentChildren = await prisma.parentChild.findMany()
     * 
     * // Get first 10 ParentChildren
     * const parentChildren = await prisma.parentChild.findMany({ take: 10 })
     * 
     * // Only select the `childId`
     * const parentChildWithChildIdOnly = await prisma.parentChild.findMany({ select: { childId: true } })
     * 
     */
    findMany<T extends ParentChildFindManyArgs>(args?: SelectSubset<T, ParentChildFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParentChild.
     * @param {ParentChildCreateArgs} args - Arguments to create a ParentChild.
     * @example
     * // Create one ParentChild
     * const ParentChild = await prisma.parentChild.create({
     *   data: {
     *     // ... data to create a ParentChild
     *   }
     * })
     * 
     */
    create<T extends ParentChildCreateArgs>(args: SelectSubset<T, ParentChildCreateArgs<ExtArgs>>): Prisma__ParentChildClient<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParentChildren.
     * @param {ParentChildCreateManyArgs} args - Arguments to create many ParentChildren.
     * @example
     * // Create many ParentChildren
     * const parentChild = await prisma.parentChild.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParentChildCreateManyArgs>(args?: SelectSubset<T, ParentChildCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParentChildren and returns the data saved in the database.
     * @param {ParentChildCreateManyAndReturnArgs} args - Arguments to create many ParentChildren.
     * @example
     * // Create many ParentChildren
     * const parentChild = await prisma.parentChild.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParentChildren and only return the `childId`
     * const parentChildWithChildIdOnly = await prisma.parentChild.createManyAndReturn({
     *   select: { childId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParentChildCreateManyAndReturnArgs>(args?: SelectSubset<T, ParentChildCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ParentChild.
     * @param {ParentChildDeleteArgs} args - Arguments to delete one ParentChild.
     * @example
     * // Delete one ParentChild
     * const ParentChild = await prisma.parentChild.delete({
     *   where: {
     *     // ... filter to delete one ParentChild
     *   }
     * })
     * 
     */
    delete<T extends ParentChildDeleteArgs>(args: SelectSubset<T, ParentChildDeleteArgs<ExtArgs>>): Prisma__ParentChildClient<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParentChild.
     * @param {ParentChildUpdateArgs} args - Arguments to update one ParentChild.
     * @example
     * // Update one ParentChild
     * const parentChild = await prisma.parentChild.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParentChildUpdateArgs>(args: SelectSubset<T, ParentChildUpdateArgs<ExtArgs>>): Prisma__ParentChildClient<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParentChildren.
     * @param {ParentChildDeleteManyArgs} args - Arguments to filter ParentChildren to delete.
     * @example
     * // Delete a few ParentChildren
     * const { count } = await prisma.parentChild.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParentChildDeleteManyArgs>(args?: SelectSubset<T, ParentChildDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentChildren.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentChildUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParentChildren
     * const parentChild = await prisma.parentChild.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParentChildUpdateManyArgs>(args: SelectSubset<T, ParentChildUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentChildren and returns the data updated in the database.
     * @param {ParentChildUpdateManyAndReturnArgs} args - Arguments to update many ParentChildren.
     * @example
     * // Update many ParentChildren
     * const parentChild = await prisma.parentChild.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ParentChildren and only return the `childId`
     * const parentChildWithChildIdOnly = await prisma.parentChild.updateManyAndReturn({
     *   select: { childId: true },
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
    updateManyAndReturn<T extends ParentChildUpdateManyAndReturnArgs>(args: SelectSubset<T, ParentChildUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ParentChild.
     * @param {ParentChildUpsertArgs} args - Arguments to update or create a ParentChild.
     * @example
     * // Update or create a ParentChild
     * const parentChild = await prisma.parentChild.upsert({
     *   create: {
     *     // ... data to create a ParentChild
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParentChild we want to update
     *   }
     * })
     */
    upsert<T extends ParentChildUpsertArgs>(args: SelectSubset<T, ParentChildUpsertArgs<ExtArgs>>): Prisma__ParentChildClient<$Result.GetResult<Prisma.$ParentChildPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParentChildren.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentChildCountArgs} args - Arguments to filter ParentChildren to count.
     * @example
     * // Count the number of ParentChildren
     * const count = await prisma.parentChild.count({
     *   where: {
     *     // ... the filter for the ParentChildren we want to count
     *   }
     * })
    **/
    count<T extends ParentChildCountArgs>(
      args?: Subset<T, ParentChildCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParentChildCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParentChild.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentChildAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParentChildAggregateArgs>(args: Subset<T, ParentChildAggregateArgs>): Prisma.PrismaPromise<GetParentChildAggregateType<T>>

    /**
     * Group by ParentChild.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentChildGroupByArgs} args - Group by arguments.
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
      T extends ParentChildGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParentChildGroupByArgs['orderBy'] }
        : { orderBy?: ParentChildGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ParentChildGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentChildGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParentChild model
   */
  readonly fields: ParentChildFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParentChild.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParentChildClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ParentChild model
   */
  interface ParentChildFieldRefs {
    readonly childId: FieldRef<"ParentChild", 'Int'>
    readonly parentId: FieldRef<"ParentChild", 'Int'>
    readonly role: FieldRef<"ParentChild", 'ParentRole'>
  }
    

  // Custom InputTypes
  /**
   * ParentChild findUnique
   */
  export type ParentChildFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * Filter, which ParentChild to fetch.
     */
    where: ParentChildWhereUniqueInput
  }

  /**
   * ParentChild findUniqueOrThrow
   */
  export type ParentChildFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * Filter, which ParentChild to fetch.
     */
    where: ParentChildWhereUniqueInput
  }

  /**
   * ParentChild findFirst
   */
  export type ParentChildFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * Filter, which ParentChild to fetch.
     */
    where?: ParentChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentChildren to fetch.
     */
    orderBy?: ParentChildOrderByWithRelationInput | ParentChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentChildren.
     */
    cursor?: ParentChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentChildren from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentChildren.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentChildren.
     */
    distinct?: ParentChildScalarFieldEnum | ParentChildScalarFieldEnum[]
  }

  /**
   * ParentChild findFirstOrThrow
   */
  export type ParentChildFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * Filter, which ParentChild to fetch.
     */
    where?: ParentChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentChildren to fetch.
     */
    orderBy?: ParentChildOrderByWithRelationInput | ParentChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentChildren.
     */
    cursor?: ParentChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentChildren from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentChildren.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentChildren.
     */
    distinct?: ParentChildScalarFieldEnum | ParentChildScalarFieldEnum[]
  }

  /**
   * ParentChild findMany
   */
  export type ParentChildFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * Filter, which ParentChildren to fetch.
     */
    where?: ParentChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentChildren to fetch.
     */
    orderBy?: ParentChildOrderByWithRelationInput | ParentChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParentChildren.
     */
    cursor?: ParentChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentChildren from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentChildren.
     */
    skip?: number
    distinct?: ParentChildScalarFieldEnum | ParentChildScalarFieldEnum[]
  }

  /**
   * ParentChild create
   */
  export type ParentChildCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * The data needed to create a ParentChild.
     */
    data: XOR<ParentChildCreateInput, ParentChildUncheckedCreateInput>
  }

  /**
   * ParentChild createMany
   */
  export type ParentChildCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParentChildren.
     */
    data: ParentChildCreateManyInput | ParentChildCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParentChild createManyAndReturn
   */
  export type ParentChildCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * The data used to create many ParentChildren.
     */
    data: ParentChildCreateManyInput | ParentChildCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParentChild update
   */
  export type ParentChildUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * The data needed to update a ParentChild.
     */
    data: XOR<ParentChildUpdateInput, ParentChildUncheckedUpdateInput>
    /**
     * Choose, which ParentChild to update.
     */
    where: ParentChildWhereUniqueInput
  }

  /**
   * ParentChild updateMany
   */
  export type ParentChildUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParentChildren.
     */
    data: XOR<ParentChildUpdateManyMutationInput, ParentChildUncheckedUpdateManyInput>
    /**
     * Filter which ParentChildren to update
     */
    where?: ParentChildWhereInput
    /**
     * Limit how many ParentChildren to update.
     */
    limit?: number
  }

  /**
   * ParentChild updateManyAndReturn
   */
  export type ParentChildUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * The data used to update ParentChildren.
     */
    data: XOR<ParentChildUpdateManyMutationInput, ParentChildUncheckedUpdateManyInput>
    /**
     * Filter which ParentChildren to update
     */
    where?: ParentChildWhereInput
    /**
     * Limit how many ParentChildren to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ParentChild upsert
   */
  export type ParentChildUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * The filter to search for the ParentChild to update in case it exists.
     */
    where: ParentChildWhereUniqueInput
    /**
     * In case the ParentChild found by the `where` argument doesn't exist, create a new ParentChild with this data.
     */
    create: XOR<ParentChildCreateInput, ParentChildUncheckedCreateInput>
    /**
     * In case the ParentChild was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParentChildUpdateInput, ParentChildUncheckedUpdateInput>
  }

  /**
   * ParentChild delete
   */
  export type ParentChildDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
    /**
     * Filter which ParentChild to delete.
     */
    where: ParentChildWhereUniqueInput
  }

  /**
   * ParentChild deleteMany
   */
  export type ParentChildDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentChildren to delete
     */
    where?: ParentChildWhereInput
    /**
     * Limit how many ParentChildren to delete.
     */
    limit?: number
  }

  /**
   * ParentChild without action
   */
  export type ParentChildDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentChild
     */
    select?: ParentChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentChild
     */
    omit?: ParentChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentChildInclude<ExtArgs> | null
  }


  /**
   * Model Partnership
   */

  export type AggregatePartnership = {
    _count: PartnershipCountAggregateOutputType | null
    _avg: PartnershipAvgAggregateOutputType | null
    _sum: PartnershipSumAggregateOutputType | null
    _min: PartnershipMinAggregateOutputType | null
    _max: PartnershipMaxAggregateOutputType | null
  }

  export type PartnershipAvgAggregateOutputType = {
    id: number | null
    personAId: number | null
    personBId: number | null
  }

  export type PartnershipSumAggregateOutputType = {
    id: number | null
    personAId: number | null
    personBId: number | null
  }

  export type PartnershipMinAggregateOutputType = {
    id: number | null
    personAId: number | null
    personBId: number | null
    kind: $Enums.PartnershipKind | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnershipMaxAggregateOutputType = {
    id: number | null
    personAId: number | null
    personBId: number | null
    kind: $Enums.PartnershipKind | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnershipCountAggregateOutputType = {
    id: number
    personAId: number
    personBId: number
    kind: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnershipAvgAggregateInputType = {
    id?: true
    personAId?: true
    personBId?: true
  }

  export type PartnershipSumAggregateInputType = {
    id?: true
    personAId?: true
    personBId?: true
  }

  export type PartnershipMinAggregateInputType = {
    id?: true
    personAId?: true
    personBId?: true
    kind?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnershipMaxAggregateInputType = {
    id?: true
    personAId?: true
    personBId?: true
    kind?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnershipCountAggregateInputType = {
    id?: true
    personAId?: true
    personBId?: true
    kind?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partnership to aggregate.
     */
    where?: PartnershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partnerships to fetch.
     */
    orderBy?: PartnershipOrderByWithRelationInput | PartnershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partnerships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partnerships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Partnerships
    **/
    _count?: true | PartnershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartnershipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartnershipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnershipMaxAggregateInputType
  }

  export type GetPartnershipAggregateType<T extends PartnershipAggregateArgs> = {
        [P in keyof T & keyof AggregatePartnership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartnership[P]>
      : GetScalarType<T[P], AggregatePartnership[P]>
  }




  export type PartnershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnershipWhereInput
    orderBy?: PartnershipOrderByWithAggregationInput | PartnershipOrderByWithAggregationInput[]
    by: PartnershipScalarFieldEnum[] | PartnershipScalarFieldEnum
    having?: PartnershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnershipCountAggregateInputType | true
    _avg?: PartnershipAvgAggregateInputType
    _sum?: PartnershipSumAggregateInputType
    _min?: PartnershipMinAggregateInputType
    _max?: PartnershipMaxAggregateInputType
  }

  export type PartnershipGroupByOutputType = {
    id: number
    personAId: number
    personBId: number
    kind: $Enums.PartnershipKind
    startDate: Date | null
    endDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PartnershipCountAggregateOutputType | null
    _avg: PartnershipAvgAggregateOutputType | null
    _sum: PartnershipSumAggregateOutputType | null
    _min: PartnershipMinAggregateOutputType | null
    _max: PartnershipMaxAggregateOutputType | null
  }

  type GetPartnershipGroupByPayload<T extends PartnershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnershipGroupByOutputType[P]>
            : GetScalarType<T[P], PartnershipGroupByOutputType[P]>
        }
      >
    >


  export type PartnershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    personAId?: boolean
    personBId?: boolean
    kind?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    personA?: boolean | PersonDefaultArgs<ExtArgs>
    personB?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partnership"]>

  export type PartnershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    personAId?: boolean
    personBId?: boolean
    kind?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    personA?: boolean | PersonDefaultArgs<ExtArgs>
    personB?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partnership"]>

  export type PartnershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    personAId?: boolean
    personBId?: boolean
    kind?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    personA?: boolean | PersonDefaultArgs<ExtArgs>
    personB?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partnership"]>

  export type PartnershipSelectScalar = {
    id?: boolean
    personAId?: boolean
    personBId?: boolean
    kind?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "personAId" | "personBId" | "kind" | "startDate" | "endDate" | "createdAt" | "updatedAt", ExtArgs["result"]["partnership"]>
  export type PartnershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    personA?: boolean | PersonDefaultArgs<ExtArgs>
    personB?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type PartnershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    personA?: boolean | PersonDefaultArgs<ExtArgs>
    personB?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type PartnershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    personA?: boolean | PersonDefaultArgs<ExtArgs>
    personB?: boolean | PersonDefaultArgs<ExtArgs>
  }

  export type $PartnershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Partnership"
    objects: {
      personA: Prisma.$PersonPayload<ExtArgs>
      personB: Prisma.$PersonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      personAId: number
      personBId: number
      kind: $Enums.PartnershipKind
      startDate: Date | null
      endDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partnership"]>
    composites: {}
  }

  type PartnershipGetPayload<S extends boolean | null | undefined | PartnershipDefaultArgs> = $Result.GetResult<Prisma.$PartnershipPayload, S>

  type PartnershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartnershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartnershipCountAggregateInputType | true
    }

  export interface PartnershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Partnership'], meta: { name: 'Partnership' } }
    /**
     * Find zero or one Partnership that matches the filter.
     * @param {PartnershipFindUniqueArgs} args - Arguments to find a Partnership
     * @example
     * // Get one Partnership
     * const partnership = await prisma.partnership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnershipFindUniqueArgs>(args: SelectSubset<T, PartnershipFindUniqueArgs<ExtArgs>>): Prisma__PartnershipClient<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Partnership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartnershipFindUniqueOrThrowArgs} args - Arguments to find a Partnership
     * @example
     * // Get one Partnership
     * const partnership = await prisma.partnership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnershipFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnershipClient<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partnership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnershipFindFirstArgs} args - Arguments to find a Partnership
     * @example
     * // Get one Partnership
     * const partnership = await prisma.partnership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnershipFindFirstArgs>(args?: SelectSubset<T, PartnershipFindFirstArgs<ExtArgs>>): Prisma__PartnershipClient<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partnership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnershipFindFirstOrThrowArgs} args - Arguments to find a Partnership
     * @example
     * // Get one Partnership
     * const partnership = await prisma.partnership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnershipFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnershipClient<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Partnerships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Partnerships
     * const partnerships = await prisma.partnership.findMany()
     * 
     * // Get first 10 Partnerships
     * const partnerships = await prisma.partnership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnershipWithIdOnly = await prisma.partnership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnershipFindManyArgs>(args?: SelectSubset<T, PartnershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Partnership.
     * @param {PartnershipCreateArgs} args - Arguments to create a Partnership.
     * @example
     * // Create one Partnership
     * const Partnership = await prisma.partnership.create({
     *   data: {
     *     // ... data to create a Partnership
     *   }
     * })
     * 
     */
    create<T extends PartnershipCreateArgs>(args: SelectSubset<T, PartnershipCreateArgs<ExtArgs>>): Prisma__PartnershipClient<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Partnerships.
     * @param {PartnershipCreateManyArgs} args - Arguments to create many Partnerships.
     * @example
     * // Create many Partnerships
     * const partnership = await prisma.partnership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnershipCreateManyArgs>(args?: SelectSubset<T, PartnershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Partnerships and returns the data saved in the database.
     * @param {PartnershipCreateManyAndReturnArgs} args - Arguments to create many Partnerships.
     * @example
     * // Create many Partnerships
     * const partnership = await prisma.partnership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Partnerships and only return the `id`
     * const partnershipWithIdOnly = await prisma.partnership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnershipCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Partnership.
     * @param {PartnershipDeleteArgs} args - Arguments to delete one Partnership.
     * @example
     * // Delete one Partnership
     * const Partnership = await prisma.partnership.delete({
     *   where: {
     *     // ... filter to delete one Partnership
     *   }
     * })
     * 
     */
    delete<T extends PartnershipDeleteArgs>(args: SelectSubset<T, PartnershipDeleteArgs<ExtArgs>>): Prisma__PartnershipClient<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Partnership.
     * @param {PartnershipUpdateArgs} args - Arguments to update one Partnership.
     * @example
     * // Update one Partnership
     * const partnership = await prisma.partnership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnershipUpdateArgs>(args: SelectSubset<T, PartnershipUpdateArgs<ExtArgs>>): Prisma__PartnershipClient<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Partnerships.
     * @param {PartnershipDeleteManyArgs} args - Arguments to filter Partnerships to delete.
     * @example
     * // Delete a few Partnerships
     * const { count } = await prisma.partnership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnershipDeleteManyArgs>(args?: SelectSubset<T, PartnershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partnerships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Partnerships
     * const partnership = await prisma.partnership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnershipUpdateManyArgs>(args: SelectSubset<T, PartnershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partnerships and returns the data updated in the database.
     * @param {PartnershipUpdateManyAndReturnArgs} args - Arguments to update many Partnerships.
     * @example
     * // Update many Partnerships
     * const partnership = await prisma.partnership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Partnerships and only return the `id`
     * const partnershipWithIdOnly = await prisma.partnership.updateManyAndReturn({
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
    updateManyAndReturn<T extends PartnershipUpdateManyAndReturnArgs>(args: SelectSubset<T, PartnershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Partnership.
     * @param {PartnershipUpsertArgs} args - Arguments to update or create a Partnership.
     * @example
     * // Update or create a Partnership
     * const partnership = await prisma.partnership.upsert({
     *   create: {
     *     // ... data to create a Partnership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Partnership we want to update
     *   }
     * })
     */
    upsert<T extends PartnershipUpsertArgs>(args: SelectSubset<T, PartnershipUpsertArgs<ExtArgs>>): Prisma__PartnershipClient<$Result.GetResult<Prisma.$PartnershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Partnerships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnershipCountArgs} args - Arguments to filter Partnerships to count.
     * @example
     * // Count the number of Partnerships
     * const count = await prisma.partnership.count({
     *   where: {
     *     // ... the filter for the Partnerships we want to count
     *   }
     * })
    **/
    count<T extends PartnershipCountArgs>(
      args?: Subset<T, PartnershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Partnership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PartnershipAggregateArgs>(args: Subset<T, PartnershipAggregateArgs>): Prisma.PrismaPromise<GetPartnershipAggregateType<T>>

    /**
     * Group by Partnership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnershipGroupByArgs} args - Group by arguments.
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
      T extends PartnershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnershipGroupByArgs['orderBy'] }
        : { orderBy?: PartnershipGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PartnershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Partnership model
   */
  readonly fields: PartnershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Partnership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    personA<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    personB<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Partnership model
   */
  interface PartnershipFieldRefs {
    readonly id: FieldRef<"Partnership", 'Int'>
    readonly personAId: FieldRef<"Partnership", 'Int'>
    readonly personBId: FieldRef<"Partnership", 'Int'>
    readonly kind: FieldRef<"Partnership", 'PartnershipKind'>
    readonly startDate: FieldRef<"Partnership", 'DateTime'>
    readonly endDate: FieldRef<"Partnership", 'DateTime'>
    readonly createdAt: FieldRef<"Partnership", 'DateTime'>
    readonly updatedAt: FieldRef<"Partnership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Partnership findUnique
   */
  export type PartnershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * Filter, which Partnership to fetch.
     */
    where: PartnershipWhereUniqueInput
  }

  /**
   * Partnership findUniqueOrThrow
   */
  export type PartnershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * Filter, which Partnership to fetch.
     */
    where: PartnershipWhereUniqueInput
  }

  /**
   * Partnership findFirst
   */
  export type PartnershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * Filter, which Partnership to fetch.
     */
    where?: PartnershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partnerships to fetch.
     */
    orderBy?: PartnershipOrderByWithRelationInput | PartnershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partnerships.
     */
    cursor?: PartnershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partnerships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partnerships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partnerships.
     */
    distinct?: PartnershipScalarFieldEnum | PartnershipScalarFieldEnum[]
  }

  /**
   * Partnership findFirstOrThrow
   */
  export type PartnershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * Filter, which Partnership to fetch.
     */
    where?: PartnershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partnerships to fetch.
     */
    orderBy?: PartnershipOrderByWithRelationInput | PartnershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partnerships.
     */
    cursor?: PartnershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partnerships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partnerships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partnerships.
     */
    distinct?: PartnershipScalarFieldEnum | PartnershipScalarFieldEnum[]
  }

  /**
   * Partnership findMany
   */
  export type PartnershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * Filter, which Partnerships to fetch.
     */
    where?: PartnershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partnerships to fetch.
     */
    orderBy?: PartnershipOrderByWithRelationInput | PartnershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Partnerships.
     */
    cursor?: PartnershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partnerships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partnerships.
     */
    skip?: number
    distinct?: PartnershipScalarFieldEnum | PartnershipScalarFieldEnum[]
  }

  /**
   * Partnership create
   */
  export type PartnershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * The data needed to create a Partnership.
     */
    data: XOR<PartnershipCreateInput, PartnershipUncheckedCreateInput>
  }

  /**
   * Partnership createMany
   */
  export type PartnershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Partnerships.
     */
    data: PartnershipCreateManyInput | PartnershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partnership createManyAndReturn
   */
  export type PartnershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * The data used to create many Partnerships.
     */
    data: PartnershipCreateManyInput | PartnershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Partnership update
   */
  export type PartnershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * The data needed to update a Partnership.
     */
    data: XOR<PartnershipUpdateInput, PartnershipUncheckedUpdateInput>
    /**
     * Choose, which Partnership to update.
     */
    where: PartnershipWhereUniqueInput
  }

  /**
   * Partnership updateMany
   */
  export type PartnershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Partnerships.
     */
    data: XOR<PartnershipUpdateManyMutationInput, PartnershipUncheckedUpdateManyInput>
    /**
     * Filter which Partnerships to update
     */
    where?: PartnershipWhereInput
    /**
     * Limit how many Partnerships to update.
     */
    limit?: number
  }

  /**
   * Partnership updateManyAndReturn
   */
  export type PartnershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * The data used to update Partnerships.
     */
    data: XOR<PartnershipUpdateManyMutationInput, PartnershipUncheckedUpdateManyInput>
    /**
     * Filter which Partnerships to update
     */
    where?: PartnershipWhereInput
    /**
     * Limit how many Partnerships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Partnership upsert
   */
  export type PartnershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * The filter to search for the Partnership to update in case it exists.
     */
    where: PartnershipWhereUniqueInput
    /**
     * In case the Partnership found by the `where` argument doesn't exist, create a new Partnership with this data.
     */
    create: XOR<PartnershipCreateInput, PartnershipUncheckedCreateInput>
    /**
     * In case the Partnership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnershipUpdateInput, PartnershipUncheckedUpdateInput>
  }

  /**
   * Partnership delete
   */
  export type PartnershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
    /**
     * Filter which Partnership to delete.
     */
    where: PartnershipWhereUniqueInput
  }

  /**
   * Partnership deleteMany
   */
  export type PartnershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partnerships to delete
     */
    where?: PartnershipWhereInput
    /**
     * Limit how many Partnerships to delete.
     */
    limit?: number
  }

  /**
   * Partnership without action
   */
  export type PartnershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partnership
     */
    select?: PartnershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partnership
     */
    omit?: PartnershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnershipInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    isConfirmed: 'isConfirmed',
    confirmationToken: 'confirmationToken',
    confirmationTokenExpiry: 'confirmationTokenExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FamilyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FamilyScalarFieldEnum = (typeof FamilyScalarFieldEnum)[keyof typeof FamilyScalarFieldEnum]


  export const UserFamilyScalarFieldEnum: {
    userId: 'userId',
    familyId: 'familyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserFamilyScalarFieldEnum = (typeof UserFamilyScalarFieldEnum)[keyof typeof UserFamilyScalarFieldEnum]


  export const PersonScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    gender: 'gender',
    birthDate: 'birthDate',
    deathDate: 'deathDate',
    birthPlace: 'birthPlace',
    bio: 'bio',
    picturePath: 'picturePath',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum]


  export const FamilyMembershipScalarFieldEnum: {
    personId: 'personId',
    familyId: 'familyId',
    joinedAt: 'joinedAt'
  };

  export type FamilyMembershipScalarFieldEnum = (typeof FamilyMembershipScalarFieldEnum)[keyof typeof FamilyMembershipScalarFieldEnum]


  export const ParentChildScalarFieldEnum: {
    childId: 'childId',
    parentId: 'parentId',
    role: 'role'
  };

  export type ParentChildScalarFieldEnum = (typeof ParentChildScalarFieldEnum)[keyof typeof ParentChildScalarFieldEnum]


  export const PartnershipScalarFieldEnum: {
    id: 'id',
    personAId: 'personAId',
    personBId: 'personBId',
    kind: 'kind',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnershipScalarFieldEnum = (typeof PartnershipScalarFieldEnum)[keyof typeof PartnershipScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ParentRole'
   */
  export type EnumParentRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ParentRole'>
    


  /**
   * Reference to a field of type 'ParentRole[]'
   */
  export type ListEnumParentRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ParentRole[]'>
    


  /**
   * Reference to a field of type 'PartnershipKind'
   */
  export type EnumPartnershipKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartnershipKind'>
    


  /**
   * Reference to a field of type 'PartnershipKind[]'
   */
  export type ListEnumPartnershipKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartnershipKind[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isConfirmed?: BoolFilter<"User"> | boolean
    confirmationToken?: StringNullableFilter<"User"> | string | null
    confirmationTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    userFamilies?: UserFamilyListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isConfirmed?: SortOrder
    confirmationToken?: SortOrderInput | SortOrder
    confirmationTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userFamilies?: UserFamilyOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    isConfirmed?: BoolFilter<"User"> | boolean
    confirmationToken?: StringNullableFilter<"User"> | string | null
    confirmationTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    userFamilies?: UserFamilyListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isConfirmed?: SortOrder
    confirmationToken?: SortOrderInput | SortOrder
    confirmationTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    isConfirmed?: BoolWithAggregatesFilter<"User"> | boolean
    confirmationToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    confirmationTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FamilyWhereInput = {
    AND?: FamilyWhereInput | FamilyWhereInput[]
    OR?: FamilyWhereInput[]
    NOT?: FamilyWhereInput | FamilyWhereInput[]
    id?: IntFilter<"Family"> | number
    name?: StringNullableFilter<"Family"> | string | null
    createdAt?: DateTimeFilter<"Family"> | Date | string
    updatedAt?: DateTimeFilter<"Family"> | Date | string
    memberships?: FamilyMembershipListRelationFilter
    userFamilies?: UserFamilyListRelationFilter
  }

  export type FamilyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    memberships?: FamilyMembershipOrderByRelationAggregateInput
    userFamilies?: UserFamilyOrderByRelationAggregateInput
  }

  export type FamilyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FamilyWhereInput | FamilyWhereInput[]
    OR?: FamilyWhereInput[]
    NOT?: FamilyWhereInput | FamilyWhereInput[]
    name?: StringNullableFilter<"Family"> | string | null
    createdAt?: DateTimeFilter<"Family"> | Date | string
    updatedAt?: DateTimeFilter<"Family"> | Date | string
    memberships?: FamilyMembershipListRelationFilter
    userFamilies?: UserFamilyListRelationFilter
  }, "id">

  export type FamilyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FamilyCountOrderByAggregateInput
    _avg?: FamilyAvgOrderByAggregateInput
    _max?: FamilyMaxOrderByAggregateInput
    _min?: FamilyMinOrderByAggregateInput
    _sum?: FamilySumOrderByAggregateInput
  }

  export type FamilyScalarWhereWithAggregatesInput = {
    AND?: FamilyScalarWhereWithAggregatesInput | FamilyScalarWhereWithAggregatesInput[]
    OR?: FamilyScalarWhereWithAggregatesInput[]
    NOT?: FamilyScalarWhereWithAggregatesInput | FamilyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Family"> | number
    name?: StringNullableWithAggregatesFilter<"Family"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Family"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Family"> | Date | string
  }

  export type UserFamilyWhereInput = {
    AND?: UserFamilyWhereInput | UserFamilyWhereInput[]
    OR?: UserFamilyWhereInput[]
    NOT?: UserFamilyWhereInput | UserFamilyWhereInput[]
    userId?: IntFilter<"UserFamily"> | number
    familyId?: IntFilter<"UserFamily"> | number
    createdAt?: DateTimeFilter<"UserFamily"> | Date | string
    updatedAt?: DateTimeFilter<"UserFamily"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
  }

  export type UserFamilyOrderByWithRelationInput = {
    userId?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    family?: FamilyOrderByWithRelationInput
  }

  export type UserFamilyWhereUniqueInput = Prisma.AtLeast<{
    userId_familyId?: UserFamilyUserIdFamilyIdCompoundUniqueInput
    AND?: UserFamilyWhereInput | UserFamilyWhereInput[]
    OR?: UserFamilyWhereInput[]
    NOT?: UserFamilyWhereInput | UserFamilyWhereInput[]
    userId?: IntFilter<"UserFamily"> | number
    familyId?: IntFilter<"UserFamily"> | number
    createdAt?: DateTimeFilter<"UserFamily"> | Date | string
    updatedAt?: DateTimeFilter<"UserFamily"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
  }, "userId_familyId">

  export type UserFamilyOrderByWithAggregationInput = {
    userId?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserFamilyCountOrderByAggregateInput
    _avg?: UserFamilyAvgOrderByAggregateInput
    _max?: UserFamilyMaxOrderByAggregateInput
    _min?: UserFamilyMinOrderByAggregateInput
    _sum?: UserFamilySumOrderByAggregateInput
  }

  export type UserFamilyScalarWhereWithAggregatesInput = {
    AND?: UserFamilyScalarWhereWithAggregatesInput | UserFamilyScalarWhereWithAggregatesInput[]
    OR?: UserFamilyScalarWhereWithAggregatesInput[]
    NOT?: UserFamilyScalarWhereWithAggregatesInput | UserFamilyScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"UserFamily"> | number
    familyId?: IntWithAggregatesFilter<"UserFamily"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UserFamily"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserFamily"> | Date | string
  }

  export type PersonWhereInput = {
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    id?: IntFilter<"Person"> | number
    fullName?: StringFilter<"Person"> | string
    gender?: StringFilter<"Person"> | string
    birthDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    deathDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    birthPlace?: StringNullableFilter<"Person"> | string | null
    bio?: StringNullableFilter<"Person"> | string | null
    picturePath?: StringNullableFilter<"Person"> | string | null
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeFilter<"Person"> | Date | string
    memberships?: FamilyMembershipListRelationFilter
    childEdges?: ParentChildListRelationFilter
    parentEdges?: ParentChildListRelationFilter
    partnershipsA?: PartnershipListRelationFilter
    partnershipsB?: PartnershipListRelationFilter
  }

  export type PersonOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    deathDate?: SortOrderInput | SortOrder
    birthPlace?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    picturePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    memberships?: FamilyMembershipOrderByRelationAggregateInput
    childEdges?: ParentChildOrderByRelationAggregateInput
    parentEdges?: ParentChildOrderByRelationAggregateInput
    partnershipsA?: PartnershipOrderByRelationAggregateInput
    partnershipsB?: PartnershipOrderByRelationAggregateInput
  }

  export type PersonWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    fullName?: StringFilter<"Person"> | string
    gender?: StringFilter<"Person"> | string
    birthDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    deathDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    birthPlace?: StringNullableFilter<"Person"> | string | null
    bio?: StringNullableFilter<"Person"> | string | null
    picturePath?: StringNullableFilter<"Person"> | string | null
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeFilter<"Person"> | Date | string
    memberships?: FamilyMembershipListRelationFilter
    childEdges?: ParentChildListRelationFilter
    parentEdges?: ParentChildListRelationFilter
    partnershipsA?: PartnershipListRelationFilter
    partnershipsB?: PartnershipListRelationFilter
  }, "id">

  export type PersonOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    deathDate?: SortOrderInput | SortOrder
    birthPlace?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    picturePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PersonCountOrderByAggregateInput
    _avg?: PersonAvgOrderByAggregateInput
    _max?: PersonMaxOrderByAggregateInput
    _min?: PersonMinOrderByAggregateInput
    _sum?: PersonSumOrderByAggregateInput
  }

  export type PersonScalarWhereWithAggregatesInput = {
    AND?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    OR?: PersonScalarWhereWithAggregatesInput[]
    NOT?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Person"> | number
    fullName?: StringWithAggregatesFilter<"Person"> | string
    gender?: StringWithAggregatesFilter<"Person"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    deathDate?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    birthPlace?: StringNullableWithAggregatesFilter<"Person"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Person"> | string | null
    picturePath?: StringNullableWithAggregatesFilter<"Person"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Person"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Person"> | Date | string
  }

  export type FamilyMembershipWhereInput = {
    AND?: FamilyMembershipWhereInput | FamilyMembershipWhereInput[]
    OR?: FamilyMembershipWhereInput[]
    NOT?: FamilyMembershipWhereInput | FamilyMembershipWhereInput[]
    personId?: IntFilter<"FamilyMembership"> | number
    familyId?: IntFilter<"FamilyMembership"> | number
    joinedAt?: DateTimeFilter<"FamilyMembership"> | Date | string
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
  }

  export type FamilyMembershipOrderByWithRelationInput = {
    personId?: SortOrder
    familyId?: SortOrder
    joinedAt?: SortOrder
    person?: PersonOrderByWithRelationInput
    family?: FamilyOrderByWithRelationInput
  }

  export type FamilyMembershipWhereUniqueInput = Prisma.AtLeast<{
    personId_familyId?: FamilyMembershipPersonIdFamilyIdCompoundUniqueInput
    AND?: FamilyMembershipWhereInput | FamilyMembershipWhereInput[]
    OR?: FamilyMembershipWhereInput[]
    NOT?: FamilyMembershipWhereInput | FamilyMembershipWhereInput[]
    personId?: IntFilter<"FamilyMembership"> | number
    familyId?: IntFilter<"FamilyMembership"> | number
    joinedAt?: DateTimeFilter<"FamilyMembership"> | Date | string
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
  }, "personId_familyId">

  export type FamilyMembershipOrderByWithAggregationInput = {
    personId?: SortOrder
    familyId?: SortOrder
    joinedAt?: SortOrder
    _count?: FamilyMembershipCountOrderByAggregateInput
    _avg?: FamilyMembershipAvgOrderByAggregateInput
    _max?: FamilyMembershipMaxOrderByAggregateInput
    _min?: FamilyMembershipMinOrderByAggregateInput
    _sum?: FamilyMembershipSumOrderByAggregateInput
  }

  export type FamilyMembershipScalarWhereWithAggregatesInput = {
    AND?: FamilyMembershipScalarWhereWithAggregatesInput | FamilyMembershipScalarWhereWithAggregatesInput[]
    OR?: FamilyMembershipScalarWhereWithAggregatesInput[]
    NOT?: FamilyMembershipScalarWhereWithAggregatesInput | FamilyMembershipScalarWhereWithAggregatesInput[]
    personId?: IntWithAggregatesFilter<"FamilyMembership"> | number
    familyId?: IntWithAggregatesFilter<"FamilyMembership"> | number
    joinedAt?: DateTimeWithAggregatesFilter<"FamilyMembership"> | Date | string
  }

  export type ParentChildWhereInput = {
    AND?: ParentChildWhereInput | ParentChildWhereInput[]
    OR?: ParentChildWhereInput[]
    NOT?: ParentChildWhereInput | ParentChildWhereInput[]
    childId?: IntFilter<"ParentChild"> | number
    parentId?: IntFilter<"ParentChild"> | number
    role?: EnumParentRoleFilter<"ParentChild"> | $Enums.ParentRole
    child?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    parent?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }

  export type ParentChildOrderByWithRelationInput = {
    childId?: SortOrder
    parentId?: SortOrder
    role?: SortOrder
    child?: PersonOrderByWithRelationInput
    parent?: PersonOrderByWithRelationInput
  }

  export type ParentChildWhereUniqueInput = Prisma.AtLeast<{
    childId_parentId?: ParentChildChildIdParentIdCompoundUniqueInput
    AND?: ParentChildWhereInput | ParentChildWhereInput[]
    OR?: ParentChildWhereInput[]
    NOT?: ParentChildWhereInput | ParentChildWhereInput[]
    childId?: IntFilter<"ParentChild"> | number
    parentId?: IntFilter<"ParentChild"> | number
    role?: EnumParentRoleFilter<"ParentChild"> | $Enums.ParentRole
    child?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    parent?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }, "childId_parentId">

  export type ParentChildOrderByWithAggregationInput = {
    childId?: SortOrder
    parentId?: SortOrder
    role?: SortOrder
    _count?: ParentChildCountOrderByAggregateInput
    _avg?: ParentChildAvgOrderByAggregateInput
    _max?: ParentChildMaxOrderByAggregateInput
    _min?: ParentChildMinOrderByAggregateInput
    _sum?: ParentChildSumOrderByAggregateInput
  }

  export type ParentChildScalarWhereWithAggregatesInput = {
    AND?: ParentChildScalarWhereWithAggregatesInput | ParentChildScalarWhereWithAggregatesInput[]
    OR?: ParentChildScalarWhereWithAggregatesInput[]
    NOT?: ParentChildScalarWhereWithAggregatesInput | ParentChildScalarWhereWithAggregatesInput[]
    childId?: IntWithAggregatesFilter<"ParentChild"> | number
    parentId?: IntWithAggregatesFilter<"ParentChild"> | number
    role?: EnumParentRoleWithAggregatesFilter<"ParentChild"> | $Enums.ParentRole
  }

  export type PartnershipWhereInput = {
    AND?: PartnershipWhereInput | PartnershipWhereInput[]
    OR?: PartnershipWhereInput[]
    NOT?: PartnershipWhereInput | PartnershipWhereInput[]
    id?: IntFilter<"Partnership"> | number
    personAId?: IntFilter<"Partnership"> | number
    personBId?: IntFilter<"Partnership"> | number
    kind?: EnumPartnershipKindFilter<"Partnership"> | $Enums.PartnershipKind
    startDate?: DateTimeNullableFilter<"Partnership"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Partnership"> | Date | string | null
    createdAt?: DateTimeFilter<"Partnership"> | Date | string
    updatedAt?: DateTimeFilter<"Partnership"> | Date | string
    personA?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    personB?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }

  export type PartnershipOrderByWithRelationInput = {
    id?: SortOrder
    personAId?: SortOrder
    personBId?: SortOrder
    kind?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    personA?: PersonOrderByWithRelationInput
    personB?: PersonOrderByWithRelationInput
  }

  export type PartnershipWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PartnershipWhereInput | PartnershipWhereInput[]
    OR?: PartnershipWhereInput[]
    NOT?: PartnershipWhereInput | PartnershipWhereInput[]
    personAId?: IntFilter<"Partnership"> | number
    personBId?: IntFilter<"Partnership"> | number
    kind?: EnumPartnershipKindFilter<"Partnership"> | $Enums.PartnershipKind
    startDate?: DateTimeNullableFilter<"Partnership"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Partnership"> | Date | string | null
    createdAt?: DateTimeFilter<"Partnership"> | Date | string
    updatedAt?: DateTimeFilter<"Partnership"> | Date | string
    personA?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    personB?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }, "id">

  export type PartnershipOrderByWithAggregationInput = {
    id?: SortOrder
    personAId?: SortOrder
    personBId?: SortOrder
    kind?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnershipCountOrderByAggregateInput
    _avg?: PartnershipAvgOrderByAggregateInput
    _max?: PartnershipMaxOrderByAggregateInput
    _min?: PartnershipMinOrderByAggregateInput
    _sum?: PartnershipSumOrderByAggregateInput
  }

  export type PartnershipScalarWhereWithAggregatesInput = {
    AND?: PartnershipScalarWhereWithAggregatesInput | PartnershipScalarWhereWithAggregatesInput[]
    OR?: PartnershipScalarWhereWithAggregatesInput[]
    NOT?: PartnershipScalarWhereWithAggregatesInput | PartnershipScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Partnership"> | number
    personAId?: IntWithAggregatesFilter<"Partnership"> | number
    personBId?: IntWithAggregatesFilter<"Partnership"> | number
    kind?: EnumPartnershipKindWithAggregatesFilter<"Partnership"> | $Enums.PartnershipKind
    startDate?: DateTimeNullableWithAggregatesFilter<"Partnership"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Partnership"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Partnership"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Partnership"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    isConfirmed?: boolean
    confirmationToken?: string | null
    confirmationTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userFamilies?: UserFamilyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    isConfirmed?: boolean
    confirmationToken?: string | null
    confirmationTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userFamilies?: UserFamilyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    confirmationToken?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userFamilies?: UserFamilyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    confirmationToken?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userFamilies?: UserFamilyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    isConfirmed?: boolean
    confirmationToken?: string | null
    confirmationTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    confirmationToken?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    confirmationToken?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyCreateInput = {
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipCreateNestedManyWithoutFamilyInput
    userFamilies?: UserFamilyCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateInput = {
    id?: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipUncheckedCreateNestedManyWithoutFamilyInput
    userFamilies?: UserFamilyUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUpdateManyWithoutFamilyNestedInput
    userFamilies?: UserFamilyUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUncheckedUpdateManyWithoutFamilyNestedInput
    userFamilies?: UserFamilyUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyCreateManyInput = {
    id?: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FamilyUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFamilyCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserFamiliesInput
    family: FamilyCreateNestedOneWithoutUserFamiliesInput
  }

  export type UserFamilyUncheckedCreateInput = {
    userId: number
    familyId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFamilyUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserFamiliesNestedInput
    family?: FamilyUpdateOneRequiredWithoutUserFamiliesNestedInput
  }

  export type UserFamilyUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    familyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFamilyCreateManyInput = {
    userId: number
    familyId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFamilyUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFamilyUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    familyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonCreateInput = {
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipCreateNestedManyWithoutPersonInput
    childEdges?: ParentChildCreateNestedManyWithoutChildInput
    parentEdges?: ParentChildCreateNestedManyWithoutParentInput
    partnershipsA?: PartnershipCreateNestedManyWithoutPersonAInput
    partnershipsB?: PartnershipCreateNestedManyWithoutPersonBInput
  }

  export type PersonUncheckedCreateInput = {
    id?: number
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipUncheckedCreateNestedManyWithoutPersonInput
    childEdges?: ParentChildUncheckedCreateNestedManyWithoutChildInput
    parentEdges?: ParentChildUncheckedCreateNestedManyWithoutParentInput
    partnershipsA?: PartnershipUncheckedCreateNestedManyWithoutPersonAInput
    partnershipsB?: PartnershipUncheckedCreateNestedManyWithoutPersonBInput
  }

  export type PersonUpdateInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUpdateManyWithoutPersonNestedInput
    childEdges?: ParentChildUpdateManyWithoutChildNestedInput
    parentEdges?: ParentChildUpdateManyWithoutParentNestedInput
    partnershipsA?: PartnershipUpdateManyWithoutPersonANestedInput
    partnershipsB?: PartnershipUpdateManyWithoutPersonBNestedInput
  }

  export type PersonUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUncheckedUpdateManyWithoutPersonNestedInput
    childEdges?: ParentChildUncheckedUpdateManyWithoutChildNestedInput
    parentEdges?: ParentChildUncheckedUpdateManyWithoutParentNestedInput
    partnershipsA?: PartnershipUncheckedUpdateManyWithoutPersonANestedInput
    partnershipsB?: PartnershipUncheckedUpdateManyWithoutPersonBNestedInput
  }

  export type PersonCreateManyInput = {
    id?: number
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonUpdateManyMutationInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMembershipCreateInput = {
    joinedAt?: Date | string
    person: PersonCreateNestedOneWithoutMembershipsInput
    family: FamilyCreateNestedOneWithoutMembershipsInput
  }

  export type FamilyMembershipUncheckedCreateInput = {
    personId: number
    familyId: number
    joinedAt?: Date | string
  }

  export type FamilyMembershipUpdateInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    person?: PersonUpdateOneRequiredWithoutMembershipsNestedInput
    family?: FamilyUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type FamilyMembershipUncheckedUpdateInput = {
    personId?: IntFieldUpdateOperationsInput | number
    familyId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMembershipCreateManyInput = {
    personId: number
    familyId: number
    joinedAt?: Date | string
  }

  export type FamilyMembershipUpdateManyMutationInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMembershipUncheckedUpdateManyInput = {
    personId?: IntFieldUpdateOperationsInput | number
    familyId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentChildCreateInput = {
    role: $Enums.ParentRole
    child: PersonCreateNestedOneWithoutChildEdgesInput
    parent: PersonCreateNestedOneWithoutParentEdgesInput
  }

  export type ParentChildUncheckedCreateInput = {
    childId: number
    parentId: number
    role: $Enums.ParentRole
  }

  export type ParentChildUpdateInput = {
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
    child?: PersonUpdateOneRequiredWithoutChildEdgesNestedInput
    parent?: PersonUpdateOneRequiredWithoutParentEdgesNestedInput
  }

  export type ParentChildUncheckedUpdateInput = {
    childId?: IntFieldUpdateOperationsInput | number
    parentId?: IntFieldUpdateOperationsInput | number
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
  }

  export type ParentChildCreateManyInput = {
    childId: number
    parentId: number
    role: $Enums.ParentRole
  }

  export type ParentChildUpdateManyMutationInput = {
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
  }

  export type ParentChildUncheckedUpdateManyInput = {
    childId?: IntFieldUpdateOperationsInput | number
    parentId?: IntFieldUpdateOperationsInput | number
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
  }

  export type PartnershipCreateInput = {
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    personA: PersonCreateNestedOneWithoutPartnershipsAInput
    personB: PersonCreateNestedOneWithoutPartnershipsBInput
  }

  export type PartnershipUncheckedCreateInput = {
    id?: number
    personAId: number
    personBId: number
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnershipUpdateInput = {
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personA?: PersonUpdateOneRequiredWithoutPartnershipsANestedInput
    personB?: PersonUpdateOneRequiredWithoutPartnershipsBNestedInput
  }

  export type PartnershipUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    personAId?: IntFieldUpdateOperationsInput | number
    personBId?: IntFieldUpdateOperationsInput | number
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnershipCreateManyInput = {
    id?: number
    personAId: number
    personBId: number
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnershipUpdateManyMutationInput = {
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnershipUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    personAId?: IntFieldUpdateOperationsInput | number
    personBId?: IntFieldUpdateOperationsInput | number
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserFamilyListRelationFilter = {
    every?: UserFamilyWhereInput
    some?: UserFamilyWhereInput
    none?: UserFamilyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserFamilyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isConfirmed?: SortOrder
    confirmationToken?: SortOrder
    confirmationTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isConfirmed?: SortOrder
    confirmationToken?: SortOrder
    confirmationTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isConfirmed?: SortOrder
    confirmationToken?: SortOrder
    confirmationTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FamilyMembershipListRelationFilter = {
    every?: FamilyMembershipWhereInput
    some?: FamilyMembershipWhereInput
    none?: FamilyMembershipWhereInput
  }

  export type FamilyMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FamilyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FamilyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FamilyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FamilyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FamilySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FamilyScalarRelationFilter = {
    is?: FamilyWhereInput
    isNot?: FamilyWhereInput
  }

  export type UserFamilyUserIdFamilyIdCompoundUniqueInput = {
    userId: number
    familyId: number
  }

  export type UserFamilyCountOrderByAggregateInput = {
    userId?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserFamilyAvgOrderByAggregateInput = {
    userId?: SortOrder
    familyId?: SortOrder
  }

  export type UserFamilyMaxOrderByAggregateInput = {
    userId?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserFamilyMinOrderByAggregateInput = {
    userId?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserFamilySumOrderByAggregateInput = {
    userId?: SortOrder
    familyId?: SortOrder
  }

  export type ParentChildListRelationFilter = {
    every?: ParentChildWhereInput
    some?: ParentChildWhereInput
    none?: ParentChildWhereInput
  }

  export type PartnershipListRelationFilter = {
    every?: PartnershipWhereInput
    some?: PartnershipWhereInput
    none?: PartnershipWhereInput
  }

  export type ParentChildOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartnershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    birthPlace?: SortOrder
    bio?: SortOrder
    picturePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PersonMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    birthPlace?: SortOrder
    bio?: SortOrder
    picturePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    birthPlace?: SortOrder
    bio?: SortOrder
    picturePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PersonScalarRelationFilter = {
    is?: PersonWhereInput
    isNot?: PersonWhereInput
  }

  export type FamilyMembershipPersonIdFamilyIdCompoundUniqueInput = {
    personId: number
    familyId: number
  }

  export type FamilyMembershipCountOrderByAggregateInput = {
    personId?: SortOrder
    familyId?: SortOrder
    joinedAt?: SortOrder
  }

  export type FamilyMembershipAvgOrderByAggregateInput = {
    personId?: SortOrder
    familyId?: SortOrder
  }

  export type FamilyMembershipMaxOrderByAggregateInput = {
    personId?: SortOrder
    familyId?: SortOrder
    joinedAt?: SortOrder
  }

  export type FamilyMembershipMinOrderByAggregateInput = {
    personId?: SortOrder
    familyId?: SortOrder
    joinedAt?: SortOrder
  }

  export type FamilyMembershipSumOrderByAggregateInput = {
    personId?: SortOrder
    familyId?: SortOrder
  }

  export type EnumParentRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ParentRole | EnumParentRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ParentRole[] | ListEnumParentRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ParentRole[] | ListEnumParentRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumParentRoleFilter<$PrismaModel> | $Enums.ParentRole
  }

  export type ParentChildChildIdParentIdCompoundUniqueInput = {
    childId: number
    parentId: number
  }

  export type ParentChildCountOrderByAggregateInput = {
    childId?: SortOrder
    parentId?: SortOrder
    role?: SortOrder
  }

  export type ParentChildAvgOrderByAggregateInput = {
    childId?: SortOrder
    parentId?: SortOrder
  }

  export type ParentChildMaxOrderByAggregateInput = {
    childId?: SortOrder
    parentId?: SortOrder
    role?: SortOrder
  }

  export type ParentChildMinOrderByAggregateInput = {
    childId?: SortOrder
    parentId?: SortOrder
    role?: SortOrder
  }

  export type ParentChildSumOrderByAggregateInput = {
    childId?: SortOrder
    parentId?: SortOrder
  }

  export type EnumParentRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ParentRole | EnumParentRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ParentRole[] | ListEnumParentRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ParentRole[] | ListEnumParentRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumParentRoleWithAggregatesFilter<$PrismaModel> | $Enums.ParentRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumParentRoleFilter<$PrismaModel>
    _max?: NestedEnumParentRoleFilter<$PrismaModel>
  }

  export type EnumPartnershipKindFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnershipKind | EnumPartnershipKindFieldRefInput<$PrismaModel>
    in?: $Enums.PartnershipKind[] | ListEnumPartnershipKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnershipKind[] | ListEnumPartnershipKindFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnershipKindFilter<$PrismaModel> | $Enums.PartnershipKind
  }

  export type PartnershipCountOrderByAggregateInput = {
    id?: SortOrder
    personAId?: SortOrder
    personBId?: SortOrder
    kind?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnershipAvgOrderByAggregateInput = {
    id?: SortOrder
    personAId?: SortOrder
    personBId?: SortOrder
  }

  export type PartnershipMaxOrderByAggregateInput = {
    id?: SortOrder
    personAId?: SortOrder
    personBId?: SortOrder
    kind?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnershipMinOrderByAggregateInput = {
    id?: SortOrder
    personAId?: SortOrder
    personBId?: SortOrder
    kind?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnershipSumOrderByAggregateInput = {
    id?: SortOrder
    personAId?: SortOrder
    personBId?: SortOrder
  }

  export type EnumPartnershipKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnershipKind | EnumPartnershipKindFieldRefInput<$PrismaModel>
    in?: $Enums.PartnershipKind[] | ListEnumPartnershipKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnershipKind[] | ListEnumPartnershipKindFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnershipKindWithAggregatesFilter<$PrismaModel> | $Enums.PartnershipKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartnershipKindFilter<$PrismaModel>
    _max?: NestedEnumPartnershipKindFilter<$PrismaModel>
  }

  export type UserFamilyCreateNestedManyWithoutUserInput = {
    create?: XOR<UserFamilyCreateWithoutUserInput, UserFamilyUncheckedCreateWithoutUserInput> | UserFamilyCreateWithoutUserInput[] | UserFamilyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserFamilyCreateOrConnectWithoutUserInput | UserFamilyCreateOrConnectWithoutUserInput[]
    createMany?: UserFamilyCreateManyUserInputEnvelope
    connect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
  }

  export type UserFamilyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserFamilyCreateWithoutUserInput, UserFamilyUncheckedCreateWithoutUserInput> | UserFamilyCreateWithoutUserInput[] | UserFamilyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserFamilyCreateOrConnectWithoutUserInput | UserFamilyCreateOrConnectWithoutUserInput[]
    createMany?: UserFamilyCreateManyUserInputEnvelope
    connect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserFamilyUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserFamilyCreateWithoutUserInput, UserFamilyUncheckedCreateWithoutUserInput> | UserFamilyCreateWithoutUserInput[] | UserFamilyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserFamilyCreateOrConnectWithoutUserInput | UserFamilyCreateOrConnectWithoutUserInput[]
    upsert?: UserFamilyUpsertWithWhereUniqueWithoutUserInput | UserFamilyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserFamilyCreateManyUserInputEnvelope
    set?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    disconnect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    delete?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    connect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    update?: UserFamilyUpdateWithWhereUniqueWithoutUserInput | UserFamilyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserFamilyUpdateManyWithWhereWithoutUserInput | UserFamilyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserFamilyScalarWhereInput | UserFamilyScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserFamilyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserFamilyCreateWithoutUserInput, UserFamilyUncheckedCreateWithoutUserInput> | UserFamilyCreateWithoutUserInput[] | UserFamilyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserFamilyCreateOrConnectWithoutUserInput | UserFamilyCreateOrConnectWithoutUserInput[]
    upsert?: UserFamilyUpsertWithWhereUniqueWithoutUserInput | UserFamilyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserFamilyCreateManyUserInputEnvelope
    set?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    disconnect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    delete?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    connect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    update?: UserFamilyUpdateWithWhereUniqueWithoutUserInput | UserFamilyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserFamilyUpdateManyWithWhereWithoutUserInput | UserFamilyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserFamilyScalarWhereInput | UserFamilyScalarWhereInput[]
  }

  export type FamilyMembershipCreateNestedManyWithoutFamilyInput = {
    create?: XOR<FamilyMembershipCreateWithoutFamilyInput, FamilyMembershipUncheckedCreateWithoutFamilyInput> | FamilyMembershipCreateWithoutFamilyInput[] | FamilyMembershipUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: FamilyMembershipCreateOrConnectWithoutFamilyInput | FamilyMembershipCreateOrConnectWithoutFamilyInput[]
    createMany?: FamilyMembershipCreateManyFamilyInputEnvelope
    connect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
  }

  export type UserFamilyCreateNestedManyWithoutFamilyInput = {
    create?: XOR<UserFamilyCreateWithoutFamilyInput, UserFamilyUncheckedCreateWithoutFamilyInput> | UserFamilyCreateWithoutFamilyInput[] | UserFamilyUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserFamilyCreateOrConnectWithoutFamilyInput | UserFamilyCreateOrConnectWithoutFamilyInput[]
    createMany?: UserFamilyCreateManyFamilyInputEnvelope
    connect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
  }

  export type FamilyMembershipUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<FamilyMembershipCreateWithoutFamilyInput, FamilyMembershipUncheckedCreateWithoutFamilyInput> | FamilyMembershipCreateWithoutFamilyInput[] | FamilyMembershipUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: FamilyMembershipCreateOrConnectWithoutFamilyInput | FamilyMembershipCreateOrConnectWithoutFamilyInput[]
    createMany?: FamilyMembershipCreateManyFamilyInputEnvelope
    connect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
  }

  export type UserFamilyUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<UserFamilyCreateWithoutFamilyInput, UserFamilyUncheckedCreateWithoutFamilyInput> | UserFamilyCreateWithoutFamilyInput[] | UserFamilyUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserFamilyCreateOrConnectWithoutFamilyInput | UserFamilyCreateOrConnectWithoutFamilyInput[]
    createMany?: UserFamilyCreateManyFamilyInputEnvelope
    connect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
  }

  export type FamilyMembershipUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<FamilyMembershipCreateWithoutFamilyInput, FamilyMembershipUncheckedCreateWithoutFamilyInput> | FamilyMembershipCreateWithoutFamilyInput[] | FamilyMembershipUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: FamilyMembershipCreateOrConnectWithoutFamilyInput | FamilyMembershipCreateOrConnectWithoutFamilyInput[]
    upsert?: FamilyMembershipUpsertWithWhereUniqueWithoutFamilyInput | FamilyMembershipUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: FamilyMembershipCreateManyFamilyInputEnvelope
    set?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    disconnect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    delete?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    connect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    update?: FamilyMembershipUpdateWithWhereUniqueWithoutFamilyInput | FamilyMembershipUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: FamilyMembershipUpdateManyWithWhereWithoutFamilyInput | FamilyMembershipUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: FamilyMembershipScalarWhereInput | FamilyMembershipScalarWhereInput[]
  }

  export type UserFamilyUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<UserFamilyCreateWithoutFamilyInput, UserFamilyUncheckedCreateWithoutFamilyInput> | UserFamilyCreateWithoutFamilyInput[] | UserFamilyUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserFamilyCreateOrConnectWithoutFamilyInput | UserFamilyCreateOrConnectWithoutFamilyInput[]
    upsert?: UserFamilyUpsertWithWhereUniqueWithoutFamilyInput | UserFamilyUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: UserFamilyCreateManyFamilyInputEnvelope
    set?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    disconnect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    delete?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    connect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    update?: UserFamilyUpdateWithWhereUniqueWithoutFamilyInput | UserFamilyUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: UserFamilyUpdateManyWithWhereWithoutFamilyInput | UserFamilyUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: UserFamilyScalarWhereInput | UserFamilyScalarWhereInput[]
  }

  export type FamilyMembershipUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<FamilyMembershipCreateWithoutFamilyInput, FamilyMembershipUncheckedCreateWithoutFamilyInput> | FamilyMembershipCreateWithoutFamilyInput[] | FamilyMembershipUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: FamilyMembershipCreateOrConnectWithoutFamilyInput | FamilyMembershipCreateOrConnectWithoutFamilyInput[]
    upsert?: FamilyMembershipUpsertWithWhereUniqueWithoutFamilyInput | FamilyMembershipUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: FamilyMembershipCreateManyFamilyInputEnvelope
    set?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    disconnect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    delete?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    connect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    update?: FamilyMembershipUpdateWithWhereUniqueWithoutFamilyInput | FamilyMembershipUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: FamilyMembershipUpdateManyWithWhereWithoutFamilyInput | FamilyMembershipUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: FamilyMembershipScalarWhereInput | FamilyMembershipScalarWhereInput[]
  }

  export type UserFamilyUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<UserFamilyCreateWithoutFamilyInput, UserFamilyUncheckedCreateWithoutFamilyInput> | UserFamilyCreateWithoutFamilyInput[] | UserFamilyUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserFamilyCreateOrConnectWithoutFamilyInput | UserFamilyCreateOrConnectWithoutFamilyInput[]
    upsert?: UserFamilyUpsertWithWhereUniqueWithoutFamilyInput | UserFamilyUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: UserFamilyCreateManyFamilyInputEnvelope
    set?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    disconnect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    delete?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    connect?: UserFamilyWhereUniqueInput | UserFamilyWhereUniqueInput[]
    update?: UserFamilyUpdateWithWhereUniqueWithoutFamilyInput | UserFamilyUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: UserFamilyUpdateManyWithWhereWithoutFamilyInput | UserFamilyUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: UserFamilyScalarWhereInput | UserFamilyScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserFamiliesInput = {
    create?: XOR<UserCreateWithoutUserFamiliesInput, UserUncheckedCreateWithoutUserFamiliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserFamiliesInput
    connect?: UserWhereUniqueInput
  }

  export type FamilyCreateNestedOneWithoutUserFamiliesInput = {
    create?: XOR<FamilyCreateWithoutUserFamiliesInput, FamilyUncheckedCreateWithoutUserFamiliesInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutUserFamiliesInput
    connect?: FamilyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserFamiliesNestedInput = {
    create?: XOR<UserCreateWithoutUserFamiliesInput, UserUncheckedCreateWithoutUserFamiliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserFamiliesInput
    upsert?: UserUpsertWithoutUserFamiliesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserFamiliesInput, UserUpdateWithoutUserFamiliesInput>, UserUncheckedUpdateWithoutUserFamiliesInput>
  }

  export type FamilyUpdateOneRequiredWithoutUserFamiliesNestedInput = {
    create?: XOR<FamilyCreateWithoutUserFamiliesInput, FamilyUncheckedCreateWithoutUserFamiliesInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutUserFamiliesInput
    upsert?: FamilyUpsertWithoutUserFamiliesInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutUserFamiliesInput, FamilyUpdateWithoutUserFamiliesInput>, FamilyUncheckedUpdateWithoutUserFamiliesInput>
  }

  export type FamilyMembershipCreateNestedManyWithoutPersonInput = {
    create?: XOR<FamilyMembershipCreateWithoutPersonInput, FamilyMembershipUncheckedCreateWithoutPersonInput> | FamilyMembershipCreateWithoutPersonInput[] | FamilyMembershipUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: FamilyMembershipCreateOrConnectWithoutPersonInput | FamilyMembershipCreateOrConnectWithoutPersonInput[]
    createMany?: FamilyMembershipCreateManyPersonInputEnvelope
    connect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
  }

  export type ParentChildCreateNestedManyWithoutChildInput = {
    create?: XOR<ParentChildCreateWithoutChildInput, ParentChildUncheckedCreateWithoutChildInput> | ParentChildCreateWithoutChildInput[] | ParentChildUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ParentChildCreateOrConnectWithoutChildInput | ParentChildCreateOrConnectWithoutChildInput[]
    createMany?: ParentChildCreateManyChildInputEnvelope
    connect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
  }

  export type ParentChildCreateNestedManyWithoutParentInput = {
    create?: XOR<ParentChildCreateWithoutParentInput, ParentChildUncheckedCreateWithoutParentInput> | ParentChildCreateWithoutParentInput[] | ParentChildUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentChildCreateOrConnectWithoutParentInput | ParentChildCreateOrConnectWithoutParentInput[]
    createMany?: ParentChildCreateManyParentInputEnvelope
    connect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
  }

  export type PartnershipCreateNestedManyWithoutPersonAInput = {
    create?: XOR<PartnershipCreateWithoutPersonAInput, PartnershipUncheckedCreateWithoutPersonAInput> | PartnershipCreateWithoutPersonAInput[] | PartnershipUncheckedCreateWithoutPersonAInput[]
    connectOrCreate?: PartnershipCreateOrConnectWithoutPersonAInput | PartnershipCreateOrConnectWithoutPersonAInput[]
    createMany?: PartnershipCreateManyPersonAInputEnvelope
    connect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
  }

  export type PartnershipCreateNestedManyWithoutPersonBInput = {
    create?: XOR<PartnershipCreateWithoutPersonBInput, PartnershipUncheckedCreateWithoutPersonBInput> | PartnershipCreateWithoutPersonBInput[] | PartnershipUncheckedCreateWithoutPersonBInput[]
    connectOrCreate?: PartnershipCreateOrConnectWithoutPersonBInput | PartnershipCreateOrConnectWithoutPersonBInput[]
    createMany?: PartnershipCreateManyPersonBInputEnvelope
    connect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
  }

  export type FamilyMembershipUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<FamilyMembershipCreateWithoutPersonInput, FamilyMembershipUncheckedCreateWithoutPersonInput> | FamilyMembershipCreateWithoutPersonInput[] | FamilyMembershipUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: FamilyMembershipCreateOrConnectWithoutPersonInput | FamilyMembershipCreateOrConnectWithoutPersonInput[]
    createMany?: FamilyMembershipCreateManyPersonInputEnvelope
    connect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
  }

  export type ParentChildUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<ParentChildCreateWithoutChildInput, ParentChildUncheckedCreateWithoutChildInput> | ParentChildCreateWithoutChildInput[] | ParentChildUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ParentChildCreateOrConnectWithoutChildInput | ParentChildCreateOrConnectWithoutChildInput[]
    createMany?: ParentChildCreateManyChildInputEnvelope
    connect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
  }

  export type ParentChildUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<ParentChildCreateWithoutParentInput, ParentChildUncheckedCreateWithoutParentInput> | ParentChildCreateWithoutParentInput[] | ParentChildUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentChildCreateOrConnectWithoutParentInput | ParentChildCreateOrConnectWithoutParentInput[]
    createMany?: ParentChildCreateManyParentInputEnvelope
    connect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
  }

  export type PartnershipUncheckedCreateNestedManyWithoutPersonAInput = {
    create?: XOR<PartnershipCreateWithoutPersonAInput, PartnershipUncheckedCreateWithoutPersonAInput> | PartnershipCreateWithoutPersonAInput[] | PartnershipUncheckedCreateWithoutPersonAInput[]
    connectOrCreate?: PartnershipCreateOrConnectWithoutPersonAInput | PartnershipCreateOrConnectWithoutPersonAInput[]
    createMany?: PartnershipCreateManyPersonAInputEnvelope
    connect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
  }

  export type PartnershipUncheckedCreateNestedManyWithoutPersonBInput = {
    create?: XOR<PartnershipCreateWithoutPersonBInput, PartnershipUncheckedCreateWithoutPersonBInput> | PartnershipCreateWithoutPersonBInput[] | PartnershipUncheckedCreateWithoutPersonBInput[]
    connectOrCreate?: PartnershipCreateOrConnectWithoutPersonBInput | PartnershipCreateOrConnectWithoutPersonBInput[]
    createMany?: PartnershipCreateManyPersonBInputEnvelope
    connect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
  }

  export type FamilyMembershipUpdateManyWithoutPersonNestedInput = {
    create?: XOR<FamilyMembershipCreateWithoutPersonInput, FamilyMembershipUncheckedCreateWithoutPersonInput> | FamilyMembershipCreateWithoutPersonInput[] | FamilyMembershipUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: FamilyMembershipCreateOrConnectWithoutPersonInput | FamilyMembershipCreateOrConnectWithoutPersonInput[]
    upsert?: FamilyMembershipUpsertWithWhereUniqueWithoutPersonInput | FamilyMembershipUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: FamilyMembershipCreateManyPersonInputEnvelope
    set?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    disconnect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    delete?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    connect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    update?: FamilyMembershipUpdateWithWhereUniqueWithoutPersonInput | FamilyMembershipUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: FamilyMembershipUpdateManyWithWhereWithoutPersonInput | FamilyMembershipUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: FamilyMembershipScalarWhereInput | FamilyMembershipScalarWhereInput[]
  }

  export type ParentChildUpdateManyWithoutChildNestedInput = {
    create?: XOR<ParentChildCreateWithoutChildInput, ParentChildUncheckedCreateWithoutChildInput> | ParentChildCreateWithoutChildInput[] | ParentChildUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ParentChildCreateOrConnectWithoutChildInput | ParentChildCreateOrConnectWithoutChildInput[]
    upsert?: ParentChildUpsertWithWhereUniqueWithoutChildInput | ParentChildUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ParentChildCreateManyChildInputEnvelope
    set?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    disconnect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    delete?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    connect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    update?: ParentChildUpdateWithWhereUniqueWithoutChildInput | ParentChildUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ParentChildUpdateManyWithWhereWithoutChildInput | ParentChildUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ParentChildScalarWhereInput | ParentChildScalarWhereInput[]
  }

  export type ParentChildUpdateManyWithoutParentNestedInput = {
    create?: XOR<ParentChildCreateWithoutParentInput, ParentChildUncheckedCreateWithoutParentInput> | ParentChildCreateWithoutParentInput[] | ParentChildUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentChildCreateOrConnectWithoutParentInput | ParentChildCreateOrConnectWithoutParentInput[]
    upsert?: ParentChildUpsertWithWhereUniqueWithoutParentInput | ParentChildUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ParentChildCreateManyParentInputEnvelope
    set?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    disconnect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    delete?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    connect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    update?: ParentChildUpdateWithWhereUniqueWithoutParentInput | ParentChildUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ParentChildUpdateManyWithWhereWithoutParentInput | ParentChildUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ParentChildScalarWhereInput | ParentChildScalarWhereInput[]
  }

  export type PartnershipUpdateManyWithoutPersonANestedInput = {
    create?: XOR<PartnershipCreateWithoutPersonAInput, PartnershipUncheckedCreateWithoutPersonAInput> | PartnershipCreateWithoutPersonAInput[] | PartnershipUncheckedCreateWithoutPersonAInput[]
    connectOrCreate?: PartnershipCreateOrConnectWithoutPersonAInput | PartnershipCreateOrConnectWithoutPersonAInput[]
    upsert?: PartnershipUpsertWithWhereUniqueWithoutPersonAInput | PartnershipUpsertWithWhereUniqueWithoutPersonAInput[]
    createMany?: PartnershipCreateManyPersonAInputEnvelope
    set?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    disconnect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    delete?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    connect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    update?: PartnershipUpdateWithWhereUniqueWithoutPersonAInput | PartnershipUpdateWithWhereUniqueWithoutPersonAInput[]
    updateMany?: PartnershipUpdateManyWithWhereWithoutPersonAInput | PartnershipUpdateManyWithWhereWithoutPersonAInput[]
    deleteMany?: PartnershipScalarWhereInput | PartnershipScalarWhereInput[]
  }

  export type PartnershipUpdateManyWithoutPersonBNestedInput = {
    create?: XOR<PartnershipCreateWithoutPersonBInput, PartnershipUncheckedCreateWithoutPersonBInput> | PartnershipCreateWithoutPersonBInput[] | PartnershipUncheckedCreateWithoutPersonBInput[]
    connectOrCreate?: PartnershipCreateOrConnectWithoutPersonBInput | PartnershipCreateOrConnectWithoutPersonBInput[]
    upsert?: PartnershipUpsertWithWhereUniqueWithoutPersonBInput | PartnershipUpsertWithWhereUniqueWithoutPersonBInput[]
    createMany?: PartnershipCreateManyPersonBInputEnvelope
    set?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    disconnect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    delete?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    connect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    update?: PartnershipUpdateWithWhereUniqueWithoutPersonBInput | PartnershipUpdateWithWhereUniqueWithoutPersonBInput[]
    updateMany?: PartnershipUpdateManyWithWhereWithoutPersonBInput | PartnershipUpdateManyWithWhereWithoutPersonBInput[]
    deleteMany?: PartnershipScalarWhereInput | PartnershipScalarWhereInput[]
  }

  export type FamilyMembershipUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: XOR<FamilyMembershipCreateWithoutPersonInput, FamilyMembershipUncheckedCreateWithoutPersonInput> | FamilyMembershipCreateWithoutPersonInput[] | FamilyMembershipUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: FamilyMembershipCreateOrConnectWithoutPersonInput | FamilyMembershipCreateOrConnectWithoutPersonInput[]
    upsert?: FamilyMembershipUpsertWithWhereUniqueWithoutPersonInput | FamilyMembershipUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: FamilyMembershipCreateManyPersonInputEnvelope
    set?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    disconnect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    delete?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    connect?: FamilyMembershipWhereUniqueInput | FamilyMembershipWhereUniqueInput[]
    update?: FamilyMembershipUpdateWithWhereUniqueWithoutPersonInput | FamilyMembershipUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: FamilyMembershipUpdateManyWithWhereWithoutPersonInput | FamilyMembershipUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: FamilyMembershipScalarWhereInput | FamilyMembershipScalarWhereInput[]
  }

  export type ParentChildUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<ParentChildCreateWithoutChildInput, ParentChildUncheckedCreateWithoutChildInput> | ParentChildCreateWithoutChildInput[] | ParentChildUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ParentChildCreateOrConnectWithoutChildInput | ParentChildCreateOrConnectWithoutChildInput[]
    upsert?: ParentChildUpsertWithWhereUniqueWithoutChildInput | ParentChildUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ParentChildCreateManyChildInputEnvelope
    set?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    disconnect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    delete?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    connect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    update?: ParentChildUpdateWithWhereUniqueWithoutChildInput | ParentChildUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ParentChildUpdateManyWithWhereWithoutChildInput | ParentChildUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ParentChildScalarWhereInput | ParentChildScalarWhereInput[]
  }

  export type ParentChildUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<ParentChildCreateWithoutParentInput, ParentChildUncheckedCreateWithoutParentInput> | ParentChildCreateWithoutParentInput[] | ParentChildUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentChildCreateOrConnectWithoutParentInput | ParentChildCreateOrConnectWithoutParentInput[]
    upsert?: ParentChildUpsertWithWhereUniqueWithoutParentInput | ParentChildUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ParentChildCreateManyParentInputEnvelope
    set?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    disconnect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    delete?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    connect?: ParentChildWhereUniqueInput | ParentChildWhereUniqueInput[]
    update?: ParentChildUpdateWithWhereUniqueWithoutParentInput | ParentChildUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ParentChildUpdateManyWithWhereWithoutParentInput | ParentChildUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ParentChildScalarWhereInput | ParentChildScalarWhereInput[]
  }

  export type PartnershipUncheckedUpdateManyWithoutPersonANestedInput = {
    create?: XOR<PartnershipCreateWithoutPersonAInput, PartnershipUncheckedCreateWithoutPersonAInput> | PartnershipCreateWithoutPersonAInput[] | PartnershipUncheckedCreateWithoutPersonAInput[]
    connectOrCreate?: PartnershipCreateOrConnectWithoutPersonAInput | PartnershipCreateOrConnectWithoutPersonAInput[]
    upsert?: PartnershipUpsertWithWhereUniqueWithoutPersonAInput | PartnershipUpsertWithWhereUniqueWithoutPersonAInput[]
    createMany?: PartnershipCreateManyPersonAInputEnvelope
    set?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    disconnect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    delete?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    connect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    update?: PartnershipUpdateWithWhereUniqueWithoutPersonAInput | PartnershipUpdateWithWhereUniqueWithoutPersonAInput[]
    updateMany?: PartnershipUpdateManyWithWhereWithoutPersonAInput | PartnershipUpdateManyWithWhereWithoutPersonAInput[]
    deleteMany?: PartnershipScalarWhereInput | PartnershipScalarWhereInput[]
  }

  export type PartnershipUncheckedUpdateManyWithoutPersonBNestedInput = {
    create?: XOR<PartnershipCreateWithoutPersonBInput, PartnershipUncheckedCreateWithoutPersonBInput> | PartnershipCreateWithoutPersonBInput[] | PartnershipUncheckedCreateWithoutPersonBInput[]
    connectOrCreate?: PartnershipCreateOrConnectWithoutPersonBInput | PartnershipCreateOrConnectWithoutPersonBInput[]
    upsert?: PartnershipUpsertWithWhereUniqueWithoutPersonBInput | PartnershipUpsertWithWhereUniqueWithoutPersonBInput[]
    createMany?: PartnershipCreateManyPersonBInputEnvelope
    set?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    disconnect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    delete?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    connect?: PartnershipWhereUniqueInput | PartnershipWhereUniqueInput[]
    update?: PartnershipUpdateWithWhereUniqueWithoutPersonBInput | PartnershipUpdateWithWhereUniqueWithoutPersonBInput[]
    updateMany?: PartnershipUpdateManyWithWhereWithoutPersonBInput | PartnershipUpdateManyWithWhereWithoutPersonBInput[]
    deleteMany?: PartnershipScalarWhereInput | PartnershipScalarWhereInput[]
  }

  export type PersonCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<PersonCreateWithoutMembershipsInput, PersonUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutMembershipsInput
    connect?: PersonWhereUniqueInput
  }

  export type FamilyCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<FamilyCreateWithoutMembershipsInput, FamilyUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutMembershipsInput
    connect?: FamilyWhereUniqueInput
  }

  export type PersonUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<PersonCreateWithoutMembershipsInput, PersonUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutMembershipsInput
    upsert?: PersonUpsertWithoutMembershipsInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutMembershipsInput, PersonUpdateWithoutMembershipsInput>, PersonUncheckedUpdateWithoutMembershipsInput>
  }

  export type FamilyUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<FamilyCreateWithoutMembershipsInput, FamilyUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutMembershipsInput
    upsert?: FamilyUpsertWithoutMembershipsInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutMembershipsInput, FamilyUpdateWithoutMembershipsInput>, FamilyUncheckedUpdateWithoutMembershipsInput>
  }

  export type PersonCreateNestedOneWithoutChildEdgesInput = {
    create?: XOR<PersonCreateWithoutChildEdgesInput, PersonUncheckedCreateWithoutChildEdgesInput>
    connectOrCreate?: PersonCreateOrConnectWithoutChildEdgesInput
    connect?: PersonWhereUniqueInput
  }

  export type PersonCreateNestedOneWithoutParentEdgesInput = {
    create?: XOR<PersonCreateWithoutParentEdgesInput, PersonUncheckedCreateWithoutParentEdgesInput>
    connectOrCreate?: PersonCreateOrConnectWithoutParentEdgesInput
    connect?: PersonWhereUniqueInput
  }

  export type EnumParentRoleFieldUpdateOperationsInput = {
    set?: $Enums.ParentRole
  }

  export type PersonUpdateOneRequiredWithoutChildEdgesNestedInput = {
    create?: XOR<PersonCreateWithoutChildEdgesInput, PersonUncheckedCreateWithoutChildEdgesInput>
    connectOrCreate?: PersonCreateOrConnectWithoutChildEdgesInput
    upsert?: PersonUpsertWithoutChildEdgesInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutChildEdgesInput, PersonUpdateWithoutChildEdgesInput>, PersonUncheckedUpdateWithoutChildEdgesInput>
  }

  export type PersonUpdateOneRequiredWithoutParentEdgesNestedInput = {
    create?: XOR<PersonCreateWithoutParentEdgesInput, PersonUncheckedCreateWithoutParentEdgesInput>
    connectOrCreate?: PersonCreateOrConnectWithoutParentEdgesInput
    upsert?: PersonUpsertWithoutParentEdgesInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutParentEdgesInput, PersonUpdateWithoutParentEdgesInput>, PersonUncheckedUpdateWithoutParentEdgesInput>
  }

  export type PersonCreateNestedOneWithoutPartnershipsAInput = {
    create?: XOR<PersonCreateWithoutPartnershipsAInput, PersonUncheckedCreateWithoutPartnershipsAInput>
    connectOrCreate?: PersonCreateOrConnectWithoutPartnershipsAInput
    connect?: PersonWhereUniqueInput
  }

  export type PersonCreateNestedOneWithoutPartnershipsBInput = {
    create?: XOR<PersonCreateWithoutPartnershipsBInput, PersonUncheckedCreateWithoutPartnershipsBInput>
    connectOrCreate?: PersonCreateOrConnectWithoutPartnershipsBInput
    connect?: PersonWhereUniqueInput
  }

  export type EnumPartnershipKindFieldUpdateOperationsInput = {
    set?: $Enums.PartnershipKind
  }

  export type PersonUpdateOneRequiredWithoutPartnershipsANestedInput = {
    create?: XOR<PersonCreateWithoutPartnershipsAInput, PersonUncheckedCreateWithoutPartnershipsAInput>
    connectOrCreate?: PersonCreateOrConnectWithoutPartnershipsAInput
    upsert?: PersonUpsertWithoutPartnershipsAInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutPartnershipsAInput, PersonUpdateWithoutPartnershipsAInput>, PersonUncheckedUpdateWithoutPartnershipsAInput>
  }

  export type PersonUpdateOneRequiredWithoutPartnershipsBNestedInput = {
    create?: XOR<PersonCreateWithoutPartnershipsBInput, PersonUncheckedCreateWithoutPartnershipsBInput>
    connectOrCreate?: PersonCreateOrConnectWithoutPartnershipsBInput
    upsert?: PersonUpsertWithoutPartnershipsBInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutPartnershipsBInput, PersonUpdateWithoutPartnershipsBInput>, PersonUncheckedUpdateWithoutPartnershipsBInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumParentRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ParentRole | EnumParentRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ParentRole[] | ListEnumParentRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ParentRole[] | ListEnumParentRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumParentRoleFilter<$PrismaModel> | $Enums.ParentRole
  }

  export type NestedEnumParentRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ParentRole | EnumParentRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ParentRole[] | ListEnumParentRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ParentRole[] | ListEnumParentRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumParentRoleWithAggregatesFilter<$PrismaModel> | $Enums.ParentRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumParentRoleFilter<$PrismaModel>
    _max?: NestedEnumParentRoleFilter<$PrismaModel>
  }

  export type NestedEnumPartnershipKindFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnershipKind | EnumPartnershipKindFieldRefInput<$PrismaModel>
    in?: $Enums.PartnershipKind[] | ListEnumPartnershipKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnershipKind[] | ListEnumPartnershipKindFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnershipKindFilter<$PrismaModel> | $Enums.PartnershipKind
  }

  export type NestedEnumPartnershipKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnershipKind | EnumPartnershipKindFieldRefInput<$PrismaModel>
    in?: $Enums.PartnershipKind[] | ListEnumPartnershipKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnershipKind[] | ListEnumPartnershipKindFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnershipKindWithAggregatesFilter<$PrismaModel> | $Enums.PartnershipKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartnershipKindFilter<$PrismaModel>
    _max?: NestedEnumPartnershipKindFilter<$PrismaModel>
  }

  export type UserFamilyCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutUserFamiliesInput
  }

  export type UserFamilyUncheckedCreateWithoutUserInput = {
    familyId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFamilyCreateOrConnectWithoutUserInput = {
    where: UserFamilyWhereUniqueInput
    create: XOR<UserFamilyCreateWithoutUserInput, UserFamilyUncheckedCreateWithoutUserInput>
  }

  export type UserFamilyCreateManyUserInputEnvelope = {
    data: UserFamilyCreateManyUserInput | UserFamilyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserFamilyUpsertWithWhereUniqueWithoutUserInput = {
    where: UserFamilyWhereUniqueInput
    update: XOR<UserFamilyUpdateWithoutUserInput, UserFamilyUncheckedUpdateWithoutUserInput>
    create: XOR<UserFamilyCreateWithoutUserInput, UserFamilyUncheckedCreateWithoutUserInput>
  }

  export type UserFamilyUpdateWithWhereUniqueWithoutUserInput = {
    where: UserFamilyWhereUniqueInput
    data: XOR<UserFamilyUpdateWithoutUserInput, UserFamilyUncheckedUpdateWithoutUserInput>
  }

  export type UserFamilyUpdateManyWithWhereWithoutUserInput = {
    where: UserFamilyScalarWhereInput
    data: XOR<UserFamilyUpdateManyMutationInput, UserFamilyUncheckedUpdateManyWithoutUserInput>
  }

  export type UserFamilyScalarWhereInput = {
    AND?: UserFamilyScalarWhereInput | UserFamilyScalarWhereInput[]
    OR?: UserFamilyScalarWhereInput[]
    NOT?: UserFamilyScalarWhereInput | UserFamilyScalarWhereInput[]
    userId?: IntFilter<"UserFamily"> | number
    familyId?: IntFilter<"UserFamily"> | number
    createdAt?: DateTimeFilter<"UserFamily"> | Date | string
    updatedAt?: DateTimeFilter<"UserFamily"> | Date | string
  }

  export type FamilyMembershipCreateWithoutFamilyInput = {
    joinedAt?: Date | string
    person: PersonCreateNestedOneWithoutMembershipsInput
  }

  export type FamilyMembershipUncheckedCreateWithoutFamilyInput = {
    personId: number
    joinedAt?: Date | string
  }

  export type FamilyMembershipCreateOrConnectWithoutFamilyInput = {
    where: FamilyMembershipWhereUniqueInput
    create: XOR<FamilyMembershipCreateWithoutFamilyInput, FamilyMembershipUncheckedCreateWithoutFamilyInput>
  }

  export type FamilyMembershipCreateManyFamilyInputEnvelope = {
    data: FamilyMembershipCreateManyFamilyInput | FamilyMembershipCreateManyFamilyInput[]
    skipDuplicates?: boolean
  }

  export type UserFamilyCreateWithoutFamilyInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserFamiliesInput
  }

  export type UserFamilyUncheckedCreateWithoutFamilyInput = {
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFamilyCreateOrConnectWithoutFamilyInput = {
    where: UserFamilyWhereUniqueInput
    create: XOR<UserFamilyCreateWithoutFamilyInput, UserFamilyUncheckedCreateWithoutFamilyInput>
  }

  export type UserFamilyCreateManyFamilyInputEnvelope = {
    data: UserFamilyCreateManyFamilyInput | UserFamilyCreateManyFamilyInput[]
    skipDuplicates?: boolean
  }

  export type FamilyMembershipUpsertWithWhereUniqueWithoutFamilyInput = {
    where: FamilyMembershipWhereUniqueInput
    update: XOR<FamilyMembershipUpdateWithoutFamilyInput, FamilyMembershipUncheckedUpdateWithoutFamilyInput>
    create: XOR<FamilyMembershipCreateWithoutFamilyInput, FamilyMembershipUncheckedCreateWithoutFamilyInput>
  }

  export type FamilyMembershipUpdateWithWhereUniqueWithoutFamilyInput = {
    where: FamilyMembershipWhereUniqueInput
    data: XOR<FamilyMembershipUpdateWithoutFamilyInput, FamilyMembershipUncheckedUpdateWithoutFamilyInput>
  }

  export type FamilyMembershipUpdateManyWithWhereWithoutFamilyInput = {
    where: FamilyMembershipScalarWhereInput
    data: XOR<FamilyMembershipUpdateManyMutationInput, FamilyMembershipUncheckedUpdateManyWithoutFamilyInput>
  }

  export type FamilyMembershipScalarWhereInput = {
    AND?: FamilyMembershipScalarWhereInput | FamilyMembershipScalarWhereInput[]
    OR?: FamilyMembershipScalarWhereInput[]
    NOT?: FamilyMembershipScalarWhereInput | FamilyMembershipScalarWhereInput[]
    personId?: IntFilter<"FamilyMembership"> | number
    familyId?: IntFilter<"FamilyMembership"> | number
    joinedAt?: DateTimeFilter<"FamilyMembership"> | Date | string
  }

  export type UserFamilyUpsertWithWhereUniqueWithoutFamilyInput = {
    where: UserFamilyWhereUniqueInput
    update: XOR<UserFamilyUpdateWithoutFamilyInput, UserFamilyUncheckedUpdateWithoutFamilyInput>
    create: XOR<UserFamilyCreateWithoutFamilyInput, UserFamilyUncheckedCreateWithoutFamilyInput>
  }

  export type UserFamilyUpdateWithWhereUniqueWithoutFamilyInput = {
    where: UserFamilyWhereUniqueInput
    data: XOR<UserFamilyUpdateWithoutFamilyInput, UserFamilyUncheckedUpdateWithoutFamilyInput>
  }

  export type UserFamilyUpdateManyWithWhereWithoutFamilyInput = {
    where: UserFamilyScalarWhereInput
    data: XOR<UserFamilyUpdateManyMutationInput, UserFamilyUncheckedUpdateManyWithoutFamilyInput>
  }

  export type UserCreateWithoutUserFamiliesInput = {
    email: string
    password: string
    isConfirmed?: boolean
    confirmationToken?: string | null
    confirmationTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutUserFamiliesInput = {
    id?: number
    email: string
    password: string
    isConfirmed?: boolean
    confirmationToken?: string | null
    confirmationTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutUserFamiliesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserFamiliesInput, UserUncheckedCreateWithoutUserFamiliesInput>
  }

  export type FamilyCreateWithoutUserFamiliesInput = {
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutUserFamiliesInput = {
    id?: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutUserFamiliesInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutUserFamiliesInput, FamilyUncheckedCreateWithoutUserFamiliesInput>
  }

  export type UserUpsertWithoutUserFamiliesInput = {
    update: XOR<UserUpdateWithoutUserFamiliesInput, UserUncheckedUpdateWithoutUserFamiliesInput>
    create: XOR<UserCreateWithoutUserFamiliesInput, UserUncheckedCreateWithoutUserFamiliesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserFamiliesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserFamiliesInput, UserUncheckedUpdateWithoutUserFamiliesInput>
  }

  export type UserUpdateWithoutUserFamiliesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    confirmationToken?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutUserFamiliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    confirmationToken?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyUpsertWithoutUserFamiliesInput = {
    update: XOR<FamilyUpdateWithoutUserFamiliesInput, FamilyUncheckedUpdateWithoutUserFamiliesInput>
    create: XOR<FamilyCreateWithoutUserFamiliesInput, FamilyUncheckedCreateWithoutUserFamiliesInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutUserFamiliesInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutUserFamiliesInput, FamilyUncheckedUpdateWithoutUserFamiliesInput>
  }

  export type FamilyUpdateWithoutUserFamiliesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutUserFamiliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyMembershipCreateWithoutPersonInput = {
    joinedAt?: Date | string
    family: FamilyCreateNestedOneWithoutMembershipsInput
  }

  export type FamilyMembershipUncheckedCreateWithoutPersonInput = {
    familyId: number
    joinedAt?: Date | string
  }

  export type FamilyMembershipCreateOrConnectWithoutPersonInput = {
    where: FamilyMembershipWhereUniqueInput
    create: XOR<FamilyMembershipCreateWithoutPersonInput, FamilyMembershipUncheckedCreateWithoutPersonInput>
  }

  export type FamilyMembershipCreateManyPersonInputEnvelope = {
    data: FamilyMembershipCreateManyPersonInput | FamilyMembershipCreateManyPersonInput[]
    skipDuplicates?: boolean
  }

  export type ParentChildCreateWithoutChildInput = {
    role: $Enums.ParentRole
    parent: PersonCreateNestedOneWithoutParentEdgesInput
  }

  export type ParentChildUncheckedCreateWithoutChildInput = {
    parentId: number
    role: $Enums.ParentRole
  }

  export type ParentChildCreateOrConnectWithoutChildInput = {
    where: ParentChildWhereUniqueInput
    create: XOR<ParentChildCreateWithoutChildInput, ParentChildUncheckedCreateWithoutChildInput>
  }

  export type ParentChildCreateManyChildInputEnvelope = {
    data: ParentChildCreateManyChildInput | ParentChildCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type ParentChildCreateWithoutParentInput = {
    role: $Enums.ParentRole
    child: PersonCreateNestedOneWithoutChildEdgesInput
  }

  export type ParentChildUncheckedCreateWithoutParentInput = {
    childId: number
    role: $Enums.ParentRole
  }

  export type ParentChildCreateOrConnectWithoutParentInput = {
    where: ParentChildWhereUniqueInput
    create: XOR<ParentChildCreateWithoutParentInput, ParentChildUncheckedCreateWithoutParentInput>
  }

  export type ParentChildCreateManyParentInputEnvelope = {
    data: ParentChildCreateManyParentInput | ParentChildCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type PartnershipCreateWithoutPersonAInput = {
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    personB: PersonCreateNestedOneWithoutPartnershipsBInput
  }

  export type PartnershipUncheckedCreateWithoutPersonAInput = {
    id?: number
    personBId: number
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnershipCreateOrConnectWithoutPersonAInput = {
    where: PartnershipWhereUniqueInput
    create: XOR<PartnershipCreateWithoutPersonAInput, PartnershipUncheckedCreateWithoutPersonAInput>
  }

  export type PartnershipCreateManyPersonAInputEnvelope = {
    data: PartnershipCreateManyPersonAInput | PartnershipCreateManyPersonAInput[]
    skipDuplicates?: boolean
  }

  export type PartnershipCreateWithoutPersonBInput = {
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    personA: PersonCreateNestedOneWithoutPartnershipsAInput
  }

  export type PartnershipUncheckedCreateWithoutPersonBInput = {
    id?: number
    personAId: number
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnershipCreateOrConnectWithoutPersonBInput = {
    where: PartnershipWhereUniqueInput
    create: XOR<PartnershipCreateWithoutPersonBInput, PartnershipUncheckedCreateWithoutPersonBInput>
  }

  export type PartnershipCreateManyPersonBInputEnvelope = {
    data: PartnershipCreateManyPersonBInput | PartnershipCreateManyPersonBInput[]
    skipDuplicates?: boolean
  }

  export type FamilyMembershipUpsertWithWhereUniqueWithoutPersonInput = {
    where: FamilyMembershipWhereUniqueInput
    update: XOR<FamilyMembershipUpdateWithoutPersonInput, FamilyMembershipUncheckedUpdateWithoutPersonInput>
    create: XOR<FamilyMembershipCreateWithoutPersonInput, FamilyMembershipUncheckedCreateWithoutPersonInput>
  }

  export type FamilyMembershipUpdateWithWhereUniqueWithoutPersonInput = {
    where: FamilyMembershipWhereUniqueInput
    data: XOR<FamilyMembershipUpdateWithoutPersonInput, FamilyMembershipUncheckedUpdateWithoutPersonInput>
  }

  export type FamilyMembershipUpdateManyWithWhereWithoutPersonInput = {
    where: FamilyMembershipScalarWhereInput
    data: XOR<FamilyMembershipUpdateManyMutationInput, FamilyMembershipUncheckedUpdateManyWithoutPersonInput>
  }

  export type ParentChildUpsertWithWhereUniqueWithoutChildInput = {
    where: ParentChildWhereUniqueInput
    update: XOR<ParentChildUpdateWithoutChildInput, ParentChildUncheckedUpdateWithoutChildInput>
    create: XOR<ParentChildCreateWithoutChildInput, ParentChildUncheckedCreateWithoutChildInput>
  }

  export type ParentChildUpdateWithWhereUniqueWithoutChildInput = {
    where: ParentChildWhereUniqueInput
    data: XOR<ParentChildUpdateWithoutChildInput, ParentChildUncheckedUpdateWithoutChildInput>
  }

  export type ParentChildUpdateManyWithWhereWithoutChildInput = {
    where: ParentChildScalarWhereInput
    data: XOR<ParentChildUpdateManyMutationInput, ParentChildUncheckedUpdateManyWithoutChildInput>
  }

  export type ParentChildScalarWhereInput = {
    AND?: ParentChildScalarWhereInput | ParentChildScalarWhereInput[]
    OR?: ParentChildScalarWhereInput[]
    NOT?: ParentChildScalarWhereInput | ParentChildScalarWhereInput[]
    childId?: IntFilter<"ParentChild"> | number
    parentId?: IntFilter<"ParentChild"> | number
    role?: EnumParentRoleFilter<"ParentChild"> | $Enums.ParentRole
  }

  export type ParentChildUpsertWithWhereUniqueWithoutParentInput = {
    where: ParentChildWhereUniqueInput
    update: XOR<ParentChildUpdateWithoutParentInput, ParentChildUncheckedUpdateWithoutParentInput>
    create: XOR<ParentChildCreateWithoutParentInput, ParentChildUncheckedCreateWithoutParentInput>
  }

  export type ParentChildUpdateWithWhereUniqueWithoutParentInput = {
    where: ParentChildWhereUniqueInput
    data: XOR<ParentChildUpdateWithoutParentInput, ParentChildUncheckedUpdateWithoutParentInput>
  }

  export type ParentChildUpdateManyWithWhereWithoutParentInput = {
    where: ParentChildScalarWhereInput
    data: XOR<ParentChildUpdateManyMutationInput, ParentChildUncheckedUpdateManyWithoutParentInput>
  }

  export type PartnershipUpsertWithWhereUniqueWithoutPersonAInput = {
    where: PartnershipWhereUniqueInput
    update: XOR<PartnershipUpdateWithoutPersonAInput, PartnershipUncheckedUpdateWithoutPersonAInput>
    create: XOR<PartnershipCreateWithoutPersonAInput, PartnershipUncheckedCreateWithoutPersonAInput>
  }

  export type PartnershipUpdateWithWhereUniqueWithoutPersonAInput = {
    where: PartnershipWhereUniqueInput
    data: XOR<PartnershipUpdateWithoutPersonAInput, PartnershipUncheckedUpdateWithoutPersonAInput>
  }

  export type PartnershipUpdateManyWithWhereWithoutPersonAInput = {
    where: PartnershipScalarWhereInput
    data: XOR<PartnershipUpdateManyMutationInput, PartnershipUncheckedUpdateManyWithoutPersonAInput>
  }

  export type PartnershipScalarWhereInput = {
    AND?: PartnershipScalarWhereInput | PartnershipScalarWhereInput[]
    OR?: PartnershipScalarWhereInput[]
    NOT?: PartnershipScalarWhereInput | PartnershipScalarWhereInput[]
    id?: IntFilter<"Partnership"> | number
    personAId?: IntFilter<"Partnership"> | number
    personBId?: IntFilter<"Partnership"> | number
    kind?: EnumPartnershipKindFilter<"Partnership"> | $Enums.PartnershipKind
    startDate?: DateTimeNullableFilter<"Partnership"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Partnership"> | Date | string | null
    createdAt?: DateTimeFilter<"Partnership"> | Date | string
    updatedAt?: DateTimeFilter<"Partnership"> | Date | string
  }

  export type PartnershipUpsertWithWhereUniqueWithoutPersonBInput = {
    where: PartnershipWhereUniqueInput
    update: XOR<PartnershipUpdateWithoutPersonBInput, PartnershipUncheckedUpdateWithoutPersonBInput>
    create: XOR<PartnershipCreateWithoutPersonBInput, PartnershipUncheckedCreateWithoutPersonBInput>
  }

  export type PartnershipUpdateWithWhereUniqueWithoutPersonBInput = {
    where: PartnershipWhereUniqueInput
    data: XOR<PartnershipUpdateWithoutPersonBInput, PartnershipUncheckedUpdateWithoutPersonBInput>
  }

  export type PartnershipUpdateManyWithWhereWithoutPersonBInput = {
    where: PartnershipScalarWhereInput
    data: XOR<PartnershipUpdateManyMutationInput, PartnershipUncheckedUpdateManyWithoutPersonBInput>
  }

  export type PersonCreateWithoutMembershipsInput = {
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    childEdges?: ParentChildCreateNestedManyWithoutChildInput
    parentEdges?: ParentChildCreateNestedManyWithoutParentInput
    partnershipsA?: PartnershipCreateNestedManyWithoutPersonAInput
    partnershipsB?: PartnershipCreateNestedManyWithoutPersonBInput
  }

  export type PersonUncheckedCreateWithoutMembershipsInput = {
    id?: number
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    childEdges?: ParentChildUncheckedCreateNestedManyWithoutChildInput
    parentEdges?: ParentChildUncheckedCreateNestedManyWithoutParentInput
    partnershipsA?: PartnershipUncheckedCreateNestedManyWithoutPersonAInput
    partnershipsB?: PartnershipUncheckedCreateNestedManyWithoutPersonBInput
  }

  export type PersonCreateOrConnectWithoutMembershipsInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutMembershipsInput, PersonUncheckedCreateWithoutMembershipsInput>
  }

  export type FamilyCreateWithoutMembershipsInput = {
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userFamilies?: UserFamilyCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutMembershipsInput = {
    id?: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userFamilies?: UserFamilyUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutMembershipsInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutMembershipsInput, FamilyUncheckedCreateWithoutMembershipsInput>
  }

  export type PersonUpsertWithoutMembershipsInput = {
    update: XOR<PersonUpdateWithoutMembershipsInput, PersonUncheckedUpdateWithoutMembershipsInput>
    create: XOR<PersonCreateWithoutMembershipsInput, PersonUncheckedCreateWithoutMembershipsInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutMembershipsInput, PersonUncheckedUpdateWithoutMembershipsInput>
  }

  export type PersonUpdateWithoutMembershipsInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childEdges?: ParentChildUpdateManyWithoutChildNestedInput
    parentEdges?: ParentChildUpdateManyWithoutParentNestedInput
    partnershipsA?: PartnershipUpdateManyWithoutPersonANestedInput
    partnershipsB?: PartnershipUpdateManyWithoutPersonBNestedInput
  }

  export type PersonUncheckedUpdateWithoutMembershipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childEdges?: ParentChildUncheckedUpdateManyWithoutChildNestedInput
    parentEdges?: ParentChildUncheckedUpdateManyWithoutParentNestedInput
    partnershipsA?: PartnershipUncheckedUpdateManyWithoutPersonANestedInput
    partnershipsB?: PartnershipUncheckedUpdateManyWithoutPersonBNestedInput
  }

  export type FamilyUpsertWithoutMembershipsInput = {
    update: XOR<FamilyUpdateWithoutMembershipsInput, FamilyUncheckedUpdateWithoutMembershipsInput>
    create: XOR<FamilyCreateWithoutMembershipsInput, FamilyUncheckedCreateWithoutMembershipsInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutMembershipsInput, FamilyUncheckedUpdateWithoutMembershipsInput>
  }

  export type FamilyUpdateWithoutMembershipsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userFamilies?: UserFamilyUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutMembershipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userFamilies?: UserFamilyUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type PersonCreateWithoutChildEdgesInput = {
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipCreateNestedManyWithoutPersonInput
    parentEdges?: ParentChildCreateNestedManyWithoutParentInput
    partnershipsA?: PartnershipCreateNestedManyWithoutPersonAInput
    partnershipsB?: PartnershipCreateNestedManyWithoutPersonBInput
  }

  export type PersonUncheckedCreateWithoutChildEdgesInput = {
    id?: number
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipUncheckedCreateNestedManyWithoutPersonInput
    parentEdges?: ParentChildUncheckedCreateNestedManyWithoutParentInput
    partnershipsA?: PartnershipUncheckedCreateNestedManyWithoutPersonAInput
    partnershipsB?: PartnershipUncheckedCreateNestedManyWithoutPersonBInput
  }

  export type PersonCreateOrConnectWithoutChildEdgesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutChildEdgesInput, PersonUncheckedCreateWithoutChildEdgesInput>
  }

  export type PersonCreateWithoutParentEdgesInput = {
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipCreateNestedManyWithoutPersonInput
    childEdges?: ParentChildCreateNestedManyWithoutChildInput
    partnershipsA?: PartnershipCreateNestedManyWithoutPersonAInput
    partnershipsB?: PartnershipCreateNestedManyWithoutPersonBInput
  }

  export type PersonUncheckedCreateWithoutParentEdgesInput = {
    id?: number
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipUncheckedCreateNestedManyWithoutPersonInput
    childEdges?: ParentChildUncheckedCreateNestedManyWithoutChildInput
    partnershipsA?: PartnershipUncheckedCreateNestedManyWithoutPersonAInput
    partnershipsB?: PartnershipUncheckedCreateNestedManyWithoutPersonBInput
  }

  export type PersonCreateOrConnectWithoutParentEdgesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutParentEdgesInput, PersonUncheckedCreateWithoutParentEdgesInput>
  }

  export type PersonUpsertWithoutChildEdgesInput = {
    update: XOR<PersonUpdateWithoutChildEdgesInput, PersonUncheckedUpdateWithoutChildEdgesInput>
    create: XOR<PersonCreateWithoutChildEdgesInput, PersonUncheckedCreateWithoutChildEdgesInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutChildEdgesInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutChildEdgesInput, PersonUncheckedUpdateWithoutChildEdgesInput>
  }

  export type PersonUpdateWithoutChildEdgesInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUpdateManyWithoutPersonNestedInput
    parentEdges?: ParentChildUpdateManyWithoutParentNestedInput
    partnershipsA?: PartnershipUpdateManyWithoutPersonANestedInput
    partnershipsB?: PartnershipUpdateManyWithoutPersonBNestedInput
  }

  export type PersonUncheckedUpdateWithoutChildEdgesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUncheckedUpdateManyWithoutPersonNestedInput
    parentEdges?: ParentChildUncheckedUpdateManyWithoutParentNestedInput
    partnershipsA?: PartnershipUncheckedUpdateManyWithoutPersonANestedInput
    partnershipsB?: PartnershipUncheckedUpdateManyWithoutPersonBNestedInput
  }

  export type PersonUpsertWithoutParentEdgesInput = {
    update: XOR<PersonUpdateWithoutParentEdgesInput, PersonUncheckedUpdateWithoutParentEdgesInput>
    create: XOR<PersonCreateWithoutParentEdgesInput, PersonUncheckedCreateWithoutParentEdgesInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutParentEdgesInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutParentEdgesInput, PersonUncheckedUpdateWithoutParentEdgesInput>
  }

  export type PersonUpdateWithoutParentEdgesInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUpdateManyWithoutPersonNestedInput
    childEdges?: ParentChildUpdateManyWithoutChildNestedInput
    partnershipsA?: PartnershipUpdateManyWithoutPersonANestedInput
    partnershipsB?: PartnershipUpdateManyWithoutPersonBNestedInput
  }

  export type PersonUncheckedUpdateWithoutParentEdgesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUncheckedUpdateManyWithoutPersonNestedInput
    childEdges?: ParentChildUncheckedUpdateManyWithoutChildNestedInput
    partnershipsA?: PartnershipUncheckedUpdateManyWithoutPersonANestedInput
    partnershipsB?: PartnershipUncheckedUpdateManyWithoutPersonBNestedInput
  }

  export type PersonCreateWithoutPartnershipsAInput = {
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipCreateNestedManyWithoutPersonInput
    childEdges?: ParentChildCreateNestedManyWithoutChildInput
    parentEdges?: ParentChildCreateNestedManyWithoutParentInput
    partnershipsB?: PartnershipCreateNestedManyWithoutPersonBInput
  }

  export type PersonUncheckedCreateWithoutPartnershipsAInput = {
    id?: number
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipUncheckedCreateNestedManyWithoutPersonInput
    childEdges?: ParentChildUncheckedCreateNestedManyWithoutChildInput
    parentEdges?: ParentChildUncheckedCreateNestedManyWithoutParentInput
    partnershipsB?: PartnershipUncheckedCreateNestedManyWithoutPersonBInput
  }

  export type PersonCreateOrConnectWithoutPartnershipsAInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutPartnershipsAInput, PersonUncheckedCreateWithoutPartnershipsAInput>
  }

  export type PersonCreateWithoutPartnershipsBInput = {
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipCreateNestedManyWithoutPersonInput
    childEdges?: ParentChildCreateNestedManyWithoutChildInput
    parentEdges?: ParentChildCreateNestedManyWithoutParentInput
    partnershipsA?: PartnershipCreateNestedManyWithoutPersonAInput
  }

  export type PersonUncheckedCreateWithoutPartnershipsBInput = {
    id?: number
    fullName: string
    gender: string
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    birthPlace?: string | null
    bio?: string | null
    picturePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: FamilyMembershipUncheckedCreateNestedManyWithoutPersonInput
    childEdges?: ParentChildUncheckedCreateNestedManyWithoutChildInput
    parentEdges?: ParentChildUncheckedCreateNestedManyWithoutParentInput
    partnershipsA?: PartnershipUncheckedCreateNestedManyWithoutPersonAInput
  }

  export type PersonCreateOrConnectWithoutPartnershipsBInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutPartnershipsBInput, PersonUncheckedCreateWithoutPartnershipsBInput>
  }

  export type PersonUpsertWithoutPartnershipsAInput = {
    update: XOR<PersonUpdateWithoutPartnershipsAInput, PersonUncheckedUpdateWithoutPartnershipsAInput>
    create: XOR<PersonCreateWithoutPartnershipsAInput, PersonUncheckedCreateWithoutPartnershipsAInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutPartnershipsAInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutPartnershipsAInput, PersonUncheckedUpdateWithoutPartnershipsAInput>
  }

  export type PersonUpdateWithoutPartnershipsAInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUpdateManyWithoutPersonNestedInput
    childEdges?: ParentChildUpdateManyWithoutChildNestedInput
    parentEdges?: ParentChildUpdateManyWithoutParentNestedInput
    partnershipsB?: PartnershipUpdateManyWithoutPersonBNestedInput
  }

  export type PersonUncheckedUpdateWithoutPartnershipsAInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUncheckedUpdateManyWithoutPersonNestedInput
    childEdges?: ParentChildUncheckedUpdateManyWithoutChildNestedInput
    parentEdges?: ParentChildUncheckedUpdateManyWithoutParentNestedInput
    partnershipsB?: PartnershipUncheckedUpdateManyWithoutPersonBNestedInput
  }

  export type PersonUpsertWithoutPartnershipsBInput = {
    update: XOR<PersonUpdateWithoutPartnershipsBInput, PersonUncheckedUpdateWithoutPartnershipsBInput>
    create: XOR<PersonCreateWithoutPartnershipsBInput, PersonUncheckedCreateWithoutPartnershipsBInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutPartnershipsBInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutPartnershipsBInput, PersonUncheckedUpdateWithoutPartnershipsBInput>
  }

  export type PersonUpdateWithoutPartnershipsBInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUpdateManyWithoutPersonNestedInput
    childEdges?: ParentChildUpdateManyWithoutChildNestedInput
    parentEdges?: ParentChildUpdateManyWithoutParentNestedInput
    partnershipsA?: PartnershipUpdateManyWithoutPersonANestedInput
  }

  export type PersonUncheckedUpdateWithoutPartnershipsBInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthPlace?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    picturePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: FamilyMembershipUncheckedUpdateManyWithoutPersonNestedInput
    childEdges?: ParentChildUncheckedUpdateManyWithoutChildNestedInput
    parentEdges?: ParentChildUncheckedUpdateManyWithoutParentNestedInput
    partnershipsA?: PartnershipUncheckedUpdateManyWithoutPersonANestedInput
  }

  export type UserFamilyCreateManyUserInput = {
    familyId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFamilyUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutUserFamiliesNestedInput
  }

  export type UserFamilyUncheckedUpdateWithoutUserInput = {
    familyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFamilyUncheckedUpdateManyWithoutUserInput = {
    familyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMembershipCreateManyFamilyInput = {
    personId: number
    joinedAt?: Date | string
  }

  export type UserFamilyCreateManyFamilyInput = {
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FamilyMembershipUpdateWithoutFamilyInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    person?: PersonUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type FamilyMembershipUncheckedUpdateWithoutFamilyInput = {
    personId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMembershipUncheckedUpdateManyWithoutFamilyInput = {
    personId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFamilyUpdateWithoutFamilyInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserFamiliesNestedInput
  }

  export type UserFamilyUncheckedUpdateWithoutFamilyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFamilyUncheckedUpdateManyWithoutFamilyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMembershipCreateManyPersonInput = {
    familyId: number
    joinedAt?: Date | string
  }

  export type ParentChildCreateManyChildInput = {
    parentId: number
    role: $Enums.ParentRole
  }

  export type ParentChildCreateManyParentInput = {
    childId: number
    role: $Enums.ParentRole
  }

  export type PartnershipCreateManyPersonAInput = {
    id?: number
    personBId: number
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnershipCreateManyPersonBInput = {
    id?: number
    personAId: number
    kind: $Enums.PartnershipKind
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FamilyMembershipUpdateWithoutPersonInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type FamilyMembershipUncheckedUpdateWithoutPersonInput = {
    familyId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyMembershipUncheckedUpdateManyWithoutPersonInput = {
    familyId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentChildUpdateWithoutChildInput = {
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
    parent?: PersonUpdateOneRequiredWithoutParentEdgesNestedInput
  }

  export type ParentChildUncheckedUpdateWithoutChildInput = {
    parentId?: IntFieldUpdateOperationsInput | number
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
  }

  export type ParentChildUncheckedUpdateManyWithoutChildInput = {
    parentId?: IntFieldUpdateOperationsInput | number
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
  }

  export type ParentChildUpdateWithoutParentInput = {
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
    child?: PersonUpdateOneRequiredWithoutChildEdgesNestedInput
  }

  export type ParentChildUncheckedUpdateWithoutParentInput = {
    childId?: IntFieldUpdateOperationsInput | number
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
  }

  export type ParentChildUncheckedUpdateManyWithoutParentInput = {
    childId?: IntFieldUpdateOperationsInput | number
    role?: EnumParentRoleFieldUpdateOperationsInput | $Enums.ParentRole
  }

  export type PartnershipUpdateWithoutPersonAInput = {
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personB?: PersonUpdateOneRequiredWithoutPartnershipsBNestedInput
  }

  export type PartnershipUncheckedUpdateWithoutPersonAInput = {
    id?: IntFieldUpdateOperationsInput | number
    personBId?: IntFieldUpdateOperationsInput | number
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnershipUncheckedUpdateManyWithoutPersonAInput = {
    id?: IntFieldUpdateOperationsInput | number
    personBId?: IntFieldUpdateOperationsInput | number
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnershipUpdateWithoutPersonBInput = {
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personA?: PersonUpdateOneRequiredWithoutPartnershipsANestedInput
  }

  export type PartnershipUncheckedUpdateWithoutPersonBInput = {
    id?: IntFieldUpdateOperationsInput | number
    personAId?: IntFieldUpdateOperationsInput | number
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnershipUncheckedUpdateManyWithoutPersonBInput = {
    id?: IntFieldUpdateOperationsInput | number
    personAId?: IntFieldUpdateOperationsInput | number
    kind?: EnumPartnershipKindFieldUpdateOperationsInput | $Enums.PartnershipKind
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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