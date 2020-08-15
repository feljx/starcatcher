/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "3f3e449-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "3f3e449-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d2eac7b7493bd73d1b49";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack-plugin-serve/client.js":
/*!****************************************!*\
  !*** (webpack)-plugin-serve/client.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

/**
 * @note This file exists merely as an easy reference for folks adding it to their configuration entries
 */

(() => {
  /* eslint-disable global-require */
  const { run } = __webpack_require__(/*! ./lib/client/client */ "./node_modules/webpack-plugin-serve/lib/client/client.js");
  let hash = '<unknown>';
  let options;
  try {
    options = {"compress":null,"headers":null,"historyFallback":false,"hmr":true,"host":"localhost","liveReload":false,"log":{"level":"info","prefix":{"template":"{{level}}"},"name":"webpack-plugin-serve"},"open":false,"port":"8000","progress":"minimal","ramdisk":false,"secure":false,"static":["./docs/"],"status":true,"address":"localhost:8000","compilerName":null,"wpsId":"3f3e449"};
  } catch (e) {
    const { log } = __webpack_require__(/*! ./lib/client/log */ "./node_modules/webpack-plugin-serve/lib/client/log.js");
    log.error(
      'The entry for webpack-plugin-serve was included in your build, but it does not appear that the plugin was. Please check your configuration.'
    );
  }

  try {
    // eslint-disable-next-line camelcase
    hash = __webpack_require__.h();
  } catch (e) {} // eslint-disable-line no-empty

  run(hash, options);
})();


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js":
/*!*********************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/ClientSocket.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { error, refresh, warn } = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")();

// ignore 1008 (HTTP 400 equivalent) and 1011 (HTTP 500 equivalent)
const ignoreCodes = [1008, 1011];
const maxAttempts = 10;

class ClientSocket {
  constructor(options, ...args) {
    this.args = args;
    this.attempts = 0;
    this.eventHandlers = [];
    this.options = options;
    this.retrying = false;

    this.connect();
  }

  addEventListener(...args) {
    this.eventHandlers.push(args);
    this.socket.addEventListener(...args);
  }

  close() {
    this.socket.close();
  }

  connect() {
    if (this.socket) {
      delete this.socket;
    }

    this.connecting = true;

    this.socket = new WebSocket(...this.args);

    if (this.options.retry) {
      this.socket.addEventListener('close', (event) => {
        if (ignoreCodes.includes(event.code)) {
          return;
        }

        if (!this.retrying) {
          warn(`The WebSocket was closed and will attempt to reconnect`);
        }

        this.reconnect();
      });
    } else {
      this.socket.onclose = () => warn(`The client WebSocket was closed. ${refresh}`);
    }

    this.socket.addEventListener('open', () => {
      this.attempts = 0;
      this.retrying = false;
    });

    if (this.eventHandlers.length) {
      for (const [name, fn] of this.eventHandlers) {
        this.socket.addEventListener(name, fn);
      }
    }
  }

  reconnect() {
    this.attempts += 1;
    this.retrying = true;

    if (this.attempts > maxAttempts) {
      error(`The WebSocket could not be reconnected. ${refresh}`);
      this.retrying = false;
      return;
    }

    const timeout = 1000 * this.attempts ** 2;

    setTimeout(() => this.connect(this.args), timeout);
  }

  removeEventListener(...args) {
    const [, handler] = args;
    this.eventHandlers = this.eventHandlers.filter(([, fn]) => fn === handler);
    this.socket.removeEventListener(...args);
  }
}

module.exports = { ClientSocket };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/client.js":
/*!***************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/client.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
/* eslint-disable global-require */
const run = (buildHash, options) => {
  const { address, client = {}, progress, secure, status } = options;

  options.firstInstance = !window.webpackPluginServe; // eslint-disable-line no-param-reassign

  window.webpackPluginServe = window.webpackPluginServe || {
    compilers: {}
  };
  window.webpackPluginServe.silent = !!client.silent;

  const { ClientSocket } = __webpack_require__(/*! ./ClientSocket */ "./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js");
  const { replace } = __webpack_require__(/*! ./hmr */ "./node_modules/webpack-plugin-serve/lib/client/hmr.js");
  const { error, info, warn } = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")();

  const protocol = secure ? 'wss' : 'ws';
  const socket = new ClientSocket(client, `${protocol}://${client.address || address}/wps`);

  const { compilerName } = options;

  window.webpackPluginServe.compilers[compilerName] = {};

  // prevents ECONNRESET errors on the server
  window.addEventListener('beforeunload', () => socket.close());

  socket.addEventListener('message', (message) => {
    const { action, data = {} } = JSON.parse(message.data);
    const { errors, hash = '<?>', warnings } = data || {};
    const shortHash = hash.slice(0, 7);
    const identifier = options.compilerName ? `(Compiler: ${options.compilerName}) ` : '';
    const compiler = window.webpackPluginServe.compilers[compilerName];
    const { wpsId } = data;

    switch (action) {
      case 'build':
        compiler.done = false;
        break;
      case 'connected':
        info(`WebSocket connected ${identifier}`);
        break;
      case 'done':
        compiler.done = true;
        break;
      case 'problems':
        if (data.errors.length) {
          error(`${identifier}Build ${shortHash} produced errors:\n`, errors);
        }
        if (data.warnings.length) {
          warn(`${identifier}Build ${shortHash} produced warnings:\n`, warnings);
        }
        break;
      case 'reload':
        window.location.reload();
        break;
      case 'replace':
        // actions with a wpsId in tow indicate actions that should only be executed when the wpsId sent
        // matches the wpsId set in options. this is how we can identify multiple compilers in the
        // client.
        if (wpsId && wpsId === options.wpsId) {
          replace(buildHash, hash);
        }
        break;
      default:
    }
  });

  if (options.firstInstance) {
    if (progress === 'minimal') {
      const { init } = __webpack_require__(/*! ./overlays/progress-minimal */ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js");
      init(options, socket);
    } else if (progress) {
      const { init } = __webpack_require__(/*! ./overlays/progress */ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js");
      init(options, socket);
    }

    if (status) {
      const { init } = __webpack_require__(/*! ./overlays/status */ "./node_modules/webpack-plugin-serve/lib/client/overlays/status.js");
      init(options, socket);
    }

    if (true) {
      info('Hot Module Replacement is active');

      if (options.liveReload) {
        info('Live Reload taking precedence over Hot Module Replacement');
      }
    } else {}

    if (false) {}
  }
};

module.exports = { run };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/hmr.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/hmr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { error, info, refresh, warn } = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")();

let latest = true;

const hmr = {
  onUnaccepted(data) {
    warn('Change in unaccepted module(s):\n', data);
    warn(data);
  },
  onDeclined(data) {
    warn('Change in declined module(s):\n', data);
  },
  onErrored(data) {
    error('Error in module(s):\n', data);
  }
};

const replace = async (buildHash, hash) => {
  const { apply, check, status } = module.hot;

  if (hash) {
    // eslint-disable-next-line no-undef
    latest = hash.includes(buildHash);
  }

  if (!latest) {
    const hmrStatus = status();

    if (hmrStatus === 'abort' || hmrStatus === 'fail') {
      warn(`An HMR update was triggered, but ${hmrStatus}ed. ${refresh}`);
      return;
    }

    let modules;

    try {
      modules = await check(false);
    } catch (e) {
      // noop. this typically happens when a MultiCompiler has more than one compiler that includes
      // this script, and an update happens with a hash that isn't part of the compiler/module this
      // instance was loaded for.
      return;
    }

    if (!modules) {
      warn(`No modules found for replacement. ${refresh}`);
      return;
    }

    modules = await apply(hmr);

    if (modules) {
      latest = true;
      info(`Build ${hash.slice(0, 7)} replaced:\n`, modules);
    }
  }
};

module.exports = { replace };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/log.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { error, info, warn } = console;
const log = {
  error: error.bind(console, '⬡ wps:'),
  info: info.bind(console, '⬡ wps:'),
  refresh: 'Please refresh the page',
  warn: warn.bind(console, '⬡ wps:')
};
const noop = () => {};
const silent = {
  error: noop,
  info: noop,
  warn: noop
};

module.exports = () => (window.webpackPluginServe.silent ? silent : log);


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js":
/*!**********************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/progress-minimal.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml } = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-progress-minimal';
const html = `
<div id="${ns}" class="${ns}-hidden">
  <div id="${ns}-bar"></div>
</div>
`;
const css = `
#${ns} {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100vw;
  z-index: 2147483645;
}

#${ns}-bar {
  width: 0%;
  height: 4px;
  background-color: rgb(186, 223, 172);
}

@keyframes ${ns}-fade {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

.${ns}-disappear {
  animation: ${ns}-fade .3s;
  animation-fill-mode: forwards;
  animation-delay: .5s;
}

.${ns}-hidden {
  display: none;
}
`;

let hideOnPageVisible = false;

const update = (percent) => {
  const bar = document.querySelector(`#${ns}-bar`);
  bar.style.width = `${percent}%`;
};

const reset = (wrapper) => {
  wrapper.classList.add(`${ns}-disappear`);
};

const init = (options, socket) => {
  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addCss(css);
      addHtml(html);

      const wrapper = document.querySelector(`#${ns}`);
      wrapper.addEventListener('animationend', () => {
        update(0);
        wrapper.classList.add(`${ns}-hidden`);
      });
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && hideOnPageVisible) {
        const wrapper = document.querySelector(`#${ns}`);
        reset(wrapper);
        hideOnPageVisible = false;
      }
    });
  }

  socket.addEventListener('message', (message) => {
    const { action, data } = JSON.parse(message.data);

    if (action !== 'progress') {
      return;
    }

    const percent = Math.floor(data.percent * 100);
    const wrapper = document.querySelector(`#${ns}`);

    wrapper.classList.remove(`${ns}-hidden`, `${ns}-disappear`);

    if (data.percent === 1) {
      if (document.hidden) {
        hideOnPageVisible = true;
      } else {
        reset(wrapper);
      }
    } else {
      hideOnPageVisible = false;
    }

    update(percent);
  });
};

module.exports = {
  init
};


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js":
/*!**************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/progress.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml } = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-progress';
const css = `
#${ns}{
  width: 200px;
  height: 200px;
  position: fixed;
  right: 5%;
  top: 5%;
  transition: opacity .25s ease-in-out;
  z-index: 2147483645;
}

#${ns}-bg {
  fill: #282d35;
}

#${ns}-fill {
  fill: rgba(0, 0, 0, 0);
  stroke: rgb(186, 223, 172);
  stroke-dasharray: 219.99078369140625;
  stroke-dashoffset: -219.99078369140625;
  stroke-width: 10;
  transform: rotate(90deg)translate(0px, -80px);
}

#${ns}-percent {
  font-family: 'Open Sans';
  font-size: 18px;
  fill: #ffffff;
}

#${ns}-percent-value {
  dominant-baseline: middle;
  text-anchor: middle;
}

#${ns}-percent-super {
  fill: #bdc3c7;
  font-size: .45em;
  baseline-shift: 10%;
}

.${ns}-noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

@keyframes ${ns}-fade {
	0% {
		opacity: 1;
		transform: scale(1);
		-webkit-transform: scale(1);
	}
	100% {
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
}

.${ns}-disappear {
  animation: ${ns}-fade .3s;
  animation-fill-mode:forwards;
  animation-delay: .5s;
}

.${ns}-hidden {
  display: none;
}

/* Put google web font at the end, or you'll see FOUC in Firefox */
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
`;

const html = `
<svg id="${ns}" class="${ns}-noselect ${ns}-hidden" x="0px" y="0px" viewBox="0 0 80 80">
  <circle id="${ns}-bg" cx="50%" cy="50%" r="35"></circle>
  <path id="${ns}-fill" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
  <text id="${ns}-percent" x="50%" y="51%"><tspan id="${ns}-percent-value">0</tspan><tspan id="${ns}-percent-super">%</tspan></text>
</svg>
`;

let hideOnPageVisible = false;

const update = (percent) => {
  const max = -219.99078369140625;
  const value = document.querySelector(`#${ns}-percent-value`);
  const track = document.querySelector(`#${ns}-fill`);
  const offset = ((100 - percent) / 100) * max;

  track.setAttribute('style', `stroke-dashoffset: ${offset}`);
  value.innerHTML = percent.toString();
};

const reset = (svg) => {
  svg.classList.add(`${ns}-disappear`);
};

const init = (options, socket) => {
  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addCss(css);
      addHtml(html);

      // Reset progress to zero after disappear animation
      const svg = document.querySelector(`#${ns}`);
      svg.addEventListener('animationend', () => {
        update(0);
        svg.classList.add(`${ns}-hidden`);
      });
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && hideOnPageVisible) {
        const svg = document.querySelector(`#${ns}`);
        reset(svg);
        hideOnPageVisible = false;
      }
    });
  }

  socket.addEventListener('message', (message) => {
    const { action, data } = JSON.parse(message.data);

    if (action !== 'progress') {
      return;
    }

    const percent = Math.floor(data.percent * 100);
    const svg = document.querySelector(`#${ns}`);

    if (!svg) {
      return;
    }

    // we can safely call this even if it doesn't have the class
    svg.classList.remove(`${ns}-disappear`, `${ns}-hidden`);

    if (data.percent === 1) {
      if (document.hidden) {
        hideOnPageVisible = true;
      } else {
        reset(svg);
      }
    } else {
      hideOnPageVisible = false;
    }

    update(percent);
  });
};

module.exports = { init };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/status.js":
/*!************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/status.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml, socketMessage } = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-status';
const css = `
#${ns} {
  background: #282d35;
  border-radius: 0.6em;
  display: flex;
  flex-direction: column;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	font-size: 10px;
  height: 90%;
  min-height: 20em;
  left: 50%;
  opacity: 1;
  overflow: hidden;
  padding-bottom: 3em;
  position: absolute;
  top: 2rem;
  transform: translateX(-50%);
  transition: opacity .25s ease-in-out;
  width: 95%;
  z-index: 2147483645;
}

@keyframes ${ns}-hidden-display {
	0% {
		opacity: 1;
	}
	99% {
		display: inline-flex;
		opacity: 0;
	}
	100% {
		display: none;
		opacity: 0;
	}
}

#${ns}.${ns}-hidden {
  animation: ${ns}-hidden-display .3s;
  animation-fill-mode:forwards;
  display: none;
}

#${ns}.${ns}-min {
  animation: minimize 10s;
  bottom: 2em;
  cursor: pointer;
  height: 6em;
  left: auto;
  min-height: 6em;
  padding-bottom: 0;
  position: absolute;
  right: 2em;
  top: auto;
  transform: none;
  width: 6em;
}

#${ns}.${ns}-min #${ns}-beacon {
  display: block;
}

#${ns}-title {
  color: #fff;
  font-size: 1.2em;
  font-weight: normal;
  margin: 0;
  padding: 0.6em 0;
  text-align: center;
  width: 100%;
}

#${ns}.${ns}-min #${ns}-title {
  display: none;
}

#${ns}-title-errors {
  color: #ff5f58;
  font-style: normal;
  padding-left: 1em;
}

#${ns}-title-warnings {
  color: #ffbd2e;
  font-style: normal;
  padding-left: 1em;
}

#${ns}-problems {
  overflow-y: auto;
  padding: 1em 2em;
}

#${ns}-problems pre {
  color: #ddd;
  background: #282d35;
  display: block;
  font-size: 1.3em;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  white-space: pre-wrap;
}

#${ns}-problems pre em {
  background: #ff5f58;
  border-radius: 0.3em;
  color: #641e16;
  font-style: normal;
  line-height: 3em;
  margin-right: 0.4em;
  padding: 0.1em 0.4em;
  text-transform: uppercase;
}

pre#${ns}-warnings em {
  background: #ffbd2e;
  color: #3e2723;
}

pre#${ns}-success {
  display: none;
  text-align: center;
}

pre#${ns}-success em {
  background: #7fb900;
  color: #004d40;
}

#${ns}-problems.${ns}-success #${ns}-success {
  display: block;
}

#${ns}.${ns}-min #${ns}-problems {
  display: none;
}

#${ns}-nav {
  opacity: 0.5;
  padding: 1.2em;
  position: absolute;
}

#${ns}.${ns}-min #${ns}-nav {
  display: none;
}

#${ns}-nav:hover {
  opacity: 1;
}

#${ns}-nav div {
  background: #ff5f58;
  border-radius: 1.2em;
  cursor: pointer;
  display: inline-block;
  height: 1.2em;
  position: relative;
  width: 1.2em;
}

div#${ns}-min {
  background: #ffbd2e;
  margin-left: 0.8em;
}

#${ns}-beacon {
  border-radius: 3em;
  display: none;
  font-size: 10px;
  height: 3em;
  margin: 1.6em auto;
  position: relative;
  width: 3em;
}

#${ns}-beacon:before, #${ns}-beacon:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(127,185,0, 0.2);
  border-radius: 3em;
  opacity: 0;
}

#${ns}-beacon:before {
  animation: ${ns}-pulse 3s infinite linear;
  transform: scale(1);
}

#${ns}-beacon:after {
  animation: ${ns}-pulse 3s 2s infinite linear;
}


@keyframes ${ns}-pulse {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  33% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

#${ns}-beacon mark {
  background: rgba(127, 185, 0, 1);
  border-radius: 100% 100%;
  height: 1em;
  left: 1em;
  position: absolute;
  top: 1em;
  width: 1em;
}

#${ns}-beacon.${ns}-error mark {
  background: #ff5f58;
}

#${ns}-beacon.${ns}-error:before, #${ns}-beacon.error:after {
  background: rgba(255, 95, 88, 0.2);
}

#${ns}-beacon.${ns}-warning mark {
  background: #ffbd2e;
}

#${ns}-beacon.${ns}-warning:before, #${ns}-beacon.warning:after {
  background: rgba(255, 189, 46, 0.2);
}

/* Put google web font at the end, or you'll see FOUC in Firefox */
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
`;

const html = `
<aside id="${ns}" class="${ns}-hidden" title="build status">
  <figure id="${ns}-beacon">
    <mark/>
  </figure>
  <nav id="${ns}-nav">
    <div id="${ns}-close" title="close"></div>
    <div id="${ns}-min" title="minmize"></div>
  </nav>
  <h1 id="${ns}-title">
    build status
    <em id="${ns}-title-errors"></em>
    <em id="${ns}-title-warnings"></em>
  </h1>
  <article id="${ns}-problems">
    <pre id="${ns}-success"><em>Build Successful</em></pre>
    <pre id="${ns}-errors"></pre>
    <pre id="${ns}-warnings"></pre>
  </article>
</aside>
`;

const init = (options, socket) => {
  const hidden = `${ns}-hidden`;
  let hasProblems = false;
  let aside;
  let beacon;
  let problems;
  let preErrors;
  let preWarnings;
  let titleErrors;
  let titleWarnings;

  const reset = () => {
    preErrors.innerHTML = '';
    preWarnings.innerHTML = '';
    problems.classList.remove(`${ns}-success`);
    beacon.className = '';
    titleErrors.innerText = '';
    titleWarnings.innerText = '';
  };

  const addErrors = (errors) => {
    if (errors.length) {
      problems.classList.remove(`${ns}-success`);
      beacon.classList.add(`${ns}-error`);

      for (const error of errors) {
        const markup = `<div><em>Error</em> in ${error}</div>`;
        addHtml(markup, preErrors);
      }

      titleErrors.innerText = `${errors.length} Error(s)`;
    } else {
      titleErrors.innerText = '';
    }
    aside.classList.remove(hidden);
  };

  const addWarnings = (warnings) => {
    if (warnings.length) {
      problems.classList.remove(`${ns}-success`);

      if (!beacon.classList.contains(`${ns}-error`)) {
        beacon.classList.add(`${ns}-warning`);
      }

      for (const warning of warnings) {
        const markup = `<div><em>Warning</em> in ${warning}</div>`;
        addHtml(markup, preWarnings);
      }

      titleWarnings.innerText = `${warnings.length} Warning(s)`;
    } else {
      titleWarnings.innerText = '';
    }

    aside.classList.remove(hidden);
  };

  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addCss(css);
      [aside] = addHtml(html);
      beacon = document.querySelector(`#${ns}-beacon`);
      problems = document.querySelector(`#${ns}-problems`);
      preErrors = document.querySelector(`#${ns}-errors`);
      preWarnings = document.querySelector(`#${ns}-warnings`);
      titleErrors = document.querySelector(`#${ns}-title-errors`);
      titleWarnings = document.querySelector(`#${ns}-title-warnings`);

      const close = document.querySelector(`#${ns}-close`);
      const min = document.querySelector(`#${ns}-min`);

      aside.addEventListener('click', () => {
        aside.classList.remove(`${ns}-min`);
      });

      close.addEventListener('click', () => {
        aside.classList.add(`${ns}-hidden`);
      });

      min.addEventListener('click', (e) => {
        aside.classList.add(`${ns}-min`);
        e.stopImmediatePropagation();
      });
    });
  }

  socketMessage(socket, (action, data) => {
    if (!aside) {
      return;
    }

    const { compilers } = window.webpackPluginServe;

    switch (action) {
      case 'build':
        // clear errors and warnings when a new build begins
        reset();
        break;
      case 'problems':
        addErrors(data.errors);
        addWarnings(data.warnings);
        aside.classList.remove(hidden);
        hasProblems = data.errors.length || data.warnings.length;
        break;
      case 'replace':
        // if there's a compiler that isn't done yet, hold off and let it run the show
        for (const compilerName of Object.keys(compilers)) {
          if (!compilers[compilerName]) {
            return;
          }
        }

        if (hasProblems && !preErrors.children.length && !preWarnings.children.length) {
          reset();
          hasProblems = false;
          problems.classList.add(`${ns}-success`);
          aside.classList.remove(hidden);

          setTimeout(() => aside.classList.add(hidden), 3e3);
        }
        break;
      default:
    }
  });
};

module.exports = { init };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js":
/*!**********************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const addHtml = (html, parent) => {
  const div = document.createElement('div');
  const nodes = [];

  div.innerHTML = html.trim();

  while (div.firstChild) {
    nodes.push((parent || document.body).appendChild(div.firstChild));
  }

  return nodes;
};

const addCss = (css) => {
  const style = document.createElement('style');

  style.type = 'text/css';

  if (css.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  // append the stylesheet for the svg
  document.head.appendChild(style);
};

const socketMessage = (socket, handler) => {
  socket.addEventListener('message', (message) => {
    const { action, data = {} } = JSON.parse(message.data);
    handler(action, data);
  });
};

module.exports = { addCss, addHtml, socketMessage };


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __webpack_require__(/*! ./State */ "./src/State.ts");
const Nodes_1 = __webpack_require__(/*! ./Nodes */ "./src/Nodes.ts");
//
// Main Game class: ties together state and html nodes
//
class Game {
    constructor(options, container) {
        const { diff, numCols, numRows } = options;
        this.state = new State_1.GameState(diff, numCols, numRows);
        this.node = new Nodes_1.GameNode(this.state, container);
    }
    reveal(...fieldIndices) { }
    mark(fieldIndex) { }
    // Count number of marked nearby fields
    getNearbyMarked(fieldState) {
        return fieldState.nearbyIndices
            .map((idx) => this.state.fields[idx])
            .filter((state) => state.isMarked()).length;
    }
    // Determine whether field can reveal in a cascade
    canCascade(fieldIndex) {
        const fieldState = this.state.fields[fieldIndex];
        const nearbyMarked = this.getNearbyMarked(fieldState);
        return nearbyMarked === fieldState.mineCount;
    }
}
exports.default = Game;


/***/ }),

/***/ "./src/Handlers.ts":
/*!*************************!*\
  !*** ./src/Handlers.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldClickHandler = void 0;
var Click;
(function (Click) {
    Click[Click["Left"] = 0] = "Left";
    Click[Click["Middle"] = 1] = "Middle";
    Click[Click["Right"] = 2] = "Right";
})(Click || (Click = {}));
// Field click handler factory
function FieldClickHandler(fieldState, fieldNode) {
    // Event handler
    return function (ev) {
        switch (ev.button) {
            // case Click.Left:
            //     if (fieldState.isRevealed()) {
            //         reveal(fieldState.index)
            //     } else {
            //         reveal(...fieldState.nearbyIndices)
            //     }
            //     if (fieldState.fieldVal === FieldSymbol.Mine) {
            //         const textNode = FieldText(FieldSymbol.Mine)
            //         fieldNode.appendChild(textNode)
            //     }
            //     return
            // case Click.Middle:
            // case Click.Right:
            //     if (!fieldState.isMarked()) {
            //         mark(fieldState.index)
            //     }
            //     return
        }
    };
}
exports.FieldClickHandler = FieldClickHandler;


/***/ }),

/***/ "./src/Nodes.ts":
/*!**********************!*\
  !*** ./src/Nodes.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameNode = void 0;
const Handlers_1 = __webpack_require__(/*! ./Handlers */ "./src/Handlers.ts");
var CssClass;
(function (CssClass) {
    CssClass["Game"] = "game";
    CssClass["Menu"] = "menu";
    CssClass["MenuItem"] = "menu-item";
    CssClass["Board"] = "board";
    CssClass["Field"] = "field";
})(CssClass || (CssClass = {}));
//
// Node base classes
//
class __Node {
    constructor(container, ...cssClasses) {
        this.container = container;
        this.container.classList.add(...cssClasses);
    }
    append(...nodes) {
        this.container.append(...nodes.map((n) => n.container));
    }
}
class _Node extends __Node {
    constructor(tag, ...cssClasses) {
        super(document.createElement(tag), ...cssClasses);
    }
}
class _NodeWithText extends _Node {
    constructor(tag, ...cssClasses) {
        super(tag, ...cssClasses);
        this.textNode = document.createTextNode('');
        this.container.appendChild(this.textNode);
    }
    updateText(newText) {
        this.textNode.nodeValue = newText;
    }
}
//
// Game
//
class GameNode extends __Node {
    constructor(state, container) {
        super(container || document.createElement('div'), CssClass.Game);
        this.menuNode = new MenuNode();
        this.boardNode = new BoardNode(state);
        this.append(this.menuNode, this.boardNode);
    }
}
exports.GameNode = GameNode;
exports.default = GameNode;
//
// Menu
//
class MenuNode extends _Node {
    constructor() {
        super('ul', CssClass.Menu);
        const toMenuItem = (label) => new MenuItemNode(label);
        this.menuItems = ['Settings', 'New Game', 'Forfeit'].map(toMenuItem);
        this.append(...this.menuItems);
    }
}
//
// Menu item
class MenuItemNode extends _NodeWithText {
    constructor(label) {
        super('li', CssClass.MenuItem);
        this.updateText(label);
    }
}
//
// Board
//
class BoardNode extends _Node {
    constructor(state) {
        super('div', CssClass.Board);
        const toField = (state) => new FieldNode(state);
        this.fieldNodes = state.fields.map(toField);
        this.append(...this.fieldNodes);
    }
}
//
// Field
//
class FieldNode extends _NodeWithText {
    constructor(state) {
        super('div', CssClass.Field);
        this.container.onclick = Handlers_1.FieldClickHandler(state, this.container);
    }
}


/***/ }),

/***/ "./src/Shared.ts":
/*!***********************!*\
  !*** ./src/Shared.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Difficulty = exports.FieldSymbol = void 0;
var FieldSymbol;
(function (FieldSymbol) {
    FieldSymbol["Safe"] = "";
    FieldSymbol["Mine"] = "*";
})(FieldSymbol = exports.FieldSymbol || (exports.FieldSymbol = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["Easy"] = 0.12] = "Easy";
    Difficulty[Difficulty["Intermediate"] = 0.15] = "Intermediate";
    Difficulty[Difficulty["Hard"] = 0.17] = "Hard";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));


/***/ }),

/***/ "./src/State.ts":
/*!**********************!*\
  !*** ./src/State.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = exports.NearbyIndices = exports.FieldState = void 0;
const Shared_1 = __webpack_require__(/*! ./Shared */ "./src/Shared.ts");
//
// Field state
//
class FieldState {
    constructor(value, mineCount, nearbyIndices) {
        this.value = value;
        this.mineCount = mineCount;
        this.nearbyIndices = nearbyIndices;
        this.marked = 0;
        this.revealed = 0;
    }
    mark() {
        this.marked ^= 1;
    }
    reveal() {
        this.revealed ^= 1;
    }
    isMarked() {
        return this.marked;
    }
    isRevealed() {
        return this.revealed;
    }
}
exports.FieldState = FieldState;
//
// Helper: Calculate nearby field indices
//
function NearbyIndices(fieldIndex, numCols, numRows) {
    const c = numCols;
    const offsets = [-1, 1, -c, -c - 1, -c + 1, c, c - 1, c + 1];
    return offsets
        .map((offset) => offset + fieldIndex)
        .filter((nearbyIdx) => nearbyIdx >= 0 && nearbyIdx < numCols * numRows);
}
exports.NearbyIndices = NearbyIndices;
//
// Game state
//
class GameState {
    constructor(diff, numCols, numRows) {
        const FieldValue = () => Math.random() < diff ? Shared_1.FieldSymbol.Mine : Shared_1.FieldSymbol.Safe;
        const fieldValues = new Array(numCols * numRows).fill(0).map(FieldValue);
        const Field = (value, index) => {
            const nearbyIndices = NearbyIndices(index, numCols, numRows);
            const mineCount = nearbyIndices
                .map((index) => fieldValues[index])
                .filter((value) => value === Shared_1.FieldSymbol.Mine).length;
            return new FieldState(value, mineCount, nearbyIndices);
        };
        this.fields = fieldValues.map(Field);
    }
}
exports.GameState = GameState;


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
const Shared_1 = __webpack_require__(/*! ./Shared */ "./src/Shared.ts");
//
// HTML Containers
//
// const appContainer = document.getElementById('app')
const gameContainer = document.getElementById('game');
//
// Start Game!
//
const defaultOptions = {
    diff: Shared_1.Difficulty.Intermediate,
    numCols: 15,
    numRows: 15,
};
const game = new Game_1.default(defaultOptions, gameContainer);
//
//
//
//
// Hot Module Replacement (HMR)
//
if (true) {
    // module.hot.accept('./views/login', () => {
    // 	context.renderView(login)
    // })
    module.hot.accept();
    module.hot.dispose(() => {
        document.body.className = '';
        gameContainer.remove();
        // title.remove()
        // game.container.remove()
        // for (const f of g.board) {
        // 	f.container.remove()
        // }
    });
}


/***/ }),

/***/ 0:
/*!******************************************************!*\
  !*** multi ./src/app.ts webpack-plugin-serve/client ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/felix/Documents/mineshweeper/src/app.ts */"./src/app.ts");
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"./node_modules/webpack-plugin-serve/client.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1wbHVnaW4tc2VydmUvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvQ2xpZW50U29ja2V0LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvaG1yLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvbG9nLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50L292ZXJsYXlzL3Byb2dyZXNzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvc3RhdHVzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSGFuZGxlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL05vZGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9TaGFyZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxHQUFHOztRQUVIO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQSw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxrQkFBa0IsOEJBQThCO1FBQ2hEO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLG9CQUFvQiwyQkFBMkI7UUFDL0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsbUJBQW1CLGNBQWM7UUFDakM7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixLQUFLO1FBQ3JCO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLFlBQVk7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxjQUFjLDRCQUE0QjtRQUMxQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7O1FBRUo7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsdUNBQXVDO1FBQ3hEO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsdUNBQXVDO1FBQ3hEO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHNCQUFzQjtRQUN2QztRQUNBO1FBQ0E7UUFDQSxRQUFRO1FBQ1I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsVUFBVTtRQUNWO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLGNBQWMsd0NBQXdDO1FBQ3REO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtB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RztBQUNsQjtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLEdBQUcsR0FBRztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHO0FBQ3ZCO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRztBQUN2QjtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxHQUFHO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLE1BQU0sR0FBRztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLEdBQUc7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLFlBQVksR0FBRyxZQUFZLEdBQUc7QUFDcEM7QUFDQTs7QUFFQSxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRztBQUN2QjtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHO0FBQ3ZCO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU0sR0FBRztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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OiJtYWluLmRldi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCIzZjNlNDQ5LVwiICsgY2h1bmtJZCArIFwiLXdwcy1obXIuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCIzZjNlNDQ5LXdwcy1obXIuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiZDJlYWM3Yjc0OTNiZDczZDFiNDlcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZJbnZhbGlkYXRlZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGludmFsaWRhdGU6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdHN3aXRjaCAoaG90U3RhdHVzKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJpZGxlXCI6XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwicmVhZHlcIjpcbiBcdFx0XHRcdFx0XHRob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInByZXBhcmVcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImNoZWNrXCI6XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlXCI6XG4gXHRcdFx0XHRcdGNhc2UgXCJhcHBseVwiOlxuIFx0XHRcdFx0XHRcdChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPVxuIFx0XHRcdFx0XHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzIHx8IFtdKS5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2gsIGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcIm1haW5cIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuIFx0XHRyZXR1cm4gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKSB7XG4gXHRcdGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0IW1vZHVsZSB8fFxuIFx0XHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG4gXHRcdFx0XHQpXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmUgJiZcbiBcdFx0XHRcdC8vIHdoZW4gY2FsbGVkIGludmFsaWRhdGUgc2VsZi1hY2NlcHRpbmcgaXMgbm90IHBvc3NpYmxlXG4gXHRcdFx0XHQhaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmSW52YWxpZGF0ZWRcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0cGFyZW50czogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0ucGFyZW50cy5zbGljZSgpLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRpZiAoaG90VXBkYXRlTmV3SGFzaCAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1bmRlZmluZWQ7XG4gXHRcdH1cbiBcdFx0aG90VXBkYXRlID0gdW5kZWZpbmVkO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBpdGVtLnBhcmVudHM7XG4gXHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gbW9kdWxlSWQ7XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGlmIChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcbiBcdFx0XHRyZXR1cm4gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKS50aGVuKGZ1bmN0aW9uKGxpc3QpIHtcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XG4gXHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cmV0dXJuIGxpc3Q7XG4gXHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkge1xuIFx0XHRpZiAoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKCFob3RVcGRhdGUpIGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUpO1xuIFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcbiBcdFx0XHRyZXR1cm4gdHJ1ZTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgbW9kdWxlSWQpKVxuIFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb2R1bGVzW21vZHVsZUlkXTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5cbi8qKlxuICogQG5vdGUgVGhpcyBmaWxlIGV4aXN0cyBtZXJlbHkgYXMgYW4gZWFzeSByZWZlcmVuY2UgZm9yIGZvbGtzIGFkZGluZyBpdCB0byB0aGVpciBjb25maWd1cmF0aW9uIGVudHJpZXNcbiAqL1xuXG4oKCkgPT4ge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBnbG9iYWwtcmVxdWlyZSAqL1xuICBjb25zdCB7IHJ1biB9ID0gcmVxdWlyZSgnLi9saWIvY2xpZW50L2NsaWVudCcpO1xuICBsZXQgaGFzaCA9ICc8dW5rbm93bj4nO1xuICBsZXQgb3B0aW9ucztcbiAgdHJ5IHtcbiAgICBvcHRpb25zID0gyo7JkMm5yZRvc8edyozJucedcztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IHsgbG9nIH0gPSByZXF1aXJlKCcuL2xpYi9jbGllbnQvbG9nJyk7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ1RoZSBlbnRyeSBmb3Igd2VicGFjay1wbHVnaW4tc2VydmUgd2FzIGluY2x1ZGVkIGluIHlvdXIgYnVpbGQsIGJ1dCBpdCBkb2VzIG5vdCBhcHBlYXIgdGhhdCB0aGUgcGx1Z2luIHdhcy4gUGxlYXNlIGNoZWNrIHlvdXIgY29uZmlndXJhdGlvbi4nXG4gICAgKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGhhc2ggPSBfX3dlYnBhY2tfaGFzaF9fO1xuICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XG5cbiAgcnVuKGhhc2gsIG9wdGlvbnMpO1xufSkoKTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGVycm9yLCByZWZyZXNoLCB3YXJuIH0gPSByZXF1aXJlKCcuL2xvZycpKCk7XG5cbi8vIGlnbm9yZSAxMDA4IChIVFRQIDQwMCBlcXVpdmFsZW50KSBhbmQgMTAxMSAoSFRUUCA1MDAgZXF1aXZhbGVudClcbmNvbnN0IGlnbm9yZUNvZGVzID0gWzEwMDgsIDEwMTFdO1xuY29uc3QgbWF4QXR0ZW1wdHMgPSAxMDtcblxuY2xhc3MgQ2xpZW50U29ja2V0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucywgLi4uYXJncykge1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG4gICAgdGhpcy5ldmVudEhhbmRsZXJzID0gW107XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnJldHJ5aW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLmNvbm5lY3QoKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncykge1xuICAgIHRoaXMuZXZlbnRIYW5kbGVycy5wdXNoKGFyZ3MpO1xuICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xuICB9XG5cbiAgY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnNvY2tldDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbm5lY3RpbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KC4uLnRoaXMuYXJncyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJldHJ5KSB7XG4gICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoaWdub3JlQ29kZXMuaW5jbHVkZXMoZXZlbnQuY29kZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucmV0cnlpbmcpIHtcbiAgICAgICAgICB3YXJuKGBUaGUgV2ViU29ja2V0IHdhcyBjbG9zZWQgYW5kIHdpbGwgYXR0ZW1wdCB0byByZWNvbm5lY3RgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb2NrZXQub25jbG9zZSA9ICgpID0+IHdhcm4oYFRoZSBjbGllbnQgV2ViU29ja2V0IHdhcyBjbG9zZWQuICR7cmVmcmVzaH1gKTtcbiAgICB9XG5cbiAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdHRlbXB0cyA9IDA7XG4gICAgICB0aGlzLnJldHJ5aW5nID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5ldmVudEhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgZm5dIG9mIHRoaXMuZXZlbnRIYW5kbGVycykge1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWNvbm5lY3QoKSB7XG4gICAgdGhpcy5hdHRlbXB0cyArPSAxO1xuICAgIHRoaXMucmV0cnlpbmcgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuYXR0ZW1wdHMgPiBtYXhBdHRlbXB0cykge1xuICAgICAgZXJyb3IoYFRoZSBXZWJTb2NrZXQgY291bGQgbm90IGJlIHJlY29ubmVjdGVkLiAke3JlZnJlc2h9YCk7XG4gICAgICB0aGlzLnJldHJ5aW5nID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZW91dCA9IDEwMDAgKiB0aGlzLmF0dGVtcHRzICoqIDI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY29ubmVjdCh0aGlzLmFyZ3MpLCB0aW1lb3V0KTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoLi4uYXJncykge1xuICAgIGNvbnN0IFssIGhhbmRsZXJdID0gYXJncztcbiAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSB0aGlzLmV2ZW50SGFuZGxlcnMuZmlsdGVyKChbLCBmbl0pID0+IGZuID09PSBoYW5kbGVyKTtcbiAgICB0aGlzLnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBDbGllbnRTb2NrZXQgfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG4vKiBlc2xpbnQtZGlzYWJsZSBnbG9iYWwtcmVxdWlyZSAqL1xuY29uc3QgcnVuID0gKGJ1aWxkSGFzaCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCB7IGFkZHJlc3MsIGNsaWVudCA9IHt9LCBwcm9ncmVzcywgc2VjdXJlLCBzdGF0dXMgfSA9IG9wdGlvbnM7XG5cbiAgb3B0aW9ucy5maXJzdEluc3RhbmNlID0gIXdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuICB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlID0gd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZSB8fCB7XG4gICAgY29tcGlsZXJzOiB7fVxuICB9O1xuICB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlLnNpbGVudCA9ICEhY2xpZW50LnNpbGVudDtcblxuICBjb25zdCB7IENsaWVudFNvY2tldCB9ID0gcmVxdWlyZSgnLi9DbGllbnRTb2NrZXQnKTtcbiAgY29uc3QgeyByZXBsYWNlIH0gPSByZXF1aXJlKCcuL2htcicpO1xuICBjb25zdCB7IGVycm9yLCBpbmZvLCB3YXJuIH0gPSByZXF1aXJlKCcuL2xvZycpKCk7XG5cbiAgY29uc3QgcHJvdG9jb2wgPSBzZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gIGNvbnN0IHNvY2tldCA9IG5ldyBDbGllbnRTb2NrZXQoY2xpZW50LCBgJHtwcm90b2NvbH06Ly8ke2NsaWVudC5hZGRyZXNzIHx8IGFkZHJlc3N9L3dwc2ApO1xuXG4gIGNvbnN0IHsgY29tcGlsZXJOYW1lIH0gPSBvcHRpb25zO1xuXG4gIHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUuY29tcGlsZXJzW2NvbXBpbGVyTmFtZV0gPSB7fTtcblxuICAvLyBwcmV2ZW50cyBFQ09OTlJFU0VUIGVycm9ycyBvbiB0aGUgc2VydmVyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiBzb2NrZXQuY2xvc2UoKSk7XG5cbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhID0ge30gfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBjb25zdCB7IGVycm9ycywgaGFzaCA9ICc8Pz4nLCB3YXJuaW5ncyB9ID0gZGF0YSB8fCB7fTtcbiAgICBjb25zdCBzaG9ydEhhc2ggPSBoYXNoLnNsaWNlKDAsIDcpO1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBvcHRpb25zLmNvbXBpbGVyTmFtZSA/IGAoQ29tcGlsZXI6ICR7b3B0aW9ucy5jb21waWxlck5hbWV9KSBgIDogJyc7XG4gICAgY29uc3QgY29tcGlsZXIgPSB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlLmNvbXBpbGVyc1tjb21waWxlck5hbWVdO1xuICAgIGNvbnN0IHsgd3BzSWQgfSA9IGRhdGE7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSAnYnVpbGQnOlxuICAgICAgICBjb21waWxlci5kb25lID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY29ubmVjdGVkJzpcbiAgICAgICAgaW5mbyhgV2ViU29ja2V0IGNvbm5lY3RlZCAke2lkZW50aWZpZXJ9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZG9uZSc6XG4gICAgICAgIGNvbXBpbGVyLmRvbmUgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Byb2JsZW1zJzpcbiAgICAgICAgaWYgKGRhdGEuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIGVycm9yKGAke2lkZW50aWZpZXJ9QnVpbGQgJHtzaG9ydEhhc2h9IHByb2R1Y2VkIGVycm9yczpcXG5gLCBlcnJvcnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLndhcm5pbmdzLmxlbmd0aCkge1xuICAgICAgICAgIHdhcm4oYCR7aWRlbnRpZmllcn1CdWlsZCAke3Nob3J0SGFzaH0gcHJvZHVjZWQgd2FybmluZ3M6XFxuYCwgd2FybmluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVsb2FkJzpcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAvLyBhY3Rpb25zIHdpdGggYSB3cHNJZCBpbiB0b3cgaW5kaWNhdGUgYWN0aW9ucyB0aGF0IHNob3VsZCBvbmx5IGJlIGV4ZWN1dGVkIHdoZW4gdGhlIHdwc0lkIHNlbnRcbiAgICAgICAgLy8gbWF0Y2hlcyB0aGUgd3BzSWQgc2V0IGluIG9wdGlvbnMuIHRoaXMgaXMgaG93IHdlIGNhbiBpZGVudGlmeSBtdWx0aXBsZSBjb21waWxlcnMgaW4gdGhlXG4gICAgICAgIC8vIGNsaWVudC5cbiAgICAgICAgaWYgKHdwc0lkICYmIHdwc0lkID09PSBvcHRpb25zLndwc0lkKSB7XG4gICAgICAgICAgcmVwbGFjZShidWlsZEhhc2gsIGhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChvcHRpb25zLmZpcnN0SW5zdGFuY2UpIHtcbiAgICBpZiAocHJvZ3Jlc3MgPT09ICdtaW5pbWFsJykge1xuICAgICAgY29uc3QgeyBpbml0IH0gPSByZXF1aXJlKCcuL292ZXJsYXlzL3Byb2dyZXNzLW1pbmltYWwnKTtcbiAgICAgIGluaXQob3B0aW9ucywgc29ja2V0KTtcbiAgICB9IGVsc2UgaWYgKHByb2dyZXNzKSB7XG4gICAgICBjb25zdCB7IGluaXQgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvcHJvZ3Jlc3MnKTtcbiAgICAgIGluaXQob3B0aW9ucywgc29ja2V0KTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdHVzKSB7XG4gICAgICBjb25zdCB7IGluaXQgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvc3RhdHVzJyk7XG4gICAgICBpbml0KG9wdGlvbnMsIHNvY2tldCk7XG4gICAgfVxuXG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgIGluZm8oJ0hvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgYWN0aXZlJyk7XG5cbiAgICAgIGlmIChvcHRpb25zLmxpdmVSZWxvYWQpIHtcbiAgICAgICAgaW5mbygnTGl2ZSBSZWxvYWQgdGFraW5nIHByZWNlZGVuY2Ugb3ZlciBIb3QgTW9kdWxlIFJlcGxhY2VtZW50Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oJ0hvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgaW5hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoIW1vZHVsZS5ob3QgJiYgb3B0aW9ucy5saXZlUmVsb2FkKSB7XG4gICAgICBpbmZvKCdMaXZlIFJlbG9hZCBpcyBhY3RpdmUnKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBydW4gfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGVycm9yLCBpbmZvLCByZWZyZXNoLCB3YXJuIH0gPSByZXF1aXJlKCcuL2xvZycpKCk7XG5cbmxldCBsYXRlc3QgPSB0cnVlO1xuXG5jb25zdCBobXIgPSB7XG4gIG9uVW5hY2NlcHRlZChkYXRhKSB7XG4gICAgd2FybignQ2hhbmdlIGluIHVuYWNjZXB0ZWQgbW9kdWxlKHMpOlxcbicsIGRhdGEpO1xuICAgIHdhcm4oZGF0YSk7XG4gIH0sXG4gIG9uRGVjbGluZWQoZGF0YSkge1xuICAgIHdhcm4oJ0NoYW5nZSBpbiBkZWNsaW5lZCBtb2R1bGUocyk6XFxuJywgZGF0YSk7XG4gIH0sXG4gIG9uRXJyb3JlZChkYXRhKSB7XG4gICAgZXJyb3IoJ0Vycm9yIGluIG1vZHVsZShzKTpcXG4nLCBkYXRhKTtcbiAgfVxufTtcblxuY29uc3QgcmVwbGFjZSA9IGFzeW5jIChidWlsZEhhc2gsIGhhc2gpID0+IHtcbiAgY29uc3QgeyBhcHBseSwgY2hlY2ssIHN0YXR1cyB9ID0gbW9kdWxlLmhvdDtcblxuICBpZiAoaGFzaCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIGxhdGVzdCA9IGhhc2guaW5jbHVkZXMoYnVpbGRIYXNoKTtcbiAgfVxuXG4gIGlmICghbGF0ZXN0KSB7XG4gICAgY29uc3QgaG1yU3RhdHVzID0gc3RhdHVzKCk7XG5cbiAgICBpZiAoaG1yU3RhdHVzID09PSAnYWJvcnQnIHx8IGhtclN0YXR1cyA9PT0gJ2ZhaWwnKSB7XG4gICAgICB3YXJuKGBBbiBITVIgdXBkYXRlIHdhcyB0cmlnZ2VyZWQsIGJ1dCAke2htclN0YXR1c31lZC4gJHtyZWZyZXNofWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtb2R1bGVzO1xuXG4gICAgdHJ5IHtcbiAgICAgIG1vZHVsZXMgPSBhd2FpdCBjaGVjayhmYWxzZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gbm9vcC4gdGhpcyB0eXBpY2FsbHkgaGFwcGVucyB3aGVuIGEgTXVsdGlDb21waWxlciBoYXMgbW9yZSB0aGFuIG9uZSBjb21waWxlciB0aGF0IGluY2x1ZGVzXG4gICAgICAvLyB0aGlzIHNjcmlwdCwgYW5kIGFuIHVwZGF0ZSBoYXBwZW5zIHdpdGggYSBoYXNoIHRoYXQgaXNuJ3QgcGFydCBvZiB0aGUgY29tcGlsZXIvbW9kdWxlIHRoaXNcbiAgICAgIC8vIGluc3RhbmNlIHdhcyBsb2FkZWQgZm9yLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghbW9kdWxlcykge1xuICAgICAgd2FybihgTm8gbW9kdWxlcyBmb3VuZCBmb3IgcmVwbGFjZW1lbnQuICR7cmVmcmVzaH1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBtb2R1bGVzID0gYXdhaXQgYXBwbHkoaG1yKTtcblxuICAgIGlmIChtb2R1bGVzKSB7XG4gICAgICBsYXRlc3QgPSB0cnVlO1xuICAgICAgaW5mbyhgQnVpbGQgJHtoYXNoLnNsaWNlKDAsIDcpfSByZXBsYWNlZDpcXG5gLCBtb2R1bGVzKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyByZXBsYWNlIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBlcnJvciwgaW5mbywgd2FybiB9ID0gY29uc29sZTtcbmNvbnN0IGxvZyA9IHtcbiAgZXJyb3I6IGVycm9yLmJpbmQoY29uc29sZSwgJ+KsoSB3cHM6JyksXG4gIGluZm86IGluZm8uYmluZChjb25zb2xlLCAn4qyhIHdwczonKSxcbiAgcmVmcmVzaDogJ1BsZWFzZSByZWZyZXNoIHRoZSBwYWdlJyxcbiAgd2Fybjogd2Fybi5iaW5kKGNvbnNvbGUsICfirKEgd3BzOicpXG59O1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuY29uc3Qgc2lsZW50ID0ge1xuICBlcnJvcjogbm9vcCxcbiAgaW5mbzogbm9vcCxcbiAgd2Fybjogbm9vcFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiAod2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZS5zaWxlbnQgPyBzaWxlbnQgOiBsb2cpO1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbCwgTWF0aGV1cyBHb27Dp2FsdmVzIGRhIFNpbHZhXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtcHJvZ3Jlc3MtbWluaW1hbCc7XG5jb25zdCBodG1sID0gYFxuPGRpdiBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1oaWRkZW5cIj5cbiAgPGRpdiBpZD1cIiR7bnN9LWJhclwiPjwvZGl2PlxuPC9kaXY+XG5gO1xuY29uc3QgY3NzID0gYFxuIyR7bnN9IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogNHB4O1xuICB3aWR0aDogMTAwdnc7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbiMke25zfS1iYXIge1xuICB3aWR0aDogMCU7XG4gIGhlaWdodDogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg2LCAyMjMsIDE3Mik7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30tZmFkZSB7XG5cdDAlIHtcblx0XHRvcGFjaXR5OiAxO1xuXHR9XG5cdDEwMCUge1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cbn1cblxuLiR7bnN9LWRpc2FwcGVhciB7XG4gIGFuaW1hdGlvbjogJHtuc30tZmFkZSAuM3M7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICBhbmltYXRpb24tZGVsYXk6IC41cztcbn1cblxuLiR7bnN9LWhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5gO1xuXG5sZXQgaGlkZU9uUGFnZVZpc2libGUgPSBmYWxzZTtcblxuY29uc3QgdXBkYXRlID0gKHBlcmNlbnQpID0+IHtcbiAgY29uc3QgYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWJhcmApO1xuICBiYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xufTtcblxuY29uc3QgcmVzZXQgPSAod3JhcHBlcikgPT4ge1xuICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWRpc2FwcGVhcmApO1xufTtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgaWYgKG9wdGlvbnMuZmlyc3RJbnN0YW5jZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICBhZGRDc3MoY3NzKTtcbiAgICAgIGFkZEh0bWwoaHRtbCk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc31gKTtcbiAgICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICB1cGRhdGUoMCk7XG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChgJHtuc30taGlkZGVuYCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbiAmJiBoaWRlT25QYWdlVmlzaWJsZSkge1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG4gICAgICAgIHJlc2V0KHdyYXBwZXIpO1xuICAgICAgICBoaWRlT25QYWdlVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG5cbiAgICBpZiAoYWN0aW9uICE9PSAncHJvZ3Jlc3MnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudCA9IE1hdGguZmxvb3IoZGF0YS5wZXJjZW50ICogMTAwKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG5cbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LWhpZGRlbmAsIGAke25zfS1kaXNhcHBlYXJgKTtcblxuICAgIGlmIChkYXRhLnBlcmNlbnQgPT09IDEpIHtcbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgaGlkZU9uUGFnZVZpc2libGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzZXQod3JhcHBlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGVPblBhZ2VWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdXBkYXRlKHBlcmNlbnQpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0XG59O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbCwgTWF0aGV1cyBHb27Dp2FsdmVzIGRhIFNpbHZhXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtcHJvZ3Jlc3MnO1xuY29uc3QgY3NzID0gYFxuIyR7bnN9e1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDUlO1xuICB0b3A6IDUlO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbiMke25zfS1iZyB7XG4gIGZpbGw6ICMyODJkMzU7XG59XG5cbiMke25zfS1maWxsIHtcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAwKTtcbiAgc3Ryb2tlOiByZ2IoMTg2LCAyMjMsIDE3Mik7XG4gIHN0cm9rZS1kYXNoYXJyYXk6IDIxOS45OTA3ODM2OTE0MDYyNTtcbiAgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0yMTkuOTkwNzgzNjkxNDA2MjU7XG4gIHN0cm9rZS13aWR0aDogMTA7XG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKXRyYW5zbGF0ZSgwcHgsIC04MHB4KTtcbn1cblxuIyR7bnN9LXBlcmNlbnQge1xuICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZmlsbDogI2ZmZmZmZjtcbn1cblxuIyR7bnN9LXBlcmNlbnQtdmFsdWUge1xuICBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlO1xuICB0ZXh0LWFuY2hvcjogbWlkZGxlO1xufVxuXG4jJHtuc30tcGVyY2VudC1zdXBlciB7XG4gIGZpbGw6ICNiZGMzYzc7XG4gIGZvbnQtc2l6ZTogLjQ1ZW07XG4gIGJhc2VsaW5lLXNoaWZ0OiAxMCU7XG59XG5cbi4ke25zfS1ub3NlbGVjdCB7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30tZmFkZSB7XG5cdDAlIHtcblx0XHRvcGFjaXR5OiAxO1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMSk7XG5cdFx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuXHR9XG5cdDEwMCUge1xuXHRcdG9wYWNpdHk6IDA7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0XHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdH1cbn1cblxuLiR7bnN9LWRpc2FwcGVhciB7XG4gIGFuaW1hdGlvbjogJHtuc30tZmFkZSAuM3M7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6Zm9yd2FyZHM7XG4gIGFuaW1hdGlvbi1kZWxheTogLjVzO1xufVxuXG4uJHtuc30taGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyogUHV0IGdvb2dsZSB3ZWIgZm9udCBhdCB0aGUgZW5kLCBvciB5b3UnbGwgc2VlIEZPVUMgaW4gRmlyZWZveCAqL1xuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnM6NDAwLDcwMCcpO1xuYDtcblxuY29uc3QgaHRtbCA9IGBcbjxzdmcgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30tbm9zZWxlY3QgJHtuc30taGlkZGVuXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCI+XG4gIDxjaXJjbGUgaWQ9XCIke25zfS1iZ1wiIGN4PVwiNTAlXCIgY3k9XCI1MCVcIiByPVwiMzVcIj48L2NpcmNsZT5cbiAgPHBhdGggaWQ9XCIke25zfS1maWxsXCIgZD1cIk01LDQwYTM1LDM1IDAgMSwwIDcwLDBhMzUsMzUgMCAxLDAgLTcwLDBcIiAvPlxuICA8dGV4dCBpZD1cIiR7bnN9LXBlcmNlbnRcIiB4PVwiNTAlXCIgeT1cIjUxJVwiPjx0c3BhbiBpZD1cIiR7bnN9LXBlcmNlbnQtdmFsdWVcIj4wPC90c3Bhbj48dHNwYW4gaWQ9XCIke25zfS1wZXJjZW50LXN1cGVyXCI+JTwvdHNwYW4+PC90ZXh0PlxuPC9zdmc+XG5gO1xuXG5sZXQgaGlkZU9uUGFnZVZpc2libGUgPSBmYWxzZTtcblxuY29uc3QgdXBkYXRlID0gKHBlcmNlbnQpID0+IHtcbiAgY29uc3QgbWF4ID0gLTIxOS45OTA3ODM2OTE0MDYyNTtcbiAgY29uc3QgdmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tcGVyY2VudC12YWx1ZWApO1xuICBjb25zdCB0cmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1maWxsYCk7XG4gIGNvbnN0IG9mZnNldCA9ICgoMTAwIC0gcGVyY2VudCkgLyAxMDApICogbWF4O1xuXG4gIHRyYWNrLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgc3Ryb2tlLWRhc2hvZmZzZXQ6ICR7b2Zmc2V0fWApO1xuICB2YWx1ZS5pbm5lckhUTUwgPSBwZXJjZW50LnRvU3RyaW5nKCk7XG59O1xuXG5jb25zdCByZXNldCA9IChzdmcpID0+IHtcbiAgc3ZnLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWRpc2FwcGVhcmApO1xufTtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgaWYgKG9wdGlvbnMuZmlyc3RJbnN0YW5jZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICBhZGRDc3MoY3NzKTtcbiAgICAgIGFkZEh0bWwoaHRtbCk7XG5cbiAgICAgIC8vIFJlc2V0IHByb2dyZXNzIHRvIHplcm8gYWZ0ZXIgZGlzYXBwZWFyIGFuaW1hdGlvblxuICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG4gICAgICBzdmcuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICB1cGRhdGUoMCk7XG4gICAgICAgIHN2Zy5jbGFzc0xpc3QuYWRkKGAke25zfS1oaWRkZW5gKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHtcbiAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuICYmIGhpZGVPblBhZ2VWaXNpYmxlKSB7XG4gICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuICAgICAgICByZXNldChzdmcpO1xuICAgICAgICBoaWRlT25QYWdlVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG5cbiAgICBpZiAoYWN0aW9uICE9PSAncHJvZ3Jlc3MnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudCA9IE1hdGguZmxvb3IoZGF0YS5wZXJjZW50ICogMTAwKTtcbiAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc31gKTtcblxuICAgIGlmICghc3ZnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gd2UgY2FuIHNhZmVseSBjYWxsIHRoaXMgZXZlbiBpZiBpdCBkb2Vzbid0IGhhdmUgdGhlIGNsYXNzXG4gICAgc3ZnLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LWRpc2FwcGVhcmAsIGAke25zfS1oaWRkZW5gKTtcblxuICAgIGlmIChkYXRhLnBlcmNlbnQgPT09IDEpIHtcbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgaGlkZU9uUGFnZVZpc2libGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzZXQoc3ZnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZU9uUGFnZVZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB1cGRhdGUocGVyY2VudCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQgfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGFkZENzcywgYWRkSHRtbCwgc29ja2V0TWVzc2FnZSB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IG5zID0gJ3dwcy1zdGF0dXMnO1xuY29uc3QgY3NzID0gYFxuIyR7bnN9IHtcbiAgYmFja2dyb3VuZDogIzI4MmQzNTtcbiAgYm9yZGVyLXJhZGl1czogMC42ZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiAxMHB4O1xuICBoZWlnaHQ6IDkwJTtcbiAgbWluLWhlaWdodDogMjBlbTtcbiAgbGVmdDogNTAlO1xuICBvcGFjaXR5OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nLWJvdHRvbTogM2VtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMnJlbTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XG4gIHdpZHRoOiA5NSU7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30taGlkZGVuLWRpc3BsYXkge1xuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHQ5OSUge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cblx0MTAwJSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG59XG5cbiMke25zfS4ke25zfS1oaWRkZW4ge1xuICBhbmltYXRpb246ICR7bnN9LWhpZGRlbi1kaXNwbGF5IC4zcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkcztcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiB7XG4gIGFuaW1hdGlvbjogbWluaW1pemUgMTBzO1xuICBib3R0b206IDJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDZlbTtcbiAgbGVmdDogYXV0bztcbiAgbWluLWhlaWdodDogNmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMmVtO1xuICB0b3A6IGF1dG87XG4gIHRyYW5zZm9ybTogbm9uZTtcbiAgd2lkdGg6IDZlbTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tYmVhY29uIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbiMke25zfS10aXRsZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDEuMmVtO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDAuNmVtIDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LXRpdGxlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LXRpdGxlLWVycm9ycyB7XG4gIGNvbG9yOiAjZmY1ZjU4O1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIHBhZGRpbmctbGVmdDogMWVtO1xufVxuXG4jJHtuc30tdGl0bGUtd2FybmluZ3Mge1xuICBjb2xvcjogI2ZmYmQyZTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBwYWRkaW5nLWxlZnQ6IDFlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMWVtIDJlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHByZSB7XG4gIGNvbG9yOiAjZGRkO1xuICBiYWNrZ3JvdW5kOiAjMjgyZDM1O1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxLjNlbTtcblx0Zm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbiMke25zfS1wcm9ibGVtcyBwcmUgZW0ge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcbiAgY29sb3I6ICM2NDFlMTY7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDNlbTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjRlbTtcbiAgcGFkZGluZzogMC4xZW0gMC40ZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbnByZSMke25zfS13YXJuaW5ncyBlbSB7XG4gIGJhY2tncm91bmQ6ICNmZmJkMmU7XG4gIGNvbG9yOiAjM2UyNzIzO1xufVxuXG5wcmUjJHtuc30tc3VjY2VzcyB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucHJlIyR7bnN9LXN1Y2Nlc3MgZW0ge1xuICBiYWNrZ3JvdW5kOiAjN2ZiOTAwO1xuICBjb2xvcjogIzAwNGQ0MDtcbn1cblxuIyR7bnN9LXByb2JsZW1zLiR7bnN9LXN1Y2Nlc3MgIyR7bnN9LXN1Y2Nlc3Mge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tcHJvYmxlbXMge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2IHtcbiAgb3BhY2l0eTogMC41O1xuICBwYWRkaW5nOiAxLjJlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS1uYXYge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2OmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuIyR7bnN9LW5hdiBkaXYge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAxLjJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogMS4yZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEuMmVtO1xufVxuXG5kaXYjJHtuc30tbWluIHtcbiAgYmFja2dyb3VuZDogI2ZmYmQyZTtcbiAgbWFyZ2luLWxlZnQ6IDAuOGVtO1xufVxuXG4jJHtuc30tYmVhY29uIHtcbiAgYm9yZGVyLXJhZGl1czogM2VtO1xuICBkaXNwbGF5OiBub25lO1xuICBmb250LXNpemU6IDEwcHg7XG4gIGhlaWdodDogM2VtO1xuICBtYXJnaW46IDEuNmVtIGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDNlbTtcbn1cblxuIyR7bnN9LWJlYWNvbjpiZWZvcmUsICMke25zfS1iZWFjb246YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LDE4NSwwLCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiAzZW07XG4gIG9wYWNpdHk6IDA7XG59XG5cbiMke25zfS1iZWFjb246YmVmb3JlIHtcbiAgYW5pbWF0aW9uOiAke25zfS1wdWxzZSAzcyBpbmZpbml0ZSBsaW5lYXI7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG5cbiMke25zfS1iZWFjb246YWZ0ZXIge1xuICBhbmltYXRpb246ICR7bnN9LXB1bHNlIDNzIDJzIGluZmluaXRlIGxpbmVhcjtcbn1cblxuXG5Aa2V5ZnJhbWVzICR7bnN9LXB1bHNlIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjYpO1xuICB9XG4gIDMzJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICB9XG59XG5cbiMke25zfS1iZWFjb24gbWFyayB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LCAxODUsIDAsIDEpO1xuICBib3JkZXItcmFkaXVzOiAxMDAlIDEwMCU7XG4gIGhlaWdodDogMWVtO1xuICBsZWZ0OiAxZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxZW07XG4gIHdpZHRoOiAxZW07XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3IgbWFyayB7XG4gIGJhY2tncm91bmQ6ICNmZjVmNTg7XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3I6YmVmb3JlLCAjJHtuc30tYmVhY29uLmVycm9yOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDk1LCA4OCwgMC4yKTtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS13YXJuaW5nIG1hcmsge1xuICBiYWNrZ3JvdW5kOiAjZmZiZDJlO1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LXdhcm5pbmc6YmVmb3JlLCAjJHtuc30tYmVhY29uLndhcm5pbmc6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTg5LCA0NiwgMC4yKTtcbn1cblxuLyogUHV0IGdvb2dsZSB3ZWIgZm9udCBhdCB0aGUgZW5kLCBvciB5b3UnbGwgc2VlIEZPVUMgaW4gRmlyZWZveCAqL1xuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnM6NDAwLDcwMCcpO1xuYDtcblxuY29uc3QgaHRtbCA9IGBcbjxhc2lkZSBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1oaWRkZW5cIiB0aXRsZT1cImJ1aWxkIHN0YXR1c1wiPlxuICA8ZmlndXJlIGlkPVwiJHtuc30tYmVhY29uXCI+XG4gICAgPG1hcmsvPlxuICA8L2ZpZ3VyZT5cbiAgPG5hdiBpZD1cIiR7bnN9LW5hdlwiPlxuICAgIDxkaXYgaWQ9XCIke25zfS1jbG9zZVwiIHRpdGxlPVwiY2xvc2VcIj48L2Rpdj5cbiAgICA8ZGl2IGlkPVwiJHtuc30tbWluXCIgdGl0bGU9XCJtaW5taXplXCI+PC9kaXY+XG4gIDwvbmF2PlxuICA8aDEgaWQ9XCIke25zfS10aXRsZVwiPlxuICAgIGJ1aWxkIHN0YXR1c1xuICAgIDxlbSBpZD1cIiR7bnN9LXRpdGxlLWVycm9yc1wiPjwvZW0+XG4gICAgPGVtIGlkPVwiJHtuc30tdGl0bGUtd2FybmluZ3NcIj48L2VtPlxuICA8L2gxPlxuICA8YXJ0aWNsZSBpZD1cIiR7bnN9LXByb2JsZW1zXCI+XG4gICAgPHByZSBpZD1cIiR7bnN9LXN1Y2Nlc3NcIj48ZW0+QnVpbGQgU3VjY2Vzc2Z1bDwvZW0+PC9wcmU+XG4gICAgPHByZSBpZD1cIiR7bnN9LWVycm9yc1wiPjwvcHJlPlxuICAgIDxwcmUgaWQ9XCIke25zfS13YXJuaW5nc1wiPjwvcHJlPlxuICA8L2FydGljbGU+XG48L2FzaWRlPlxuYDtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgY29uc3QgaGlkZGVuID0gYCR7bnN9LWhpZGRlbmA7XG4gIGxldCBoYXNQcm9ibGVtcyA9IGZhbHNlO1xuICBsZXQgYXNpZGU7XG4gIGxldCBiZWFjb247XG4gIGxldCBwcm9ibGVtcztcbiAgbGV0IHByZUVycm9ycztcbiAgbGV0IHByZVdhcm5pbmdzO1xuICBsZXQgdGl0bGVFcnJvcnM7XG4gIGxldCB0aXRsZVdhcm5pbmdzO1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIHByZUVycm9ycy5pbm5lckhUTUwgPSAnJztcbiAgICBwcmVXYXJuaW5ncy5pbm5lckhUTUwgPSAnJztcbiAgICBwcm9ibGVtcy5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1zdWNjZXNzYCk7XG4gICAgYmVhY29uLmNsYXNzTmFtZSA9ICcnO1xuICAgIHRpdGxlRXJyb3JzLmlubmVyVGV4dCA9ICcnO1xuICAgIHRpdGxlV2FybmluZ3MuaW5uZXJUZXh0ID0gJyc7XG4gIH07XG5cbiAgY29uc3QgYWRkRXJyb3JzID0gKGVycm9ycykgPT4ge1xuICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICBwcm9ibGVtcy5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1zdWNjZXNzYCk7XG4gICAgICBiZWFjb24uY2xhc3NMaXN0LmFkZChgJHtuc30tZXJyb3JgKTtcblxuICAgICAgZm9yIChjb25zdCBlcnJvciBvZiBlcnJvcnMpIHtcbiAgICAgICAgY29uc3QgbWFya3VwID0gYDxkaXY+PGVtPkVycm9yPC9lbT4gaW4gJHtlcnJvcn08L2Rpdj5gO1xuICAgICAgICBhZGRIdG1sKG1hcmt1cCwgcHJlRXJyb3JzKTtcbiAgICAgIH1cblxuICAgICAgdGl0bGVFcnJvcnMuaW5uZXJUZXh0ID0gYCR7ZXJyb3JzLmxlbmd0aH0gRXJyb3IocylgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZUVycm9ycy5pbm5lclRleHQgPSAnJztcbiAgICB9XG4gICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFdhcm5pbmdzID0gKHdhcm5pbmdzKSA9PiB7XG4gICAgaWYgKHdhcm5pbmdzLmxlbmd0aCkge1xuICAgICAgcHJvYmxlbXMuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tc3VjY2Vzc2ApO1xuXG4gICAgICBpZiAoIWJlYWNvbi5jbGFzc0xpc3QuY29udGFpbnMoYCR7bnN9LWVycm9yYCkpIHtcbiAgICAgICAgYmVhY29uLmNsYXNzTGlzdC5hZGQoYCR7bnN9LXdhcm5pbmdgKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCB3YXJuaW5nIG9mIHdhcm5pbmdzKSB7XG4gICAgICAgIGNvbnN0IG1hcmt1cCA9IGA8ZGl2PjxlbT5XYXJuaW5nPC9lbT4gaW4gJHt3YXJuaW5nfTwvZGl2PmA7XG4gICAgICAgIGFkZEh0bWwobWFya3VwLCBwcmVXYXJuaW5ncyk7XG4gICAgICB9XG5cbiAgICAgIHRpdGxlV2FybmluZ3MuaW5uZXJUZXh0ID0gYCR7d2FybmluZ3MubGVuZ3RofSBXYXJuaW5nKHMpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGVXYXJuaW5ncy5pbm5lclRleHQgPSAnJztcbiAgICB9XG5cbiAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG4gIH07XG5cbiAgaWYgKG9wdGlvbnMuZmlyc3RJbnN0YW5jZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICBhZGRDc3MoY3NzKTtcbiAgICAgIFthc2lkZV0gPSBhZGRIdG1sKGh0bWwpO1xuICAgICAgYmVhY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWJlYWNvbmApO1xuICAgICAgcHJvYmxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tcHJvYmxlbXNgKTtcbiAgICAgIHByZUVycm9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1lcnJvcnNgKTtcbiAgICAgIHByZVdhcm5pbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXdhcm5pbmdzYCk7XG4gICAgICB0aXRsZUVycm9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS10aXRsZS1lcnJvcnNgKTtcbiAgICAgIHRpdGxlV2FybmluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tdGl0bGUtd2FybmluZ3NgKTtcblxuICAgICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tY2xvc2VgKTtcbiAgICAgIGNvbnN0IG1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1taW5gKTtcblxuICAgICAgYXNpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LW1pbmApO1xuICAgICAgfSk7XG5cbiAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QuYWRkKGAke25zfS1oaWRkZW5gKTtcbiAgICAgIH0pO1xuXG4gICAgICBtaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QuYWRkKGAke25zfS1taW5gKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc29ja2V0TWVzc2FnZShzb2NrZXQsIChhY3Rpb24sIGRhdGEpID0+IHtcbiAgICBpZiAoIWFzaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBjb21waWxlcnMgfSA9IHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmU7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSAnYnVpbGQnOlxuICAgICAgICAvLyBjbGVhciBlcnJvcnMgYW5kIHdhcm5pbmdzIHdoZW4gYSBuZXcgYnVpbGQgYmVnaW5zXG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJvYmxlbXMnOlxuICAgICAgICBhZGRFcnJvcnMoZGF0YS5lcnJvcnMpO1xuICAgICAgICBhZGRXYXJuaW5ncyhkYXRhLndhcm5pbmdzKTtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICAgICAgICBoYXNQcm9ibGVtcyA9IGRhdGEuZXJyb3JzLmxlbmd0aCB8fCBkYXRhLndhcm5pbmdzLmxlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgLy8gaWYgdGhlcmUncyBhIGNvbXBpbGVyIHRoYXQgaXNuJ3QgZG9uZSB5ZXQsIGhvbGQgb2ZmIGFuZCBsZXQgaXQgcnVuIHRoZSBzaG93XG4gICAgICAgIGZvciAoY29uc3QgY29tcGlsZXJOYW1lIG9mIE9iamVjdC5rZXlzKGNvbXBpbGVycykpIHtcbiAgICAgICAgICBpZiAoIWNvbXBpbGVyc1tjb21waWxlck5hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc1Byb2JsZW1zICYmICFwcmVFcnJvcnMuY2hpbGRyZW4ubGVuZ3RoICYmICFwcmVXYXJuaW5ncy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgIGhhc1Byb2JsZW1zID0gZmFsc2U7XG4gICAgICAgICAgcHJvYmxlbXMuY2xhc3NMaXN0LmFkZChgJHtuc30tc3VjY2Vzc2ApO1xuICAgICAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXNpZGUuY2xhc3NMaXN0LmFkZChoaWRkZW4pLCAzZTMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQgfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCBhZGRIdG1sID0gKGh0bWwsIHBhcmVudCkgPT4ge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgbm9kZXMgPSBbXTtcblxuICBkaXYuaW5uZXJIVE1MID0gaHRtbC50cmltKCk7XG5cbiAgd2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XG4gICAgbm9kZXMucHVzaCgocGFyZW50IHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKSk7XG4gIH1cblxuICByZXR1cm4gbm9kZXM7XG59O1xuXG5jb25zdCBhZGRDc3MgPSAoY3NzKSA9PiB7XG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICBpZiAoY3NzLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cblxuICAvLyBhcHBlbmQgdGhlIHN0eWxlc2hlZXQgZm9yIHRoZSBzdmdcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59O1xuXG5jb25zdCBzb2NrZXRNZXNzYWdlID0gKHNvY2tldCwgaGFuZGxlcikgPT4ge1xuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgPSB7fSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgIGhhbmRsZXIoYWN0aW9uLCBkYXRhKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgYWRkQ3NzLCBhZGRIdG1sLCBzb2NrZXRNZXNzYWdlIH07XG4iLCJpbXBvcnQgeyBHYW1lU3RhdGUsIEZpZWxkU3RhdGUgfSBmcm9tICcuL1N0YXRlJ1xuaW1wb3J0IHsgR2FtZU5vZGUgfSBmcm9tICcuL05vZGVzJ1xuaW1wb3J0IHsgRGlmZmljdWx0eSwgT3B0aW9ucyB9IGZyb20gJy4vU2hhcmVkJ1xuXG4vL1xuLy8gTWFpbiBHYW1lIGNsYXNzOiB0aWVzIHRvZ2V0aGVyIHN0YXRlIGFuZCBodG1sIG5vZGVzXG4vL1xuXG5jbGFzcyBHYW1lIHtcbiAgICBwdWJsaWMgc3RhdGU6IEdhbWVTdGF0ZVxuICAgIHB1YmxpYyBub2RlOiBHYW1lTm9kZVxuXG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnM6IE9wdGlvbnMsIGNvbnRhaW5lcj86IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHsgZGlmZiwgbnVtQ29scywgbnVtUm93cyB9ID0gb3B0aW9uc1xuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IEdhbWVTdGF0ZShkaWZmLCBudW1Db2xzLCBudW1Sb3dzKVxuICAgICAgICB0aGlzLm5vZGUgPSBuZXcgR2FtZU5vZGUodGhpcy5zdGF0ZSwgY29udGFpbmVyKVxuICAgIH1cblxuICAgIHJldmVhbCAoLi4uZmllbGRJbmRpY2VzOiBudW1iZXJbXSkge31cblxuICAgIG1hcmsgKGZpZWxkSW5kZXg6IG51bWJlcikge31cblxuICAgIC8vIENvdW50IG51bWJlciBvZiBtYXJrZWQgbmVhcmJ5IGZpZWxkc1xuICAgIGdldE5lYXJieU1hcmtlZCAoZmllbGRTdGF0ZTogRmllbGRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gZmllbGRTdGF0ZS5uZWFyYnlJbmRpY2VzXG4gICAgICAgICAgICAubWFwKChpZHgpID0+IHRoaXMuc3RhdGUuZmllbGRzW2lkeF0pXG4gICAgICAgICAgICAuZmlsdGVyKChzdGF0ZSkgPT4gc3RhdGUuaXNNYXJrZWQoKSkubGVuZ3RoXG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgZmllbGQgY2FuIHJldmVhbCBpbiBhIGNhc2NhZGVcbiAgICBjYW5DYXNjYWRlIChmaWVsZEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZmllbGRTdGF0ZSA9IHRoaXMuc3RhdGUuZmllbGRzW2ZpZWxkSW5kZXhdXG4gICAgICAgIGNvbnN0IG5lYXJieU1hcmtlZCA9IHRoaXMuZ2V0TmVhcmJ5TWFya2VkKGZpZWxkU3RhdGUpXG4gICAgICAgIHJldHVybiBuZWFyYnlNYXJrZWQgPT09IGZpZWxkU3RhdGUubWluZUNvdW50XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lXG4iLCJpbXBvcnQgeyBGaWVsZFN0YXRlIH0gZnJvbSAnLi9TdGF0ZSdcblxuY29uc3QgZW51bSBDbGljayB7XG4gICAgTGVmdCA9IDAsXG4gICAgTWlkZGxlID0gMSxcbiAgICBSaWdodCA9IDIsXG59XG5cbi8vIEZpZWxkIGNsaWNrIGhhbmRsZXIgZmFjdG9yeVxuZXhwb3J0IGZ1bmN0aW9uIEZpZWxkQ2xpY2tIYW5kbGVyIChmaWVsZFN0YXRlOiBGaWVsZFN0YXRlLCBmaWVsZE5vZGU6IEhUTUxFbGVtZW50KSB7XG4gICAgLy8gRXZlbnQgaGFuZGxlclxuICAgIHJldHVybiBmdW5jdGlvbiAoZXY6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldi5idXR0b24pIHtcbiAgICAgICAgLy8gY2FzZSBDbGljay5MZWZ0OlxuICAgICAgICAvLyAgICAgaWYgKGZpZWxkU3RhdGUuaXNSZXZlYWxlZCgpKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV2ZWFsKGZpZWxkU3RhdGUuaW5kZXgpXG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIHJldmVhbCguLi5maWVsZFN0YXRlLm5lYXJieUluZGljZXMpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBpZiAoZmllbGRTdGF0ZS5maWVsZFZhbCA9PT0gRmllbGRTeW1ib2wuTWluZSkge1xuICAgICAgICAvLyAgICAgICAgIGNvbnN0IHRleHROb2RlID0gRmllbGRUZXh0KEZpZWxkU3ltYm9sLk1pbmUpXG4gICAgICAgIC8vICAgICAgICAgZmllbGROb2RlLmFwcGVuZENoaWxkKHRleHROb2RlKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgcmV0dXJuXG4gICAgICAgIC8vIGNhc2UgQ2xpY2suTWlkZGxlOlxuICAgICAgICAvLyBjYXNlIENsaWNrLlJpZ2h0OlxuICAgICAgICAvLyAgICAgaWYgKCFmaWVsZFN0YXRlLmlzTWFya2VkKCkpIHtcbiAgICAgICAgLy8gICAgICAgICBtYXJrKGZpZWxkU3RhdGUuaW5kZXgpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEZpZWxkU3RhdGUsIEdhbWVTdGF0ZSB9IGZyb20gJy4vU3RhdGUnXG5pbXBvcnQgeyBGaWVsZFN5bWJvbCB9IGZyb20gJy4vU2hhcmVkJ1xuaW1wb3J0IHsgRmllbGRDbGlja0hhbmRsZXIgfSBmcm9tICcuL0hhbmRsZXJzJ1xuXG5jb25zdCBlbnVtIENzc0NsYXNzIHtcbiAgICBHYW1lID0gJ2dhbWUnLFxuICAgIE1lbnUgPSAnbWVudScsXG4gICAgTWVudUl0ZW0gPSAnbWVudS1pdGVtJyxcbiAgICBCb2FyZCA9ICdib2FyZCcsXG4gICAgRmllbGQgPSAnZmllbGQnLFxufVxuXG4vL1xuLy8gTm9kZSBiYXNlIGNsYXNzZXNcbi8vXG5hYnN0cmFjdCBjbGFzcyBfX05vZGUge1xuICAgIHB1YmxpYyByZWFkb25seSBjb250YWluZXI6IEhUTUxFbGVtZW50XG5cbiAgICBjb25zdHJ1Y3RvciAoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgLi4uY3NzQ2xhc3NlczogQ3NzQ2xhc3NbXSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKC4uLmNzc0NsYXNzZXMpXG4gICAgfVxuXG4gICAgYXBwZW5kICguLi5ub2RlczogX05vZGVbXSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQoLi4ubm9kZXMubWFwKChuKSA9PiBuLmNvbnRhaW5lcikpXG4gICAgfVxufVxuXG5hYnN0cmFjdCBjbGFzcyBfTm9kZSBleHRlbmRzIF9fTm9kZSB7XG4gICAgY29uc3RydWN0b3IgKHRhZzogc3RyaW5nLCAuLi5jc3NDbGFzc2VzOiBDc3NDbGFzc1tdKSB7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKSwgLi4uY3NzQ2xhc3NlcylcbiAgICB9XG59XG5cbmFic3RyYWN0IGNsYXNzIF9Ob2RlV2l0aFRleHQgZXh0ZW5kcyBfTm9kZSB7XG4gICAgcHJpdmF0ZSB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxuXG4gICAgY29uc3RydWN0b3IgKHRhZzogc3RyaW5nLCAuLi5jc3NDbGFzc2VzOiBDc3NDbGFzc1tdKSB7XG4gICAgICAgIHN1cGVyKHRhZywgLi4uY3NzQ2xhc3NlcylcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50ZXh0Tm9kZSlcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0IChuZXdUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50ZXh0Tm9kZS5ub2RlVmFsdWUgPSBuZXdUZXh0XG4gICAgfVxufVxuXG4vL1xuLy8gR2FtZVxuLy9cblxuZXhwb3J0IGNsYXNzIEdhbWVOb2RlIGV4dGVuZHMgX19Ob2RlIHtcbiAgICBwdWJsaWMgbWVudU5vZGUgPSBuZXcgTWVudU5vZGUoKVxuICAgIHB1YmxpYyBib2FyZE5vZGU6IEJvYXJkTm9kZVxuXG4gICAgY29uc3RydWN0b3IgKHN0YXRlOiBHYW1lU3RhdGUsIGNvbnRhaW5lcj86IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKGNvbnRhaW5lciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgQ3NzQ2xhc3MuR2FtZSlcbiAgICAgICAgdGhpcy5ib2FyZE5vZGUgPSBuZXcgQm9hcmROb2RlKHN0YXRlKVxuICAgICAgICB0aGlzLmFwcGVuZCh0aGlzLm1lbnVOb2RlLCB0aGlzLmJvYXJkTm9kZSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVOb2RlXG5cbi8vXG4vLyBNZW51XG4vL1xuXG5jbGFzcyBNZW51Tm9kZSBleHRlbmRzIF9Ob2RlIHtcbiAgICBwcml2YXRlIG1lbnVJdGVtczogTWVudUl0ZW1Ob2RlW11cblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoJ3VsJywgQ3NzQ2xhc3MuTWVudSlcbiAgICAgICAgY29uc3QgdG9NZW51SXRlbSA9IChsYWJlbDogc3RyaW5nKSA9PiBuZXcgTWVudUl0ZW1Ob2RlKGxhYmVsKVxuICAgICAgICB0aGlzLm1lbnVJdGVtcyA9IFsgJ1NldHRpbmdzJywgJ05ldyBHYW1lJywgJ0ZvcmZlaXQnIF0ubWFwKHRvTWVudUl0ZW0pXG4gICAgICAgIHRoaXMuYXBwZW5kKC4uLnRoaXMubWVudUl0ZW1zKVxuICAgIH1cbn1cblxuLy9cbi8vIE1lbnUgaXRlbVxuXG5jbGFzcyBNZW51SXRlbU5vZGUgZXh0ZW5kcyBfTm9kZVdpdGhUZXh0IHtcbiAgICBjb25zdHJ1Y3RvciAobGFiZWw6IHN0cmluZykge1xuICAgICAgICBzdXBlcignbGknLCBDc3NDbGFzcy5NZW51SXRlbSlcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KGxhYmVsKVxuICAgIH1cbn1cblxuLy9cbi8vIEJvYXJkXG4vL1xuXG5jbGFzcyBCb2FyZE5vZGUgZXh0ZW5kcyBfTm9kZSB7XG4gICAgcHJpdmF0ZSBmaWVsZE5vZGVzOiBGaWVsZE5vZGVbXVxuXG4gICAgY29uc3RydWN0b3IgKHN0YXRlOiBHYW1lU3RhdGUpIHtcbiAgICAgICAgc3VwZXIoJ2RpdicsIENzc0NsYXNzLkJvYXJkKVxuICAgICAgICBjb25zdCB0b0ZpZWxkID0gKHN0YXRlOiBGaWVsZFN0YXRlKSA9PiBuZXcgRmllbGROb2RlKHN0YXRlKVxuICAgICAgICB0aGlzLmZpZWxkTm9kZXMgPSBzdGF0ZS5maWVsZHMubWFwKHRvRmllbGQpXG4gICAgICAgIHRoaXMuYXBwZW5kKC4uLnRoaXMuZmllbGROb2RlcylcbiAgICB9XG59XG5cbi8vXG4vLyBGaWVsZFxuLy9cblxuY2xhc3MgRmllbGROb2RlIGV4dGVuZHMgX05vZGVXaXRoVGV4dCB7XG4gICAgY29uc3RydWN0b3IgKHN0YXRlOiBGaWVsZFN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCdkaXYnLCBDc3NDbGFzcy5GaWVsZClcbiAgICAgICAgdGhpcy5jb250YWluZXIub25jbGljayA9IEZpZWxkQ2xpY2tIYW5kbGVyKHN0YXRlLCB0aGlzLmNvbnRhaW5lcilcbiAgICB9XG59XG4iLCJleHBvcnQgZW51bSBGaWVsZFN5bWJvbCB7XG4gICAgU2FmZSA9ICcnLFxuICAgIE1pbmUgPSAnKicsXG59XG5cbmV4cG9ydCBlbnVtIERpZmZpY3VsdHkge1xuICAgIEVhc3kgPSAwLjEyLFxuICAgIEludGVybWVkaWF0ZSA9IDAuMTUsXG4gICAgSGFyZCA9IDAuMTcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gICAgZGlmZjogRGlmZmljdWx0eVxuICAgIG51bUNvbHM6IG51bWJlclxuICAgIG51bVJvd3M6IG51bWJlclxufVxuIiwiaW1wb3J0IHsgRmllbGRTeW1ib2wsIERpZmZpY3VsdHkgfSBmcm9tICcuL1NoYXJlZCdcblxuLy9cbi8vIEZpZWxkIHN0YXRlXG4vL1xuXG5leHBvcnQgY2xhc3MgRmllbGRTdGF0ZSB7XG4gICAgcHJpdmF0ZSBtYXJrZWQgPSAwXG4gICAgcHJpdmF0ZSByZXZlYWxlZCA9IDBcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBGaWVsZFN5bWJvbCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IG1pbmVDb3VudDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbmVhcmJ5SW5kaWNlczogbnVtYmVyW11cbiAgICApIHt9XG5cbiAgICBtYXJrICgpIHtcbiAgICAgICAgdGhpcy5tYXJrZWQgXj0gMVxuICAgIH1cblxuICAgIHJldmVhbCAoKSB7XG4gICAgICAgIHRoaXMucmV2ZWFsZWQgXj0gMVxuICAgIH1cblxuICAgIGlzTWFya2VkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya2VkXG4gICAgfVxuXG4gICAgaXNSZXZlYWxlZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldmVhbGVkXG4gICAgfVxufVxuXG4vL1xuLy8gSGVscGVyOiBDYWxjdWxhdGUgbmVhcmJ5IGZpZWxkIGluZGljZXNcbi8vXG5cbmV4cG9ydCBmdW5jdGlvbiBOZWFyYnlJbmRpY2VzIChcbiAgICBmaWVsZEluZGV4OiBudW1iZXIsXG4gICAgbnVtQ29sczogbnVtYmVyLFxuICAgIG51bVJvd3M6IG51bWJlclxuKSB7XG4gICAgY29uc3QgYyA9IG51bUNvbHNcbiAgICBjb25zdCBvZmZzZXRzID0gWyAtMSwgMSwgLWMsIC1jIC0gMSwgLWMgKyAxLCBjLCBjIC0gMSwgYyArIDEgXVxuICAgIHJldHVybiBvZmZzZXRzXG4gICAgICAgIC5tYXAoKG9mZnNldCkgPT4gb2Zmc2V0ICsgZmllbGRJbmRleClcbiAgICAgICAgLmZpbHRlcigobmVhcmJ5SWR4KSA9PiBuZWFyYnlJZHggPj0gMCAmJiBuZWFyYnlJZHggPCBudW1Db2xzICogbnVtUm93cylcbn1cblxuLy9cbi8vIEdhbWUgc3RhdGVcbi8vXG5cbmV4cG9ydCBjbGFzcyBHYW1lU3RhdGUge1xuICAgIHB1YmxpYyByZWFkb25seSBmaWVsZHM6IEZpZWxkU3RhdGVbXVxuXG4gICAgY29uc3RydWN0b3IgKGRpZmY6IERpZmZpY3VsdHksIG51bUNvbHM6IG51bWJlciwgbnVtUm93czogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IEZpZWxkVmFsdWUgPSAoKSA9PlxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSA8IGRpZmYgPyBGaWVsZFN5bWJvbC5NaW5lIDogRmllbGRTeW1ib2wuU2FmZVxuICAgICAgICBjb25zdCBmaWVsZFZhbHVlcyA9IG5ldyBBcnJheShudW1Db2xzICogbnVtUm93cykuZmlsbCgwKS5tYXAoRmllbGRWYWx1ZSlcblxuICAgICAgICBjb25zdCBGaWVsZCA9ICh2YWx1ZTogRmllbGRTeW1ib2wsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5lYXJieUluZGljZXMgPSBOZWFyYnlJbmRpY2VzKGluZGV4LCBudW1Db2xzLCBudW1Sb3dzKVxuICAgICAgICAgICAgY29uc3QgbWluZUNvdW50ID0gbmVhcmJ5SW5kaWNlc1xuICAgICAgICAgICAgICAgIC5tYXAoKGluZGV4KSA9PiBmaWVsZFZhbHVlc1tpbmRleF0pXG4gICAgICAgICAgICAgICAgLmZpbHRlcigodmFsdWUpID0+IHZhbHVlID09PSBGaWVsZFN5bWJvbC5NaW5lKS5sZW5ndGhcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmllbGRTdGF0ZSh2YWx1ZSwgbWluZUNvdW50LCBuZWFyYnlJbmRpY2VzKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmllbGRzID0gZmllbGRWYWx1ZXMubWFwKEZpZWxkKVxuICAgIH1cbn1cbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSdcbmltcG9ydCB7IE9wdGlvbnMsIERpZmZpY3VsdHkgfSBmcm9tICcuL1NoYXJlZCdcblxuLy9cbi8vIEhUTUwgQ29udGFpbmVyc1xuLy9cblxuLy8gY29uc3QgYXBwQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG5jb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKVxuXG4vL1xuLy8gU3RhcnQgR2FtZSFcbi8vXG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBPcHRpb25zID0ge1xuICAgIGRpZmY6IERpZmZpY3VsdHkuSW50ZXJtZWRpYXRlLFxuICAgIG51bUNvbHM6IDE1LFxuICAgIG51bVJvd3M6IDE1LFxufVxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGRlZmF1bHRPcHRpb25zLCBnYW1lQ29udGFpbmVyKVxuXG4vL1xuLy9cbi8vXG5cbi8vXG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IChITVIpXG4vL1xuXG5pZiAobW9kdWxlLmhvdCkge1xuICAgIC8vIG1vZHVsZS5ob3QuYWNjZXB0KCcuL3ZpZXdzL2xvZ2luJywgKCkgPT4ge1xuICAgIC8vIFx0Y29udGV4dC5yZW5kZXJWaWV3KGxvZ2luKVxuICAgIC8vIH0pXG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gJydcbiAgICAgICAgZ2FtZUNvbnRhaW5lci5yZW1vdmUoKVxuICAgICAgICAvLyB0aXRsZS5yZW1vdmUoKVxuICAgICAgICAvLyBnYW1lLmNvbnRhaW5lci5yZW1vdmUoKVxuICAgICAgICAvLyBmb3IgKGNvbnN0IGYgb2YgZy5ib2FyZCkge1xuICAgICAgICAvLyBcdGYuY29udGFpbmVyLnJlbW92ZSgpXG4gICAgICAgIC8vIH1cbiAgICB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==