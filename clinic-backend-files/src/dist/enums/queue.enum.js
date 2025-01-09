"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueProgress = exports.QueueStatus = void 0;
var QueueStatus;
(function (QueueStatus) {
    QueueStatus["Normal"] = "normal";
    QueueStatus["Urgent"] = "urgent";
})(QueueStatus || (exports.QueueStatus = QueueStatus = {}));
var QueueProgress;
(function (QueueProgress) {
    QueueProgress["Waiting"] = "wait";
    QueueProgress["WithDoctor"] = "with_doc";
    QueueProgress["Complete"] = "complete";
})(QueueProgress || (exports.QueueProgress = QueueProgress = {}));
//# sourceMappingURL=queue.enum.js.map