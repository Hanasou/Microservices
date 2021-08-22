/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "auth";

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  tokens: AuthResponse | undefined;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  username: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

const baseCreateUserRequest: object = { username: "", password: "" };

export const CreateUserRequest = {
  encode(
    message: CreateUserRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateUserRequest } as CreateUserRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateUserRequest {
    const message = { ...baseCreateUserRequest } as CreateUserRequest;
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = String(object.password);
    } else {
      message.password = "";
    }
    return message;
  },

  toJSON(message: CreateUserRequest): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateUserRequest>): CreateUserRequest {
    const message = { ...baseCreateUserRequest } as CreateUserRequest;
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = object.password;
    } else {
      message.password = "";
    }
    return message;
  },
};

const baseCreateUserResponse: object = {};

export const CreateUserResponse = {
  encode(
    message: CreateUserResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tokens !== undefined) {
      AuthResponse.encode(message.tokens, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateUserResponse } as CreateUserResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokens = AuthResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateUserResponse {
    const message = { ...baseCreateUserResponse } as CreateUserResponse;
    if (object.tokens !== undefined && object.tokens !== null) {
      message.tokens = AuthResponse.fromJSON(object.tokens);
    } else {
      message.tokens = undefined;
    }
    return message;
  },

  toJSON(message: CreateUserResponse): unknown {
    const obj: any = {};
    message.tokens !== undefined &&
      (obj.tokens = message.tokens
        ? AuthResponse.toJSON(message.tokens)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateUserResponse>): CreateUserResponse {
    const message = { ...baseCreateUserResponse } as CreateUserResponse;
    if (object.tokens !== undefined && object.tokens !== null) {
      message.tokens = AuthResponse.fromPartial(object.tokens);
    } else {
      message.tokens = undefined;
    }
    return message;
  },
};

const baseAuthRequest: object = { username: "", password: "" };

export const AuthRequest = {
  encode(
    message: AuthRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthRequest } as AuthRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthRequest {
    const message = { ...baseAuthRequest } as AuthRequest;
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = String(object.password);
    } else {
      message.password = "";
    }
    return message;
  },

  toJSON(message: AuthRequest): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial(object: DeepPartial<AuthRequest>): AuthRequest {
    const message = { ...baseAuthRequest } as AuthRequest;
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = object.password;
    } else {
      message.password = "";
    }
    return message;
  },
};

const baseAuthResponse: object = { accessToken: "", refreshToken: "" };

export const AuthResponse = {
  encode(
    message: AuthResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthResponse } as AuthResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accessToken = reader.string();
          break;
        case 2:
          message.refreshToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthResponse {
    const message = { ...baseAuthResponse } as AuthResponse;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = String(object.accessToken);
    } else {
      message.accessToken = "";
    }
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = String(object.refreshToken);
    } else {
      message.refreshToken = "";
    }
    return message;
  },

  toJSON(message: AuthResponse): unknown {
    const obj: any = {};
    message.accessToken !== undefined &&
      (obj.accessToken = message.accessToken);
    message.refreshToken !== undefined &&
      (obj.refreshToken = message.refreshToken);
    return obj;
  },

  fromPartial(object: DeepPartial<AuthResponse>): AuthResponse {
    const message = { ...baseAuthResponse } as AuthResponse;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = object.accessToken;
    } else {
      message.accessToken = "";
    }
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = object.refreshToken;
    } else {
      message.refreshToken = "";
    }
    return message;
  },
};

const baseRefreshRequest: object = { username: "", refreshToken: "" };

export const RefreshRequest = {
  encode(
    message: RefreshRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRefreshRequest } as RefreshRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.refreshToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RefreshRequest {
    const message = { ...baseRefreshRequest } as RefreshRequest;
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = String(object.refreshToken);
    } else {
      message.refreshToken = "";
    }
    return message;
  },

  toJSON(message: RefreshRequest): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.refreshToken !== undefined &&
      (obj.refreshToken = message.refreshToken);
    return obj;
  },

  fromPartial(object: DeepPartial<RefreshRequest>): RefreshRequest {
    const message = { ...baseRefreshRequest } as RefreshRequest;
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.refreshToken !== undefined && object.refreshToken !== null) {
      message.refreshToken = object.refreshToken;
    } else {
      message.refreshToken = "";
    }
    return message;
  },
};

const baseRefreshResponse: object = { accessToken: "" };

export const RefreshResponse = {
  encode(
    message: RefreshResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRefreshResponse } as RefreshResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accessToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RefreshResponse {
    const message = { ...baseRefreshResponse } as RefreshResponse;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = String(object.accessToken);
    } else {
      message.accessToken = "";
    }
    return message;
  },

  toJSON(message: RefreshResponse): unknown {
    const obj: any = {};
    message.accessToken !== undefined &&
      (obj.accessToken = message.accessToken);
    return obj;
  },

  fromPartial(object: DeepPartial<RefreshResponse>): RefreshResponse {
    const message = { ...baseRefreshResponse } as RefreshResponse;
    if (object.accessToken !== undefined && object.accessToken !== null) {
      message.accessToken = object.accessToken;
    } else {
      message.accessToken = "";
    }
    return message;
  },
};

export const AuthServiceService = {
  auth: {
    path: "/auth.AuthService/Auth",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AuthRequest) =>
      Buffer.from(AuthRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AuthRequest.decode(value),
    responseSerialize: (value: AuthResponse) =>
      Buffer.from(AuthResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AuthResponse.decode(value),
  },
  refresh: {
    path: "/auth.AuthService/Refresh",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RefreshRequest) =>
      Buffer.from(RefreshRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RefreshRequest.decode(value),
    responseSerialize: (value: RefreshResponse) =>
      Buffer.from(RefreshResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RefreshResponse.decode(value),
  },
  createUser: {
    path: "/auth.AuthService/CreateUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateUserRequest) =>
      Buffer.from(CreateUserRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateUserRequest.decode(value),
    responseSerialize: (value: CreateUserResponse) =>
      Buffer.from(CreateUserResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateUserResponse.decode(value),
  },
} as const;

export interface AuthServiceServer extends UntypedServiceImplementation {
  auth: handleUnaryCall<AuthRequest, AuthResponse>;
  refresh: handleUnaryCall<RefreshRequest, RefreshResponse>;
  createUser: handleUnaryCall<CreateUserRequest, CreateUserResponse>;
}

export interface AuthServiceClient extends Client {
  auth(
    request: AuthRequest,
    callback: (error: ServiceError | null, response: AuthResponse) => void
  ): ClientUnaryCall;
  auth(
    request: AuthRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AuthResponse) => void
  ): ClientUnaryCall;
  auth(
    request: AuthRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AuthResponse) => void
  ): ClientUnaryCall;
  refresh(
    request: RefreshRequest,
    callback: (error: ServiceError | null, response: RefreshResponse) => void
  ): ClientUnaryCall;
  refresh(
    request: RefreshRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RefreshResponse) => void
  ): ClientUnaryCall;
  refresh(
    request: RefreshRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RefreshResponse) => void
  ): ClientUnaryCall;
  createUser(
    request: CreateUserRequest,
    callback: (error: ServiceError | null, response: CreateUserResponse) => void
  ): ClientUnaryCall;
  createUser(
    request: CreateUserRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateUserResponse) => void
  ): ClientUnaryCall;
  createUser(
    request: CreateUserRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateUserResponse) => void
  ): ClientUnaryCall;
}

export const AuthServiceClient = makeGenericClientConstructor(
  AuthServiceService,
  "auth.AuthService"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): AuthServiceClient;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
