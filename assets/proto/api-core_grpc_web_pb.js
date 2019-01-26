/**
 * @fileoverview gRPC-Web generated client stub for api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.api = require('./api-core_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.CoreClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.CorePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.api.CoreClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.api.CoreClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ListenEventRequest,
 *   !proto.api.EventData>}
 */
const methodInfo_Core_ListenEvent = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.EventData,
  /** @param {!proto.api.ListenEventRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.EventData.deserializeBinary
);


/**
 * @param {!proto.api.ListenEventRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.EventData>}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.listenEvent =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.Core/ListenEvent',
      request,
      metadata,
      methodInfo_Core_ListenEvent);
};


/**
 * @param {!proto.api.ListenEventRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.EventData>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.listenEvent =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/api.Core/ListenEvent',
      request,
      metadata,
      methodInfo_Core_ListenEvent);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ListenResultRequest,
 *   !proto.api.ResultData>}
 */
const methodInfo_Core_ListenResult = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ResultData,
  /** @param {!proto.api.ListenResultRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ResultData.deserializeBinary
);


/**
 * @param {!proto.api.ListenResultRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.ResultData>}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.listenResult =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.Core/ListenResult',
      request,
      metadata,
      methodInfo_Core_ListenResult);
};


/**
 * @param {!proto.api.ListenResultRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.ResultData>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.listenResult =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/api.Core/ListenResult',
      request,
      metadata,
      methodInfo_Core_ListenResult);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ExecuteTaskRequest,
 *   !proto.api.ExecuteTaskReply>}
 */
const methodInfo_Core_ExecuteTask = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ExecuteTaskReply,
  /** @param {!proto.api.ExecuteTaskRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ExecuteTaskReply.deserializeBinary
);


/**
 * @param {!proto.api.ExecuteTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ExecuteTaskReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ExecuteTaskReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.executeTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Core/ExecuteTask',
      request,
      metadata || {},
      methodInfo_Core_ExecuteTask,
      callback);
};


/**
 * @param {!proto.api.ExecuteTaskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ExecuteTaskReply>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.executeTask =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.executeTask(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.StartServiceRequest,
 *   !proto.api.StartServiceReply>}
 */
const methodInfo_Core_StartService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.StartServiceReply,
  /** @param {!proto.api.StartServiceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.StartServiceReply.deserializeBinary
);


/**
 * @param {!proto.api.StartServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.StartServiceReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.StartServiceReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.startService =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Core/StartService',
      request,
      metadata || {},
      methodInfo_Core_StartService,
      callback);
};


/**
 * @param {!proto.api.StartServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.StartServiceReply>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.startService =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.startService(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.StopServiceRequest,
 *   !proto.api.StopServiceReply>}
 */
const methodInfo_Core_StopService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.StopServiceReply,
  /** @param {!proto.api.StopServiceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.StopServiceReply.deserializeBinary
);


/**
 * @param {!proto.api.StopServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.StopServiceReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.StopServiceReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.stopService =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Core/StopService',
      request,
      metadata || {},
      methodInfo_Core_StopService,
      callback);
};


/**
 * @param {!proto.api.StopServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.StopServiceReply>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.stopService =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.stopService(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.DeleteServiceRequest,
 *   !proto.api.DeleteServiceReply>}
 */
const methodInfo_Core_DeleteService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.DeleteServiceReply,
  /** @param {!proto.api.DeleteServiceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.DeleteServiceReply.deserializeBinary
);


/**
 * @param {!proto.api.DeleteServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.DeleteServiceReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.DeleteServiceReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.deleteService =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Core/DeleteService',
      request,
      metadata || {},
      methodInfo_Core_DeleteService,
      callback);
};


/**
 * @param {!proto.api.DeleteServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.DeleteServiceReply>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.deleteService =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteService(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ListServicesRequest,
 *   !proto.api.ListServicesReply>}
 */
const methodInfo_Core_ListServices = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ListServicesReply,
  /** @param {!proto.api.ListServicesRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ListServicesReply.deserializeBinary
);


/**
 * @param {!proto.api.ListServicesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ListServicesReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ListServicesReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.listServices =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Core/ListServices',
      request,
      metadata || {},
      methodInfo_Core_ListServices,
      callback);
};


/**
 * @param {!proto.api.ListServicesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ListServicesReply>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.listServices =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.listServices(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetServiceRequest,
 *   !proto.api.GetServiceReply>}
 */
const methodInfo_Core_GetService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.GetServiceReply,
  /** @param {!proto.api.GetServiceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetServiceReply.deserializeBinary
);


/**
 * @param {!proto.api.GetServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.GetServiceReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetServiceReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.getService =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Core/GetService',
      request,
      metadata || {},
      methodInfo_Core_GetService,
      callback);
};


/**
 * @param {!proto.api.GetServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetServiceReply>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.getService =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getService(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ServiceLogsRequest,
 *   !proto.api.LogData>}
 */
const methodInfo_Core_ServiceLogs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.LogData,
  /** @param {!proto.api.ServiceLogsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.LogData.deserializeBinary
);


/**
 * @param {!proto.api.ServiceLogsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.LogData>}
 *     The XHR Node Readable Stream
 */
proto.api.CoreClient.prototype.serviceLogs =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.Core/ServiceLogs',
      request,
      metadata,
      methodInfo_Core_ServiceLogs);
};


/**
 * @param {!proto.api.ServiceLogsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.LogData>}
 *     The XHR Node Readable Stream
 */
proto.api.CorePromiseClient.prototype.serviceLogs =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/api.Core/ServiceLogs',
      request,
      metadata,
      methodInfo_Core_ServiceLogs);
};


module.exports = proto.api;

